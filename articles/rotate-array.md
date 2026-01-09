## 1. Brute Force

### Intuition

The simplest way to rotate an array by `k` positions is to perform `k` single rotations. In each rotation, we save the last element, shift every element one position to the right, and place the saved element at the front. This mimics the physical act of rotating items in a line. While straightforward, this approach is slow because we repeat the entire shift process `k` times.

### Algorithm

1. Compute `k = k % n` to handle cases where `k` is larger than the array length.
2. Repeat `k` times:
   - Store the last element in a temporary variable.
   - Shift all elements one position to the right.
   - Place the saved element at index `0`.

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n
        while k:
            tmp = nums[n - 1]
            for i in range(n - 1, 0, -1):
                nums[i] = nums[i - 1]
            nums[0] = tmp
            k -= 1
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        while (k > 0) {
            int tmp = nums[n - 1];
            for (int i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        while (k > 0) {
            int tmp = nums[n - 1];
            for (int i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        k %= n;
        while (k > 0) {
            const tmp = nums[n - 1];
            for (let i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;

        while (k > 0) {
            int tmp = nums[n - 1];
            for (int i = n - 1; i > 0; i--) {
                nums[i] = nums[i - 1];
            }
            nums[0] = tmp;
            k--;
        }
    }
}
```

```go
func rotate(nums []int, k int) {
    n := len(nums)
    k %= n
    for k > 0 {
        tmp := nums[n-1]
        for i := n - 1; i > 0; i-- {
            nums[i] = nums[i-1]
        }
        nums[0] = tmp
        k--
    }
}
```

```kotlin
class Solution {
    fun rotate(nums: IntArray, k: Int) {
        val n = nums.size
        var rotations = k % n
        while (rotations > 0) {
            val tmp = nums[n - 1]
            for (i in n - 1 downTo 1) {
                nums[i] = nums[i - 1]
            }
            nums[0] = tmp
            rotations--
        }
    }
}
```

```swift
class Solution {
    func rotate(_ nums: inout [Int], _ k: Int) {
        let n = nums.count
        var rotations = k % n
        while rotations > 0 {
            let tmp = nums[n - 1]
            for i in stride(from: n - 1, to: 0, by: -1) {
                nums[i] = nums[i - 1]
            }
            nums[0] = tmp
            rotations -= 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(1)$ extra space.

---

## 2. Extra Space

### Intuition

Instead of repeatedly shifting elements, we can directly compute the final position of each element. If an element is at index `i`, after rotation it will be at index `(i + k) % n`. By using a temporary array to store the rotated result, we can place each element in its correct position in a single pass, then copy everything back.

### Algorithm

1. Create a temporary array `tmp` of the same size as `nums`.
2. For each index `i`, place `nums[i]` at position `(i + k) % n` in `tmp`.
3. Copy all elements from `tmp` back into `nums`.

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        tmp = [0] * n
        for i in range(n):
            tmp[(i + k) % n] = nums[i]

        nums[:] = tmp
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int[] tmp = new int[n];
        for (int i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }
        for (int i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> tmp(n);
        for (int i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }
        for (int i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        const tmp = new Array(n);
        for (let i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }
        for (let i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        int[] tmp = new int[n];

        for (int i = 0; i < n; i++) {
            tmp[(i + k) % n] = nums[i];
        }

        for (int i = 0; i < n; i++) {
            nums[i] = tmp[i];
        }
    }
}
```

```go
func rotate(nums []int, k int) {
    n := len(nums)
    tmp := make([]int, n)
    for i := 0; i < n; i++ {
        tmp[(i+k)%n] = nums[i]
    }
    for i := 0; i < n; i++ {
        nums[i] = tmp[i]
    }
}
```

```kotlin
class Solution {
    fun rotate(nums: IntArray, k: Int) {
        val n = nums.size
        val tmp = IntArray(n)
        for (i in 0 until n) {
            tmp[(i + k) % n] = nums[i]
        }
        for (i in 0 until n) {
            nums[i] = tmp[i]
        }
    }
}
```

```swift
class Solution {
    func rotate(_ nums: inout [Int], _ k: Int) {
        let n = nums.count
        var tmp = [Int](repeating: 0, count: n)
        for i in 0..<n {
            tmp[(i + k) % n] = nums[i]
        }
        for i in 0..<n {
            nums[i] = tmp[i]
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ extra space.

---

## 3. Cyclic Traversal

### Intuition

We can rotate in-place by following cycles. Starting from any position, we move the element to its destination, then move the displaced element to its destination, and so on until we return to the starting position. If the cycle doesn't cover all elements (which happens when `n` and `k` share a common divisor), we start a new cycle from the next position. This ensures every element is moved exactly once.

### Algorithm

1. Compute `k = k % n` and initialize a counter for how many elements have been placed.
2. Start from index `0`. For each starting index:
   - Save the element at the current position.
   - Move to the next position `(current + k) % n`, swap the saved element with the element there, and repeat.
   - Stop when we return to the starting index.
3. If not all elements are placed, increment the starting index and repeat.
4. Continue until all `n` elements have been moved.

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n
        count = start = 0

        while count < n:
            current = start
            prev = nums[start]
            while True:
                next_idx = (current + k) % n
                nums[next_idx], prev = prev, nums[next_idx]
                current = next_idx
                count += 1

                if start == current:
                    break
            start += 1
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        int count = 0;

        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];
            do {
                int nextIdx = (current + k) % n;
                int temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start != current);
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        int count = 0;

        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];
            do {
                int nextIdx = (current + k) % n;
                int temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start != current);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        k %= n;
        let count = 0;

        for (let start = 0; count < n; start++) {
            let current = start;
            let prev = nums[start];
            do {
                const nextIdx = (current + k) % n;
                const temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start !== current);
        }
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;
        int count = 0;

        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];

            do {
                int nextIdx = (current + k) % n;
                int temp = nums[nextIdx];
                nums[nextIdx] = prev;
                prev = temp;
                current = nextIdx;
                count++;
            } while (start != current);
        }
    }
}
```

```go
func rotate(nums []int, k int) {
    n := len(nums)
    k %= n
    count := 0

    for start := 0; count < n; start++ {
        current := start
        prev := nums[start]
        for {
            nextIdx := (current + k) % n
            temp := nums[nextIdx]
            nums[nextIdx] = prev
            prev = temp
            current = nextIdx
            count++
            if start == current {
                break
            }
        }
    }
}
```

```kotlin
class Solution {
    fun rotate(nums: IntArray, k: Int) {
        val n = nums.size
        val kMod = k % n
        var count = 0

        var start = 0
        while (count < n) {
            var current = start
            var prev = nums[start]
            do {
                val nextIdx = (current + kMod) % n
                val temp = nums[nextIdx]
                nums[nextIdx] = prev
                prev = temp
                current = nextIdx
                count++
            } while (start != current)
            start++
        }
    }
}
```

```swift
class Solution {
    func rotate(_ nums: inout [Int], _ k: Int) {
        let n = nums.count
        let kMod = k % n
        var count = 0

        var start = 0
        while count < n {
            var current = start
            var prev = nums[start]
            repeat {
                let nextIdx = (current + kMod) % n
                let temp = nums[nextIdx]
                nums[nextIdx] = prev
                prev = temp
                current = nextIdx
                count += 1
            } while start != current
            start += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Using Reverse

### Intuition

A clever observation: rotating an array by `k` is equivalent to moving the last `k` elements to the front. We can achieve this with three reversals. First, reverse the entire array. Now the last `k` elements are at the front, but in reverse order. Reverse the first `k` elements to fix their order. Finally, reverse the remaining elements to restore their original order.

### Algorithm

1. Compute `k = k % n`.
2. Reverse the entire array from index `0` to `n - 1`.
3. Reverse the first `k` elements (from index `0` to `k - 1`).
4. Reverse the remaining elements (from index `k` to `n - 1`).

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n

        def reverse(l: int, r: int) -> None:
            while l < r:
                nums[l], nums[r] = nums[r], nums[l]
                l, r = l + 1, r - 1

        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;

        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int temp = nums[l];
            nums[l] = nums[r];
            nums[r] = temp;
            l++;
            r--;
        }
    }
}
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;

        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

private:
    void reverse(vector<int>& nums, int l, int r) {
        while (l < r) {
            swap(nums[l], nums[r]);
            l++;
            r--;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        const n = nums.length;
        k %= n;

        const reverse = (l, r) => {
            while (l < r) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
                r--;
            }
        };

        reverse(0, n - 1);
        reverse(0, k - 1);
        reverse(k, n - 1);
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;

        Reverse(nums, 0, n - 1);
        Reverse(nums, 0, k - 1);
        Reverse(nums, k, n - 1);
    }

    private void Reverse(int[] nums, int left, int right) {
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
}
```

```go
func rotate(nums []int, k int) {
    n := len(nums)
    k %= n

    reverse := func(l, r int) {
        for l < r {
            nums[l], nums[r] = nums[r], nums[l]
            l++
            r--
        }
    }

    reverse(0, n-1)
    reverse(0, k-1)
    reverse(k, n-1)
}
```

```kotlin
class Solution {
    fun rotate(nums: IntArray, k: Int) {
        val n = nums.size
        val kMod = k % n

        fun reverse(l: Int, r: Int) {
            var left = l
            var right = r
            while (left < right) {
                val temp = nums[left]
                nums[left] = nums[right]
                nums[right] = temp
                left++
                right--
            }
        }

        reverse(0, n - 1)
        reverse(0, kMod - 1)
        reverse(kMod, n - 1)
    }
}
```

```swift
class Solution {
    func rotate(_ nums: inout [Int], _ k: Int) {
        let n = nums.count
        let kMod = k % n

        func reverse(_ l: Int, _ r: Int) {
            var left = l, right = r
            while left < right {
                let temp = nums[left]
                nums[left] = nums[right]
                nums[right] = temp
                left += 1
                right -= 1
            }
        }

        reverse(0, n - 1)
        reverse(0, kMod - 1)
        reverse(kMod, n - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. One Liner

### Intuition

Many languages provide built-in ways to slice and concatenate arrays. We can simply take the last `k` elements and prepend them to the rest of the array. This leverages language features to express the rotation concisely, though under the hood it may use extra space.

### Algorithm

1. Compute the effective rotation `k % n`.
2. Slice the array into two parts: the last `k` elements and the first `n - k` elements.
3. Concatenate them in reverse order and assign back to the original array.

::tabs-start

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        nums[:] = nums[-k % len(nums):] + nums[:-k % len(nums)]
```

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int[] rotated = Arrays.copyOfRange(nums, n - k % n, n);
        System.arraycopy(nums, 0, nums, k % n, n - k % n);
        System.arraycopy(rotated, 0, nums, 0, rotated.length);
    }
}
```

```cpp

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        std::rotate(nums.begin(), nums.end() - (k % nums.size()), nums.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    rotate(nums, k) {
        nums.splice(0, 0, ...nums.splice(nums.length - (k % nums.length)));
    }
}
```

```csharp
public class Solution {
    public void Rotate(int[] nums, int k) {
        int n = nums.Length;
        k %= n;

        int[] rotated = new int[n];
        Array.Copy(nums, n - k, rotated, 0, k);
        Array.Copy(nums, 0, rotated, k, n - k);
        Array.Copy(rotated, nums, n);
    }
}
```

```go
func rotate(nums []int, k int) {
    n := len(nums)
    k %= n
    rotated := append(nums[n-k:], nums[:n-k]...)
    copy(nums, rotated)
}
```

```kotlin
class Solution {
    fun rotate(nums: IntArray, k: Int) {
        val n = nums.size
        val kMod = k % n
        val rotated = nums.takeLast(kMod) + nums.dropLast(kMod)
        for (i in nums.indices) {
            nums[i] = rotated[i]
        }
    }
}
```

```swift
class Solution {
    func rotate(_ nums: inout [Int], _ k: Int) {
        let n = nums.count
        let kMod = k % n
        nums = Array(nums.suffix(kMod)) + Array(nums.prefix(n - kMod))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.
