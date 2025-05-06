/**
 * Dijkstra's algorithm
 *
 * @param nodesAndWeights
 * idx 0 = current node
 * idx 1 = target node
 * idx 2 = weight (distance between current and target node).
 *
 * @param k
 * First node to start from
 */
const dijkstraAlgorithm = (nodesAndWeights: number[][], k: number) => {
  console.log("nodesAndWeights", nodesAndWeights, " k: ", k);
  if(!nodesAndWeights.length){
    return -1;
  }

  const nodesAndWeightsMap = new Map<number,number>();

  const q = [nodesAndWeights[0]];
  while(q.length){
    const n = q.shift()!;
    const target = n[1];
    const weight = n[2];


    const nodes = nodesAndWeights.filter((_n )=>_n[0] === target)
    for (const node of nodes){
      const _curr = node[0];
      if(nodesAndWeightsMap.has(_curr)){
        const __weight = nodesAndWeightsMap.get(_curr)!;
        if(__weight > weight){
          nodesAndWeightsMap.set(_curr, weight);
        }
      } else {
        const nodeWeight = nodesAndWeightsMap.get(_curr) || 0;
        const newWeight = nodeWeight + weight
        nodesAndWeightsMap.set(_curr, newWeight);
        q.push(node);
      }
    }
  }

};

// All nodes can be reached
console.log("All nodes can be reached---------------");
dijkstraAlgorithm([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 2);
console.log("Expected: 2\n");
;
dijkstraAlgorithm([[1, 2, 1], [2, 3, 2], [1, 3, 4]], 1);
console.log("Expected: 3\n");
console.log("All nodes can be reached" + "----------------------------------------------\n\n");
/*

// Some nodes cannot be reached
console.log("Some nodes cannot be reached---------------");
dijkstraAlgorithm([[1, 2, 1]], 1);
console.log("Expected: 1");
dijkstraAlgorithm([[1, 2, 1], [2, 3, 2]], 2);
console.log("Expected: -1");
dijkstraAlgorithm([[1, 2, 3], [3, 4, 5]], 1);
console.log("Expected: -1");
console.log("Some nodes cannot be reached" + "----------------------------------------------\n\n");

// Disconnected nodes and unreachable subgraphs
console.log("Disconnected nodes and unreachable subgraphs---------------");
dijkstraAlgorithm([], 1);
console.log("Expected: 0");
dijkstraAlgorithm([[1, 2, 1], [3, 4, 2]], 1);
console.log("Expected: -1");
console.log("Disconnected nodes and unreachable subgraphs" + "----------------------------------------------\n\b");

// Cycle, but not all nodes reached
console.log("Cycle, but not all nodes reached---------------");
dijkstraAlgorithm([[1, 2, 1], [2, 3, 2], [3, 2, 1]], 1);
console.log("Expected: 3");
console.log("Cycle, but not all nodes reached" + "----------------------------------------------\n\n");*/