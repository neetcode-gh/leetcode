class KthLargest {

    final PriorityQueue<Integer> heap = new PriorityQueue<>();
    final int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int n : nums) add(n);
    }

    public int add(int val) {
        if (heap.size() < k) heap.offer(val); //for adding the values of the array
        else if (val > heap.peek()) {
            heap.poll(); //remove the top element
            heap.add(val); //add the new element
        }
        return heap.peek();
    }
}
