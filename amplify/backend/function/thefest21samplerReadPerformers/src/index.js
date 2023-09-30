const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");

const s3Client = new S3Client();
const stsClient = new STSClient();

// Object key
const objectKey = "performers.json"; // Replace with your JSON file name

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  try {
    // STS response
    const stsResponse = await stsClient.send(new GetCallerIdentityCommand({}));

    // Account ID
    const awsAccountId = stsResponse.Account;

    // Bucket name
    const bucketName = [
      "thefest21sampler-performers",
      process.env.ENV,
      awsAccountId,
    ].join("-");

    // Define response
    const S3Response = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      })
    );
    // Define JSON content
    const jsonContent = JSON.parse(await S3Response.Body.transformToString());

    return {
      statusCode: 200,
      body: JSON.stringify(jsonContent),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  }
};
