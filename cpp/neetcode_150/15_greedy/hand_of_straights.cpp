/*
    Given int array, return true if can rearrange cards into groupSize consecutive
    Ex. hand = [1,2,3,6,2,3,4,7,8], groupSize = 3 -> true, [1,2,3],[2,3,4],[6,7,8]

    Loop thru ordered map, for a value, check groupSize consecutive & remove

    Time: O(n log n)
    Space: O(n)
*/

class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        int n = hand.size();
        
        if (n % groupSize != 0) {
            return false;
        }
        
        // map {card value -> count}
        map<int, int> m;
        for (int i = 0; i < n; i++) {
            m[hand[i]]++;
        }
        
        while (!m.empty()) {
            int curr = m.begin()->first;
            for (int i = 0; i < groupSize; i++) {
                if (m[curr + i] == 0) {
                    return false;
                }
                m[curr + i]--;
                if (m[curr + i] < 1) {
                    m.erase(curr + i);
                }
            }
        }
        
        return true;
    }
};
