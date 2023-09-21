const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

// Define bucket name
const bucketName = "thefest21sampler-performers-dev-843286064964";

// Define object key
const objectKey = "performers.json";

// Create an S3 client
const s3Client = new S3Client();

exports.handler = async (event) => {
  try {
    // Define parameters for the GetObjectCommand
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    // Send a GetObjectCommand to S3
    const response = await s3Client.send(new GetObjectCommand(params));

    // If the GetObjectCommand is successful, you can access the object data
    const objectData = await streamToBuffer(response.Body);

    console.log(objectData.toString("utf-8"));

    return {
      statusCode: 200,
      // Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(objectData.toString("utf-8")),
    };
  } catch (err) {
    console.error("Error retrieving object from S3:", err);
    return {
      statusCode: 500,
      // Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ message: "Error retrieving object from S3" }),
    };
  }
};

// Helper function to convert a readable stream to a buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
