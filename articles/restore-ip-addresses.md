## 1. Backtracking

::tabs-start

```python
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []
        if len(s) > 12:
            return res

        def backtrack(i, dots, curIP):
            if dots == 4 and i == len(s):
                res.append(curIP[:-1])
                return
            if dots > 4:
                return

            for j in range(i, min(i + 3, len(s))):
                if i != j and s[i] == "0":
                    continue
                if int(s[i: j + 1]) < 256:
                    backtrack(j + 1, dots + 1, curIP + s[i: j + 1] + ".")

        backtrack(0, 0, "")
        return res
```

```java
public class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> res = new ArrayList<>();
        if (s.length() > 12) return res;

        backtrack(0, 0, "", s, res);
        return res;
    }

    private void backtrack(int i, int dots, String curIP, String s, List<String> res) {
        if (dots == 4 && i == s.length()) {
            res.add(curIP.substring(0, curIP.length() - 1));
            return;
        }
        if (dots > 4) return;

        for (int j = i; j < Math.min(i + 3, s.length()); j++) {
            if (i != j && s.charAt(i) == '0') continue;
            if (Integer.parseInt(s.substring(i, j + 1)) < 256) {
                backtrack(j + 1, dots + 1, curIP + s.substring(i, j + 1) + ".", s, res);
            }
        }
    }
}
```

```cpp
class Solution {
        vector<string> res;

public:
    vector<string> restoreIpAddresses(string s) {
        if (s.length() > 12) return res;
        backtrack(s, 0, 0, "");
        return res;
    }

private:
    void backtrack(string& s, int i, int dots, string curIP) {
        if (dots == 4 && i == s.size()) {
            res.push_back(curIP.substr(0, curIP.size() - 1));
            return;
        }
        if (dots > 4) return;

        for (int j = i; j < min(i + 3, (int)s.size()); j++) {
            if (i != j && s[i] == '0') continue;
            if (stoi(s.substr(i, j - i + 1)) < 256) {
                backtrack(s, j + 1, dots + 1, curIP + s.substr(i, j - i + 1) + ".");
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    restoreIpAddresses(s) {
        const res = [];
        if (s.length > 12) return res;

        const backtrack = (i, dots, curIP) => {
            if (dots === 4 && i === s.length) {
                res.push(curIP.slice(0, -1));
                return;
            }
            if (dots > 4) return;

            for (let j = i; j < Math.min(i + 3, s.length); j++) {
                if (i !== j && s[i] === '0') continue;
                if (parseInt(s.slice(i, j + 1)) < 256) {
                    backtrack(j + 1, dots + 1, curIP + s.slice(i, j + 1) + '.');
                }
            }
        };

        backtrack(0, 0, '');
        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> RestoreIpAddresses(string s) {
        List<string> res = new List<string>();
        if (s.Length > 12) return res;

        void Backtrack(int i, int dots, string curIP) {
            if (dots == 4 && i == s.Length) {
                res.Add(curIP.Substring(0, curIP.Length - 1));
                return;
            }
            if (dots > 4) return;

            for (int j = i; j < Math.Min(i + 3, s.Length); j++) {
                if (i != j && s[i] == '0') continue;
                string part = s.Substring(i, j - i + 1);
                if (int.Parse(part) < 256) {
                    Backtrack(j + 1, dots + 1, curIP + part + ".");
                }
            }
        }

        Backtrack(0, 0, "");
        return res;
    }
}
```

```go
func restoreIpAddresses(s string) []string {
    res := []string{}
    if len(s) > 12 {
        return res
    }

    var backtrack func(i, dots int, curIP string)
    backtrack = func(i, dots int, curIP string) {
        if dots == 4 && i == len(s) {
            res = append(res, curIP[:len(curIP)-1])
            return
        }
        if dots > 4 {
            return
        }

        for j := i; j < min(i+3, len(s)); j++ {
            if i != j && s[i] == '0' {
                continue
            }
            part := s[i : j+1]
            num, _ := strconv.Atoi(part)
            if num < 256 {
                backtrack(j+1, dots+1, curIP+part+".")
            }
        }
    }

    backtrack(0, 0, "")
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun restoreIpAddresses(s: String): List<String> {
        val res = mutableListOf<String>()
        if (s.length > 12) return res

        fun backtrack(i: Int, dots: Int, curIP: String) {
            if (dots == 4 && i == s.length) {
                res.add(curIP.dropLast(1))
                return
            }
            if (dots > 4) return

            for (j in i until minOf(i + 3, s.length)) {
                if (i != j && s[i] == '0') continue
                val part = s.substring(i, j + 1)
                if (part.toInt() < 256) {
                    backtrack(j + 1, dots + 1, curIP + part + ".")
                }
            }
        }

        backtrack(0, 0, "")
        return res
    }
}
```

```swift
class Solution {
    func restoreIpAddresses(_ s: String) -> [String] {
        var res = [String]()
        if s.count > 12 { return res }
        let chars = Array(s)

        func backtrack(_ i: Int, _ dots: Int, _ curIP: String) {
            if dots == 4 && i == chars.count {
                res.append(String(curIP.dropLast()))
                return
            }
            if dots > 4 { return }

            for j in i..<min(i + 3, chars.count) {
                if i != j && chars[i] == "0" { continue }
                let part = String(chars[i...j])
                if let num = Int(part), num < 256 {
                    backtrack(j + 1, dots + 1, curIP + part + ".")
                }
            }
        }

        backtrack(0, 0, "")
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ n * n)$
- Space complexity: $O(m * n)$

> Where $m$ is equals to $3$ as there are at most three digits in a valid segment and $n$ is equals to $4$ as there are four segments in a valid IP.

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []
        if len(s) > 12:
            return res

        def valid(num):
            return len(num) == 1 or (int(num) < 256 and num[0] != "0")

        def add(s1, s2, s3, s4):
            if s1 + s2 + s3 + s4 != len(s):
                return

            num1 = s[:s1]
            num2 = s[s1:s1+s2]
            num3 = s[s1+s2:s1+s2+s3]
            num4 = s[s1+s2+s3:]
            if valid(num1) and valid(num2) and valid(num3) and valid(num4):
                res.append(num1 + "." + num2 + "." + num3 + "." + num4)

        for seg1 in range(1, 4):
            for seg2 in range(1, 4):
                for seg3 in range(1, 4):
                    for seg4 in range(1, 4):
                        add(seg1, seg2, seg3, seg4)

        return res
```

```java
public class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> res = new ArrayList<>();
        if (s.length() > 12) return res;

        for (int seg1 = 1; seg1 < 4; seg1++) {
            for (int seg2 = 1; seg2 < 4; seg2++) {
                for (int seg3 = 1; seg3 < 4; seg3++) {
                    for (int seg4 = 1; seg4 < 4; seg4++) {
                        if (seg1 + seg2 + seg3 + seg4 != s.length()) continue;

                        String num1 = s.substring(0, seg1);
                        String num2 = s.substring(seg1, seg1 + seg2);
                        String num3 = s.substring(seg1 + seg2, seg1 + seg2 + seg3);
                        String num4 = s.substring(seg1 + seg2 + seg3);

                        if (isValid(num1) && isValid(num2) && isValid(num3) && isValid(num4)) {
                            res.add(num1 + "." + num2 + "." + num3 + "." + num4);
                        }
                    }
                }
            }
        }
        return res;
    }

    private boolean isValid(String num) {
        if (num.length() > 1 && num.charAt(0) == '0') return false;
        int value = Integer.parseInt(num);
        return value <= 255;
    }
}
```

```cpp
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res;
        if (s.size() > 12) return res;

        auto valid = [&](string& num) {
            if (num.size() > 1 && num[0] == '0') return false;
            int value = stoi(num);
            return value <= 255;
        };

        for (int seg1 = 1; seg1 < 4; ++seg1) {
            for (int seg2 = 1; seg2 < 4; ++seg2) {
                for (int seg3 = 1; seg3 < 4; ++seg3) {
                    for (int seg4 = 1; seg4 < 4; ++seg4) {
                        if (seg1 + seg2 + seg3 + seg4 != s.size()) continue;

                        string num1 = s.substr(0, seg1);
                        string num2 = s.substr(seg1, seg2);
                        string num3 = s.substr(seg1 + seg2, seg3);
                        string num4 = s.substr(seg1 + seg2 + seg3);

                        if (valid(num1) && valid(num2) && valid(num3) && valid(num4)) {
                            res.push_back(num1 + "." + num2 + "." + num3 + "." + num4);
                        }
                    }
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    restoreIpAddresses(s) {
        const res = [];
        if (s.length > 12) return res;

        const isValid = (num) => {
            if (num.length > 1 && num[0] === '0') return false;
            const value = parseInt(num, 10);
            return value <= 255;
        };

        for (let seg1 = 1; seg1 < 4; seg1++) {
            for (let seg2 = 1; seg2 < 4; seg2++) {
                for (let seg3 = 1; seg3 < 4; seg3++) {
                    for (let seg4 = 1; seg4 < 4; seg4++) {
                        if (seg1 + seg2 + seg3 + seg4 !== s.length) continue;

                        const num1 = s.substring(0, seg1);
                        const num2 = s.substring(seg1, seg1 + seg2);
                        const num3 = s.substring(
                            seg1 + seg2,
                            seg1 + seg2 + seg3,
                        );
                        const num4 = s.substring(seg1 + seg2 + seg3);

                        if (
                            isValid(num1) &&
                            isValid(num2) &&
                            isValid(num3) &&
                            isValid(num4)
                        ) {
                            res.push(`${num1}.${num2}.${num3}.${num4}`);
                        }
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> RestoreIpAddresses(string s) {
        List<string> res = new List<string>();
        if (s.Length > 12) return res;

        bool Valid(string num) {
            return num.Length == 1 || (int.Parse(num) < 256 && num[0] != '0');
        }

        void Add(int s1, int s2, int s3, int s4) {
            if (s1 + s2 + s3 + s4 != s.Length) return;

            string num1 = s.Substring(0, s1);
            string num2 = s.Substring(s1, s2);
            string num3 = s.Substring(s1 + s2, s3);
            string num4 = s.Substring(s1 + s2 + s3);

            if (Valid(num1) && Valid(num2) && Valid(num3) && Valid(num4)) {
                res.Add(num1 + "." + num2 + "." + num3 + "." + num4);
            }
        }

        for (int seg1 = 1; seg1 < 4; seg1++) {
            for (int seg2 = 1; seg2 < 4; seg2++) {
                for (int seg3 = 1; seg3 < 4; seg3++) {
                    for (int seg4 = 1; seg4 < 4; seg4++) {
                        Add(seg1, seg2, seg3, seg4);
                    }
                }
            }
        }

        return res;
    }
}
```

```go
func restoreIpAddresses(s string) []string {
    res := []string{}
    if len(s) > 12 {
        return res
    }

    valid := func(num string) bool {
        if len(num) > 1 && num[0] == '0' {
            return false
        }
        val, _ := strconv.Atoi(num)
        return val <= 255
    }

    for seg1 := 1; seg1 < 4; seg1++ {
        for seg2 := 1; seg2 < 4; seg2++ {
            for seg3 := 1; seg3 < 4; seg3++ {
                for seg4 := 1; seg4 < 4; seg4++ {
                    if seg1+seg2+seg3+seg4 != len(s) {
                        continue
                    }

                    num1 := s[:seg1]
                    num2 := s[seg1 : seg1+seg2]
                    num3 := s[seg1+seg2 : seg1+seg2+seg3]
                    num4 := s[seg1+seg2+seg3:]

                    if valid(num1) && valid(num2) && valid(num3) && valid(num4) {
                        res = append(res, num1+"."+num2+"."+num3+"."+num4)
                    }
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun restoreIpAddresses(s: String): List<String> {
        val res = mutableListOf<String>()
        if (s.length > 12) return res

        fun valid(num: String): Boolean {
            if (num.length > 1 && num[0] == '0') return false
            return num.toInt() <= 255
        }

        for (seg1 in 1 until 4) {
            for (seg2 in 1 until 4) {
                for (seg3 in 1 until 4) {
                    for (seg4 in 1 until 4) {
                        if (seg1 + seg2 + seg3 + seg4 != s.length) continue

                        val num1 = s.substring(0, seg1)
                        val num2 = s.substring(seg1, seg1 + seg2)
                        val num3 = s.substring(seg1 + seg2, seg1 + seg2 + seg3)
                        val num4 = s.substring(seg1 + seg2 + seg3)

                        if (valid(num1) && valid(num2) && valid(num3) && valid(num4)) {
                            res.add("$num1.$num2.$num3.$num4")
                        }
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func restoreIpAddresses(_ s: String) -> [String] {
        var res = [String]()
        if s.count > 12 { return res }
        let chars = Array(s)

        func valid(_ num: String) -> Bool {
            if num.count > 1 && num.first == "0" { return false }
            guard let val = Int(num) else { return false }
            return val <= 255
        }

        for seg1 in 1..<4 {
            for seg2 in 1..<4 {
                for seg3 in 1..<4 {
                    for seg4 in 1..<4 {
                        if seg1 + seg2 + seg3 + seg4 != chars.count { continue }

                        let num1 = String(chars[0..<seg1])
                        let num2 = String(chars[seg1..<(seg1 + seg2)])
                        let num3 = String(chars[(seg1 + seg2)..<(seg1 + seg2 + seg3)])
                        let num4 = String(chars[(seg1 + seg2 + seg3)...])

                        if valid(num1) && valid(num2) && valid(num3) && valid(num4) {
                            res.append("\(num1).\(num2).\(num3).\(num4)")
                        }
                    }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ n * n)$
- Space complexity: $O(m * n)$

> Where $m$ is equals to $3$ as there are at most three digits in a valid segment and $n$ is equals to $4$ as there are four segments in a valid IP.
