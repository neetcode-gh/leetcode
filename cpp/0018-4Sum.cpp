/*
  Solution built over 3Sum solution
  TIME: O(n^3)
  SPACE: O(1)
*/
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& arr, int t) {
        ios_base::sync_with_stdio(0);
        cin.tie(0);
        // set to store unique answers
        set<vector<int>> ans;
        vector<vector<int>> res;
        int n = arr.size();
        if(n < 4){
            return res;
        }
        sort(arr.begin(), arr.end());
        // Apply 4 sum
        for(int i = 0 ; i < n; i++){
            // Apply 3 sum
            for(int j = i+1; j < n ;j++){
                // Apply 2 sum in sorted array
                int s = j + 1;
                int e = n - 1;
                while(s < e){
                    long long sum = arr[i] / 1ll + arr[j] / 1ll + arr[s] /1ll + arr[e] / 1ll;
                    if(sum == t){
                        vector<int> temp;
                        temp.push_back(arr[i]);
                        temp.push_back(arr[j]);
                        temp.push_back(arr[s]);
                        temp.push_back(arr[e]);
                        ans.insert(temp);
                        s++;
                        e--;
                    }
                    else if(sum < t){
                        s++;
                    }
                    else if(sum > t){
                        e--;
                    }
                }
            }
        }
        for(auto i: ans){
            res.push_back(i);
        }
        return res;
    }
};
