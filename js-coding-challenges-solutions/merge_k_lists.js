/**
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 */

function mergeKLists(lists) {
  let pointers = [];
  for (let i = 0; i < lists.length; i++) {
    pointers.push(lists[i]);
  }
  pointers = pointers.filter(p => Boolean(p));
  console.log("pointersOriginal: ", pointers);

  let newList = new ListNode(), currNode = newList;
  while (pointers.length) {
    let smallestVal = Number.POSITIVE_INFINITY;
    let index = -1;
    for (let i = 0; i < pointers.length; i++) {
      if (pointers[i].val < smallestVal) {
        index = i;
        smallestVal = pointers[i].val;
      }
    }
    console.log("Smallest Val: ", smallestVal);
    console.log("Pointer Index: ", index);
    currNode.next = pointers[index];
    currNode = currNode.next;
    pointers[index] = pointers[index].next;

    console.log("Pointers Updated: ", pointers);
    pointers = pointers.filter(p => Boolean(p));
    console.log("Pointers Filtered: ", pointers);
  }
  console.log("newList: ", newList);
  return newList.next;
}