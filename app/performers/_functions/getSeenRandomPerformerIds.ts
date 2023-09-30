/**
 * Retrieve the IDs of seen random performers from local storage.
 *
 * @async
 * @function
 * @returns {Promise<string[]>} A Promise that resolves to an array of strings representing performer IDs.
 *
 * @example
 * try {
 *   const seenRandomPerformerIds = await getSeenRandomPerformerIds();
 *   // Use seenRandomPerformerIds for further processing
 * } catch (error) {
 *   // Handle the error
 * }
 */
const getSeenRandomPerformerIds = async () => {
  // Retrieve data labeled "seen_random_performer_ids" from local storage
  const seenRandomPerformersJSON = localStorage.getItem(
    "seen_random_performer_ids"
  );

  // Parse the JSON data into an array of strings, or return an empty array if data is not present
  const seenRandomPerformers = seenRandomPerformersJSON
    ? JSON.parse(seenRandomPerformersJSON)
    : [];

  return seenRandomPerformers;
};

export default getSeenRandomPerformerIds;
