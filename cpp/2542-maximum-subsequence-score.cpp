// Time: O(NlogN)
// Space: O(N)

class Solution {
public:
    long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {
        int size = nums1.size();
        vector<pair<int, int>> pairs(size);

        // populating the array
        for(int i = 0; i < size; i++) {
            pairs.push_back(make_pair(nums1[i], nums2[i]));
        }
        
        // sorting the array using comparator lambda function
        sort(pairs.begin(), pairs.end(), [](pair<int, int> a, pair<int, int> b) {
            return (a.second > b.second);
        });

        priority_queue<int, vector<int>, greater<int>> minh;
        long long currSum = 0;
        long long maxSum = INT_MIN;

        for(int i = 0; i < size; i++) {
            currSum += pairs[i].first;
            minh.push(pairs[i].first);

            if(minh.size() > k) {
                currSum -= minh.top();
                minh.pop();
            }
            if(minh.size() == k) {
                maxSum = max(maxSum, (currSum * pairs[i].second));
            }
        }
        return maxSum;
    }
};
