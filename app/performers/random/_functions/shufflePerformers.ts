import Performer from "../../_types/Performer";

/**
 * Shuffles an array of Performer objects using the Fisher-Yates shuffle algorithm.
 *
 * @param {Performer[]} performers - The array of Performer objects to shuffle.
 *
 * @returns {Performer[]} - The shuffled array of Performer objects.
 */
const shufflePerformers = (performers: Performer[]): Performer[] => {
  const shuffledPerformers = [...performers];

  for (let i = shuffledPerformers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPerformers[i], shuffledPerformers[j]] = [
      shuffledPerformers[j],
      shuffledPerformers[i],
    ];
  }

  return shuffledPerformers;
};

export default shufflePerformers;
