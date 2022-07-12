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

function findDuplicate(nums: number[]): number {
  let slow = 0;
  let fast = 0;
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow == fast) {
      break;
    }
  }
  let slow2 = 0;

  while (true) {
    slow = nums[slow];
    slow2 = nums[slow2];
    if (slow == slow2) {
      break;
    }
  }
  return slow;
}
