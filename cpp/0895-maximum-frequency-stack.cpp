class FreqStack {
    unordered_map<int, int> cnt;
    vector<vector<int>> stacks;

public:
    void push(int val) {
        int k = ++cnt[val];
        if (k > stacks.size())
            stacks.push_back({val});
        else
            stacks[k - 1].push_back(val);
    }

    int pop() {
        int val = stacks.back().back();
        stacks.back().pop_back();
        if (stacks.back().empty())
            stacks.pop_back();
        --cnt[val];
        return val;
    }
};

