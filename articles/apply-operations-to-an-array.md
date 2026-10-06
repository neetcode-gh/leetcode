## 1. Simulation (Extra Space)

::tabs-start

```python
class Solution:
    def applyOperations(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n - 1):
            if nums[i] == nums[i + 1]:
                nums[i] *= 2
                nums[i + 1] = 0

        tmp = []
        for num in nums:
            if num != 0:
                tmp.append(num)

        for i in range(n):
            nums[i] = tmp[i] if i < len(tmp) else 0

        return nums
```

```java
public class Solution {
    public int[] applyOperations(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        List<Integer> tmp = new ArrayList<>();
        for (int num : nums) {
            if (num != 0) {
                tmp.add(num);
            }
        }

        for (int i = 0; i < n; i++) {
            nums[i] = i < tmp.size() ? tmp.get(i) : 0;
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> applyOperations(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        vector<int> tmp;
        for (int num : nums) {
            if (num != 0) {
                tmp.push_back(num);
            }
        }

        for (int i = 0; i < n; i++) {
            nums[i] = i < tmp.size() ? tmp[i] : 0;
        }

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums) {
        const n = nums.length;
        for (let i = 0; i < n - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        const tmp = [];
        for (const num of nums) {
            if (num !== 0) {
                tmp.push(num);
            }
        }

        for (let i = 0; i < n; i++) {
            nums[i] = i < tmp.length ? tmp[i] : 0;
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] ApplyOperations(int[] nums) {
        int n = nums.Length;
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        var tmp = new List<int>();
        foreach (var num in nums) {
            if (num != 0) {
                tmp.Add(num);
            }
        }

        for (int i = 0; i < n; i++) {
            nums[i] = i < tmp.Count ? tmp[i] : 0;
        }

        return nums;
    }
}
```

```go
func applyOperations(nums []int) []int {
    n := len(nums)
    for i := 0; i < n-1; i++ {
        if nums[i] == nums[i+1] {
            nums[i] *= 2
            nums[i+1] = 0
        }
    }

    tmp := []int{}
    for _, num := range nums {
        if num != 0 {
            tmp = append(tmp, num)
        }
    }

    for i := 0; i < n; i++ {
        if i < len(tmp) {
            nums[i] = tmp[i]
        } else {
            nums[i] = 0
        }
    }

    return nums
}
```

```kotlin
class Solution {
    fun applyOperations(nums: IntArray): IntArray {
        val n = nums.size
        for (i in 0 until n - 1) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2
                nums[i + 1] = 0
            }
        }

        val tmp = mutableListOf<Int>()
        for (num in nums) {
            if (num != 0) {
                tmp.add(num)
            }
        }

        for (i in 0 until n) {
            nums[i] = if (i < tmp.size) tmp[i] else 0
        }

        return nums
    }
}
```

```swift
class Solution {
    func applyOperations(_ nums: [Int]) -> [Int] {
        var nums = nums
        let n = nums.count
        for i in 0..<(n - 1) {
            if nums[i] == nums[i + 1] {
                nums[i] *= 2
                nums[i + 1] = 0
            }
        }

        var tmp = [Int]()
        for num in nums {
            if num != 0 {
                tmp.append(num)
            }
        }

        for i in 0..<n {
            nums[i] = i < tmp.count ? tmp[i] : 0
        }

        return nums
    }
}
```

```rust
impl Solution {
    pub fn apply_operations(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        let n = nums.len();
        for i in 0..n - 1 {
            if nums[i] == nums[i + 1] {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        let tmp: Vec<i32> = nums.iter().copied().filter(|&x| x != 0).collect();

        for i in 0..n {
            nums[i] = if i < tmp.len() { tmp[i] } else { 0 };
        }

        nums
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums: number[]): number[] {
        const n = nums.length;
        for (let i = 0; i < n - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        const tmp: number[] = [];
        for (const num of nums) {
            if (num !== 0) {
                tmp.push(num);
            }
        }

        for (let i = 0; i < n; i++) {
            nums[i] = i < tmp.length ? tmp[i] : 0;
        }

        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Simulation (Space Optimized)

::tabs-start

```python
class Solution:
    def applyOperations(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n - 1):
            if nums[i] == nums[i + 1]:
                nums[i] *= 2
                nums[i + 1] = 0

        l = 0
        for r in range(n):
            if nums[r] != 0:
                nums[l] = nums[r]
                l += 1

        while l < n:
            nums[l] = 0
            l += 1

        return nums
```

```java
public class Solution {
    public int[] applyOperations(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] != 0) {
                nums[l++] = nums[r];
            }
        }

        while (l < n) {
            nums[l++] = 0;
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> applyOperations(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] != 0) {
                nums[l++] = nums[r];
            }
        }

        while (l < n) {
            nums[l++] = 0;
        }

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums) {
        const n = nums.length;
        for (let i = 0; i < n - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        let l = 0;
        for (let r = 0; r < n; r++) {
            if (nums[r] !== 0) {
                nums[l++] = nums[r];
            }
        }

        while (l < n) {
            nums[l++] = 0;
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] ApplyOperations(int[] nums) {
        int n = nums.Length;
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] != 0) {
                nums[l] = nums[r];
                l++;
            }
        }

        while (l < n) {
            nums[l] = 0;
            l++;
        }

        return nums;
    }
}
```

```go
func applyOperations(nums []int) []int {
    n := len(nums)
    for i := 0; i < n-1; i++ {
        if nums[i] == nums[i+1] {
            nums[i] *= 2
            nums[i+1] = 0
        }
    }

    l := 0
    for r := 0; r < n; r++ {
        if nums[r] != 0 {
            nums[l] = nums[r]
            l++
        }
    }

    for l < n {
        nums[l] = 0
        l++
    }

    return nums
}
```

```kotlin
class Solution {
    fun applyOperations(nums: IntArray): IntArray {
        val n = nums.size
        for (i in 0 until n - 1) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2
                nums[i + 1] = 0
            }
        }

        var l = 0
        for (r in 0 until n) {
            if (nums[r] != 0) {
                nums[l++] = nums[r]
            }
        }

        while (l < n) {
            nums[l++] = 0
        }

        return nums
    }
}
```

```swift
class Solution {
    func applyOperations(_ nums: [Int]) -> [Int] {
        var nums = nums
        let n = nums.count
        for i in 0..<(n - 1) {
            if nums[i] == nums[i + 1] {
                nums[i] *= 2
                nums[i + 1] = 0
            }
        }

        var l = 0
        for r in 0..<n {
            if nums[r] != 0 {
                nums[l] = nums[r]
                l += 1
            }
        }

        while l < n {
            nums[l] = 0
            l += 1
        }

        return nums
    }
}
```

```rust
impl Solution {
    pub fn apply_operations(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        let n = nums.len();
        for i in 0..n - 1 {
            if nums[i] == nums[i + 1] {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        let mut l = 0;
        for r in 0..n {
            if nums[r] != 0 {
                nums[l] = nums[r];
                l += 1;
            }
        }

        while l < n {
            nums[l] = 0;
            l += 1;
        }

        nums
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums: number[]): number[] {
        const n = nums.length;
        for (let i = 0; i < n - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        let l = 0;
        for (let r = 0; r < n; r++) {
            if (nums[r] !== 0) {
                nums[l++] = nums[r];
            }
        }

        while (l < n) {
            nums[l++] = 0;
        }

        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def applyOperations(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n - 1):
            if nums[i] == nums[i + 1]:
                nums[i] *= 2
                nums[i + 1] = 0

        l = 0
        for r in range(n):
            if nums[r] != 0:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1

        return nums
```

```java
public class Solution {
    public int[] applyOperations(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] != 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> applyOperations(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        for (int l = 0, r = 0; r < n; r++) {
            if (nums[r] != 0) {
                swap(nums[l++], nums[r]);
            }
        }

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums) {
        const n = nums.length;
        for (let i = 0; i < n - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        for (let l = 0, r = 0; r < n; r++) {
            if (nums[r] !== 0) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
            }
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] ApplyOperations(int[] nums) {
        int n = nums.Length;
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] != 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }

        return nums;
    }
}
```

```go
func applyOperations(nums []int) []int {
    n := len(nums)
    for i := 0; i < n-1; i++ {
        if nums[i] == nums[i+1] {
            nums[i] *= 2
            nums[i+1] = 0
        }
    }

    l := 0
    for r := 0; r < n; r++ {
        if nums[r] != 0 {
            nums[l], nums[r] = nums[r], nums[l]
            l++
        }
    }

    return nums
}
```

```kotlin
class Solution {
    fun applyOperations(nums: IntArray): IntArray {
        val n = nums.size
        for (i in 0 until n - 1) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2
                nums[i + 1] = 0
            }
        }

        var l = 0
        for (r in 0 until n) {
            if (nums[r] != 0) {
                val temp = nums[l]
                nums[l] = nums[r]
                nums[r] = temp
                l++
            }
        }

        return nums
    }
}
```

```swift
class Solution {
    func applyOperations(_ nums: [Int]) -> [Int] {
        var nums = nums
        let n = nums.count
        for i in 0..<(n - 1) {
            if nums[i] == nums[i + 1] {
                nums[i] *= 2
                nums[i + 1] = 0
            }
        }

        var l = 0
        for r in 0..<n {
            if nums[r] != 0 {
                nums.swapAt(l, r)
                l += 1
            }
        }

        return nums
    }
}
```

```rust
impl Solution {
    pub fn apply_operations(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        let n = nums.len();
        for i in 0..n - 1 {
            if nums[i] == nums[i + 1] {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        let mut l = 0;
        for r in 0..n {
            if nums[r] != 0 {
                nums.swap(l, r);
                l += 1;
            }
        }

        nums
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums: number[]): number[] {
        const n = nums.length;
        for (let i = 0; i < n - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }

        for (let l = 0, r = 0; r < n; r++) {
            if (nums[r] !== 0) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
            }
        }

        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Two Pointers (One Pass)

::tabs-start

```python
class Solution:
    def applyOperations(self, nums: List[int]) -> List[int]:
        n = len(nums)
        l = 0

        for i in range(n):
            if i < n - 1 and nums[i] == nums[i + 1] and nums[i] != 0:
                nums[i] *= 2
                nums[i + 1] = 0

            if nums[i] != 0:
                nums[i], nums[l] = nums[l], nums[i]
                l += 1

        return nums
```

```java
class Solution {
    public int[] applyOperations(int[] nums) {
        int n = nums.length;
        int l = 0;

        for (int i = 0; i < n; i++) {
            if (i < n - 1 && nums[i] == nums[i + 1] && nums[i] != 0) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }

            if (nums[i] != 0) {
                int temp = nums[i];
                nums[i] = nums[l];
                nums[l] = temp;
                l++;
            }
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> applyOperations(vector<int>& nums) {
        int n = nums.size();
        int l = 0;

        for (int i = 0; i < n; i++) {
            if (i < n - 1 && nums[i] == nums[i + 1] && nums[i] != 0) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }

            if (nums[i] != 0) {
                swap(nums[i], nums[l]);
                l++;
            }
        }

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums) {
        const n = nums.length;
        let l = 0;

        for (let i = 0; i < n; i++) {
            if (i < n - 1 && nums[i] === nums[i + 1] && nums[i] !== 0) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }

            if (nums[i] !== 0) {
                [nums[i], nums[l]] = [nums[l], nums[i]];
                l++;
            }
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] ApplyOperations(int[] nums) {
        int n = nums.Length;
        int l = 0;

        for (int i = 0; i < n; i++) {
            if (i < n - 1 && nums[i] == nums[i + 1] && nums[i] != 0) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }

            if (nums[i] != 0) {
                int temp = nums[i];
                nums[i] = nums[l];
                nums[l] = temp;
                l++;
            }
        }

        return nums;
    }
}
```

```go
func applyOperations(nums []int) []int {
    n := len(nums)
    l := 0

    for i := 0; i < n; i++ {
        if i < n-1 && nums[i] == nums[i+1] && nums[i] != 0 {
            nums[i] *= 2
            nums[i+1] = 0
        }

        if nums[i] != 0 {
            nums[i], nums[l] = nums[l], nums[i]
            l++
        }
    }

    return nums
}
```

```kotlin
class Solution {
    fun applyOperations(nums: IntArray): IntArray {
        val n = nums.size
        var l = 0

        for (i in 0 until n) {
            if (i < n - 1 && nums[i] == nums[i + 1] && nums[i] != 0) {
                nums[i] *= 2
                nums[i + 1] = 0
            }

            if (nums[i] != 0) {
                val temp = nums[i]
                nums[i] = nums[l]
                nums[l] = temp
                l++
            }
        }

        return nums
    }
}
```

```swift
class Solution {
    func applyOperations(_ nums: [Int]) -> [Int] {
        var nums = nums
        let n = nums.count
        var l = 0

        for i in 0..<n {
            if i < n - 1 && nums[i] == nums[i + 1] && nums[i] != 0 {
                nums[i] *= 2
                nums[i + 1] = 0
            }

            if nums[i] != 0 {
                nums.swapAt(i, l)
                l += 1
            }
        }

        return nums
    }
}
```

```rust
impl Solution {
    pub fn apply_operations(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        let n = nums.len();
        let mut l = 0;

        for i in 0..n {
            if i < n - 1 && nums[i] == nums[i + 1] && nums[i] != 0 {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }

            if nums[i] != 0 {
                nums.swap(i, l);
                l += 1;
            }
        }

        nums
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    applyOperations(nums: number[]): number[] {
        const n = nums.length;
        let l = 0;

        for (let i = 0; i < n; i++) {
            if (i < n - 1 && nums[i] === nums[i + 1] && nums[i] !== 0) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }

            if (nums[i] !== 0) {
                [nums[i], nums[l]] = [nums[l], nums[i]];
                l++;
            }
        }

        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
