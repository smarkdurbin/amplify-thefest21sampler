/**
 * Dislike a performer by adding their ID to the list of disliked performer IDs in local storage.
 *
 * @async
 * @function
 * @param {string} performerId - The unique identifier of the performer to be disliked.
 * @throws {Error} If an error occurs while disliking the performer or if the operation is unsuccessful.
 *
 * @example
 * try {
 *   const performerId = "123456";
 *   dislikePerformer(performerId);
 *   // Performer has been successfully disliked
 * } catch (error) {
 *   // Handle the error
 * }
 */
const dislikePerformer = async (performerId: string) => {
  try {
    // Retrieve existing data labeled "disliked_performer_ids" from local storage
    const existingDislikedPerformerIdsJSON = localStorage.getItem(
      "disliked_performer_ids"
    );

    // Parse existing data into an array or initialize an empty array if data is not present
    const existingDislikedPerformerIds = existingDislikedPerformerIdsJSON
      ? JSON.parse(existingDislikedPerformerIdsJSON)
      : [];

    // Check if the performer ID is already in the existing data
    if (!existingDislikedPerformerIds.includes(performerId)) {
      // Add the new performer ID to the existing data
      existingDislikedPerformerIds.push(performerId);

      // Store the updated data back in local storage
      localStorage.setItem(
        "disliked_performer_ids",
        JSON.stringify(existingDislikedPerformerIds)
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error while disliking performer");
  }
};

export default dislikePerformer;
