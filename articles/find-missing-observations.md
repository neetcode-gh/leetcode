## 1. Math - I

::tabs-start

```python
class Solution:
    def missingRolls(self, rolls: List[int], mean: int, n: int) -> List[int]:
        m = len(rolls)
        nTotal = (mean * (n + m)) - sum(rolls)

        if nTotal < n or nTotal > n * 6:
            return []

        res = []
        while nTotal:
            dice = min(nTotal - n + 1, 6)
            res.append(dice)
            nTotal -= dice
            n -= 1
        return res
```

```java
public class Solution {
    public int[] missingRolls(int[] rolls, int mean, int n) {
        int m = rolls.length;
        int nTotal = (mean * (n + m)) - Arrays.stream(rolls).sum();

        if (nTotal < n || nTotal > n * 6) {
            return new int[0];
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int dice = Math.min(nTotal - (n - i - 1), 6);
            res[i] = dice;
            nTotal -= dice;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> missingRolls(vector<int>& rolls, int mean, int n) {
        int m = rolls.size();
        int nTotal = (mean * (n + m)) - accumulate(rolls.begin(), rolls.end(), 0);

        if (nTotal < n || nTotal > n * 6) {
            return {};
        }

        vector<int> res;
        for (int i = 0; i < n; ++i) {
            int dice = min(nTotal - (n - i - 1), 6);
            res.push_back(dice);
            nTotal -= dice;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} rolls
     * @param {number} mean
     * @param {number} n
     * @return {number[]}
     */
    missingRolls(rolls, mean, n) {
        const m = rolls.length;
        let nTotal =
            mean * (n + m) - rolls.reduce((sum, roll) => sum + roll, 0);

        if (nTotal < n || nTotal > n * 6) {
            return [];
        }

        const res = [];
        while (nTotal > 0) {
            const dice = Math.min(nTotal - n + 1, 6);
            res.push(dice);
            nTotal -= dice;
            n--;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

> Where $m$ is the size of the array $rolls$ and $n$ is the number of missing observations.

---

## 2. Math - II

::tabs-start

```python
class Solution:
    def missingRolls(self, rolls: List[int], mean: int, n: int) -> List[int]:
        m = len(rolls)
        nTotal = (mean * (n + m)) - sum(rolls)

        if nTotal < n or nTotal > n * 6:
            return []

        avg = nTotal // n
        rem = nTotal - (avg * n)
        return [avg] * (n - rem) + [avg + 1] * rem
```

```java
public class Solution {
    public int[] missingRolls(int[] rolls, int mean, int n) {
        int m = rolls.length;
        int nTotal = (mean * (n + m)) - Arrays.stream(rolls).sum();

        if (nTotal < n || nTotal > n * 6) {
            return new int[0];
        }

        int avg = nTotal / n;
        int rem = nTotal - (avg * n);
        int[] res = new int[n];

        for (int i = 0; i < n - rem; i++) {
            res[i] = avg;
        }
        for (int i = n - rem; i < n; i++) {
            res[i] = avg + 1;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> missingRolls(vector<int>& rolls, int mean, int n) {
        int m = rolls.size();
        int nTotal = (mean * (n + m)) - accumulate(rolls.begin(), rolls.end(), 0);

        if (nTotal < n || nTotal > n * 6) {
            return {};
        }

        int avg = nTotal / n;
        int rem = nTotal - (avg * n);
        vector<int> res;

        for (int i = 0; i < n - rem; ++i) {
            res.push_back(avg);
        }
        for (int i = 0; i < rem; ++i) {
            res.push_back(avg + 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} rolls
     * @param {number} mean
     * @param {number} n
     * @return {number[]}
     */
    missingRolls(rolls, mean, n) {
        const m = rolls.length;
        const nTotal =
            mean * (n + m) - rolls.reduce((sum, roll) => sum + roll, 0);

        if (nTotal < n || nTotal > n * 6) {
            return [];
        }

        const avg = Math.floor(nTotal / n);
        const rem = nTotal - avg * n;
        return Array(n - rem)
            .fill(avg)
            .concat(Array(rem).fill(avg + 1));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

> Where $m$ is the size of the array $rolls$ and $n$ is the number of missing observations.
