class KthLargest {
public:
    priority_queue<int, vector<int>, greater<int>> pq;
    int k;    
    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        for (auto a: nums) pq.push(a);
        while(pq.size()>k){
            pq.pop();
        }
    }
    
    int add(int val) {
        pq.push(val);
        while(pq.size()>k){
            pq.pop();
        }
        return pq.top();
    }
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest* obj = new KthLargest(k, nums);
 * int param_1 = obj->add(val);
 */