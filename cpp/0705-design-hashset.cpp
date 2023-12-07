// Time: O(n)
// Space: O(n)

class MyHashSet {
public:
    void add(int key) {
        if (!contains(key)) {
            hashSet.push_back(key);
        }
    }

    void remove(int key) {
        auto k = find(hashSet.begin(), hashSet.end(), key);
        if (k != hashSet.end()) {
            hashSet.erase(k);
        }
    }

    bool contains(int key) {
        return (find(hashSet.begin(), hashSet.end(), key) != hashSet.end());
    }

private:
    vector<int> hashSet;
};
