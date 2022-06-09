/*
    Given array of stones to smash, return smallest possible weight of last stone
    If x == y both stones destroyed, if x != y stone x destroyed, stone y = y - x
    Ex. stones = [2,7,4,1,8,1] -> 1, [2,4,1,1,1], [2,1,1,1], [1,1,1], [1]

    Max heap, pop 2 biggest, push back difference until no more 2 elements left

    Time: O(n log n)
    Space: O(n)
*/

class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq;
        for (int i = 0; i < stones.size(); i++) {
            pq.push(stones[i]);
        }
        
        while (pq.size() > 1) {
            int y = pq.top();
            pq.pop();
            int x = pq.top();
            pq.pop();
            if (y > x) {
                pq.push(y - x);
            }
        }
        
        if (pq.empty()) {
            return 0;
        }
        return pq.top();
    }
};
