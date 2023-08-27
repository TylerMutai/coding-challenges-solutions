/**
 *
 * Given the root of a binary tree, invert the tree, and return its root.
 */

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
  if (root == null) {
    return root;
  }

  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  // invert left tree
  invertTree(root.left);

  // invert right tree
  invertTree(root.right);

  return root;
}