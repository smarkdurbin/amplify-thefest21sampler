const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");

const s3Client = new S3Client();
const stsClient = new STSClient();

exports.handler = async (event, context) => {
  const input = {};
  const command = new GetCallerIdentityCommand(input);
  const response = await stsClient.send(command);

  // AWS account ID
  const awsAccountId = response.Account;

  // Bucket name
  const bucketName = [
    "thefest21sampler-performers",
    process.env.ENV,
    awsAccountId,
  ].join("-");

  const objectKey = "performers.json"; // Replace with your JSON file name

  try {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    const jsonContent = JSON.parse(await response.Body.transformToString());

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
