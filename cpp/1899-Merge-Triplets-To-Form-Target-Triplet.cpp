/*
    Update: [max(ai,aj), max(bi,bj), max(ci,cj)], return if possible to obtain target
    Ex. triplets = [[2,5,3],[1,8,4],[1,7,5]] target = [2,7,5] -> true, update 1st/3rd

    Skip all "bad" triplets (can never become target), if match add to "good" set

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        unordered_set<int> s;
        
        for (int i = 0; i < triplets.size(); i++) {
            if (triplets[i][0] > target[0] || triplets[i][1] > target[1] || triplets[i][2] > target[2]) {
                continue;
            }
            
            for (int j = 0; j < 3; j++) {
                if (triplets[i][j] == target[j]) {
                    s.insert(j);
                }
            }
        }
        
        return s.size() == 3;
    }
};
