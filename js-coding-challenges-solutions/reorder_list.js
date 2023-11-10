/**
 * You are given the head of a singly linked-list. The list can be represented as:
 *
 * L0 → L1 → … → Ln - 1 → Ln
 * Reorder the list to be on the following form:
 *
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 * You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
function reorderList(head) {
  let cur = head;
  const nodes = [];
  while (cur) {
    nodes.push(cur);
    cur = cur.next;
  }
  const lastIndex = nodes.length - 1;
  let head2 = new ListNode(), cur2 = head2;
  let i = 0, j = lastIndex - i;
  while (i < j) {
    const nodeAtI = nodes[i];
    const nodeAtJ = nodes[j];
    nodeAtJ.next = null;
    nodeAtI.next = nodeAtJ;
    cur2.next = nodeAtI;
    cur2 = cur2.next.next;
    i++;
    j = lastIndex - i;
  }
  if (lastIndex % 2 === 0) {
    // odd length array. add last missing node.
    const nodeAtI = nodes[i];
    nodeAtI.next = null;
    cur2.next = nodeAtI;
  }
  head = head2.next;
}