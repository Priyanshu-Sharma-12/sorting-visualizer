export function getSelectionSortAnimations(array) {
  const animations = [];
  const arr = array.slice();

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push({ type: 'compare', indices: [j, minIdx] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push({ type: 'swap', indices: [i, minIdx] });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }

  return animations;
}