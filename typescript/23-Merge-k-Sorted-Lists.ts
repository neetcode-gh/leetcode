/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null

  while (lists.length > 1) {
    let resultList = []

    for (let i = 0; i < lists.length; i += 2) {
      let list1 = lists[i]
      let list2
      if (i + 1 > lists.length) list2 = null
      else list2 = lists[i + 1]
      resultList.push(mergeList(list1, list2))
    }

    lists = resultList
  }
  return lists[0] || null
}

function mergeList(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let dummyNode: ListNode | null = new ListNode()
  let tail = dummyNode

  while (list1 && list2) {
    if (list1.val < list2.val) {
      tail.next = list1
      list1 = list1.next
    } else {
      tail.next = list2
      list2 = list2.next
    }
    tail = tail.next
  }
  tail.next = list1 || list2

  return dummyNode.next
}
