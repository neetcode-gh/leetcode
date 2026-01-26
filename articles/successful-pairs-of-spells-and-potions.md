## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting** - Required to arrange potions in order so that successful pairs form a contiguous range
- **Binary Search** - Used to efficiently find the threshold index where potions become successful
- **Two Pointers** - Alternative approach processes sorted spells and potions simultaneously

---

## 1. Brute Force

### Intuition

For each spell, we need to count how many potions form a successful pair. A pair is successful when `spell * potion >= success`. The simplest approach is to check every spell against every potion and count the valid combinations.

### Algorithm

1. Create a `result` array `res` to store the count for each spell.
2. For each spell `s` in `spells`:
   - Initialize a counter `cnt = 0`.
   - For each potion `p` in `potions`:
     - If `s * p >= success`, increment `cnt`.
   - Append `cnt` to `res`.
3. Return `res`.

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

```csharp
public class Solution {
    public int[] SuccessfulPairs(int[] spells, int[] potions, long success) {
        int[] res = new int[spells.Length];

        for (int i = 0; i < spells.Length; i++) {
            int cnt = 0;
            foreach (int p in potions) {
                if ((long)spells[i] * p >= success) {
                    cnt++;
                }
            }
            res[i] = cnt;
        }

        return res;
    }
}
```

```go
func successfulPairs(spells []int, potions []int, success int64) []int {
    res := make([]int, len(spells))

    for i, s := range spells {
        cnt := 0
        for _, p := range potions {
            if int64(s)*int64(p) >= success {
                cnt++
            }
        }
        res[i] = cnt
    }

    return res
}
```

```kotlin
class Solution {
    fun successfulPairs(spells: IntArray, potions: IntArray, success: Long): IntArray {
        val res = IntArray(spells.size)

        for (i in spells.indices) {
            var cnt = 0
            for (p in potions) {
                if (spells[i].toLong() * p >= success) {
                    cnt++
                }
            }
            res[i] = cnt
        }

        return res
    }
}
```

```swift
class Solution {
    func successfulPairs(_ spells: [Int], _ potions: [Int], _ success: Int) -> [Int] {
        var res = [Int]()

        for s in spells {
            var cnt = 0
            for p in potions {
                if s * p >= success {
                    cnt += 1
                }
            }
            res.append(cnt)
        }

        return res
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

### Intuition

If we sort the potions array, all successful potions for a given spell will be contiguous at the end. For a spell `s`, we need the minimum potion strength `p` such that `s * p >= success`, which means `p >= success / s`. Binary search can efficiently find this threshold index, and all potions from that index onward form successful pairs.

### Algorithm

1. Sort the `potions` array in ascending order.
2. For each spell `s` in `spells`:
   - Use binary search to find the smallest index `idx` where `s * potions[idx] >= success`.
   - The count of successful pairs is `len(potions) - idx`.
   - Store this count in the `result`.
3. Return the `result` array.

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

```csharp
public class Solution {
    public int[] SuccessfulPairs(int[] spells, int[] potions, long success) {
        Array.Sort(potions);
        int[] res = new int[spells.Length];

        for (int i = 0; i < spells.Length; i++) {
            int l = 0, r = potions.Length - 1, idx = potions.Length;

            while (l <= r) {
                int m = (l + r) / 2;
                if ((long)spells[i] * potions[m] >= success) {
                    r = m - 1;
                    idx = m;
                } else {
                    l = m + 1;
                }
            }

            res[i] = potions.Length - idx;
        }

        return res;
    }
}
```

```go
func successfulPairs(spells []int, potions []int, success int64) []int {
    sort.Ints(potions)
    res := make([]int, len(spells))

    for i, s := range spells {
        l, r, idx := 0, len(potions)-1, len(potions)

        for l <= r {
            m := (l + r) / 2
            if int64(s)*int64(potions[m]) >= success {
                r = m - 1
                idx = m
            } else {
                l = m + 1
            }
        }

        res[i] = len(potions) - idx
    }

    return res
}
```

```kotlin
class Solution {
    fun successfulPairs(spells: IntArray, potions: IntArray, success: Long): IntArray {
        potions.sort()
        val res = IntArray(spells.size)

        for (i in spells.indices) {
            var l = 0
            var r = potions.size - 1
            var idx = potions.size

            while (l <= r) {
                val m = (l + r) / 2
                if (spells[i].toLong() * potions[m] >= success) {
                    r = m - 1
                    idx = m
                } else {
                    l = m + 1
                }
            }

            res[i] = potions.size - idx
        }

        return res
    }
}
```

```swift
class Solution {
    func successfulPairs(_ spells: [Int], _ potions: [Int], _ success: Int) -> [Int] {
        let sortedPotions = potions.sorted()
        var res = [Int]()

        for s in spells {
            var l = 0
            var r = sortedPotions.count - 1
            var idx = sortedPotions.count

            while l <= r {
                let m = (l + r) / 2
                if s * sortedPotions[m] >= success {
                    r = m - 1
                    idx = m
                } else {
                    l = m + 1
                }
            }

            res.append(sortedPotions.count - idx)
        }

        return res
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

### Intuition

If we sort both arrays, we can use the two pointer technique. A weaker spell needs a stronger potion to succeed, and a stronger spell needs at least as weak a potion. By processing spells in ascending order and potions in descending order, we can reuse the potion pointer position. Once a potion works for a spell, it works for all stronger spells too.

### Algorithm

1. Save the original `spells` array and sort both `spells` and `potions`.
2. Use a pointer `j` starting at the end of sorted `potions`.
3. For each spell in sorted order:
   - Move `j` left while `spell * potions[j] >= success`.
   - Store the count `m - j - 1` in a map keyed by spell strength.
4. Build the `result` by looking up each original spell's count in the map.
5. Return the `result`.

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

```csharp
public class Solution {
    public int[] SuccessfulPairs(int[] spells, int[] potions, long success) {
        int n = spells.Length, m = potions.Length;
        int[] S = (int[])spells.Clone();
        Dictionary<int, int> count = new Dictionary<int, int>();
        Array.Sort(spells);
        Array.Sort(potions);

        int j = m - 1;
        for (int i = 0; i < n; i++) {
            while (j >= 0 && (long)spells[i] * potions[j] >= success) {
                j--;
            }
            count[spells[i]] = m - j - 1;
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = count[S[i]];
        }

        return res;
    }
}
```

```go
func successfulPairs(spells []int, potions []int, success int64) []int {
    n, m := len(spells), len(potions)
    S := make([]int, n)
    copy(S, spells)
    count := make(map[int]int)
    sort.Ints(spells)
    sort.Ints(potions)

    j := m - 1
    for i := 0; i < n; i++ {
        for j >= 0 && int64(spells[i])*int64(potions[j]) >= success {
            j--
        }
        count[spells[i]] = m - j - 1
    }

    res := make([]int, n)
    for i := 0; i < n; i++ {
        res[i] = count[S[i]]
    }

    return res
}
```

```kotlin
class Solution {
    fun successfulPairs(spells: IntArray, potions: IntArray, success: Long): IntArray {
        val n = spells.size
        val m = potions.size
        val S = spells.copyOf()
        val count = HashMap<Int, Int>()
        spells.sort()
        potions.sort()

        var j = m - 1
        for (i in 0 until n) {
            while (j >= 0 && spells[i].toLong() * potions[j] >= success) {
                j--
            }
            count[spells[i]] = m - j - 1
        }

        return IntArray(n) { count[S[it]]!! }
    }
}
```

```swift
class Solution {
    func successfulPairs(_ spells: [Int], _ potions: [Int], _ success: Int) -> [Int] {
        let n = spells.count, m = potions.count
        let S = spells
        var count = [Int: Int]()
        let sortedSpells = spells.sorted()
        let sortedPotions = potions.sorted()

        var j = m - 1
        for i in 0..<n {
            while j >= 0 && sortedSpells[i] * sortedPotions[j] >= success {
                j -= 1
            }
            count[sortedSpells[i]] = m - j - 1
        }

        return S.map { count[$0]! }
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

### Intuition

The previous approach uses extra space to map spell values to their counts. We can avoid this by sorting indices of spells rather than the spells themselves. This way, we can directly write results to the correct positions in the output array without needing a lookup map.

### Algorithm

1. Create an array of indices `sIdx` and sort it by corresponding spell strength.
2. Sort the `potions` array.
3. Initialize pointer `j` at the end of `potions` and `result` array `res`.
4. For each `index` `i` in sorted order:
   - Move `j` left while `spells[sIdx[i]] * potions[j] >= success`.
   - Set `res[sIdx[i]] = m - j - 1`.
5. Return `res`.

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

```csharp
public class Solution {
    public int[] SuccessfulPairs(int[] spells, int[] potions, long success) {
        int n = spells.Length, m = potions.Length;
        int[] sIdx = new int[n];
        for (int i = 0; i < n; i++) sIdx[i] = i;

        Array.Sort(sIdx, (a, b) => spells[a].CompareTo(spells[b]));
        Array.Sort(potions);

        int j = m - 1;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            while (j >= 0 && (long)spells[sIdx[i]] * potions[j] >= success) {
                j--;
            }
            res[sIdx[i]] = m - j - 1;
        }

        return res;
    }
}
```

```go
func successfulPairs(spells []int, potions []int, success int64) []int {
    n, m := len(spells), len(potions)
    sIdx := make([]int, n)
    for i := range sIdx {
        sIdx[i] = i
    }

    sort.Slice(sIdx, func(i, j int) bool {
        return spells[sIdx[i]] < spells[sIdx[j]]
    })
    sort.Ints(potions)

    j := m - 1
    res := make([]int, n)

    for i := 0; i < n; i++ {
        for j >= 0 && int64(spells[sIdx[i]])*int64(potions[j]) >= success {
            j--
        }
        res[sIdx[i]] = m - j - 1
    }

    return res
}
```

```kotlin
class Solution {
    fun successfulPairs(spells: IntArray, potions: IntArray, success: Long): IntArray {
        val n = spells.size
        val m = potions.size
        val sIdx = (0 until n).sortedBy { spells[it] }
        potions.sort()

        var j = m - 1
        val res = IntArray(n)

        for (i in 0 until n) {
            while (j >= 0 && spells[sIdx[i]].toLong() * potions[j] >= success) {
                j--
            }
            res[sIdx[i]] = m - j - 1
        }

        return res
    }
}
```

```swift
class Solution {
    func successfulPairs(_ spells: [Int], _ potions: [Int], _ success: Int) -> [Int] {
        let n = spells.count, m = potions.count
        let sIdx = (0..<n).sorted { spells[$0] < spells[$1] }
        let sortedPotions = potions.sorted()

        var j = m - 1
        var res = [Int](repeating: 0, count: n)

        for i in 0..<n {
            while j >= 0 && spells[sIdx[i]] * sortedPotions[j] >= success {
                j -= 1
            }
            res[sIdx[i]] = m - j - 1
        }

        return res
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

## Common Pitfalls

### Integer Overflow in Multiplication

When multiplying `spell * potion`, the result can exceed the range of a 32-bit integer since both values can be up to 10^5, making the product up to 10^10. Always cast to `long` before multiplication or use a 64-bit integer type to avoid overflow and incorrect comparisons.

### Off-by-One Errors in Binary Search

A common mistake is incorrectly calculating the count of successful pairs after binary search. The binary search finds the first index where the condition is satisfied, and the count should be `len(potions) - idx`. Errors occur when using `<=` vs `<` in the binary search condition or when the index represents the wrong boundary.

### Forgetting to Sort the Potions Array

Binary search only works on sorted arrays. A frequent oversight is attempting to use binary search on the original unsorted `potions` array, which leads to incorrect results. The potions array must be sorted first, and for the two-pointer approach, both arrays need to be sorted while preserving the original spell order for the output.
