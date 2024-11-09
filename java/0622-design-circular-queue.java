class MyCircularQueue {
    Node head=null;
    Node tail=null;

    int currentLength=0;
    int totalLength=0;
    public MyCircularQueue(int k) {
        head=new Node(-1);
        tail=new Node(-1);

        head.next=tail;
        head.prev=tail;

        tail.next=head;
        tail.prev =head;

        totalLength=k;
    }
    
    public boolean enQueue(int value) {
        if(isFull()){
            return false;
        }

        Node left = head.prev;
        Node right= head;

        Node temp = new Node(value);

        temp.next= right;

        right.prev = temp;

        left.next=temp;

        temp.prev=left;

        currentLength++;

        

        return true;
    }
    
    public boolean deQueue() {
        if(isEmpty()){
            return false;
        }

        Node left = tail;
        Node right= tail.next.next;
 
       left.next = right;

       right.prev = left;


        currentLength--;

        return true;
    }
    
    public int Front() {
        if(currentLength<=0){
            return -1;
        }

        return tail.next.val;
    }
    
    public int Rear() {
        if(currentLength<=0){
            return -1;
        }

        return head.prev.val;
    }
    
    public boolean isEmpty() {
        return currentLength==0 ? true : false;
    }
    
    public boolean isFull() {
        return currentLength==totalLength ? true : false;
    }

}

class Node{
    int val;
    Node next=null;
    Node prev=null;

    Node(int val){
        this.val=val;
    }
}
