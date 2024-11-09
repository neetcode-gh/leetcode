class SeatManager {
private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
public:
    SeatManager(int n) {
        for (int i=1; i<=n; ++i)
            minHeap.push(i);
    }
    
    int reserve() {
        int smallestSeat = minHeap.top();
        minHeap.pop();
        return smallestSeat;
    }
    
    void unreserve(int seatNumber) {
        minHeap.push(seatNumber);
    }
};

/**
 * Your SeatManager object will be instantiated and called as such:
 * SeatManager* obj = new SeatManager(n);
 * int param_1 = obj->reserve();
 * obj->unreserve(seatNumber);
 */