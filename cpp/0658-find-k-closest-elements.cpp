class Solution {
public:

    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        std::vector<int> returnvec;

        auto cmp = [x](int a, int b) {
            if (std::abs(a - x) != std::abs(b - x))
                return std::abs(a - x) > std::abs(b - x);
            else
                return a > b;
            };

        std::priority_queue<int, std::vector<int>, decltype(cmp)> finalqueue(cmp);
        for (auto num : arr) {
            finalqueue.push(num);
        }

        for (int i = 0; i < k; i++) {
            returnvec.push_back(finalqueue.top());
            finalqueue.pop();
        }

        std::sort(returnvec.begin(), returnvec.end());
        return returnvec;
    }
};