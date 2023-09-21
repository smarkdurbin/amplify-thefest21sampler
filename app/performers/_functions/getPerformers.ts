import axios from "axios";
import { API } from "aws-amplify";

const getPerformers = async () => {
  try {
    // Define response
    const response = await API.get("performersApi", "/performers", {});

    // Define data
    const data = await JSON.parse(response);
    
    return await data.performers;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching external data:", error);
    return { error: "Internal server error" };
  }
};

export default getPerformers;
