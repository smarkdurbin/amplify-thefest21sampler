/**
 *
 */
const addSeenRandomPerformerId = async (
  performerId: string
): Promise<{ success: boolean }> => {
  try {
    // Retrieve existing data labeled "seen_random_performer_ids" from local storage
    const existingSeenRandomPerformerIdsJSON = localStorage.getItem(
      "seen_random_performer_ids"
    );

    // Parse existing data into an array or initialize an empty array if data is not present
    const existingSeenRandomPerformerIds = existingSeenRandomPerformerIdsJSON
      ? JSON.parse(existingSeenRandomPerformerIdsJSON)
      : [];

    // Add the new performer ID to the existing data if it's not already present
    if (!existingSeenRandomPerformerIds.includes(performerId)) {
      existingSeenRandomPerformerIds.push(performerId);
    }

    // Store the updated data back in local storage
    localStorage.setItem(
      "seen_random_performer_ids",
      JSON.stringify(existingSeenRandomPerformerIds)
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Error while adding seen random performer");
  }
};

export default addSeenRandomPerformerId;
