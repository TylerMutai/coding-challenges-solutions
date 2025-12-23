class BNode {

  constructor(public readonly value: number, public left: BNode | null, public right: BNode | null) {

  }

  contains(val: number): boolean {
    if (this.value === val) {
      return true;
    }

    if (val > this.value) {
      if (this.right === null) {
        return false;
      }
      // search to the right
      return this.right.contains(val);
    } else {
      // search to the left.
      if (this.left === null) {
        return false;
      }
      return this.left.contains(val);
    }
  }

  insert(val: number) {
    if (val >= this.value) {
      // insert to the right
      if (this.right === null) {
        // insert here
        this.right = new BNode(val, null, null);
      } else {
        // continue insertion.
        this.right.insert(val);
      }
    } else {
      // insert to the left
      if (this.left === null) {
        this.left = new BNode(val, null, null);
      } else {
        this.left.insert(val);
      }
    }
  }

  delete(val: number, prevNode: BNode, direction: 'left' | 'right'): boolean {
    if (val === this.value) {
      // We've found the node to delete.

      // scenario 1. the node has no children.
      if (this.left === null && this.right === null) {
        if (direction === "left") {
          prevNode.left = null;
        } else {
          prevNode.right = null;
        }
        return true;
      }

      // scenario 2. the node has one child.
      if (this.left === null && this.right !== null || this.right === null && this.left !== null) {
        if (direction === "left") {
          if (this.left !== null) {
            prevNode.left = this.left;
          } else {
            prevNode.left = this.right;
          }
        } else {
          if (this.left !== null) {
            prevNode.right = this.left;
          } else {
            prevNode.right = this.right;
          }
        }
        return true;
      }

      // scenario 3. the node has left and right children
      // get the minimum node on the right side of the tree, and set this node as the root since this node will have
      // everything to it's  right larger or equal to itself, and is also larger than everything on its lef. Get minimum node (do an inorder traversal)
      let minimumNode: BNode = new BNode(Number.MAX_VALUE, null, null);
      const inOrderTraversal = (node: BNode) => {
        if (node.left != null) {
          if (node.left.value < minimumNode.value) {
            minimumNode = node.left;
          }
          inOrderTraversal(node.left);
        }
        if (node.value < minimumNode.value) {
          minimumNode = node;
        }
        if (node.right != null) {
          if (node.right.value < minimumNode.value) {
            minimumNode = node.right;
          }
          inOrderTraversal(node.right);
        }
      };

      // get minimum node on right side of tree.
      if (this.right !== null) {
        inOrderTraversal(this.right);
      }
      if (direction === "left") {
        prevNode.left = minimumNode;
      } else {
        prevNode.right = minimumNode;
      }
      return true;
    } else {
      if (val >= this.value) {
        if (this.right === null) {
          return false;
        }

        // check right side of tree.
        return this.right.delete(val, this, 'right');
      } else {
        if (this.left === null) {
          return false;
        }
        return this.left.delete(val, this, 'left');
      }
    }
  }

  // Left tree first (DFS)
  printInOrder() {
    if (this.left !== null) {
      this.left.printInOrder();
    }
    console.log(this.value);
    if (this.right !== null) {
      this.right.printInOrder();
    }
  }

  // Root gets printed first (DFS)
  printPreOrder() {
    console.log(this.value);
    if (this.left !== null) {
      this.left.printPreOrder();
    }
    if (this.right !== null) {
      this.right.printPreOrder();
    }
  }

  // Root gets printed last (DFS)
  printPostOrder() {
    if (this.left !== null) {
      this.left.printPreOrder();
    }
    if (this.right !== null) {
      this.right.printPreOrder();
    }
    console.log(this.value);
  }

  printBfs() {
    const queue: BNode[] = [this];

    while (queue.length) {
      const node = queue.shift();
      if (node) {
        console.log(node.value);
        if (node.left) {
          // add the left node to the queue.
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
    }
  }
}