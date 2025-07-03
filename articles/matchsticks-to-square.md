## 1. Backtracking (Brute Force)

::tabs-start

```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        if sum(matchsticks) % 4 != 0:
            return False

        sides = [0] * 4

        def dfs(i):
            if i == len(matchsticks):
                return sides[0] == sides[1] == sides[2] == sides[3]

            for side in range(4):
                sides[side] += matchsticks[i]
                if dfs(i + 1):
                    return True
                sides[side] -= matchsticks[i]

            return False

        return dfs(0)
```

```java
public class Solution {
    public boolean makesquare(int[] matchsticks) {
        int sum = Arrays.stream(matchsticks).sum();
        if (sum % 4 != 0) return false;

        int[] sides = new int[4];
        return dfs(matchsticks, sides, 0);
    }

    private boolean dfs(int[] matchsticks, int[] sides, int i) {
        if (i == matchsticks.length) {
            return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3];
        }

        for (int j = 0; j < 4; j++) {
            sides[j] += matchsticks[i];
            if (dfs(matchsticks, sides, i + 1)) return true;
            sides[j] -= matchsticks[i];
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool makesquare(vector<int>& matchsticks) {
        int sum = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (sum % 4 != 0) return false;

        vector<int> sides(4, 0);
        return dfs(matchsticks, sides, 0);
    }

private:
    bool dfs(vector<int>& matchsticks, vector<int>& sides, int i) {
        if (i == matchsticks.size()) {
            return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3];
        }

        for (int j = 0; j < 4; j++) {
            sides[j] += matchsticks[i];
            if (dfs(matchsticks, sides, i + 1)) return true;
            sides[j] -= matchsticks[i];
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} matchsticks
     * @return {boolean}
     */
    makesquare(matchsticks) {
        const sum = matchsticks.reduce((a, b) => a + b, 0);
        if (sum % 4 !== 0) return false;

        const sides = Array(4).fill(0);
        const dfs = (i) => {
            if (i === matchsticks.length) {
                return (
                    sides[0] === sides[1] &&
                    sides[1] === sides[2] &&
                    sides[2] === sides[3]
                );
            }

            for (let j = 0; j < 4; j++) {
                sides[j] += matchsticks[i];
                if (dfs(i + 1)) return true;
                sides[j] -= matchsticks[i];
            }

            return false;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool Makesquare(int[] matchsticks) {
        int total = 0;
        foreach (int stick in matchsticks) {
            total += stick;
        }
        if (total % 4 != 0) return false;

        int target = total / 4;
        int[] sides = new int[4];

        bool Dfs(int i) {
            if (i == matchsticks.Length) {
                return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3];
            }

            for (int side = 0; side < 4; side++) {
                sides[side] += matchsticks[i];
                if (sides[side] <= target && Dfs(i + 1)) {
                    return true;
                }
                sides[side] -= matchsticks[i];
            }

            return false;
        }

        return Dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Backtracking (Pruning)

::tabs-start

```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total_length = sum(matchsticks)
        if total_length % 4 != 0:
            return False

        length = total_length // 4
        sides = [0] * 4
        matchsticks.sort(reverse=True)

        def dfs(i):
            if i == len(matchsticks):
                return True

            for side in range(4):
                if sides[side] + matchsticks[i] <= length:
                    sides[side] += matchsticks[i]
                    if dfs(i + 1):
                        return True
                    sides[side] -= matchsticks[i]

                if sides[side] == 0:
                    break

            return False

        return dfs(0)
```

```java
public class Solution {
    public boolean makesquare(int[] matchsticks) {
        int totalLength = Arrays.stream(matchsticks).sum();
        if (totalLength % 4 != 0) return false;

        int length = totalLength / 4;
        int[] sides = new int[4];
        Arrays.sort(matchsticks);
        reverse(matchsticks);

        return dfs(matchsticks, sides, 0, length);
    }

    private boolean dfs(int[] matchsticks, int[] sides, int index, int length) {
        if (index == matchsticks.length) {
            return true;
        }

        for (int i = 0; i < 4; i++) {
            if (sides[i] + matchsticks[index] <= length) {
                sides[i] += matchsticks[index];
                if (dfs(matchsticks, sides, index + 1, length)) return true;
                sides[i] -= matchsticks[index];
            }

            if (sides[i] == 0) break;
        }

        return false;
    }

    private void reverse(int[] matchsticks) {
        for (int i = 0, j = matchsticks.length - 1; i < j; i++, j--) {
            int temp = matchsticks[i];
            matchsticks[i] = matchsticks[j];
            matchsticks[j] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    bool makesquare(vector<int>& matchsticks) {
        int totalLength = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (totalLength % 4 != 0) return false;

        int length = totalLength / 4;
        vector<int> sides(4, 0);
        sort(matchsticks.rbegin(), matchsticks.rend());

        return dfs(matchsticks, sides, 0, length);
    }

private:
    bool dfs(vector<int>& matchsticks, vector<int>& sides, int index, int length) {
        if (index == matchsticks.size()) {
            return true;
        }

        for (int i = 0; i < 4; i++) {
            if (sides[i] + matchsticks[index] <= length) {
                sides[i] += matchsticks[index];
                if (dfs(matchsticks, sides, index + 1, length)) return true;
                sides[i] -= matchsticks[index];
            }

            if (sides[i] == 0) break;
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} matchsticks
     * @return {boolean}
     */
    makesquare(matchsticks) {
        const totalLength = matchsticks.reduce((a, b) => a + b, 0);
        if (totalLength % 4 !== 0) return false;

        const length = totalLength / 4;
        const sides = Array(4).fill(0);
        matchsticks.sort((a, b) => b - a);

        const dfs = (index) => {
            if (index === matchsticks.length) {
                return true;
            }

            for (let i = 0; i < 4; i++) {
                if (sides[i] + matchsticks[index] <= length) {
                    sides[i] += matchsticks[index];
                    if (dfs(index + 1)) return true;
                    sides[i] -= matchsticks[index];
                }

                if (sides[i] === 0) break;
            }

            return false;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool Makesquare(int[] matchsticks) {
        int totalLength = 0;
        foreach (int stick in matchsticks) {
            totalLength += stick;
        }

        if (totalLength % 4 != 0) {
            return false;
        }

        int length = totalLength / 4;
        int[] sides = new int[4];
        Array.Sort(matchsticks, (a, b) => b.CompareTo(a)); // Sort in descending order

        bool Dfs(int i) {
            if (i == matchsticks.Length) {
                return true;
            }

            for (int side = 0; side < 4; side++) {
                if (sides[side] + matchsticks[i] <= length) {
                    sides[side] += matchsticks[i];
                    if (Dfs(i + 1)) return true;
                    sides[side] -= matchsticks[i];
                }

                if (sides[side] == 0) break;
            }

            return false;
        }

        return Dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Dynamic Programming (Bit Mask)

::tabs-start

```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total_length = sum(matchsticks)
        if total_length % 4 != 0:
            return False

        length = total_length // 4
        if max(matchsticks) > length:
            return False

        n = len(matchsticks)
        dp = [float("-inf")] * (1 << n)
        matchsticks.sort(reverse=True)

        def dfs(mask):
            if mask == 0:
                return 0
            if dp[mask] != float("-inf"):
                return dp[mask]

            for i in range(n):
                if mask & (1 << i):
                    res = dfs(mask ^ (1 << i))
                    if res >= 0 and res + matchsticks[i] <= length:
                        dp[mask] = (res + matchsticks[i]) % length
                        return dp[mask]
                    if mask == (1 << n) - 1:
                        dp[mask] = -1
                        return -1

            dp[mask] = -1
            return -1

        return not dfs((1 << n) - 1)
```

```java
public class Solution {
    private int[] dp;
    private int length;
    private int n;

    public boolean makesquare(int[] matchsticks) {
        int totalLength = Arrays.stream(matchsticks).sum();
        if (totalLength % 4 != 0) return false;

        length = totalLength / 4;
        if (Arrays.stream(matchsticks).max().getAsInt() > length) {
            return false;
        }

        Arrays.sort(matchsticks);
        reverse(matchsticks);
        this.n = matchsticks.length;
        this.dp = new int[1 << n];
        Arrays.fill(dp, Integer.MIN_VALUE);

        return dfs((1 << n) - 1, matchsticks) == 0;
    }

    private int dfs(int mask, int[] matchsticks) {
        if (mask == 0) return 0;
        if (dp[mask] != Integer.MIN_VALUE) return dp[mask];

        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) {
                int res = dfs(mask ^ (1 << i), matchsticks);
                if (res >= 0 && res + matchsticks[i] <= length) {
                    dp[mask] = (res + matchsticks[i]) % length;
                    return dp[mask];
                }

                if (mask == (1 << n) - 1) {
                    dp[mask] = -1;
                    return -1;
                }
            }
        }

        dp[mask] = -1;
        return dp[mask];
    }

    private void reverse(int[] matchsticks) {
        for (int i = 0, j = matchsticks.length - 1; i < j; i++, j--) {
            int temp = matchsticks[i];
            matchsticks[i] = matchsticks[j];
            matchsticks[j] = temp;
        }
    }
}
```

```cpp
class Solution {
    vector<int> dp;
    int length, n;

public:
    bool makesquare(vector<int>& matchsticks) {
        int totalLength = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (totalLength % 4 != 0) return false;

        length = totalLength / 4;
        if (*max_element(matchsticks.begin(), matchsticks.end()) > length) {
            return false;
        }

        sort(matchsticks.rbegin(), matchsticks.rend());
        n = matchsticks.size();
        dp.resize(1 << n, INT_MIN);

        return dfs((1 << n) - 1, matchsticks) == 0;
    }

private:
    int dfs(int mask, vector<int>& matchsticks) {
        if (mask == 0) return 0;
        if (dp[mask] != INT_MIN) return dp[mask];

        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                int res = dfs(mask ^ (1 << i), matchsticks);
                if (res >= 0 && res + matchsticks[i] <= length) {
                    dp[mask] = (res + matchsticks[i]) % length;
                    return dp[mask];
                }

                if (mask == (1 << n) - 1) {
                    dp[mask] = -1;
                    return -1;
                }
            }
        }

        dp[mask] = -1;
        return dp[mask];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} matchsticks
     * @return {boolean}
     */
    makesquare(matchsticks) {
        const totalLength = matchsticks.reduce((a, b) => a + b, 0);
        if (totalLength % 4 !== 0) return false;

        const length = totalLength / 4;
        if (Math.max(...matchsticks) > length) return false;

        matchsticks.sort((a, b) => b - a);
        const n = matchsticks.length;
        const dp = new Array(1 << n).fill(-Infinity);

        const dfs = (mask) => {
            if (mask === 0) return 0;
            if (dp[mask] !== -Infinity) return dp[mask];

            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    const res = dfs(mask ^ (1 << i));
                    if (res >= 0 && res + matchsticks[i] <= length) {
                        dp[mask] = (res + matchsticks[i]) % length;
                        return dp[mask];
                    }

                    if (mask === (1 << n) - 1) {
                        dp[mask] = -1;
                        return -1;
                    }
                }
            }

            dp[mask] = -1;
            return dp[mask];
        };

        return dfs((1 << n) - 1) === 0;
    }
}
```

```csharp
public class Solution {
    public bool Makesquare(int[] matchsticks) {
        int totalLength = matchsticks.Sum();
        if (totalLength % 4 != 0) return false;

        int length = totalLength / 4;
        if (matchsticks.Max() > length) return false;

        int n = matchsticks.Length;
        int[] dp = Enumerable.Repeat(int.MinValue, 1 << n).ToArray();
        Array.Sort(matchsticks, (a, b) => b.CompareTo(a)); // Sort descending

        int Dfs(int mask) {
            if (mask == 0) return 0;
            if (dp[mask] != int.MinValue) return dp[mask];

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    int res = Dfs(mask ^ (1 << i));
                    if (res >= 0 && res + matchsticks[i] <= length) {
                        dp[mask] = (res + matchsticks[i]) % length;
                        return dp[mask];
                    }
                    if (mask == (1 << n) - 1) {
                        dp[mask] = -1;
                        return -1;
                    }
                }
            }

            dp[mask] = -1;
            return -1;
        }

        return Dfs((1 << n) - 1) != -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n + 2 ^ n)$
