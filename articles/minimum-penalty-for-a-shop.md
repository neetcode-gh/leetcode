## 1. Brute Force

::tabs-start

```python
class Solution:
    def bestClosingTime(self, customers: str) -> int:
        n = len(customers)
        res = n
        minPenalty = n

        for i in range(n + 1):
            penalty = 0
            for j in range(i):
                if customers[j] == 'N':
                    penalty += 1
            for j in range(i, n):
                if customers[j] == 'Y':
                    penalty += 1

            if penalty < minPenalty:
                minPenalty = penalty
                res = i

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int n = customers.length();
        int res = n, minPenalty = n;

        for (int i = 0; i <= n; i++) {
            int penalty = 0;
            for (int j = 0; j < i; j++) {
                if (customers.charAt(j) == 'N') {
                    penalty++;
                }
            }
            for (int j = i; j < n; j++) {
                if (customers.charAt(j) == 'Y') {
                    penalty++;
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int n = customers.size();
        int res = n, minPenalty = n;

        for (int i = 0; i <= n; i++) {
            int penalty = 0;
            for (int j = 0; j < i; j++) {
                if (customers[j] == 'N') {
                    penalty++;
                }
            }
            for (int j = i; j < n; j++) {
                if (customers[j] == 'Y') {
                    penalty++;
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        const n = customers.length;
        let res = n,
            minPenalty = n;

        for (let i = 0; i <= n; i++) {
            let penalty = 0;
            for (let j = 0; j < i; j++) {
                if (customers[j] === 'N') {
                    penalty++;
                }
            }
            for (let j = i; j < n; j++) {
                if (customers[j] === 'Y') {
                    penalty++;
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
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

## 2. Prefix & Suffix

::tabs-start

```python
class Solution:
    def bestClosingTime(self, customers: str) -> int:
        n = len(customers)
        cnt = 0

        prefixN = []
        for c in customers:
            prefixN.append(cnt)
            if c == 'N':
                cnt += 1
        prefixN.append(cnt)

        suffixY = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffixY[i] = suffixY[i + 1]
            if customers[i] == 'Y':
                suffixY[i] += 1

        res = n
        minPenalty = n
        for i in range(n + 1):
            penalty = prefixN[i] + suffixY[i]
            if penalty < minPenalty:
                minPenalty = penalty
                res = i

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int n = customers.length();
        int cnt = 0;

        int[] prefixN = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixN[i] = cnt;
            if (customers.charAt(i) == 'N') {
                cnt++;
            }
        }
        prefixN[n] = cnt;

        int[] suffixY = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffixY[i] = suffixY[i + 1];
            if (customers.charAt(i) == 'Y') {
                suffixY[i]++;
            }
        }

        int res = n, minPenalty = n;
        for (int i = 0; i <= n; i++) {
            int penalty = prefixN[i] + suffixY[i];
            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int n = customers.size(), cnt = 0;

        vector<int> prefixN(n + 1);
        for (int i = 0; i < n; i++) {
            prefixN[i] = cnt;
            if (customers[i] == 'N') {
                cnt++;
            }
        }
        prefixN[n] = cnt;

        vector<int> suffixY(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            suffixY[i] = suffixY[i + 1];
            if (customers[i] == 'Y') {
                suffixY[i]++;
            }
        }

        int res = n, minPenalty = n;
        for (int i = 0; i <= n; i++) {
            int penalty = prefixN[i] + suffixY[i];
            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        const n = customers.length;
        let cnt = 0;

        const prefixN = [];
        for (const c of customers) {
            prefixN.push(cnt);
            if (c === 'N') {
                cnt++;
            }
        }
        prefixN.push(cnt);

        const suffixY = new Array(n + 1).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            suffixY[i] = suffixY[i + 1];
            if (customers[i] === 'Y') {
                suffixY[i]++;
            }
        }

        let res = n,
            minPenalty = n;
        for (let i = 0; i <= n; i++) {
            const penalty = prefixN[i] + suffixY[i];
            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
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
    def bestClosingTime(self, customers: str) -> int:
        cntY = sum(c == "Y" for c in customers)

        minPenalty = cntY
        res = cntN = 0
        for i, c in enumerate(customers):
            if c == "Y":
                cntY -= 1
            else:
                cntN += 1

            penalty = cntN + cntY
            if penalty < minPenalty:
                res = i + 1
                minPenalty = penalty

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int cntY = 0;
        for (char c : customers.toCharArray()) {
            if (c == 'Y') cntY++;
        }

        int minPenalty = cntY, res = 0, cntN = 0;
        for (int i = 0; i < customers.length(); i++) {
            if (customers.charAt(i) == 'Y') {
                cntY--;
            } else {
                cntN++;
            }

            int penalty = cntN + cntY;
            if (penalty < minPenalty) {
                res = i + 1;
                minPenalty = penalty;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int cntY = count(customers.begin(), customers.end(), 'Y');

        int minPenalty = cntY, res = 0, cntN = 0;
        for (int i = 0; i < customers.size(); i++) {
            if (customers[i] == 'Y') {
                cntY--;
            } else {
                cntN++;
            }

            int penalty = cntN + cntY;
            if (penalty < minPenalty) {
                res = i + 1;
                minPenalty = penalty;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        let cntY = 0;
        for (let c of customers) {
            if (c === 'Y') cntY++;
        }

        let minPenalty = cntY,
            res = 0,
            cntN = 0;
        for (let i = 0; i < customers.length; i++) {
            if (customers[i] === 'Y') {
                cntY--;
            } else {
                cntN++;
            }

            const penalty = cntN + cntY;
            if (penalty < minPenalty) {
                res = i + 1;
                minPenalty = penalty;
            }
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
    def bestClosingTime(self, customers: str) -> int:
        res = minPenalty = 0
        penalty = 0

        for i, c in enumerate(customers):
            penalty += 1 if c == 'Y' else -1

            if penalty > minPenalty:
                minPenalty = penalty
                res = i + 1

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int res = 0, minPenalty = 0, penalty = 0;

        for (int i = 0; i < customers.length(); i++) {
            penalty += customers.charAt(i) == 'Y' ? 1 : -1;

            if (penalty > minPenalty) {
                minPenalty = penalty;
                res = i + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int res = 0, minPenalty = 0, penalty = 0;

        for (int i = 0; i < customers.size(); i++) {
            penalty += customers[i] == 'Y' ? 1 : -1;

            if (penalty > minPenalty) {
                minPenalty = penalty;
                res = i + 1;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        let res = 0,
            minPenalty = 0,
            penalty = 0;

        for (let i = 0; i < customers.length; i++) {
            penalty += customers[i] === 'Y' ? 1 : -1;

            if (penalty > minPenalty) {
                minPenalty = penalty;
                res = i + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
