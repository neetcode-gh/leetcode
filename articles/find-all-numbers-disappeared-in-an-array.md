## 1. Hash Set

### Intuition

We need to find numbers in the range `[1, n]` that are missing from the array. A simple approach is to create a set containing all numbers from `1` to `n`, then remove each number we find in the array. Whatever remains in the set are the missing numbers.

### Algorithm

1. Create a set containing all integers from `1` to `n`.
2. For each number in the input array, remove it from the set.
3. Return the remaining elements in the set as a list.

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        store = set(range(1, n + 1))

        for num in nums:
            store.discard(num)

        return list(store)
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int n = nums.length;
        Set<Integer> store = new HashSet<>();
        for (int i = 1; i <= n; i++) store.add(i);

        for (int num : nums) {
            store.remove(num);
        }

        return new ArrayList<>(store);
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        unordered_set<int> store;
        for (int i = 1; i <= n; i++) store.insert(i);

        for (int num : nums) {
            store.erase(num);
        }

        vector<int> result(store.begin(), store.end());
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findDisappearedNumbers(nums) {
        const n = nums.length;
        const store = new Set();
        for (let i = 1; i <= n; i++) store.add(i);

        for (let num of nums) {
            store.delete(num);
        }

        return Array.from(store);
    }
}
```

```csharp
public class Solution {
    public List<int> FindDisappearedNumbers(int[] nums) {
        int n = nums.Length;
        var store = new HashSet<int>();
        for (int i = 1; i <= n; i++) {
            store.Add(i);
        }

        foreach (int num in nums) {
            store.Remove(num);
        }

        return new List<int>(store);
    }
}
```

```go
func findDisappearedNumbers(nums []int) []int {
    n := len(nums)
    store := make(map[int]bool)
    for i := 1; i <= n; i++ {
        store[i] = true
    }

    for _, num := range nums {
        delete(store, num)
    }

    result := []int{}
    for num := range store {
        result = append(result, num)
    }
    return result
}
```

```kotlin
class Solution {
    fun findDisappearedNumbers(nums: IntArray): List<Int> {
        val n = nums.size
        val store = (1..n).toMutableSet()

        for (num in nums) {
            store.remove(num)
        }

        return store.toList()
    }
}
```

```swift
class Solution {
    func findDisappearedNumbers(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var store = Set(1...n)

        for num in nums {
            store.remove(num)
        }

        return Array(store)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Boolean Array

### Intuition

Instead of using a set, we can use a boolean array where `mark[i]` indicates whether the number `i+1` is present in the input. We first mark all numbers that appear, then collect all indices where the mark is still false.

### Algorithm

1. Create a boolean array `mark` of size `n`, initialized to `false`.
2. For each number in the input array, set `mark[num - 1] = true`.
3. Iterate through indices `1` to `n`:
   - If `mark[i - 1]` is `false`, add `i` to the result.
4. Return the result list.

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        mark = [False] * n

        for num in nums:
            mark[num - 1] = True

        res = []
        for i in range(1, n + 1):
            if not mark[i - 1]:
                res.append(i)
        return res
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int n = nums.length;
        boolean[] mark = new boolean[n];

        for (int num : nums) {
            mark[num - 1] = true;
        }

        List<Integer> res = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.add(i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        vector<bool> mark(n, false);

        for (int num : nums) {
            mark[num - 1] = true;
        }

        vector<int> res;
        for (int i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.push_back(i);
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
    findDisappearedNumbers(nums) {
        const n = nums.length;
        const mark = new Array(n).fill(false);

        for (let num of nums) {
            mark[num - 1] = true;
        }

        const res = [];
        for (let i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.push(i);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindDisappearedNumbers(int[] nums) {
        int n = nums.Length;
        bool[] mark = new bool[n];

        foreach (int num in nums) {
            mark[num - 1] = true;
        }

        List<int> res = new List<int>();
        for (int i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.Add(i);
            }
        }
        return res;
    }
}
```

```go
func findDisappearedNumbers(nums []int) []int {
    n := len(nums)
    mark := make([]bool, n)

    for _, num := range nums {
        mark[num-1] = true
    }

    res := []int{}
    for i := 1; i <= n; i++ {
        if !mark[i-1] {
            res = append(res, i)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findDisappearedNumbers(nums: IntArray): List<Int> {
        val n = nums.size
        val mark = BooleanArray(n)

        for (num in nums) {
            mark[num - 1] = true
        }

        val res = mutableListOf<Int>()
        for (i in 1..n) {
            if (!mark[i - 1]) {
                res.add(i)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findDisappearedNumbers(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var mark = [Bool](repeating: false, count: n)

        for num in nums {
            mark[num - 1] = true
        }

        var res = [Int]()
        for i in 1...n {
            if !mark[i - 1] {
                res.append(i)
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

## 3. Sorting

### Intuition

After sorting, we can use a two-pointer technique to find missing numbers. We iterate through numbers `1` to `n` and use a pointer to track our position in the sorted array. If the current number is not found at the pointer position, it must be missing.

### Algorithm

1. Sort the array.
2. Initialize a pointer `idx = 0`.
3. For each number from `1` to `n`:
   - Move `idx` forward while `nums[idx] < num` (skip duplicates and smaller values).
   - If `idx` reaches the end or `nums[idx] > num`, the number is missing; add it to the result.
4. Return the result list.

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        nums.sort()

        res = []
        idx = 0
        for num in range(1, n + 1):
            while idx < n and nums[idx] < num:
                idx += 1
            if idx == n or nums[idx] > num:
                res.append(num)
        return res
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);

        List<Integer> res = new ArrayList<>();
        int idx = 0;
        for (int num = 1; num <= n; num++) {
            while (idx < n && nums[idx] < num) {
                idx++;
            }
            if (idx == n || nums[idx] > num) {
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
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());

        vector<int> res;
        int idx = 0;
        for (int num = 1; num <= n; num++) {
            while (idx < n && nums[idx] < num) {
                idx++;
            }
            if (idx == n || nums[idx] > num) {
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
    findDisappearedNumbers(nums) {
        nums.sort((a, b) => a - b);

        const res = [];
        let idx = 0;
        for (let num = 1; num <= nums.length; num++) {
            while (idx < nums.length && nums[idx] < num) {
                idx++;
            }
            if (idx === nums.length || nums[idx] > num) {
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> FindDisappearedNumbers(int[] nums) {
        int n = nums.Length;
        Array.Sort(nums);

        List<int> res = new List<int>();
        int idx = 0;
        for (int num = 1; num <= n; num++) {
            while (idx < n && nums[idx] < num) {
                idx++;
            }
            if (idx == n || nums[idx] > num) {
                res.Add(num);
            }
        }
        return res;
    }
}
```

```go
func findDisappearedNumbers(nums []int) []int {
    n := len(nums)
    sort.Ints(nums)

    res := []int{}
    idx := 0
    for num := 1; num <= n; num++ {
        for idx < n && nums[idx] < num {
            idx++
        }
        if idx == n || nums[idx] > num {
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findDisappearedNumbers(nums: IntArray): List<Int> {
        val n = nums.size
        nums.sort()

        val res = mutableListOf<Int>()
        var idx = 0
        for (num in 1..n) {
            while (idx < n && nums[idx] < num) {
                idx++
            }
            if (idx == n || nums[idx] > num) {
                res.add(num)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findDisappearedNumbers(_ nums: [Int]) -> [Int] {
        let n = nums.count
        let sortedNums = nums.sorted()

        var res = [Int]()
        var idx = 0
        for num in 1...n {
            while idx < n && sortedNums[idx] < num {
                idx += 1
            }
            if idx == n || sortedNums[idx] > num {
                res.append(num)
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

## 4. Negative Marking

### Intuition

Since values are in range `[1, n]`, we can use the input array itself as a marker. For each value `v`, we mark the position `v-1` as visited by making it negative. After processing all values, any position that remains positive corresponds to a missing number.

### Algorithm

1. For each number in the array:
   - Compute the index as `abs(num) - 1`.
   - Make `nums[idx]` negative (use absolute value to handle already-negated elements).
2. Iterate through the array:
   - If `nums[i] > 0`, the number `i + 1` is missing; add it to the result.
3. Return the result list.

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for num in nums:
            i = abs(num) - 1
            nums[i] = -1 * abs(nums[i])

        res = []
        for i, num in enumerate(nums):
            if num > 0:
                res.append(i + 1)
        return res
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int num : nums) {
            int i = Math.abs(num) - 1;
            nums[i] = -Math.abs(nums[i]);
        }

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                res.add(i + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        for (int num : nums) {
            int i = abs(num) - 1;
            nums[i] = -abs(nums[i]);
        }

        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > 0) {
                res.push_back(i + 1);
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
    findDisappearedNumbers(nums) {
        for (let num of nums) {
            let i = Math.abs(num) - 1;
            nums[i] = -Math.abs(nums[i]);
        }

        const res = [];
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                res.push(i + 1);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> FindDisappearedNumbers(int[] nums) {
        foreach (int num in nums) {
            int i = Math.Abs(num) - 1;
            nums[i] = -1 * Math.Abs(nums[i]);
        }

        List<int> res = new List<int>();
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] > 0) {
                res.Add(i + 1);
            }
        }
        return res;
    }
}
```

```go
func findDisappearedNumbers(nums []int) []int {
    for _, num := range nums {
        i := abs(num) - 1
        nums[i] = -abs(nums[i])
    }

    res := []int{}
    for i, num := range nums {
        if num > 0 {
            res = append(res, i+1)
        }
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
    fun findDisappearedNumbers(nums: IntArray): List<Int> {
        for (num in nums) {
            val i = kotlin.math.abs(num) - 1
            nums[i] = -kotlin.math.abs(nums[i])
        }

        val res = mutableListOf<Int>()
        for (i in nums.indices) {
            if (nums[i] > 0) {
                res.add(i + 1)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findDisappearedNumbers(_ nums: [Int]) -> [Int] {
        var nums = nums
        for num in nums {
            let i = abs(num) - 1
            nums[i] = -abs(nums[i])
        }

        var res = [Int]()
        for i in 0..<nums.count {
            if nums[i] > 0 {
                res.append(i + 1)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we modified the input array without using extra space.
