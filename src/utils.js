const verifyLine = (array, i, j, k) =>
  array[i].selected === array[j].selected &&
  array[j].selected === array[k].selected &&
  array[i].selected !== null;

export const verifyWinner = (array) => {
  return (
    verifyLine(array, 0, 1, 2) ||
    verifyLine(array, 3, 4, 5) ||
    verifyLine(array, 6, 7, 8) ||
    verifyLine(array, 0, 4, 8) ||
    verifyLine(array, 2, 4, 6) ||
    verifyLine(array, 0, 3, 6) ||
    verifyLine(array, 1, 4, 7) ||
    verifyLine(array, 2, 5, 8)
  );
};
