/**
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 *
 * A valid BST is defined as follows:
 *
 * The left subtree of a node contains only nodes with keys less than the node's key.
 * The right subtree of a node contains only nodes with keys greater than the node's key.
 * Both the left and right subtrees must also be binary search trees.
 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
  if (root === null) return true;

  function minimumNode(node) {
    if (node === null) return Number.POSITIVE_INFINITY;

    const leftSubtree = minimumNode(node.left);

    return Math.min(node.val, leftSubtree);
  }

  function maximumNode(node) {
    if (node === null) return Number.NEGATIVE_INFINITY;

    const rightSubtree = maximumNode(node.right);

    return Math.max(node.val, rightSubtree);
  }

  function isValidRecurse(root) {
    if (root === null) return true;
    const left = isValidRecurse(root.left);
    const right = isValidRecurse(root.right);
    const leftMax = maximumNode(root.left);
    const rightMin = minimumNode(root.right);
    console.log("Left Valid: ", left);
    console.log("Right Valid: ", left);
    console.log("Left Max: ", leftMax);
    console.log("Right Min: ", rightMin);

    return left && right && root.val > leftMax && root.val < rightMin
  }

  const isValidTree = isValidRecurse(root);
  console.log("Is valid tree: ", isValidTree);

  return isValidTree;
}