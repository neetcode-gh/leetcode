/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */

class NestedIterator {
private:
    vector<NestedInteger> nestedList;
    vector<int> stack;

    void dfs(vector<NestedInteger> nestedList) {
        for (const auto &item : nestedList) {
            if (item.isInteger()) {
                stack.push_back(item.getInteger());
            } else {
                dfs(item.getList());
            }
        }
    }

public:
    NestedIterator(vector<NestedInteger> &nestedList) : nestedList(nestedList) {
        dfs(nestedList);
        reverse(stack.begin(), stack.end());
    }
    
    int next() {
        if (!hasNext()) {
            return -1;
        }
        int retval = stack.back();
        stack.pop_back();
        return retval;
    }
    
    bool hasNext() {
        return stack.size();
    }
};

/**
 * Your NestedIterator object will be instantiated and called as such:
 * NestedIterator i(nestedList);
 * while (i.hasNext()) cout << i.next();
 */
