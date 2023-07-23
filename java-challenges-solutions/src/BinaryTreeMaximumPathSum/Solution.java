package BinaryTreeMaximumPathSum;

import java.util.HashSet;
import java.util.Set;

/**
 * -
 * The Challenge:
 * 124. Binary Tree Maximum Path Sum (Hard)
 * -
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
 * -
 * The path sum of a path is the sum of the node's values in the path.
 * -
 * Given the root of a binary tree, return the maximum path sum of any non-empty path.
 * -
 * Examples:
 * Input: root = [1,2,3] (<a href="https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg">...</a>)
 * Output: 6
 * Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
 * -
 * -
 * Input: root = [-10,9,20,null,null,15,7] (<a href="https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg">...</a>)
 * Output: 42
 * Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 */
public class Solution {
    static Set<Integer> sums = new HashSet<>();

    public static void getMaxPathSum() {
        Integer[] nums = new Integer[]{
                -1, -2, 10, -6, null, -3, -6
        };
        TreeNode root = Solution.getBinaryTreeFromArray(nums);
        System.out.println(Solution.maxPathSum(root));
        BTreePrinter.printNode(root);
    }

    private static TreeNode getBinaryTreeFromArray(Integer[] nums) {
        return insertLevelOrder(nums, 0);
    }

    // Function to insert nodes in level order
    private static TreeNode insertLevelOrder(Integer[] arr, int i) {
        TreeNode root = null;
        // Base case for recursion
        if (i < arr.length) {
            if (arr[i] != null) {
                root = new TreeNode(arr[i]);

                // insert left child
                root.left = insertLevelOrder(arr, 2 * i + 1);

                // insert right child
                root.right = insertLevelOrder(arr, 2 * i + 2);
            }
        }
        return root;
    }

    /**
     * @param root the root node of the binary tree (basically the binary tree)
     * @return max path sum of the binary tree
     */
    private static int maxPathSum(TreeNode root) {
        sums = new HashSet<>();
        int max = maxPathSumRecurse(root);
        System.out.println(sums);
        for (int sum : sums) {
            if (sum > max) {
                max = sum;
            }
        }
        return max;
    }

    /**
     * @param root the root node of the binary tree (basically the binary tree)
     * @return max path sum of the left/right tree
     */
    private static int maxPathSumRecurse(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int sumLeft = root.data + maxPathSumRecurse(root.left);
        int sumRight = root.data + maxPathSumRecurse(root.right);
        int totalSumLeftAndRightTree = sumLeft + sumRight - root.data;
        sums.add(totalSumLeftAndRightTree);
        sums.add(root.data);
        int max = Math.max(root.data, Math.max(sumLeft, sumRight));
        System.out.println("Node: " + root.data);
        System.out.println("totalSumLeftTree: " + sumLeft);
        System.out.println("totalSumRightTree: " + sumRight);
        System.out.println("totalSumLeftAndRightTree: " + totalSumLeftAndRightTree);
        System.out.println("max: " + max);
        System.out.println("--------------------");
        return max;
    }
};