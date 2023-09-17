/**
 * Like a performer by adding their ID to the list of liked performer IDs in local storage.
 *
 * @async
 * @function
 * @param {string} performerId - The unique identifier of the performer to be liked.
 * @throws {Error} If an error occurs while liking the performer or if the operation is unsuccessful.
 *
 * @example
 * try {
 *   const performerId = "123456";
 *   likePerformer(performerId);
 *   // Performer has been successfully liked
 * } catch (error) {
 *   // Handle the error
 * }
 */
const likePerformer = async (performerId: string) => {
  try {
    // Retrieve existing data labeled "liked_performer_ids" from local storage
    const existingLikedPerformerIdsJSON = localStorage.getItem(
      "liked_performer_ids"
    );

    // Parse existing data into an array or initialize an empty array if data is not present
    const existingLikedPerformerIds = existingLikedPerformerIdsJSON
      ? JSON.parse(existingLikedPerformerIdsJSON)
      : [];

    // Check if the performer ID is already in the existing data
    if (!existingLikedPerformerIds.includes(performerId)) {
      // Add the new performer ID to the existing data
      existingLikedPerformerIds.push(performerId);

      // Store the updated data back in local storage
      localStorage.setItem(
        "liked_performer_ids",
        JSON.stringify(existingLikedPerformerIds)
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error while liking performer");
  }
};

export default likePerformer;
