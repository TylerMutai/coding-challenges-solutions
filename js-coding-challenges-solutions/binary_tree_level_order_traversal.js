/**
 * Given the root of a binary tree, return the level
 * order traversal of its nodes' values. (i.e., from left to right, level by level).
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function (root) {

  const traversals = [];

  function bfs(root) {
    const q = [root];

    while (q.length) {
      let arr = [];
      const len = q.length;
      for (let i = 0; i < len; i++) {
        const node = q.shift();

        if (node) {
          arr.push(node.val);
          if (node.left) {
            q.push(node.left);
          }
          if (node.right) {
            q.push(node.right);
          }
        }
      }
      traversals.push(arr);
    }
  }

  if (root) {
    bfs(root);
  }
  return traversals;
};