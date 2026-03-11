impl Solution {
    pub fn has_cycle(head: *mut ListNode) -> bool {
        unsafe {
            let mut slow = head;
            let mut fast = head;
            while !fast.is_null() && !(*fast).next.is_null() {
                slow = (*slow).next;
                fast = (*(*fast).next).next;
                if slow == fast {
                    return true;
                }
            }
        }
        false
    }
}
