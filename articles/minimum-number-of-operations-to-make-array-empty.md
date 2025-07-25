## 1. Recursion

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        def dfs(cur):
            if cur < 0:
                return float('inf')
            if cur == 0:
                return 0

            ops = min(dfs(cur - 2), dfs(cur - 3))
            return 1 + ops

        count = Counter(nums)
        res = 0
        for num, cnt in count.items():
            op = dfs(cnt)
            if op == float("inf"):
                return -1
            res += op

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int res = 0;
        for (int cnt : count.values()) {
            int op = dfs(cnt);
            if (op == Integer.MAX_VALUE) {
                return -1;
            }
            res += op;
        }

        return res;
    }

    private int dfs(int cur) {
        if (cur < 0) {
            return Integer.MAX_VALUE;
        }
        if (cur == 0) {
            return 0;
        }

        int ops = Math.min(dfs(cur - 2), dfs(cur - 3));
        return ops == Integer.MAX_VALUE ? ops : 1 + ops;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            int op = dfs(cnt);
            if (op == INT_MAX) {
                return -1;
            }
            res += op;
        }

        return res;
    }

private:
    int dfs(int cur) {
        if (cur < 0) {
            return INT_MAX;
        }
        if (cur == 0) {
            return 0;
        }

        int ops = min(dfs(cur - 2), dfs(cur - 3));
        return ops == INT_MAX ? ops : 1 + ops;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const dfs = (cur) => {
            if (cur < 0) {
                return Infinity;
            }
            if (cur === 0) {
                return 0;
            }

            const ops = Math.min(dfs(cur - 2), dfs(cur - 3));
            return isFinite(ops) ? 1 + ops : ops;
        };

        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = 0;
        for (const cnt of count.values()) {
            const op = dfs(cnt);
            if (op === Infinity) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the average frequency of the array elements.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        cache = {}

        def dfs(num):
            if num < 0:
                return float("inf")
            if num in [2, 3]:
                return 1
            if num in cache:
                return cache[num]

            res = min(dfs(num - 2), dfs(num - 3))
            cache[num] = res + 1
            return cache[num]

        count = Counter(nums)
        res = 0
        for num, cnt in count.items():
            op = dfs(cnt)
            if op == float("inf"):
                return -1
            res += op

        return res
```

```java
public class Solution {
    private Map<Integer, Integer> cache;

    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        cache = new HashMap<>();
        int res = 0;
        for (int cnt : count.values()) {
            int op = dfs(cnt);
            if (op == Integer.MAX_VALUE) {
                return -1;
            }
            res += op;
        }

        return res;
    }

    private int dfs(int cur) {
        if (cur < 0) {
            return Integer.MAX_VALUE;
        }
        if (cur == 2 || cur == 3) {
            return 1;
        }
        if (cache.containsKey(cur)) {
            return cache.get(cur);
        }

        int res = Math.min(dfs(cur - 2), dfs(cur - 3));
        cache.put(cur, res == Integer.MAX_VALUE ? res : res + 1);
        return cache.get(cur);
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> cache;
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            int op = dfs(cnt);
            if (op == INT_MAX) {
                return -1;
            }
            res += op;
        }

        return res;
    }

private:
    int dfs(int cur) {
        if (cur < 0) {
            return INT_MAX;
        }
        if (cur == 2 || cur == 3) {
            return 1;
        }
        if (cache.count(cur)) {
            return cache[cur];
        }

        int res = min(dfs(cur - 2), dfs(cur - 3));
        cache[cur] = res == INT_MAX ? res : res + 1;
        return cache[cur];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const cache = new Map();
        const dfs = (cur) => {
            if (cur < 0) {
                return Infinity;
            }
            if (cur === 2 || cur === 3) {
                return 1;
            }
            if (cache.has(cur)) {
                return cache.get(cur);
            }

            const res = Math.min(dfs(cur - 2), dfs(cur - 3));
            cache.set(cur, isFinite(res) ? 1 + res : res);
            return cache.get(cur);
        };

        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = 0;
        for (const cnt of count.values()) {
            const op = dfs(cnt);
            if (!isFinite(op)) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the average frequency of the array elements.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        count = Counter(nums)
        maxf = max(count.values())
        minOps = [0] * (maxf + 1)
        minOps[1] = float("inf")

        for i in range(2, maxf + 1):
            minOps[i] = minOps[i - 2]
            if i - 3 >= 0:
                minOps[i] = min(minOps[i], minOps[i - 3])
            if minOps[i] != float("inf"):
                minOps[i] += 1

        res = 0
        for num, cnt in count.items():
            op = minOps[cnt]
            if op == float("inf"):
                return -1
            res += op

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int maxf = count.values().stream().max(Integer::compare).orElse(0);
        int[] minOps = new int[maxf + 1];
        minOps[1] = Integer.MAX_VALUE;

        for (int i = 2; i <= maxf; i++) {
            minOps[i] = minOps[i - 2];
            if (i - 3 >= 0) {
                minOps[i] = Math.min(minOps[i], minOps[i - 3]);
            }
            if (minOps[i] != Integer.MAX_VALUE) {
                minOps[i] += 1;
            }
        }

        int res = 0;
        for (int cnt : count.values()) {
            int op = minOps[cnt];
            if (op == Integer.MAX_VALUE) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int maxf = 0;
        for (auto& [num, freq] : count) {
            maxf = max(maxf, freq);
        }

        vector<int> minOps(maxf + 1, 0);
        minOps[1] = INT_MAX;

        for (int i = 2; i <= maxf; i++) {
            minOps[i] = minOps[i - 2];
            if (i - 3 >= 0) {
                minOps[i] = min(minOps[i], minOps[i - 3]);
            }
            if (minOps[i] != INT_MAX) {
                minOps[i] += 1;
            }
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            int op = minOps[cnt];
            if (op == INT_MAX) {
                return -1;
            }
            res += op;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const maxf = Math.max(...count.values());
        const minOps = Array(maxf + 1).fill(0);
        minOps[1] = Infinity;

        for (let i = 2; i <= maxf; i++) {
            minOps[i] = minOps[i - 2];
            if (i - 3 >= 0) {
                minOps[i] = Math.min(minOps[i], minOps[i - 3]);
            }
            if (minOps[i] !== Infinity) {
                minOps[i] += 1;
            }
        }

        let res = 0;
        for (const cnt of count.values()) {
            const op = minOps[cnt];
            if (op === Infinity) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the average frequency of the array elements.

---

## 4. Greedy

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        count = Counter(nums)
        res = 0

        for num, cnt in count.items():
            if cnt == 1:
                return -1
            res += math.ceil(cnt / 3)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int res = 0;
        for (int cnt : count.values()) {
            if (cnt == 1) {
                return -1;
            }
            res += (cnt + 2) / 3;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            if (cnt == 1) {
                return -1;
            }
            res += (cnt + 2) / 3;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = 0;
        for (const cnt of count.values()) {
            if (cnt === 1) {
                return -1;
            }
            res += Math.ceil(cnt / 3);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
