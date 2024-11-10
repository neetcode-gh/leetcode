impl Solution {
    pub fn reorder_list(mut head: &mut Option<Box<ListNode>>) {
        let mut length = 0;
        let mut list = head.as_mut();
        // find the total length of the list
        // Using the slow & fast pointer is probably not possible
        while let Some(node) = list {
            length += 1;
            list = node.next.as_mut();
        }
        // if length is less than or equal to 2 then exit the function
        if length <= 2 {
            return;
        }
        // find the middle node to split the list
        let mut mid = head.as_mut();
        for _ in 0..length / 2 {
            mid = match mid {
                None => unreachable!("Traversing half of the list. Cannot reach the end."),
                Some(node) => node.next.as_mut(),
            }
        }
        // Tail is the right half of the list.
        // Here we use take() to break the linked list
        // so the end of the first half now points to None
        // and tail holds the second half of the linked list
        let mut tail = mid.expect("Mid cannot be None.").as_mut().next.take();
        // reverse the tail
        let mut reversed: Option<Box<ListNode>> = None;
        while let Some(mut node) = tail {
            tail = node.next;
            node.next = reversed;
            reversed = Some(node);
        }
        // merge the first half(head) & the second reversed half(reversed)
        // This solution to merge two linked lists is clever
        // https://leetcode.com/problems/merge-two-sorted-lists/solutions/2947855/simple-and-efficient-rust-8-liner/
        // mover is the variable that traverses and modifies "head"
        let mut mover: &mut _ = &mut reversed;
        while head.is_some() {
            std::mem::swap(mover, &mut head);
            mover = &mut mover.as_mut().unwrap().next;
        }
        std::mem::swap(head, &mut reversed);
    }
}
