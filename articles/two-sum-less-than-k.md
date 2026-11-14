## 1. Brute Force

::tabs-start

```python
class Solution:
    def twoSumLessThanK(self, nums: List[int], k: int) -> int:
        res = -1
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                total = nums[i] + nums[j]
                if total < k:
                    res = max(res, total)
        return res
```

```java
public class Solution {
    public int twoSumLessThanK(int[] nums, int k) {
        int res = -1;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int total = nums[i] + nums[j];
                if (total < k) {
                    res = Math.max(res, total);
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
    int twoSumLessThanK(vector<int>& nums, int k) {
        int res = -1;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int total = nums[i] + nums[j];
                if (total < k) {
                    res = max(res, total);
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
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums, k) {
        let res = -1;
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const total = nums[i] + nums[j];
                if (total < k) {
                    res = Math.max(res, total);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int TwoSumLessThanK(int[] nums, int k) {
        int res = -1;
        int n = nums.Length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int total = nums[i] + nums[j];
                if (total < k) {
                    res = Math.Max(res, total);
                }
            }
        }
        return res;
    }
}
```

```go
func twoSumLessThanK(nums []int, k int) int {
    res := -1
    n := len(nums)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            total := nums[i] + nums[j]
            if total < k {
                res = max(res, total)
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun twoSumLessThanK(nums: IntArray, k: Int): Int {
        var res = -1
        val n = nums.size
        for (i in 0 until n) {
            for (j in i + 1 until n) {
                val total = nums[i] + nums[j]
                if (total < k) {
                    res = maxOf(res, total)
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func twoSumLessThanK(_ nums: [Int], _ k: Int) -> Int {
        var res = -1
        let n = nums.count
        for i in 0..<n {
            for j in (i + 1)..<n {
                let total = nums[i] + nums[j]
                if total < k {
                    res = max(res, total)
                }
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn two_sum_less_than_k(nums: Vec<i32>, k: i32) -> i32 {
        let mut res = -1;
        let n = nums.len();
        for i in 0..n {
            for j in i + 1..n {
                let total = nums[i] + nums[j];
                if total < k {
                    res = res.max(total);
                }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums: number[], k: number): number {
        let res = -1;
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const total = nums[i] + nums[j];
                if (total < k) {
                    res = Math.max(res, total);
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Sorting + Binary Search

::tabs-start

```python
class Solution:
    def twoSumLessThanK(self, nums: List[int], k: int) -> int:
        nums.sort()
        res = -1
        n = len(nums)
        for i in range(n):
            target = k - nums[i]
            l, r, j = i + 1, n - 1, -1
            while l <= r:
                m = (l + r) // 2
                if nums[m] < target:
                    j = m
                    l = m + 1
                else:
                    r = m - 1
            if j != -1:
                res = max(res, nums[i] + nums[j])
        return res
```

```java
public class Solution {
    public int twoSumLessThanK(int[] nums, int k) {
        Arrays.sort(nums);
        int res = -1;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            int target = k - nums[i];
            int l = i + 1, r = n - 1, j = -1;
            while (l <= r) {
                int m = l + (r - l) / 2;
                if (nums[m] < target) {
                    j = m;
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            if (j != -1) {
                res = Math.max(res, nums[i] + nums[j]);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int twoSumLessThanK(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int res = -1;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            int target = k - nums[i];
            int l = i + 1, r = n - 1, j = -1;
            while (l <= r) {
                int m = l + (r - l) / 2;
                if (nums[m] < target) {
                    j = m;
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            if (j != -1) {
                res = max(res, nums[i] + nums[j]);
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
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums, k) {
        nums.sort((a, b) => a - b);
        let res = -1;
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            const target = k - nums[i];
            let l = i + 1,
                r = n - 1,
                j = -1;
            while (l <= r) {
                const m = Math.floor((l + r) / 2);
                if (nums[m] < target) {
                    j = m;
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            if (j !== -1) {
                res = Math.max(res, nums[i] + nums[j]);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int TwoSumLessThanK(int[] nums, int k) {
        Array.Sort(nums);
        int res = -1;
        int n = nums.Length;
        for (int i = 0; i < n; i++) {
            int target = k - nums[i];
            int l = i + 1, r = n - 1, j = -1;
            while (l <= r) {
                int m = l + (r - l) / 2;
                if (nums[m] < target) {
                    j = m;
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            if (j != -1) {
                res = Math.Max(res, nums[i] + nums[j]);
            }
        }
        return res;
    }
}
```

```go
func twoSumLessThanK(nums []int, k int) int {
    sort.Ints(nums)
    res := -1
    n := len(nums)
    for i := 0; i < n; i++ {
        target := k - nums[i]
        l, r, j := i+1, n-1, -1
        for l <= r {
            m := l + (r-l)/2
            if nums[m] < target {
                j = m
                l = m + 1
            } else {
                r = m - 1
            }
        }
        if j != -1 {
            res = max(res, nums[i]+nums[j])
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun twoSumLessThanK(nums: IntArray, k: Int): Int {
        nums.sort()
        var res = -1
        val n = nums.size
        for (i in 0 until n) {
            val target = k - nums[i]
            var l = i + 1
            var r = n - 1
            var j = -1
            while (l <= r) {
                val m = l + (r - l) / 2
                if (nums[m] < target) {
                    j = m
                    l = m + 1
                } else {
                    r = m - 1
                }
            }
            if (j != -1) {
                res = maxOf(res, nums[i] + nums[j])
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func twoSumLessThanK(_ nums: [Int], _ k: Int) -> Int {
        let nums = nums.sorted()
        var res = -1
        let n = nums.count
        for i in 0..<n {
            let target = k - nums[i]
            var l = i + 1, r = n - 1, j = -1
            while l <= r {
                let m = l + (r - l) / 2
                if nums[m] < target {
                    j = m
                    l = m + 1
                } else {
                    r = m - 1
                }
            }
            if j != -1 {
                res = max(res, nums[i] + nums[j])
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn two_sum_less_than_k(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums;
        nums.sort();
        let mut res = -1;
        let n = nums.len();
        for i in 0..n {
            let target = k - nums[i];
            let (mut l, mut r, mut j) = (i as i32 + 1, n as i32 - 1, -1);
            while l <= r {
                let m = l + (r - l) / 2;
                if nums[m as usize] < target {
                    j = m;
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            if j != -1 {
                res = res.max(nums[i] + nums[j as usize]);
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums: number[], k: number): number {
        nums.sort((a, b) => a - b);
        let res = -1;
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            const target = k - nums[i];
            let l = i + 1,
                r = n - 1,
                j = -1;
            while (l <= r) {
                const m = Math.floor((l + r) / 2);
                if (nums[m] < target) {
                    j = m;
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            if (j !== -1) {
                res = Math.max(res, nums[i] + nums[j]);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Sorting + Two Pointers

::tabs-start

```python
class Solution:
    def twoSumLessThanK(self, nums: List[int], k: int) -> int:
        nums.sort()
        res = -1
        l, r = 0, len(nums) - 1
        while l < r:
            total = nums[l] + nums[r]
            if total < k:
                res = max(res, total)
                l += 1
            else:
                r -= 1
        return res
```

```java
public class Solution {
    public int twoSumLessThanK(int[] nums, int k) {
        Arrays.sort(nums);
        int res = -1;
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int total = nums[l] + nums[r];
            if (total < k) {
                res = Math.max(res, total);
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int twoSumLessThanK(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int res = -1;
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int total = nums[l] + nums[r];
            if (total < k) {
                res = max(res, total);
                l++;
            } else {
                r--;
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
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums, k) {
        nums.sort((a, b) => a - b);
        let res = -1;
        let l = 0,
            r = nums.length - 1;
        while (l < r) {
            const total = nums[l] + nums[r];
            if (total < k) {
                res = Math.max(res, total);
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int TwoSumLessThanK(int[] nums, int k) {
        Array.Sort(nums);
        int res = -1;
        int l = 0, r = nums.Length - 1;
        while (l < r) {
            int total = nums[l] + nums[r];
            if (total < k) {
                res = Math.Max(res, total);
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
}
```

```go
func twoSumLessThanK(nums []int, k int) int {
    sort.Ints(nums)
    res := -1
    l, r := 0, len(nums)-1
    for l < r {
        total := nums[l] + nums[r]
        if total < k {
            res = max(res, total)
            l++
        } else {
            r--
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun twoSumLessThanK(nums: IntArray, k: Int): Int {
        nums.sort()
        var res = -1
        var l = 0
        var r = nums.size - 1
        while (l < r) {
            val total = nums[l] + nums[r]
            if (total < k) {
                res = maxOf(res, total)
                l++
            } else {
                r--
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func twoSumLessThanK(_ nums: [Int], _ k: Int) -> Int {
        let nums = nums.sorted()
        var res = -1
        var l = 0, r = nums.count - 1
        while l < r {
            let total = nums[l] + nums[r]
            if total < k {
                res = max(res, total)
                l += 1
            } else {
                r -= 1
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn two_sum_less_than_k(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums;
        nums.sort();
        let mut res = -1;
        let (mut l, mut r) = (0, nums.len() - 1);
        while l < r {
            let total = nums[l] + nums[r];
            if total < k {
                res = res.max(total);
                l += 1;
            } else {
                r -= 1;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums: number[], k: number): number {
        nums.sort((a, b) => a - b);
        let res = -1;
        let l = 0,
            r = nums.length - 1;
        while (l < r) {
            const total = nums[l] + nums[r];
            if (total < k) {
                res = Math.max(res, total);
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Counting Sort

::tabs-start

```python
class Solution:
    def twoSumLessThanK(self, nums: List[int], k: int) -> int:
        count = [0] * 1001
        for num in nums:
            count[num] += 1

        res = -1
        lo, hi = 1, 1000
        while lo <= hi:
            if lo + hi >= k or count[hi] == 0:
                hi -= 1
            else:
                if count[lo] > (0 if lo < hi else 1):
                    res = max(res, lo + hi)
                lo += 1
        return res
```

```java
public class Solution {
    public int twoSumLessThanK(int[] nums, int k) {
        int[] count = new int[1001];
        for (int num : nums) {
            count[num]++;
        }

        int res = -1;
        int lo = 1, hi = 1000;
        while (lo <= hi) {
            if (lo + hi >= k || count[hi] == 0) {
                hi--;
            } else {
                if (count[lo] > (lo < hi ? 0 : 1)) {
                    res = Math.max(res, lo + hi);
                }
                lo++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int twoSumLessThanK(vector<int>& nums, int k) {
        vector<int> count(1001, 0);
        for (int num : nums) {
            count[num]++;
        }

        int res = -1;
        int lo = 1, hi = 1000;
        while (lo <= hi) {
            if (lo + hi >= k || count[hi] == 0) {
                hi--;
            } else {
                if (count[lo] > (lo < hi ? 0 : 1)) {
                    res = max(res, lo + hi);
                }
                lo++;
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
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums, k) {
        const count = new Array(1001).fill(0);
        for (const num of nums) {
            count[num]++;
        }

        let res = -1;
        let lo = 1,
            hi = 1000;
        while (lo <= hi) {
            if (lo + hi >= k || count[hi] === 0) {
                hi--;
            } else {
                if (count[lo] > (lo < hi ? 0 : 1)) {
                    res = Math.max(res, lo + hi);
                }
                lo++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int TwoSumLessThanK(int[] nums, int k) {
        int[] count = new int[1001];
        foreach (int num in nums) {
            count[num]++;
        }

        int res = -1;
        int lo = 1, hi = 1000;
        while (lo <= hi) {
            if (lo + hi >= k || count[hi] == 0) {
                hi--;
            } else {
                if (count[lo] > (lo < hi ? 0 : 1)) {
                    res = Math.Max(res, lo + hi);
                }
                lo++;
            }
        }
        return res;
    }
}
```

```go
func twoSumLessThanK(nums []int, k int) int {
    count := make([]int, 1001)
    for _, num := range nums {
        count[num]++
    }

    res := -1
    lo, hi := 1, 1000
    for lo <= hi {
        if lo+hi >= k || count[hi] == 0 {
            hi--
        } else {
            need := 0
            if lo == hi {
                need = 1
            }
            if count[lo] > need {
                res = max(res, lo+hi)
            }
            lo++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun twoSumLessThanK(nums: IntArray, k: Int): Int {
        val count = IntArray(1001)
        for (num in nums) {
            count[num]++
        }

        var res = -1
        var lo = 1
        var hi = 1000
        while (lo <= hi) {
            if (lo + hi >= k || count[hi] == 0) {
                hi--
            } else {
                if (count[lo] > (if (lo < hi) 0 else 1)) {
                    res = maxOf(res, lo + hi)
                }
                lo++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func twoSumLessThanK(_ nums: [Int], _ k: Int) -> Int {
        var count = [Int](repeating: 0, count: 1001)
        for num in nums {
            count[num] += 1
        }

        var res = -1
        var lo = 1, hi = 1000
        while lo <= hi {
            if lo + hi >= k || count[hi] == 0 {
                hi -= 1
            } else {
                if count[lo] > (lo < hi ? 0 : 1) {
                    res = max(res, lo + hi)
                }
                lo += 1
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn two_sum_less_than_k(nums: Vec<i32>, k: i32) -> i32 {
        let mut count = vec![0; 1001];
        for &num in &nums {
            count[num as usize] += 1;
        }

        let mut res = -1;
        let (mut lo, mut hi) = (1usize, 1000usize);
        while lo <= hi {
            if (lo + hi) as i32 >= k || count[hi] == 0 {
                hi -= 1;
            } else {
                let need = if lo < hi { 0 } else { 1 };
                if count[lo] > need {
                    res = res.max((lo + hi) as i32);
                }
                lo += 1;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    twoSumLessThanK(nums: number[], k: number): number {
        const count = new Array(1001).fill(0);
        for (const num of nums) {
            count[num]++;
        }

        let res = -1;
        let lo = 1,
            hi = 1000;
        while (lo <= hi) {
            if (lo + hi >= k || count[hi] === 0) {
                hi--;
            } else {
                if (count[lo] > (lo < hi ? 0 : 1)) {
                    res = Math.max(res, lo + hi);
                }
                lo++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the array $nums$ and $m$ is the range of values in $nums$ ($m = 1000$).
