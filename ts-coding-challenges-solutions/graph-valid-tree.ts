/**
 * Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes),
 * write a function to check whether these edges make up a valid tree.
 */

const validTree = (n: number, edges: number[][]) => {
  const nodeAndChildren = new Map<number, Set<number>>();
  for (const e of edges) {
    const set = nodeAndChildren.get(e[0]) || new Set();
    set.add(e[1]);
    nodeAndChildren.set(e[0], set);
    const _set = nodeAndChildren.get(e[1]) || new Set();
    _set.add(e[0]);
    nodeAndChildren.set(e[1], _set);
  }

  for (let e = 0; e < n; e++) {
    const set = nodeAndChildren.get(e) || new Set();
    nodeAndChildren.set(e, set);
  }

  console.log("nodeAndChildren: ", nodeAndChildren);

  const dfs = (n: number, prev: number, visited: Set<number>) => {
    if (visited.has(n)) {
      // cyclic path.
      return {res: false, visited};
    }

    visited.add(n);
    const children = nodeAndChildren.get(n) || new Set<number>();
    for (const node of children) {
      if (node === prev) {
        continue;
      }
      const res = dfs(node, n, visited);
      if (!res.res) {
        return {res: false, visited};
      }
    }

    return {res: true, visited};
  };

  for (const node of Array.from(nodeAndChildren.keys())) {
    const res = dfs(node, -1, new Set());
    console.log("n: ", node);
    console.log("visited: ", res);
    console.log("\n");
    if (res.res && res.visited.size === n) {
      return true;
    }
  }

  return false;
};

type GraphTestCase = {
  name: string;
  n: number;
  edges: number[][];
  expected: boolean;
};

// Tree validator for undirected graph (reference expectations):
// A valid tree must be connected and have exactly n-1 edges and be acyclic.
// (The test runner only uses `expected`; this comment is just for clarity.)

const graphTestCases: GraphTestCase[] = [
  {name: "01) n=1, no edges (single node tree)", n: 1, edges: [], expected: true},
  {name: "02) n=1, self-loop", n: 1, edges: [[0, 0]], expected: false},

  {name: "03) n=2, one edge", n: 2, edges: [[0, 1]], expected: true},
  {name: "04) n=2, no edges (disconnected)", n: 2, edges: [], expected: false},
  {name: "05) n=2, self-loop on one node (still disconnected + cycle)", n: 2, edges: [[0, 0]], expected: false},

  {name: "06) n=3, simple chain", n: 3, edges: [[0, 1], [1, 2]], expected: true},
  {name: "07) n=3, star centered at 0", n: 3, edges: [[0, 1], [0, 2]], expected: true},
  {name: "08) n=3, triangle cycle", n: 3, edges: [[0, 1], [1, 2], [0, 2]], expected: false},
  {name: "09) n=3, disconnected (only one edge)", n: 3, edges: [[0, 1]], expected: false},

  {name: "10) n=4, chain", n: 4, edges: [[0, 1], [1, 2], [2, 3]], expected: true},
  {name: "11) n=4, branching tree", n: 4, edges: [[0, 1], [1, 2], [1, 3]], expected: true},
  {name: "12) n=4, disconnected (two separate edges)", n: 4, edges: [[0, 1], [2, 3]], expected: false},
  {name: "13) n=4, cycle among 0-1-2 plus isolated 3", n: 4, edges: [[0, 1], [1, 2], [2, 0]], expected: false},
  {name: "14) n=4, 4-cycle", n: 4, edges: [[0, 1], [1, 2], [2, 3], [3, 0]], expected: false},
  {name: "15) n=4, valid tree connecting two pairs", n: 4, edges: [[0, 1], [2, 3], [1, 2]], expected: true},
  {name: "16) n=5, star centered at 0", n: 5, edges: [[0, 1], [0, 2], [0, 3], [0, 4]], expected: true},
  {name: "17) n=5, balanced-ish tree", n: 5, edges: [[0, 1], [0, 2], [1, 3], [1, 4]], expected: true},
  {
    name: "18) n=5, disconnected even with n-1 edges (cycle in one component)",
    n: 5,
    edges: [[0, 1], [1, 2], [2, 0], [3, 4]],
    expected: false,
  },
  {name: "19) n=5, cycle embedded (still n-1 edges)", n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 1]], expected: false},
  {name: "20) n=5, not enough edges (disconnected node 4)", n: 5, edges: [[0, 1], [1, 2], [2, 3]], expected: false},

  {name: "21) n=6, valid tree mixed structure", n: 6, edges: [[0, 1], [0, 2], [2, 3], [2, 4], [4, 5]], expected: true},
  {name: "22) n=6, single big cycle", n: 6, edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]], expected: false},
  {
    name: "23) n=6, connected but extra edge introduces cycle",
    n: 6,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 2]],
    expected: false,
  },
  {
    name: "24) n=6, n-1 edges but disconnected (cycle component + chain component)",
    n: 6,
    edges: [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5]],
    expected: false,
  },

  {name: "25) n=7, long chain", n: 7, edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]], expected: true},
  {
    name: "26) n=7, n-1 edges but disconnected (cycle + separate chain)",
    n: 7,
    edges: [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6]],
    expected: false,
  },
  {
    name: "27) n=7, missing edges (disconnected)",
    n: 7,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    expected: false,
  },

  {
    name: "28) n=8, valid multi-branch tree",
    n: 8,
    edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [5, 6], [5, 7]],
    expected: true,
  },
  {
    name: "29) n=8, previous tree + back edge creates cycle",
    n: 8,
    edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [5, 6], [5, 7], [7, 0]],
    expected: false,
  },

  {
    name: "30) n=10, long chain (tree)",
    n: 10,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    expected: true,
  },
  {name: "31) n=5, valid tree connecting two pairs", n: 5, edges: [[0, 1], [2, 0], [3, 0], [1, 4]], expected: true},

];

function runValidTreeTests() {
  // Assumes `validTree(n, edges)` exists in scope.
  const originalLog = console.log;

  let passed = 0;

  try {
    for (const tc of graphTestCases) {
      let actual: unknown;
      let threw = false;

      try {
        actual = validTree(tc.n, tc.edges);
      } catch (e) {
        console.error(e);
        threw = true;
        actual = e;
      }

      const ok = actual === tc.expected;

      if (!ok) {
        originalLog(
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
      console.info("\n");
    }
  } finally {
    console.log = originalLog; // restore
  }

  const total = graphTestCases.length;
  console.log(passed === total ? `All tests passed (${passed}/${total}).` : `Some tests failed (${passed}/${total}).`);
}

// Run automatically
runValidTreeTests();