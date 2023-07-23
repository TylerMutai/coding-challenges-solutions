package BinaryTreeMaximumPathSum;

public class SumContainer {
    public final int leftTree;
    public final int rightTree;

    public final int maxSum;

    public SumContainer(int leftTree, int rightTree, int maxSum) {
        this.leftTree = leftTree;
        this.rightTree = rightTree;
        this.maxSum = maxSum;
    }

    @Override
    public String toString() {
        return "SumContainer{" +
                "leftTree=" + leftTree +
                ", rightTree=" + rightTree +
                ", maxSum=" + maxSum +
                '}';
    }
}
