## 1. Brute Force

::tabs-start

```python
class Solution:
    def largestSubarray(self, nums: List[int], k: int) -> List[int]:
        res = nums[:k]
        for i in range(1, len(nums) - k + 1):
            window = nums[i:i + k]
            if window > res:
                res = window
        return res
```

```java
public class Solution {
    public int[] largestSubarray(int[] nums, int k) {
        int[] res = Arrays.copyOfRange(nums, 0, k);
        for (int i = 1; i + k <= nums.length; i++) {
            int[] window = Arrays.copyOfRange(nums, i, i + k);
            if (isLarger(window, res)) {
                res = window;
            }
        }
        return res;
    }

    private boolean isLarger(int[] a, int[] b) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return a[i] > b[i];
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<int> largestSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> res(nums.begin(), nums.begin() + k);
        for (int i = 1; i + k <= n; i++) {
            vector<int> window(nums.begin() + i, nums.begin() + i + k);
            if (window > res) {
                res = window;
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
     * @return {number[]}
     */
    largestSubarray(nums, k) {
        let res = nums.slice(0, k);
        for (let i = 1; i + k <= nums.length; i++) {
            const window = nums.slice(i, i + k);
            if (this.isLarger(window, res)) {
                res = window;
            }
        }
        return res;
    }

    /**
     * @param {number[]} a
     * @param {number[]} b
     * @return {boolean}
     */
    isLarger(a, b) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return a[i] > b[i];
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public int[] LargestSubarray(int[] nums, int k) {
        int[] res = new int[k];
        Array.Copy(nums, 0, res, 0, k);
        for (int i = 1; i + k <= nums.Length; i++) {
            int[] window = new int[k];
            Array.Copy(nums, i, window, 0, k);
            if (IsLarger(window, res)) {
                res = window;
            }
        }
        return res;
    }

    private bool IsLarger(int[] a, int[] b) {
        for (int i = 0; i < a.Length; i++) {
            if (a[i] != b[i]) {
                return a[i] > b[i];
            }
        }
        return false;
    }
}
```

```go
func largestSubarray(nums []int, k int) []int {
    isLarger := func(a, b []int) bool {
        for i := range a {
            if a[i] != b[i] {
                return a[i] > b[i]
            }
        }
        return false
    }

    res := append([]int{}, nums[:k]...)
    for i := 1; i+k <= len(nums); i++ {
        window := append([]int{}, nums[i:i+k]...)
        if isLarger(window, res) {
            res = window
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun largestSubarray(nums: IntArray, k: Int): IntArray {
        var res = nums.copyOfRange(0, k)
        for (i in 1..nums.size - k) {
            val window = nums.copyOfRange(i, i + k)
            if (isLarger(window, res)) {
                res = window
            }
        }
        return res
    }

    private fun isLarger(a: IntArray, b: IntArray): Boolean {
        for (i in a.indices) {
            if (a[i] != b[i]) {
                return a[i] > b[i]
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func largestSubarray(_ nums: [Int], _ k: Int) -> [Int] {
        var res = Array(nums[0..<k])
        var i = 1
        while i + k <= nums.count {
            let window = Array(nums[i..<(i + k)])
            if res.lexicographicallyPrecedes(window) {
                res = window
            }
            i += 1
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn largest_subarray(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut res = nums[..k].to_vec();
        for i in 1..=nums.len() - k {
            let window = nums[i..i + k].to_vec();
            if window > res {
                res = window;
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
     * @return {number[]}
     */
    largestSubarray(nums: number[], k: number): number[] {
        let res = nums.slice(0, k);
        for (let i = 1; i + k <= nums.length; i++) {
            const window = nums.slice(i, i + k);
            if (this.isLarger(window, res)) {
                res = window;
            }
        }
        return res;
    }

    /**
     * @param {number[]} a
     * @param {number[]} b
     * @return {boolean}
     */
    isLarger(a: number[], b: number[]): boolean {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return a[i] > b[i];
            }
        }
        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n - k + 1) * k)$
- Space complexity: $O(k)$

> Where $n$ is the length of the array $nums$ and $k$ is the length of the subarray.

---

## 2. Greedy

::tabs-start

```python
class Solution:
    def largestSubarray(self, nums: List[int], k: int) -> List[int]:
        best = 0
        for i in range(1, len(nums) - k + 1):
            if nums[i] > nums[best]:
                best = i
        return nums[best:best + k]
```

```java
public class Solution {
    public int[] largestSubarray(int[] nums, int k) {
        int best = 0;
        for (int i = 1; i + k <= nums.length; i++) {
            if (nums[i] > nums[best]) {
                best = i;
            }
        }
        return Arrays.copyOfRange(nums, best, best + k);
    }
}
```

```cpp
class Solution {
public:
    vector<int> largestSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        int best = 0;
        for (int i = 1; i + k <= n; i++) {
            if (nums[i] > nums[best]) {
                best = i;
            }
        }
        return vector<int>(nums.begin() + best, nums.begin() + best + k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    largestSubarray(nums, k) {
        let best = 0;
        for (let i = 1; i + k <= nums.length; i++) {
            if (nums[i] > nums[best]) {
                best = i;
            }
        }
        return nums.slice(best, best + k);
    }
}
```

```csharp
public class Solution {
    public int[] LargestSubarray(int[] nums, int k) {
        int best = 0;
        for (int i = 1; i + k <= nums.Length; i++) {
            if (nums[i] > nums[best]) {
                best = i;
            }
        }
        int[] res = new int[k];
        Array.Copy(nums, best, res, 0, k);
        return res;
    }
}
```

```go
func largestSubarray(nums []int, k int) []int {
    best := 0
    for i := 1; i+k <= len(nums); i++ {
        if nums[i] > nums[best] {
            best = i
        }
    }
    return nums[best : best+k]
}
```

```kotlin
class Solution {
    fun largestSubarray(nums: IntArray, k: Int): IntArray {
        var best = 0
        for (i in 1..nums.size - k) {
            if (nums[i] > nums[best]) {
                best = i
            }
        }
        return nums.copyOfRange(best, best + k)
    }
}
```

```swift
class Solution {
    func largestSubarray(_ nums: [Int], _ k: Int) -> [Int] {
        var best = 0
        var i = 1
        while i + k <= nums.count {
            if nums[i] > nums[best] {
                best = i
            }
            i += 1
        }
        return Array(nums[best..<(best + k)])
    }
}
```

```rust
impl Solution {
    pub fn largest_subarray(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut best = 0;
        for i in 1..=nums.len() - k {
            if nums[i] > nums[best] {
                best = i;
            }
        }
        nums[best..best + k].to_vec()
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    largestSubarray(nums: number[], k: number): number[] {
        let best = 0;
        for (let i = 1; i + k <= nums.length; i++) {
            if (nums[i] > nums[best]) {
                best = i;
            }
        }
        return nums.slice(best, best + k);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $nums$.

---

## 3. Greedy (Handling Duplicates)

::tabs-start

```python
class Solution:
    def largestSubarray(self, nums: List[int], k: int) -> List[int]:
        best = 0
        for i in range(1, len(nums) - k + 1):
            d = 0
            while d < k and nums[i + d] == nums[best + d]:
                d += 1
            if d < k and nums[i + d] > nums[best + d]:
                best = i
        return nums[best:best + k]
```

```java
public class Solution {
    public int[] largestSubarray(int[] nums, int k) {
        int best = 0;
        for (int i = 1; i + k <= nums.length; i++) {
            int d = 0;
            while (d < k && nums[i + d] == nums[best + d]) {
                d++;
            }
            if (d < k && nums[i + d] > nums[best + d]) {
                best = i;
            }
        }
        return Arrays.copyOfRange(nums, best, best + k);
    }
}
```

```cpp
class Solution {
public:
    vector<int> largestSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        int best = 0;
        for (int i = 1; i + k <= n; i++) {
            int d = 0;
            while (d < k && nums[i + d] == nums[best + d]) {
                d++;
            }
            if (d < k && nums[i + d] > nums[best + d]) {
                best = i;
            }
        }
        return vector<int>(nums.begin() + best, nums.begin() + best + k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    largestSubarray(nums, k) {
        let best = 0;
        for (let i = 1; i + k <= nums.length; i++) {
            let d = 0;
            while (d < k && nums[i + d] === nums[best + d]) {
                d++;
            }
            if (d < k && nums[i + d] > nums[best + d]) {
                best = i;
            }
        }
        return nums.slice(best, best + k);
    }
}
```

```csharp
public class Solution {
    public int[] LargestSubarray(int[] nums, int k) {
        int best = 0;
        for (int i = 1; i + k <= nums.Length; i++) {
            int d = 0;
            while (d < k && nums[i + d] == nums[best + d]) {
                d++;
            }
            if (d < k && nums[i + d] > nums[best + d]) {
                best = i;
            }
        }
        int[] res = new int[k];
        Array.Copy(nums, best, res, 0, k);
        return res;
    }
}
```

```go
func largestSubarray(nums []int, k int) []int {
    best := 0
    for i := 1; i+k <= len(nums); i++ {
        d := 0
        for d < k && nums[i+d] == nums[best+d] {
            d++
        }
        if d < k && nums[i+d] > nums[best+d] {
            best = i
        }
    }
    return nums[best : best+k]
}
```

```kotlin
class Solution {
    fun largestSubarray(nums: IntArray, k: Int): IntArray {
        var best = 0
        for (i in 1..nums.size - k) {
            var d = 0
            while (d < k && nums[i + d] == nums[best + d]) {
                d++
            }
            if (d < k && nums[i + d] > nums[best + d]) {
                best = i
            }
        }
        return nums.copyOfRange(best, best + k)
    }
}
```

```swift
class Solution {
    func largestSubarray(_ nums: [Int], _ k: Int) -> [Int] {
        var best = 0
        var i = 1
        while i + k <= nums.count {
            var d = 0
            while d < k && nums[i + d] == nums[best + d] {
                d += 1
            }
            if d < k && nums[i + d] > nums[best + d] {
                best = i
            }
            i += 1
        }
        return Array(nums[best..<(best + k)])
    }
}
```

```rust
impl Solution {
    pub fn largest_subarray(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut best = 0;
        for i in 1..=nums.len() - k {
            let mut d = 0;
            while d < k && nums[i + d] == nums[best + d] {
                d += 1;
            }
            if d < k && nums[i + d] > nums[best + d] {
                best = i;
            }
        }
        nums[best..best + k].to_vec()
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    largestSubarray(nums: number[], k: number): number[] {
        let best = 0;
        for (let i = 1; i + k <= nums.length; i++) {
            let d = 0;
            while (d < k && nums[i + d] === nums[best + d]) {
                d++;
            }
            if (d < k && nums[i + d] > nums[best + d]) {
                best = i;
            }
        }
        return nums.slice(best, best + k);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$ in the worst case, $O(n)$ when all values are distinct.
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $nums$ and $k$ is the length of the subarray.
