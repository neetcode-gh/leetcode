impl Solution {
    pub fn reverse_k_group(head: Option<Box<ListNode>>, k: i32) -> Option<Box<ListNode>> {
        let mut dummy = Some(Box::new(ListNode {next: head, val: 0 }));
        let mut cur = dummy.as_mut();

        'outer: loop {
            let mut start = cur.as_mut().unwrap().next.take();
            if start.is_none() {
                break 'outer;
            }

            let mut end = start.as_mut();
            for _ in 0..(k - 1) {
                end = end.unwrap().next.as_mut();

                if end.is_none() {
                    cur.as_mut().unwrap().next = start;
                    break 'outer;
                }
            }

            let mut tail = end.as_mut().unwrap().next.take();
            let end = Solution::reverse(start, tail);
            cur.as_mut().unwrap().next = end;

            for _ in 0..k {
                cur = cur.unwrap().next.as_mut()
            }
        }
        dummy.unwrap().next
    }

    fn reverse(
        mut head: Option<Box<ListNode>>,
        tail: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut prev = tail;
        let mut cur = head;

        while let Some(mut cur_node) = cur {
            let mut next = cur_node.next.take();
            cur_node.next = prev.take();
            prev = Some(cur_node);
            cur = next
        }
        prev
    }
}