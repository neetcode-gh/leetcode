## 1. Brute Force

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
