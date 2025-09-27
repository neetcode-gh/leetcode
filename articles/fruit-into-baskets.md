## 1. Brute Force

::tabs-start

```python
class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        n = len(fruits)
        res = 0
        for i in range(n):
            types = set()
            j = i
            while j < n and (len(types) < 2 or fruits[j] in types):
                types.add(fruits[j])
                j += 1
            res = max(res, j - i)
        return res
```

```java
public class Solution {
    public int totalFruit(int[] fruits) {
        int n = fruits.length, res = 0;

        for (int i = 0; i < n; i++) {
            Set<Integer> types = new HashSet<>();
            int j = i;

            while (j < n && (types.size() < 2 || types.contains(fruits[j]))) {
                types.add(fruits[j]);
                j++;
            }
            res = Math.max(res, j - i);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        int n = fruits.size(), res = 0;

        for (int i = 0; i < n; i++) {
            unordered_set<int> types;
            int j = i;

            while (j < n && (types.size() < 2 || types.count(fruits[j]))) {
                types.insert(fruits[j]);
                j++;
            }
            res = max(res, j - i);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} fruits
     * @return {number}
     */
    totalFruit(fruits) {
        let n = fruits.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let types = new Set();
            let j = i;

            while (j < n && (types.size < 2 || types.has(fruits[j]))) {
                types.add(fruits[j]);
                j++;
            }
            res = Math.max(res, j - i);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int TotalFruit(int[] fruits) {
        int n = fruits.Length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            HashSet<int> types = new HashSet<int>();
            int j = i;
            while (j < n && (types.Count < 2 || types.Contains(fruits[j]))) {
                types.Add(fruits[j]);
                j++;
            }
            res = Math.Max(res, j - i);
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

## 2. Sliding Window - I

::tabs-start

```python
class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        count = defaultdict(int)
        l, total, res = 0, 0, 0

        for r in range(len(fruits)):
            count[fruits[r]] += 1
            total += 1

            while len(count) > 2:
                f = fruits[l]
                count[f] -= 1
                total -= 1
                l += 1
                if not count[f]:
                    count.pop(f)

            res = max(res, total)

        return res
```

```java
public class Solution {
    public int totalFruit(int[] fruits) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int l = 0, total = 0, res = 0;

        for (int r = 0; r < fruits.length; r++) {
            count.put(fruits[r], count.getOrDefault(fruits[r], 0) + 1);
            total++;

            while (count.size() > 2) {
                int f = fruits[l];
                count.put(f, count.get(f) - 1);
                total--;
                if (count.get(f) == 0) {
                    count.remove(f);
                }
                l++;
            }
            res = Math.max(res, total);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> count;
        int l = 0, total = 0, res = 0;

        for (int r = 0; r < fruits.size(); r++) {
            count[fruits[r]]++;
            total++;

            while (count.size() > 2) {
                int f = fruits[l];
                count[f]--;
                total--;
                if (count[f] == 0) {
                    count.erase(f);
                }
                l++;
            }
            res = max(res, total);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} fruits
     * @return {number}
     */
    totalFruit(fruits) {
        let count = new Map();
        let l = 0,
            total = 0,
            res = 0;

        for (let r = 0; r < fruits.length; r++) {
            count.set(fruits[r], (count.get(fruits[r]) || 0) + 1);
            total++;

            while (count.size > 2) {
                let f = fruits[l];
                count.set(f, count.get(f) - 1);
                total--;
                if (count.get(f) === 0) {
                    count.delete(f);
                }
                l++;
            }
            res = Math.max(res, total);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int TotalFruit(int[] fruits) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int l = 0, total = 0, res = 0;

        for (int r = 0; r < fruits.Length; r++) {
            if (!count.ContainsKey(fruits[r])) {
                count[fruits[r]] = 0;
            }
            count[fruits[r]]++;
            total++;

            while (count.Count > 2) {
                int f = fruits[l];
                count[f]--;
                total--;
                if (count[f] == 0) {
                    count.Remove(f);
                }
                l++;
            }

            res = Math.Max(res, total);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Sliding Window - II

::tabs-start

```python
class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        count = defaultdict(int)
        l = 0

        for r in range(len(fruits)):
            count[fruits[r]] += 1

            if len(count) > 2:
                count[fruits[l]] -= 1
                if count[fruits[l]] == 0:
                    count.pop(fruits[l])
                l += 1

        return len(fruits) - l
```

```java
public class Solution {
    public int totalFruit(int[] fruits) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int l = 0;

        for (int r = 0; r < fruits.length; r++) {
            count.put(fruits[r], count.getOrDefault(fruits[r], 0) + 1);

            if (count.size() > 2) {
                count.put(fruits[l], count.get(fruits[l]) - 1);
                if (count.get(fruits[l]) == 0) {
                    count.remove(fruits[l]);
                }
                l++;
            }
        }

        return fruits.length - l;
    }
}
```

```cpp
class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> count;
        int l = 0;

        for (int r = 0; r < fruits.size(); r++) {
            count[fruits[r]]++;

            if (count.size() > 2) {
                count[fruits[l]]--;
                if (count[fruits[l]] == 0) {
                    count.erase(fruits[l]);
                }
                l++;
            }
        }

        return fruits.size() - l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} fruits
     * @return {number}
     */
    totalFruit(fruits) {
        let count = new Map();
        let l = 0;

        for (let r = 0; r < fruits.length; r++) {
            count.set(fruits[r], (count.get(fruits[r]) || 0) + 1);

            if (count.size > 2) {
                count.set(fruits[l], count.get(fruits[l]) - 1);
                if (count.get(fruits[l]) === 0) {
                    count.delete(fruits[l]);
                }
                l++;
            }
        }

        return fruits.length - l;
    }
}
```

```csharp
public class Solution {
    public int TotalFruit(int[] fruits) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int l = 0;

        for (int r = 0; r < fruits.Length; r++) {
            if (!count.ContainsKey(fruits[r])) {
                count[fruits[r]] = 0;
            }
            count[fruits[r]]++;

            if (count.Count > 2) {
                count[fruits[l]]--;
                if (count[fruits[l]] == 0) {
                    count.Remove(fruits[l]);
                }
                l++;
            }
        }

        return fruits.Length - l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Sliding Window - III

::tabs-start

```python
class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        l = 0
        fruit1_lastIdx = 0
        fruit2_lastIdx = -1
        fruit1 = fruits[0]
        fruit2 = -1
        total = res = 1

        for r in range(len(fruits)):
            f = fruits[r]
            if f == fruit1:
                total += 1
                fruit1_lastIdx = r
            elif f == fruit2 or fruit2 == -1:
                total += 1
                fruit2_lastIdx = r
                fruit2 = f
            else:
                if fruit2_lastIdx == min(fruit1_lastIdx, fruit2_lastIdx):
                    fruit1_lastIdx, fruit2_lastIdx = fruit2_lastIdx, fruit1_lastIdx
                    fruit1, fruit2 = fruit2, fruit1

                total -= (fruit1_lastIdx - l + 1)
                l = fruit1_lastIdx + 1
                fruit1 = f
                fruit1_lastIdx = r
            res = max(res, r - l + 1)

        return res
```

```java
public class Solution {
    public int totalFruit(int[] fruits) {
        int l = 0, fruit1_lastIdx = 0, fruit2_lastIdx = -1;
        int fruit1 = fruits[0], fruit2 = -1, total = 1, res = 1;

        for (int r = 0; r < fruits.length; r++) {
            int f = fruits[r];
            if (f == fruit1) {
                total++;
                fruit1_lastIdx = r;
            } else if (f == fruit2 || fruit2 == -1) {
                total++;
                fruit2_lastIdx = r;
                fruit2 = f;
            } else {
                if (fruit2_lastIdx == Math.min(fruit1_lastIdx, fruit2_lastIdx)) {
                    int tempIdx = fruit1_lastIdx;
                    fruit1_lastIdx = fruit2_lastIdx;
                    fruit2_lastIdx = tempIdx;
                    int tempFruit = fruit1;
                    fruit1 = fruit2;
                    fruit2 = tempFruit;
                }
                total -= (fruit1_lastIdx - l + 1);
                l = fruit1_lastIdx + 1;
                fruit1 = f;
                fruit1_lastIdx = r;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        int l = 0, fruit1_lastIdx = 0, fruit2_lastIdx = -1;
        int fruit1 = fruits[0], fruit2 = -1, total = 1, res = 1;

        for (int r = 0; r < fruits.size(); r++) {
            int f = fruits[r];
            if (f == fruit1) {
                total++;
                fruit1_lastIdx = r;
            } else if (f == fruit2 || fruit2 == -1) {
                total++;
                fruit2_lastIdx = r;
                fruit2 = f;
            } else {
                if (fruit2_lastIdx == min(fruit1_lastIdx, fruit2_lastIdx)) {
                    swap(fruit1_lastIdx, fruit2_lastIdx);
                    swap(fruit1, fruit2);
                }
                total -= (fruit1_lastIdx - l + 1);
                l = fruit1_lastIdx + 1;
                fruit1 = f;
                fruit1_lastIdx = r;
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} fruits
     * @return {number}
     */
    totalFruit(fruits) {
        let l = 0,
            fruit1_lastIdx = 0,
            fruit2_lastIdx = -1;
        let fruit1 = fruits[0],
            fruit2 = -1,
            total = 1,
            res = 1;

        for (let r = 0; r < fruits.length; r++) {
            let f = fruits[r];
            if (f === fruit1) {
                total++;
                fruit1_lastIdx = r;
            } else if (f === fruit2 || fruit2 === -1) {
                total++;
                fruit2_lastIdx = r;
                fruit2 = f;
            } else {
                if (
                    fruit2_lastIdx === Math.min(fruit1_lastIdx, fruit2_lastIdx)
                ) {
                    [fruit1_lastIdx, fruit2_lastIdx] = [
                        fruit2_lastIdx,
                        fruit1_lastIdx,
                    ];
                    [fruit1, fruit2] = [fruit2, fruit1];
                }
                total -= fruit1_lastIdx - l + 1;
                l = fruit1_lastIdx + 1;
                fruit1 = f;
                fruit1_lastIdx = r;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int TotalFruit(int[] fruits) {
        int l = 0;
        int fruit1_lastIdx = 0;
        int fruit2_lastIdx = -1;
        int fruit1 = fruits[0];
        int fruit2 = -1;
        int total = 1;
        int res = 1;

        for (int r = 0; r < fruits.Length; r++) {
            int f = fruits[r];
            if (f == fruit1) {
                total++;
                fruit1_lastIdx = r;
            } else if (f == fruit2 || fruit2 == -1) {
                total++;
                fruit2_lastIdx = r;
                fruit2 = f;
            } else {
                if (fruit2_lastIdx == Math.Min(fruit1_lastIdx, fruit2_lastIdx)) {
                    int tempIdx = fruit1_lastIdx;
                    fruit1_lastIdx = fruit2_lastIdx;
                    fruit2_lastIdx = tempIdx;

                    int tempFruit = fruit1;
                    fruit1 = fruit2;
                    fruit2 = tempFruit;
                }

                total -= (fruit1_lastIdx - l + 1);
                l = fruit1_lastIdx + 1;
                fruit1 = f;
                fruit1_lastIdx = r;
            }
            res = Math.Max(res, r - l + 1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
