/**
 * You are given the root of a binary tree. Return only the values of the nodes that are visible from the right side of
 * the tree, ordered from top to bottom.
 */
class TreeNode {
  constructor(public val: any, public left?: TreeNode, public right?: TreeNode) {

  }
}


const rightSideView = (root?: TreeNode) => {

  const queue = [root];

  const levelOrderTraversalArray: any[] = [];
  while (queue.length) {
    let _rightSide: TreeNode | null = null;

    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const n = queue.shift();
      if (n) {
        _rightSide = n;
        queue.push(n.left);
        queue.push(n.right);
      }
    }

    if (_rightSide) {
      levelOrderTraversalArray.push(_rightSide?.val);
    }

  }

  return levelOrderTraversalArray;

};