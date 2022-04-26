class TimeMap {
public:
    TimeMap() {

    }

    void set(string key, string value, int timestamp) {
        store[key].emplace_back(value, timestamp);
    }

    string get(string key, int timestamp) {
        if (store.count(key) == 0)
            return "";

        string res{};
        const auto& vals = store.at(key);
        int l = 0;
        int r = vals.size() - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            const auto& [val, time] = vals.at(m);
            if (time <= timestamp) {
                res = val;
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }

private:
    unordered_map<string, vector<pair<string, int>>> store;
};
