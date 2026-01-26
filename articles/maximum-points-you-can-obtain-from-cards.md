## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sliding Window Technique** - The key insight is that picking k cards from ends leaves a contiguous window of n-k cards
- **Prefix and Suffix Sums** - Used to compute sums of left and right segments in constant time
- **Two Pointers** - The optimal solution slides a virtual window that wraps around the array ends

---

## 1. Brute Force

### Intuition

Since we can only take cards from the beginning or end, any valid selection forms two contiguous segments: one from the left and one from the right, totaling `k` cards. We can try all possible splits: take `0` from left and `k` from right, take `1` from left and `k-1` from right, and so on.

### Algorithm

1. For each split `left` from `0` to `k`:
   - Compute the sum of the first `left` cards.
   - Compute the sum of the last `k - left` cards.
   - Track the maximum total.
2. Return the maximum sum found.

::tabs-start

```python
class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        n = len(cardPoints)
        res = 0

        for left in range(k + 1):
            leftSum = sum(cardPoints[:left])
            rightSum = sum(cardPoints[n - (k - left):])
            res = max(res, leftSum + rightSum)

        return res
```

```java
public class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;
        int res = 0;

        for (int left = 0; left <= k; left++) {
            int leftSum = 0;
            for (int i = 0; i < left; i++) {
                leftSum += cardPoints[i];
            }

            int rightSum = 0;
            for (int i = n - (k - left); i < n; i++) {
                rightSum += cardPoints[i];
            }

            res = Math.max(res, leftSum + rightSum);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        int res = 0;

        for (int left = 0; left <= k; left++) {
            int leftSum = 0;
            for (int i = 0; i < left; i++) {
                leftSum += cardPoints[i];
            }

            int rightSum = 0;
            for (int i = n - (k - left); i < n; i++) {
                rightSum += cardPoints[i];
            }

            res = max(res, leftSum + rightSum);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cardPoints
     * @param {number} k
     * @return {number}
     */
    maxScore(cardPoints, k) {
        let n = cardPoints.length;
        let res = 0;

        for (let left = 0; left <= k; left++) {
            let leftSum = 0;
            for (let i = 0; i < left; i++) {
                leftSum += cardPoints[i];
            }

            let rightSum = 0;
            for (let i = n - (k - left); i < n; i++) {
                rightSum += cardPoints[i];
            }

            res = Math.max(res, leftSum + rightSum);
        }

        return res;
    }
}
```

```go
func maxScore(cardPoints []int, k int) int {
    n := len(cardPoints)
    res := 0

    for left := 0; left <= k; left++ {
        leftSum := 0
        for i := 0; i < left; i++ {
            leftSum += cardPoints[i]
        }

        rightSum := 0
        for i := n - (k - left); i < n; i++ {
            rightSum += cardPoints[i]
        }

        if leftSum+rightSum > res {
            res = leftSum + rightSum
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxScore(cardPoints: IntArray, k: Int): Int {
        val n = cardPoints.size
        var res = 0

        for (left in 0..k) {
            var leftSum = 0
            for (i in 0 until left) {
                leftSum += cardPoints[i]
            }

            var rightSum = 0
            for (i in n - (k - left) until n) {
                rightSum += cardPoints[i]
            }

            res = maxOf(res, leftSum + rightSum)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ cardPoints: [Int], _ k: Int) -> Int {
        let n = cardPoints.count
        var res = 0

        for left in 0...k {
            var leftSum = 0
            for i in 0..<left {
                leftSum += cardPoints[i]
            }

            var rightSum = 0
            for i in (n - (k - left))..<n {
                rightSum += cardPoints[i]
            }

            res = max(res, leftSum + rightSum)
        }

        return res
    }
}
```

```csharp
public class Solution {
    public int MaxScore(int[] cardPoints, int k) {
        int n = cardPoints.Length;
        int res = 0;

        for (int left = 0; left <= k; left++) {
            int leftSum = 0;
            for (int i = 0; i < left; i++) {
                leftSum += cardPoints[i];
            }

            int rightSum = 0;
            for (int i = n - (k - left); i < n; i++) {
                rightSum += cardPoints[i];
            }

            res = Math.Max(res, leftSum + rightSum);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ 2)$
- Space complexity: $O(1)$ extra space.

> Where $k$ is the number of cards to pick.

---

## 2. Prefix & Suffix Sums

### Intuition

Instead of recomputing sums for each split, we precompute prefix sums (sums from the left) and suffix sums (sums from the right). Then for any split, we can get the total in constant time by combining the appropriate prefix and suffix values.

### Algorithm

1. Build a prefix sum array where `prefix[i]` is the sum of the first `i` cards.
2. Build a suffix sum array where `suffix[i]` is the sum of cards from index `i` to the end.
3. For each split taking `left` cards from the front and `k - left` from the back:
   - Total = `prefix[left] + suffix[n - (k - left)]`.
   - Track the maximum.
4. Return the maximum sum.

::tabs-start

```python
class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        n = len(cardPoints)

        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + cardPoints[i]

        suffix = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix[i] = suffix[i + 1] + cardPoints[i]

        res = 0
        for left in range(k + 1):
            right = k - left
            res = max(res, prefix[left] + suffix[n - right])

        return res
```

```java
public class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;

        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + cardPoints[i];
        }

        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + cardPoints[i];
        }

        int res = 0;
        for (int left = 0; left <= k; left++) {
            int right = k - left;
            res = Math.max(res, prefix[left] + suffix[n - right]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();

        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + cardPoints[i];
        }

        vector<int> suffix(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + cardPoints[i];
        }

        int res = 0;
        for (int left = 0; left <= k; left++) {
            int right = k - left;
            res = max(res, prefix[left] + suffix[n - right]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cardPoints
     * @param {number} k
     * @return {number}
     */
    maxScore(cardPoints, k) {
        let n = cardPoints.length;

        let prefix = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + cardPoints[i];
        }

        let suffix = new Array(n + 1).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + cardPoints[i];
        }

        let res = 0;
        for (let left = 0; left <= k; left++) {
            let right = k - left;
            res = Math.max(res, prefix[left] + suffix[n - right]);
        }

        return res;
    }
}
```

```go
func maxScore(cardPoints []int, k int) int {
    n := len(cardPoints)

    prefix := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefix[i+1] = prefix[i] + cardPoints[i]
    }

    suffix := make([]int, n+1)
    for i := n - 1; i >= 0; i-- {
        suffix[i] = suffix[i+1] + cardPoints[i]
    }

    res := 0
    for left := 0; left <= k; left++ {
        right := k - left
        if prefix[left]+suffix[n-right] > res {
            res = prefix[left] + suffix[n-right]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxScore(cardPoints: IntArray, k: Int): Int {
        val n = cardPoints.size

        val prefix = IntArray(n + 1)
        for (i in 0 until n) {
            prefix[i + 1] = prefix[i] + cardPoints[i]
        }

        val suffix = IntArray(n + 1)
        for (i in n - 1 downTo 0) {
            suffix[i] = suffix[i + 1] + cardPoints[i]
        }

        var res = 0
        for (left in 0..k) {
            val right = k - left
            res = maxOf(res, prefix[left] + suffix[n - right])
        }

        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ cardPoints: [Int], _ k: Int) -> Int {
        let n = cardPoints.count

        var prefix = [Int](repeating: 0, count: n + 1)
        for i in 0..<n {
            prefix[i + 1] = prefix[i] + cardPoints[i]
        }

        var suffix = [Int](repeating: 0, count: n + 1)
        for i in stride(from: n - 1, through: 0, by: -1) {
            suffix[i] = suffix[i + 1] + cardPoints[i]
        }

        var res = 0
        for left in 0...k {
            let right = k - left
            res = max(res, prefix[left] + suffix[n - right])
        }

        return res
    }
}
```

```csharp
public class Solution {
    public int MaxScore(int[] cardPoints, int k) {
        int n = cardPoints.Length;

        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + cardPoints[i];
        }

        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + cardPoints[i];
        }

        int res = 0;
        for (int left = 0; left <= k; left++) {
            int right = k - left;
            res = Math.Max(res, prefix[left] + suffix[n - right]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window (Minimum Sum Window)

### Intuition

If we pick `k` cards total from the ends, we leave behind a contiguous subarray of size `n - k` in the middle. Maximizing the sum of picked cards is equivalent to minimizing the sum of the remaining window. We slide a window of size `n - k` across the array and find its minimum sum.

### Algorithm

1. Calculate the window size as `n - k`.
2. If the window size is `0`, return the total sum of all cards.
3. Slide a window of this size across the array, tracking the minimum window sum.
4. The answer is the total sum minus this minimum window sum.

::tabs-start

```python
class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        n = len(cardPoints)
        windowSize = n - k

        if windowSize == 0:
            return sum(cardPoints)

        total = 0
        minWindowSum = float("inf")
        curSum = 0

        for i in range(n):
            total += cardPoints[i]
            curSum += cardPoints[i]
            if i >= windowSize - 1:
                minWindowSum = min(minWindowSum, curSum)
                curSum -= cardPoints[i - windowSize + 1]

        return total - minWindowSum
```

```java
public class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;
        int windowSize = n - k;

        if (windowSize == 0) {
            int sum = 0;
            for (int num : cardPoints) sum += num;
            return sum;
        }

        int total = 0;
        int minWindowSum = Integer.MAX_VALUE;
        int curSum = 0;

        for (int i = 0; i < n; i++) {
            total += cardPoints[i];
            curSum += cardPoints[i];
            if (i >= windowSize - 1) {
                minWindowSum = Math.min(minWindowSum, curSum);
                curSum -= cardPoints[i - windowSize + 1];
            }
        }

        return total - minWindowSum;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        int windowSize = n - k;

        if (windowSize == 0) {
            return accumulate(cardPoints.begin(), cardPoints.end(), 0);
        }

        int total = 0;
        int minWindowSum = INT_MAX;
        int curSum = 0;

        for (int i = 0; i < n; i++) {
            total += cardPoints[i];
            curSum += cardPoints[i];
            if (i >= windowSize - 1) {
                minWindowSum = min(minWindowSum, curSum);
                curSum -= cardPoints[i - windowSize + 1];
            }
        }

        return total - minWindowSum;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cardPoints
     * @param {number} k
     * @return {number}
     */
    maxScore(cardPoints, k) {
        let n = cardPoints.length;
        let windowSize = n - k;

        if (windowSize === 0) {
            return cardPoints.reduce((sum, num) => sum + num, 0);
        }

        let total = 0;
        let minWindowSum = Infinity;
        let curSum = 0;

        for (let i = 0; i < n; i++) {
            total += cardPoints[i];
            curSum += cardPoints[i];
            if (i >= windowSize - 1) {
                minWindowSum = Math.min(minWindowSum, curSum);
                curSum -= cardPoints[i - windowSize + 1];
            }
        }

        return total - minWindowSum;
    }
}
```

```go
func maxScore(cardPoints []int, k int) int {
    n := len(cardPoints)
    windowSize := n - k

    if windowSize == 0 {
        sum := 0
        for _, v := range cardPoints {
            sum += v
        }
        return sum
    }

    total := 0
    minWindowSum := math.MaxInt32
    curSum := 0

    for i := 0; i < n; i++ {
        total += cardPoints[i]
        curSum += cardPoints[i]
        if i >= windowSize-1 {
            if curSum < minWindowSum {
                minWindowSum = curSum
            }
            curSum -= cardPoints[i-windowSize+1]
        }
    }

    return total - minWindowSum
}
```

```kotlin
class Solution {
    fun maxScore(cardPoints: IntArray, k: Int): Int {
        val n = cardPoints.size
        val windowSize = n - k

        if (windowSize == 0) {
            return cardPoints.sum()
        }

        var total = 0
        var minWindowSum = Int.MAX_VALUE
        var curSum = 0

        for (i in 0 until n) {
            total += cardPoints[i]
            curSum += cardPoints[i]
            if (i >= windowSize - 1) {
                minWindowSum = minOf(minWindowSum, curSum)
                curSum -= cardPoints[i - windowSize + 1]
            }
        }

        return total - minWindowSum
    }
}
```

```swift
class Solution {
    func maxScore(_ cardPoints: [Int], _ k: Int) -> Int {
        let n = cardPoints.count
        let windowSize = n - k

        if windowSize == 0 {
            return cardPoints.reduce(0, +)
        }

        var total = 0
        var minWindowSum = Int.max
        var curSum = 0

        for i in 0..<n {
            total += cardPoints[i]
            curSum += cardPoints[i]
            if i >= windowSize - 1 {
                minWindowSum = min(minWindowSum, curSum)
                curSum -= cardPoints[i - windowSize + 1]
            }
        }

        return total - minWindowSum
    }
}
```

```csharp
public class Solution {
    public int MaxScore(int[] cardPoints, int k) {
        int n = cardPoints.Length;
        int windowSize = n - k;

        if (windowSize == 0) {
            int sum = 0;
            foreach (int x in cardPoints) sum += x;
            return sum;
        }

        int total = 0;
        int minWindowSum = int.MaxValue;
        int curSum = 0;

        for (int i = 0; i < n; i++) {
            total += cardPoints[i];
            curSum += cardPoints[i];

            if (i >= windowSize - 1) {
                minWindowSum = Math.Min(minWindowSum, curSum);
                curSum -= cardPoints[i - windowSize + 1];
            }
        }

        return total - minWindowSum;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Sliding Window

### Intuition

We can directly maintain a sliding window of size `k` that wraps around the array. Start by taking all `k` cards from the right end. Then slide the window: remove one card from the right and add one from the left, tracking the maximum sum as we go.

### Algorithm

1. Initialize the sum by taking the last `k` cards (all from the right).
2. Use two pointers: `l` starting at `0`, `r` starting at `n - k`.
3. Slide the window `k` times:
   - Add `cardPoints[l]` and subtract `cardPoints[r]`.
   - Update the maximum sum.
   - Move both pointers forward.
4. Return the maximum sum found.

::tabs-start

```python
class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        l, r = 0, len(cardPoints) - k
        total = sum(cardPoints[r:])
        res = total

        while r < len(cardPoints):
            total += cardPoints[l] - cardPoints[r]
            res = max(res, total)
            l += 1
            r += 1

        return res
```

```java
public class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int l = 0, r = cardPoints.length - k;
        int total = 0;

        for (int i = r; i < cardPoints.length; i++) {
            total += cardPoints[i];
        }

        int res = total;

        while (r < cardPoints.length) {
            total += cardPoints[l] - cardPoints[r];
            res = Math.max(res, total);
            l++;
            r++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int l = 0, r = cardPoints.size() - k;
        int total = 0;

        for (int i = r; i < cardPoints.size(); i++) {
            total += cardPoints[i];
        }

        int res = total;

        while (r < cardPoints.size()) {
            total += cardPoints[l] - cardPoints[r];
            res = max(res, total);
            l++;
            r++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cardPoints
     * @param {number} k
     * @return {number}
     */
    maxScore(cardPoints, k) {
        let l = 0,
            r = cardPoints.length - k;
        let total = 0;

        for (let i = r; i < cardPoints.length; i++) {
            total += cardPoints[i];
        }

        let res = total;

        while (r < cardPoints.length) {
            total += cardPoints[l] - cardPoints[r];
            res = Math.max(res, total);
            l++;
            r++;
        }

        return res;
    }
}
```

```go
func maxScore(cardPoints []int, k int) int {
    l, r := 0, len(cardPoints)-k
    total := 0

    for i := r; i < len(cardPoints); i++ {
        total += cardPoints[i]
    }

    res := total

    for r < len(cardPoints) {
        total += cardPoints[l] - cardPoints[r]
        if total > res {
            res = total
        }
        l++
        r++
    }

    return res
}
```

```kotlin
class Solution {
    fun maxScore(cardPoints: IntArray, k: Int): Int {
        var l = 0
        var r = cardPoints.size - k
        var total = 0

        for (i in r until cardPoints.size) {
            total += cardPoints[i]
        }

        var res = total

        while (r < cardPoints.size) {
            total += cardPoints[l] - cardPoints[r]
            res = maxOf(res, total)
            l++
            r++
        }

        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ cardPoints: [Int], _ k: Int) -> Int {
        var l = 0
        var r = cardPoints.count - k
        var total = 0

        for i in r..<cardPoints.count {
            total += cardPoints[i]
        }

        var res = total

        while r < cardPoints.count {
            total += cardPoints[l] - cardPoints[r]
            res = max(res, total)
            l += 1
            r += 1
        }

        return res
    }
}
```

```csharp
public class Solution {
    public int MaxScore(int[] cardPoints, int k) {
        int l = 0, r = cardPoints.Length - k;
        int total = 0;
        for (int i = r; i < cardPoints.Length; i++) {
            total += cardPoints[i];
        }
        int res = total;

        while (r < cardPoints.Length) {
            total += cardPoints[l] - cardPoints[r];
            res = Math.Max(res, total);
            l++;
            r++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k)$
- Space complexity: $O(1)$ extra space.

> Where $k$ is the number of cards to pick.

---

## Common Pitfalls

### Treating This as a Standard Two-Pointer Problem

Unlike typical two-pointer problems where pointers move toward each other, this problem requires taking cards from both ends that together form a contiguous "virtual" window. The cards you pick are not contiguous in the original array, which confuses many solvers into incorrect pointer movement logic.

### Off-by-One Errors in Window Boundaries

When using the sliding window approach (finding minimum sum of `n - k` elements), incorrect boundary calculations are common. The window size is `n - k`, not `k`. Additionally, when indexing the right portion of the array, using `n - right` instead of the correct index offset leads to accessing wrong elements.

### Forgetting the Edge Case When k Equals n

When `k` equals the array length, you must take all cards. The sliding window approach would have a window of size 0, which needs special handling to avoid division by zero or invalid array access. Simply return the total sum when `k == n`.
