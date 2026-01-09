## 1. Brute Force

::tabs-start

```python
class Solution:
    def countBadPairs(self, nums: List[int]) -> int:
        n, res = len(nums), 0
        for i in range(n - 1):
            for j in range(i + 1, n):
                if j - i != nums[j] - nums[i]:
                    res += 1
        return res
```

```java
public class Solution {
    public long countBadPairs(int[] nums) {
        int n = nums.length;
        long res = 0;
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if (j - i != nums[j] - nums[i]) {
                    res++;
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
    long long countBadPairs(vector<int>& nums) {
        int n = nums.size();
        long long res = 0;
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if (j - i != nums[j] - nums[i]) {
                    res++;
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
     * @param {number[]} nums
     * @return {number}
     */
    countBadPairs(nums) {
        let n = nums.length,
            res = 0;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (j - i !== nums[j] - nums[i]) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long CountBadPairs(int[] nums) {
        int n = nums.Length;
        long res = 0;
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if (j - i != nums[j] - nums[i]) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func countBadPairs(nums []int) int64 {
    n := len(nums)
    var res int64 = 0
    for i := 0; i < n-1; i++ {
        for j := i + 1; j < n; j++ {
            if j-i != nums[j]-nums[i] {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countBadPairs(nums: IntArray): Long {
        val n = nums.size
        var res: Long = 0
        for (i in 0 until n - 1) {
            for (j in i + 1 until n) {
                if (j - i != nums[j] - nums[i]) {
                    res++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countBadPairs(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0
        for i in 0..<(n - 1) {
            for j in (i + 1)..<n {
                if j - i != nums[j] - nums[i] {
                    res += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def countBadPairs(self, nums: List[int]) -> int:
        good_pairs = 0
        total_pairs = 0
        count = defaultdict(int)

        for i in range(len(nums)):
            total_pairs += i
            good_pairs += count[nums[i] - i]
            count[nums[i] - i] += 1

        return total_pairs - good_pairs
```

```java
public class Solution {
    public long countBadPairs(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        long total = 0, good = 0;
        for (int i = 0; i < nums.length; i++) {
            int key = nums[i] - i;
            good += count.getOrDefault(key, 0);
            count.put(key, count.getOrDefault(key, 0) + 1);
            total += i;
        }
        return total - good;
    }
}
```

```cpp
class Solution {
public:
    long long countBadPairs(vector<int>& nums) {
        unordered_map<int, int> count;
        long long total = 0, good = 0;
        for (int i = 0; i < nums.size(); i++) {
            int key = nums[i] - i;
            good += count[key];
            count[key]++;
            total += i;
        }
        return total - good;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    countBadPairs(nums) {
        let count = new Map();
        let total = 0,
            good = 0;
        for (let i = 0; i < nums.length; i++) {
            let key = nums[i] - i;
            good += count.get(key) || 0;
            count.set(key, (count.get(key) || 0) + 1);
            total += i;
        }
        return total - good;
    }
}
```

```csharp
public class Solution {
    public long CountBadPairs(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        long total = 0, good = 0;
        for (int i = 0; i < nums.Length; i++) {
            int key = nums[i] - i;
            if (count.ContainsKey(key)) {
                good += count[key];
                count[key]++;
            } else {
                count[key] = 1;
            }
            total += i;
        }
        return total - good;
    }
}
```

```go
func countBadPairs(nums []int) int64 {
    count := make(map[int]int)
    var total, good int64 = 0, 0
    for i := 0; i < len(nums); i++ {
        key := nums[i] - i
        good += int64(count[key])
        count[key]++
        total += int64(i)
    }
    return total - good
}
```

```kotlin
class Solution {
    fun countBadPairs(nums: IntArray): Long {
        val count = HashMap<Int, Int>()
        var total: Long = 0
        var good: Long = 0
        for (i in nums.indices) {
            val key = nums[i] - i
            good += count.getOrDefault(key, 0).toLong()
            count[key] = count.getOrDefault(key, 0) + 1
            total += i
        }
        return total - good
    }
}
```

```swift
class Solution {
    func countBadPairs(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        var total = 0
        var good = 0
        for i in 0..<nums.count {
            let key = nums[i] - i
            good += count[key, default: 0]
            count[key, default: 0] += 1
            total += i
        }
        return total - good
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
