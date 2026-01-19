/**
 * There is an undirected graph with n nodes. There is also an edges array, where edges[i] = [a, b] means that there is
 * an edge between node a and node b in the graph.
 *
 * The nodes are numbered from 0 to n - 1.
 *
 * Return the total number of connected components in that graph.
 */

const countComponents = (n: number, edges: number[][]) => {
  const nodesAndChildren = new Map<number, Set<number>>();

  for (const e of edges) {
    const set = nodesAndChildren.get(e[0]) || new Set();
    set.add(e[1]);
    nodesAndChildren.set(e[0], set);

    const _set = nodesAndChildren.get(e[1]) || new Set();
    _set.add(e[0]);
    nodesAndChildren.set(e[1], _set);
  }

  for (let i = 0; i < n; i++) {
    const set = nodesAndChildren.get(i) || new Set();
    nodesAndChildren.set(i, set);
  }

  console.log("nodesAndChildren: ", nodesAndChildren);
  const dfs = (node: number, prev: number, visited: Set<number>) => {
    const visitedCopy = new Set(Array.from(visited));
    if (visitedCopy.has(node)) {
      return visitedCopy;
    }
    visitedCopy.add(node);

    // check if this path has already been visited and if so, ignore it.
    const p2String = Array.from(visitedCopy.values()).join(",");
    const p2StringReversed = Array.from(visitedCopy.values()).reverse().join(",");
    for (const path of pathStrings) {
      if (path.includes(p2String) || path.includes(p2StringReversed)) {
        return visitedCopy;
      }
    }

    const children = nodesAndChildren.get(node) || new Set();

    for (const child of children) {
      if (child !== prev) {
        const _path = dfs(child, node, visitedCopy);
        for (const p of Array.from(_path.values())) {
          visitedCopy.add(p);
        }
      }
    }

    return visitedCopy;

  };

  const pathStrings: string[] = [];
  for (const k of Array.from(nodesAndChildren.keys())) {
    const path = dfs(k, -1, new Set());
    // check if this path has already been visited and if so, ignore it.
    const p2String = Array.from(path.values()).join(",");
    const p2StringReversed = Array.from(path.values()).reverse().join(",");
    let exists = false;
    for (const path of pathStrings) {
      if (path.includes(p2String) || path.includes(p2StringReversed)) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      pathStrings.push(Array.from(path.values()).join(","));
    }
  }
  console.log("pathStrings: ", pathStrings);

  return pathStrings.length;
};

type ComponentsUndirectedGraphTestCase = {
  name: string;
  n: number;
  edges: number[][];
  expected: number;
};

const componentsUndirectedGraphTestCases: ComponentsUndirectedGraphTestCase[] = [
  {name: "01) n=0, edges=[]", n: 0, edges: [], expected: 0},
  {name: "02) n=1, edges=[] (single isolated node)", n: 1, edges: [], expected: 1},
  {name: "03) n=1, self-loop", n: 1, edges: [[0, 0]], expected: 1},

  {name: "04) n=2, no edges (two isolated)", n: 2, edges: [], expected: 2},
  {name: "05) n=2, one edge", n: 2, edges: [[0, 1]], expected: 1},
  {name: "06) n=2, duplicate edges", n: 2, edges: [[0, 1], [0, 1]], expected: 1},

  {name: "07) n=3, chain 0-1-2", n: 3, edges: [[0, 1], [1, 2]], expected: 1},
  {name: "08) n=3, one edge + one isolated", n: 3, edges: [[0, 1]], expected: 2},
  {name: "09) n=3, triangle cycle", n: 3, edges: [[0, 1], [1, 2], [2, 0]], expected: 1},

  {name: "10) n=4, two separate edges => 2 components", n: 4, edges: [[0, 1], [2, 3]], expected: 2},
  {name: "11) n=4, path of 3 nodes + one isolated", n: 4, edges: [[0, 1], [1, 2]], expected: 2},
  {name: "12) n=4, 4-cycle", n: 4, edges: [[0, 1], [1, 2], [2, 3], [3, 0]], expected: 1},

  {name: "13) n=5, star centered at 0", n: 5, edges: [[0, 1], [0, 2], [0, 3], [0, 4]], expected: 1},
  {name: "14) n=5, no edges (all isolated)", n: 5, edges: [], expected: 5},
  {name: "15) n=5, {0,1,2} + {3,4}", n: 5, edges: [[0, 1], [1, 2], [3, 4]], expected: 2},

  {name: "16) n=6, {0,1}, {2,3,4}, {5}", n: 6, edges: [[0, 1], [2, 3], [3, 4]], expected: 3},
  {name: "17) n=6, only self-loops (still 6 components)", n: 6, edges: [[0, 0], [2, 2], [5, 5]], expected: 6},
  {
    name: "18) n=6, duplicates + reversed edges, still one component for {0,1,2,3}",
    n: 6,
    edges: [[0, 1], [1, 0], [1, 2], [2, 1], [2, 3], [2, 3]],
    expected: 3, // {0,1,2,3}, {4}, {5}
  },

  {
    name: "19) n=7, fully connected via extra edges",
    n: 7,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 6], [1, 5]],
    expected: 1,
  },
  {
    name: "20) n=7, three components with mixed structure",
    n: 7,
    edges: [[0, 1], [1, 2], [3, 4], [4, 5]],
    expected: 3, // {0,1,2}, {3,4,5}, {6}
  },

  {
    name: "21) n=8, one component (two branches merge)",
    n: 8,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7]],
    expected: 1,
  },
  {
    name: "22) n=8, {0,1,2,3} + {4,5} + {6} + {7}",
    n: 8,
    edges: [[0, 1], [1, 2], [2, 3], [4, 5]],
    expected: 4,
  },
  // Fix #23 to match expected 3 or 5; make only one isolated (8), connect 6-7
  {
    name: "23) n=9, two disjoint cycles + one edge + one isolated",
    n: 9,
    edges: [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [6, 7]],
    expected: 4, // {0,1,2}, {3,4,5}, {6,7}, {8}
  },

  {
    name: "24) n=10, long chain (all connected)",
    n: 10,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    expected: 1,
  },
  {
    name: "25) n=10, chain missing a link => 2 components",
    n: 10,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9]],
    expected: 2,
  },
  {name: "26) n=10, no edges", n: 10, edges: [], expected: 10},

  {
    name: "27) n=12, multiple components (cycle + chains + isolated)",
    n: 12,
    edges: [
      [0, 1], [1, 2],           // component A: {0,1,2}
      [3, 4], [4, 5], [5, 3],   // component B: {3,4,5} cycle
      [6, 7],                   // component C: {6,7}
      // 8 isolated
      [9, 10], [10, 11],        // component D: {9,10,11}
    ],
    expected: 5, // A,B,C,{8},D
  },

  {
    name: "28) n=4, self-loops + edges forming 2 components",
    n: 4,
    edges: [[0, 0], [0, 1], [1, 1], [2, 3]],
    expected: 2,
  },

  {
    name: "29) n=3, chain plus self-loop at end (still 1 component)",
    n: 3,
    edges: [[0, 1], [1, 2], [2, 2]],
    expected: 1,
  },

  {
    name: "30) n=20, 10 disjoint pairs",
    n: 20,
    edges: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15], [16, 17], [18, 19]],
    expected: 10,
  },
  {
    name: "31) n=50, 10 disjoint pairs",
    n: 20,
    edges: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15], [16, 17], [18, 19], [20, 21], [22, 23], [24, 25], [26, 27], [28, 29], [30, 31], [32, 33], [34, 35], [36, 37], [38, 39], [40, 41], [42, 43], [44, 45], [46, 47], [48, 49]],
    expected: 25,
  },
];

function runCountComponentsTests() {
  // Assumes `countComponents(n, edges)` exists in scope.

  let passed = 0;
  try {
    for (const tc of componentsUndirectedGraphTestCases) {
      let actual: unknown;
      let threw = false;

      try {
        actual = countComponents(tc.n, tc.edges);
      } catch (e) {
        threw = true;
        actual = e;
      }

      const ok = actual === tc.expected;

      if (!ok) {
        console.log(
          [
            `FAIL: ${tc.name}`,
            `  n: ${tc.n}`,
            `  edges: ${JSON.stringify(tc.edges)}`,
            `  expected: ${tc.expected}`,
            `  actual: ${threw ? "THREW" : String(actual)}`,
          ].join("\n"),
        );
      } else {
        passed++;
      }
    }
  } finally {

  }

  const total = componentsUndirectedGraphTestCases.length;
  console.log(passed === total ? `All tests passed (${passed}/${total}).` : `Some tests failed (${passed}/${total}).`);
}

// Run automatically
runCountComponentsTests();