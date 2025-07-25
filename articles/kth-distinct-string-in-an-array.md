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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
