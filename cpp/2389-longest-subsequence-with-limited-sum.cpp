/* 2389. Longest Subsequence With Limited Sum
You are given an integer array nums of length n, and an integer array queries of length m.

Return an array answer of length m where answer[i] is the maximum size of a subsequence that you can take from nums such that the sum of its elements is less than or equal to queries[i].

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.
*/


class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& queries) {
        vector<int> ans;
        sort(nums.begin(),nums.end());
        int sum=0,cnt=0;
        for(int i=0;i<queries.size();i++){
            for(int j=0;j<nums.size();j++){
                sum+=nums[j];
                if(sum<queries[i]){
                    cnt++;
                    if(j==nums.size()-1){
                        ans.push_back(cnt);
                        cnt=0;
                        sum=0;
                        break;
                    }
                }
                else if(sum==queries[i]){
                    cnt++;
                    ans.push_back(cnt);
                    cnt=0;
                    sum=0;
                    break;
                }
                else{
                    ans.push_back(cnt);
                    cnt=0;
                    sum=0;
                    break;
                }
            }
        }
        return ans;
    }
};