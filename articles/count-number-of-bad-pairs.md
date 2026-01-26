## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Used to efficiently track and count elements with the same transformed value
- **Algebraic Manipulation** - Rearranging the bad pair condition to group elements efficiently
- **Counting Pairs** - Understanding how to count total pairs and use complementary counting (total pairs minus good pairs)

---

## 1. Brute Force

### Intuition
A bad pair is defined as `i < j` where `j - i != nums[j] - nums[i]`. We can check every possible pair of indices and count how many satisfy this condition.

### Algorithm
1. Initialize a counter for bad pairs.
2. Use two nested loops: the outer loop picks index `i`, the inner loop picks index `j` where `j > i`.
3. For each pair, check if `j - i != nums[j] - nums[i]`.
4. If the condition is true, increment the bad pair counter.
5. Return the total count.

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

### Intuition
Rearranging the bad pair condition `j - i != nums[j] - nums[i]` gives us `nums[j] - j != nums[i] - i`. This means a pair is "good" when both elements have the same value of `nums[k] - k`. Instead of counting bad pairs directly, we count the total pairs and subtract the good pairs. Elements with the same transformed value form good pairs among themselves.

### Algorithm
1. Use a hash map to track the frequency of each `nums[i] - i` value.
2. Keep a running total of pairs seen so far (which equals `i` at index `i`).
3. For each index, add the count of previously seen elements with the same transformed value to the good pairs count.
4. Update the hash map with the current transformed value.
5. Return total pairs minus good pairs.

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

---

## Common Pitfalls

### Counting Bad Pairs Directly
Trying to count bad pairs directly with a hash map is error-prone. The cleaner approach is to count good pairs (where `nums[i] - i == nums[j] - j`) and subtract from total pairs.

### Integer Overflow with Large Arrays
With n up to 10^5, the total number of pairs is n*(n-1)/2 which can exceed 32-bit integer limits. Use `long` or 64-bit integers for the result.
```java
// Wrong: overflow for large n
int res = 0;

// Correct: use long
long res = 0;
```

### Forgetting the Algebraic Transformation
The key insight is rewriting `j - i != nums[j] - nums[i]` as `nums[i] - i != nums[j] - j`. Without this transformation, you cannot efficiently group elements using a hash map.