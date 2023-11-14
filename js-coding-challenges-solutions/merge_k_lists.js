/**
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 */

function mergeKLists(lists) {
  const mergedListOne = mergeKListsFaster([...lists])
  const mergedListTwo = mergeKListsSlower([...lists])
  return [mergedListOne, mergedListTwo];
}

function mergeKListsSlower(lists) {
  let pointers = [];
  for (let i = 0; i < lists.length; i++) {
    pointers.push(lists[i]);
  }
  pointers = pointers.filter(p => Boolean(p));

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
    currNode.next = pointers[index];
    currNode = currNode.next;
    pointers[index] = pointers[index].next;

    pointers = pointers.filter(p => Boolean(p));
  }
  return newList.next;
}

function mergeList(list1,list2){
  let newList = new ListNode(),curr = newList;
  let p1 = list1, p2 = list2;
  while (p1 && p2){
    let tmp;
    if (p1.val < p2.val){
      tmp = p1;
      p1 = p1.next;
    } else {
      tmp = p2;
      p2 = p2.next;
    }
    curr.next = tmp;
    tmp.next = null;
    curr = curr.next;
  }
  while (p1){
    const tmp = p1;
    curr.next = tmp;
    curr = curr.next
    p1 = p1.next;
    tmp.next = null;
  }
  while (p2){
    const tmp = p2;
    curr.next = tmp;
    curr = curr.next;
    p2 = p2.next;
    tmp.next = null;
  }
  return newList.next;
}


function mergeKListsFaster(lists) {
  if(!lists.length) return null;
  let mergedList = lists[0];
  for (let i=1;i<lists.length;i++){
    mergedList = mergeList(mergedList, lists[i]);
  }
  return mergedList;
}