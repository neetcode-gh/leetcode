impl Solution {
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

//without recursion
impl Solution {
    pub fn merge_two_lists(
        mut l1: Option<Box<ListNode>>,
        mut l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        // Tail is the rightmost part of l1 that we keep swapping
        let mut tail = &mut l1;
        while l2.is_some() {
            if tail.is_none() || l2.as_ref()?.val < tail.as_ref()?.val {
                // Keep swapping the end part of l1
                // so that the smallest nodes appear
                // first in l1
                std::mem::swap(tail, &mut l2);
            }
            tail = &mut tail.as_mut()?.next;
        }
        l1
    }
}
