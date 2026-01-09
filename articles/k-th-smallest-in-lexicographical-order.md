## 1. Brute Force

::tabs-start

```python
class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        nums = []
        for num in range(1, n + 1):
            nums.append(str(num))

        nums.sort()
        return int(nums[k - 1])
```

```java
public class Solution {
    public int findKthNumber(int n, int k) {
        List<String> nums = new ArrayList<>();
        for (int num = 1; num <= n; num++) {
            nums.add(Integer.toString(num));
        }
        Collections.sort(nums);
        return Integer.parseInt(nums.get(k - 1));
    }
}
```

```cpp
class Solution {
public:
    int findKthNumber(int n, int k) {
        vector<string> nums;
        for (int num = 1; num <= n; ++num) {
            nums.push_back(to_string(num));
        }
        sort(nums.begin(), nums.end());
        return stoi(nums[k - 1]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    findKthNumber(n, k) {
        const nums = [];
        for (let num = 1; num <= n; num++) {
            nums.push(num.toString());
        }
        nums.sort();
        return parseInt(nums[k - 1], 10);
    }
}
```

```csharp
public class Solution {
    public int FindKthNumber(int n, int k) {
        var nums = new List<string>();
        for (int num = 1; num <= n; num++) {
            nums.Add(num.ToString());
        }
        nums.Sort();
        return int.Parse(nums[k - 1]);
    }
}
```

```go
func findKthNumber(n int, k int) int {
    nums := make([]string, 0, n)
    for num := 1; num <= n; num++ {
        nums = append(nums, strconv.Itoa(num))
    }
    sort.Strings(nums)
    res, _ := strconv.Atoi(nums[k-1])
    return res
}
```

```kotlin
class Solution {
    fun findKthNumber(n: Int, k: Int): Int {
        val nums = (1..n).map { it.toString() }.sorted()
        return nums[k - 1].toInt()
    }
}
```

```swift
class Solution {
    func findKthNumber(_ n: Int, _ k: Int) -> Int {
        var nums = [String]()
        for num in 1...n {
            nums.append(String(num))
        }
        nums.sort()
        return Int(nums[k - 1])!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Prefix Count

::tabs-start

```python
class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        cur = 1
        i = 1

        def count(cur):
            res = 0
            nei = cur + 1
            while cur <= n:
                res += min(nei, n + 1) - cur
                cur *= 10
                nei *= 10
            return res

        while i < k:
            steps = count(cur)
            if i + steps <= k:
                cur = cur + 1
                i += steps
            else:
                cur *= 10
                i += 1

        return cur
```

```java
public class Solution {
    public int findKthNumber(int n, int k) {
        long cur = 1;
        long i = 1;
        while (i < k) {
            long steps = count(cur, n);
            if (i + steps <= k) {
                cur++;
                i += steps;
            } else {
                cur *= 10;
                i++;
            }
        }
        return (int) cur;
    }

    private long count(long cur, int n) {
        long res = 0;
        long nei = cur + 1;
        while (cur <= n) {
            res += Math.min(nei, (long)n + 1) - cur;
            cur *= 10;
            nei *= 10;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findKthNumber(int n, int k) {
        long long cur = 1;
        long long i = 1;
        while (i < k) {
            long long steps = count(cur, n);
            if (i + steps <= k) {
                cur++;
                i += steps;
            } else {
                cur *= 10;
                i++;
            }
        }
        return (int)cur;
    }

private:
    long long count(long long cur, int n) {
        long long res = 0;
        long long nei = cur + 1;
        while (cur <= n) {
            res += min(nei, (long long)n + 1) - cur;
            cur *= 10;
            nei *= 10;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    findKthNumber(n, k) {
        let cur = 1,
            i = 1;
        const count = (curVal) => {
            let res = 0,
                nei = curVal + 1;
            while (curVal <= n) {
                res += Math.min(nei, n + 1) - curVal;
                curVal *= 10;
                nei *= 10;
            }
            return res;
        };

        while (i < k) {
            const steps = count(cur);
            if (i + steps <= k) {
                cur++;
                i += steps;
            } else {
                cur *= 10;
                i++;
            }
        }
        return cur;
    }
}
```

```csharp
public class Solution {
    public int FindKthNumber(int n, int k) {
        long cur = 1;
        long i = 1;
        while (i < k) {
            long steps = Count(cur, n);
            if (i + steps <= k) {
                cur++;
                i += steps;
            } else {
                cur *= 10;
                i++;
            }
        }
        return (int)cur;
    }

    private long Count(long cur, int n) {
        long res = 0;
        long nei = cur + 1;
        while (cur <= n) {
            res += Math.Min(nei, (long)n + 1) - cur;
            cur *= 10;
            nei *= 10;
        }
        return res;
    }
}
```

```go
func findKthNumber(n int, k int) int {
    count := func(cur int64) int64 {
        var res int64 = 0
        nei := cur + 1
        for cur <= int64(n) {
            res += min64(nei, int64(n)+1) - cur
            cur *= 10
            nei *= 10
        }
        return res
    }

    var cur int64 = 1
    var i int64 = 1
    for i < int64(k) {
        steps := count(cur)
        if i+steps <= int64(k) {
            cur++
            i += steps
        } else {
            cur *= 10
            i++
        }
    }
    return int(cur)
}

func min64(a, b int64) int64 {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun findKthNumber(n: Int, k: Int): Int {
        fun count(cur: Long): Long {
            var c = cur
            var nei = cur + 1
            var res = 0L
            while (c <= n) {
                res += minOf(nei, n.toLong() + 1) - c
                c *= 10
                nei *= 10
            }
            return res
        }

        var cur = 1L
        var i = 1L
        while (i < k) {
            val steps = count(cur)
            if (i + steps <= k) {
                cur++
                i += steps
            } else {
                cur *= 10
                i++
            }
        }
        return cur.toInt()
    }
}
```

```swift
class Solution {
    func findKthNumber(_ n: Int, _ k: Int) -> Int {
        func count(_ cur: Int) -> Int {
            var res = 0
            var c = cur
            var nei = cur + 1
            while c <= n {
                res += min(nei, n + 1) - c
                c *= 10
                nei *= 10
            }
            return res
        }

        var cur = 1
        var i = 1
        while i < k {
            let steps = count(cur)
            if i + steps <= k {
                cur += 1
                i += steps
            } else {
                cur *= 10
                i += 1
            }
        }
        return cur
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((\log n) ^ 2)$
- Space complexity: $O(1)$
