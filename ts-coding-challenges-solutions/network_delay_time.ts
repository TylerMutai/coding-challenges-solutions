/**
 * Network Delay Time
 * You are given a network of n directed nodes, labeled from 1 to n. You are also given times, a list of directed edges
 * where times[i] = (ui, vi, ti).
 *
 *    ui is the source node (an integer from 1 to n)
 *    vi is the target node (an integer from 1 to n)
 *    ti is the time it takes for a signal to travel from the source to the target node (an integer greater than or
 * equal to 0). You are also given an integer k, representing the node that we will send a signal from.
 *
 * Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the nodes to
 * receive the signal, return -1 instead.
 */

import {MinPriorityQueue} from "@datastructures-js/priority-queue";

const networkDelayTime = (times: number[][], n: number, k: number) => {
  const edges = new Map<number, number[][]>();
  for (let i = 1; i <= n; i++) {
    edges.set(i, []);
  }
  for (const [u, v, w] of times) {
    edges.get(u)?.push([v, w]);
  }

  const minHeap = new MinPriorityQueue<number[]>(entry => entry[0]);
  minHeap.enqueue([0, k]);

  const visit = new Set<number>();
  let t = 0;

  while (!minHeap.isEmpty()) {
    const layer = minHeap.dequeue();
    if (layer) {
      const [n1, w1] = layer;
      if (visit.has(n1)) {
        continue;
      }
      visit.add(n1);
      t = w1;

      for (const [n2, w2] of edges?.get(n1) || []) {
        if (!visit.has(n2)) {
          minHeap.enqueue([w1 + w2, n2]);
        }
      }
    }
  }

  return visit.size === n ? t : -1;
};