import axios from "axios";

const getPerformers = async () => {
  try {
    // Make a GET request to the external API endpoint
    const response = await axios.get(
      "https://thefest21sampler-performers-prod.s3.amazonaws.com/performers.json"
    );

    // Check if the response status is OK (status code 200)
    if (response.status === 200) {
      // Send the external API data as the response
      return response.data.performers;
    } else {
      // Handle other status codes as needed
      return { error: "Request failed" };
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching external data:", error);
    return { error: "Internal server error" };
  }
};

export default getPerformers;
