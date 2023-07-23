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
        BTreePrinter.printNode(root);
        System.out.println(Solution.maxPathSum(root));
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
        SumContainer maxSum = maxPathSumRecurse(root);
        int max = maxSum.maxSum;
        for (int sum : sums) {
            if (max > sum) {
                max = sum;
            }
        }
        return max;
    }

    /**
     * @param root the root node of the binary tree (basically the binary tree)
     * @return max path sum of the left/right tree
     */
    private static SumContainer maxPathSumRecurse(TreeNode root) {
        if (root == null) {
            return new SumContainer(0, 0, 0);
        }

        SumContainer smLeft = maxPathSumRecurse(root.left);
        SumContainer smRight = maxPathSumRecurse(root.right);
        int totalSumLeftTree = root.data + smLeft.maxSum;
        int totalSumRightTree = root.data + smRight.maxSum;
        int totalSumLeftAndRightTree = totalSumRightTree + totalSumLeftTree - root.data;
        sums.add(totalSumLeftAndRightTree);
        int max = Math.max(root.data, Math.max(totalSumLeftTree, totalSumRightTree));

        return new SumContainer(totalSumLeftTree, totalSumRightTree, max);
    }
};