## 1. Hash Map

::tabs-start

```python
class Solution:
    def sortPeople(self, names: List[str], heights: List[int]) -> List[str]:
        height_to_name = {}
        for h, n in zip(heights, names):
            height_to_name[h] = n

        res = []
        for h in reversed(sorted(heights)):
            res.append(height_to_name[h])

        return res
```

```java
public class Solution {
    public String[] sortPeople(String[] names, int[] heights) {
        Map<Integer, String> map = new HashMap<>();
        for (int i = 0; i < heights.length; i++) {
            map.put(heights[i], names[i]);
        }

        Arrays.sort(heights);
        String[] res = new String[heights.length];
        for (int i = 0; i < heights.length; i++) {
            res[i] = map.get(heights[heights.length - 1 - i]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> sortPeople(vector<string>& names, vector<int>& heights) {
        unordered_map<int, string> map;
        for (int i = 0; i < heights.size(); i++) {
            map[heights[i]] = names[i];
        }

        sort(heights.begin(), heights.end());
        vector<string> res;
        for (int i = heights.size() - 1; i >= 0; i--) {
            res.push_back(map[heights[i]]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} names
     * @param {number[]} heights
     * @return {string[]}
     */
    sortPeople(names, heights) {
        const map = {};
        for (let i = 0; i < heights.length; i++) {
            map[heights[i]] = names[i];
        }

        heights.sort((a, b) => a - b);
        const res = [];
        for (let i = heights.length - 1; i >= 0; i--) {
            res.push(map[heights[i]]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Sorting the Pairs

::tabs-start

```python
class Solution:
    def sortPeople(self, names: List[str], heights: List[int]) -> List[str]:
        arr = list(zip(heights, names))
        arr.sort(reverse=True)
        return [name for _, name in arr]
```

```java
public class Solution {
    public String[] sortPeople(String[] names, int[] heights) {
        int n = names.length;
        Pair[] arr = new Pair[n];

        for (int i = 0; i < n; i++) {
            arr[i] = new Pair(heights[i], names[i]);
        }

        Arrays.sort(arr, (a, b) -> Integer.compare(b.height, a.height));

        String[] res = new String[n];
        for (int i = 0; i < n; i++) {
            res[i] = arr[i].name;
        }

        return res;
    }

    static class Pair {
        int height;
        String name;

        Pair(int height, String name) {
            this.height = height;
            this.name = name;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<string> sortPeople(vector<string>& names, vector<int>& heights) {
        vector<pair<int, string>> arr;
        for (int i = 0; i < names.size(); i++) {
            arr.emplace_back(heights[i], names[i]);
        }

        sort(arr.begin(), arr.end(), [](auto& a, auto& b) {
            return a.first > b.first;
        });

        vector<string> res;
        for (auto& [_, name] : arr) {
            res.push_back(name);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} names
     * @param {number[]} heights
     * @return {string[]}
     */
    sortPeople(names, heights) {
        const arr = names.map((name, i) => [heights[i], name]);
        arr.sort((a, b) => b[0] - a[0]);
        return arr.map((pair) => pair[1]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Sorting the Indices

::tabs-start

```python
class Solution:
    def sortPeople(self, names: List[str], heights: List[int]) -> List[str]:
        indices = list(range(len(names)))
        indices.sort(key=lambda i: -heights[i])
        return [names[i] for i in indices]
```

```java
public class Solution {
    public String[] sortPeople(String[] names, int[] heights) {
        Integer[] indices = new Integer[names.length];
        for (int i = 0; i < names.length; i++) {
            indices[i] = i;
        }

        Arrays.sort(indices, (i, j) -> Integer.compare(heights[j], heights[i]));

        String[] res = new String[names.length];
        for (int i = 0; i < names.length; i++) {
            res[i] = names[indices[i]];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> sortPeople(vector<string>& names, vector<int>& heights) {
        int n = names.size();
        vector<int> indices(n);
        iota(indices.begin(), indices.end(), 0);

        sort(indices.begin(), indices.end(), [&](int a, int b) {
            return heights[a] > heights[b];
        });

        vector<string> res;
        for (int i : indices) {
            res.push_back(names[i]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} names
     * @param {number[]} heights
     * @return {string[]}
     */
    sortPeople(names, heights) {
        const indices = names.map((_, i) => i);
        indices.sort((a, b) => heights[b] - heights[a]);
        return indices.map((i) => names[i]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
