## 1. Backtracking

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        def helper(i, count):
            if i == len(nums):
                return 1

            res = helper(i + 1, count)  # Skip nums[i]
            if not count[nums[i] + k] and not count[nums[i] - k]:
                count[nums[i]] += 1
                res += helper(i + 1, count)
                count[nums[i]] -= 1

            return res

        return helper(0, defaultdict(int)) - 1
```

```java
public class Solution {
    public int beautifulSubsets(int[] nums, int k) {
        return helper(0, new HashMap<>(), nums, k) - 1;
    }

    private int helper(int i, Map<Integer, Integer> count, int[] nums, int k) {
        if (i == nums.length) {
            return 1;
        }

        int res = helper(i + 1, count, nums, k); // Skip nums[i]

        if (!count.containsKey(nums[i] + k) && !count.containsKey(nums[i] - k)) {
            count.put(nums[i], count.getOrDefault(nums[i], 0) + 1);
            res += helper(i + 1, count, nums, k);
            count.put(nums[i], count.get(nums[i]) - 1);
            if (count.get(nums[i]) == 0) {
                count.remove(nums[i]);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        return helper(0, count, nums, k) - 1;
    }

private:
    int helper(int i, unordered_map<int, int>& count, vector<int>& nums, int k) {
        if (i == nums.size()) {
            return 1;
        }

        int res = helper(i + 1, count, nums, k); // Skip nums[i]
        if (!count[nums[i] + k] && !count[nums[i] - k]) {
            count[nums[i]]++;
            res += helper(i + 1, count, nums, k);
            count[nums[i]]--;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        const helper = (i, count) => {
            if (i === nums.length) {
                return 1;
            }

            let res = helper(i + 1, count); // Skip nums[i]

            if (!count.has(nums[i] + k) && !count.has(nums[i] - k)) {
                count.set(nums[i], (count.get(nums[i]) || 0) + 1);
                res += helper(i + 1, count);
                count.set(nums[i], count.get(nums[i]) - 1);
                if (count.get(nums[i]) === 0) {
                    count.delete(nums[i]);
                }
            }

            return res;
        };

        return helper(0, new Map()) - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        groups = []  # List of dicts
        cache = {}

        def helper(n, g):
            if n not in g:
                return 1
            if n in cache:
                return cache[n]

            skip = helper(n + k, g)
            include = (2**g[n] - 1) * helper(n + 2 * k, g)
            cache[n] = skip + include
            return skip + include

        visit = set()
        for n in cnt.keys():
            if n in visit:
                continue
            g = {}
            while n - k in cnt:
                n -= k
            while n in cnt:
                g[n] = cnt[n]
                visit.add(n)
                n += k
            groups.append(g)

        res = 1
        for g in groups:
            n = min(g.keys())
            res *= helper(n, g)

        return res - 1
```

```java
public class Solution {
    private Map<Integer, Integer> cache;
    private Map<Integer, Integer> cnt;
    private Set<Integer> visit;

    public int beautifulSubsets(int[] nums, int k) {
        List<Map<Integer, Integer>> groups = new ArrayList<>();
        this.cache = new HashMap<>();
        this.cnt = new HashMap<>();
        this.visit = new HashSet<>();

        for (int num : nums) {
            cnt.put(num, cnt.getOrDefault(num, 0) + 1);
        }

        for (int n : cnt.keySet()) {
            if (visit.contains(n)) {
                continue;
            }
            Map<Integer, Integer> g = new HashMap<>();
            while (cnt.containsKey(n - k)) {
                n -= k;
            }
            while (cnt.containsKey(n)) {
                g.put(n, cnt.get(n));
                visit.add(n);
                n += k;
            }
            groups.add(g);
        }

        int res = 1;
        for (Map<Integer, Integer> g : groups) {
            int n = Collections.min(g.keySet());
            res *= helper(n, g, k);
        }

        return res - 1;
    }

    private int helper(int n, Map<Integer, Integer> g, int k) {
        if (!g.containsKey(n)) {
            return 1;
        }
        if (cache.containsKey(n)) {
            return cache.get(n);
        }

        int skip = helper(n + k, g, k);
        int include = (int) ((Math.pow(2, g.get(n)) - 1) * helper(n + 2 * k, g, k));
        int result = skip + include;
        cache.put(n, result);
        return result;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        vector<unordered_map<int, int>> groups;
        cache.clear();
        cnt.clear();
        visit.clear();

        for (int& num : nums) {
            cnt[num]++;
        }

        for (auto it = cnt.begin(); it != cnt.end(); ++it) {
            int n = it->first;
            if (visit.count(n)) {
                continue;
            }
            unordered_map<int, int> g;
            while (cnt.count(n - k)) {
                n -= k;
            }
            while (cnt.count(n)) {
                g[n] = cnt[n];
                visit.insert(n);
                n += k;
            }
            groups.push_back(g);
        }

        int res = 1;
        for (auto& g : groups) {
            int n = min_element(g.begin(), g.end())->first;
            res *= helper(n, g, k);
        }
        return res - 1;
    }

private:
    unordered_map<int, int> cache;
    unordered_map<int, int> cnt;
    unordered_set<int> visit;

    int helper(int n, unordered_map<int, int>& g, int k) {
        if (!g.count(n)) {
            return 1;
        }
        if (cache.count(n)) {
            return cache[n];
        }

        int skip = helper(n + k, g, k);
        int include = (pow(2, g[n]) - 1) * helper(n + 2 * k, g, k);
        return cache[n] = skip + include;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        let cnt = new Map();
        for (const num of nums) {
            cnt.set(num, (cnt.get(num) || 0) + 1);
        }

        let groups = [];
        let cache = new Map();
        let visit = new Set();

        for (let n of cnt.keys()) {
            if (visit.has(n)) {
                continue;
            }
            let g = new Map();
            while (cnt.has(n - k)) {
                n -= k;
            }
            while (cnt.has(n)) {
                g.set(n, cnt.get(n));
                visit.add(n);
                n += k;
            }
            groups.push(g);
        }

        const helper = (n, g) => {
            if (!g.has(n)) {
                return 1;
            }
            if (cache.has(n)) {
                return cache.get(n);
            }

            let skip = helper(n + k, g);
            let include = (2 ** g.get(n) - 1) * helper(n + 2 * k, g);
            let result = skip + include;
            cache.set(n, result);
            return result;
        };

        let res = 1;
        for (const g of groups) {
            let n = Math.min(...g.keys());
            res *= helper(n, g);
        }
        return res - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        groups = []  # List of dicts

        visit = set()
        for n in cnt.keys():
            if n in visit:
                continue
            g = {}
            while n - k in cnt:
                n -= k
            while n in cnt:
                g[n] = cnt[n]
                visit.add(n)
                n += k
            groups.append(g)

        res = 1
        for g in groups:
            dp = {}
            prev = None

            for num in sorted(g):
                count = g[num]
                if prev is None or prev + k != num:
                    dp[num] = (dp.get(prev, 1) * (1 + (2 ** count - 1)))
                else:
                    dp[num] = dp[prev] + (2 ** count - 1) * dp.get(prev - k, 1)
                prev = num

            res *= dp[prev]

        return res - 1
```

```java
class Solution {
    public int beautifulSubsets(int[] nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int num : nums) {
            cnt.put(num, cnt.getOrDefault(num, 0) + 1);
        }

        List<Map<Integer, Integer>> groups = new ArrayList<>();
        Set<Integer> visit = new HashSet<>();

        for (int n : cnt.keySet()) {
            if (visit.contains(n)) {
                continue;
            }
            Map<Integer, Integer> g = new HashMap<>();
            while (cnt.containsKey(n - k)) {
                n -= k;
            }
            while (cnt.containsKey(n)) {
                g.put(n, cnt.get(n));
                visit.add(n);
                n += k;
            }
            groups.add(g);
        }

        int res = 1;
        for (Map<Integer, Integer> g : groups) {
            Map<Integer, Integer> dp = new HashMap<>();
            Integer prev = null;

            List<Integer> arr = new ArrayList<>(g.keySet());
            Collections.sort(arr);
            for (int num : arr) {
                int count = g.get(num);
                if (prev == null || prev + k != num) {
                    dp.put(num, dp.getOrDefault(prev, 1) * (1 + (int) Math.pow(2, count) - 1));
                } else {
                    dp.put(num, dp.get(prev) +
                          ((int) Math.pow(2, count) - 1) * dp.getOrDefault(prev - k, 1));
                }
                prev = num;
            }

            res *= dp.get(prev);
        }

        return res - 1;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        unordered_map<int, int> cnt;
        for (int num : nums) {
            cnt[num]++;
        }

        vector<unordered_map<int, int>> groups;
        unordered_set<int> visit;

        for (auto it = cnt.begin(); it != cnt.end(); ++it) {
            int n = it->first;
            if (visit.count(n)) {
                continue;
            }
            unordered_map<int, int> g;
            while (cnt.count(n - k)) {
                n -= k;
            }
            while (cnt.count(n)) {
                g[n] = cnt[n];
                visit.insert(n);
                n += k;
            }
            groups.push_back(g);
        }

        int res = 1;
        for (auto& g : groups) {
            unordered_map<int, int> dp;
            int prev = -1;

            vector<int> keys;
            for (auto& [num, _] : g) {
                keys.push_back(num);
            }
            sort(keys.begin(), keys.end());

            for (int num : keys) {
                int count = g[num];
                if (prev == -1 || prev + k != num) {
                    dp[num] = dp.count(prev) ? dp[prev] * (1 + (1 << count) - 1) :
                                               (1 + (1 << count) - 1);
                } else {
                    dp[num] = dp[prev] + ((1 << count) - 1) *
                              (dp.count(prev - k) ? dp[prev - k] : 1);
                }
                prev = num;
            }

            res *= dp[prev];
        }

        return res - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        let cnt = new Map();
        for (const num of nums) {
            cnt.set(num, (cnt.get(num) || 0) + 1);
        }

        let groups = [];
        let visit = new Set();

        for (const n of cnt.keys()) {
            if (visit.has(n)) {
                continue;
            }
            let g = new Map();
            let num = n;
            while (cnt.has(num - k)) {
                num -= k;
            }
            while (cnt.has(num)) {
                g.set(num, cnt.get(num));
                visit.add(num);
                num += k;
            }
            groups.push(g);
        }

        let res = 1;
        for (const g of groups) {
            let dp = new Map();
            let prev = null;

            for (const num of g.keys()) {
                let count = g.get(num);
                if (prev === null || prev + k !== num) {
                    dp.set(num, (dp.get(prev) || 1) * (1 + (2 ** count - 1)));
                } else {
                    dp.set(
                        num,
                        dp.get(prev) +
                            (2 ** count - 1) * (dp.get(prev - k) || 1),
                    );
                }
                prev = num;
            }

            res *= dp.get(prev);
        }

        return res - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        groups = defaultdict(dict)

        # Group numbers based on their remainder with k
        for num in nums:
            groups[num % k][num] = cnt[num]

        res = 1
        for g in groups.values():
            prev = 0
            dp, ndp = 0, 1

            for num in sorted(g.keys()):
                count = g[num]
                have = (1 << count) - 1
                tmp = ndp
                ndp += dp

                if prev == 0 or prev + k != num:
                    dp = have * (tmp + dp)
                else:
                    dp = tmp * have

                prev = num

            res *= (dp + ndp)

        return res - 1
```

```java
public class Solution {
    public int beautifulSubsets(int[] nums, int k) {
        Map<Integer, Map<Integer, Integer>> groups = new HashMap<>();
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int num : nums) {
            cnt.put(num, cnt.getOrDefault(num, 0) + 1);
        }

        // Group numbers based on remainder with k
        for (int num : nums) {
            groups.putIfAbsent(num % k, new HashMap<>());
            groups.get(num % k).put(num, cnt.get(num));
        }

        int res = 1;
        for (Map<Integer, Integer> g : groups.values()) {
            int prev = 0, dp = 0, ndp = 1;
            List<Integer> sortedKeys = new ArrayList<>(g.keySet());
            Collections.sort(sortedKeys);

            for (int num : sortedKeys) {
                int count = g.get(num);
                int have = (1 << count) - 1;
                int tmp = ndp;
                ndp += dp;

                if (prev == 0 || prev + k != num) {
                    dp = have * (tmp + dp);
                } else {
                    dp = tmp * have;
                }

                prev = num;
            }

            res *= (dp + ndp);
        }

        return res - 1;
    }
}
```

```cpp
class Solution {
public:
    int beautifulSubsets(vector<int>& nums, int k) {
        unordered_map<int, map<int, int>> groups;
        unordered_map<int, int> cnt;
        for (int& num : nums) {
            cnt[num]++;
        }

        // Group numbers based on remainder with k
        for (int num : nums) {
            groups[num % k][num] = cnt[num];
        }

        int res = 1;
        for (auto& [rem, g] : groups) {
            int prev = 0, dp = 0, ndp = 1;

            for (auto& [num, count] : g) {
                int have = (1 << count) - 1;
                int tmp = ndp;
                ndp += dp;

                if (prev == 0 || prev + k != num) {
                    dp = have * (tmp + dp);
                } else {
                    dp = tmp * have;
                }

                prev = num;
            }

            res *= (dp + ndp);
        }

        return res - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    beautifulSubsets(nums, k) {
        let groups = new Map();
        let cnt = new Map();
        for (const num of nums) {
            cnt.set(num, (cnt.get(num) || 0) + 1);
        }

        // Group numbers based on remainder with k
        for (const num of nums) {
            if (!groups.has(num % k)) {
                groups.set(num % k, new Map());
            }
            groups.get(num % k).set(num, cnt.get(num));
        }

        let res = 1;
        for (const g of groups.values()) {
            let prev = 0,
                dp = 0,
                ndp = 1;
            let sortedKeys = Array.from(g.keys()).sort((a, b) => a - b);

            for (const num of sortedKeys) {
                let count = g.get(num);
                let have = (1 << count) - 1;
                let tmp = ndp;
                ndp += dp;

                if (prev === 0 || prev + k !== num) {
                    dp = have * (tmp + dp);
                } else {
                    dp = tmp * have;
                }

                prev = num;
            }

            res *= dp + ndp;
        }

        return res - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
