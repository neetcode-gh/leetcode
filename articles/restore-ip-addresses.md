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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ n * n)$
- Space complexity: $O(m * n)$

> Where $m$ is equals to $3$ as there are at most three digits in a valid segment and $n$ is equals to $4$ as there are four segments in a valid IP.
