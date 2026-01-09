## 1. Brute Force

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        missing = 1
        while True:
            flag = True
            for num in nums:
                if missing == num:
                    flag = False
                    break

            if flag:
                return missing
            missing += 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int missing = 1;
        while (true) {
            boolean flag = true;
            for (int num : nums) {
                if (missing == num) {
                    flag = false;
                    break;
                }
            }
            if (flag) return missing;
            missing++;
        }
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int missing = 1;
        while (true) {
            bool flag = true;
            for (int& num : nums) {
                if (missing == num) {
                    flag = false;
                    break;
                }
            }
            if (flag) return missing;
            missing++;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        let missing = 1;
        while (true) {
            let flag = true;
            for (let num of nums) {
                if (missing === num) {
                    flag = false;
                    break;
                }
            }
            if (flag) return missing;
            missing++;
        }
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int missing = 1;

        while (true) {
            bool found = false;

            foreach (int num in nums) {
                if (num == missing) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                return missing;
            }

            missing++;
        }
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    missing := 1
    for {
        flag := true
        for _, num := range nums {
            if missing == num {
                flag = false
                break
            }
        }
        if flag {
            return missing
        }
        missing++
    }
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        var missing = 1
        while (true) {
            var flag = true
            for (num in nums) {
                if (missing == num) {
                    flag = false
                    break
                }
            }
            if (flag) return missing
            missing++
        }
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        var missing = 1
        while true {
            var flag = true
            for num in nums {
                if missing == num {
                    flag = false
                    break
                }
            }
            if flag {
                return missing
            }
            missing += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Boolean Array

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        n = len(nums)
        seen = [False] * n
        for num in nums:
            if num > 0 and num <= n:
                seen[num - 1] = True

        for num in range(1, n + 1):
            if not seen[num - 1]:
                return num

        return n + 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        boolean[] seen = new boolean[n];

        for (int num : nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (int i = 0; i < n; i++) {
            if (!seen[i]) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        vector<bool> seen(n, false);

        for (int num : nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (int i = 0; i < n; i++) {
            if (!seen[i]) {
                return i + 1;
            }
        }

        return n + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        const n = nums.length;
        const seen = new Array(n).fill(false);

        for (const num of nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (let i = 0; i < n; i++) {
            if (!seen[i]) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int n = nums.Length;
        bool[] seen = new bool[n];

        foreach (int num in nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (int num = 1; num <= n; num++) {
            if (!seen[num - 1]) {
                return num;
            }
        }

        return n + 1;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    n := len(nums)
    seen := make([]bool, n)

    for _, num := range nums {
        if num > 0 && num <= n {
            seen[num-1] = true
        }
    }

    for i := 0; i < n; i++ {
        if !seen[i] {
            return i + 1
        }
    }

    return n + 1
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        val n = nums.size
        val seen = BooleanArray(n)

        for (num in nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true
            }
        }

        for (i in 0 until n) {
            if (!seen[i]) {
                return i + 1
            }
        }

        return n + 1
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        let n = nums.count
        var seen = [Bool](repeating: false, count: n)

        for num in nums {
            if num > 0 && num <= n {
                seen[num - 1] = true
            }
        }

        for i in 0..<n {
            if !seen[i] {
                return i + 1
            }
        }

        return n + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sorting

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        nums.sort()
        missing = 1
        for num in nums:
            if num > 0 and missing == num:
                missing += 1
        return missing
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        Arrays.sort(nums);
        int missing = 1;
        for (int num : nums) {
            if (num > 0 && missing == num) {
                missing++;
            }
        }
        return missing;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int missing = 1;
        for (int num : nums) {
            if (num > 0 && missing == num) {
                missing++;
            }
        }
        return missing;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        nums.sort((a, b) => a - b);
        let missing = 1;
        for (const num of nums) {
            if (num > 0 && missing === num) {
                missing++;
            }
        }
        return missing;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        Array.Sort(nums);
        int missing = 1;

        foreach (int num in nums) {
            if (num > 0 && num == missing) {
                missing++;
            }
        }

        return missing;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    sort.Ints(nums)
    missing := 1
    for _, num := range nums {
        if num > 0 && missing == num {
            missing++
        }
    }
    return missing
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        nums.sort()
        var missing = 1
        for (num in nums) {
            if (num > 0 && missing == num) {
                missing++
            }
        }
        return missing
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        let sorted = nums.sorted()
        var missing = 1
        for num in sorted {
            if num > 0 && missing == num {
                missing += 1
            }
        }
        return missing
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Negative Marking

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        for i in range(len(nums)):
            if nums[i] < 0:
                nums[i] = 0

        for i in range(len(nums)):
            val = abs(nums[i])
            if 1 <= val <= len(nums):
                if nums[val - 1] > 0:
                    nums[val - 1] *= -1
                elif nums[val - 1] == 0:
                    nums[val - 1] = -1 * (len(nums) + 1)

        for i in range(1, len(nums) + 1):
            if nums[i - 1] >= 0:
                return i

        return len(nums) + 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (int i = 0; i < n; i++) {
            int val = Math.abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] == 0) {
                    nums[val - 1] = -1 * (n + 1);
                }
            }
        }

        for (int i = 1; i <= n; i++) {
            if (nums[i - 1] >= 0) {
                return i;
            }
        }

        return n + 1;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (int i = 0; i < n; i++) {
            int val = abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] == 0) {
                    nums[val - 1] = -1 * (n + 1);
                }
            }
        }

        for (int i = 1; i <= n; i++) {
            if (nums[i - 1] >= 0) {
                return i;
            }
        }

        return n + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (let i = 0; i < n; i++) {
            const val = Math.abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] === 0) {
                    nums[val - 1] = -1 * (n + 1);
                }
            }
        }

        for (let i = 1; i <= n; i++) {
            if (nums[i - 1] >= 0) {
                return i;
            }
        }

        return n + 1;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int n = nums.Length;

        for (int i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (int i = 0; i < n; i++) {
            int val = Math.Abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] == 0) {
                    nums[val - 1] = -(n + 1);
                }
            }
        }

        for (int i = 0; i < n; i++) {
            if (nums[i] >= 0) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    n := len(nums)

    for i := 0; i < n; i++ {
        if nums[i] < 0 {
            nums[i] = 0
        }
    }

    for i := 0; i < n; i++ {
        val := nums[i]
        if val < 0 {
            val = -val
        }
        if val >= 1 && val <= n {
            if nums[val-1] > 0 {
                nums[val-1] *= -1
            } else if nums[val-1] == 0 {
                nums[val-1] = -(n + 1)
            }
        }
    }

    for i := 0; i < n; i++ {
        if nums[i] >= 0 {
            return i + 1
        }
    }

    return n + 1
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        val n = nums.size

        for (i in 0 until n) {
            if (nums[i] < 0) {
                nums[i] = 0
            }
        }

        for (i in 0 until n) {
            val value = kotlin.math.abs(nums[i])
            if (value in 1..n) {
                if (nums[value - 1] > 0) {
                    nums[value - 1] *= -1
                } else if (nums[value - 1] == 0) {
                    nums[value - 1] = -(n + 1)
                }
            }
        }

        for (i in 0 until n) {
            if (nums[i] >= 0) {
                return i + 1
            }
        }

        return n + 1
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        var nums = nums
        let n = nums.count

        for i in 0..<n {
            if nums[i] < 0 {
                nums[i] = 0
            }
        }

        for i in 0..<n {
            let val = abs(nums[i])
            if val >= 1 && val <= n {
                if nums[val - 1] > 0 {
                    nums[val - 1] *= -1
                } else if nums[val - 1] == 0 {
                    nums[val - 1] = -(n + 1)
                }
            }
        }

        for i in 0..<n {
            if nums[i] >= 0 {
                return i + 1
            }
        }

        return n + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Cycle Sort

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        n = len(nums)
        i = 0
        while i < n:
            if nums[i] <= 0 or nums[i] > n:
                i += 1
                continue

            index = nums[i] - 1
            if nums[i] != nums[index]:
                nums[i], nums[index] = nums[index], nums[i]
            else:
                i += 1

        for i in range(n):
            if nums[i] != i + 1:
                return i + 1

        return n + 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        int i = 0;

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }
            int index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                int temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
            } else {
                i++;
            }
        }

        for (i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        int i = 0;

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }
            int index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                swap(nums[i], nums[index]);
            } else {
                i++;
            }
        }

        for (i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        let n = nums.length;
        let i = 0;
        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }
            let index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                [nums[i], nums[index]] = [nums[index], nums[i]];
            } else {
                i++;
            }
        }

        for (let i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int n = nums.Length;
        int i = 0;

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }

            int index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                int temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
            } else {
                i++;
            }
        }

        for (i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    n := len(nums)
    i := 0

    for i < n {
        if nums[i] <= 0 || nums[i] > n {
            i++
            continue
        }

        index := nums[i] - 1
        if nums[i] != nums[index] {
            nums[i], nums[index] = nums[index], nums[i]
        } else {
            i++
        }
    }

    for i := 0; i < n; i++ {
        if nums[i] != i+1 {
            return i + 1
        }
    }

    return n + 1
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        val n = nums.size
        var i = 0

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++
                continue
            }

            val index = nums[i] - 1
            if (nums[i] != nums[index]) {
                val temp = nums[i]
                nums[i] = nums[index]
                nums[index] = temp
            } else {
                i++
            }
        }

        for (i in 0 until n) {
            if (nums[i] != i + 1) {
                return i + 1
            }
        }

        return n + 1
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        var nums = nums
        let n = nums.count
        var i = 0

        while i < n {
            if nums[i] <= 0 || nums[i] > n {
                i += 1
                continue
            }

            let index = nums[i] - 1
            if nums[i] != nums[index] {
                nums.swapAt(i, index)
            } else {
                i += 1
            }
        }

        for i in 0..<n {
            if nums[i] != i + 1 {
                return i + 1
            }
        }

        return n + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
