impl Solution {
    pub fn merge_two_lists(list1: Option<Box<ListNode>>, list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        match (list1,list2) {
            (Some(list1),None)=> Some(list1),
            (None,Some(list2))=>Some(list2),
            (None,None)=>None,
            (Some(l1),Some(l2))=>{
                if l1.val<l2.val {
                  return Some(Box::new(ListNode{val:l1.val,next:Solution::merge_two_lists(l1.next,Some(l2))}));
                }else {
                  return Some(Box::new(ListNode { val: l2.val, next: Solution::merge_two_lists(Some(l1),l2.next) }))
                }
            }
        }
    }
}
//without recursion
impl Solution {
    pub fn merge_two_lists(mut list1: Option<Box<ListNode>>,mut list2: Option<Box<ListNode>>)->Option<Box<ListNode>>{
        let mut ans=ListNode::new(1);
        let mut cur=&mut ans;
   
   while let (Some(node1),Some(node2))=(list1.as_mut(),list2.as_mut()){
   
   if node1.val<node2.val{
       cur.next=list1.take();
       list1=cur.next.as_mut().unwrap().next.take();
   }
   else{
       cur.next=list2.take();
       list2=cur.next.as_mut().unwrap().next.take();
   }
   cur=cur.next.as_mut().unwrap();
   }
   cur.next=if list1.is_some(){
       list1
   }
   else {
       list2
   };
   ans.next
}
}

