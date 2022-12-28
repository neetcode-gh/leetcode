/**
 * Definition for singly-linked list.
 * class ListNode(_x: Int = 0, _next: ListNode = null) {
 *   var next: ListNode = _next
 *   var x: Int = _x
 * }
 */
object Solution {
  def addTwoNumbers(l1: ListNode, l2: ListNode): ListNode = {
    def nonNull(l: ListNode): Boolean = l != null
    def next(l: ListNode): ListNode = if (nonNull(l)) l.next else null
    def getX(l: ListNode): Int = if (nonNull(l)) l.x else 0
    def sumX(l1: ListNode, l2: ListNode, carry: Int): (ListNode, Int) = {
      val sum = getX(l1) + getX(l2) + carry
      new ListNode(sum % 10) -> sum / 10
    }

    var carry = 0
    val (sum, newCarry) = sumX(l1, l2, carry)
    carry = newCarry

    var nextDigit = sum
    var next1 = next(l1)
    var next2 = next(l2)

    while (nonNull(next1) || nonNull(next2)) {
      val (sum, newCarry) = sumX(next1, next2, carry)
      
      nextDigit.next = sum
      nextDigit = nextDigit.next
      
      carry = newCarry
      next1 = next(next1)
      next2 = next(next2)
    }

    if (carry > 0)
      nextDigit.next = new ListNode(carry)
    
    sum
  }
}
