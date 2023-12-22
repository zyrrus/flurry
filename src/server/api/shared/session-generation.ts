export function getRandomItems<T>(list: T[], numberOfItems: number): T[] {
  // Make a copy of the original list to avoid modifying it
  const shuffledList = [...list];

  // Shuffle the copied list using the Fisher-Yates algorithm
  for (let i = shuffledList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Use a temporary variable to perform the swap
    const temp = shuffledList[i]!;
    shuffledList[i] = shuffledList[j]!;
    shuffledList[j] = temp;
  }

  // Return the shuffled list or the whole list if there are fewer items
  return shuffledList.slice(0, Math.min(numberOfItems, shuffledList.length));
}
