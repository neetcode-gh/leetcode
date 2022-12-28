public class MedianFinder {

    List<int> Nums;
    public MedianFinder() {
        
        Nums = new List<int>();
    }
    
    public void AddNum(int num) {
        int index = Nums.BinarySearch(num);
        if (index < 0)
        {
            index = ~index;  
        }        
        Nums.Insert(index, num);
    }
    
    public double FindMedian() {
         int count = Nums.Count;
        return count % 2 == 0 ? (double)((Nums[count / 2 - 1] + Nums[count / 2]) * 0.5) : Nums[count / 2];
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.AddNum(num);
 * double param_2 = obj.FindMedian();
 
 // ***IMP : Not passing for few test cases 
    class MedianFinder
    {

        private PriorityQueue<int, int> smallHeap; //small elements - maxHeap
        private PriorityQueue<int, int> largeHeap; //large elements - minHeap

        public MedianFinder()
        {
            smallHeap = new PriorityQueue<int, int>();
            largeHeap = new PriorityQueue<int, int>();
        }

        public void addNum(int num)
        {
            smallHeap.Enqueue(num, num);
            if (
                smallHeap.Count - largeHeap.Count > 1 ||
                !(largeHeap.Count <= 0) &&
                smallHeap.Peek() > largeHeap.Peek()
            )
            {
                if (smallHeap.Count > 0)
                {
                    int ele = smallHeap.Dequeue();
                    largeHeap.Enqueue(ele, ele);
                }
            }
            if (largeHeap.Count - smallHeap.Count > 1)
            {
                if (largeHeap.Count > 0)
                {
                    int ele = largeHeap.Dequeue();
                    smallHeap.Enqueue(ele, ele);
                }
            }
        }

        public double findMedian()
        {
            if (smallHeap.Count == largeHeap.Count)
            {
                return (double)(largeHeap.Peek() + smallHeap.Peek()) / 2;
            }
            else if (smallHeap.Count > largeHeap.Count)
            {
                return (double)smallHeap.Peek();
            }
            else
            {
                return (double)largeHeap.Peek();
            }
        }
    }
 */
