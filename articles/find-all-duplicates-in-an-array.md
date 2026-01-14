## 1. Brute Force

### Intuition

The most direct approach is to compare every element with every other element that comes after it. If we find two elements that are equal, we know that value appears twice (since the problem states each element appears at most twice).

### Algorithm

1. For each element at index `i`:
   - Compare it with every element at index `j` where `j > i`.
   - If `nums[i] == nums[j]`, add `nums[i]` to the result and break (no need to check further for this value).
2. Return the result list.

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = []

        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] == nums[j]:
                    res.append(nums[i])
                    break

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        int n = nums.length;
        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) {
                    res.add(nums[i]);
                    break;
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
    vector<int> findDuplicates(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) {
                    res.push_back(nums[i]);
                    break;
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
     * @return {number[]}
     */
    findDuplicates(nums) {
        const n = nums.length;
        const res = [];

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (nums[i] === nums[j]) {
                    res.push(nums[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindDuplicates(int[] nums) {
        int n = nums.Length;
        List<int> res = new List<int>();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) {
                    res.Add(nums[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func findDuplicates(nums []int) []int {
    n := len(nums)
    res := []int{}

    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if nums[i] == nums[j] {
                res = append(res, nums[i])
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findDuplicates(nums: IntArray): List<Int> {
        val n = nums.size
        val res = mutableListOf<Int>()

        for (i in 0 until n) {
            for (j in i + 1 until n) {
                if (nums[i] == nums[j]) {
                    res.add(nums[i])
                    break
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findDuplicates(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int]()

        for i in 0..<n {
            for j in (i + 1)..<n {
                if nums[i] == nums[j] {
                    res.append(nums[i])
                    break
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
- Space complexity: $O(1)$ extra space.

---

## 2. Sorting

### Intuition

After sorting, duplicate values will be adjacent to each other. We can simply scan through the sorted array and check if any element equals its neighbor. This is more efficient than the brute force approach since we only need one pass after sorting.

### Algorithm

1. Sort the array.
2. Iterate through the array from index `0` to `n-2`:
   - If `nums[i] == nums[i+1]`, add `nums[i]` to the result.
3. Return the result list.

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        nums.sort()
        res = []

        for i in range(len(nums) - 1):
            if nums[i] == nums[i + 1]:
                res.append(nums[i])

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        Arrays.sort(nums);
        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                res.add(nums[i]);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;

        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                res.push_back(nums[i]);
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
     * @return {number[]}
     */
    findDuplicates(nums) {
        nums.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                res.push(nums[i]);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindDuplicates(int[] nums) {
        Array.Sort(nums);
        List<int> res = new List<int>();

        for (int i = 0; i < nums.Length - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                res.Add(nums[i]);
            }
        }

        return res;
    }
}
```

```go
func findDuplicates(nums []int) []int {
    sort.Ints(nums)
    res := []int{}

    for i := 0; i < len(nums)-1; i++ {
        if nums[i] == nums[i+1] {
            res = append(res, nums[i])
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findDuplicates(nums: IntArray): List<Int> {
        nums.sort()
        val res = mutableListOf<Int>()

        for (i in 0 until nums.size - 1) {
            if (nums[i] == nums[i + 1]) {
                res.add(nums[i])
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findDuplicates(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        var res = [Int]()

        for i in 0..<nums.count - 1 {
            if nums[i] == nums[i + 1] {
                res.append(nums[i])
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Hash Set

### Intuition

We can use a hash set to track which numbers we have already seen. As we iterate through the array, if a number is already in the set, it must be a duplicate. Otherwise, we add it to the set. This gives us `O(1)` lookup time for each element.

### Algorithm

1. Initialize an empty hash set `seen` and an empty result list.
2. For each number in the array:
   - If it is already in `seen`, add it to the result.
   - Otherwise, add it to `seen`.
3. Return the result list.

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        seen = set()
        res = []
        for num in nums:
            if num in seen:
                res.append(num)
            else:
                seen.add(num)
        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        List<Integer> res = new ArrayList<>();

        for (int num : nums) {
            if (seen.contains(num)) {
                res.add(num);
            } else {
                seen.add(num);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        unordered_set<int> seen;
        vector<int> res;

        for (int num : nums) {
            if (seen.count(num)) {
                res.push_back(num);
            } else {
                seen.insert(num);
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
     * @return {number[]}
     */
    findDuplicates(nums) {
        const seen = new Set();
        const res = [];

        for (const num of nums) {
            if (seen.has(num)) {
                res.push(num);
            } else {
                seen.add(num);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindDuplicates(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        List<int> res = new List<int>();

        foreach (int num in nums) {
            if (seen.Contains(num)) {
                res.Add(num);
            } else {
                seen.Add(num);
            }
        }

        return res;
    }
}
```

```go
func findDuplicates(nums []int) []int {
    seen := make(map[int]bool)
    res := []int{}

    for _, num := range nums {
        if seen[num] {
            res = append(res, num)
        } else {
            seen[num] = true
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findDuplicates(nums: IntArray): List<Int> {
        val seen = HashSet<Int>()
        val res = mutableListOf<Int>()

        for (num in nums) {
            if (num in seen) {
                res.add(num)
            } else {
                seen.add(num)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findDuplicates(_ nums: [Int]) -> [Int] {
        var seen = Set<Int>()
        var res = [Int]()

        for num in nums {
            if seen.contains(num) {
                res.append(num)
            } else {
                seen.insert(num)
            }
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

## 4. Hash Map

### Intuition

Instead of just tracking presence, we can count how many times each number appears using a hash map. After counting, we iterate through the map and collect all numbers that appear exactly `2`.

### Algorithm

1. Build a frequency map counting occurrences of each number.
2. Iterate through the map:
   - If a number has a count of `2`, add it to the result.
3. Return the result list.

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        count = Counter(nums)
        res = []

        for num in count:
            if count[num] == 2:
                res.append(num)

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        List<Integer> res = new ArrayList<>();

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        for (int num : count.keySet()) {
            if (count.get(num) == 2) {
                res.add(num);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        unordered_map<int, int> count;
        vector<int> res;

        for (int num : nums) {
            count[num]++;
        }

        for (auto& [num, freq] : count) {
            if (freq == 2) {
                res.push_back(num);
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
     * @return {number[]}
     */
    findDuplicates(nums) {
        const count = new Map();
        const res = [];

        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        for (const [num, freq] of count.entries()) {
            if (freq === 2) {
                res.push(num);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindDuplicates(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        List<int> res = new List<int>();

        foreach (int num in nums) {
            if (count.ContainsKey(num)) {
                count[num]++;
            } else {
                count[num] = 1;
            }
        }

        foreach (var kvp in count) {
            if (kvp.Value == 2) {
                res.Add(kvp.Key);
            }
        }

        return res;
    }
}
```

```go
func findDuplicates(nums []int) []int {
    count := make(map[int]int)
    res := []int{}

    for _, num := range nums {
        count[num]++
    }

    for num, freq := range count {
        if freq == 2 {
            res = append(res, num)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findDuplicates(nums: IntArray): List<Int> {
        val count = HashMap<Int, Int>()
        val res = mutableListOf<Int>()

        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        for ((num, freq) in count) {
            if (freq == 2) {
                res.add(num)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findDuplicates(_ nums: [Int]) -> [Int] {
        var count = [Int: Int]()
        var res = [Int]()

        for num in nums {
            count[num, default: 0] += 1
        }

        for (num, freq) in count {
            if freq == 2 {
                res.append(num)
            }
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

## 5. Negative Marking

### Intuition

Since all values are in the range `[1, n]` where `n` is the array length, we can use the array itself as a hash map. The key insight is that each value `v` can be mapped to index `v-1`. When we encounter a value, we mark the element at its corresponding index as negative. If we encounter a value whose corresponding index is already negative, that value must be a duplicate.

### Algorithm

1. For each number in the array:
   - Compute the index as `abs(num) - 1`.
   - If `nums[idx]` is already negative, add `abs(num)` to the result (this value was seen before).
   - Negate `nums[idx]` to mark that we have seen the value `idx + 1`.
2. Return the result list.

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        res = []

        for num in nums:
            idx = abs(num) - 1
            if nums[idx] < 0:
                res.append(abs(num))
            nums[idx] = -nums[idx]

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();

        for (int num : nums) {
            int idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                res.add(Math.abs(num));
            }
            nums[idx] = -nums[idx];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> res;

        for (int num : nums) {
            int idx = abs(num) - 1;
            if (nums[idx] < 0) {
                res.push_back(abs(num));
            }
            nums[idx] = -nums[idx];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findDuplicates(nums) {
        const res = [];

        for (let num of nums) {
            const idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                res.push(Math.abs(num));
            }
            nums[idx] = -nums[idx];
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindDuplicates(int[] nums) {
        List<int> res = new List<int>();

        foreach (int num in nums) {
            int idx = Math.Abs(num) - 1;
            if (nums[idx] < 0) {
                res.Add(Math.Abs(num));
            }
            nums[idx] = -nums[idx];
        }

        return res;
    }
}
```

```go
func findDuplicates(nums []int) []int {
    res := []int{}

    for _, num := range nums {
        idx := abs(num) - 1
        if nums[idx] < 0 {
            res = append(res, abs(num))
        }
        nums[idx] = -nums[idx]
    }

    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun findDuplicates(nums: IntArray): List<Int> {
        val res = mutableListOf<Int>()

        for (num in nums) {
            val idx = kotlin.math.abs(num) - 1
            if (nums[idx] < 0) {
                res.add(kotlin.math.abs(num))
            }
            nums[idx] = -nums[idx]
        }

        return res
    }
}
```

```swift
class Solution {
    func findDuplicates(_ nums: [Int]) -> [Int] {
        var nums = nums
        var res = [Int]()

        for num in nums {
            let idx = abs(num) - 1
            if nums[idx] < 0 {
                res.append(abs(num))
            }
            nums[idx] = -nums[idx]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Forgetting to Use Absolute Value When Accessing Indices

In the negative marking approach, once a value at an index is negated, subsequent accesses using that value as an index will fail. Always use `abs(num) - 1` to compute the correct index, as the value itself may have been negated in a previous iteration.

### Off-by-One Index Errors

Since array values are in the range `[1, n]` but indices are `[0, n-1]`, you must subtract 1 when converting a value to an index. Forgetting this adjustment causes index out of bounds errors or marks the wrong positions.

### Modifying the Array When It Should Be Preserved

The negative marking approach modifies the input array in place. If the problem requires the original array to remain unchanged, or if the array is used elsewhere after the function call, you should either restore the array afterward or use a different approach like a hash set.
