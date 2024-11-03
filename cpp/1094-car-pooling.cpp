class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        for (int i=0; i<trips.size(); ++i) {
            int numPassengers=trips[i][0], from=trips[i][1], to=trips[i][2];
            minHeap.push({from, numPassengers});
            minHeap.push({to, -numPassengers});
        }

        int currCapacity = 0;
        while (!minHeap.empty()) {
            int currTime = minHeap.top().first;
            while (!minHeap.empty() and minHeap.top().first == currTime) {
                auto [time, numPassengers] = minHeap.top();
                minHeap.pop();
                currCapacity += numPassengers;
            }
            if (currCapacity > capacity)
                return false;
        }

        return true;
    }
};