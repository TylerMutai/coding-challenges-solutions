/**
 * Given the root of a binary search tree,
 * and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.
 */

function kthSmallest(root, k) {
  const values = [];

  function dfs(root) {
    if (root === null) return;
    values.push(root.val);
    dfs(root.left);
    dfs(root.right);
  }

  dfs(root);
  values.sort((a, b) => a - b);
  if (k - 1 < values.length) {
    return values[k - 1];
  }
  return null;
}

// This is faster, since we do not need an additional step for sorting the list.
function kthSmallestInOrderTraversal(root, k) {
  const values = [];

  function ios(root) {
    if (root === null) return;
    ios(root.left);
    values.push(root.val);
    ios(root.right);
  }

  ios(root);
  if ((k - 1) < values.length) {
    return values[k - 1];
  }
  return null;
}