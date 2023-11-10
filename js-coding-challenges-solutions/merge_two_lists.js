/**
 * You are given the heads of two sorted linked lists list1 and list2.
 *
 * Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
 *
 * Return the head of the merged linked list.
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
  let cur1 = list1, cur2 = list2;
  let dummy = new ListNode(),tail = dummy;
  while (cur1 && cur2) {
    if (cur1.val < cur2.val) {
      tail.next = cur1;
      cur1 = cur1.next;
    } else {
      tail.next = cur2;
      cur2 = cur2.next;
    }
    tail = tail.next;
  }
  while (cur1) {
    tail.next = cur1;
    cur1 = cur1.next;
    tail = tail.next;
  }
  while(cur2){
    tail.next = cur2;
    cur2 = cur2.next;
    tail = tail.next
  }
  return dummy.next;
}