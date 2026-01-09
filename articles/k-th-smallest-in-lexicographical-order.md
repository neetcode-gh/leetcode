## 1. Brute Force

### Intuition

The simplest approach converts all numbers from 1 to n into strings and sorts them lexicographically. In lexicographical order, "10" comes before "2" because '1' < '2'. After sorting, we simply return the k-th element. This is straightforward but inefficient for large n.

### Algorithm

1. Generate all numbers from 1 to n as strings.
2. Sort the list of strings lexicographically.
3. Return the k-th string converted back to an integer.

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

### Intuition

Numbers in lexicographical order form a tree structure where each prefix leads to its extensions. For example, prefix "1" leads to "10", "11", ..., "19", "100", etc. We can count how many numbers exist under any prefix without enumerating them. Starting at "1", we count how many numbers lie in the subtree rooted at the current prefix. If this count is less than or equal to the remaining k, we skip this entire subtree and move to the next sibling. Otherwise, we descend into the subtree by appending a digit.

### Algorithm

1. Define `count(cur)` to calculate how many numbers in [1, n] have `cur` as a prefix.
2. Start with `cur = 1` and `i = 1` (position in lexicographical order).
3. While `i < k`:
   - Calculate `steps = count(cur)`.
   - If `i + steps <= k`, move to the next sibling: `cur++` and `i += steps`.
   - Otherwise, descend into children: `cur *= 10` and `i++`.
4. Return `cur` when `i == k`.

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
