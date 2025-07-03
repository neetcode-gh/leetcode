## 1. Backtracking - I

::tabs-start

```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []

        def backtrack(i, comb):
            if i > n:
                if len(comb) == k:
                    res.append(comb.copy())
                return

            comb.append(i)
            backtrack(i + 1, comb)
            comb.pop()
            backtrack(i + 1, comb)

        backtrack(1, [])
        return res
```

```java
public class Solution {
    private List<List<Integer>> res;

    public List<List<Integer>> combine(int n, int k) {
        res = new ArrayList<>();
        backtrack(1, n, k, new ArrayList<>());
        return res;
    }

    private void backtrack(int i, int n, int k, List<Integer> comb) {
        if (i > n) {
            if (comb.size() == k) {
                res.add(new ArrayList<>(comb));
            }
            return;
        }

        comb.add(i);
        backtrack(i + 1, n, k, comb);
        comb.remove(comb.size() - 1);
        backtrack(i + 1, n, k, comb);
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
public:
    vector<vector<int>> combine(int n, int k) {
        vector<int> comb;
        backtrack(1, n, k, comb);
        return res;
    }

private:
    void backtrack(int i, int n, int k, vector<int>& comb) {
        if (i > n) {
            if (comb.size() == k) {
                res.push_back(comb);
            }
            return;
        }

        comb.push_back(i);
        backtrack(i + 1, n, k, comb);
        comb.pop_back();
        backtrack(i + 1, n, k, comb);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number[][]}
     */
    combine(n, k) {
        const res = [];

        const backtrack = (i, comb) => {
            if (i > n) {
                if (comb.length === k) {
                    res.push([...comb]);
                }
                return;
            }

            comb.push(i);
            backtrack(i + 1, comb);
            comb.pop();
            backtrack(i + 1, comb);
        };

        backtrack(1, []);
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Combine(int n, int k) {
        List<List<int>> res = new List<List<int>>();

        void Backtrack(int i, List<int> comb) {
            if (i > n) {
                if (comb.Count == k) {
                    res.Add(new List<int>(comb));
                }
                return;
            }

            comb.Add(i);
            Backtrack(i + 1, comb);
            comb.RemoveAt(comb.Count - 1);
            Backtrack(i + 1, comb);
        }

        Backtrack(1, new List<int>());
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * \frac {n!}{(n - k)! * k!})$
- Space complexity: $O(k * \frac {n!}{(n - k)! * k!})$ for the output array.

> Where $n$ is the number of elements and $k$ is the number of elements to be picked.

---

## 2. Backtracking - II

::tabs-start

```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []

        def backtrack(start, comb):
            if len(comb) == k:
                res.append(comb.copy())
                return

            for i in range(start, n + 1):
                comb.append(i)
                backtrack(i + 1, comb)
                comb.pop()

        backtrack(1, [])
        return res
```

```java
public class Solution {
    private List<List<Integer>> res;

    public List<List<Integer>> combine(int n, int k) {
        res = new ArrayList<>();
        backtrack(1, n, k, new ArrayList<>());
        return res;
    }

    private void backtrack(int start, int n, int k, List<Integer> comb) {
        if (comb.size() == k) {
            res.add(new ArrayList<>(comb));
            return;
        }

        for (int i = start; i <= n; i++) {
            comb.add(i);
            backtrack(i + 1, n, k, comb);
            comb.remove(comb.size() - 1);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;

    vector<vector<int>> combine(int n, int k) {
        res.clear();
        vector<int> comb;
        backtrack(1, n, k, comb);
        return res;
    }

    void backtrack(int start, int n, int k, vector<int>& comb) {
        if (comb.size() == k) {
            res.push_back(comb);
            return;
        }

        for (int i = start; i <= n; i++) {
            comb.push_back(i);
            backtrack(i + 1, n, k, comb);
            comb.pop_back();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number[][]}
     */
    combine(n, k) {
        const res = [];

        const backtrack = (start, comb) => {
            if (comb.length === k) {
                res.push([...comb]);
                return;
            }

            for (let i = start; i <= n; i++) {
                comb.push(i);
                backtrack(i + 1, comb);
                comb.pop();
            }
        };

        backtrack(1, []);
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Combine(int n, int k) {
        List<List<int>> res = new List<List<int>>();

        void Backtrack(int start, List<int> comb) {
            if (comb.Count == k) {
                res.Add(new List<int>(comb));
                return;
            }

            for (int i = start; i <= n; i++) {
                comb.Add(i);
                Backtrack(i + 1, comb);
                comb.RemoveAt(comb.Count - 1);
            }
        }

        Backtrack(1, new List<int>());
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * \frac {n!}{(n - k)! * k!})$
- Space complexity: $O(k * \frac {n!}{(n - k)! * k!})$ for the output array.

> Where $n$ is the number of elements and $k$ is the number of elements to be picked.

---

## 3. Iteration

::tabs-start

```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []
        i = 0
        comb = [0] * k

        while i >= 0:
            comb[i] += 1
            if comb[i] > n:
                i -= 1
                continue

            if i == k - 1:
                res.append(comb.copy())
            else:
                i += 1
                comb[i] = comb[i - 1]

        return res
```

```java
public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        int[] comb = new int[k];
        int i = 0;

        while (i >= 0) {
            comb[i]++;
            if (comb[i] > n) {
                i--;
                continue;
            }

            if (i == k - 1) {
                List<Integer> current = new ArrayList<>();
                for (int num : comb) {
                    current.add(num);
                }
                res.add(current);
            } else {
                i++;
                comb[i] = comb[i - 1];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> comb(k, 0);
        int i = 0;

        while (i >= 0) {
            comb[i]++;
            if (comb[i] > n) {
                i--;
                continue;
            }

            if (i == k - 1) {
                res.push_back(comb);
            } else {
                i++;
                comb[i] = comb[i - 1];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number[][]}
     */
    combine(n, k) {
        const res = [];
        const comb = Array(k).fill(0);
        let i = 0;

        while (i >= 0) {
            comb[i]++;
            if (comb[i] > n) {
                i--;
                continue;
            }

            if (i === k - 1) {
                res.push([...comb]);
            } else {
                i++;
                comb[i] = comb[i - 1];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Combine(int n, int k) {
        List<List<int>> res = new List<List<int>>();
        int[] comb = new int[k];
        int i = 0;

        while (i >= 0) {
            comb[i]++;
            if (comb[i] > n) {
                i--;
                continue;
            }

            if (i == k - 1) {
                res.Add(new List<int>(comb));
            } else {
                i++;
                comb[i] = comb[i - 1];
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * \frac {n!}{(n - k)! * k!})$
- Space complexity: $O(k * \frac {n!}{(n - k)! * k!})$ for the output array.

> Where $n$ is the number of elements and $k$ is the number of elements to be picked.

---

## 4. Bit Manipulation

::tabs-start

```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []
        for mask in range(1 << n):
            comb = []
            for bit in range(n):
                if mask & (1 << bit):
                    comb.append(bit + 1)

            if len(comb) == k:
                res.append(comb)
        return res
```

```java
public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        for (int mask = 0; mask < (1 << n); mask++) {
            List<Integer> comb = new ArrayList<>();
            for (int bit = 0; bit < n; bit++) {
                if ((mask & (1 << bit)) != 0) {
                    comb.add(bit + 1);
                }
            }
            if (comb.size() == k) {
                res.add(comb);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        for (int mask = 0; mask < (1 << n); ++mask) {
            vector<int> comb;
            for (int bit = 0; bit < n; ++bit) {
                if (mask & (1 << bit)) {
                    comb.push_back(bit + 1);
                }
            }
            if (comb.size() == k) {
                res.push_back(comb);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number[][]}
     */
    combine(n, k) {
        const res = [];
        for (let mask = 0; mask < 1 << n; mask++) {
            if (mask.toString(2).split('1').length - 1 !== k) {
                continue;
            }

            const comb = [];
            for (let bit = 0; bit < n; bit++) {
                if (mask & (1 << bit)) {
                    comb.push(bit + 1);
                }
            }
            res.push(comb);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Combine(int n, int k) {
        List<List<int>> res = new List<List<int>>();

        for (int mask = 0; mask < (1 << n); mask++) {
            List<int> comb = new List<int>();
            for (int bit = 0; bit < n; bit++) {
                if ((mask & (1 << bit)) != 0) {
                    comb.Add(bit + 1);
                }
            }
            if (comb.Count == k) {
                res.Add(comb);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(k * \frac {n!}{(n - k)! * k!})$ for the output array.

> Where $n$ is the number of elements and $k$ is the number of elements to be picked.
