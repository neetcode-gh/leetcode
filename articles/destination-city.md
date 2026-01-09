## 1. Brute Force

### Intuition
The destination city is a city that appears as an endpoint but never as a starting point in any path. For each destination in the paths, we can check whether it ever appears as a starting city. The city that never starts a path is our answer.

### Algorithm
1. Iterate through each path and consider its destination city.
2. For each destination, iterate through all paths again to check if this city appears as a starting point.
3. If the destination never appears as a starting point in any path, return it as the answer.
4. Return an empty string if no destination city is found (though the problem guarantees one exists).

::tabs-start

```python
class Solution:
    def destCity(self, paths: List[List[str]]) -> str:
        for i in range(len(paths)):
            flag = True
            for j in range(len(paths)):
                if paths[i][1] == paths[j][0]:
                    flag = False
                    break
            if flag:
                return paths[i][1]
        return ""
```

```java
public class Solution {
    public String destCity(List<List<String>> paths) {
        for (int i = 0; i < paths.size(); i++) {
            boolean flag = true;
            for (int j = 0; j < paths.size(); j++) {
                if (paths.get(i).get(1).equals(paths.get(j).get(0))) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return paths.get(i).get(1);
            }
        }
        return "";
    }
}
```

```cpp
class Solution {
public:
    string destCity(vector<vector<string>>& paths) {
        for (int i = 0; i < paths.size(); i++) {
            bool flag = true;
            for (int j = 0; j < paths.size(); j++) {
                if (paths[i][1] == paths[j][0]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return paths[i][1];
            }
        }
        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} paths
     * @return {string}
     */
    destCity(paths) {
        for (let i = 0; i < paths.length; i++) {
            let flag = true;
            for (let j = 0; j < paths.length; j++) {
                if (paths[i][1] === paths[j][0]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return paths[i][1];
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public string DestCity(IList<IList<string>> paths) {
        for (int i = 0; i < paths.Count; i++) {
            bool flag = true;
            for (int j = 0; j < paths.Count; j++) {
                if (paths[i][1] == paths[j][0]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return paths[i][1];
            }
        }
        return "";
    }
}
```

```go
func destCity(paths [][]string) string {
    for i := 0; i < len(paths); i++ {
        flag := true
        for j := 0; j < len(paths); j++ {
            if paths[i][1] == paths[j][0] {
                flag = false
                break
            }
        }
        if flag {
            return paths[i][1]
        }
    }
    return ""
}
```

```kotlin
class Solution {
    fun destCity(paths: List<List<String>>): String {
        for (i in paths.indices) {
            var flag = true
            for (j in paths.indices) {
                if (paths[i][1] == paths[j][0]) {
                    flag = false
                    break
                }
            }
            if (flag) {
                return paths[i][1]
            }
        }
        return ""
    }
}
```

```swift
class Solution {
    func destCity(_ paths: [[String]]) -> String {
        for i in 0..<paths.count {
            var flag = true
            for j in 0..<paths.count {
                if paths[i][1] == paths[j][0] {
                    flag = false
                    break
                }
            }
            if flag {
                return paths[i][1]
            }
        }
        return ""
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Set

### Intuition
Instead of checking each destination against all starting points in O(n) time, we can store all starting cities in a hash set for O(1) lookup. Any destination city that is not in the set of starting cities must be the final destination.

### Algorithm
1. Create a hash set and add all starting cities (the first element of each path) to it.
2. Iterate through all paths and check each destination city (the second element).
3. If a destination city is not found in the hash set, return it as the answer.
4. The first destination not in the set is the final destination city.

::tabs-start

```python
class Solution:
    def destCity(self, paths: List[List[str]]) -> str:
        s = set()
        for p in paths:
            s.add(p[0])

        for p in paths:
            if p[1] not in s:
                return p[1]
```

```java
public class Solution {
    public String destCity(List<List<String>> paths) {
        Set<String> s = new HashSet<>();
        for (List<String> p : paths) {
            s.add(p.get(0));
        }

        for (List<String> p : paths) {
            if (!s.contains(p.get(1))) {
                return p.get(1);
            }
        }
        return "";
    }
}
```

```cpp
class Solution {
public:
    string destCity(vector<vector<string>>& paths) {
        unordered_set<string> s;
        for (auto& p : paths) {
            s.insert(p[0]);
        }

        for (auto& p : paths) {
            if (s.find(p[1]) == s.end()) {
                return p[1];
            }
        }
        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} paths
     * @return {string}
     */
    destCity(paths) {
        const s = new Set();
        for (const p of paths) {
            s.add(p[0]);
        }

        for (const p of paths) {
            if (!s.has(p[1])) {
                return p[1];
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public string DestCity(IList<IList<string>> paths) {
        HashSet<string> s = new HashSet<string>();
        foreach (var p in paths) {
            s.Add(p[0]);
        }

        foreach (var p in paths) {
            if (!s.Contains(p[1])) {
                return p[1];
            }
        }
        return "";
    }
}
```

```go
func destCity(paths [][]string) string {
    s := make(map[string]bool)
    for _, p := range paths {
        s[p[0]] = true
    }

    for _, p := range paths {
        if !s[p[1]] {
            return p[1]
        }
    }
    return ""
}
```

```kotlin
class Solution {
    fun destCity(paths: List<List<String>>): String {
        val s = HashSet<String>()
        for (p in paths) {
            s.add(p[0])
        }

        for (p in paths) {
            if (p[1] !in s) {
                return p[1]
            }
        }
        return ""
    }
}
```

```swift
class Solution {
    func destCity(_ paths: [[String]]) -> String {
        var s = Set<String>()
        for p in paths {
            s.insert(p[0])
        }

        for p in paths {
            if !s.contains(p[1]) {
                return p[1]
            }
        }
        return ""
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Hash Map

### Intuition
We can model the paths as a linked chain where each city points to its next destination. By building this chain in a hash map and following the links from any starting city, we will eventually reach the final destination, which has no outgoing path.

### Algorithm
1. Build a hash map where each key is a starting city and its value is the destination city.
2. Start with the first city from the first path.
3. Keep following the chain: while the current city exists as a key in the map, move to its destination.
4. When the current city is not a key in the map, it means there is no outgoing path from it, so return it as the destination city.

::tabs-start

```python
class Solution:
    def destCity(self, paths: List[List[str]]) -> str:
        mp = {p[0]: p[1] for p in paths}

        start = paths[0][0]
        while start in mp:
            start = mp[start]
        return start
```

```java
public class Solution {
    public String destCity(List<List<String>> paths) {
        Map<String, String> mp = new HashMap<>();
        for (List<String> p : paths) {
            mp.put(p.get(0), p.get(1));
        }

        String start = paths.get(0).get(0);
        while (mp.containsKey(start)) {
            start = mp.get(start);
        }
        return start;
    }
}
```

```cpp
class Solution {
public:
    string destCity(vector<vector<string>>& paths) {
        unordered_map<string, string> mp;
        for (auto& p : paths) {
            mp[p[0]] = p[1];
        }

        string start = paths[0][0];
        while (mp.find(start) != mp.end()) {
            start = mp[start];
        }
        return start;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} paths
     * @return {string}
     */
    destCity(paths) {
        const mp = new Map();
        for (const p of paths) {
            mp.set(p[0], p[1]);
        }

        let start = paths[0][0];
        while (mp.has(start)) {
            start = mp.get(start);
        }
        return start;
    }
}
```

```csharp
public class Solution {
    public string DestCity(IList<IList<string>> paths) {
        Dictionary<string, string> mp = new Dictionary<string, string>();
        foreach (var p in paths) {
            mp[p[0]] = p[1];
        }

        string start = paths[0][0];
        while (mp.ContainsKey(start)) {
            start = mp[start];
        }
        return start;
    }
}
```

```go
func destCity(paths [][]string) string {
    mp := make(map[string]string)
    for _, p := range paths {
        mp[p[0]] = p[1]
    }

    start := paths[0][0]
    for {
        if next, ok := mp[start]; ok {
            start = next
        } else {
            break
        }
    }
    return start
}
```

```kotlin
class Solution {
    fun destCity(paths: List<List<String>>): String {
        val mp = HashMap<String, String>()
        for (p in paths) {
            mp[p[0]] = p[1]
        }

        var start = paths[0][0]
        while (start in mp) {
            start = mp[start]!!
        }
        return start
    }
}
```

```swift
class Solution {
    func destCity(_ paths: [[String]]) -> String {
        var mp = [String: String]()
        for p in paths {
            mp[p[0]] = p[1]
        }

        var start = paths[0][0]
        while let next = mp[start] {
            start = next
        }
        return start
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
