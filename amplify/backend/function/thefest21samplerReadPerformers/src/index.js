const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  const bucketName = "thefest21sampler-performers-dev-843286064964";
  const objectKey = "performers.json";

  try {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const response = await s3.getObject(params).promise();

    // If the getObject request is successful, you can access the object data
    const objectData = response.Body.toString("utf-8");

    // You can now process or return the objectData as needed
    return {
      statusCode: 200,
      body: JSON.stringify(objectData),
    };
  } catch (error) {
    console.error("Error retrieving object from S3:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving object from S3" }),
    };
  }
};
