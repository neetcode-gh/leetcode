## 1. Brute Force

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        res = []

        for num2 in arr2:
            for i, num1 in enumerate(arr1):
                if num1 == num2:
                    res.append(num1)
                    arr1[i] = -1

        arr1.sort()
        for i in range(len(res), len(arr1)):
            res.append(arr1[i])

        return res
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        List<Integer> res = new ArrayList<>();

        for (int num2 : arr2) {
            for (int i = 0; i < arr1.length; i++) {
                if (arr1[i] == num2) {
                    res.add(arr1[i]);
                    arr1[i] = -1;
                }
            }
        }

        Arrays.sort(arr1);
        for (int i = res.size(); i < arr1.length; i++) {
            res.add(arr1[i]);
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        vector<int> res;

        for (int num2 : arr2) {
            for (int i = 0; i < arr1.size(); i++) {
                if (arr1[i] == num2) {
                    res.push_back(arr1[i]);
                    arr1[i] = -1;
                }
            }
        }

        sort(arr1.begin(), arr1.end());
        for (int i = res.size(); i < arr1.size(); i++) {
            res.push_back(arr1[i]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const res = [];

        for (let num2 of arr2) {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] === num2) {
                    res.push(arr1[i]);
                    arr1[i] = -1;
                }
            }
        }

        arr1.sort((a, b) => a - b);
        for (let i = res.length; i < arr1.length; i++) {
            res.push(arr1[i]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n + n \log n)$
- Space complexity:
    - $O(1)$ or $O(n)$ depending on the sorting algorithm.
    - $O(n)$ space for the output list.

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        arr2_set = set(arr2)
        arr1_count = defaultdict(int)
        end = []

        for num in arr1:
            if num not in arr2_set:
                end.append(num)
            arr1_count[num] += 1
        end.sort()

        res = []
        for num in arr2:
            for _ in range(arr1_count[num]):
                res.append(num)
        return res + end
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        Set<Integer> arr2Set = new HashSet<>();
        for (int num : arr2) arr2Set.add(num);

        Map<Integer, Integer> count = new HashMap<>();
        List<Integer> end = new ArrayList<>();
        for (int num : arr1) {
            if (!arr2Set.contains(num)) end.add(num);
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        Collections.sort(end);

        List<Integer> res = new ArrayList<>();
        for (int num : arr2) {
            int freq = count.get(num);
            for (int i = 0; i < freq; i++) res.add(num);
        }
        res.addAll(end);

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        unordered_set<int> arr2Set(arr2.begin(), arr2.end());
        unordered_map<int, int> count;
        vector<int> end;

        for (int num : arr1) {
            if (!arr2Set.count(num)) end.push_back(num);
            count[num]++;
        }

        sort(end.begin(), end.end());
        vector<int> res;

        for (int num : arr2) {
            for (int i = 0; i < count[num]; i++) {
                res.push_back(num);
            }
        }

        res.insert(res.end(), end.begin(), end.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const arr2Set = new Set(arr2);
        const count = {};
        const end = [];

        for (let num of arr1) {
            if (!arr2Set.has(num)) end.push(num);
            count[num] = (count[num] || 0) + 1;
        }

        end.sort((a, b) => a - b);
        const res = [];

        for (let num of arr2) {
            for (let i = 0; i < count[num]; i++) {
                res.push(num);
            }
        }

        return res.concat(end);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.

---

## 3. Hash Map (Optimal)

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        count = {}
        for num in arr1:
            count[num] = count.get(num, 0) + 1

        res = []
        for num in arr2:
            res += [num] * count.pop(num)

        for num in sorted(count):
            res += [num] * count[num]

        return res
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : arr1) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        List<Integer> res = new ArrayList<>();
        for (int num : arr2) {
            int freq = count.remove(num);
            for (int i = 0; i < freq; i++) {
                res.add(num);
            }
        }

        List<Integer> remaining = new ArrayList<>(count.keySet());
        Collections.sort(remaining);
        for (int num : remaining) {
            int freq = count.get(num);
            for (int i = 0; i < freq; i++) {
                res.add(num);
            }
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        unordered_map<int, int> count;
        for (int num : arr1) {
            count[num]++;
        }

        vector<int> res;
        for (int num : arr2) {
            for (int i = 0; i < count[num]; i++) {
                res.push_back(num);
            }
            count.erase(num);
        }

        vector<int> remaining;
        for (auto& [num, freq] : count) {
            for (int i = 0; i < freq; i++) {
                remaining.push_back(num);
            }
        }

        sort(remaining.begin(), remaining.end());
        res.insert(res.end(), remaining.begin(), remaining.end());

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const count = {};
        for (let num of arr1) {
            count[num] = (count[num] || 0) + 1;
        }

        const res = [];
        for (let num of arr2) {
            for (let i = 0; i < count[num]; i++) {
                res.push(num);
            }
            delete count[num];
        }

        const remaining = Object.keys(count)
            .map(Number)
            .sort((a, b) => a - b);
        for (let num of remaining) {
            for (let i = 0; i < count[num]; i++) {
                res.push(num);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + n \log n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.

---

## 4. Counting Sort

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        max_val = max(arr1)
        count = [0] * (max_val + 1)

        for num in arr1:
            count[num] += 1

        res = []
        for num in arr2:
            res += [num] * count[num]
            count[num] = 0

        for num in range(len(count)):
            res += [num] * count[num]

        return res
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        int max = 0;
        for (int num : arr1) max = Math.max(max, num);

        int[] count = new int[max + 1];
        for (int num : arr1) count[num]++;

        List<Integer> res = new ArrayList<>();
        for (int num : arr2) {
            while (count[num]-- > 0) res.add(num);
        }

        for (int num = 0; num < count.length; num++) {
            while (count[num]-- > 0) res.add(num);
        }

        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        int max_val = *max_element(arr1.begin(), arr1.end());
        vector<int> count(max_val + 1, 0);

        for (int num : arr1) count[num]++;

        vector<int> res;
        for (int num : arr2) {
            while (count[num]-- > 0) res.push_back(num);
        }

        for (int num = 0; num <= max_val; num++) {
            while (count[num]-- > 0) res.push_back(num);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        let max = Math.max(...arr1);
        let count = new Array(max + 1).fill(0);

        for (let num of arr1) count[num]++;

        let res = [];
        for (let num of arr2) {
            while (count[num]-- > 0) res.push(num);
        }

        for (let num = 0; num < count.length; num++) {
            while (count[num]-- > 0) res.push(num);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + M)$
- Space complexity:
    - $O(M)$ extra space.
    - $O(n)$ space for the output list.

> Where $n$ is the size of the array $arr1$, $m$ is the size of the array $arr2$, and $M$ is the maximum value in the array $arr1$.

---

## 5. Custom Sort

::tabs-start

```python
class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        index = {num: i for i, num in enumerate(arr2)}
        return sorted(arr1, key=lambda x: (index.get(x, 1000 + x)))
```

```java
public class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        Map<Integer, Integer> index = new HashMap<>();
        for (int i = 0; i < arr2.length; i++) {
            index.put(arr2[i], i);
        }

        Integer[] boxed = Arrays.stream(arr1).boxed().toArray(Integer[]::new);
        Arrays.sort(boxed, (a, b) -> {
            int ia = index.getOrDefault(a, 1000 + a);
            int ib = index.getOrDefault(b, 1000 + b);
            return Integer.compare(ia, ib);
        });

        return Arrays.stream(boxed).mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        unordered_map<int, int> index;
        for (int i = 0; i < arr2.size(); i++) {
            index[arr2[i]] = i;
        }

        sort(arr1.begin(), arr1.end(), [&](int a, int b) {
            int ia = index.count(a) ? index[a] : 1000 + a;
            int ib = index.count(b) ? index[b] : 1000 + b;
            return ia < ib;
        });

        return arr1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @return {number[]}
     */
    relativeSortArray(arr1, arr2) {
        const index = new Map();
        arr2.forEach((num, i) => index.set(num, i));

        return arr1.sort((a, b) => {
            const ia = index.has(a) ? index.get(a) : 1000 + a;
            const ib = index.has(b) ? index.get(b) : 1000 + b;
            return ia - ib;
        });
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + n \log n)$
- Space complexity:
    - $O(m)$ extra space.
    - $O(n)$ space for the output list.

> Where $n$ is the size of the array $arr1$, and $m$ is the size of the array $arr2$.
