/**
 * Undislike a performer by removing their ID from the list of disliked performer IDs in local storage.
 *
 * @async
 * @function
 * @param {string} performerId - The unique identifier of the performer to be undisliked.
 * @throws {Error} If an error occurs while undisliking the performer or if the operation is unsuccessful.
 *
 * @example
 * try {
 *   const performerId = "123456";
 *   undislikePerformer(performerId);
 *   // Performer has been successfully undisliked
 * } catch (error) {
 *   // Handle the error
 * }
 */
const undislikePerformer = async (performerId: string) => {
  try {
    // Retrieve existing data labeled "disliked_performer_ids" from local storage
    const existingDislikedPerformerIdsJSON = localStorage.getItem(
      "disliked_performer_ids"
    );

    // Parse existing data into an array or initialize an empty array if data is not present
    const existingDislikedPerformerIds = existingDislikedPerformerIdsJSON
      ? JSON.parse(existingDislikedPerformerIdsJSON)
      : [];

    // Check if the performer ID is in the existing data
    if (!existingDislikedPerformerIds.includes(performerId)) {
      console.warn("Performer ID not found in disliked performers.");
    }

    // Remove the performer ID from the existing data
    const updatedDislikedPerformerIds = existingDislikedPerformerIds.filter(
      (id: string) => id !== performerId
    );

    // Store the updated data back in local storage
    localStorage.setItem(
      "disliked_performer_ids",
      JSON.stringify(updatedDislikedPerformerIds)
    );
  } catch (error) {
    // Throw an error if an error occurs during the process or if the operation is unsuccessful
    console.error("Error while undisliking performer:", error);
    throw error;
  }
};

export default undislikePerformer;
