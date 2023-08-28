/**
 *
 * Given a binary tree, determine if it is height-balanced
 *
 * A height-balanced binary tree is a binary tree in which the depth of
 * the two subtrees of every node never differs by more than one.
 */

function dfs(root) {
  if (root === null) {
    return [true, 0];
  }

  const left = dfs(root.left);
  const right = dfs(root.right);
  const diff = Math.abs(left[1] - right[1]);
  const isBalanced = diff <= 1 && left[0] && right[0];

  return [isBalanced, 1 + Math.max(left[1], right[1])];
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = function (root) {
  return dfs(root)[0];
};