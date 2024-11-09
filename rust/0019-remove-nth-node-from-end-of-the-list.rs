impl Solution {
    pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32)-> Option<Box<ListNode>>  {
     let mut list_len=0;
     let mut cur=&head;
     while let Some(node)=cur{
         list_len+=1;
         cur=&node.next;
     }
     let mut ans=Some(Box::new(ListNode{
         val:1,
         next:head
     }));
     let mut list=&mut ans;
     let mut pos=0;
     while let Some(node)=list{
         if pos==list_len-n{
             node.next=node.next.clone().unwrap().next.take();
             break;
         }
         pos+=1;
         list=&mut node.next;
     }
     ans.unwrap().next.take()
    }
}

