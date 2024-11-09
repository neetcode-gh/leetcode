## 1. Sorting

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        nums.sort()
        for i in range(len(nums) - 1):
            if nums[i] == nums[i + 1]:
                return nums[i]
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(std::vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        Array.Sort(nums);
        for (int i = 0; i < nums.Length - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    sort.Ints(nums)
    for i := 0; i < len(nums)-1; i++ {
        if nums[i] == nums[i+1] {
            return nums[i]
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        nums.sort()
        for (i in 0 until nums.size - 1) {
            if (nums[i] == nums[i + 1]) {
                return nums[i]
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Hash Set

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        seen = set()
        for num in nums:
            if num in seen:
                return num
            seen.add(num)
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) {
                return num;
            }
            seen.add(num);
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(std::vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.find(num) != seen.end()) {
                return num;
            }
            seen.insert(num);
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let seen = new Set();
        for (let num of nums) {
            if (seen.has(num)) {
                return num;
            }
            seen.add(num);
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        foreach (int num in nums) {
            if (seen.Contains(num)) {
                return num;
            }
            seen.Add(num);
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    seen := make(map[int]struct{})
    for _, num := range nums {
        if _, exists := seen[num]; exists {
            return num
        }
        seen[num] = struct{}{}
    }
    return -1
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val seen = HashSet<Int>()
        for (num in nums) {
            if (num in seen) {
                return num
            }
            seen.add(num)
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Array

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        seen = [0] * len(nums)
        for num in nums:
            if seen[num - 1]:
                return num
            seen[num - 1] = 1
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        int[] seen = new int[nums.length];
        for (int num : nums) {
            if (seen[num - 1] == 1) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        vector<int> seen(nums.size(), 0);
        for (int num : nums) {
            if (seen[num - 1] == 1) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let seen = new Array(nums.length).fill(0);
        for (let num of nums) {
            if (seen[num - 1]) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        int[] seen = new int[nums.Length];
        foreach (int num in nums) {
            if (seen[num - 1] == 1) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    seen := make([]int, len(nums))
    for _, num := range nums {
        if seen[num-1] == 1 {
            return num
        }
        seen[num-1] = 1
    }
    return -1
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val seen = IntArray(nums.size)
        for (num in nums) {
            if (seen[num - 1] == 1) {
                return num
            }
            seen[num - 1] = 1
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Negative Marking

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        for num in nums :
            idx = abs(num) - 1 
            if nums[idx] < 0 :
                return abs(num)
            nums[idx] *= -1
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        for (int num : nums) {
            int idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                return Math.abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        for (int num : nums) {
            int idx = abs(num) - 1;
            if (nums[idx] < 0) {
                return abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        for (let num of nums) {
            let idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                return Math.abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        foreach (int num in nums) {
            int idx = Math.Abs(num) - 1;
            if (nums[idx] < 0) {
                return Math.Abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    for _, num := range nums {
        idx := abs(num) - 1
        if nums[idx] < 0 {
            return abs(num)
        }
        nums[idx] *= -1
    }
    return -1
}

func abs(num int) int {
    if num < 0 {
        return -num
    }
    return num
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        for (num in nums) {
            val idx = Math.abs(num) - 1
            if (nums[idx] < 0) {
                return Math.abs(num)
            }
            nums[idx] *= -1
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 5. Binary Search

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        n = len(nums)
        low, high = 1, n - 1
        while low < high:
            mid = low + (high - low) // 2
            lessOrEqual = sum(1 for num in nums if num <= mid)

            if lessOrEqual <= mid:
                low = mid + 1
            else:
                high = mid

        return low
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        int n = nums.length;
        int low = 1;
        int high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            int lessOrEqual = 0;
            for (int i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int n = nums.size();
        int low = 1, high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            int lessOrEqual = 0;
            for (int i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let n = nums.length;
        let low = 1, high = n - 1;

        while (low < high) {
            let mid = Math.floor(low + (high - low) / 2);
            let lessOrEqual = 0;

            for (let i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        int n = nums.Length;
        int low = 1, high = n - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;
            int lessOrEqual = 0;

            for (int i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

```go
func findDuplicate(nums []int) int {
    n := len(nums)
    low, high := 1, n-1

    for low < high {
        mid := low + (high-low)/2
        lessOrEqual := 0

        for _, num := range nums {
            if num <= mid {
                lessOrEqual++
            }
        }

        if lessOrEqual <= mid {
            low = mid + 1
        } else {
            high = mid
        }
    }

    return low
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val n = nums.size
        var low = 1
        var high = n - 1

        while (low < high) {
            val mid = low + (high - low) / 2
            var lessOrEqual = 0

            for (num in nums) {
                if (num <= mid) {
                    lessOrEqual++
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1
            } else {
                high = mid
            }
        }

        return low
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$

---

## 6. Bit Manipulation

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        for b in range(32):
            x = y = 0
            mask = 1 << b
            for num in nums:
                if num & mask:
                    x += 1
            
            for num in range(1, n):
                if num & mask:
                    y += 1
            
            if x > y:
                res |= mask
        return res
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        int n = nums.length;
        int res = 0;
        for (int b = 0; b < 32; b++) {
            int x = 0, y = 0;
            int mask = 1 << b;
            for (int num : nums) {
                if ((num & mask) != 0) {
                    x++;
                }
            }
            for (int num = 1; num < n; num++) {
                if ((num & mask) != 0) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int n = nums.size();
        int res = 0;
        for (int b = 0; b < 32; b++) {
            int x = 0, y = 0;
            int mask = 1 << b;
            for (int num : nums) {
                if (num & mask) {
                    x++;
                }
            }
            for (int num = 1; num < n; num++) {
                if (num & mask) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
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
    findDuplicate(nums) {
        let n = nums.length;
        let res = 0;
        for (let b = 0; b < 32; b++) {
            let x = 0, y = 0;
            let mask = 1 << b;
            for (let num of nums) {
                if (num & mask) {
                    x++;
                }
            }
            for (let num = 1; num < n; num++) {
                if (num & mask) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(IList<int> nums) {
        int n = nums.Count;
        int res = 0;
        for (int b = 0; b < 32; b++) {
            int x = 0, y = 0;
            int mask = 1 << b;
            foreach (int num in nums) {
                if ((num & mask) != 0) {
                    x++;
                }
            }
            for (int num = 1; num < n; num++) {
                if ((num & mask) != 0) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
}
```

```go
func findDuplicate(nums []int) int {
    n := len(nums)
    res := 0

    for b := 0; b < 32; b++ {
        x, y := 0, 0
        mask := 1 << b

        for _, num := range nums {
            if num&mask != 0 {
                x++
            }
        }

        for num := 1; num < n; num++ {
            if num&mask != 0 {
                y++
            }
        }

        if x > y {
            res |= mask
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val n = nums.size
        var res = 0

        for (b in 0 until 32) {
            var x = 0
            var y = 0
            val mask = 1 shl b

            for (num in nums) {
                if (num and mask != 0) {
                    x++
                }
            }

            for (num in 1 until n) {
                if (num and mask != 0) {
                    y++
                }
            }

            if (x > y) {
                res = res or mask
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(32 * n)$
* Space complexity: $O(1)$

---

## 7. Fast And Slow Pointers

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow, fast = 0, 0
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        slow2 = 0
        while True:
            slow = nums[slow]
            slow2 = nums[slow2]
            if slow == slow2:
                return slow
```

```java
class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) {
                break;
            }
        }

        int slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow == slow2) {
                return slow;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = 0, fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) {
                break;
            }
        }

        int slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow == slow2) {
                return slow;
            }
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
    findDuplicate(nums) {
        let slow = 0;
        let fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow === fast) {
                break;
            }
        }

        let slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow === slow2) {
                return slow;
            }
        }
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        int slow = 0, fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) {
                break;
            }
        }

        int slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow == slow2) {
                return slow;
            }
        }
    }
}
```

```go
func findDuplicate(nums []int) int {
    slow, fast := 0, 0

    for {
        slow = nums[slow]
        fast = nums[nums[fast]]

        if slow == fast {
            break
        }
    }

    slow2 := 0
    for {
        slow = nums[slow]
        slow2 = nums[slow2]

        if slow == slow2 {
            return slow
        }
    }
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        var slow = 0
        var fast = 0

        while (true) {
            slow = nums[slow]
            fast = nums[nums[fast]]

            if (slow == fast) {
                break
            }
        }

        var slow2 = 0
        while (true) {
            slow = nums[slow]
            slow2 = nums[slow2]

            if (slow == slow2) {
                return slow
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$