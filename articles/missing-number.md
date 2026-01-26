## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Bitwise XOR** - The XOR approach uses the property that a number XORed with itself equals zero to cancel out all present numbers
- **Math (Sum Formula)** - The mathematical approach uses the sum formula for consecutive integers to find the missing value
- **Hash Set** - One solution uses constant-time lookups to identify which number from the expected range is absent

---

## 1. Sorting

### Intuition

We are given an array containing `n` **distinct numbers** taken from the range `[0, n]`.  
Exactly **one number is missing**, and we need to find it.

A simple way to reason about this is:
- If the array were complete and sorted, the number at index `i` should be exactly `i`
- As soon as this condition breaks, that index represents the missing number

Sorting the array puts the numbers in order, making this comparison straightforward and beginner-friendly.

### Algorithm

1. Sort the array in ascending order.
2. Traverse the array from index `0` to `n - 1`:
   - If `nums[i] != i`, then `i` is the missing number → return `i`.
3. If all indices match their values:
   - The missing number must be `n` → return `n` as the result.

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        nums.sort()
        for i in range(n):
            if nums[i] != i:
                return i
        return n
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);
        for (int i = 0; i < n; i++) {
            if (nums[i] != i) {
                return i;
            }
        }
        return n;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        for (int i = 0; i < n; i++) {
            if (nums[i] != i) {
                return i;
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
    missingNumber(nums) {
        let n = nums.length;
        nums.sort((a, b) => a - b);
        for (let i = 0; i < n; i++) {
            if (nums[i] !== i) {
                return i;
            }
        }
        return n;
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        int n = nums.Length;
        Array.Sort(nums);
        for (int i = 0; i < n; i++) {
            if (nums[i] != i) {
                return i;
            }
        }
        return n;
    }
}
```

```go
func missingNumber(nums []int) int {
    n := len(nums)
    sort.Ints(nums)
    for i := 0; i < n; i++ {
        if nums[i] != i {
            return i
        }
    }
    return n
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        val n = nums.size
        nums.sort()
        for (i in 0 until n) {
            if (nums[i] != i) {
                return i
            }
        }
        return n
    }
}
```

```swift
class Solution {
    func missingNumber(_ nums: [Int]) -> Int {
        var nums = nums.sorted()
        let n = nums.count
        for i in 0..<n {
            if nums[i] != i {
                return i
            }
        }
        return n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Hash Set

### Intuition

We are given `n` distinct numbers taken from the range `[0, n]`, with **exactly one number missing**.

A natural way to approach this is to ask:
> “Can we quickly check whether a number exists in the array?”

Using a **hash-based data structure** (like a hash set) allows us to:
- Store all given numbers
- Check the presence of any number in **constant time**

Once all numbers are stored, we simply look for the number in the range `[0, n]` that does **not** appear in the set.

This approach trades a little extra space for very clear and simple logic.

### Algorithm

1. Insert all elements of the array into a hash set.
2. Iterate through all numbers from `0` to `n`:
   - If a number is **not present** in the set, return it as the missing number.
3. Since exactly one number is missing, this process will always find the answer.

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        num_set = set(nums)
        n = len(nums)
        for i in range(n + 1):
            if i not in num_set:
                return i
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }
        int n = nums.length;
        for (int i = 0; i <= n; i++) {
            if (!numSet.contains(i)) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        unordered_set<int> num_set(nums.begin(), nums.end());
        int n = nums.size();
        for (int i = 0; i <= n; i++) {
            if (num_set.find(i) == num_set.end()) {
                return i;
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
    missingNumber(nums) {
        const numSet = new Set(nums);
        const n = nums.length;
        for (let i = 0; i <= n; i++) {
            if (!numSet.has(i)) {
                return i;
            }
        }
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        HashSet<int> numSet = new HashSet<int>(nums);
        int n = nums.Length;
        for (int i = 0; i <= n; i++) {
            if (!numSet.Contains(i)) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func missingNumber(nums []int) int {
    numSet := make(map[int]struct{})
    for _, num := range nums {
        numSet[num] = struct{}{}
    }
    n := len(nums)
    for i := 0; i <= n; i++ {
        if _, exists := numSet[i]; !exists {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        val numSet = nums.toSet()
        val n = nums.size
        for (i in 0..n) {
            if (i !in numSet) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func missingNumber(_ nums: [Int]) -> Int {
        let numSet = Set(nums)
        let n = nums.count
        for i in 0...n {
            if !numSet.contains(i) {
                return i
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Bitwise XOR

### Intuition

We are given `n` distinct numbers from the range `[0, n]`, with **exactly one number missing**.

A very powerful observation comes from the properties of **XOR (⊕)**:

- `a ⊕ a = 0`  (a number cancels itself)
- `a ⊕ 0 = a`
- XOR is **commutative and associative** (order does not matter)

If we XOR:
- all numbers from `0` to `n`
- and all numbers present in the array

Every number that appears in both places will cancel out, leaving **only the missing number**.

This allows us to find the answer in **linear time** and **constant space**, without sorting or extra data structures.

### Algorithm

1. Let `n` be the length of the array.
2. Initialize a variable `xorr` with `n`.
3. For each index `i` from `0` to `n - 1`:
   - XOR `xorr` with `i`
   - XOR `xorr` with `nums[i]`
4. After the loop, `xorr` will contain the missing number.
5. Return `xorr`.

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        xorr = n
        for i in range(n):
            xorr ^= i ^ nums[i]
        return xorr
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int xorr = n;
        for (int i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int xorr = n;
        for (int i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    missingNumber(nums) {
        let n = nums.length;
        let xorr = n;
        for (let i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        int n = nums.Length;
        int xorr = n;
        for (int i = 0; i < n; i++) {
            xorr ^= i ^ nums[i];
        }
        return xorr;
    }
}
```

```go
func missingNumber(nums []int) int {
    n := len(nums)
    xorr := n
    for i := 0; i < n; i++ {
        xorr ^= i ^ nums[i]
    }
    return xorr
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        val n = nums.size
        var xorr = n
        for (i in 0 until n) {
            xorr = xorr xor i xor nums[i]
        }
        return xorr
    }
}
```

```swift
class Solution {
    func missingNumber(_ nums: [Int]) -> Int {
        let n = nums.count
        var xorr = n

        for i in 0..<n {
            xorr ^= i ^ nums[i]
        }

        return xorr
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Math

### Intuition

We are given `n` distinct numbers from the range `[0, n]`, with **exactly one number missing**.

A simple mathematical observation helps here:
- The sum of numbers from `0` to `n` is known
- If we subtract the sum of the given array from this expected sum, the result must be the missing number

Instead of computing two separate sums, we can combine both ideas into a **single running calculation**, which keeps the logic clean and avoids overflow issues in some languages.

This approach uses **basic arithmetic**, making it easy to understand and language-independent.

### Algorithm

1. Let `n` be the length of the array.
2. Initialize a variable `res = n`.
3. For each index `i` from `0` to `n - 1`:
   - Add `i` to `res`
   - Subtract `nums[i]` from `res`
4. After the loop, `res` will hold the missing number.
5. Return `res` as the answer.

::tabs-start

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        res = len(nums)

        for i in range(len(nums)):
            res += i - nums[i]
        return res
```

```java
public class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length;

        for (int i = 0; i < nums.length; i++) {
            res += i - nums[i];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int res = nums.size();

        for (int i = 0; i < nums.size(); i++) {
            res += i - nums[i];
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
    missingNumber(nums) {
        let res = nums.length;

        for (let i = 0; i < nums.length; i++) {
            res += i - nums[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MissingNumber(int[] nums) {
        int res = nums.Length;

        for (int i = 0; i < nums.Length; i++) {
            res += i - nums[i];
        }
        return res;
    }
}
```

```go
func missingNumber(nums []int) int {
    res := len(nums)
    for i := 0; i < len(nums); i++ {
        res += i - nums[i]
    }
    return res
}
```

```kotlin
class Solution {
    fun missingNumber(nums: IntArray): Int {
        var res = nums.size
        for (i in nums.indices) {
            res += i - nums[i]
        }
        return res
    }
}
```

```swift
class Solution {
    func missingNumber(_ nums: [Int]) -> Int {
        var res = nums.count

        for i in 0..<nums.count {
            res += i - nums[i]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting That n Could Be the Missing Number

The range is `[0, n]` for an array of length `n`, meaning `n` itself could be missing. Solutions that only check indices `0` to `n-1` will miss this case and fail to return `n` when all other numbers are present.

### Integer Overflow in Sum-Based Approach

When using the mathematical approach, computing the full expected sum `n * (n + 1) / 2` separately before subtracting can cause overflow for large `n`. Combining addition and subtraction in a single loop avoids this issue.
