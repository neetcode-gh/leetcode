## 1. Brute Force

::tabs-start

```python
class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        res = []

        for s in spells:
            cnt = 0
            for p in potions:
                if s * p >= success:
                    cnt += 1
            res.append(cnt)

        return res
```

```java
public class Solution {
    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        int[] res = new int[spells.length];

        for (int i = 0; i < spells.length; i++) {
            int cnt = 0;
            for (int p : potions) {
                if ((long) spells[i] * p >= success) {
                    cnt++;
                }
            }
            res[i] = cnt;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        vector<int> res(spells.size());

        for (int i = 0; i < spells.size(); i++) {
            int cnt = 0;
            for (int p : potions) {
                if ((long long) spells[i] * p >= success) {
                    cnt++;
                }
            }
            res[i] = cnt;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} spells
     * @param {number[]} potions
     * @param {number} success
     * @return {number[]}
     */
    successfulPairs(spells, potions, success) {
        let res = [];

        for (let s of spells) {
            let cnt = 0;
            for (let p of potions) {
                if (s * p >= success) {
                    cnt++;
                }
            }
            res.push(cnt);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$

> Where $n$ and $m$ are the sizes of the arrays $spells$ and $potions$ respectively.

---

## 2. Sorting + Binary Search

::tabs-start

```python
class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        potions.sort()
        res = []

        for s in spells:
            l, r = 0, len(potions) - 1
            idx = len(potions)

            while l <= r:
                m = (l + r) // 2
                if s * potions[m] >= success:
                    r = m - 1
                    idx = m
                else:
                    l = m + 1

            res.append(len(potions) - idx)

        return res
```

```java
public class Solution {
    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        Arrays.sort(potions);
        int[] res = new int[spells.length];

        for (int i = 0; i < spells.length; i++) {
            int l = 0, r = potions.length - 1, idx = potions.length;

            while (l <= r) {
                int m = (l + r) / 2;
                if ((long) spells[i] * potions[m] >= success) {
                    r = m - 1;
                    idx = m;
                } else {
                    l = m + 1;
                }
            }

            res[i] = potions.length - idx;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        sort(potions.begin(), potions.end());
        vector<int> res(spells.size());

        for (int i = 0; i < spells.size(); i++) {
            int l = 0, r = potions.size() - 1, idx = potions.size();

            while (l <= r) {
                int m = (l + r) / 2;
                if ((long long) spells[i] * potions[m] >= success) {
                    r = m - 1;
                    idx = m;
                } else {
                    l = m + 1;
                }
            }

            res[i] = potions.size() - idx;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} spells
     * @param {number[]} potions
     * @param {number} success
     * @return {number[]}
     */
    successfulPairs(spells, potions, success) {
        potions.sort((a, b) => a - b);
        let res = [];

        for (let s of spells) {
            let l = 0,
                r = potions.length - 1,
                idx = potions.length;

            while (l <= r) {
                let m = Math.floor((l + r) / 2);
                if (s * potions[m] >= success) {
                    r = m - 1;
                    idx = m;
                } else {
                    l = m + 1;
                }
            }

            res.push(potions.length - idx);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m + n) * \log m)$
- Space complexity:
    - $O(1)$ or $O(m)$ extra space depending on the sorting algorithm.
    - $O(n)$ space for the output array.

> Where $n$ and $m$ are the sizes of the arrays $spells$ and $potions$ respectively.

---

## 3. Sorting + Two Pointers

::tabs-start

```python
class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        n, m = len(spells), len(potions)
        S = spells[:]
        count = defaultdict(int)
        spells.sort()
        potions.sort()

        j = m - 1
        for i in range(n):
            while j >= 0 and spells[i] * potions[j] >= success:
                j -= 1
            count[spells[i]] = m - j - 1

        res = [0] * n
        for i in range(n):
            res[i] = count[S[i]]

        return res
```

```java
public class Solution {
    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        int n = spells.length, m = potions.length;
        int[] S = Arrays.copyOf(spells, n);
        Map<Integer, Integer> count = new HashMap<>();
        Arrays.sort(spells);
        Arrays.sort(potions);

        int j = m - 1;
        for (int i = 0; i < n; i++) {
            while (j >= 0 && (long) spells[i] * potions[j] >= success) {
                j--;
            }
            count.put(spells[i], m - j - 1);
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = count.get(S[i]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        int n = spells.size(), m = potions.size();
        vector<int> S = spells;
        unordered_map<int, int> count;
        sort(spells.begin(), spells.end());
        sort(potions.begin(), potions.end());

        int j = m - 1;
        for (int i = 0; i < n; i++) {
            while (j >= 0 && (long long) spells[i] * potions[j] >= success) {
                j--;
            }
            count[spells[i]] = m - j - 1;
        }

        vector<int> res(n);
        for (int i = 0; i < n; i++) {
            res[i] = count[S[i]];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} spells
     * @param {number[]} potions
     * @param {number} success
     * @return {number[]}
     */
    successfulPairs(spells, potions, success) {
        const n = spells.length,
            m = potions.length;
        const S = [...spells];
        const count = new Map();
        spells.sort((a, b) => a - b);
        potions.sort((a, b) => a - b);

        let j = m - 1;
        for (let i = 0; i < n; i++) {
            while (j >= 0 && spells[i] * potions[j] >= success) {
                j--;
            }
            count.set(spells[i], m - j - 1);
        }

        return S.map((s) => count.get(s));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m\log m)$
- Space complexity:
    - $O(1)$ or $O(m + n)$ extra space depending on the sorting algorithm.
    - $O(n)$ space for the output array.

> Where $n$ and $m$ are the sizes of the arrays $spells$ and $potions$ respectively.

---

## 4. Sorting + Two Pointers (Optimal)

::tabs-start

```python
class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        n, m = len(spells), len(potions)
        sIdx = list(range(n))
        sIdx.sort(key=lambda x: spells[x])
        potions.sort()

        j = m - 1
        res = [0] * n
        for i in range(n):
            while j >= 0 and spells[sIdx[i]] * potions[j] >= success:
                j -= 1
            res[sIdx[i]] = m - j - 1

        return res
```

```java
public class Solution {
    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        int n = spells.length, m = potions.length;
        Integer[] sIdx = new Integer[n];
        for (int i = 0; i < n; i++) sIdx[i] = i;

        Arrays.sort(sIdx, Comparator.comparingInt(i -> spells[i]));
        Arrays.sort(potions);

        int j = m - 1;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            while (j >= 0 && (long) spells[sIdx[i]] * potions[j] >= success) {
                j--;
            }
            res[sIdx[i]] = m - j - 1;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        int n = spells.size(), m = potions.size();
        vector<int> sIdx(n);
        for (int i = 0; i < n; i++) sIdx[i] = i;

        sort(sIdx.begin(), sIdx.end(), [&](int a, int b) {
            return spells[a] < spells[b];
        });

        sort(potions.begin(), potions.end());

        int j = m - 1;
        vector<int> res(n);
        for (int i = 0; i < n; i++) {
            while (j >= 0 && (long long) spells[sIdx[i]] * potions[j] >= success) {
                j--;
            }
            res[sIdx[i]] = m - j - 1;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} spells
     * @param {number[]} potions
     * @param {number} success
     * @return {number[]}
     */
    successfulPairs(spells, potions, success) {
        const n = spells.length,
            m = potions.length;
        const sIdx = Array.from({ length: n }, (_, i) => i);

        sIdx.sort((a, b) => spells[a] - spells[b]);
        potions.sort((a, b) => a - b);

        let j = m - 1;
        const res = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            while (j >= 0 && spells[sIdx[i]] * potions[j] >= success) {
                j--;
            }
            res[sIdx[i]] = m - j - 1;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m\log m)$
- Space complexity:
    - $O(1)$ or $O(m + n)$ extra space depending on the sorting algorithm.
    - $O(n)$ space for the output array.

> Where $n$ and $m$ are the sizes of the arrays $spells$ and $potions$ respectively.
