/**
 *
 * Given the root of a binary tree, return its maximum depth.
 *
 * A binary tree's maximum depth is the number of nodes along the
 * longest path from the root node down to the farthest leaf node.
 */

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  if (root === null) {
    return 0;
  }
  const depthLeft = 1+ maxDepth(root.left);
  const depthRight = 1+ maxDepth(root.right);
  return Math.max(depthLeft, depthRight);
}

