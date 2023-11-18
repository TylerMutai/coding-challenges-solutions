/**
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree
 * and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 */

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
  // first create nodes for all values in preorder.
  const preorderNodes = new Map();
  for (const val of preorder) {
    preorderNodes.set(val, new TreeNode(val));
  }

  const inorderSet = new Set();
  let inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderSet.add(inorder[i]);
    inorderMap.set(inorder[i], i);
  }

  // traverse left first for all nodes.
  for (const val of preorder) {
    const node = preorderNodes.get(val);

    // get first node to left of this node.
    const leftNodeIndex = (inorderMap.get(val) ?? 0) - 1;
    if (leftNodeIndex >= 0) {
      const leftNode = inorder[leftNodeIndex];
      node.left = preorderNodes.get(leftNode);
      preorderNodes.set(node.val, node);
      inorderSet.delete(leftNode);
      const inorderVals = Array.from(inorderSet.values());
      inorderMap = new Map();
      for (let i = 0; i < inorderVals.length; i++) {
        inorderMap.set(inorderVals[i], i);
      }
    }
  }

  // at this point all nodes should have their corresponding left nodes.
  console.log("nodes: ", preorderNodes);

  //
}