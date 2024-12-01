impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        fn merge(list1: Option<Box<ListNode>>, list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
            match (list1, list2) {
                (None, None) => None,
                (None, Some(l)) | (Some(l), None) => Some(l),
                (Some(l1), Some(l2)) => {
                    if l1.val < l2.val {
                        return Some(Box::new(ListNode {
                            val: l1.val,
                            next: merge(l1.next, Some(l2)),
                        }));
                    }
                    Some(Box::new(ListNode {
                        val: l2.val,
                        next: merge(Some(l1), l2.next),
                    }))
                }
            }
        }
    
        if lists.is_empty() {
            return None;
        }
    
        let mut lists = lists;
    
        while lists.len() > 1 {
            let mut merged = vec![];
            for i in (0..lists.len()).step_by(2) {
                let l1 = lists[i].take();
                let l2 = if i + 1 < lists.len() {
                    lists[i + 1].take()
                } else {
                    None
                };
                merged.push(merge(l1, l2))
            }
            lists = merged;
        }
    
        lists[0].take()
    }
}
