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

```csharp
public class Solution {
    public int CountSeniors(string[] details) {
        int res = 0;
        foreach (string d in details) {
            if (int.Parse(d.Substring(11, 2)) > 60) {
                res++;
            }
        }
        return res;
    }
}
```

```go
func countSeniors(details []string) int {
    res := 0
    for _, d := range details {
        age := (int(d[11]-'0') * 10) + int(d[12]-'0')
        if age > 60 {
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countSeniors(details: Array<String>): Int {
        var res = 0
        for (d in details) {
            if (d.substring(11, 13).toInt() > 60) {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countSeniors(_ details: [String]) -> Int {
        var res = 0
        for d in details {
            let start = d.index(d.startIndex, offsetBy: 11)
            let end = d.index(d.startIndex, offsetBy: 13)
            if Int(d[start..<end])! > 60 {
                res += 1
            }
        }
        return res
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

```csharp
public class Solution {
    public int CountSeniors(string[] details) {
        int res = 0;
        foreach (string d in details) {
            int ten = d[11] - '0';
            int one = d[12] - '0';
            int age = one + 10 * ten;
            if (age > 60) {
                res++;
            }
        }
        return res;
    }
}
```

```go
func countSeniors(details []string) int {
    res := 0
    for _, d := range details {
        ten := int(d[11] - '0')
        one := int(d[12] - '0')
        age := one + 10*ten
        if age > 60 {
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countSeniors(details: Array<String>): Int {
        var res = 0
        for (d in details) {
            val ten = d[11] - '0'
            val one = d[12] - '0'
            val age = one + 10 * ten
            if (age > 60) {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countSeniors(_ details: [String]) -> Int {
        var res = 0
        for d in details {
            let chars = Array(d)
            let ten = Int(chars[11].asciiValue! - Character("0").asciiValue!)
            let one = Int(chars[12].asciiValue! - Character("0").asciiValue!)
            let age = one + 10 * ten
            if age > 60 {
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
