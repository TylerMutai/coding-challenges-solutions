/**
 * Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.
 *
 * According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q
 * as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {

  // search q
  function binarySearch(root,searchNode,paths){
    if (root == null){
      return;
    }

    paths.push(root);
    if (root.val === searchNode.val){
      return;
    }

    if(searchNode.val > root.val){
      binarySearch(root.right, searchNode, paths);
    } else {
      binarySearch(root.left,searchNode, paths);
    }
  }

  const pathsP = [];
  const pathsQ = [];

  binarySearch(root,p,pathsP);
  binarySearch(root,q,pathsQ);

  // for both paths, check for similarities.
  const paths = new Set(pathsP.map(n=>n.val));

  for (let i=pathsQ.length - 1;i>=0;i--){
    const p = pathsQ[i];
    if(paths.has(p.val)){
      return p;
    }
  }
  return null;
};