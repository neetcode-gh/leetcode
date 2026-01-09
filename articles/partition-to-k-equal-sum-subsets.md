## 1. Backtracking

### Intuition

The problem asks whether we can divide the array into exactly `k` subsets, each with the same sum. First, we check if the total sum is divisible by `k`. If not, it's impossible. Otherwise, each subset must sum to `total / k`.

We use backtracking to try placing each number into one of the `k` subsets. Sorting the array in descending order helps us fail faster when a large number cannot fit. Once a subset reaches the target sum, we start building the next one. If we successfully build all `k` subsets, we return true.

### Algorithm

1. Calculate the total sum. If it's not divisible by `k`, return false.
2. Sort the array in descending order for early pruning.
3. Compute `target = total / k`.
4. Use a boolean array `used` to track which elements have been assigned.
5. Define a recursive function `backtrack(i, k, subsetSum)`:
   - If `k == 0`, all subsets are formed, return true.
   - If `subsetSum == target`, start building the next subset with `backtrack(0, k - 1, 0)`.
   - For each unused element from index `i`, try adding it if it doesn't exceed the target.
   - Mark the element as used, recurse, then backtrack by unmarking it.
6. Return the result of `backtrack(0, k, 0)`.

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        if sum(nums) % k != 0:
            return False

        nums.sort(reverse=True)
        target = sum(nums) // k
        used = [False] * len(nums)

        def backtrack(i, k, subsetSum):
            if k == 0:
                return True
            if subsetSum == target:
                return backtrack(0, k - 1, 0)
            for j in range(i, len(nums)):
                if used[j] or subsetSum + nums[j] > target:
                    continue
                used[j] = True
                if backtrack(j + 1, k, subsetSum + nums[j]):
                    return True
                used[j] = False
            return False

        return backtrack(0, k, 0)
```

```java
public class Solution {
    private boolean[] used;
    private int target;
    private int n;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % k != 0) return false;

        this.target = sum / k;
        this.n = nums.length;
        Arrays.sort(nums);
        for (int i = 0; i < n / 2; i++) {
            int tmp = nums[i];
            nums[i] = nums[n - i - 1];
            nums[n - i - 1] = tmp;
        }
        used = new boolean[n];
        return backtrack(nums, k, 0, 0);
    }

    private boolean backtrack(int[] nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < n; i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
        }
        return false;
    }
}
```

```cpp
class Solution {
    vector<bool> used;
    int target;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k != 0) return false;

        target = sum / k;
        sort(nums.rbegin(), nums.rend());
        used.assign(nums.size(), false);
        return backtrack(nums, k, 0, 0);
    }

private:
    bool backtrack(vector<int>& nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < nums.size(); i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    canPartitionKSubsets(nums, k) {
        const sum = nums.reduce((a, b) => a + b, 0);
        if (sum % k !== 0) return false;

        const target = sum / k;
        nums.sort((a, b) => b - a);
        const used = Array(nums.length).fill(false);

        const backtrack = (i, k, subsetSum) => {
            if (k === 0) return true;
            if (subsetSum === target) return backtrack(0, k - 1, 0);

            for (let j = i; j < nums.length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;
                used[j] = true;
                if (backtrack(j + 1, k, subsetSum + nums[j])) return true;
                used[j] = false;
            }
            return false;
        };

        return backtrack(0, k, 0);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int totalSum = nums.Sum();
        if (totalSum % k != 0) return false;

        int target = totalSum / k;
        Array.Sort(nums);
        Array.Reverse(nums);

        bool[] used = new bool[nums.Length];

        bool Backtrack(int i, int kRemaining, int subsetSum) {
            if (kRemaining == 0) return true;
            if (subsetSum == target) return Backtrack(0, kRemaining - 1, 0);

            for (int j = i; j < nums.Length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;

                used[j] = true;
                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j])) return true;
                used[j] = false;
            }

            return false;
        }

        return Backtrack(0, k, 0);
    }
}
```

```go
func canPartitionKSubsets(nums []int, k int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum%k != 0 {
        return false
    }

    target := sum / k
    sort.Sort(sort.Reverse(sort.IntSlice(nums)))
    used := make([]bool, len(nums))

    var backtrack func(i, k, subsetSum int) bool
    backtrack = func(i, k, subsetSum int) bool {
        if k == 0 {
            return true
        }
        if subsetSum == target {
            return backtrack(0, k-1, 0)
        }
        for j := i; j < len(nums); j++ {
            if used[j] || subsetSum+nums[j] > target {
                continue
            }
            used[j] = true
            if backtrack(j+1, k, subsetSum+nums[j]) {
                return true
            }
            used[j] = false
        }
        return false
    }

    return backtrack(0, k, 0)
}
```

```kotlin
class Solution {
    fun canPartitionKSubsets(nums: IntArray, k: Int): Boolean {
        val sum = nums.sum()
        if (sum % k != 0) return false

        val target = sum / k
        nums.sortDescending()
        val used = BooleanArray(nums.size)

        fun backtrack(i: Int, k: Int, subsetSum: Int): Boolean {
            if (k == 0) return true
            if (subsetSum == target) return backtrack(0, k - 1, 0)

            for (j in i until nums.size) {
                if (used[j] || subsetSum + nums[j] > target) continue

                used[j] = true
                if (backtrack(j + 1, k, subsetSum + nums[j])) return true
                used[j] = false
            }

            return false
        }

        return backtrack(0, k, 0)
    }
}
```

```swift
class Solution {
    func canPartitionKSubsets(_ nums: [Int], _ k: Int) -> Bool {
        let sum = nums.reduce(0, +)
        if sum % k != 0 {
            return false
        }

        let target = sum / k
        var nums = nums.sorted(by: >)
        var used = [Bool](repeating: false, count: nums.count)

        func backtrack(_ i: Int, _ k: Int, _ subsetSum: Int) -> Bool {
            if k == 0 {
                return true
            }
            if subsetSum == target {
                return backtrack(0, k - 1, 0)
            }
            for j in i..<nums.count {
                if used[j] || subsetSum + nums[j] > target {
                    continue
                }
                used[j] = true
                if backtrack(j + 1, k, subsetSum + nums[j]) {
                    return true
                }
                used[j] = false
            }
            return false
        }

        return backtrack(0, k, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * 2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the number of subsets.

---

## 2. Backtracking (Pruning)

### Intuition

This approach extends the basic backtracking by adding a key pruning optimization. If we fail to place any element into an empty subset (when `subsetSum == 0`), we know that element cannot be placed anywhere, so the entire configuration is invalid. This avoids redundant exploration of branches that will never succeed.

### Algorithm

1. Calculate the total sum. If it's not divisible by `k`, return false.
2. Sort the array in descending order.
3. Compute `target = total / k`.
4. Track used elements with a boolean array.
5. Define `backtrack(i, k, subsetSum)`:
   - If `k == 0`, return true.
   - If `subsetSum == target`, recurse to build the next subset.
   - For each unused element from index `i`:
     - Skip if adding it exceeds the target.
     - Mark as used and recurse.
     - Backtrack by unmarking.
     - **Pruning**: If `subsetSum == 0` and we failed, return false immediately.
6. Return the result of `backtrack(0, k, 0)`.

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        nums.sort(reverse=True)
        target = total // k
        used = [False] * len(nums)

        def backtrack(i, k, subsetSum):
            if k == 0:
                return True
            if subsetSum == target:
                return backtrack(0, k - 1, 0)
            for j in range(i, len(nums)):
                if used[j] or subsetSum + nums[j] > target:
                    continue
                used[j] = True
                if backtrack(j + 1, k, subsetSum + nums[j]):
                    return True
                used[j] = False

                if subsetSum == 0: # Pruning
                    return False

            return False

        return backtrack(0, k, 0)
```

```java
public class Solution {
    private boolean[] used;
    private int target;
    private int n;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % k != 0) return false;

        this.target = sum / k;
        this.n = nums.length;
        Arrays.sort(nums);
        for (int i = 0; i < n / 2; i++) {
            int tmp = nums[i];
            nums[i] = nums[n - i - 1];
            nums[n - i - 1] = tmp;
        }
        used = new boolean[n];
        return backtrack(nums, k, 0, 0);
    }

    private boolean backtrack(int[] nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < n; i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
            if (currentSum == 0) {  // Pruning
                return false;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
    vector<bool> used;
    int target;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k != 0) return false;

        target = sum / k;
        sort(nums.rbegin(), nums.rend());
        used.assign(nums.size(), false);
        return backtrack(nums, k, 0, 0);
    }

private:
    bool backtrack(vector<int>& nums, int k, int currentSum, int start) {
        if (k == 0) return true;
        if (currentSum == target) return backtrack(nums, k - 1, 0, 0);

        for (int i = start; i < nums.size(); i++) {
            if (used[i] || currentSum + nums[i] > target) continue;
            used[i] = true;
            if (backtrack(nums, k, currentSum + nums[i], i + 1)) return true;
            used[i] = false;
            if (currentSum == 0) {  // Pruning
                return false;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    canPartitionKSubsets(nums, k) {
        const sum = nums.reduce((a, b) => a + b, 0);
        if (sum % k !== 0) return false;

        const target = sum / k;
        nums.sort((a, b) => b - a);
        const used = Array(nums.length).fill(false);

        const backtrack = (i, k, subsetSum) => {
            if (k === 0) return true;
            if (subsetSum === target) return backtrack(0, k - 1, 0);

            for (let j = i; j < nums.length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;
                used[j] = true;
                if (backtrack(j + 1, k, subsetSum + nums[j])) return true;
                used[j] = false;
                if (subsetSum === 0) {
                    // Pruning
                    return false;
                }
            }
            return false;
        };

        return backtrack(0, k, 0);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        Array.Sort(nums);
        Array.Reverse(nums);
        int target = total / k;
        bool[] used = new bool[nums.Length];

        bool Backtrack(int i, int kRemaining, int subsetSum) {
            if (kRemaining == 0) return true;
            if (subsetSum == target) return Backtrack(0, kRemaining - 1, 0);

            for (int j = i; j < nums.Length; j++) {
                if (used[j] || subsetSum + nums[j] > target) continue;

                used[j] = true;
                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j])) return true;
                used[j] = false;

                if (subsetSum == 0) return false; // Pruning
            }

            return false;
        }

        return Backtrack(0, k, 0);
    }
}
```

```go
func canPartitionKSubsets(nums []int, k int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum%k != 0 {
        return false
    }

    target := sum / k
    sort.Sort(sort.Reverse(sort.IntSlice(nums)))
    used := make([]bool, len(nums))

    var backtrack func(i, k, subsetSum int) bool
    backtrack = func(i, k, subsetSum int) bool {
        if k == 0 {
            return true
        }
        if subsetSum == target {
            return backtrack(0, k-1, 0)
        }
        for j := i; j < len(nums); j++ {
            if used[j] || subsetSum+nums[j] > target {
                continue
            }
            used[j] = true
            if backtrack(j+1, k, subsetSum+nums[j]) {
                return true
            }
            used[j] = false
            if subsetSum == 0 { // Pruning
                return false
            }
        }
        return false
    }

    return backtrack(0, k, 0)
}
```

```kotlin
class Solution {
    fun canPartitionKSubsets(nums: IntArray, k: Int): Boolean {
        val total = nums.sum()
        if (total % k != 0) return false

        nums.sortDescending()
        val target = total / k
        val used = BooleanArray(nums.size)

        fun backtrack(i: Int, k: Int, subsetSum: Int): Boolean {
            if (k == 0) return true
            if (subsetSum == target) return backtrack(0, k - 1, 0)

            for (j in i until nums.size) {
                if (used[j] || subsetSum + nums[j] > target) continue

                used[j] = true
                if (backtrack(j + 1, k, subsetSum + nums[j])) return true
                used[j] = false

                if (subsetSum == 0) return false // Pruning
            }

            return false
        }

        return backtrack(0, k, 0)
    }
}
```

```swift
class Solution {
    func canPartitionKSubsets(_ nums: [Int], _ k: Int) -> Bool {
        let total = nums.reduce(0, +)
        if total % k != 0 {
            return false
        }

        var nums = nums.sorted(by: >)
        let target = total / k
        var used = [Bool](repeating: false, count: nums.count)

        func backtrack(_ i: Int, _ k: Int, _ subsetSum: Int) -> Bool {
            if k == 0 {
                return true
            }
            if subsetSum == target {
                return backtrack(0, k - 1, 0)
            }
            for j in i..<nums.count {
                if used[j] || subsetSum + nums[j] > target {
                    continue
                }
                used[j] = true
                if backtrack(j + 1, k, subsetSum + nums[j]) {
                    return true
                }
                used[j] = false
                if subsetSum == 0 { // Pruning
                    return false
                }
            }
            return false
        }

        return backtrack(0, k, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * 2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the number of subsets.

---

## 3. Backtracking (Bit Mask + Pruning)

### Intuition

Instead of using a boolean array to track used elements, we can represent the state as a bitmask. Each bit indicates whether the corresponding element has been used. This representation is more compact and prepares us for memoization in later approaches.

### Algorithm

1. Calculate the total sum. If it's not divisible by `k`, return false.
2. Sort the array in descending order.
3. Compute `target = total / k`.
4. Initialize `mask = (1 << n) - 1` where all bits are set (all elements available).
5. Define `backtrack(i, k, subsetSum, mask)`:
   - If `k == 0`, return true.
   - If `subsetSum == target`, start the next subset with `backtrack(0, k - 1, 0, mask)`.
   - For each element `j` from index `i`:
     - If bit `j` is not set in `mask` or adding `nums[j]` exceeds target, skip.
     - Recurse with the bit cleared: `mask ^ (1 << j)`.
     - If `subsetSum == 0` and we fail, return false (pruning).
6. Return `backtrack(0, k, 0, (1 << n) - 1)`.

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        nums.sort(reverse=True)
        target = total // k
        n = len(nums)

        def backtrack(i, k, subsetSum, mask):
            if k == 0:
                return True
            if subsetSum == target:
                return backtrack(0, k - 1, 0, mask)
            for j in range(i, n):
                if (mask & (1 << j)) == 0 or subsetSum + nums[j] > target:
                    continue
                if backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j)):
                    return True
                if subsetSum == 0:
                    return False
            return False

        return backtrack(0, k, 0, (1 << n) - 1)
```

```java
public class Solution {
    private int target;
    private int n;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % k != 0) return false;

        this.target = total / k;
        this.n = nums.length;
        Arrays.sort(nums);
        reverse(nums);

        return backtrack(nums, 0, k, 0, (1 << this.n) - 1);
    }

    private boolean backtrack(int[] nums, int i, int k, int subsetSum, int mask) {
        if (k == 0) return true;
        if (subsetSum == target) return backtrack(nums, 0, k - 1, 0, mask);
        for (int j = i; j < n; j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                return true;
            }
            if (subsetSum == 0) return false;
        }
        return false;
    }

    private void reverse(int[] nums) {
        int l = 0, r = n - 1;
        while (l < r) {
            int temp = nums[l];
            nums[l++] = nums[r];
            nums[r--] = temp;
        }
    }
}
```

```cpp
class Solution {
    int target, n;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % k != 0) return false;

        target = total / k;
        n = nums.size();
        sort(nums.rbegin(), nums.rend());
        return backtrack(nums, 0, k, 0, (1 << n) - 1);
    }

private:
    bool backtrack(vector<int>& nums, int i, int k, int subsetSum, int mask) {
        if (k == 0) return true;
        if (subsetSum == target) return backtrack(nums, 0, k - 1, 0, mask);
        for (int j = i; j < nums.size(); j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                return true;
            }
            if (subsetSum == 0) return false;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;

        const target = total / k;
        const n = nums.length;
        nums.sort((a, b) => b - a);

        const backtrack = (i, k, subsetSum, mask) => {
            if (k === 0) return true;
            if (subsetSum === target) return backtrack(0, k - 1, 0, mask);
            for (let j = i; j < n; j++) {
                if ((mask & (1 << j)) === 0 || subsetSum + nums[j] > target) {
                    continue;
                }
                if (backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                    return true;
                }
                if (subsetSum === 0) return false;
            }
            return false;
        };

        return backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        Array.Sort(nums);
        Array.Reverse(nums);
        int target = total / k;
        int n = nums.Length;

        bool Backtrack(int i, int kRemaining, int subsetSum, int mask) {
            if (kRemaining == 0) return true;
            if (subsetSum == target) return Backtrack(0, kRemaining - 1, 0, mask);

            for (int j = i; j < n; j++) {
                if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;

                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j], mask ^ (1 << j)))
                    return true;

                if (subsetSum == 0) return false;
            }

            return false;
        }

        return Backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

```go
func canPartitionKSubsets(nums []int, k int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum%k != 0 {
        return false
    }

    target := sum / k
    n := len(nums)
    sort.Sort(sort.Reverse(sort.IntSlice(nums)))

    var backtrack func(i, k, subsetSum, mask int) bool
    backtrack = func(i, k, subsetSum, mask int) bool {
        if k == 0 {
            return true
        }
        if subsetSum == target {
            return backtrack(0, k-1, 0, mask)
        }
        for j := i; j < n; j++ {
            if mask&(1<<j) == 0 || subsetSum+nums[j] > target {
                continue
            }
            if backtrack(j+1, k, subsetSum+nums[j], mask^(1<<j)) {
                return true
            }
            if subsetSum == 0 {
                return false
            }
        }
        return false
    }

    return backtrack(0, k, 0, (1<<n)-1)
}
```

```kotlin
class Solution {
    fun canPartitionKSubsets(nums: IntArray, k: Int): Boolean {
        val total = nums.sum()
        if (total % k != 0) return false

        nums.sortDescending()
        val target = total / k
        val n = nums.size

        fun backtrack(i: Int, k: Int, subsetSum: Int, mask: Int): Boolean {
            if (k == 0) return true
            if (subsetSum == target) return backtrack(0, k - 1, 0, mask)

            for (j in i until n) {
                if (mask and (1 shl j) == 0 || subsetSum + nums[j] > target) continue

                if (backtrack(j + 1, k, subsetSum + nums[j], mask xor (1 shl j)))
                    return true

                if (subsetSum == 0) return false
            }

            return false
        }

        return backtrack(0, k, 0, (1 shl n) - 1)
    }
}
```

```swift
class Solution {
    func canPartitionKSubsets(_ nums: [Int], _ k: Int) -> Bool {
        let total = nums.reduce(0, +)
        if total % k != 0 {
            return false
        }

        var nums = nums.sorted(by: >)
        let target = total / k
        let n = nums.count

        func backtrack(_ i: Int, _ k: Int, _ subsetSum: Int, _ mask: Int) -> Bool {
            if k == 0 {
                return true
            }
            if subsetSum == target {
                return backtrack(0, k - 1, 0, mask)
            }
            for j in i..<n {
                if mask & (1 << j) == 0 || subsetSum + nums[j] > target {
                    continue
                }
                if backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j)) {
                    return true
                }
                if subsetSum == 0 {
                    return false
                }
            }
            return false
        }

        return backtrack(0, k, 0, (1 << n) - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * 2 ^ n)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n)$ for the recursion stack.

> Where $n$ is the size of the array $nums$ and $k$ is the number of subsets.

---

## 4. Dynamic Programming (Top-Down) + Bit Mask

### Intuition

The bitmask from the previous approach naturally lends itself to memoization. Different orderings of element selection can lead to the same `mask`, so we cache results for each mask to avoid recomputation. This transforms the exponential backtracking into a more efficient dynamic programming solution.

### Algorithm

1. Calculate the total sum. If it's not divisible by `k`, return false.
2. Sort the array in descending order.
3. Compute `target = total / k`.
4. Create a memoization array `dp` of size `2^n`, initialized to null/undefined.
5. Define `backtrack(i, k, subsetSum, mask)`:
   - If `dp[mask]` is already computed, return it.
   - If `k == 0`, set `dp[mask] = true` and return.
   - If `subsetSum == target`, recurse for the next subset and cache.
   - For each element from index `i`:
     - Skip if bit not set or would exceed target.
     - Recurse with updated mask.
     - Apply pruning when `subsetSum == 0`.
   - Set `dp[mask] = false` if no valid configuration found.
6. Return `backtrack(0, k, 0, (1 << n) - 1)`.

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        nums.sort(reverse=True)
        target = total // k
        n = len(nums)
        dp = [None] * (1 << n)

        def backtrack(i, k, subsetSum, mask):
            if dp[mask] != None:
                return dp[mask]
            if k == 0:
                dp[mask] = True
                return True
            if subsetSum == target:
                dp[mask] = backtrack(0, k - 1, 0, mask)
                return dp[mask]

            for j in range(i, n):
                if (mask & (1 << j)) == 0 or subsetSum + nums[j] > target:
                    continue
                if backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j)):
                    dp[mask] = True
                    return True
                if subsetSum == 0:
                    dp[mask] = False
                    return dp[mask]
            dp[mask] = False
            return False

        return backtrack(0, k, 0, (1 << n) - 1)
```

```java
public class Solution {
    private int target;
    private int n;
    private Boolean[] dp;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % k != 0) return false;

        this.target = total / k;
        this.n = nums.length;
        Arrays.sort(nums);
        reverse(nums);
        dp = new Boolean[1 << this.n];

        return backtrack(nums, 0, k, 0, (1 << this.n) - 1);
    }

    private boolean backtrack(int[] nums, int i, int k, int subsetSum, int mask) {
        if (dp[mask] != null) return dp[mask];
        if (k == 0) {
            dp[mask] = true;
            return dp[mask];
        }
        if (subsetSum == target) {
            dp[mask] = backtrack(nums, 0, k - 1, 0, mask);
            return dp[mask];
        }
        for (int j = i; j < n; j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                dp[mask] = true;
                return true;
            }
            if (subsetSum == 0) {
                dp[mask] = false;
                return false;
            }
        }
        dp[mask] = false;
        return false;
    }

    private void reverse(int[] nums) {
        int l = 0, r = n - 1;
        while (l < r) {
            int temp = nums[l];
            nums[l++] = nums[r];
            nums[r--] = temp;
        }
    }
}
```

```cpp
class Solution {
    int target, n;
    vector<int> dp;

public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % k != 0) return false;

        target = total / k;
        n = nums.size();
        dp.assign(1 << n, -1);
        sort(nums.rbegin(), nums.rend());
        return backtrack(nums, 0, k, 0, (1 << n) - 1);
    }

private:
    int backtrack(vector<int>& nums, int i, int k, int subsetSum, int mask) {
        if (dp[mask] != -1) return dp[mask];
        if (k == 0) {
            dp[mask] = 1;
            return 1;
        }
        if (subsetSum == target) {
            dp[mask] = backtrack(nums, 0, k - 1, 0, mask);
            return dp[mask];
        }
        for (int j = i; j < nums.size(); j++) {
            if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;
            if (backtrack(nums, j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                dp[mask] = 1;
                return 1;
            }
            if (subsetSum == 0) {
                break;
            }
        }
        dp[mask] = 0;
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;

        const target = total / k;
        const n = nums.length;
        const dp = new Array(1 << n);
        nums.sort((a, b) => b - a);

        const backtrack = (i, k, subsetSum, mask) => {
            if (dp[mask] !== undefined) return dp[mask];
            if (k === 0) {
                dp[mask] = true;
                return true;
            }
            if (subsetSum === target) {
                dp[mask] = backtrack(0, k - 1, 0, mask);
                return dp[mask];
            }
            for (let j = i; j < n; j++) {
                if ((mask & (1 << j)) === 0 || subsetSum + nums[j] > target) {
                    continue;
                }
                if (backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j))) {
                    dp[mask] = true;
                    return true;
                }
                if (subsetSum === 0) break;
            }
            dp[mask] = false;
            return false;
        };

        return backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        Array.Sort(nums);
        Array.Reverse(nums);

        int target = total / k;
        int n = nums.Length;
        bool?[] dp = new bool?[1 << n];

        bool Backtrack(int i, int kRemaining, int subsetSum, int mask) {
            if (dp[mask].HasValue) return (bool)dp[mask];
            if (kRemaining == 0) {
                dp[mask] = true;
                return true;
            }
            if (subsetSum == target) {
                dp[mask] = Backtrack(0, kRemaining - 1, 0, mask);
                return (bool)dp[mask];
            }

            for (int j = i; j < n; j++) {
                if ((mask & (1 << j)) == 0 || subsetSum + nums[j] > target) continue;

                if (Backtrack(j + 1, kRemaining, subsetSum + nums[j], mask ^ (1 << j))) {
                    dp[mask] = true;
                    return true;
                }

                if (subsetSum == 0) {
                    dp[mask] = false;
                    return false;
                }
            }

            dp[mask] = false;
            return false;
        }

        return Backtrack(0, k, 0, (1 << n) - 1);
    }
}
```

```go
func canPartitionKSubsets(nums []int, k int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum%k != 0 {
        return false
    }

    target := sum / k
    n := len(nums)
    sort.Sort(sort.Reverse(sort.IntSlice(nums)))
    dp := make([]int, 1<<n)
    for i := range dp {
        dp[i] = -1
    }

    var backtrack func(i, k, subsetSum, mask int) bool
    backtrack = func(i, k, subsetSum, mask int) bool {
        if dp[mask] != -1 {
            return dp[mask] == 1
        }
        if k == 0 {
            dp[mask] = 1
            return true
        }
        if subsetSum == target {
            result := backtrack(0, k-1, 0, mask)
            if result {
                dp[mask] = 1
            } else {
                dp[mask] = 0
            }
            return result
        }
        for j := i; j < n; j++ {
            if mask&(1<<j) == 0 || subsetSum+nums[j] > target {
                continue
            }
            if backtrack(j+1, k, subsetSum+nums[j], mask^(1<<j)) {
                dp[mask] = 1
                return true
            }
            if subsetSum == 0 {
                break
            }
        }
        dp[mask] = 0
        return false
    }

    return backtrack(0, k, 0, (1<<n)-1)
}
```

```kotlin
class Solution {
    fun canPartitionKSubsets(nums: IntArray, k: Int): Boolean {
        val total = nums.sum()
        if (total % k != 0) return false

        nums.sortDescending()
        val target = total / k
        val n = nums.size
        val dp = arrayOfNulls<Boolean>(1 shl n)

        fun backtrack(i: Int, k: Int, subsetSum: Int, mask: Int): Boolean {
            dp[mask]?.let { return it }
            if (k == 0) {
                dp[mask] = true
                return true
            }
            if (subsetSum == target) {
                dp[mask] = backtrack(0, k - 1, 0, mask)
                return dp[mask]!!
            }

            for (j in i until n) {
                if (mask and (1 shl j) == 0 || subsetSum + nums[j] > target) continue

                if (backtrack(j + 1, k, subsetSum + nums[j], mask xor (1 shl j))) {
                    dp[mask] = true
                    return true
                }

                if (subsetSum == 0) {
                    dp[mask] = false
                    return false
                }
            }

            dp[mask] = false
            return false
        }

        return backtrack(0, k, 0, (1 shl n) - 1)
    }
}
```

```swift
class Solution {
    func canPartitionKSubsets(_ nums: [Int], _ k: Int) -> Bool {
        let total = nums.reduce(0, +)
        if total % k != 0 {
            return false
        }

        var nums = nums.sorted(by: >)
        let target = total / k
        let n = nums.count
        var dp = [Int: Bool]()

        func backtrack(_ i: Int, _ k: Int, _ subsetSum: Int, _ mask: Int) -> Bool {
            if let cached = dp[mask] {
                return cached
            }
            if k == 0 {
                dp[mask] = true
                return true
            }
            if subsetSum == target {
                let result = backtrack(0, k - 1, 0, mask)
                dp[mask] = result
                return result
            }

            for j in i..<n {
                if mask & (1 << j) == 0 || subsetSum + nums[j] > target {
                    continue
                }
                if backtrack(j + 1, k, subsetSum + nums[j], mask ^ (1 << j)) {
                    dp[mask] = true
                    return true
                }
                if subsetSum == 0 {
                    dp[mask] = false
                    return false
                }
            }

            dp[mask] = false
            return false
        }

        return backtrack(0, k, 0, (1 << n) - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(2 ^ n)$

---

## 5. Dynamic Programming (Bottom-Up) + Bit Mask

### Intuition

Instead of recursion, we iterate through all possible masks from `0` to `2^n - 1`. For each valid state (reachable configuration), we try adding each unused element. The key insight is that `dp[mask]` stores the current sum modulo `target`. If we can reach the full mask with sum `0` (meaning all subsets are complete), we have a valid partition.

### Algorithm

1. Calculate the total sum. If it's not divisible by `k`, return false.
2. Compute `target = total / k`.
3. Initialize `dp` array of size `2^n` with `-1`, except `dp[0] = 0`.
4. For each mask from `0` to `2^n - 1`:
   - If `dp[mask] == -1`, this state is unreachable; skip it.
   - For each element `i`:
     - If bit `i` is not set and adding `nums[i]` doesn't exceed target:
       - Set `dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target`.
5. Return true if `dp[(1 << n) - 1] == 0`, meaning all elements are used and the sum completes exactly.

::tabs-start

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k != 0:
            return False

        target = total // k
        n = len(nums)
        N = 1 << n
        dp = [0] + [-1] * (N - 1)

        for mask in range(N):
            if dp[mask] == -1:
                continue
            for i in range(n):
                if (mask & (1 << i)) == 0 and dp[mask] + nums[i] <= target:
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target

        return dp[N - 1] == 0
```

```java
public class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % k != 0) return false;

        int target = total / k;
        int n = nums.length;
        int N = 1 << n;
        int[] dp = new int[N];
        Arrays.fill(dp, -1);
        dp[0] = 0;

        for (int mask = 0; mask < N; mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] == 0;
    }
}
```

```cpp
class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % k != 0) return false;

        int target = total / k;
        int n = nums.size();
        int N = 1 << n;
        vector<int> dp(N, -1);
        dp[0] = 0;

        for (int mask = 0; mask < N; mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    canPartitionKSubsets(nums, k) {
        const total = nums.reduce((a, b) => a + b, 0);
        if (total % k !== 0) return false;

        const target = total / k;
        nums.sort((a, b) => b - a);

        const n = nums.length;
        const N = 1 << n;
        const dp = new Array(N).fill(-1);
        dp[0] = 0;

        for (let mask = 0; mask < N; mask++) {
            if (dp[mask] === -1) continue;
            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) === 0 && dp[mask] + nums[i] <= target) {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] === 0;
    }
}
```

```csharp
public class Solution {
    public bool CanPartitionKSubsets(int[] nums, int k) {
        int total = nums.Sum();
        if (total % k != 0) return false;

        int target = total / k;
        int n = nums.Length;
        int N = 1 << n;
        int[] dp = new int[N];
        for (int i = 1; i < N; i++) {
            dp[i] = -1;
        }

        for (int mask = 0; mask < N; mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {
                    int nextMask = mask | (1 << i);
                    dp[nextMask] = (dp[mask] + nums[i]) % target;
                }
            }
        }

        return dp[N - 1] == 0;
    }
}
```

```go
func canPartitionKSubsets(nums []int, k int) bool {
    sum := 0
    for _, num := range nums {
        sum += num
    }
    if sum%k != 0 {
        return false
    }

    target := sum / k
    n := len(nums)
    N := 1 << n
    dp := make([]int, N)
    for i := 1; i < N; i++ {
        dp[i] = -1
    }

    for mask := 0; mask < N; mask++ {
        if dp[mask] == -1 {
            continue
        }
        for i := 0; i < n; i++ {
            if mask&(1<<i) == 0 && dp[mask]+nums[i] <= target {
                dp[mask|(1<<i)] = (dp[mask] + nums[i]) % target
            }
        }
    }

    return dp[N-1] == 0
}
```

```kotlin
class Solution {
    fun canPartitionKSubsets(nums: IntArray, k: Int): Boolean {
        val total = nums.sum()
        if (total % k != 0) return false

        val target = total / k
        val n = nums.size
        val N = 1 shl n
        val dp = IntArray(N) { -1 }
        dp[0] = 0

        for (mask in 0 until N) {
            if (dp[mask] == -1) continue
            for (i in 0 until n) {
                if (mask and (1 shl i) == 0 && dp[mask] + nums[i] <= target) {
                    dp[mask or (1 shl i)] = (dp[mask] + nums[i]) % target
                }
            }
        }

        return dp[N - 1] == 0
    }
}
```

```swift
class Solution {
    func canPartitionKSubsets(_ nums: [Int], _ k: Int) -> Bool {
        let total = nums.reduce(0, +)
        if total % k != 0 {
            return false
        }

        let target = total / k
        let n = nums.count
        let N = 1 << n
        var dp = [Int](repeating: -1, count: N)
        dp[0] = 0

        for mask in 0..<N {
            if dp[mask] == -1 {
                continue
            }
            for i in 0..<n {
                if mask & (1 << i) == 0 && dp[mask] + nums[i] <= target {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target
                }
            }
        }

        return dp[N - 1] == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(2 ^ n)$
