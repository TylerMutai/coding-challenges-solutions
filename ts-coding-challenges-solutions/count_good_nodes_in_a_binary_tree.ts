/**
 * Count Good Nodes in Binary Tree
 * Solved
 * Within a binary tree, a node x is considered good if the path from the root of the tree to the node x contains no
 * nodes with a value greater than the value of node x.
 *
 * Given the root of a binary tree root, return the number of good nodes within the tree.
 */
import {TreeNode} from "./binary_tree_right_side_view";

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  goodNodes(root: TreeNode) {
    let goodNodes = 0;
    const dfs = (currNode?: TreeNode, prevNodeVal?: number) => {
      if (currNode == null || prevNodeVal == null) {
        return;
      }


      if (currNode.val >= prevNodeVal) {
        goodNodes += 1;
      }

      const largestVal = Math.max(currNode.val, prevNodeVal);

      dfs(currNode.left, largestVal);
      dfs(currNode.right, largestVal);
    };
    dfs(root.left, root.val);
    dfs(root.right, root.val);
    return goodNodes + 1;
  }
}
