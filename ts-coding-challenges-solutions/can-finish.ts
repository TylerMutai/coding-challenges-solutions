/**
 * You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if
 * you want to take course a.
 *
 * The pair [0, 1], indicates that must take course 1 before taking course 0.
 *
 * There are a total of numCourses courses you are required to take, labeled from 0 to numCourses - 1.
 *
 * Return true if it is possible to finish all courses, otherwise return false.
 */

const canFinish = (numCourses: number, prerequisites: number[][]) => {
  if (prerequisites.length === 0) {
    return true;
  }

  const coursesAndPrerequisites = new Map<number, Set<number>>();

  for (const preq of prerequisites) {
    const set = coursesAndPrerequisites.get(preq[0]) || new Set();
    set.add(preq[1]);
    coursesAndPrerequisites.set(preq[0], set);
  }

  // Now add all courses that are missing (don't have prerequisites).
  for (const preq of prerequisites) {
    const set = coursesAndPrerequisites.get(preq[0]) || new Set();
    coursesAndPrerequisites.set(preq[0], set);
    const set1 = coursesAndPrerequisites.get(preq[1]) || new Set();
    coursesAndPrerequisites.set(preq[1], set1);
  }

  console.log("coursesAndPrerequisites: ", coursesAndPrerequisites);

  const validCourses = new Set<number>();
  const dfs = (c: number, visited: Set<number>) => {
    console.log("visited", visited);
    if (validCourses.has(c)) {
      return true;
    }
    if (visited.has(c)) {
      return false;
    }
    visited.add(c);
    const preqs = coursesAndPrerequisites.get(c) || new Set();
    if (!preqs.size) {
      validCourses.add(c);
      return true;
    }

    for (const p of Array.from(preqs.values())) {
      if (!dfs(p, visited)) {
        return false;
      }
    }

    validCourses.add(c);
    return true;
  };

  for (let c = 0; c < numCourses; c++) {
    if (dfs(c, new Set())) {
      validCourses.add(c);
    }
    console.log("validCourses: ", validCourses);
    if (validCourses.size >= numCourses) {
      return true;
    }
  }
  return validCourses.size >= numCourses;
};

type TestCase = {
  name: string;
  numCourses: number;
  prerequisites: number[][];
  expected: boolean;
};

const testCases: TestCase[] = [
  {
    name: "01) numCourses=0, no prerequisites",
    numCourses: 0,
    prerequisites: [],
    expected: true,
  },
  {
    name: "02) single course, no prerequisites",
    numCourses: 1,
    prerequisites: [],
    expected: true,
  },
  {
    name: "03) two courses, no prerequisites",
    numCourses: 2,
    prerequisites: [],
    expected: true,
  },
  {
    name: "04) simple prerequisite (1 depends on 0)",
    numCourses: 2,
    prerequisites: [[1, 0]],
    expected: true,
  },
  {
    name: "05) simple prerequisite (0 depends on 1)",
    numCourses: 2,
    prerequisites: [[0, 1]],
    expected: true,
  },
  {
    name: "06) two-course cycle",
    numCourses: 2,
    prerequisites: [
      [0, 1],
      [1, 0],
    ],
    expected: false,
  },
  {
    name: "07) self-dependency cycle",
    numCourses: 1,
    prerequisites: [[0, 0]],
    expected: false,
  },
  {
    name: "08) simple chain (0 -> 1 -> 2)",
    numCourses: 3,
    prerequisites: [
      [1, 0],
      [2, 1],
    ],
    expected: true,
  },
  {
    name: "09) 3-node cycle",
    numCourses: 3,
    prerequisites: [
      [1, 0],
      [2, 1],
      [0, 2],
    ],
    expected: false,
  },
  {
    name: "10) diamond dependency (acyclic)",
    numCourses: 4,
    prerequisites: [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ],
    expected: true,
  },
  {
    name: "11) diamond + back edge creates cycle",
    numCourses: 4,
    prerequisites: [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
      [0, 3],
    ],
    expected: false,
  },
  {
    name: "12) long chain length 5 (acyclic)",
    numCourses: 5,
    prerequisites: [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
    ],
    expected: true,
  },
  {
    name: "13) cycle embedded in longer chain",
    numCourses: 5,
    prerequisites: [
      [1, 0],
      [2, 1],
      [3, 2],
      [1, 3], // creates cycle 1->2->3->1
    ],
    expected: false,
  },
  {
    name: "14) multiple prerequisites per course (fan-in), acyclic",
    numCourses: 5,
    prerequisites: [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
    ],
    expected: true,
  },
  {
    name: "15) disconnected graph: one component cyclic",
    numCourses: 5,
    prerequisites: [
      [0, 1],
      [1, 2],
      [2, 0], // cycle among 0,1,2
      [3, 4],
    ],
    expected: false,
  },
  {
    name: "16) layered DAG with joins (acyclic)",
    numCourses: 6,
    prerequisites: [
      [2, 1],
      [2, 0],
      [3, 2],
      [4, 2],
      [5, 3],
      [5, 4],
    ],
    expected: true,
  },
  {
    name: "17) layered DAG + back dependency creates cycle",
    numCourses: 6,
    prerequisites: [
      [2, 1],
      [2, 0],
      [3, 2],
      [4, 2],
      [5, 3],
      [5, 4],
      [1, 5], // cycle: 2->1->5->3->2
    ],
    expected: false,
  },
  {
    name: "18) duplicate edges should not change result (acyclic)",
    numCourses: 3,
    prerequisites: [
      [1, 0],
      [1, 0],
    ],
    expected: true,
  },
  {
    name: "19) 3-node cycle via different ordering",
    numCourses: 3,
    prerequisites: [
      [1, 0],
      [0, 2],
      [2, 1],
    ],
    expected: false,
  },
  {
    name: "20) course with two prerequisites + dependent course (acyclic)",
    numCourses: 4,
    prerequisites: [
      [2, 0],
      [2, 1],
      [3, 2],
    ],
    expected: true,
  },
  {
    name: "21) cycle created via prerequisite chain",
    numCourses: 4,
    prerequisites: [
      [2, 0],
      [2, 1],
      [3, 2],
      [1, 3], // cycle: 1->3->2->1
    ],
    expected: false,
  },
  {
    name: "22) larger numCourses, empty prerequisites",
    numCourses: 10,
    prerequisites: [],
    expected: true,
  },
  {
    name: "23) long chain (0->1->...->9), acyclic",
    numCourses: 10,
    prerequisites: [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4],
      [6, 5],
      [7, 6],
      [8, 7],
      [9, 8],
    ],
    expected: true,
  },
  {
    name: "24) long chain + back edge makes a big cycle",
    numCourses: 10,
    prerequisites: [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4],
      [6, 5],
      [7, 6],
      [8, 7],
      [9, 8],
      [0, 9], // cycle
    ],
    expected: false,
  },
  {
    name: "25) numCourses larger than referenced courses (extras are free)",
    numCourses: 7,
    prerequisites: [
      [1, 0],
      [2, 1],
    ],
    expected: true,
  },
  {
    name: "26) numCourses larger than referenced courses but cycle exists",
    numCourses: 7,
    prerequisites: [
      [1, 0],
      [2, 1],
      [0, 2], // cycle among 0,1,2
    ],
    expected: false,
  },
  {
    name: "27) star: one course depends on many (acyclic)",
    numCourses: 4,
    prerequisites: [
      [3, 0],
      [3, 1],
      [3, 2],
    ],
    expected: true,
  },
  {
    name: "28) star + reverse dependency makes 2-node cycle",
    numCourses: 4,
    prerequisites: [
      [3, 0],
      [3, 1],
      [3, 2],
      [2, 3], // cycle between 2 and 3
    ],
    expected: false,
  },
  {
    name: "29) complex DAG (multiple branches and joins), acyclic",
    numCourses: 8,
    prerequisites: [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
      [4, 1],
      [5, 3],
      [6, 3],
      [7, 4],
      [7, 5],
    ],
    expected: true,
  },
  {
    name: "30) complex DAG + back edge creates cycle",
    numCourses: 8,
    prerequisites: [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
      [4, 1],
      [5, 3],
      [6, 3],
      [7, 4],
      [7, 5],
      [0, 7], // cycle
    ],
    expected: false,
  },
];

function runCanFinishTests() {
  // Assumes `canFinish` is already defined/imported in scope.
  let passed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];

    let actual: unknown;
    let threw = false;

    try {
      actual = canFinish(tc.numCourses, tc.prerequisites);
    } catch (err) {
      threw = true;
      actual = err;
    }

    const ok = actual === tc.expected;

    if (ok) {
      passed++;
    } else {
      console.error(
        [
          `FAIL: ${tc.name}`,
          `  numCourses: ${tc.numCourses}`,
          `  prerequisites: ${JSON.stringify(tc.prerequisites)}`,
          `  expected: ${tc.expected}`,
          `  actual: ${threw ? "THREW" : String(actual)} (${typeof actual})`,
        ].join("\n"),
      );
    }
    console.log("\n");
  }

  const total = testCases.length;
  if (passed === total) {
    console.log(`All tests passed (${passed}/${total}).`);
  } else {
    console.log(`Some tests failed (${passed}/${total}).`);
  }
}

// Run automatically
runCanFinishTests();