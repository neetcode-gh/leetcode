## 1. Brute Force

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
