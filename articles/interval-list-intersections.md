## 1. Brute Force

::tabs-start

```python
class Solution:
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        res = []
        for i in range(len(firstList)):
            startA, endA = firstList[i][0], firstList[i][1]
            for j in range(len(secondList)):
                startB, endB = secondList[j][0], secondList[j][1]
                if (startA <= startB <= endA) or (startB <= startA <= endB):
                    res.append([max(startA, startB), min(endA, endB)])
        return res
```

```java
public class Solution {
    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        List<int[]> res = new ArrayList<>();
        for (int i = 0; i < firstList.length; i++) {
            int startA = firstList[i][0], endA = firstList[i][1];
            for (int j = 0; j < secondList.length; j++) {
                int startB = secondList[j][0], endB = secondList[j][1];
                if ((startA <= startB && startB <= endA) || (startB <= startA && startA <= endB)) {
                    res.add(new int[]{Math.max(startA, startB), Math.min(endA, endB)});
                }
            }
        }
        return res.toArray(new int[res.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        vector<vector<int>> res;
        for (int i = 0; i < firstList.size(); i++) {
            int startA = firstList[i][0], endA = firstList[i][1];
            for (int j = 0; j < secondList.size(); j++) {
                int startB = secondList[j][0], endB = secondList[j][1];
                if ((startA <= startB && startB <= endA) || (startB <= startA && startA <= endB)) {
                    res.push_back({max(startA, startB), min(endA, endB)});
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} firstList
     * @param {number[][]} secondList
     * @return {number[][]}
     */
    intervalIntersection(firstList, secondList) {
        const res = [];
        for (let i = 0; i < firstList.length; i++) {
            const [startA, endA] = firstList[i];
            for (let j = 0; j < secondList.length; j++) {
                const [startB, endB] = secondList[j];
                if ((startA <= startB && startB <= endA) || (startB <= startA && startA <= endB)) {
                    res.push([Math.max(startA, startB), Math.min(endA, endB)]);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] IntervalIntersection(int[][] firstList, int[][] secondList) {
        var res = new List<int[]>();
        for (int i = 0; i < firstList.Length; i++) {
            int startA = firstList[i][0], endA = firstList[i][1];
            for (int j = 0; j < secondList.Length; j++) {
                int startB = secondList[j][0], endB = secondList[j][1];
                if ((startA <= startB && startB <= endA) || (startB <= startA && startA <= endB)) {
                    res.Add(new int[] { Math.Max(startA, startB), Math.Min(endA, endB) });
                }
            }
        }
        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity:
    * $O(1)$ extra space.
    * $O(m + n)$ for the output list.

> Where $m$ and $n$ are the sizes of the arrays $firstList$ and $secondList$, respectively.

---

## 2. Line Sweep

::tabs-start

```python
class Solution:
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        mp = defaultdict(int)
        for s, e in firstList:
            mp[s] += 1
            mp[e + 1] -= 1
        for s, e in secondList:
            mp[s] += 1
            mp[e + 1] -= 1

        res = []
        active = 0
        prev = None
        for x in sorted(mp):
            if active == 2:
                res.append([prev, x - 1])
            active += mp[x]
            prev = x
        return res
```

```java
class Solution {
    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        TreeMap<Integer, Integer> mp = new TreeMap<>();
        for (int[] f : firstList) {
            mp.put(f[0], mp.getOrDefault(f[0], 0) + 1);
            mp.put(f[1] + 1, mp.getOrDefault(f[1] + 1, 0) - 1);
        }
        for (int[] s : secondList) {
            mp.put(s[0], mp.getOrDefault(s[0], 0) + 1);
            mp.put(s[1] + 1, mp.getOrDefault(s[1] + 1, 0) - 1);
        }

        List<int[]> res = new ArrayList<>();
        int active = 0, prev = 0;
        boolean started = false;
        for (int x : mp.keySet()) {
            if (active == 2) {
                res.add(new int[]{prev, x - 1});
            }
            active += mp.get(x);
            prev = x;
        }
        return res.toArray(new int[res.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        map<int, int> mp;
        for (auto& f : firstList) {
            mp[f[0]] += 1;
            mp[f[1] + 1] -= 1;
        }
        for (auto& s : secondList) {
            mp[s[0]] += 1;
            mp[s[1] + 1] -= 1;
        }

        vector<vector<int>> res;
        int active = 0, prev = 0;
        bool started = false;
        for (auto& [x, v] : mp) {
            if (active == 2) {
                res.push_back({prev, x - 1});
            }
            active += v;
            prev = x;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} firstList
     * @param {number[][]} secondList
     * @return {number[][]}
     */
    intervalIntersection(firstList, secondList) {
        let mp = new Map();
        for (let [s, e] of firstList) {
            mp.set(s, (mp.get(s) || 0) + 1);
            mp.set(e + 1, (mp.get(e + 1) || 0) - 1);
        }
        for (let [s, e] of secondList) {
            mp.set(s, (mp.get(s) || 0) + 1);
            mp.set(e + 1, (mp.get(e + 1) || 0) - 1);
        }

        let keys = Array.from(mp.keys()).sort((a, b) => a - b);
        let res = [], active = 0, prev = 0;
        for (let x of keys) {
            if (active === 2) {
                res.push([prev, x - 1]);
            }
            active += mp.get(x);
            prev = x;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] IntervalIntersection(int[][] firstList, int[][] secondList) {
        var mp = new SortedDictionary<int, int>();
        foreach (var f in firstList) {
            if (!mp.ContainsKey(f[0])) mp[f[0]] = 0;
            mp[f[0]] += 1;
            if (!mp.ContainsKey(f[1] + 1)) mp[f[1] + 1] = 0;
            mp[f[1] + 1] -= 1;
        }
        foreach (var s in secondList) {
            if (!mp.ContainsKey(s[0])) mp[s[0]] = 0;
            mp[s[0]] += 1;
            if (!mp.ContainsKey(s[1] + 1)) mp[s[1] + 1] = 0;
            mp[s[1] + 1] -= 1;
        }

        var res = new List<int[]>();
        int active = 0, prev = 0;
        foreach (var kvp in mp) {
            int x = kvp.Key;
            if (active == 2) {
                res.Add(new int[] { prev, x - 1 });
            }
            active += kvp.Value;
            prev = x;
        }
        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((m + n) \log (m + n))$
* Space complexity: $O(m + n)$

> Where $m$ and $n$ are the sizes of the arrays $firstList$ and $secondList$, respectively.

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        res = []
        i = j = 0
        while i < len(firstList) and j < len(secondList):
            startA, endA = firstList[i]
            startB, endB = secondList[j]

            start = max(startA, startB)
            end = min(endA, endB)

            if start <= end:
                res.append([start, end])

            if endA < endB:
                i += 1
            else:
                j += 1

        return res
```

```java
public class Solution {
    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        List<int[]> res = new ArrayList<>();
        int i = 0, j = 0;

        while (i < firstList.length && j < secondList.length) {
            int startA = firstList[i][0], endA = firstList[i][1];
            int startB = secondList[j][0], endB = secondList[j][1];

            int start = Math.max(startA, startB);
            int end = Math.min(endA, endB);

            if (start <= end) {
                res.add(new int[]{start, end});
            }

            if (endA < endB) {
                i++;
            } else {
                j++;
            }
        }

        return res.toArray(new int[res.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        vector<vector<int>> res;
        int i = 0, j = 0;

        while (i < firstList.size() && j < secondList.size()) {
            int startA = firstList[i][0], endA = firstList[i][1];
            int startB = secondList[j][0], endB = secondList[j][1];

            int start = max(startA, startB);
            int end = min(endA, endB);

            if (start <= end) {
                res.push_back({start, end});
            }

            if (endA < endB) {
                i++;
            } else {
                j++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} firstList
     * @param {number[][]} secondList
     * @return {number[][]}
     */
    intervalIntersection(firstList, secondList) {
        const res = [];
        let i = 0, j = 0;

        while (i < firstList.length && j < secondList.length) {
            const [startA, endA] = firstList[i];
            const [startB, endB] = secondList[j];

            const start = Math.max(startA, startB);
            const end = Math.min(endA, endB);

            if (start <= end) {
                res.push([start, end]);
            }

            if (endA < endB) {
                i++;
            } else {
                j++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] IntervalIntersection(int[][] firstList, int[][] secondList) {
        var res = new List<int[]>();
        int i = 0, j = 0;

        while (i < firstList.Length && j < secondList.Length) {
            int startA = firstList[i][0], endA = firstList[i][1];
            int startB = secondList[j][0], endB = secondList[j][1];

            int start = Math.Max(startA, startB);
            int end = Math.Min(endA, endB);

            if (start <= end) {
                res.Add(new int[] { start, end });
            }

            if (endA < endB) {
                i++;
            } else {
                j++;
            }
        }

        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: 
    * $O(1)$ extra space.
    * $O(m + n)$ for the output list.

> Where $m$ and $n$ are the sizes of the arrays $firstList$ and $secondList$, respectively.