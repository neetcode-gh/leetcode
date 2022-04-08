class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int, vector<int>> pq(stones.begin(), stones.end());
        pq.push(0);
        
        while (pq.size()>=1) {
            int t1 = pq.top();
            pq.pop();
            if(pq.empty()) break;
            int t2 = pq.top();
            pq.pop();
            pq.push(abs(t1-t2));
        }
        
        return pq.top();
    }
};