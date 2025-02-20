/**
 * Tree traversal techniques:
 *
 * 1. Depth First
 * - In order traversal:  Left -> Root -> Right
 * - Pre order traversal:  Root -> Left -> Right
 * - Post order traversal: Left -> Right -> Root
 *
 * 2. Level Order Traversal or Breadth First Search or BFS
 */

class Node {
  constructor(public data: any, public left?: Node, public right?: Node) {

  }
}

const inOrderTraversalArray: any[] = [];
const inOrderTraversal = (node?: Node) => {
  if (!node) {
    return;
  }

  inOrderTraversal(node.left);
  inOrderTraversalArray.push(node.data);
  inOrderTraversal(node.right);
};

const preOrderTraversalArray: any[] = [];
const preOrderTraversal = (node?: Node) => {
  if (!node) {
    return;
  }

  preOrderTraversalArray.push(node.data);
  preOrderTraversal(node.left);
  preOrderTraversal(node.right);
};

const postOrderTraversalArray: any[] = [];
const postOrderTraversal = (node?: Node) => {
  if (!node) {
    return;
  }

  postOrderTraversal(node.left);
  postOrderTraversal(node.right);
  postOrderTraversalArray.push(node.data);
};

const levelOrderTraversal = (node?: Node) => {
  const levelOrderTraversalArray: any[] = [];

  const queue: any[] = [];
  if (node) {
    queue.push(node);
  }

  while (queue.length) {
    const _node = queue.shift();
    levelOrderTraversalArray.push(_node?.data);

    if (_node?.left) {
      queue.push(_node.left);
    }

    if (_node?.right) {
      queue.push(_node.right);
    }

  }
  return levelOrderTraversalArray;
};


const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

inOrderTraversal(root);
console.log(inOrderTraversalArray);

preOrderTraversal(root);
console.log(preOrderTraversalArray);

postOrderTraversal(root);
console.log(postOrderTraversalArray);

console.log(levelOrderTraversal(root));