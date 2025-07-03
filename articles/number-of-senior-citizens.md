## 1. String Parsing

::tabs-start

```python
class Solution:
    def countSeniors(self, details: List[str]) -> int:
        res = 0
        for d in details:
            if int(d[11:13]) > 60:
                res += 1
        return res
```

```java
public class Solution {
    public int countSeniors(String[] details) {
        int res = 0;
        for (String d : details) {
            if (Integer.parseInt(d.substring(11, 13)) > 60) {
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countSeniors(vector<string>& details) {
        int res = 0;
        for (const string& d : details) {
            if (stoi(d.substr(11, 2)) > 60) {
                res++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} details
     * @return {number}
     */
    countSeniors(details) {
        let res = 0;
        for (let d of details) {
            if (parseInt(d.slice(11, 13)) > 60) {
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Character-Based Extraction

::tabs-start

```python
class Solution:
    def countSeniors(self, details: List[str]) -> int:
        res = 0
        for d in details:
            ten = ord(d[11]) - ord("0")
            one = ord(d[12]) - ord("0")
            age = one + 10 * ten
            if age > 60:
                res += 1
        return res
```

```java
public class Solution {
    public int countSeniors(String[] details) {
        int res = 0;
        for (String d : details) {
            int ten = d.charAt(11) - '0';
            int one = d.charAt(12) - '0';
            int age = one + 10 * ten;
            if (age > 60) {
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countSeniors(vector<string>& details) {
        int res = 0;
        for (const string& d : details) {
            int ten = d[11] - '0';
            int one = d[12] - '0';
            int age = one + 10 * ten;
            if (age > 60) {
                res++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} details
     * @return {number}
     */
    countSeniors(details) {
        let res = 0;
        for (let d of details) {
            let ten = d.charCodeAt(11) - 48;
            let one = d.charCodeAt(12) - 48;
            let age = one + 10 * ten;
            if (age > 60) {
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
