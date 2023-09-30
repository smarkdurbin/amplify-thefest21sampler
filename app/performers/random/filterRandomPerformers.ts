import getDislikedPerformerIds from "../_functions/getDislikedPerformerIds";
import getLikedPerformerIds from "../_functions/getLikedPerformerIds";
import getSeenRandomPerformerIds from "../_functions/getSeenRandomPerformerIds";
import Performer from "../_types/Performer";

const filterRandomPerformers = async (
  performers: Performer[],
  showDislikedPerformers: boolean,
  showLikedPerformers: boolean,
  showSeenRandomPerformers: boolean
) => {
  // Define disliked performer IDs
  const dislikedPerformerIds = await getDislikedPerformerIds();

  // Define liked performer IDs
  const likedPerformerIds = await getLikedPerformerIds();

  // Define seen random performer IDs
  const seenRandomPerformerIds = await getSeenRandomPerformerIds();

  // Create the remainingPerformerIds array based on boolean values
  let remainingPerformerIds: string[] = [...performers]
    .map(({ id }) => id)
    .filter((id) => !seenRandomPerformerIds.includes(id));

  // If show seen random performers
  if (showSeenRandomPerformers) {
    remainingPerformerIds = remainingPerformerIds
      .concat(seenRandomPerformerIds ?? [])
      .filter((id) => !dislikedPerformerIds?.includes(id))
      .filter((id) => !likedPerformerIds?.includes(id));
  }

  // If show disliked performers
  if (showDislikedPerformers) {
    remainingPerformerIds = remainingPerformerIds.concat(
      dislikedPerformerIds ?? []
    );
  }

  // If show liked performers
  if (showLikedPerformers) {
    remainingPerformerIds = remainingPerformerIds.concat(
      likedPerformerIds ?? []
    );
  }

  // Remove duplicates from the remainingPerformerIds array
  remainingPerformerIds = Array.from(new Set(remainingPerformerIds));

  // Define remaining performers
  const remainingPerformers = [...(performers ?? [])].filter(({ id }) =>
    remainingPerformerIds.includes(id)
  );

  return remainingPerformers;
};

export default filterRandomPerformers;
