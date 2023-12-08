/**
 * Serialization is the process of converting a data structure or object into a sequence of
 * bits so that it can be stored in a file or memory buffer, or transmitted across a network
 * connection link to be reconstructed later in the same or another computer environment.
 *
 * Design an algorithm to serialize and deserialize a binary tree. There is no restriction
 * on how your serialization/deserialization algorithm should work. You just need to ensure
 * that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
 *
 * Clarification: The input/output format is the same as how LeetCode serializes a binary tree.
 * You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
function serialize(root) {
  let nodes = [];

  function dfsInorder(node) {
    if (node === null) {
      return null;
    }
    nodes.push([node.val, node.left?.val ?? null, node.right?.val ?? null]);
    if (node.left) dfsInorder(node.left);
    if (node.right) dfsInorder(node.right);
  }

  dfsInorder(root);
  return JSON.stringify(nodes);
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
function deserialize(data) {
  const nodesArr = JSON.parse(data);
  if (!nodesArr.length) return null;
  const nodes = new Map();
  for (const val of nodesArr) {
    const _root = nodes.get(val[0]) ?? new TreeNode(val[0]);
    const left = val[1] == null ? null :
      nodes.get(val[1]) ?? new TreeNode(val[1]);
    const right = val[2] == null ? null :
      nodes.get(val[2]) ?? new TreeNode(val[2]);
    _root.left = left;
    _root.right = right;
    nodes.set(_root.val, _root);
    if (left)
      nodes.set(left.val, left);
    if (right)
      nodes.set(right.val, right);

  }
  return nodes.get(nodesArr[0][0]);
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */