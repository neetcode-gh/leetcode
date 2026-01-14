## 1. Brute Force

### Intuition

A good pair is defined as a pair `(i, j)` where `i < j` and `nums[i] == nums[j]`. The simplest approach is to check every possible pair of indices and count those that satisfy both conditions.

### Algorithm

1. Initialize a counter `res` to zero.
2. Use two nested loops: the outer loop picks index `i`, and the inner loop picks index `j` where `j > i`.
3. For each pair, if `nums[i] == nums[j]`, increment `res`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        res = 0
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] == nums[j]:
                    res += 1
        return res
```

```java
public class Solution {
    public int numIdenticalPairs(int[] nums) {
        int res = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) {
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
    int numIdenticalPairs(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] == nums[j]) {
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
    numIdenticalPairs(nums) {
        let res = 0;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) {
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
    public int NumIdenticalPairs(int[] nums) {
        int res = 0;
        for (int i = 0; i < nums.Length; i++) {
            for (int j = i + 1; j < nums.Length; j++) {
                if (nums[i] == nums[j]) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func numIdenticalPairs(nums []int) int {
    res := 0
    for i := 0; i < len(nums); i++ {
        for j := i + 1; j < len(nums); j++ {
            if nums[i] == nums[j] {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numIdenticalPairs(nums: IntArray): Int {
        var res = 0
        for (i in nums.indices) {
            for (j in i + 1 until nums.size) {
                if (nums[i] == nums[j]) {
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
    func numIdenticalPairs(_ nums: [Int]) -> Int {
        var res = 0
        for i in 0..<nums.count {
            for j in (i + 1)..<nums.count {
                if nums[i] == nums[j] {
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

## 2. Hash Map (Math)

### Intuition

If a value appears `c` times, the number of good pairs using that value equals the number of ways to choose 2 indices from `c` positions, which is `c * (c - 1) / 2`. We can count frequencies first, then sum up the pairs for each value.

### Algorithm

1. Count the frequency of each number using a hash map.
2. For each frequency `c`, add `c * (c - 1) / 2` to the `res`.
3. Return the total sum.

::tabs-start

```python
class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        count = Counter(nums)
        res = 0
        for num, c in count.items():
            res += c * (c - 1) // 2
        return res
```

```java
public class Solution {
    public int numIdenticalPairs(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        int res = 0;
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        for (int c : count.values()) {
            res += c * (c - 1) / 2;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numIdenticalPairs(vector<int>& nums) {
        unordered_map<int, int> count;
        int res = 0;
        for (int num : nums) {
            count[num]++;
        }
        for (auto& [num, c] : count) {
            res += c * (c - 1) / 2;
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
    numIdenticalPairs(nums) {
        const count = {};
        let res = 0;
        for (const num of nums) {
            count[num] = (count[num] || 0) + 1;
        }
        for (const c of Object.values(count)) {
            res += (c * (c - 1)) / 2;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumIdenticalPairs(int[] nums) {
        var count = new Dictionary<int, int>();
        int res = 0;
        foreach (int num in nums) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }
        foreach (int c in count.Values) {
            res += c * (c - 1) / 2;
        }
        return res;
    }
}
```

```go
func numIdenticalPairs(nums []int) int {
    count := make(map[int]int)
    res := 0
    for _, num := range nums {
        count[num]++
    }
    for _, c := range count {
        res += c * (c - 1) / 2
    }
    return res
}
```

```kotlin
class Solution {
    fun numIdenticalPairs(nums: IntArray): Int {
        val count = mutableMapOf<Int, Int>()
        var res = 0
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }
        for (c in count.values) {
            res += c * (c - 1) / 2
        }
        return res
    }
}
```

```swift
class Solution {
    func numIdenticalPairs(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        var res = 0
        for num in nums {
            count[num, default: 0] += 1
        }
        for c in count.values {
            res += c * (c - 1) / 2
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Hash Map

### Intuition

Instead of counting all frequencies first and then computing pairs, we can count pairs on the fly. As we traverse the array, each new occurrence of a value can form a good pair with every previous occurrence of that same value. We track the count of each value seen so far and add it to the `res` before updating the count.

### Algorithm

1. Initialize a hash map to store the count of each number seen so far.
2. For each number in the array:
   - Add the current count of that number to the `res` (this is the number of new pairs formed).
   - Increment the count of that number in the map.
3. Return the `res`.

::tabs-start

```python
class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        count = defaultdict(int)
        res = 0
        for num in nums:
            res += count[num]
            count[num] += 1
        return res
```

```java
public class Solution {
    public int numIdenticalPairs(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        int res = 0;
        for (int num : nums) {
            res += count.getOrDefault(num, 0);
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numIdenticalPairs(vector<int>& nums) {
        unordered_map<int, int> count;
        int res = 0;
        for (int num : nums) {
            res += count[num];
            count[num]++;
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
    numIdenticalPairs(nums) {
        const count = {};
        let res = 0;
        for (const num of nums) {
            res += count[num] || 0;
            count[num] = (count[num] || 0) + 1;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumIdenticalPairs(int[] nums) {
        var count = new Dictionary<int, int>();
        int res = 0;
        foreach (int num in nums) {
            if (count.ContainsKey(num)) {
                res += count[num];
                count[num]++;
            } else {
                count[num] = 1;
            }
        }
        return res;
    }
}
```

```go
func numIdenticalPairs(nums []int) int {
    count := make(map[int]int)
    res := 0
    for _, num := range nums {
        res += count[num]
        count[num]++
    }
    return res
}
```

```kotlin
class Solution {
    fun numIdenticalPairs(nums: IntArray): Int {
        val count = mutableMapOf<Int, Int>()
        var res = 0
        for (num in nums) {
            res += count.getOrDefault(num, 0)
            count[num] = count.getOrDefault(num, 0) + 1
        }
        return res
    }
}
```

```swift
class Solution {
    func numIdenticalPairs(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        var res = 0
        for num in nums {
            res += count[num] ?? 0
            count[num, default: 0] += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Double Counting Pairs

A good pair requires `i < j`, meaning each pair should only be counted once. When using nested loops, ensure the inner loop starts from `i + 1` rather than `0`. Similarly, when using the mathematical formula `c * (c - 1) / 2`, this already accounts for unique pairs and should not be doubled.

### Integer Overflow in Pair Calculation

When using the formula `c * (c - 1) / 2` to calculate the number of pairs for a frequency `c`, the multiplication can overflow for large values if using 32-bit integers. In languages with fixed-size integers, ensure you use an appropriate data type or perform the division before the multiplication becomes too large.
