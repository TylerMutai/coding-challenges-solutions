/**
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the
 * sequence has an edge connecting them. A node can only appear in the sequence at most once.
 * Note that the path does not need to pass through the root.
 *
 * The path sum of a path is the sum of the node's values in the path.
 *
 * Given the root of a binary tree, return the maximum path sum of any non-empty path.
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
  let currentLargest = Number.NEGATIVE_INFINITY;

  function dfs(node) {
    if (node === null) {
      return 0;
    }
    const left = node.val + dfs(node.left);
    const right = node.val + dfs(node.right);
    const leftRight = (left + right) - node.val;
    console.log("node: ", node.val);
    console.log("leftNode: ", node.left);
    console.log("rightNode: ", node.right);
    console.log("left: ", left);
    console.log("right: ", right);
    console.log("leftRight: ", leftRight);
    console.log("--------------------------");
    currentLargest = Math.max(currentLargest, node.val, left, right, leftRight)

    return Math.max(node.val, left, right);
  }

  dfs(root);
  return currentLargest;
}