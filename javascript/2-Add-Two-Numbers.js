function addTwoNumbers(l1, l2) {
    let temp1 = l1;
    let temp2 = l2;

    let dummy = new ListNode(0);
    let merged = dummy;

    let carry = 0;

    while (temp1 || temp2) {
        let sum = (temp1?.val || 0) + (temp2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        sum = sum % 10;

        merged.next = new ListNode(sum);
        merged = merged.next;

        if (temp1) temp1 = temp1?.next;
        if (temp2) temp2 = temp2?.next;
    }

    if (carry > 0) {
        merged.next = new ListNode(carry);
    }

    return dummy.next;
}
