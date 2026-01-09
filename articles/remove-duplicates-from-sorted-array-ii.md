## 1. Brute Force

### Intuition

We allow each element to appear at most twice. When we find more than two consecutive duplicates, we shift all subsequent elements left to overwrite the extras. This in-place modification is straightforward but inefficient due to repeated shifting operations.

### Algorithm

1. Handle arrays with 2 or fewer elements as base cases.
2. Iterate through the array looking for duplicate pairs.
3. When a duplicate pair is found, count how many extras exist beyond the allowed two.
4. Shift all elements after the extras to the left to fill the gap.
5. Reduce the effective array length and continue scanning.
6. Return the final length.

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n
        i = 0
        while i < n - 1:
            if nums[i] == nums[i + 1]:
                j = i + 2
                cnt = 0
                while j < n and nums[i] == nums[j]:
                    j += 1
                    cnt += 1
                for k in range(i + 2, n):
                    if j >= n:
                        break
                    nums[k] = nums[j]
                    j += 1
                n -= cnt
                i += 2
            else:
                i += 1
        return n
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int n = nums.length;
        if (n <= 2) return n;
        int i = 0;
        while (i < n - 1) {
            if (nums[i] == nums[i + 1]) {
                int j = i + 2, cnt = 0;
                while (j < n && nums[i] == nums[j]) {
                    j++;
                    cnt++;
                }
                for (int k = i + 2; k < n; k++) {
                    if (j >= n) break;
                    nums[k] = nums[j++];
                }
                n -= cnt;
                i += 2;
            } else {
                i++;
            }
        }
        return n;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int n = nums.size();
        if (n <= 2) return n;
        int i = 0;
        while (i < n - 1) {
            if (nums[i] == nums[i + 1]) {
                int j = i + 2, cnt = 0;
                while (j < n && nums[i] == nums[j]) {
                    j++;
                    cnt++;
                }
                for (int k = i + 2; k < n; k++) {
                    if (j >= n) break;
                    nums[k] = nums[j++];
                }
                n -= cnt;
                i += 2;
            } else {
                i++;
            }
        }
        return n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        let n = nums.length;
        if (n <= 2) return n;
        let i = 0;
        while (i < n - 1) {
            if (nums[i] === nums[i + 1]) {
                let j = i + 2,
                    cnt = 0;
                while (j < n && nums[i] === nums[j]) {
                    j++;
                    cnt++;
                }
                for (let k = i + 2; k < n; k++) {
                    if (j >= n) break;
                    nums[k] = nums[j++];
                }
                n -= cnt;
                i += 2;
            } else {
                i++;
            }
        }
        return n;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int n = nums.Length;
        if (n <= 2) return n;
        int i = 0;
        while (i < n - 1) {
            if (nums[i] == nums[i + 1]) {
                int j = i + 2, cnt = 0;
                while (j < n && nums[i] == nums[j]) {
                    j++;
                    cnt++;
                }
                for (int k = i + 2; k < n; k++) {
                    if (j >= n) break;
                    nums[k] = nums[j++];
                }
                n -= cnt;
                i += 2;
            } else {
                i++;
            }
        }
        return n;
    }
}
```

```go
func removeDuplicates(nums []int) int {
    n := len(nums)
    if n <= 2 {
        return n
    }
    i := 0
    for i < n-1 {
        if nums[i] == nums[i+1] {
            j, cnt := i+2, 0
            for j < n && nums[i] == nums[j] {
                j++
                cnt++
            }
            for k := i + 2; k < n; k++ {
                if j >= n {
                    break
                }
                nums[k] = nums[j]
                j++
            }
            n -= cnt
            i += 2
        } else {
            i++
        }
    }
    return n
}
```

```kotlin
class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        var n = nums.size
        if (n <= 2) return n
        var i = 0
        while (i < n - 1) {
            if (nums[i] == nums[i + 1]) {
                var j = i + 2
                var cnt = 0
                while (j < n && nums[i] == nums[j]) {
                    j++
                    cnt++
                }
                for (k in i + 2 until n) {
                    if (j >= n) break
                    nums[k] = nums[j++]
                }
                n -= cnt
                i += 2
            } else {
                i++
            }
        }
        return n
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        var n = nums.count
        if n <= 2 { return n }
        var i = 0
        while i < n - 1 {
            if nums[i] == nums[i + 1] {
                var j = i + 2, cnt = 0
                while j < n && nums[i] == nums[j] {
                    j += 1
                    cnt += 1
                }
                for k in (i + 2)..<n {
                    if j >= n { break }
                    nums[k] = nums[j]
                    j += 1
                }
                n -= cnt
                i += 2
            } else {
                i += 1
            }
        }
        return n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Hash Map

### Intuition

We count occurrences of each element using a hash map while preserving order. Then we reconstruct the array, writing each element at most twice. This uses extra space but separates the counting logic from the placement logic.

### Algorithm

1. Count occurrences of each element while tracking their first appearance order.
2. Iterate through unique elements in order.
3. For each element, write it to the result position once, then write it again if it appeared more than once.
4. Return the final write position as the new length.

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n

        count = Counter(nums)
        i = 0
        for num in count:
            nums[i] = num
            count[num] -= 1
            i += 1
            if count[num] >= 1:
                nums[i] = num
                count[num] -= 1
                i += 1
        return i
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        List<Integer> arr = new ArrayList<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
            if (count.get(num) == 1) {
                arr.add(num);
            }
        }

        int i = 0;
        for (int num : arr) {
            nums[i++] = num;
            count.put(num, count.get(num) - 1);
            if (count.get(num) >= 1) {
                nums[i++] = num;
                count.put(num, count.get(num) - 1);
            }
        }
        return i;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        unordered_map<int, int> count;
        vector<int> arr;
        for (int& num : nums) {
            count[num]++;
            if (count[num] == 1) {
                arr.push_back(num);
            }
        }

        int i = 0;
        for (auto& num : arr) {
            int& cnt = count[num];
            nums[i++] = num;
            cnt--;
            if (cnt >= 1) {
                nums[i++] = num;
                cnt--;
            }
        }
        return i;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let i = 0;
        for (const [num, cnt] of count) {
            nums[i++] = num;
            count.set(num, cnt - 1);
            if (count.get(num) >= 1) {
                nums[i++] = num;
                count.set(num, cnt - 1);
            }
        }
        return i;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        var count = new Dictionary<int, int>();
        var arr = new List<int>();
        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
                arr.Add(num);
            }
            count[num]++;
        }

        int i = 0;
        foreach (int num in arr) {
            nums[i++] = num;
            count[num]--;
            if (count[num] >= 1) {
                nums[i++] = num;
                count[num]--;
            }
        }
        return i;
    }
}
```

```go
func removeDuplicates(nums []int) int {
    count := make(map[int]int)
    var arr []int
    for _, num := range nums {
        if count[num] == 0 {
            arr = append(arr, num)
        }
        count[num]++
    }

    i := 0
    for _, num := range arr {
        nums[i] = num
        i++
        count[num]--
        if count[num] >= 1 {
            nums[i] = num
            i++
            count[num]--
        }
    }
    return i
}
```

```kotlin
class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        val count = linkedMapOf<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        var i = 0
        for ((num, cnt) in count) {
            nums[i++] = num
            count[num] = cnt - 1
            if (count[num]!! >= 1) {
                nums[i++] = num
                count[num] = cnt - 1
            }
        }
        return i
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        var count = [Int: Int]()
        var arr = [Int]()
        for num in nums {
            if count[num] == nil {
                arr.append(num)
            }
            count[num, default: 0] += 1
        }

        var i = 0
        for num in arr {
            nums[i] = num
            i += 1
            count[num]! -= 1
            if count[num]! >= 1 {
                nums[i] = num
                i += 1
                count[num]! -= 1
            }
        }
        return i
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Two Pointers

### Intuition

We process groups of consecutive duplicates together. For each group, we write at most two copies to the result portion of the array. The left pointer tracks where to write, and the right pointer scans through the array finding groups.

### Algorithm

1. Initialize left and right pointers at 0.
2. For each group of duplicates, count how many there are by advancing `r`.
3. Write `min(2, count)` copies of the element starting at position `l`.
4. Advance `l` accordingly and move to the next group.
5. Return `l` as the new length.

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        l, r = 0, 0

        while r < len(nums):
            count = 1
            while r + 1 < len(nums) and nums[r] == nums[r + 1]:
                r += 1
                count += 1

            for i in range(min(2, count)):
                nums[l] = nums[r]
                l += 1
            r += 1

        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int l = 0, r = 0;

        while (r < nums.length) {
            int count = 1;
            while (r + 1 < nums.length && nums[r] == nums[r + 1]) {
                r++;
                count++;
            }

            for (int i = 0; i < Math.min(2, count); i++) {
                nums[l] = nums[r];
                l++;
            }
            r++;
        }

        return l;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int l = 0, r = 0;

        while (r < nums.size()) {
            int count = 1;
            while (r + 1 < nums.size() && nums[r] == nums[r + 1]) {
                r++;
                count++;
            }

            for (int i = 0; i < min(2, count); i++) {
                nums[l] = nums[r];
                l++;
            }
            r++;
        }

        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        let l = 0,
            r = 0;

        while (r < nums.length) {
            let count = 1;
            while (r + 1 < nums.length && nums[r] === nums[r + 1]) {
                r++;
                count++;
            }

            for (let i = 0; i < Math.min(2, count); i++) {
                nums[l] = nums[r];
                l++;
            }
            r++;
        }

        return l;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int l = 0, r = 0;

        while (r < nums.Length) {
            int count = 1;
            while (r + 1 < nums.Length && nums[r] == nums[r + 1]) {
                r++;
                count++;
            }

            for (int i = 0; i < Math.Min(2, count); i++) {
                nums[l] = nums[r];
                l++;
            }
            r++;
        }

        return l;
    }
}
```

```go
func removeDuplicates(nums []int) int {
    l, r := 0, 0

    for r < len(nums) {
        count := 1
        for r+1 < len(nums) && nums[r] == nums[r+1] {
            r++
            count++
        }

        for i := 0; i < min(2, count); i++ {
            nums[l] = nums[r]
            l++
        }
        r++
    }

    return l
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        var l = 0
        var r = 0

        while (r < nums.size) {
            var count = 1
            while (r + 1 < nums.size && nums[r] == nums[r + 1]) {
                r++
                count++
            }

            for (i in 0 until minOf(2, count)) {
                nums[l] = nums[r]
                l++
            }
            r++
        }

        return l
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        var l = 0, r = 0

        while r < nums.count {
            var count = 1
            while r + 1 < nums.count && nums[r] == nums[r + 1] {
                r += 1
                count += 1
            }

            for _ in 0..<min(2, count) {
                nums[l] = nums[r]
                l += 1
            }
            r += 1
        }

        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Two Pointers (Optimal)

### Intuition

The cleanest approach uses a single condition: we only write an element if the write position is less than 2 (first two elements always go through) OR the current element differs from the element two positions back in the result. This automatically limits each value to at most two occurrences.

### Algorithm

1. Initialize the write pointer `l` at 0.
2. Iterate through each element in the array.
3. If `l < 2` or the current element differs from `nums[l - 2]`, write it at position `l` and increment `l`.
4. Return `l` as the new length.

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        l = 0
        for num in nums:
            if l < 2 or num != nums[l - 2]:
                nums[l] = num
                l += 1
        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int l = 0;
        for (int num : nums) {
            if (l < 2 || num != nums[l - 2]) {
                nums[l] = num;
                l++;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int l = 0;
        for (int num : nums) {
            if (l < 2 || num != nums[l - 2]) {
                nums[l] = num;
                l++;
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        let l = 0;
        for (let num of nums) {
            if (l < 2 || num !== nums[l - 2]) {
                nums[l] = num;
                l++;
            }
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int l = 0;
        foreach (int num in nums) {
            if (l < 2 || num != nums[l - 2]) {
                nums[l] = num;
                l++;
            }
        }
        return l;
    }
}
```

```go
func removeDuplicates(nums []int) int {
    l := 0
    for _, num := range nums {
        if l < 2 || num != nums[l-2] {
            nums[l] = num
            l++
        }
    }
    return l
}
```

```kotlin
class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        var l = 0
        for (num in nums) {
            if (l < 2 || num != nums[l - 2]) {
                nums[l] = num
                l++
            }
        }
        return l
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        var l = 0
        for num in nums {
            if l < 2 || num != nums[l - 2] {
                nums[l] = num
                l += 1
            }
        }
        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
