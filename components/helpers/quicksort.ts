import { Class, StudentsOfClass } from "../services/student-service";

function partition(arr: Array<StudentsOfClass>, low: number, high: number): number {
  let pivot: number = arr[high].score;

  let i: number = (low - 1);

  for (let j: number = low; j <= high; j++) {
    if (arr[j].score > pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return (i + 1);
}

export function quickSort(arr: Array<StudentsOfClass>, low: number, high: number) {
  if (low < high) {
    let pi: number = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}
