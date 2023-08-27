/**
 *
 * Given the root of a binary tree, return the length of the diameter of the tree.
 *
 * The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
 * This path may or may not pass through the root.
 *
 * The length of a path between two nodes is represented by the number of edges between them.
 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

let max = [];

function recurse(root) {
  if (root == null) {
    return -1;
  }

  const depthLeft = 1 + recurse(root.left);
  const depthRight = 1 + recurse(root.right);
  max = Math.max(max, depthLeft + depthRight);
  console.log("Node:::: ", root.val);
  console.log("depthLeft", depthLeft);
  console.log("depthRight", depthRight);
  console.log("max", max);
  console.log("------------------------");

  return Math.max(depthLeft, depthRight);
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
  max = 0;
  recurse(root);
  console.log("Node:::: ", root.val);
  console.log("depth", max);
  console.log("max", max);
  console.log("------------------------");
  return max;
}