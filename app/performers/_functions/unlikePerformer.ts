/**
 * Unlike a performer by removing their ID from the list of liked performer IDs in local storage.
 *
 * @async
 * @function
 * @param {string} performerId - The unique identifier of the performer to be unliked.
 * @throws {Error} If an error occurs while unliking the performer or if the operation is unsuccessful.
 *
 * @example
 * try {
 *   const performerId = "123456";
 *   unlikePerformer(performerId);
 *   // Performer has been successfully unliked
 * } catch (error) {
 *   // Handle the error
 * }
 */
const unlikePerformer = async (performerId: string) => {
  try {
    // Retrieve existing data labeled "liked_performer_ids" from local storage
    const existingLikedPerformerIdsJSON = localStorage.getItem(
      "liked_performer_ids"
    );

    // Parse existing data into an array or initialize an empty array if data is not present
    const existingLikedPerformerIds = existingLikedPerformerIdsJSON
      ? JSON.parse(existingLikedPerformerIdsJSON)
      : [];

    // Check if the performer ID is in the existing data
    if (!existingLikedPerformerIds.includes(performerId)) {
      console.warn("Performer ID not found in liked performers.");
    }

    // Remove the performer ID from the existing data
    const updatedLikedPerformerIds = existingLikedPerformerIds.filter(
      (id: string) => id !== performerId
    );

    // Store the updated data back in local storage
    localStorage.setItem(
      "liked_performer_ids",
      JSON.stringify(updatedLikedPerformerIds)
    );
  } catch (error) {
    // Throw an error if an error occurs during the process or if the operation is unsuccessful
    console.error("Error while unliking performer:", error);
    throw error;
  }
};

export default unlikePerformer;
