impl Solution {
    pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode { val: 0, next: head.clone() });
        let (mut left, mut right) = (dummy.as_mut(), head);
    
        let mut n = n;
        while n > 0 && right.is_some() {
            right = right.unwrap().next;
            n -= 1;
        }
    
        while let Some(r) = right {
            left = left.next.as_mut().unwrap();
            right = r.next;
        }
    
        left.next = left.next.take().unwrap().next.take();
    
        dummy.next
    }
}
