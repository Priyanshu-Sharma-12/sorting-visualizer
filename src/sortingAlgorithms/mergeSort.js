

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

function mergeSortHelper(main, start, end, aux, animations) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(aux, start, mid, main, animations);
  mergeSortHelper(aux, mid + 1, end, main, animations);
  merge(main, start, mid, end, aux, animations);
}

function merge(main, start, mid, end, aux, animations) {
  let i = start;
  let j = mid + 1;
  let k = start;

  while (i <= mid && j <= end) {
    animations.push({ type: 'compare', indices: [i, j] });
    if (aux[i] <= aux[j]) {
      animations.push({ type: 'overwrite', index: k, value: aux[i] });
      main[k++] = aux[i++];
    } else {
      animations.push({ type: 'overwrite', index: k, value: aux[j] });
      main[k++] = aux[j++];
    }
  }

  while (i <= mid) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'overwrite', index: k, value: aux[i] });
    main[k++] = aux[i++];
  }

  while (j <= end) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'overwrite', index: k, value: aux[j] });
    main[k++] = aux[j++];
  }
}