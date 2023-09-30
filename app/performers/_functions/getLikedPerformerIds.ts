/**
 * Retrieve the IDs of liked performers from local storage.
 *
 * @async
 * @function
 * @returns {Promise<string[]>} A Promise that resolves to an array of strings representing performer IDs.
 *
 * @example
 * try {
 *   const likedPerformerIds = await getLikedPerformerIds();
 *   // Use likedPerformerIds for further processing
 * } catch (error) {
 *   // Handle the error
 * }
 */
const getLikedPerformerIds = async () => {
  // Retrieve data labeled "liked_performer_ids" from local storage
  const likedPerformersJSON = localStorage.getItem("liked_performer_ids");

  // Parse the JSON data into an array of strings, or return an empty array if data is not present
  const likedPerformers = likedPerformersJSON
    ? JSON.parse(likedPerformersJSON)
    : [];

  return likedPerformers;
};

export default getLikedPerformerIds;
