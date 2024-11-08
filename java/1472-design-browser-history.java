class ListNode{
    ListNode back;
    String url;
    ListNode forward;
    public ListNode(String url){
        this.url = url;
        back = forward = null;
    }
}

class BrowserHistory {

    ListNode head;
    ListNode current;

    public BrowserHistory(String homepage) {
        head = new ListNode(homepage);
        current = head;
    }
    
    public void visit(String url) {
        current.forward = new ListNode(url);
        current.forward.back = current;
        current = current.forward;
    }
    
    public String back(int steps) {
        while(steps>0 && current.back!=null){
            current = current.back;
            steps--;
        }
        return current.url;
    }
    
    public String forward(int steps) {
        while(steps>0 && current.forward!=null){
            current = current.forward;
            steps--;
        }
        return current.url;
    }
}