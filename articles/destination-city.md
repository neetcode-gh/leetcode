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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
