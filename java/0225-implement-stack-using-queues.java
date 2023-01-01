class MyStack {
    Deque<Integer> q;
    public MyStack() {
       this.q = new ArrayDeque<>(); 
    }
    
    public void push(int x) {
        this.q.addLast(x);
    }
    
    public int pop() {
        int size = this.q.size();
        for(int i = 0; i < size - 1; i++)
            this.push(this.q.pollFirst());
        return this.q.pollFirst();
    }
    
    public int top() {
        int size = q.size();
        for(int i = 0; i < size - 1; i++)
            this.push(this.q.pollFirst());
        
        int res = this.q.peekFirst();
        this.push(this.q.pollFirst());
        return res;
    }
    
    public boolean empty() {
        return this.q.size() == 0;
    }
}
