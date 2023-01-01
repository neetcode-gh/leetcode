impl Solution {
    pub fn reverse_list(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut node = None;
        while let Some(next) = head {
            node =
            Some (
                Box::new (
                    ListNode {
                        next : node,
                        val : next.val,
                    }
                )   
            );
            head = next.next;
        }
        node
    }
}
