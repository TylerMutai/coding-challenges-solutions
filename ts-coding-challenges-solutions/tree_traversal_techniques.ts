/**
 * Tree traversal techniques:
 *
 * 1. Depth First
 * - In order traversal:  Left -> Root -> Right
 * - Pre order traversal:  Root -> Left -> Right
 * - Post order traversal: Left -> Right -> Root
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