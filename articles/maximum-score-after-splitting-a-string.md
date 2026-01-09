## 1. Brute Force

### Intuition

The score at any split point is the sum of zeros in the left substring plus the sum of ones in the right substring. The simplest approach is to try every valid split position and count directly. For each split, we scan the left portion to count zeros and the right portion to count ones, then track the maximum score found.

### Algorithm

1. Iterate through each valid split position `i` from index 1 to n-1 (both substrings must be non-empty).
2. For each split position:
   - Count zeros in the left substring (indices 0 to i-1).
   - Count ones in the right substring (indices i to n-1).
   - Calculate the score as the sum of these two counts.
3. Track and return the maximum score across all split positions.

::tabs-start

```python
class Solution:
    def maxScore(self, s: str) -> int:
        n, res = len(s), 0
        for i in range(1, n):
            left_zero = 0
            for j in range(i):
                if s[j] == '0':
                    left_zero += 1
            right_one = 0
            for j in range(i, n):
                if s[j] == '1':
                    right_one += 1
            res = max(res, left_zero + right_one)
        return res
```

```java
public class Solution {
    public int maxScore(String s) {
        int n = s.length(), res = 0;
        for (int i = 1; i < n; i++) {
            int leftZero = 0, rightOne = 0;
            for (int j = 0; j < i; j++) {
                if (s.charAt(j) == '0') {
                    leftZero++;
                }
            }
            for (int j = i; j < n; j++) {
                if (s.charAt(j) == '1') {
                    rightOne++;
                }
            }
            res = Math.max(res, leftZero + rightOne);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(string s) {
        int n = s.size(), res = 0;
        for (int i = 1; i < n; i++) {
            int leftZero = 0, rightOne = 0;
            for (int j = 0; j < i; j++) {
                if (s[j] == '0') {
                    leftZero++;
                }
            }
            for (int j = i; j < n; j++) {
                if (s[j] == '1') {
                    rightOne++;
                }
            }
            res = max(res, leftZero + rightOne);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxScore(s) {
        const n = s.length;
        let res = 0;
        for (let i = 1; i < n; i++) {
            let leftZero = 0,
                rightOne = 0;
            for (let j = 0; j < i; j++) {
                if (s[j] === '0') {
                    leftZero++;
                }
            }
            for (let j = i; j < n; j++) {
                if (s[j] === '1') {
                    rightOne++;
                }
            }
            res = Math.max(res, leftZero + rightOne);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxScore(string s) {
        int n = s.Length, res = 0;
        for (int i = 1; i < n; i++) {
            int leftZero = 0, rightOne = 0;
            for (int j = 0; j < i; j++) {
                if (s[j] == '0') leftZero++;
            }
            for (int j = i; j < n; j++) {
                if (s[j] == '1') rightOne++;
            }
            res = Math.Max(res, leftZero + rightOne);
        }
        return res;
    }
}
```

```go
func maxScore(s string) int {
    n := len(s)
    res := 0
    for i := 1; i < n; i++ {
        leftZero, rightOne := 0, 0
        for j := 0; j < i; j++ {
            if s[j] == '0' {
                leftZero++
            }
        }
        for j := i; j < n; j++ {
            if s[j] == '1' {
                rightOne++
            }
        }
        if leftZero+rightOne > res {
            res = leftZero + rightOne
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxScore(s: String): Int {
        val n = s.length
        var res = 0
        for (i in 1 until n) {
            var leftZero = 0
            var rightOne = 0
            for (j in 0 until i) {
                if (s[j] == '0') leftZero++
            }
            for (j in i until n) {
                if (s[j] == '1') rightOne++
            }
            res = maxOf(res, leftZero + rightOne)
        }
        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var res = 0
        for i in 1..<n {
            var leftZero = 0, rightOne = 0
            for j in 0..<i {
                if chars[j] == "0" { leftZero += 1 }
            }
            for j in i..<n {
                if chars[j] == "1" { rightOne += 1 }
            }
            res = max(res, leftZero + rightOne)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Prefix & Suffix Arrays

### Intuition

Instead of recounting zeros and ones for every split position, we can precompute cumulative counts. A prefix array stores the count of zeros up to each index, while a suffix array stores the count of ones from each index to the end. This way, evaluating any split becomes an O(1) lookup.

### Algorithm

1. Build a prefix array `left_zero` where `left_zero[i]` holds the count of zeros from index 0 to i.
2. Build a suffix array `right_one` where `right_one[i]` holds the count of ones from index i to n-1.
3. For each valid split position i (from 1 to n-1):
   - The score is `left_zero[i-1] + right_one[i]`.
4. Return the maximum score found.

::tabs-start

```python
class Solution:
    def maxScore(self, s: str) -> int:
        n = len(s)
        left_zero = [0] * n
        right_one = [0] * n

        if s[0] == '0':
            left_zero[0] = 1
        for i in range(1, n):
            left_zero[i] = left_zero[i - 1]
            if s[i] == '0':
                left_zero[i] += 1

        if s[n - 1] == '1':
            right_one[n - 1] = 1
        for i in range(n - 2, -1, -1):
            right_one[i] = right_one[i + 1]
            if s[i] == '1':
                right_one[i] += 1

        res = 0
        for i in range(1, n):
            res = max(res, left_zero[i - 1] + right_one[i])
        return res
```

```java
public class Solution {
    public int maxScore(String s) {
        int n = s.length();
        int[] leftZero = new int[n];
        int[] rightOne = new int[n];

        if (s.charAt(0) == '0') {
            leftZero[0] = 1;
        }
        for (int i = 1; i < n; i++) {
            leftZero[i] = leftZero[i - 1];
            if (s.charAt(i) == '0') {
                leftZero[i]++;
            }
        }

        if (s.charAt(n - 1) == '1') {
            rightOne[n - 1] = 1;
        }
        for (int i = n - 2; i >= 0; i--) {
            rightOne[i] = rightOne[i + 1];
            if (s.charAt(i) == '1') {
                rightOne[i]++;
            }
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            res = Math.max(res, leftZero[i - 1] + rightOne[i]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(string s) {
        int n = s.size();
        vector<int> leftZero(n, 0), rightOne(n, 0);

        if (s[0] == '0') {
            leftZero[0] = 1;
        }
        for (int i = 1; i < n; i++) {
            leftZero[i] = leftZero[i - 1];
            if (s[i] == '0') {
                leftZero[i]++;
            }
        }

        if (s[n - 1] == '1') {
            rightOne[n - 1] = 1;
        }
        for (int i = n - 2; i >= 0; i--) {
            rightOne[i] = rightOne[i + 1];
            if (s[i] == '1') {
                rightOne[i]++;
            }
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            res = max(res, leftZero[i - 1] + rightOne[i]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxScore(s) {
        const n = s.length;
        let leftZero = new Array(n).fill(0);
        let rightOne = new Array(n).fill(0);

        if (s[0] === '0') {
            leftZero[0] = 1;
        }
        for (let i = 1; i < n; i++) {
            leftZero[i] = leftZero[i - 1];
            if (s[i] === '0') {
                leftZero[i]++;
            }
        }

        if (s[n - 1] === '1') {
            rightOne[n - 1] = 1;
        }
        for (let i = n - 2; i >= 0; i--) {
            rightOne[i] = rightOne[i + 1];
            if (s[i] === '1') {
                rightOne[i]++;
            }
        }

        let res = 0;
        for (let i = 1; i < n; i++) {
            res = Math.max(res, leftZero[i - 1] + rightOne[i]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxScore(string s) {
        int n = s.Length;
        int[] leftZero = new int[n];
        int[] rightOne = new int[n];

        if (s[0] == '0') leftZero[0] = 1;
        for (int i = 1; i < n; i++) {
            leftZero[i] = leftZero[i - 1];
            if (s[i] == '0') leftZero[i]++;
        }

        if (s[n - 1] == '1') rightOne[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--) {
            rightOne[i] = rightOne[i + 1];
            if (s[i] == '1') rightOne[i]++;
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            res = Math.Max(res, leftZero[i - 1] + rightOne[i]);
        }
        return res;
    }
}
```

```go
func maxScore(s string) int {
    n := len(s)
    leftZero := make([]int, n)
    rightOne := make([]int, n)

    if s[0] == '0' {
        leftZero[0] = 1
    }
    for i := 1; i < n; i++ {
        leftZero[i] = leftZero[i-1]
        if s[i] == '0' {
            leftZero[i]++
        }
    }

    if s[n-1] == '1' {
        rightOne[n-1] = 1
    }
    for i := n - 2; i >= 0; i-- {
        rightOne[i] = rightOne[i+1]
        if s[i] == '1' {
            rightOne[i]++
        }
    }

    res := 0
    for i := 1; i < n; i++ {
        if leftZero[i-1]+rightOne[i] > res {
            res = leftZero[i-1] + rightOne[i]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxScore(s: String): Int {
        val n = s.length
        val leftZero = IntArray(n)
        val rightOne = IntArray(n)

        if (s[0] == '0') leftZero[0] = 1
        for (i in 1 until n) {
            leftZero[i] = leftZero[i - 1]
            if (s[i] == '0') leftZero[i]++
        }

        if (s[n - 1] == '1') rightOne[n - 1] = 1
        for (i in n - 2 downTo 0) {
            rightOne[i] = rightOne[i + 1]
            if (s[i] == '1') rightOne[i]++
        }

        var res = 0
        for (i in 1 until n) {
            res = maxOf(res, leftZero[i - 1] + rightOne[i])
        }
        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var leftZero = [Int](repeating: 0, count: n)
        var rightOne = [Int](repeating: 0, count: n)

        if chars[0] == "0" { leftZero[0] = 1 }
        for i in 1..<n {
            leftZero[i] = leftZero[i - 1]
            if chars[i] == "0" { leftZero[i] += 1 }
        }

        if chars[n - 1] == "1" { rightOne[n - 1] = 1 }
        for i in stride(from: n - 2, through: 0, by: -1) {
            rightOne[i] = rightOne[i + 1]
            if chars[i] == "1" { rightOne[i] += 1 }
        }

        var res = 0
        for i in 1..<n {
            res = max(res, leftZero[i - 1] + rightOne[i])
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iteration (Two Pass)

### Intuition

We can avoid storing full arrays by maintaining running counts. First, count all ones in the string. Then iterate through the string, incrementing zeros and decrementing ones as we move the split point. At each position, the current counts represent exactly what we need for the score calculation.

### Algorithm

1. Count the total number of ones in the string.
2. Initialize `zero = 0` to track zeros seen so far.
3. Iterate from index 0 to n-2 (last valid split position):
   - If the current character is '0', increment `zero`.
   - Otherwise, decrement `one` (this one moves from right to left portion).
   - Update the result with `zero + one`.
4. Return the maximum score.

::tabs-start

```python
class Solution:
    def maxScore(self, s: str) -> int:
        zero = 0
        one = s.count('1')
        res = 0

        for i in range(len(s) - 1):
            if s[i] == '0':
                zero += 1
            else:
                one -= 1
            res = max(res, zero + one)

        return res
```

```java
public class Solution {
    public int maxScore(String s) {
        int zero = 0, one = 0, res = 0;

        for (char c : s.toCharArray()) {
            if (c == '1') {
                one++;
            }
        }

        for (int i = 0; i < s.length() - 1; i++) {
            if (s.charAt(i) == '0') {
                zero++;
            } else {
                one--;
            }
            res = Math.max(res, zero + one);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(string s) {
        int zero = 0, one = 0, res = 0;

        for (char c : s) {
            if (c == '1') {
                one++;
            }
        }

        for (int i = 0; i < s.size() - 1; i++) {
            if (s[i] == '0') {
                zero++;
            } else {
                one--;
            }
            res = max(res, zero + one);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxScore(s) {
        let zero = 0,
            one = 0,
            res = 0;

        for (const c of s) {
            if (c === '1') {
                one++;
            }
        }

        for (let i = 0; i < s.length - 1; i++) {
            if (s[i] === '0') {
                zero++;
            } else {
                one--;
            }
            res = Math.max(res, zero + one);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxScore(string s) {
        int zero = 0, one = 0, res = 0;

        foreach (char c in s) {
            if (c == '1') one++;
        }

        for (int i = 0; i < s.Length - 1; i++) {
            if (s[i] == '0') zero++;
            else one--;
            res = Math.Max(res, zero + one);
        }

        return res;
    }
}
```

```go
func maxScore(s string) int {
    zero, one, res := 0, 0, 0

    for _, c := range s {
        if c == '1' {
            one++
        }
    }

    for i := 0; i < len(s)-1; i++ {
        if s[i] == '0' {
            zero++
        } else {
            one--
        }
        if zero+one > res {
            res = zero + one
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxScore(s: String): Int {
        var zero = 0
        var one = s.count { it == '1' }
        var res = 0

        for (i in 0 until s.length - 1) {
            if (s[i] == '0') zero++
            else one--
            res = maxOf(res, zero + one)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ s: String) -> Int {
        let chars = Array(s)
        var zero = 0
        var one = chars.filter { $0 == "1" }.count
        var res = 0

        for i in 0..<(chars.count - 1) {
            if chars[i] == "0" {
                zero += 1
            } else {
                one -= 1
            }
            res = max(res, zero + one)
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

## 4. Iteration (One Pass)

### Intuition

We can derive a single-pass solution using algebra. The score at position i equals `left_zeros + right_ones`. Since `right_ones = total_ones - left_ones`, the score becomes `left_zeros + total_ones - left_ones`, or equivalently `total_ones + (left_zeros - left_ones)`. Since `total_ones` is constant, we only need to maximize `(left_zeros - left_ones)` while iterating, then add the total ones at the end.

### Algorithm

1. Process the first character to initialize `zeros` and `ones` counters.
2. Iterate from index 1 to n-1:
   - Update the maximum of `(zeros - ones)` before processing the current character.
   - Update counters based on whether the current character is '0' or '1'.
3. Return `result + ones` (where `ones` now contains the total count).

::tabs-start

```python
class Solution:
    def maxScore(self, s: str) -> int:
        # res = Max of all (left_zeros + right_ones)
        # res = Max of all (left_zeros + (total_ones - left_ones))
        # res = total_ones (constant) + Max of all (left_zeros - left_ones)

        zeros = 0
        ones = 0

        if s[0] == '0':
            zeros += 1
        else:
            ones += 1

        res = float('-inf')
        for i in range(1, len(s)):
            res = max(res, zeros - ones)
            if s[i] == '0':
                zeros += 1
            else:
                ones += 1

        return res + ones
```

```java
public class Solution {
    public int maxScore(String s) {
        // res = Max of all (leftZeros + rightOnes)
        // res = Max of all (leftZeros + (totalOnes - leftOnes))
        // res = totalOnes (constant) + Max of all (leftZeros - leftOnes)

        int zeros = 0, ones = 0, res = Integer.MIN_VALUE;

        if (s.charAt(0) == '0') {
            zeros++;
        } else {
            ones++;
        }

        for (int i = 1; i < s.length(); i++) {
            res = Math.max(res, zeros - ones);
            if (s.charAt(i) == '0') {
                zeros++;
            } else {
                ones++;
            }
        }

        return res + ones;
    }
}
```

```cpp
class Solution {
public:
    int maxScore(string s) {
        // res = Max of all (leftZeros + rightOnes)
        // res = Max of all (leftZeros + (totalOnes - leftOnes))
        // res = totalOnes (constant) + Max of all (leftZeros - leftOnes)

        int zeros = 0, ones = 0, res = INT_MIN;

        if (s[0] == '0') {
            zeros++;
        } else {
            ones++;
        }

        for (int i = 1; i < s.size(); i++) {
            res = max(res, zeros - ones);
            if (s[i] == '0') {
                zeros++;
            } else {
                ones++;
            }
        }

        return res + ones;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxScore(s) {
        // res = Max of all (leftZeros + rightOnes)
        // res = Max of all (leftZeros + (totalOnes - leftOnes))
        // res = totalOnes (constant) + Max of all (leftZeros - leftOnes)

        let zeros = 0,
            ones = 0,
            res = -Infinity;

        if (s[0] === '0') {
            zeros++;
        } else {
            ones++;
        }

        for (let i = 1; i < s.length; i++) {
            res = Math.max(res, zeros - ones);
            if (s[i] === '0') {
                zeros++;
            } else {
                ones++;
            }
        }

        return res + ones;
    }
}
```

```csharp
public class Solution {
    public int MaxScore(string s) {
        int zeros = 0, ones = 0, res = int.MinValue;

        if (s[0] == '0') zeros++;
        else ones++;

        for (int i = 1; i < s.Length; i++) {
            res = Math.Max(res, zeros - ones);
            if (s[i] == '0') zeros++;
            else ones++;
        }

        return res + ones;
    }
}
```

```go
func maxScore(s string) int {
    zeros, ones := 0, 0
    res := -1 << 31

    if s[0] == '0' {
        zeros++
    } else {
        ones++
    }

    for i := 1; i < len(s); i++ {
        if zeros-ones > res {
            res = zeros - ones
        }
        if s[i] == '0' {
            zeros++
        } else {
            ones++
        }
    }

    return res + ones
}
```

```kotlin
class Solution {
    fun maxScore(s: String): Int {
        var zeros = 0
        var ones = 0
        var res = Int.MIN_VALUE

        if (s[0] == '0') zeros++ else ones++

        for (i in 1 until s.length) {
            res = maxOf(res, zeros - ones)
            if (s[i] == '0') zeros++ else ones++
        }

        return res + ones
    }
}
```

```swift
class Solution {
    func maxScore(_ s: String) -> Int {
        let chars = Array(s)
        var zeros = 0, ones = 0
        var res = Int.min

        if chars[0] == "0" { zeros += 1 } else { ones += 1 }

        for i in 1..<chars.count {
            res = max(res, zeros - ones)
            if chars[i] == "0" { zeros += 1 } else { ones += 1 }
        }

        return res + ones
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
