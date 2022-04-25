class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> res;
        // monotonically decreasing queue. saves index
        deque<int> q;
        for (int l = 0, r = 0; r < nums.size(); ++r) {
            // only need to keep biggest value from the window, so pop elements smaller than new element from q
            while (!q.empty() && nums[q.back()] < nums[r]) {
                q.pop_back();
            }
            q.push_back(r);
            
            // remove passed elements from window
            if (l > q.front())
                q.pop_front();

            if ((r + 1) >= k) {
                res.push_back(nums[q.front()]);
                ++l;
            }
        }
        return res;
    }
};
