## 1. Brute Force

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = 0

        for i in range(N - 1):
            for j in range(i + 1, N):
                for k in range(j, N):
                    a = b = 0
                    for idx in range(i, j):
                        a ^= arr[idx]
                    for idx in range(j, k + 1):
                        b ^= arr[idx]
                    if a == b:
                        res += 1

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            for (int j = i + 1; j < N; j++) {
                for (int k = j; k < N; k++) {
                    int a = 0, b = 0;
                    for (int idx = i; idx < j; idx++) {
                        a ^= arr[idx];
                    }
                    for (int idx = j; idx <= k; idx++) {
                        b ^= arr[idx];
                    }
                    if (a == b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int N = arr.size();
        int res = 0;

        for (int i = 0; i < N - 1; ++i) {
            for (int j = i + 1; j < N; ++j) {
                for (int k = j; k < N; ++k) {
                    int a = 0, b = 0;
                    for (int idx = i; idx < j; ++idx) {
                        a ^= arr[idx];
                    }
                    for (int idx = j; idx <= k; ++idx) {
                        b ^= arr[idx];
                    }
                    if (a == b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0;

        for (let i = 0; i < N - 1; i++) {
            for (let j = i + 1; j < N; j++) {
                for (let k = j; k < N; k++) {
                    let a = 0,
                        b = 0;
                    for (let idx = i; idx < j; idx++) {
                        a ^= arr[idx];
                    }
                    for (let idx = j; idx <= k; idx++) {
                        b ^= arr[idx];
                    }
                    if (a === b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(1)$ extra space.

---

## 2. Brute Force (Optimized)

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = 0

        for i in range(N - 1):
            a = 0
            for j in range(i + 1, N):
                a ^= arr[j - 1]
                b = 0
                for k in range(j, N):
                    b ^= arr[k]
                    if a == b:
                        res += 1

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            int a = 0;
            for (int j = i + 1; j < N; j++) {
                a ^= arr[j - 1];
                int b = 0;
                for (int k = j; k < N; k++) {
                    b ^= arr[k];
                    if (a == b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int N = arr.size();
        int res = 0;

        for (int i = 0; i < N - 1; ++i) {
            int a = 0;
            for (int j = i + 1; j < N; ++j) {
                a ^= arr[j - 1];
                int b = 0;
                for (int k = j; k < N; ++k) {
                    b ^= arr[k];
                    if (a == b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0;

        for (let i = 0; i < N - 1; i++) {
            let a = 0;
            for (let j = i + 1; j < N; j++) {
                a ^= arr[j - 1];
                let b = 0;
                for (let k = j; k < N; k++) {
                    b ^= arr[k];
                    if (a === b) {
                        res++;
                    }
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(1)$ extra space.

---

## 3. Math + Bitwise XOR

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = 0

        for i in range(N - 1):
            cur_xor = arr[i]
            for k in range(i + 1, N):
                cur_xor ^= arr[k]
                if cur_xor == 0:
                    res += k - i

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length;
        int res = 0;

        for (int i = 0; i < N - 1; i++) {
            int curXor = arr[i];
            for (int k = i + 1; k < N; k++) {
                curXor ^= arr[k];
                if (curXor == 0) {
                    res += k - i;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int N = arr.size();
        int res = 0;

        for (int i = 0; i < N - 1; ++i) {
            int curXor = arr[i];
            for (int k = i + 1; k < N; ++k) {
                curXor ^= arr[k];
                if (curXor == 0) {
                    res += k - i;
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0;

        for (let i = 0; i < N - 1; i++) {
            let curXor = arr[i];
            for (let k = i + 1; k < N; k++) {
                curXor ^= arr[k];
                if (curXor === 0) {
                    res += k - i;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 4. Math + Bitwise XOR (Optimal)

::tabs-start

```python
class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        N = len(arr)
        res = prefix = 0
        count = defaultdict(int)  # number of prefixes
        index_sum = defaultdict(int)  # sum of indices with that prefix
        count[0] = 1

        for i in range(N):
            prefix ^= arr[i]
            if prefix in count:
                res += i * count[prefix] - index_sum[prefix]
            count[prefix] += 1
            index_sum[prefix] += i + 1

        return res
```

```java
public class Solution {
    public int countTriplets(int[] arr) {
        int N = arr.length, res = 0, prefix = 0;
        Map<Integer, Integer> count = new HashMap<>(); // number of prefixes
        Map<Integer, Integer> indexSum = new HashMap<>(); // sum of indices with that prefix
        count.put(0, 1);

        for (int i = 0; i < N; i++) {
            prefix ^= arr[i];
            if (count.containsKey(prefix)) {
                res += i * count.get(prefix) - indexSum.getOrDefault(prefix, 0);
            }
            count.put(prefix, count.getOrDefault(prefix, 0) + 1);
            indexSum.put(prefix, indexSum.getOrDefault(prefix, 0) + i + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int N = arr.size(), res = 0, prefix = 0;
        unordered_map<int, int> count; // number of prefixes
        unordered_map<int, int> indexSum; // sum of indices with that prefix
        count[0] = 1;

        for (int i = 0; i < N; i++) {
            prefix ^= arr[i];
            if (count.count(prefix)) {
                res += i * count[prefix] - indexSum[prefix];
            }
            count[prefix]++;
            indexSum[prefix] += i + 1;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countTriplets(arr) {
        const N = arr.length;
        let res = 0,
            prefix = 0;
        const count = new Map(); // number of prefixes
        const indexSum = new Map(); // sum of indices with that prefix
        count.set(0, 1);

        for (let i = 0; i < N; i++) {
            prefix ^= arr[i];
            if (count.has(prefix)) {
                res += i * count.get(prefix) - (indexSum.get(prefix) || 0);
            }
            count.set(prefix, (count.get(prefix) || 0) + 1);
            indexSum.set(prefix, (indexSum.get(prefix) || 0) + i + 1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
