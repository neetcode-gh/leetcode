## 1. Brute Force

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
