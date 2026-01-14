## 1. Brute Force

### Intuition

A valid split requires that the same element is dominant in both the left and right subarrays. The dominant element must appear more than half the time in each part.

The straightforward approach is to try every possible split point and, for each one, count element frequencies in both halves. We then check if any element satisfies the dominance condition on both sides.

### Algorithm

1. Iterate through each potential split index `i` from `0` to `n-2`.
2. For each split, build frequency maps for the left portion (`0` to `i`) and right portion (`i+1` to `n-1`).
3. For each element in the left map, check if its count exceeds half the left length AND its count in the right map exceeds half the right length.
4. Return the first index where both conditions are met.
5. If no valid split exists, return `-1`.

::tabs-start

```python
class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        n = len(nums)

        for i in range(n - 1):
            left_cnt = defaultdict(int)
            for l in range(i + 1):
                left_cnt[nums[l]] += 1

            right_cnt = defaultdict(int)
            for r in range(i + 1, n):
                right_cnt[nums[r]] += 1

            for num in left_cnt:
                if left_cnt[num] > (i + 1) // 2 and right_cnt[num] > (n - i - 1) // 2:
                    return i

        return -1
```

```java
public class Solution {
    public int minimumIndex(List<Integer> nums) {
        int n = nums.size();

        for (int i = 0; i < n - 1; i++) {
            Map<Integer, Integer> leftCnt = new HashMap<>();
            for (int l = 0; l <= i; l++) {
                int val = nums.get(l);
                leftCnt.put(val, leftCnt.getOrDefault(val, 0) + 1);
            }

            Map<Integer, Integer> rightCnt = new HashMap<>();
            for (int r = i + 1; r < n; r++) {
                int val = nums.get(r);
                rightCnt.put(val, rightCnt.getOrDefault(val, 0) + 1);
            }

            for (int num : leftCnt.keySet()) {
                if (leftCnt.get(num) > (i + 1) / 2 && rightCnt.getOrDefault(num, 0) > (n - i - 1) / 2) {
                    return i;
                }
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int minimumIndex(vector<int>& nums) {
        int n = nums.size();

        for (int i = 0; i < n - 1; i++) {
            unordered_map<int, int> leftCnt, rightCnt;
            for (int l = 0; l <= i; l++) {
                leftCnt[nums[l]]++;
            }
            for (int r = i + 1; r < n; r++) {
                rightCnt[nums[r]]++;
            }

            for (auto& [num, cnt] : leftCnt) {
                if (cnt > (i + 1) / 2 && rightCnt[num] > (n - i - 1) / 2) {
                    return i;
                }
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
    minimumIndex(nums) {
        const n = nums.length;

        for (let i = 0; i < n - 1; i++) {
            const leftCnt = {};
            for (let l = 0; l <= i; l++) {
                leftCnt[nums[l]] = (leftCnt[nums[l]] || 0) + 1;
            }

            const rightCnt = {};
            for (let r = i + 1; r < n; r++) {
                rightCnt[nums[r]] = (rightCnt[nums[r]] || 0) + 1;
            }

            for (const num in leftCnt) {
                if (
                    leftCnt[num] > Math.floor((i + 1) / 2) &&
                    (rightCnt[num] || 0) > Math.floor((n - i - 1) / 2)
                ) {
                    return i;
                }
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int MinimumIndex(IList<int> nums) {
        int n = nums.Count;

        for (int i = 0; i < n - 1; i++) {
            Dictionary<int, int> leftCnt = new Dictionary<int, int>();
            for (int l = 0; l <= i; l++) {
                if (!leftCnt.ContainsKey(nums[l])) leftCnt[nums[l]] = 0;
                leftCnt[nums[l]]++;
            }

            Dictionary<int, int> rightCnt = new Dictionary<int, int>();
            for (int r = i + 1; r < n; r++) {
                if (!rightCnt.ContainsKey(nums[r])) rightCnt[nums[r]] = 0;
                rightCnt[nums[r]]++;
            }

            foreach (int num in leftCnt.Keys) {
                int rightVal = rightCnt.ContainsKey(num) ? rightCnt[num] : 0;
                if (leftCnt[num] > (i + 1) / 2 && rightVal > (n - i - 1) / 2) {
                    return i;
                }
            }
        }

        return -1;
    }
}
```

```go
func minimumIndex(nums []int) int {
    n := len(nums)

    for i := 0; i < n-1; i++ {
        leftCnt := make(map[int]int)
        for l := 0; l <= i; l++ {
            leftCnt[nums[l]]++
        }

        rightCnt := make(map[int]int)
        for r := i + 1; r < n; r++ {
            rightCnt[nums[r]]++
        }

        for num, cnt := range leftCnt {
            if cnt > (i+1)/2 && rightCnt[num] > (n-i-1)/2 {
                return i
            }
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun minimumIndex(nums: List<Int>): Int {
        val n = nums.size

        for (i in 0 until n - 1) {
            val leftCnt = mutableMapOf<Int, Int>()
            for (l in 0..i) {
                leftCnt[nums[l]] = leftCnt.getOrDefault(nums[l], 0) + 1
            }

            val rightCnt = mutableMapOf<Int, Int>()
            for (r in i + 1 until n) {
                rightCnt[nums[r]] = rightCnt.getOrDefault(nums[r], 0) + 1
            }

            for ((num, cnt) in leftCnt) {
                if (cnt > (i + 1) / 2 && (rightCnt[num] ?: 0) > (n - i - 1) / 2) {
                    return i
                }
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func minimumIndex(_ nums: [Int]) -> Int {
        let n = nums.count

        for i in 0..<(n - 1) {
            var leftCnt = [Int: Int]()
            for l in 0...i {
                leftCnt[nums[l], default: 0] += 1
            }

            var rightCnt = [Int: Int]()
            for r in (i + 1)..<n {
                rightCnt[nums[r], default: 0] += 1
            }

            for (num, cnt) in leftCnt {
                if cnt > (i + 1) / 2 && (rightCnt[num] ?? 0) > (n - i - 1) / 2 {
                    return i
                }
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Hash Map

### Intuition

Instead of recounting from scratch at each split, we can maintain running counts. Start with all elements in the "right" map, then slide through the array moving one element at a time from right to left.

For each position, we only need to check if the current element is dominant in both parts. This works because if a valid split exists, the overall dominant element must be dominant on both sides.

### Algorithm

1. Initialize a left frequency map (empty) and a right frequency map (containing all elements).
2. Iterate through each index `i`:
   - Move `nums[i]` from right to left (increment left count, decrement right count).
   - Check if `nums[i]` appears more than half the time in both the left segment (length `i+1`) and right segment (length `n-i-1`).
3. Return the first index where the condition holds.
4. Return `-1` if no valid split is found.

::tabs-start

```python
class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        left = defaultdict(int)
        right = Counter(nums)

        for i in range(len(nums)):
            left[nums[i]] += 1
            right[nums[i]] -= 1

            left_len = i + 1
            right_len = len(nums) - i - 1

            if 2 * left[nums[i]] > left_len and 2 * right[nums[i]] > right_len:
                return i

        return -1
```

```java
public class Solution {
    public int minimumIndex(List<Integer> nums) {
        Map<Integer, Integer> left = new HashMap<>();
        Map<Integer, Integer> right = new HashMap<>();
        int n = nums.size();

        for (int num : nums) {
            right.put(num, right.getOrDefault(num, 0) + 1);
        }

        for (int i = 0; i < n; i++) {
            int num = nums.get(i);
            left.put(num, left.getOrDefault(num, 0) + 1);
            right.put(num, right.get(num) - 1);

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * left.get(num) > leftLen && 2 * right.get(num) > rightLen) {
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
    int minimumIndex(vector<int>& nums) {
        unordered_map<int, int> left, right;
        int n = nums.size();

        for (int num : nums) {
            right[num]++;
        }

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            left[num]++;
            right[num]--;

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * left[num] > leftLen && 2 * right[num] > rightLen) {
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
    minimumIndex(nums) {
        const left = {};
        const right = {};
        const n = nums.length;

        for (const num of nums) {
            right[num] = (right[num] || 0) + 1;
        }

        for (let i = 0; i < n; i++) {
            const num = nums[i];
            left[num] = (left[num] || 0) + 1;
            right[num] -= 1;

            const leftLen = i + 1;
            const rightLen = n - i - 1;

            if (2 * left[num] > leftLen && 2 * right[num] > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int MinimumIndex(IList<int> nums) {
        Dictionary<int, int> left = new Dictionary<int, int>();
        Dictionary<int, int> right = new Dictionary<int, int>();
        int n = nums.Count;

        foreach (int num in nums) {
            if (!right.ContainsKey(num)) right[num] = 0;
            right[num]++;
        }

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            if (!left.ContainsKey(num)) left[num] = 0;
            left[num]++;
            right[num]--;

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * left[num] > leftLen && 2 * right[num] > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

```go
func minimumIndex(nums []int) int {
    left := make(map[int]int)
    right := make(map[int]int)
    n := len(nums)

    for _, num := range nums {
        right[num]++
    }

    for i := 0; i < n; i++ {
        num := nums[i]
        left[num]++
        right[num]--

        leftLen := i + 1
        rightLen := n - i - 1

        if 2*left[num] > leftLen && 2*right[num] > rightLen {
            return i
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun minimumIndex(nums: List<Int>): Int {
        val left = mutableMapOf<Int, Int>()
        val right = mutableMapOf<Int, Int>()
        val n = nums.size

        for (num in nums) {
            right[num] = right.getOrDefault(num, 0) + 1
        }

        for (i in 0 until n) {
            val num = nums[i]
            left[num] = left.getOrDefault(num, 0) + 1
            right[num] = right[num]!! - 1

            val leftLen = i + 1
            val rightLen = n - i - 1

            if (2 * left[num]!! > leftLen && 2 * right[num]!! > rightLen) {
                return i
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func minimumIndex(_ nums: [Int]) -> Int {
        var left = [Int: Int]()
        var right = [Int: Int]()
        let n = nums.count

        for num in nums {
            right[num, default: 0] += 1
        }

        for i in 0..<n {
            let num = nums[i]
            left[num, default: 0] += 1
            right[num]! -= 1

            let leftLen = i + 1
            let rightLen = n - i - 1

            if 2 * left[num]! > leftLen && 2 * right[num]! > rightLen {
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

## 3. Boyer-Moore Voting Algorithm

### Intuition

Since the problem guarantees a dominant element exists in the full array, we can first identify it using Boyer-Moore voting. This algorithm finds the majority element in O(n) time and O(1) space by maintaining a candidate and a counter.

Once we know the dominant element, we just need to track its count on each side as we scan through, checking if it remains dominant in both portions at each potential split.

### Algorithm

1. Use Boyer-Moore voting to find the overall dominant element: maintain a candidate and increment/decrement a counter based on matches.
2. Count the total occurrences of this dominant element.
3. Scan through the array, tracking how many times the dominant element appears in the left portion.
4. At each index, check if `2 * leftCount > leftLength` and `2 * rightCount > rightLength`.
5. Return the first index satisfying both conditions, or `-1` if none exists.

::tabs-start

```python
class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        majority = count = 0
        for num in nums:
            if count == 0:
                majority = num
            count += (1 if majority == num else -1)

        left_cnt, right_cnt = 0, nums.count(majority)

        for i in range(len(nums)):
            if nums[i] == majority:
                left_cnt += 1
                right_cnt -= 1

            left_len = i + 1
            right_len = len(nums) - i - 1

            if 2 * left_cnt > left_len and 2 * right_cnt > right_len:
                return i

        return -1
```

```java
public class Solution {
    public int minimumIndex(List<Integer> nums) {
        int majority = 0, count = 0;
        for (int num : nums) {
            if (count == 0) majority = num;
            count += (majority == num) ? 1 : -1;
        }

        int leftCnt = 0, rightCnt = 0;
        for (int num : nums) {
            if (num == majority) rightCnt++;
        }

        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (nums.get(i) == majority) {
                leftCnt++;
                rightCnt--;
            }

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
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
    int minimumIndex(vector<int>& nums) {
        int majority = 0, count = 0;
        for (int num : nums) {
            if (count == 0) majority = num;
            count += (num == majority ? 1 : -1);
        }

        int leftCnt = 0, rightCnt = count_if(nums.begin(), nums.end(),
                                             [&](int x) { return x == majority; });

        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (nums[i] == majority) {
                leftCnt++;
                rightCnt--;
            }

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
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
    minimumIndex(nums) {
        let majority = 0,
            count = 0;
        for (let num of nums) {
            if (count === 0) majority = num;
            count += num === majority ? 1 : -1;
        }

        let leftCnt = 0;
        let rightCnt = nums.filter((x) => x === majority).length;
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (nums[i] === majority) {
                leftCnt++;
                rightCnt--;
            }

            let leftLen = i + 1;
            let rightLen = n - i - 1;

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int MinimumIndex(IList<int> nums) {
        int majority = 0, count = 0;
        foreach (int num in nums) {
            if (count == 0) majority = num;
            count += (majority == num) ? 1 : -1;
        }

        int leftCnt = 0, rightCnt = 0;
        foreach (int num in nums) {
            if (num == majority) rightCnt++;
        }

        int n = nums.Count;
        for (int i = 0; i < n; i++) {
            if (nums[i] == majority) {
                leftCnt++;
                rightCnt--;
            }

            int leftLen = i + 1;
            int rightLen = n - i - 1;

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
                return i;
            }
        }

        return -1;
    }
}
```

```go
func minimumIndex(nums []int) int {
    majority, count := 0, 0
    for _, num := range nums {
        if count == 0 {
            majority = num
        }
        if num == majority {
            count++
        } else {
            count--
        }
    }

    leftCnt, rightCnt := 0, 0
    for _, num := range nums {
        if num == majority {
            rightCnt++
        }
    }

    n := len(nums)
    for i := 0; i < n; i++ {
        if nums[i] == majority {
            leftCnt++
            rightCnt--
        }

        leftLen := i + 1
        rightLen := n - i - 1

        if 2*leftCnt > leftLen && 2*rightCnt > rightLen {
            return i
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun minimumIndex(nums: List<Int>): Int {
        var majority = 0
        var count = 0
        for (num in nums) {
            if (count == 0) majority = num
            count += if (majority == num) 1 else -1
        }

        var leftCnt = 0
        var rightCnt = nums.count { it == majority }

        val n = nums.size
        for (i in 0 until n) {
            if (nums[i] == majority) {
                leftCnt++
                rightCnt--
            }

            val leftLen = i + 1
            val rightLen = n - i - 1

            if (2 * leftCnt > leftLen && 2 * rightCnt > rightLen) {
                return i
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func minimumIndex(_ nums: [Int]) -> Int {
        var majority = 0, count = 0
        for num in nums {
            if count == 0 { majority = num }
            count += (num == majority ? 1 : -1)
        }

        var leftCnt = 0
        var rightCnt = nums.filter { $0 == majority }.count

        let n = nums.count
        for i in 0..<n {
            if nums[i] == majority {
                leftCnt += 1
                rightCnt -= 1
            }

            let leftLen = i + 1
            let rightLen = n - i - 1

            if 2 * leftCnt > leftLen && 2 * rightCnt > rightLen {
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
- Space complexity: $O(1)$

---

## Common Pitfalls

### Confusing Majority with Most Frequent

The dominant element must appear more than half the time, not just be the most frequent. An element appearing exactly `n/2` times is not dominant. The condition is strictly greater than, so always use `count > length / 2` rather than `>=`.

### Off-by-One Errors in Split Length Calculation

When splitting at index `i`, the left segment has length `i + 1` and the right segment has length `n - i - 1`. Mixing up these lengths or using `i` instead of `i + 1` for the left length leads to incorrect dominance checks and wrong answers.

### Not Recognizing That Only the Global Dominant Can Work

A valid split requires the same element to dominate both halves. This element must also dominate the entire array. Checking all elements at each split point is wasteful; instead, identify the global dominant element first and only track its counts during the split search.
