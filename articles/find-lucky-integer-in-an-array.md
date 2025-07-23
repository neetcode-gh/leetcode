## 1. Brute Force

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        res = -1

        for num in arr:
            cnt = 0
            for a in arr:
                if num == a:
                    cnt += 1
            if cnt == num:
                res = max(res, num)

        return res
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        int res = -1;

        for (int num : arr) {
            int cnt = 0;
            for (int a : arr) {
                if (num == a) {
                    cnt++;
                }
            }
            if (cnt == num) {
                res = Math.max(res, num);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        int res = -1;

        for (int num : arr) {
            int cnt = 0;
            for (int a : arr) {
                if (num == a) {
                    cnt++;
                }
            }
            if (cnt == num) {
                res = max(res, num);
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
    findLucky(arr) {
        let res = -1;

        for (let num of arr) {
            let cnt = 0;
            for (let a of arr) {
                if (num === a) {
                    cnt++;
                }
            }
            if (cnt === num) {
                res = Math.max(res, num);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        int res = -1;

        foreach (int num in arr) {
            int cnt = 0;
            foreach (int a in arr) {
                if (num == a) {
                    cnt++;
                }
            }
            if (cnt == num) {
                res = Math.Max(res, num);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        arr.sort()
        streak = 0
        for i in range(len(arr) - 1, -1, -1):
            streak += 1
            if i == 0 or (arr[i] != arr[i - 1]):
                if arr[i] == streak:
                    return arr[i]
                streak = 0
        return -1
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        Arrays.sort(arr);
        int streak = 0;

        for (int i = arr.length - 1; i >= 0; i--) {
            streak++;
            if (i == 0 || arr[i] != arr[i - 1]) {
                if (arr[i] == streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int streak = 0;

        for (int i = arr.size() - 1; i >= 0; i--) {
            streak++;
            if (i == 0 || arr[i] != arr[i - 1]) {
                if (arr[i] == streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    findLucky(arr) {
        arr.sort((a, b) => a - b);
        let streak = 0;

        for (let i = arr.length - 1; i >= 0; i--) {
            streak++;
            if (i === 0 || arr[i] !== arr[i - 1]) {
                if (arr[i] === streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        Array.Sort(arr);
        int streak = 0;

        for (int i = arr.Length - 1; i >= 0; i--) {
            streak++;
            if (i == 0 || arr[i] != arr[i - 1]) {
                if (arr[i] == streak) {
                    return arr[i];
                }
                streak = 0;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Hash Map

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        cnt = Counter(arr)
        res = -1

        for num in cnt:
            if num == cnt[num]:
                res = max(num, res)
        
        return res
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : arr) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int res = -1;
        for (int num : count.keySet()) {
            if (num == count.get(num)) {
                res = Math.max(res, num);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        unordered_map<int, int> count;
        for (int num : arr) {
            count[num]++;
        }

        int res = -1;
        for (auto& [num, freq] : count) {
            if (num == freq) {
                res = max(res, num);
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
    findLucky(arr) {
        const count = new Map();
        for (const num of arr) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = -1;
        for (const [num, freq] of count.entries()) {
            if (num === freq) {
                res = Math.max(res, num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in arr) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;
        }

        int res = -1;
        foreach (var kvp in count) {
            if (kvp.Key == kvp.Value) {
                res = Math.Max(res, kvp.Key);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Negative Marking

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        n = len(arr)
        for i in range(n):
            prev, num = i, arr[i]
            while 0 < num <= n:
                nxt = arr[num - 1]
                arr[num - 1] = min(0, arr[num - 1]) - 1
                if num - 1 <= i or num - 1 == prev:
                    break
                prev = num - 1
                num = nxt
        
        for i in range(n - 1, -1, -1):
            if -arr[i] == i + 1:
                return i + 1
        
        return -1
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            int prev = i, num = arr[i];
            while (0 < num && num <= n) {
                int nxt = arr[num - 1];
                arr[num - 1] = Math.min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 == prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            if (-arr[i] == i + 1) return i + 1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n; i++) {
            int prev = i, num = arr[i];
            while (0 < num && num <= n) {
                int nxt = arr[num - 1];
                arr[num - 1] = min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 == prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            if (-arr[i] == i + 1) return i + 1;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    findLucky(arr) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let prev = i, num = arr[i];
            while (0 < num && num <= n) {
                let nxt = arr[num - 1];
                arr[num - 1] = Math.min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 === prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (let i = n - 1; i >= 0; i--) {
            if (-arr[i] === i + 1) return i + 1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        int n = arr.Length;
        for (int i = 0; i < n; i++) {
            int prev = i, num = arr[i];
            while (0 < num && num <= n) {
                int nxt = arr[num - 1];
                arr[num - 1] = Math.Min(0, arr[num - 1]) - 1;
                if (num - 1 <= i || num - 1 == prev) break;
                prev = num - 1;
                num = nxt;
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            if (-arr[i] == i + 1) return i + 1;
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 5. Bit Manipulation

::tabs-start

```python
class Solution:
    def findLucky(self, arr: List[int]) -> int:
        for num in arr:
            idx = num & ((1 << 10) - 1)
            if idx <= len(arr):
                arr[idx - 1] += (1 << 10)

        for i in range(len(arr) - 1, -1, -1):
            cnt = arr[i] >> 10
            if cnt == i + 1:
                return i + 1
        return -1
```

```java
public class Solution {
    public int findLucky(int[] arr) {
        for (int num : arr) {
            int idx = num & ((1 << 10) - 1);
            if (idx <= arr.length) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (int i = arr.length - 1; i >= 0; i--) {
            int cnt = arr[i] >> 10;
            if (cnt == i + 1) return i + 1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        for (int num : arr) {
            int idx = num & ((1 << 10) - 1);
            if (idx <= arr.size()) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (int i = arr.size() - 1; i >= 0; i--) {
            int cnt = arr[i] >> 10;
            if (cnt == i + 1) return i + 1;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    findLucky(arr) {
        for (let num of arr) {
            const idx = num & ((1 << 10) - 1);
            if (idx <= arr.length) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            const cnt = arr[i] >> 10;
            if (cnt === i + 1) return i + 1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindLucky(int[] arr) {
        foreach (int num in arr) {
            int idx = num & ((1 << 10) - 1);
            if (idx <= arr.Length) {
                arr[idx - 1] += (1 << 10);
            }
        }

        for (int i = arr.Length - 1; i >= 0; i--) {
            int cnt = arr[i] >> 10;
            if (cnt == i + 1) return i + 1;
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$