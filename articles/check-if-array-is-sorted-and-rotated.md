## 1. Brute Force

### Intuition

A sorted and rotated array can be thought of as taking a sorted array and moving some elements from the end to the beginning. For example, `[3,4,5,1,2]` is `[1,2,3,4,5]` rotated. We can verify this by sorting the array and checking if our original array matches some rotation of the sorted version.

### Algorithm

1. Create a sorted copy of the input array.
2. Try every possible rotation (`0` to `n-1` positions).
3. For each rotation amount `i`, compare the original array with the sorted array rotated by `i` positions.
4. To compare, check elements from position `n-i` to `n-1` of the sorted array against the beginning of the original, then elements from position `0` to `n-i-1` against the rest.
5. If any rotation matches the original array, return `true`.
6. If no rotation matches, return `false`.

::tabs-start

```python
class Solution:
    def check(self, nums: List[int]) -> bool:
        sortedNums = sorted(nums)
        arr = []

        for i in range(len(nums)):
            arr.insert(0, sortedNums.pop())
            if nums == arr + sortedNums:
                return True

        return False
```

```java
public class Solution {
    public boolean check(int[] nums) {
        int n = nums.length;
        int[] sortedNums = nums.clone();
        Arrays.sort(sortedNums);

        for (int i = 0; i < n; i++) {
            boolean match = true;
            int idx = 0;
            for (int j = n - i; j < n && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx += 1;
            }

            for (int j = 0; j < n - i && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx += 1;
            }

            if (match) return true;
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int n = nums.size();
        vector<int> sortedNums = nums;
        sort(sortedNums.begin(), sortedNums.end());

        for (int i = 0; i < n; i++) {
            bool match = true;
            int idx = 0;
            for (int j = n - i; j < n && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            for (int j = 0; j < n - i && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            if (match) return true;
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    check(nums) {
        const n = nums.length;
        const sortedNums = [...nums].sort((a, b) => a - b);

        for (let i = 0; i < n; i++) {
            let match = true;
            let idx = 0;

            for (let j = n - i; j < n && match; j++) {
                if (nums[idx] !== sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            for (let j = 0; j < n - i && match; j++) {
                if (nums[idx] !== sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            if (match) return true;
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool Check(int[] nums) {
        int n = nums.Length;
        int[] sortedNums = (int[])nums.Clone();
        Array.Sort(sortedNums);

        for (int i = 0; i < n; i++) {
            bool match = true;
            int idx = 0;

            for (int j = n - i; j < n && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            for (int j = 0; j < n - i && match; j++) {
                if (nums[idx] != sortedNums[j]) {
                    match = false;
                }
                idx++;
            }

            if (match) return true;
        }

        return false;
    }
}
```

```go
func check(nums []int) bool {
    n := len(nums)
    sortedNums := make([]int, n)
    copy(sortedNums, nums)
    sort.Ints(sortedNums)

    for i := 0; i < n; i++ {
        match := true
        idx := 0

        for j := n - i; j < n && match; j++ {
            if nums[idx] != sortedNums[j] {
                match = false
            }
            idx++
        }

        for j := 0; j < n-i && match; j++ {
            if nums[idx] != sortedNums[j] {
                match = false
            }
            idx++
        }

        if match {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun check(nums: IntArray): Boolean {
        val n = nums.size
        val sortedNums = nums.clone()
        sortedNums.sort()

        for (i in 0 until n) {
            var match = true
            var idx = 0

            var j = n - i
            while (j < n && match) {
                if (nums[idx] != sortedNums[j]) {
                    match = false
                }
                idx++
                j++
            }

            j = 0
            while (j < n - i && match) {
                if (nums[idx] != sortedNums[j]) {
                    match = false
                }
                idx++
                j++
            }

            if (match) return true
        }

        return false
    }
}
```

```swift
class Solution {
    func check(_ nums: [Int]) -> Bool {
        let n = nums.count
        let sortedNums = nums.sorted()

        for i in 0..<n {
            var match = true
            var idx = 0

            var j = n - i
            while j < n && match {
                if nums[idx] != sortedNums[j] {
                    match = false
                }
                idx += 1
                j += 1
            }

            j = 0
            while j < n - i && match {
                if nums[idx] != sortedNums[j] {
                    match = false
                }
                idx += 1
                j += 1
            }

            if match { return true }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Sliding Window

### Intuition

If we imagine the array as circular (the last element connects back to the first), a valid sorted-and-rotated array should have a contiguous segment of length `n` where elements are in non-decreasing order. We can simulate this circular behavior by conceptually doubling the array and looking for `n` consecutive non-decreasing elements.

### Algorithm

1. Iterate through indices `1` to `2n-1`, treating the array as circular using modulo operations.
2. Maintain a count of consecutive non-decreasing pairs.
3. If the current element (at index `i % n`) is greater than or equal to the previous element, increment the count.
4. Otherwise, reset the count to `1`.
5. If at any point the count reaches `n`, we found a valid sorted sequence, so return `true`.
6. Handle the edge case where `n` equals `1` by returning `true` at the end.

::tabs-start

```python
class Solution:
    def check(self, nums: List[int]) -> bool:
        N = len(nums)
        count = 1

        for i in range(1, 2 * N):
            if nums[(i - 1) % N] <= nums[i % N]:
                count += 1
            else:
                count = 1
            if count == N:
                return True

        return N == 1
```

```java
public class Solution {
    public boolean check(int[] nums) {
        int N = nums.length;
        int count = 1;

        for (int i = 1; i < 2 * N; i++) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++;
            } else {
                count = 1;
            }
            if (count == N) {
                return true;
            }
        }

        return N == 1;
    }
}
```

```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int N = nums.size();
        int count = 1;

        for (int i = 1; i < 2 * N; i++) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++;
            } else {
                count = 1;
            }
            if (count == N) {
                return true;
            }
        }

        return N == 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    check(nums) {
        const N = nums.length;
        let count = 1;

        for (let i = 1; i < 2 * N; i++) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++;
            } else {
                count = 1;
            }
            if (count === N) {
                return true;
            }
        }

        return N === 1;
    }
}
```

```csharp
public class Solution {
    public bool Check(int[] nums) {
        int N = nums.Length;
        int count = 1;

        for (int i = 1; i < 2 * N; i++) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++;
            } else {
                count = 1;
            }
            if (count == N) {
                return true;
            }
        }

        return N == 1;
    }
}
```

```go
func check(nums []int) bool {
    N := len(nums)
    count := 1

    for i := 1; i < 2*N; i++ {
        if nums[(i-1)%N] <= nums[i%N] {
            count++
        } else {
            count = 1
        }
        if count == N {
            return true
        }
    }

    return N == 1
}
```

```kotlin
class Solution {
    fun check(nums: IntArray): Boolean {
        val N = nums.size
        var count = 1

        for (i in 1 until 2 * N) {
            if (nums[(i - 1) % N] <= nums[i % N]) {
                count++
            } else {
                count = 1
            }
            if (count == N) {
                return true
            }
        }

        return N == 1
    }
}
```

```swift
class Solution {
    func check(_ nums: [Int]) -> Bool {
        let N = nums.count
        var count = 1

        for i in 1..<(2 * N) {
            if nums[(i - 1) % N] <= nums[i % N] {
                count += 1
            } else {
                count = 1
            }
            if count == N {
                return true
            }
        }

        return N == 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Iteration

### Intuition

In a sorted-and-rotated array, there can be at most one "break point" where a larger element is followed by a smaller element. This break point is where the rotation occurred. If we find more than one such break, the array cannot be a valid rotation of a sorted array.

### Algorithm

1. Initialize a counter for the number of break points (where an element is greater than its next element).
2. Iterate through the array, comparing each element with the next one (using modulo to wrap around from the last element to the first).
3. If the current element is greater than the next element, increment the break counter.
4. If the counter exceeds `1` at any point, return `false` immediately.
5. After checking all pairs, return `true` (at most one break was found).

::tabs-start

```python
class Solution:
    def check(self, nums: List[int]) -> bool:
        count, N = 0, len(nums)

        for i in range(N):
            if nums[i] > nums[(i + 1) % N]:
                count += 1
                if count > 1:
                    return False

        return True
```

```java
public class Solution {
    public boolean check(int[] nums) {
        int count = 0, N = nums.length;

        for (int i = 0; i < N; i++) {
            if (nums[i] > nums[(i + 1) % N] && ++count > 1) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int count = 0, N = nums.size();

        for (int i = 0; i < N; i++) {
            if (nums[i] > nums[(i + 1) % N] && ++count > 1) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    check(nums) {
        let count = 0,
            N = nums.length;

        for (let i = 0; i < N; i++) {
            if (nums[i] > nums[(i + 1) % N] && ++count > 1) {
                return false;
            }
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool Check(int[] nums) {
        int count = 0, N = nums.Length;

        for (int i = 0; i < N; i++) {
            if (nums[i] > nums[(i + 1) % N] && ++count > 1) {
                return false;
            }
        }

        return true;
    }
}
```

```go
func check(nums []int) bool {
    count, N := 0, len(nums)

    for i := 0; i < N; i++ {
        if nums[i] > nums[(i+1)%N] {
            count++
            if count > 1 {
                return false
            }
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun check(nums: IntArray): Boolean {
        var count = 0
        val N = nums.size

        for (i in 0 until N) {
            if (nums[i] > nums[(i + 1) % N]) {
                count++
                if (count > 1) {
                    return false
                }
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func check(_ nums: [Int]) -> Bool {
        var count = 0
        let N = nums.count

        for i in 0..<N {
            if nums[i] > nums[(i + 1) % N] {
                count += 1
                if count > 1 {
                    return false
                }
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
