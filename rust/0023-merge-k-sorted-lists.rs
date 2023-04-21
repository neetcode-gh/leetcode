impl Solution {
    // Time O(n*log(n)) - Space O(1)
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        if lists.is_empty() {
            return None;
        }
        let mut lists = lists.clone();
        let mut merged_lists;
        while lists.len() > 1 {
            merged_lists = vec![];
            for i in (0..lists.len()).step_by(2) {
                merged_lists.push(Self::merge_two_lists(
                    lists[i].clone(),
                    if i + 1 < lists.len() {
                        lists[i + 1].clone()
                    } else {
                        None
                    },
                ));
            }
            lists = merged_lists
        }
        lists[0].to_owned()
    }

    pub fn merge_two_lists(
        list1: Option<Box<ListNode>>,
        list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        match (list1, list2) {
            (Some(list1), None) => Some(list1),
            (None, Some(list2)) => Some(list2),
            (None, None) => None,
            (Some(l1), Some(l2)) => {
                if l1.val < l2.val {
                    return Some(Box::new(ListNode {
                        val: l1.val,
                        next: Solution::merge_two_lists(l1.next, Some(l2)),
                    }));
                } else {
                    return Some(Box::new(ListNode {
                        val: l2.val,
                        next: Solution::merge_two_lists(Some(l1), l2.next),
                    }));
                }
            }
        }
    }
}
