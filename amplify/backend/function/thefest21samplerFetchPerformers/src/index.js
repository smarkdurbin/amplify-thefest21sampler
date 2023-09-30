const { S3Client, S3 } = require("@aws-sdk/client-s3");
const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");
const https = require("https");

// AWS S3 and Lambda clients
const s3Client = new S3Client();
const s3 = new S3({ client: s3Client });

// Define account ID
const getAccountId = async () => {
  const sts = new STSClient();
  const response = await sts.send(new GetCallerIdentityCommand({}));
  return response.Account;
};

// URL of the API
const apiUrl = "https://api.thefestfl.com/fest21/events";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  try {
    // Define account ID
    const awsAccountId = await getAccountId();

    // Bucket name
    const bucketName = [
      "thefest21sampler-performers",
      process.env.ENV,
      awsAccountId,
    ].join("-");

    console.log(bucketName);

    // Fetch data from the API using the https library
    const data = await fetchDataFromAPI(apiUrl);

    // Parse JSON from data
    const json = JSON.parse(data);

    // Test data
    if (!Array.isArray(json)) throw "API did not return an array";
    if (typeof json[0] !== "object")
      throw "First item in API response is not an object";
    if (!json[0].hasOwnProperty("event_id"))
      throw "API is not returning events";

    // Filter performers
    const performers = await filterPerformersFromEvents(json);

    // Upload the data to S3
    await uploadDataToS3(
      JSON.stringify({
        performers,
        lastUpdated: Date.now(),
      }),
      bucketName
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
      if (res.statusCode !== 200) {
        reject(`API request failed with status code ${res.statusCode}`);
        return;
      }

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

const filterPerformersFromEvents = (events) => {
  const performerMap = new Map();

  for (const event of events) {
    if (event.performer && !performerMap.has(event.performer) && event.performer.toUpperCase() !== "MYSTERY BAND") {
      const performer = {
        id: event.performer_id || "",
        name: event.performer,
        url: event.performer_url || "",
        type: event.performer_url.includes("comedy") ? "Comedy" : "Music",
      };
      performerMap.set(event.performer, performer);
    }
  }

  const sortedPerformers = Array.from(performerMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return sortedPerformers;
};

async function uploadDataToS3(data, bucketName) {
  const params = {
    Bucket: bucketName,
    Key: "performers.json",
    Body: data,
    ContentType: "application/json",
  };

  await s3.putObject(params);
}
