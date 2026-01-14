## 1. Recursive Binary Search

### Intuition

Binary search works by repeatedly cutting the search space in half.  
Instead of scanning the entire array, we check the **middle element**:

- If it’s the target → return the index.
- If the target is larger → search only in the right half.
- If the target is smaller → search only in the left half.

The recursive version simply expresses this idea as a function that keeps calling itself on the appropriate half until the target is found or the range becomes invalid.

### Algorithm

1. Define a recursive function that takes the current search range `[l, r]`.
2. If `l > r`, the range is empty, return `-1`.
3. Compute the middle index `m = (l + r) // 2`.
4. Compare `nums[m]` with `target`:
   - If equal, return `m`.
   - If `nums[m] < target`, recursively search `[m + 1, r]`.
   - If `nums[m] > target`, recursively search `[l, m - 1]`.
5. Start the recursion with the full range `[0, n - 1]`.
6. Return the final result.

<details>
<summary>Example - Dry Run</summary>

Input: nums = [-1, 0, 3, 5, 9, 12], target = 9

**Initial Array:**
```markdown
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5
```


**Call 1:** binary_search(l=0, r=5)
```markdown
   L         M              R
   ↓         ↓              ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  l = 0, r = 5, m = 2
  nums[M] = nums[2] = 3
  3 < 9 (target)
  → Search right half: binary_search(3, 5)
```


**Call 2:** binary_search(l=3, r=5)
```markdown
                  L    M    R
                  ↓    ↓    ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  l = 3, r = 5, m = 4
  nums[M] = nums[4] = 9
  9 == 9 (target) ✓ Found!
```


**Result: index 4**

</details>

<br>

::tabs-start

```python
class Solution:
    def binary_search(self, l: int, r: int, nums: List[int], target: int) -> int:
        if l > r:
            return -1
        m = l + (r - l) // 2

        if nums[m] == target:
            return m
        if nums[m] < target:
            return self.binary_search(m + 1, r, nums, target)
        return self.binary_search(l, m - 1, nums, target)

    def search(self, nums: List[int], target: int) -> int:
        return self.binary_search(0, len(nums) - 1, nums, target)
```

```java
public class Solution {
    public int binary_search(int l, int r, int[] nums, int target) {
        if (l > r) return -1;
        int m = l + (r - l) / 2;

        if (nums[m] == target) return m;
        return (nums[m] < target) ?
            binary_search(m + 1, r, nums, target) :
            binary_search(l, m - 1, nums, target);
    }

    public int search(int[] nums, int target) {
        return binary_search(0, nums.length - 1, nums, target);
    }
}
```

```cpp
class Solution {
public:
    int binary_search(int l, int r, vector<int>& nums, int target){
        if (l > r) return -1;
        int m = l + (r - l) / 2;

        if (nums[m] == target) return m;
        return ((nums[m] < target) ?
                binary_search(m + 1, r, nums, target) :
                binary_search(l, m - 1, nums, target));
    }

    int search(vector<int>& nums, int target) {
        return binary_search(0, nums.size() - 1, nums, target);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    binary_search(l, r, nums, target) {
        if (l > r) return -1;
        let m = l + Math.floor((r - l) / 2);

        if (nums[m] === target) return m;
        return nums[m] < target
            ? this.binary_search(m + 1, r, nums, target)
            : this.binary_search(l, m - 1, nums, target);
    }

    search(nums, target) {
        return this.binary_search(0, nums.length - 1, nums, target);
    }
}
```

```csharp
public class Solution {
    public int BinarySearch(int l, int r, int[] nums, int target) {
        if (l > r) return -1;
        int m = l + (r - l) / 2;

        if (nums[m] == target) return m;
        return (nums[m] < target) ?
            BinarySearch(m + 1, r, nums, target) :
            BinarySearch(l, m - 1, nums, target);
    }

    public int Search(int[] nums, int target) {
        return BinarySearch(0, nums.Length - 1, nums, target);
    }
}
```

```go
func binarySearch(l, r int, nums []int, target int) int {
    if l > r {
        return -1
    }
    m := l + (r-l)/2

    if nums[m] == target {
        return m
    }
    if nums[m] < target {
        return binarySearch(m+1, r, nums, target)
    }
    return binarySearch(l, m-1, nums, target)
}

func search(nums []int, target int) int {
    return binarySearch(0, len(nums)-1, nums, target)
}
```

```kotlin
class Solution {
    private fun binarySearch(l: Int, r: Int, nums: IntArray, target: Int): Int {
        if (l > r) {
            return -1
        }
        val m = l + (r - l) / 2

        return when {
            nums[m] == target -> m
            nums[m] < target -> binarySearch(m + 1, r, nums, target)
            else -> binarySearch(l, m - 1, nums, target)
        }
    }

    fun search(nums: IntArray, target: Int): Int {
        return binarySearch(0, nums.size - 1, nums, target)
    }
}
```

```swift
class Solution {
    func binarySearch(_ l: Int, _ r: Int, _ nums: [Int], _ target: Int) -> Int {
        if l > r {
            return -1
        }
        let m = l + (r - l) / 2

        if nums[m] == target {
            return m
        }
        if nums[m] < target {
            return binarySearch(m + 1, r, nums, target)
        }
        return binarySearch(l, m - 1, nums, target)
    }

    func search(_ nums: [Int], _ target: Int) -> Int {
        return binarySearch(0, nums.count - 1, nums, target)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## 2. Iterative Binary Search

### Intuition

Binary search checks the middle element of a sorted array and decides which half to discard.  
Instead of using recursion, the iterative approach keeps shrinking the search range using a loop.  
We adjust the left and right pointers until we either find the target or the pointers cross, meaning the target isn’t present.

### Algorithm

1. Initialize two pointers:
   - `l = 0` (start of array)
   - `r = len(nums) - 1` (end of array)
2. While `l <= r`:
   - Compute `m = l + (r - l) // 2` (safe midpoint).
   - If `nums[m] == target`, return `m`.
   - If `nums[m] < target`, move search to the right half: update `l = m + 1`.
   - If `nums[m] > target`, move search to the left half: update `r = m - 1`.
3. If the loop ends without finding the target, return `-1`.

<details>
<summary>Example - Dry Run</summary>

Input: nums = [-1, 0, 3, 5, 9, 12], target = 9

**Initial Array:**
```markdown
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5
```


**Step 1:** L = 0, R = 5, M = 2
```markdown
   L         M              R
   ↓         ↓              ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[2] = 3
  3 < 9 (target)
  → Search right half: L = M + 1 = 3
```


**Step 2:** L = 3, R = 5, M = 4
```markdown
                  L    M    R
                  ↓    ↓    ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[4] = 9
  9 == 9 (target) ✓ Found!
```


**Result: index 4**

</details>

<br>

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            # (l + r) // 2 can lead to overflow
            m = l + ((r - l) // 2)

            if nums[m] > target:
                r = m - 1
            elif nums[m] < target:
                l = m + 1
            else:
                return m
        return -1
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;

        while (l <= r) {
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;

        while (l <= r) {
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
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
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0;
        let r = nums.length - 1;

        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
            }
        }
        return -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)-1

    for l <= r {
        m := l + (r-l)/2

        if nums[m] > target {
            r = m - 1
        } else if nums[m] < target {
            l = m + 1
        } else {
            return m
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size - 1

        while (l <= r) {
            val m = l + (r - l) / 2

            when {
                nums[m] > target -> r = m - 1
                nums[m] < target -> l = m + 1
                else -> return m
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0, r = nums.count - 1

        while l <= r {
            // (l + r) // 2 can lead to overflow
            let m = l + (r - l) / 2

            if nums[m] > target {
                r = m - 1
            } else if nums[m] < target {
                l = m + 1
            } else {
                return m
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Upper Bound

### Intuition

Upper bound binary search finds the **first index where a value greater than the target appears**.  
Once we know that position, the actual target—if it exists—must be right before it.  
So instead of directly searching for the target, we search for the boundary where values stop being ≤ target.  
Then we simply check whether the element just before that boundary is the target.

### Algorithm

1. Set `l = 0` and `r = len(nums)` (right is one past the last index).
2. While `l < r`:
   - Compute midpoint `m`.
   - If `nums[m] > target`, shrink the right side: `r = m`.
   - Otherwise (`nums[m] <= target`), shrink the left side: `l = m + 1`.
3. After the loop:
   - `l` is the upper bound: first index where `nums[l] > target`.
   - So the potential location of the target is `l - 1`.
4. If `l > 0` and `nums[l - 1] == target`, return `l - 1`.
5. Otherwise, return `-1` (target not found).

<details>
<summary>Example - Dry Run</summary>

Input: nums = [-1, 0, 3, 5, 9, 12], target = 9

The upper bound approach finds the first index where value > target, then checks index - 1.

**Initial Array:**
```markdown
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

Note: R starts at index 6 (past end of array)
```


**Step 1:** L = 0, R = 6, M = 3
```markdown
   L              M                   R
   ↓              ↓                   ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │     (6)
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[3] = 5
  5 <= 9 (target)
  → Move left pointer: L = M + 1 = 4
```


**Step 2:** L = 4, R = 6, M = 5
```markdown
                       L    M        R
                       ↓    ↓        ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │     (6)
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[5] = 12
  12 > 9 (target)
  → Move right pointer: R = M = 5
```


**Step 3:** L = 4, R = 5, M = 4
```markdown
                      L,M   R
                       ↓    ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[4] = 9
  9 <= 9 (target)
  → Move left pointer: L = M + 1 = 5
```


**Final Check:**
```markdown
  L = 5 (upper bound: first index where value > target)
  L - 1 = 4
  nums[4] = 9 == 9 (target) ✓

  Return L - 1 = 4
```


**Result: index 4**

</details>

<br>

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)

        while l < r:
            m = l + ((r - l) // 2)
            if nums[m] > target:
                r = m
            elif nums[m] <= target:
                l = m + 1
        return l - 1 if (l and nums[l - 1] == target) else -1
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length;

        while (l < r) {
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l > 0 && nums[l - 1] == target) ? l - 1 : -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size();

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l > 0 && nums[l - 1] == target) ? l - 1 : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length;

        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l > 0 && nums[l - 1] === target ? l - 1 : -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l > 0 && nums[l - 1] == target) ? l - 1 : -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)

    for l < r {
        m := l + (r-l)/2
        if nums[m] > target {
            r = m
        } else {
            l = m + 1
        }
    }
    if l > 0 && nums[l-1] == target {
        return l - 1
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size

        while (l < r) {
            val m = l + (r - l) / 2
            if (nums[m] > target) {
                r = m
            } else {
                l = m + 1
            }
        }
        return if (l > 0 && nums[l - 1] == target) l - 1 else -1
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0, r = nums.count

        while l < r {
            let m = l + (r - l) / 2
            if nums[m] > target {
                r = m
            } else {
                l = m + 1
            }
        }
        return (l > 0 && nums[l - 1] == target) ? l - 1 : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Lower Bound

### Intuition

Lower bound binary search finds the **first index where a value is greater than or equal to the target**.  
This means if the target exists in the array, this lower-bound index will point exactly to its first occurrence.  
So instead of directly searching for equality, we search for the **leftmost position** where the target *could* appear, then verify it.

This approach is especially useful for sorted arrays because it avoids overshooting and naturally handles duplicates.

### Algorithm

1. Initialize:
   - `l = 0`
   - `r = len(nums)` (right is one past the last index).
2. While `l < r`:
   - Compute midpoint `m`.
   - If `nums[m] >= target`, shrink the search to the left half: `r = m`.
   - Otherwise (`nums[m] < target`), search in the right half: `l = m + 1`.
3. After the loop:
   - `l` is the lower bound: first index where value >= `target`.
4. If `l` is within bounds and `nums[l] == target`, return `l`.
5. Otherwise, return `-1` (the target is not in the array).

<details>
<summary>Example - Dry Run</summary>

Input: nums = [-1, 0, 3, 5, 9, 12], target = 9

The lower bound approach finds the first index where value >= target.

**Initial Array:**
```markdown
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

Note: R starts at index 6 (past end of array)
```


**Step 1:** L = 0, R = 6, M = 3
```markdown
   L              M                   R
   ↓              ↓                   ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │     (6)
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[3] = 5
  5 < 9 (target)
  → Move left pointer: L = M + 1 = 4
```


**Step 2:** L = 4, R = 6, M = 5
```markdown
                       L    M        R
                       ↓    ↓        ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │     (6)
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[5] = 12
  12 >= 9 (target)
  → Move right pointer: R = M = 5
```


**Step 3:** L = 4, R = 5, M = 4
```markdown
                      L,M   R
                       ↓    ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5

  nums[M] = nums[4] = 9
  9 >= 9 (target)
  → Move right pointer: R = M = 4
```


**Final Check:**
```markdown
  L = 4, R = 4 → Loop ends (L == R)
  L = 4 is within bounds (< 6)
  nums[4] = 9 == 9 (target) ✓

  Return L = 4
```


**Result: index 4**

</details>

<br>

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)

        while l < r:
            m = l + ((r - l) // 2)
            if nums[m] >= target:
                r = m
            elif nums[m] < target:
                l = m + 1
        return l if (l < len(nums) and nums[l] == target) else -1
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l < nums.length && nums[l] == target) ? l : -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size();

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l < nums.size() && nums[l] == target) ? l : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length;

        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l < nums.length && nums[l] === target ? l : -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l < nums.Length && nums[l] == target) ? l : -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)

    for l < r {
        m := l + (r-l)/2
        if nums[m] >= target {
            r = m
        } else {
            l = m + 1
        }
    }
    if l < len(nums) && nums[l] == target {
        return l
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size

        while (l < r) {
            val m = l + (r - l) / 2
            if (nums[m] >= target) {
                r = m
            } else {
                l = m + 1
            }
        }
        return if (l < nums.size && nums[l] == target) l else -1
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0, r = nums.count

        while l < r {
            let m = l + (r - l) / 2
            if nums[m] >= target {
                r = m
            } else {
                l = m + 1
            }
        }
        return (l < nums.count && nums[l] == target) ? l : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 5. Built-In Function

<details>
<summary>Example - Dry Run</summary>

Input: nums = [-1, 0, 3, 5, 9, 12], target = 9

Built-in functions abstract the binary search logic. Here is how they work internally:

**Initial Array:**
```markdown
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5
```


**Using Python's `bisect_left` (or similar):**

The function finds the leftmost position where target can be inserted to maintain sorted order.

```markdown
                        ↓
                   bisect_left
                    returns 4
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5
```


**Internal Binary Search (what the built-in does):**

Step 1: L = 0, R = 6, M = 3
```markdown
   L              M                   R
   ↓              ↓                   ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │     (6)
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5
  nums[3] = 5 < 9 → L = 4
```

Step 2: L = 4, R = 6, M = 5
```markdown
                       L    M        R
                       ↓    ↓        ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │     (6)
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5
  nums[5] = 12 >= 9 → R = 5
```

Step 3: L = 4, R = 5, M = 4
```markdown
                      L,M   R
                       ↓    ↓
┌────┬────┬────┬────┬────┬────┐
│ -1 │  0 │  3 │  5 │  9 │ 12 │
└────┴────┴────┴────┴────┴────┘
   0    1    2    3    4    5
  nums[4] = 9 >= 9 → R = 4
```

Loop ends: L = 4


**Verification:**
```markdown
  index = 4
  nums[4] = 9 == 9 (target) ✓

  Return 4
```


**Result: index 4**

</details>

<br>

::tabs-start

```python
import bisect
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        index = bisect.bisect_left(nums, target)
        return index if index < len(nums) and nums[index] == target else -1
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int index = Arrays.binarySearch(nums, target);
        return index >= 0 ? index : -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        auto it = lower_bound(nums.begin(), nums.end(), target);
        return (it != nums.end() && *it == target) ? it - nums.begin() : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        // There is no built in function for JS.
        return nums.indexOf(target);
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int index = Array.BinarySearch(nums, target);
        return index >= 0 ? index : -1;
    }
}
```

```go
func search(nums []int, target int) int {
    index := sort.Search(len(nums), func(i int) bool { return nums[i] >= target })
    if index < len(nums) && nums[index] == target {
        return index
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        val index = nums.binarySearch(target)
        return if (index >= 0) index else -1
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        let index = nums.partitioningIndex { $0 >= target }
        return (index < nums.count && nums[index] == target) ? index : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Integer Overflow When Calculating Mid
Using `(l + r) / 2` can overflow when `l` and `r` are large. Use `l + (r - l) / 2` instead to safely compute the midpoint.
```python
# Wrong: can overflow in some languages
m = (l + r) // 2
# Correct: prevents overflow
m = l + (r - l) // 2
```

### Infinite Loop Due to Wrong Pointer Update
Updating `l = m` instead of `l = m + 1` (or `r = m` instead of `r = m - 1` in some variants) can cause an infinite loop when `l` and `r` are adjacent.

### Off-by-One Errors with Loop Condition
Using `while l <= r` vs `while l < r` changes the behavior significantly. Mixing these up with the wrong pointer updates causes bugs. Be consistent with your chosen template.

### Not Checking if Target Was Actually Found
Binary search converges to a position, but that position might not contain the target. Always verify that `nums[result] == target` before returning the index.
