public class MedianFinder {
    private PriorityQueue<int, int> leftHeap = new(Comparer<int>.Create((a, b) => b - a));
    private PriorityQueue<int, int> rightHeap = new();

    public MedianFinder() {
        
    }
    
    // T: log(n)
    public void AddNum(int num) {
        if (leftHeap.Count == 0 || num > leftHeap.Peek()) 
            rightHeap.Enqueue(num, num);
        else 
            leftHeap.Enqueue(num, num);

        Balance();
    }

    private void Balance() {
        var (big, small) = leftHeap.Count > rightHeap.Count
            ? (leftHeap, rightHeap)
            : (rightHeap, leftHeap);
        
        while (big.Count - small.Count > 1) {
            var value = big.Dequeue();
            small.Enqueue(value, value);
        }
    }
    
    // T: O(1)
    public double FindMedian() {
        if (leftHeap.Count == rightHeap.Count) 
            return (leftHeap.Peek() + rightHeap.Peek()) / 2.0;

        return leftHeap.Count > rightHeap.Count
            ? leftHeap.Peek()
            : rightHeap.Peek(); 
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.AddNum(num);
 * double param_2 = obj.FindMedian();
 */
