## 1. Hash Map

### Intuition

Since all heights are distinct, we can use each height as a unique key to look up the corresponding person's name. By building a hash map from height to name, we can then sort the heights in descending order and retrieve names in the correct sequence.

### Algorithm

1. Create a hash map that maps each height to its corresponding name.
2. Sort the `heights` array in ascending order.
3. Iterate through the sorted heights in reverse order (descending).
4. For each height, look up the name in the hash map and add it to the `res`.
5. Return the `res` array containing names sorted by height in descending order.

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

```csharp
public class Solution {
    public string[] SortPeople(string[] names, int[] heights) {
        var map = new Dictionary<int, string>();
        for (int i = 0; i < heights.Length; i++) {
            map[heights[i]] = names[i];
        }

        Array.Sort(heights);
        string[] res = new string[heights.Length];
        for (int i = 0; i < heights.Length; i++) {
            res[i] = map[heights[heights.Length - 1 - i]];
        }

        return res;
    }
}
```

```go
func sortPeople(names []string, heights []int) []string {
    m := make(map[int]string)
    for i, h := range heights {
        m[h] = names[i]
    }

    sort.Ints(heights)
    res := make([]string, len(heights))
    for i := 0; i < len(heights); i++ {
        res[i] = m[heights[len(heights)-1-i]]
    }

    return res
}
```

```kotlin
class Solution {
    fun sortPeople(names: Array<String>, heights: IntArray): Array<String> {
        val map = mutableMapOf<Int, String>()
        for (i in heights.indices) {
            map[heights[i]] = names[i]
        }

        heights.sort()
        return Array(heights.size) { map[heights[heights.size - 1 - it]]!! }
    }
}
```

```swift
class Solution {
    func sortPeople(_ names: [String], _ heights: [Int]) -> [String] {
        var map = [Int: String]()
        for i in 0..<heights.count {
            map[heights[i]] = names[i]
        }

        let sortedHeights = heights.sorted()
        var res = [String]()
        for i in stride(from: heights.count - 1, through: 0, by: -1) {
            res.append(map[sortedHeights[i]]!)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Sorting the Pairs

### Intuition

Instead of using a hash map, we can pair each height with its corresponding name directly. By creating an array of (height, name) pairs and sorting them by height in descending order, we keep the relationship intact throughout the sorting process.

### Algorithm

1. Create an array of pairs where each pair contains `(height, name)`.
2. Sort the array of pairs by height in descending order.
3. Extract the names from the sorted pairs to form the result array.
4. Return the result.

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

```csharp
public class Solution {
    public string[] SortPeople(string[] names, int[] heights) {
        int n = names.Length;
        var arr = new (int height, string name)[n];

        for (int i = 0; i < n; i++) {
            arr[i] = (heights[i], names[i]);
        }

        Array.Sort(arr, (a, b) => b.height.CompareTo(a.height));

        string[] res = new string[n];
        for (int i = 0; i < n; i++) {
            res[i] = arr[i].name;
        }

        return res;
    }
}
```

```go
func sortPeople(names []string, heights []int) []string {
    type pair struct {
        height int
        name   string
    }

    arr := make([]pair, len(names))
    for i := range names {
        arr[i] = pair{heights[i], names[i]}
    }

    sort.Slice(arr, func(i, j int) bool {
        return arr[i].height > arr[j].height
    })

    res := make([]string, len(names))
    for i, p := range arr {
        res[i] = p.name
    }

    return res
}
```

```kotlin
class Solution {
    fun sortPeople(names: Array<String>, heights: IntArray): Array<String> {
        val arr = names.indices.map { heights[it] to names[it] }
            .sortedByDescending { it.first }
        return arr.map { it.second }.toTypedArray()
    }
}
```

```swift
class Solution {
    func sortPeople(_ names: [String], _ heights: [Int]) -> [String] {
        let arr = zip(heights, names).sorted { $0.0 > $1.0 }
        return arr.map { $0.1 }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Sorting the Indices

### Intuition

Rather than copying data into pairs, we can sort an array of indices based on the heights they point to. This approach is memory efficient when names are long strings, since we only move integers during sorting rather than entire strings.

### Algorithm

1. Create an array of indices from `0` to `n-1`.
2. Sort the `indices` array using a custom comparator that compares the heights at those indices in descending order.
3. Build the result by mapping each sorted index to its corresponding name.
4. Return the result array.

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

```csharp
public class Solution {
    public string[] SortPeople(string[] names, int[] heights) {
        int[] indices = new int[names.Length];
        for (int i = 0; i < names.Length; i++) {
            indices[i] = i;
        }

        Array.Sort(indices, (i, j) => heights[j].CompareTo(heights[i]));

        string[] res = new string[names.Length];
        for (int i = 0; i < names.Length; i++) {
            res[i] = names[indices[i]];
        }

        return res;
    }
}
```

```go
func sortPeople(names []string, heights []int) []string {
    n := len(names)
    indices := make([]int, n)
    for i := range indices {
        indices[i] = i
    }

    sort.Slice(indices, func(i, j int) bool {
        return heights[indices[i]] > heights[indices[j]]
    })

    res := make([]string, n)
    for i, idx := range indices {
        res[i] = names[idx]
    }

    return res
}
```

```kotlin
class Solution {
    fun sortPeople(names: Array<String>, heights: IntArray): Array<String> {
        val indices = names.indices.sortedByDescending { heights[it] }
        return indices.map { names[it] }.toTypedArray()
    }
}
```

```swift
class Solution {
    func sortPeople(_ names: [String], _ heights: [Int]) -> [String] {
        let indices = names.indices.sorted { heights[$0] > heights[$1] }
        return indices.map { names[$0] }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

## Common Pitfalls

### Sorting in Ascending Instead of Descending Order

The problem asks for people sorted by height in descending order (tallest first). A common mistake is to sort in ascending order and forget to reverse the result or adjust the comparator.

### Losing the Name-Height Association After Sorting

When sorting heights separately from names, you must maintain a way to retrieve the corresponding name for each height. Using a hash map or pairing heights with indices before sorting prevents this association from being lost.
