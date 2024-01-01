impl Solution {
    pub fn reverse_list(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let (mut prev, mut curr) = (None, head);
        while let Some(mut node) = curr{
            curr = node.next;
            node.next = prev;
            prev = Some(node);
        } 
        pre
    }
}
