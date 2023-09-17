const AWS = require("aws-sdk");
const https = require("https");

// AWS S3 and Lambda clients
const s3 = new AWS.S3();

// URL of the API
const apiUrl = "https://api.thefestfl.com/fest21/events";

// Bucket name
const bucketName = "thefest21sampler-performers";

exports.handler = async (event, context) => {
  try {
    // Fetch data from the API
    const data = await fetchDataFromAPI(apiUrl);

    // Parse JSON from data
    const json = JSON.parse(data);

    // Test data
    if (!Array.isArray(json)) throw "API did not return an array";
    if (typeof json[0] !== "object")
      throw "First item in API response is not an object";
    if (!json[0].hasOwnProperty("event_id")) throw "API is not returning events";

    // Filter performers
    const performers = await filterPerformersFromEvents(json);

    console.log(performers);

    // Upload the data to S3
    await uploadDataToS3(
      JSON.stringify({
        performers,
        lastUpdated: Date.now(),
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data stored in S3 successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching or storing data" }),
    };
  }
};

function fetchDataFromAPI(apiUrl) {
  return new Promise((resolve, reject) => {
    https.get(apiUrl, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });

      res.on("error", (error) => {
        reject(error);
      });
    });
  });
}

filterPerformersFromEvents = (events) => {
  const performerMap = new Map();

  for (const event of events) {
    if (event.performer && !performerMap.has(event.performer)) {
      const performer = {
        id: event.performer_id || "",
        name: event.performer,
        url: event.performer_url || "",
      };
      performerMap.set(event.performer, performer);
    }
  }

  const sortedPerformers = Array.from(performerMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return sortedPerformers;
};

function uploadDataToS3(data) {
  const params = {
    Bucket: [bucketName, process.env.ENV].join("-"),
    Key: "performers.json",
    Body: data,
    ContentType: "application/json",
  };

  return s3.upload(params).promise();
}
