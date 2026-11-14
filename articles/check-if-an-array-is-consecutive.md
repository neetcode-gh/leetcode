## 1. Brute Force

::tabs-start

```python
class Solution:
    def isConsecutive(self, nums: List[int]) -> bool:
        n = len(nums)
        mn = min(nums)
        for val in range(mn, mn + n):
            found = False
            for num in nums:
                if num == val:
                    found = True
                    break
            if not found:
                return False
        return True
```

```java
public class Solution {
    public boolean isConsecutive(int[] nums) {
        int n = nums.length;
        int mn = Arrays.stream(nums).min().getAsInt();
        for (int val = mn; val < mn + n; val++) {
            boolean found = false;
            for (int num : nums) {
                if (num == val) {
                    found = true;
                    break;
                }
            }
            if (!found) {
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
    bool isConsecutive(vector<int>& nums) {
        int n = nums.size();
        int mn = *min_element(nums.begin(), nums.end());
        for (int val = mn; val < mn + n; val++) {
            bool found = false;
            for (int num : nums) {
                if (num == val) {
                    found = true;
                    break;
                }
            }
            if (!found) {
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
    isConsecutive(nums) {
        const n = nums.length;
        let mn = nums[0];
        for (const num of nums) {
            mn = Math.min(mn, num);
        }
        for (let val = mn; val < mn + n; val++) {
            let found = false;
            for (const num of nums) {
                if (num === val) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsConsecutive(int[] nums) {
        int n = nums.Length;
        int mn = nums.Min();
        for (int val = mn; val < mn + n; val++) {
            bool found = false;
            foreach (int num in nums) {
                if (num == val) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isConsecutive(nums []int) bool {
    n := len(nums)
    mn := nums[0]
    for _, num := range nums {
        mn = min(mn, num)
    }
    for val := mn; val < mn+n; val++ {
        found := false
        for _, num := range nums {
            if num == val {
                found = true
                break
            }
        }
        if !found {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isConsecutive(nums: IntArray): Boolean {
        val n = nums.size
        var mn = nums[0]
        for (num in nums) {
            mn = minOf(mn, num)
        }
        for (v in mn until mn + n) {
            var found = false
            for (num in nums) {
                if (num == v) {
                    found = true
                    break
                }
            }
            if (!found) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isConsecutive(_ nums: [Int]) -> Bool {
        let n = nums.count
        let mn = nums.min()!
        for val in mn..<(mn + n) {
            var found = false
            for num in nums {
                if num == val {
                    found = true
                    break
                }
            }
            if !found {
                return false
            }
        }
        return true
    }
}
```

```rust
impl Solution {
    pub fn is_consecutive(nums: Vec<i32>) -> bool {
        let n = nums.len() as i32;
        let mn = *nums.iter().min().unwrap();
        for val in mn..mn + n {
            let mut found = false;
            for &num in &nums {
                if num == val {
                    found = true;
                    break;
                }
            }
            if !found {
                return false;
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isConsecutive(nums: number[]): boolean {
        const n = nums.length;
        let mn = nums[0];
        for (const num of nums) {
            mn = Math.min(mn, num);
        }
        for (let val = mn; val < mn + n; val++) {
            let found = false;
            for (const num of nums) {
                if (num === val) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

> Where $n$ is the length of the array $nums$.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def isConsecutive(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1] + 1:
                return False
        return True
```

```java
public class Solution {
    public boolean isConsecutive(int[] nums) {
        Arrays.sort(nums);
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1] + 1) {
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
    bool isConsecutive(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] != nums[i - 1] + 1) {
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
    isConsecutive(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] !== nums[i - 1] + 1) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsConsecutive(int[] nums) {
        Array.Sort(nums);
        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] != nums[i - 1] + 1) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isConsecutive(nums []int) bool {
    sort.Ints(nums)
    for i := 1; i < len(nums); i++ {
        if nums[i] != nums[i-1]+1 {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isConsecutive(nums: IntArray): Boolean {
        nums.sort()
        for (i in 1 until nums.size) {
            if (nums[i] != nums[i - 1] + 1) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isConsecutive(_ nums: [Int]) -> Bool {
        let nums = nums.sorted()
        for i in 1..<nums.count {
            if nums[i] != nums[i - 1] + 1 {
                return false
            }
        }
        return true
    }
}
```

```rust
impl Solution {
    pub fn is_consecutive(mut nums: Vec<i32>) -> bool {
        nums.sort();
        for i in 1..nums.len() {
            if nums[i] != nums[i - 1] + 1 {
                return false;
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isConsecutive(nums: number[]): boolean {
        nums.sort((a, b) => a - b);
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] !== nums[i - 1] + 1) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

> Where $n$ is the length of the array $nums$.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def isConsecutive(self, nums: List[int]) -> bool:
        n = len(nums)
        return len(set(nums)) == n and max(nums) - min(nums) == n - 1
```

```java
public class Solution {
    public boolean isConsecutive(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        int mn = nums[0], mx = nums[0];
        for (int num : nums) {
            seen.add(num);
            mn = Math.min(mn, num);
            mx = Math.max(mx, num);
        }
        return seen.size() == nums.length && mx - mn == nums.length - 1;
    }
}
```

```cpp
class Solution {
public:
    bool isConsecutive(vector<int>& nums) {
        unordered_set<int> seen;
        int mn = nums[0], mx = nums[0];
        for (int num : nums) {
            seen.insert(num);
            mn = min(mn, num);
            mx = max(mx, num);
        }
        int n = nums.size();
        return seen.size() == n && mx - mn == n - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isConsecutive(nums) {
        const seen = new Set();
        let mn = nums[0];
        let mx = nums[0];
        for (const num of nums) {
            seen.add(num);
            mn = Math.min(mn, num);
            mx = Math.max(mx, num);
        }
        return seen.size === nums.length && mx - mn === nums.length - 1;
    }
}
```

```csharp
public class Solution {
    public bool IsConsecutive(int[] nums) {
        var seen = new HashSet<int>();
        int mn = nums[0], mx = nums[0];
        foreach (int num in nums) {
            seen.Add(num);
            mn = Math.Min(mn, num);
            mx = Math.Max(mx, num);
        }
        return seen.Count == nums.Length && mx - mn == nums.Length - 1;
    }
}
```

```go
func isConsecutive(nums []int) bool {
    seen := map[int]bool{}
    mn, mx := nums[0], nums[0]
    for _, num := range nums {
        seen[num] = true
        mn = min(mn, num)
        mx = max(mx, num)
    }
    return len(seen) == len(nums) && mx-mn == len(nums)-1
}
```

```kotlin
class Solution {
    fun isConsecutive(nums: IntArray): Boolean {
        val seen = HashSet<Int>()
        var mn = nums[0]
        var mx = nums[0]
        for (num in nums) {
            seen.add(num)
            mn = minOf(mn, num)
            mx = maxOf(mx, num)
        }
        return seen.size == nums.size && mx - mn == nums.size - 1
    }
}
```

```swift
class Solution {
    func isConsecutive(_ nums: [Int]) -> Bool {
        let seen = Set(nums)
        let mn = nums.min()!
        let mx = nums.max()!
        return seen.count == nums.count && mx - mn == nums.count - 1
    }
}
```

```rust
use std::collections::HashSet;

impl Solution {
    pub fn is_consecutive(nums: Vec<i32>) -> bool {
        let seen: HashSet<i32> = nums.iter().cloned().collect();
        let mn = *nums.iter().min().unwrap();
        let mx = *nums.iter().max().unwrap();
        let n = nums.len();
        seen.len() == n && (mx - mn) as usize == n - 1
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isConsecutive(nums: number[]): boolean {
        const seen = new Set<number>();
        let mn = nums[0];
        let mx = nums[0];
        for (const num of nums) {
            seen.add(num);
            mn = Math.min(mn, num);
            mx = Math.max(mx, num);
        }
        return seen.size === nums.length && mx - mn === nums.length - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $nums$.

---

## 4. Boolean Array

::tabs-start

```python
class Solution:
    def isConsecutive(self, nums: List[int]) -> bool:
        n = len(nums)
        mn = min(nums)
        seen = [False] * n
        for num in nums:
            idx = num - mn
            if idx >= n or seen[idx]:
                return False
            seen[idx] = True
        return True
```

```java
public class Solution {
    public boolean isConsecutive(int[] nums) {
        int n = nums.length;
        int mn = Arrays.stream(nums).min().getAsInt();
        boolean[] seen = new boolean[n];
        for (int num : nums) {
            int idx = num - mn;
            if (idx >= n || seen[idx]) {
                return false;
            }
            seen[idx] = true;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isConsecutive(vector<int>& nums) {
        int n = nums.size();
        int mn = *min_element(nums.begin(), nums.end());
        vector<bool> seen(n, false);
        for (int num : nums) {
            int idx = num - mn;
            if (idx >= n || seen[idx]) {
                return false;
            }
            seen[idx] = true;
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
    isConsecutive(nums) {
        const n = nums.length;
        let mn = nums[0];
        for (const num of nums) {
            mn = Math.min(mn, num);
        }
        const seen = new Array(n).fill(false);
        for (const num of nums) {
            const idx = num - mn;
            if (idx >= n || seen[idx]) {
                return false;
            }
            seen[idx] = true;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsConsecutive(int[] nums) {
        int n = nums.Length;
        int mn = nums.Min();
        bool[] seen = new bool[n];
        foreach (int num in nums) {
            int idx = num - mn;
            if (idx >= n || seen[idx]) {
                return false;
            }
            seen[idx] = true;
        }
        return true;
    }
}
```

```go
func isConsecutive(nums []int) bool {
    n := len(nums)
    mn := nums[0]
    for _, num := range nums {
        mn = min(mn, num)
    }
    seen := make([]bool, n)
    for _, num := range nums {
        idx := num - mn
        if idx >= n || seen[idx] {
            return false
        }
        seen[idx] = true
    }
    return true
}
```

```kotlin
class Solution {
    fun isConsecutive(nums: IntArray): Boolean {
        val n = nums.size
        var mn = nums[0]
        for (num in nums) {
            mn = minOf(mn, num)
        }
        val seen = BooleanArray(n)
        for (num in nums) {
            val idx = num - mn
            if (idx >= n || seen[idx]) {
                return false
            }
            seen[idx] = true
        }
        return true
    }
}
```

```swift
class Solution {
    func isConsecutive(_ nums: [Int]) -> Bool {
        let n = nums.count
        let mn = nums.min()!
        var seen = [Bool](repeating: false, count: n)
        for num in nums {
            let idx = num - mn
            if idx >= n || seen[idx] {
                return false
            }
            seen[idx] = true
        }
        return true
    }
}
```

```rust
impl Solution {
    pub fn is_consecutive(nums: Vec<i32>) -> bool {
        let n = nums.len();
        let mn = *nums.iter().min().unwrap();
        let mut seen = vec![false; n];
        for &num in &nums {
            let idx = (num - mn) as usize;
            if idx >= n || seen[idx] {
                return false;
            }
            seen[idx] = true;
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isConsecutive(nums: number[]): boolean {
        const n = nums.length;
        let mn = nums[0];
        for (const num of nums) {
            mn = Math.min(mn, num);
        }
        const seen: boolean[] = new Array(n).fill(false);
        for (const num of nums) {
            const idx = num - mn;
            if (idx >= n || seen[idx]) {
                return false;
            }
            seen[idx] = true;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $nums$.

---

## 5. Cycle Sort

::tabs-start

```python
class Solution:
    def isConsecutive(self, nums: List[int]) -> bool:
        n = len(nums)
        mn = min(nums)
        i = 0
        while i < n:
            index = nums[i] - mn
            if index >= n:
                return False
            if index == i:
                i += 1
            elif nums[index] == nums[i]:
                return False
            else:
                nums[i], nums[index] = nums[index], nums[i]
        return True
```

```java
public class Solution {
    public boolean isConsecutive(int[] nums) {
        int n = nums.length;
        int mn = Arrays.stream(nums).min().getAsInt();
        int i = 0;
        while (i < n) {
            int index = nums[i] - mn;
            if (index >= n) {
                return false;
            }
            if (index == i) {
                i++;
            } else if (nums[index] == nums[i]) {
                return false;
            } else {
                int temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isConsecutive(vector<int>& nums) {
        int n = nums.size();
        int mn = *min_element(nums.begin(), nums.end());
        int i = 0;
        while (i < n) {
            int index = nums[i] - mn;
            if (index >= n) {
                return false;
            }
            if (index == i) {
                i++;
            } else if (nums[index] == nums[i]) {
                return false;
            } else {
                swap(nums[i], nums[index]);
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
    isConsecutive(nums) {
        const n = nums.length;
        let mn = nums[0];
        for (const num of nums) {
            mn = Math.min(mn, num);
        }
        let i = 0;
        while (i < n) {
            const index = nums[i] - mn;
            if (index >= n) {
                return false;
            }
            if (index === i) {
                i++;
            } else if (nums[index] === nums[i]) {
                return false;
            } else {
                [nums[i], nums[index]] = [nums[index], nums[i]];
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsConsecutive(int[] nums) {
        int n = nums.Length;
        int mn = nums.Min();
        int i = 0;
        while (i < n) {
            int index = nums[i] - mn;
            if (index >= n) {
                return false;
            }
            if (index == i) {
                i++;
            } else if (nums[index] == nums[i]) {
                return false;
            } else {
                int temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
            }
        }
        return true;
    }
}
```

```go
func isConsecutive(nums []int) bool {
    n := len(nums)
    mn := nums[0]
    for _, num := range nums {
        mn = min(mn, num)
    }
    i := 0
    for i < n {
        index := nums[i] - mn
        if index >= n {
            return false
        }
        if index == i {
            i++
        } else if nums[index] == nums[i] {
            return false
        } else {
            nums[i], nums[index] = nums[index], nums[i]
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isConsecutive(nums: IntArray): Boolean {
        val n = nums.size
        var mn = nums[0]
        for (num in nums) {
            mn = minOf(mn, num)
        }
        var i = 0
        while (i < n) {
            val index = nums[i] - mn
            if (index >= n) {
                return false
            }
            if (index == i) {
                i++
            } else if (nums[index] == nums[i]) {
                return false
            } else {
                val temp = nums[i]
                nums[i] = nums[index]
                nums[index] = temp
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isConsecutive(_ nums: [Int]) -> Bool {
        var nums = nums
        let n = nums.count
        let mn = nums.min()!
        var i = 0
        while i < n {
            let index = nums[i] - mn
            if index >= n {
                return false
            }
            if index == i {
                i += 1
            } else if nums[index] == nums[i] {
                return false
            } else {
                nums.swapAt(i, index)
            }
        }
        return true
    }
}
```

```rust
impl Solution {
    pub fn is_consecutive(mut nums: Vec<i32>) -> bool {
        let n = nums.len();
        let mn = *nums.iter().min().unwrap();
        let mut i = 0;
        while i < n {
            let index = (nums[i] - mn) as usize;
            if index >= n {
                return false;
            }
            if index == i {
                i += 1;
            } else if nums[index] == nums[i] {
                return false;
            } else {
                nums.swap(i, index);
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isConsecutive(nums: number[]): boolean {
        const n = nums.length;
        let mn = nums[0];
        for (const num of nums) {
            mn = Math.min(mn, num);
        }
        let i = 0;
        while (i < n) {
            const index = nums[i] - mn;
            if (index >= n) {
                return false;
            }
            if (index === i) {
                i++;
            } else if (nums[index] === nums[i]) {
                return false;
            } else {
                [nums[i], nums[index]] = [nums[index], nums[i]];
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $nums$.
