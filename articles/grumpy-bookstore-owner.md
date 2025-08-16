## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        res, n = 0, len(customers)
        for i in range(n):
            if not grumpy[i]:
                res += customers[i]

        satisfied = res
        for i in range(n - minutes + 1):
            cur = 0
            for j in range(i, i + minutes):
                if grumpy[j]:
                    cur += customers[j]
            res = max(res, satisfied + cur)

        return res
```

```java
public class Solution {
    public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int res = 0, n = customers.length;
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 0) {
                res += customers[i];
            }
        }

        int satisfied = res;
        for (int i = 0; i <= n - minutes; i++) {
            int cur = 0;
            for (int j = i; j < i + minutes; j++) {
                if (grumpy[j] == 1) {
                    cur += customers[j];
                }
            }
            res = Math.max(res, satisfied + cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {
        int res = 0, n = customers.size();
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 0) {
                res += customers[i];
            }
        }

        int satisfied = res;
        for (int i = 0; i <= n - minutes; i++) {
            int cur = 0;
            for (int j = i; j < i + minutes; j++) {
                if (grumpy[j] == 1) {
                    cur += customers[j];
                }
            }
            res = max(res, satisfied + cur);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} customers
     * @param {number[]} grumpy
     * @param {number} minutes
     * @return {number}
     */
    maxSatisfied(customers, grumpy, minutes) {
        let res = 0, n = customers.length;
        for (let i = 0; i < n; i++) {
            if (grumpy[i] === 0) {
                res += customers[i];
            }
        }

        let satisfied = res;
        for (let i = 0; i <= n - minutes; i++) {
            let cur = 0;
            for (let j = i; j < i + minutes; j++) {
                if (grumpy[j] === 1) {
                    cur += customers[j];
                }
            }
            res = Math.max(res, satisfied + cur);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int res = 0, n = customers.Length;
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 0) {
                res += customers[i];
            }
        }

        int satisfied = res;
        for (int i = 0; i <= n - minutes; i++) {
            int cur = 0;
            for (int j = i; j < i + minutes; j++) {
                if (grumpy[j] == 1) {
                    cur += customers[j];
                }
            }
            res = Math.Max(res, satisfied + cur);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(1)$

> Where $n$ is the size of the input array and $m$ is the number of minutes.

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        l = 0
        window = max_window = 0
        satisfied = 0

        for r in range(len(customers)):
            if grumpy[r]:
                window += customers[r]
            else:
                satisfied += customers[r]

            if r - l + 1 > minutes:
                if grumpy[l]:
                    window -= customers[l]
                l += 1

            max_window = max(window, max_window)

        return satisfied + max_window
```

```java
public class Solution {
    public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (int r = 0; r < customers.length; r++) {
            if (grumpy[r] == 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] == 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = Math.max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
}
```

```cpp
class Solution {
public:
    int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {
        int l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (int r = 0; r < customers.size(); r++) {
            if (grumpy[r] == 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] == 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} customers
     * @param {number[]} grumpy
     * @param {number} minutes
     * @return {number}
     */
    maxSatisfied(customers, grumpy, minutes) {
        let l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (let r = 0; r < customers.length; r++) {
            if (grumpy[r] === 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] === 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = Math.max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
}
```

```csharp
public class Solution {
    public int MaxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (int r = 0; r < customers.Length; r++) {
            if (grumpy[r] == 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] == 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = Math.Max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$