## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Prefix & Suffix Arrays

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iteration (Two Pass)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Iteration (One Pass)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
