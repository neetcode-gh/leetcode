## 1. Brute Force

::tabs-start

```python
class Solution:
    def kthDistinct(self, arr: List[str], k: int) -> str:
        for i in range(len(arr)):
            flag = True
            for j in range(len(arr)):
                if i == j:
                    continue

                if arr[i] == arr[j]:
                    flag = False
                    break

            if flag:
                k -= 1
                if k == 0:
                    return arr[i]
        return ""
```

```java
public class Solution {
    public String kthDistinct(String[] arr, int k) {
        for (int i = 0; i < arr.length; i++) {
            boolean flag = true;
            for (int j = 0; j < arr.length; j++) {
                if (i == j) continue;

                if (arr[i].equals(arr[j])) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                k--;
                if (k == 0) {
                    return arr[i];
                }
            }
        }
        return "";
    }
}
```

```cpp
class Solution {
public:
    string kthDistinct(vector<string>& arr, int k) {
        for (int i = 0; i < arr.size(); i++) {
            bool flag = true;
            for (int j = 0; j < arr.size(); j++) {
                if (i == j) continue;

                if (arr[i] == arr[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                k--;
                if (k == 0) {
                    return arr[i];
                }
            }
        }
        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @param {number} k
     * @return {string}
     */
    kthDistinct(arr, k) {
        for (let i = 0; i < arr.length; i++) {
            let flag = true;
            for (let j = 0; j < arr.length; j++) {
                if (i === j) continue;

                if (arr[i] === arr[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                k--;
                if (k === 0) {
                    return arr[i];
                }
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public string KthDistinct(string[] arr, int k) {
        for (int i = 0; i < arr.Length; i++) {
            bool flag = true;
            for (int j = 0; j < arr.Length; j++) {
                if (i == j) continue;

                if (arr[i] == arr[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                k--;
                if (k == 0) {
                    return arr[i];
                }
            }
        }
        return "";
    }
}
```

```go
func kthDistinct(arr []string, k int) string {
    for i := 0; i < len(arr); i++ {
        flag := true
        for j := 0; j < len(arr); j++ {
            if i == j {
                continue
            }

            if arr[i] == arr[j] {
                flag = false
                break
            }
        }

        if flag {
            k--
            if k == 0 {
                return arr[i]
            }
        }
    }
    return ""
}
```

```kotlin
class Solution {
    fun kthDistinct(arr: Array<String>, k: Int): String {
        var cnt = k
        for (i in arr.indices) {
            var flag = true
            for (j in arr.indices) {
                if (i == j) continue

                if (arr[i] == arr[j]) {
                    flag = false
                    break
                }
            }

            if (flag) {
                cnt--
                if (cnt == 0) {
                    return arr[i]
                }
            }
        }
        return ""
    }
}
```

```swift
class Solution {
    func kthDistinct(_ arr: [String], _ k: Int) -> String {
        var cnt = k
        for i in 0..<arr.count {
            var flag = true
            for j in 0..<arr.count {
                if i == j { continue }

                if arr[i] == arr[j] {
                    flag = false
                    break
                }
            }

            if flag {
                cnt -= 1
                if cnt == 0 {
                    return arr[i]
                }
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

## 2. Hash Map

::tabs-start

```python
class Solution:
    def kthDistinct(self, arr: List[str], k: int) -> str:
        count = {}

        for s in arr:
            if s not in count:
                count[s] = 0
            count[s] += 1

        for s in arr:
            if count[s] == 1:
                k -= 1
                if k == 0:
                    return s

        return ""
```

```java
public class Solution {
    public String kthDistinct(String[] arr, int k) {
        Map<String, Integer> count = new HashMap<>();

        for (String s : arr) {
            count.put(s, count.getOrDefault(s, 0) + 1);
        }

        for (String s : arr) {
            if (count.get(s) == 1) {
                k--;
                if (k == 0) {
                    return s;
                }
            }
        }

        return "";
    }
}
```

```cpp
class Solution {
public:
    string kthDistinct(vector<string>& arr, int k) {
        unordered_map<string, int> count;

        for (const string& s : arr) {
            count[s]++;
        }

        for (const string& s : arr) {
            if (count[s] == 1) {
                k--;
                if (k == 0) {
                    return s;
                }
            }
        }

        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @param {number} k
     * @return {string}
     */
    kthDistinct(arr, k) {
        const count = {};

        for (let s of arr) {
            if (!(s in count)) {
                count[s] = 0;
            }
            count[s]++;
        }

        for (let s of arr) {
            if (count[s] === 1) {
                k--;
                if (k === 0) {
                    return s;
                }
            }
        }

        return '';
    }
}
```

```csharp
public class Solution {
    public string KthDistinct(string[] arr, int k) {
        var count = new Dictionary<string, int>();

        foreach (string s in arr) {
            if (!count.ContainsKey(s)) {
                count[s] = 0;
            }
            count[s]++;
        }

        foreach (string s in arr) {
            if (count[s] == 1) {
                k--;
                if (k == 0) {
                    return s;
                }
            }
        }

        return "";
    }
}
```

```go
func kthDistinct(arr []string, k int) string {
    count := make(map[string]int)

    for _, s := range arr {
        count[s]++
    }

    for _, s := range arr {
        if count[s] == 1 {
            k--
            if k == 0 {
                return s
            }
        }
    }

    return ""
}
```

```kotlin
class Solution {
    fun kthDistinct(arr: Array<String>, k: Int): String {
        val count = mutableMapOf<String, Int>()

        for (s in arr) {
            count[s] = count.getOrDefault(s, 0) + 1
        }

        var cnt = k
        for (s in arr) {
            if (count[s] == 1) {
                cnt--
                if (cnt == 0) {
                    return s
                }
            }
        }

        return ""
    }
}
```

```swift
class Solution {
    func kthDistinct(_ arr: [String], _ k: Int) -> String {
        var count = [String: Int]()

        for s in arr {
            count[s, default: 0] += 1
        }

        var cnt = k
        for s in arr {
            if count[s] == 1 {
                cnt -= 1
                if cnt == 0 {
                    return s
                }
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

## 3. Hash Set

::tabs-start

```python
class Solution:
    def kthDistinct(self, arr: List[str], k: int) -> str:
        distinct, seen = set(), set()

        for s in arr:
            if s in distinct:
                distinct.remove(s)
                seen.add(s)
            elif s not in seen:
                distinct.add(s)

        for s in arr:
            if s in distinct:
                k -= 1
                if k == 0:
                    return s

        return ""
```

```java
public class Solution {
    public String kthDistinct(String[] arr, int k) {
        Set<String> distinct = new HashSet<>();
        Set<String> seen = new HashSet<>();

        for (String s : arr) {
            if (distinct.contains(s)) {
                distinct.remove(s);
                seen.add(s);
            } else if (!seen.contains(s)) {
                distinct.add(s);
            }
        }

        for (String s : arr) {
            if (distinct.contains(s)) {
                k--;
                if (k == 0) {
                    return s;
                }
            }
        }

        return "";
    }
}
```

```cpp
class Solution {
public:
    string kthDistinct(vector<string>& arr, int k) {
        unordered_set<string> distinct, seen;

        for (const string& s : arr) {
            if (distinct.count(s)) {
                distinct.erase(s);
                seen.insert(s);
            } else if (!seen.count(s)) {
                distinct.insert(s);
            }
        }

        for (const string& s : arr) {
            if (distinct.count(s)) {
                k--;
                if (k == 0) {
                    return s;
                }
            }
        }

        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @param {number} k
     * @return {string}
     */
    kthDistinct(arr, k) {
        const distinct = new Set();
        const seen = new Set();

        for (let s of arr) {
            if (distinct.has(s)) {
                distinct.delete(s);
                seen.add(s);
            } else if (!seen.has(s)) {
                distinct.add(s);
            }
        }

        for (let s of arr) {
            if (distinct.has(s)) {
                k--;
                if (k === 0) {
                    return s;
                }
            }
        }

        return '';
    }
}
```

```csharp
public class Solution {
    public string KthDistinct(string[] arr, int k) {
        var distinct = new HashSet<string>();
        var seen = new HashSet<string>();

        foreach (string s in arr) {
            if (distinct.Contains(s)) {
                distinct.Remove(s);
                seen.Add(s);
            } else if (!seen.Contains(s)) {
                distinct.Add(s);
            }
        }

        foreach (string s in arr) {
            if (distinct.Contains(s)) {
                k--;
                if (k == 0) {
                    return s;
                }
            }
        }

        return "";
    }
}
```

```go
func kthDistinct(arr []string, k int) string {
    distinct := make(map[string]bool)
    seen := make(map[string]bool)

    for _, s := range arr {
        if distinct[s] {
            delete(distinct, s)
            seen[s] = true
        } else if !seen[s] {
            distinct[s] = true
        }
    }

    for _, s := range arr {
        if distinct[s] {
            k--
            if k == 0 {
                return s
            }
        }
    }

    return ""
}
```

```kotlin
class Solution {
    fun kthDistinct(arr: Array<String>, k: Int): String {
        val distinct = mutableSetOf<String>()
        val seen = mutableSetOf<String>()

        for (s in arr) {
            if (s in distinct) {
                distinct.remove(s)
                seen.add(s)
            } else if (s !in seen) {
                distinct.add(s)
            }
        }

        var cnt = k
        for (s in arr) {
            if (s in distinct) {
                cnt--
                if (cnt == 0) {
                    return s
                }
            }
        }

        return ""
    }
}
```

```swift
class Solution {
    func kthDistinct(_ arr: [String], _ k: Int) -> String {
        var distinct = Set<String>()
        var seen = Set<String>()

        for s in arr {
            if distinct.contains(s) {
                distinct.remove(s)
                seen.insert(s)
            } else if !seen.contains(s) {
                distinct.insert(s)
            }
        }

        var cnt = k
        for s in arr {
            if distinct.contains(s) {
                cnt -= 1
                if cnt == 0 {
                    return s
                }
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
