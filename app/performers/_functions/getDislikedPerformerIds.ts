/**
 * Retrieve the IDs of disliked performers from local storage.
 *
 * @async
 * @function
 * @returns {Promise<string[]>} A Promise that resolves to an array of strings representing performer IDs.
 *
 * @example
 * try {
 *   const dislikedPerformerIds = await getDislikedPerformerIds();
 *   // Use dislikedPerformerIds for further processing
 * } catch (error) {
 *   // Handle the error
 * }
 */
const getDislikedPerformerIds = async () => {
  // Retrieve data labeled "disliked_performer_ids" from local storage
  const dislikedPerformersJSON = localStorage.getItem("disliked_performer_ids");

  // Parse the JSON data into an array of strings, or return an empty array if data is not present
  const dislikedPerformers = dislikedPerformersJSON
    ? JSON.parse(dislikedPerformersJSON)
    : [];

  return dislikedPerformers;
};

export default getDislikedPerformerIds;
