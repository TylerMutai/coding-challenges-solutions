/**
 * Surrounded Regions
 * You are given a 2-D matrix board containing 'X' and 'O' characters.
 *
 * If a continuous, four-directionally connected group of 'O's is surrounded by 'X's, it is considered to be surrounded.
 *
 * Change all surrounded regions of 'O's to 'X's and do so in-place by modifying the input board.
 */
const solve = (board: string[][]) => {
  if (!board.length) {
    return board;
  }
  if (!board[0].length) {
    return board;
  }
  const rows = board.length;
  const cols = board[0].length;
  const getKey = (r: number, c: number) => `${r}_${c}`;
  const cellsThatRemain = new Set<string>();


  // Called only for those cells that shouldn't change.
  const dfs = (r: number, c: number) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols) {
      return;
    }

    const k = getKey(r, c);

    // Skip cel
    // Skip visited cells.
    if (cellsThatRemain.has(k)) {
      return;
    }

    cellsThatRemain.add(k);

    // Check left, right, top, bottom and repeat if they are 'O's this recursively.
    const left = [r - 1, c];
    const right = [r + 1, c];
    const top = [r, c - 1];
    const bottom = [r, c + 1];

    if (left[0] < rows - 1 && left[0] > 0 && left[1] < cols - 1 && left[1] > 0) {
      // within range.
      if (board[left[0]][left[1]] === 'O') {
        dfs(left[0], left[1]);
      }
    }

    if (right[0] < rows - 1 && right[0] > 0 && right[1] < cols - 1 && right[1] > 0) {
      // within range.
      if (board[right[0]][right[1]] === 'O') {
        dfs(right[0], right[1]);
      }
    }

    if (top[0] < rows - 1 && top[0] > 0 && top[1] < cols - 1 && top[1] > 0) {
      // within range.
      if (board[top[0]][top[1]] === 'O') {
        dfs(top[0], top[1]);
      }
    }

    if (bottom[0] < rows - 1 && bottom[0] > 0 && bottom[1] < cols - 1 && bottom[1] > 0) {
      // within range.
      if (board[bottom[0]][bottom[1]] === 'O') {
        dfs(bottom[0], bottom[1]);
      }
    }

  };

  // Loop through the edges and check for any 'O's.
  for (let r = 0; r < rows; r++) {
    if (board[r][0] === 'O') {
      dfs(r, 0);
    }
  }

  for (let r = 0; r < rows; r++) {
    if (board[r][cols - 1] === 'O') {
      dfs(r, cols - 1);
    }
  }

  // starting at one and ending at less than 1 since we've already covered these in the previous loops.
  for (let c = 1; c < cols - 1; c++) {
    if (board[0][c] === 'O') {
      dfs(0, c);
    }
  }


  for (let c = 1; c < cols - 1; c++) {
    if (board[rows - 1][c] === 'O') {
      dfs(rows - 1, c);
    }
  }

  // Now lastly, replace all unmarked 'O's with 'X's
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O' && !cellsThatRemain.has(getKey(r, c))) {
        board[r][c] = 'X';
      }
    }
  }

  return board;
};

/////////////////// Test cases //////////////////////
type Board = string[][];
type TestCase = { name: string; input: Board; expected: Board };

// --- helpers ---
const cloneBoard = (b: Board): Board => b.map(row => [...row]);
const boardsEqual = (a: Board, b: Board): boolean =>
  a.length === b.length &&
  a.every((row, i) => row.length === b[i].length && row.every((cell, j) => cell === b[i][j]));

const formatBoard = (b: Board) => b.map(r => r.join(" ")).join("\n");

// --- runner (prints PASS/FAIL + diffs) ---

const runTests = (tests: TestCase[]) => {
  let passed = 0;

  for (const t of tests) {
    const input = cloneBoard(t.input);     // keep test input immutable
    const before = cloneBoard(t.input);    // for logging
    const actual = solve(input);           // solve mutates in-place
    const ok = boardsEqual(actual, t.expected);

    if (ok) {
      passed++;
    }

    console.log(`\n[${ok ? "PASS" : "FAIL"}] ${t.name}`);
    if (!ok) {
      console.log("Input:");
      console.log(formatBoard(before));
      console.log("\nExpected:");
      console.log(formatBoard(t.expected));
      console.log("\nActual:");
      console.log(formatBoard(actual));
    }
  }

  console.log(`\nSummary: ${passed}/${tests.length} passed`);
};

export const tests = [
  {
    name: "0) Empty board (robustness)",
    input: [],
    expected: [],
  },
  {
    name: "0b) Board with empty row (robustness)",
    input: [[]],
    expected: [[]],
  },
  {
    name: "1) 1x1: O stays O (border)",
    input: [["O"]],
    expected: [["O"]],
  },
  {
    name: "2) 1x1: X stays X",
    input: [["X"]],
    expected: [["X"]],
  },
  {
    name: "3) 1x5: all O are border -> none flip",
    input: [["X", "O", "O", "X", "O"]],
    expected: [["X", "O", "O", "X", "O"]],
  },
  {
    name: "4) 5x1: all O are border -> none flip",
    input: [["X"], ["O"], ["O"], ["X"], ["O"]],
    expected: [["X"], ["O"], ["O"], ["X"], ["O"]],
  },
  {
    name: "5) 2x2: all O (all border) -> none flip",
    input: [
      ["O", "O"],
      ["O", "O"],
    ],
    expected: [
      ["O", "O"],
      ["O", "O"],
    ],
  },
  {
    name: "6) 2x2: mixed (all border anyway) -> unchanged",
    input: [
      ["X", "O"],
      ["O", "X"],
    ],
    expected: [
      ["X", "O"],
      ["O", "X"],
    ],
  },
  {
    name: "7) 3x3: single center O is surrounded -> flips",
    input: [
      ["X", "X", "X"],
      ["X", "O", "X"],
      ["X", "X", "X"],
    ],
    expected: [
      ["X", "X", "X"],
      ["X", "X", "X"],
      ["X", "X", "X"],
    ],
  },
  {
    name: "8) Diagonal connection does NOT count -> center flips",
    input: [
      ["O", "X", "X"],
      ["X", "O", "X"],
      ["X", "X", "X"],
    ],
    expected: [
      ["O", "X", "X"],
      ["X", "X", "X"],
      ["X", "X", "X"],
    ],
  },
  {
    name: "9) Border-connected plus-shape -> all O stay",
    input: [
      ["X", "O", "X"],
      ["O", "O", "O"],
      ["X", "O", "X"],
    ],
    expected: [
      ["X", "O", "X"],
      ["O", "O", "O"],
      ["X", "O", "X"],
    ],
  },
  {
    name: "10) Classic LeetCode sample: preserve border-connected, flip enclosed",
    input: [
      ["X", "X", "X", "X"],
      ["X", "O", "O", "X"],
      ["X", "X", "O", "X"],
      ["X", "O", "X", "X"],
    ],
    expected: [
      ["X", "X", "X", "X"],
      ["X", "X", "X", "X"],
      ["X", "X", "X", "X"],
      ["X", "O", "X", "X"],
    ],
  },
  {
    name: "11) Multiple enclosed regions -> all flip",
    input: [
      ["X", "X", "X", "X", "X"],
      ["X", "O", "X", "O", "X"],
      ["X", "O", "X", "O", "X"],
      ["X", "X", "X", "X", "X"],
    ],
    expected: [
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
    ],
  },
  {
    name: "12) Mixed: one border-connected region stays, one enclosed flips",
    input: [
      ["X", "O", "X", "X", "X"],
      ["X", "O", "X", "O", "X"],
      ["X", "O", "X", "O", "X"],
      ["X", "X", "X", "O", "X"],
      ["X", "X", "X", "X", "X"],
    ],
    expected: [
      ["X", "O", "X", "X", "X"],
      ["X", "O", "X", "X", "X"],
      ["X", "O", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
    ],
  },
  {
    name: "13) All X (no-op)",
    input: [
      ["X", "X", "X"],
      ["X", "X", "X"],
      ["X", "X", "X"],
    ],
    expected: [
      ["X", "X", "X"],
      ["X", "X", "X"],
      ["X", "X", "X"],
    ],
  },
  {
    name: "14) All O (border-connected everywhere) -> no flips",
    input: [
      ["O", "O", "O"],
      ["O", "O", "O"],
      ["O", "O", "O"],
    ],
    expected: [
      ["O", "O", "O"],
      ["O", "O", "O"],
      ["O", "O", "O"],
    ],
  },
  {
    name: "15) 5x5 checkerboard: interior O's flip, border O's stay",
    input: [
      ["O", "X", "O", "X", "O"],
      ["X", "O", "X", "O", "X"],
      ["O", "X", "O", "X", "O"],
      ["X", "O", "X", "O", "X"],
      ["O", "X", "O", "X", "O"],
    ],
    expected: [
      ["O", "X", "O", "X", "O"],
      ["X", "X", "X", "X", "X"],
      ["O", "X", "X", "X", "O"],
      ["X", "X", "X", "X", "X"],
      ["O", "X", "O", "X", "O"],
    ],
  },
  {
    name: "16) Donut: enclosed O ring -> all flip",
    input: [
      ["X", "X", "X", "X", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "O", "X", "O", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "X", "X", "X", "X"],
    ],
    expected: [
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
    ],
  },
  {
    name: "17) Border opening: interior connected to border -> all those O stay",
    input: [
      ["X", "O", "X", "X", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "X", "X", "O", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "X", "X", "X", "X"],
    ],
    expected: [
      ["X", "O", "X", "X", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "X", "X", "O", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "X", "X", "X", "X"],
    ],
  },
  {
    name: "18) Border O sea with an enclosed single O island -> island flips",
    input: [
      ["O", "O", "O", "O", "O"],
      ["O", "X", "X", "X", "O"],
      ["O", "X", "O", "X", "O"],
      ["O", "X", "X", "X", "O"],
      ["O", "O", "O", "O", "O"],
    ],
    expected: [
      ["O", "O", "O", "O", "O"],
      ["O", "X", "X", "X", "O"],
      ["O", "X", "X", "X", "O"],
      ["O", "X", "X", "X", "O"],
      ["O", "O", "O", "O", "O"],
    ],
  },
  {
    name: "19) Large region enclosed by X border -> all flip",
    input: [
      ["X", "X", "X", "X"],
      ["X", "O", "O", "X"],
      ["X", "O", "O", "X"],
      ["X", "X", "X", "X"],
    ],
    expected: [
      ["X", "X", "X", "X"],
      ["X", "X", "X", "X"],
      ["X", "X", "X", "X"],
      ["X", "X", "X", "X"],
    ],
  },
  {
    name: "20) Long corridor to border (touches border at last column) -> all connected O stay",
    input: [
      ["X", "X", "X", "X", "X", "X"],
      ["X", "O", "O", "O", "O", "X"],
      ["X", "X", "O", "O", "O", "X"],
      ["X", "O", "X", "O", "O", "X"],
      ["X", "O", "O", "O", "O", "O"], // (4,5) is border O, connects inward
      ["X", "X", "X", "X", "X", "X"],
    ],
    expected: [
      ["X", "X", "X", "X", "X", "X"],
      ["X", "O", "O", "O", "O", "X"],
      ["X", "X", "O", "O", "O", "X"],
      ["X", "O", "X", "O", "O", "X"],
      ["X", "O", "O", "O", "O", "O"],
      ["X", "X", "X", "X", "X", "X"],
    ],
  },
];

runTests(tests);


