/**
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 */
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const tmp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = tmp;
  }
  return prev;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  console.log("head original: ", head);
  let reversedHead = reverseList(head);
  console.log("head reversed: ", reversedHead);

  if (n === 1) {
    reversedHead = reversedHead.next;
  } else {
    let count = 1;
    let prev = null;
    let curr = reversedHead;
    while (curr) {
      if (count === n) {
        prev.next = curr.next
        break;
      }
      prev = curr
      curr = curr.next;
      count++;
    }
  }
  console.log("head truncated: ", reversedHead);

  return reverseList(reversedHead);
}