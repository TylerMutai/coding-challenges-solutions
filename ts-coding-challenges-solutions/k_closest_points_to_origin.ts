/**
 * K Closest Points to Origin
 * You are given an 2-D array points where points[i] = [xi, yi] represents the coordinates of a point on an X-Y axis
 * plane. You are also given an integer k.
 *
 * Return the k closest points to the origin (0, 0).
 *
 * The distance between two points is defined as the Euclidean distance (sqrt((x1 - x2)^2 + (y1 - y2)^2)).
 *
 * You may return the answer in any order.
 */

const kClosest = (points: number[][], k: number) => {
  const calculateDistance = (p1: number[], p2: number[]) => Math.sqrt(
    ((p1[0] - p2[0]) * (p1[0] - p2[0])) +
    ((p1[1] - p2[1]) * (p1[1] - p2[1])),
  );
  const distances = new Map<number, number[][]>();
  for (const p of points) {
    const distance = calculateDistance(p, [0, 0]);
    const distancesValues = distances.get(distance) || [];
    distancesValues.push(p);
    distances.set(distance, distancesValues);
  }

  console.log("distances", distances);
  const orderedKeys = Array.from(distances.keys()).sort((a, b) => a - b);
  console.log("orderedKeys", orderedKeys);

  const result: number[][] = [];
  let i = 0;
  while (i < k) {
    const values = distances.get(orderedKeys[i]) || [];
    for (const v of values) {
      result.push(v);
      i++;
    }
  }

  return result;
};

console.log("kClosest", kClosest([[0, 2], [2, 2]], 1));