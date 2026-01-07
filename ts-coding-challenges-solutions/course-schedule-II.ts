/**
 *
 */

const findOrder = (numCourses: number, prerequisites: number[][]) => {
  const courseAndPreqs = new Map<number, Set<number>>();
  for (const preq of prerequisites) {
    const set = courseAndPreqs.get(preq[0]) || new Set();
    set.add(preq[1]);
    courseAndPreqs.set(preq[0], set);
  }
  for (let c = 0; c < numCourses; c++) {
    const set = courseAndPreqs.get(c) || new Set();
    courseAndPreqs.set(c, set);
  }
  console.log("courseAndPreqs: ", courseAndPreqs);

  const validCourses = new Set<number>();
  const dfs = (c: number, visited: Set<number>): boolean => {
    if (validCourses.has(c)) {
      return true;
    }
    const set = courseAndPreqs.get(c) || new Set();
    if (visited.has(c)) {
      return false;
    }
    visited.add(c);
    for (const p of Array.from(set)) {
      const res = dfs(p, visited);
      if (!res) {
        return false;
      }
    }
    validCourses.add(c);
    return true;
  };

  for (const k of Array.from(courseAndPreqs.keys())) {
    dfs(k, new Set());
    console.log("validCourses: ", validCourses);
  }
  if (validCourses.size === numCourses) {
    return Array.from(validCourses);
  }

  return [];
};

type Expected = "anyValid" | "empty";

type TestCaseII = {
  name: string;
  numCourses: number;
  prerequisites: number[][];
  expected: Expected;
};

// Validates topological ordering rules for Course Schedule II.
function isValidOrder(
  numCourses: number,
  prerequisites: number[][],
  order: number[],
): boolean {
  if (!Array.isArray(order)) {
    return false;
  }
  if (order.length !== numCourses) {
    return false;
  }

  // Must be a permutation of [0..numCourses-1]
  const seen = new Array<boolean>(numCourses).fill(false);
  for (const x of order) {
    if (!Number.isInteger(x)) {
      return false;
    }
    if (x < 0 || x >= numCourses) {
      return false;
    }
    if (seen[x]) {
      return false;
    }
    seen[x] = true;
  }

  const pos = new Array<number>(numCourses);
  for (let i = 0; i < order.length; i++) {
    pos[order[i]] = i;
  }

  for (const [a, b] of prerequisites) {
    // b must come before a
    if (pos[b] > pos[a]) {
      return false;
    }
  }
  return true;
}

// Independent cycle check (Kahn). Used to sanity-check "anyValid" results.
function hasCycleKahn(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({length: numCourses}, () => []);
  const indeg = new Array<number>(numCourses).fill(0);

  for (const [a, b] of prerequisites) {
    adj[b].push(a); // b -> a
    indeg[a]++;
  }

  const q: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (indeg[i] === 0) {
      q.push(i);
    }
  }

  let taken = 0;
  for (let head = 0; head < q.length; head++) {
    const u = q[head];
    taken++;
    for (const v of adj[u]) {
      indeg[v]--;
      if (indeg[v] === 0) {
        q.push(v);
      }
    }
  }
  return taken !== numCourses;
}

const testCasesII: TestCaseII[] = [
  {name: "01) numCourses=0, prerequisites=[]", numCourses: 0, prerequisites: [], expected: "anyValid"},
  {name: "02) numCourses=1, prerequisites=[]", numCourses: 1, prerequisites: [], expected: "anyValid"},
  {name: "03) numCourses=2, prerequisites=[]", numCourses: 2, prerequisites: [], expected: "anyValid"},

  {name: "04) single edge: [1,0]", numCourses: 2, prerequisites: [[1, 0]], expected: "anyValid"},
  {name: "05) single edge: [0,1]", numCourses: 2, prerequisites: [[0, 1]], expected: "anyValid"},

  {name: "06) two-node cycle", numCourses: 2, prerequisites: [[0, 1], [1, 0]], expected: "empty"},
  {name: "07) self-loop cycle", numCourses: 1, prerequisites: [[0, 0]], expected: "empty"},

  {name: "08) simple chain 0->1->2", numCourses: 3, prerequisites: [[1, 0], [2, 1]], expected: "anyValid"},
  {name: "09) 3-cycle", numCourses: 3, prerequisites: [[1, 0], [2, 1], [0, 2]], expected: "empty"},

  {name: "10) diamond DAG", numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]], expected: "anyValid"},
  {
    name: "11) diamond + back edge (cycle)",
    numCourses: 4,
    prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2], [0, 3]],
    expected: "empty",
  },

  {
    name: "12) long chain length 5",
    numCourses: 5,
    prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3]],
    expected: "anyValid",
  },
  {
    name: "13) cycle embedded in chain (1->2->3->1)",
    numCourses: 5,
    prerequisites: [[1, 0], [2, 1], [3, 2], [1, 3]],
    expected: "empty",
  },

  {
    name: "14) fan-in DAG (multiple prereqs)",
    numCourses: 5,
    prerequisites: [[0, 1], [0, 2], [1, 3], [1, 4]],
    expected: "anyValid",
  },
  {
    name: "15) disconnected graph: one component cyclic",
    numCourses: 5,
    prerequisites: [[0, 1], [1, 2], [2, 0], [3, 4]],
    expected: "empty",
  },

  {
    name: "16) layered DAG with joins",
    numCourses: 6,
    prerequisites: [[2, 1], [2, 0], [3, 2], [4, 2], [5, 3], [5, 4]],
    expected: "anyValid",
  },
  {
    name: "17) layered + back edge creates cycle",
    numCourses: 6,
    prerequisites: [[2, 1], [2, 0], [3, 2], [4, 2], [5, 3], [5, 4], [1, 5]],
    expected: "empty",
  },

  {
    name: "18) duplicate edges should not affect validity",
    numCourses: 3,
    prerequisites: [[1, 0], [1, 0]],
    expected: "anyValid",
  },
  {name: "19) 3-cycle (different ordering)", numCourses: 3, prerequisites: [[1, 0], [0, 2], [2, 1]], expected: "empty"},

  {
    name: "20) fan-in then depend (acyclic)",
    numCourses: 4,
    prerequisites: [[2, 0], [2, 1], [3, 2]],
    expected: "anyValid",
  },
  {
    name: "21) fan-in + back edge creates cycle",
    numCourses: 4,
    prerequisites: [[2, 0], [2, 1], [3, 2], [1, 3]],
    expected: "empty",
  },

  {name: "22) larger numCourses, prerequisites=[]", numCourses: 10, prerequisites: [], expected: "anyValid"},

  {
    name: "23) long chain length 10",
    numCourses: 10,
    prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6], [8, 7], [9, 8]],
    expected: "anyValid",
  },
  {
    name: "24) long chain + back edge makes big cycle",
    numCourses: 10,
    prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6], [8, 7], [9, 8], [0, 9]],
    expected: "empty",
  },

  {
    name: "25) numCourses larger than referenced courses (extras unconstrained)",
    numCourses: 7,
    prerequisites: [[1, 0], [2, 1]],
    expected: "anyValid",
  },
  {
    name: "26) numCourses larger than referenced courses but cycle exists",
    numCourses: 7,
    prerequisites: [[1, 0], [2, 1], [0, 2]],
    expected: "empty",
  },

  {
    name: "27) star: one course depends on many",
    numCourses: 4,
    prerequisites: [[3, 0], [3, 1], [3, 2]],
    expected: "anyValid",
  },
  {
    name: "28) star + reverse dependency creates cycle",
    numCourses: 4,
    prerequisites: [[3, 0], [3, 1], [3, 2], [2, 3]],
    expected: "empty",
  },

  {
    name: "29) complex DAG (branches/joins)",
    numCourses: 8,
    prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2], [4, 1], [5, 3], [6, 3], [7, 4], [7, 5]],
    expected: "anyValid",
  },
  {
    name: "30) complex DAG + back edge creates cycle",
    numCourses: 8,
    prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2], [4, 1], [5, 3], [6, 3], [7, 4], [7, 5], [0, 7]],
    expected: "empty",
  },
];

function runFindOrderTests() {
  // Assumes `findOrder(numCourses, prerequisites)` exists in scope.
  let passed = 0;

  for (const tc of testCasesII) {
    let actual: unknown;
    let threw = false;

    try {
      actual = findOrder(tc.numCourses, tc.prerequisites);
    } catch (e) {
      threw = true;
      actual = e;
    }
    console.log("actual: ", actual);

    let ok = false;

    if (tc.expected === "empty") {
      ok = Array.isArray(actual) && (actual as unknown[]).length === 0;
    } else {
      ok = Array.isArray(actual) && isValidOrder(tc.numCourses, tc.prerequisites, actual as number[]);

      // Sanity: if there's a cycle, there should be no valid order.
      const cycle = hasCycleKahn(tc.numCourses, tc.prerequisites);
      if (cycle && ok) {
        ok = false;
      }
    }

    if (!ok) {
      const type = Array.isArray(actual) ? "array" : typeof actual;
      console.error(
        [
          `FAIL: ${tc.name}`,
          `  numCourses: ${tc.numCourses}`,
          `  prerequisites: ${JSON.stringify(tc.prerequisites)}`,
          `  expected: ${tc.expected}`,
          `  actualType: ${threw ? "threw" : type}`,
          `  actual: ${threw ? String(actual) : JSON.stringify(actual)}`,
        ].join("\n"),
      );
    } else {
      passed++;
    }
    console.log("\n\n");
  }

  const total = testCasesII.length;
  console.log(passed === total ? `All tests passed (${passed}/${total}).` : `Some tests failed (${passed}/${total}).`);
}

// Run automatically
runFindOrderTests();