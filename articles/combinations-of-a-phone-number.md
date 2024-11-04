## 1. Bactracking

::tabs-start

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        res = []
        digitToChar = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "qprs",
            "8": "tuv",
            "9": "wxyz",
        }

        def backtrack(i, curStr):
            if len(curStr) == len(digits):
                res.append(curStr)
                return
            for c in digitToChar[digits[i]]:
                backtrack(i + 1, curStr + c)

        if digits:
            backtrack(0, "")

        return res
```

```java
public class Solution {

    private List<String> res = new ArrayList<>();
    private String[] digitToChar = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "qprs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) return res;
        backtrack(0, "", digits);
        return res;
    }

    private void backtrack(int i, String curStr, String digits) {
        if (curStr.length() == digits.length()) {
            res.add(curStr);
            return;
        }
        String chars = digitToChar[digits.charAt(i) - '0'];
        for (char c : chars.toCharArray()) {
            backtrack(i + 1, curStr + c, digits);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<string> res;
    vector<string> digitToChar = {"", "", "abc", "def", "ghi", "jkl", 
                                  "mno", "qprs", "tuv", "wxyz"};

    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return res;
        backtrack(0, "", digits);
        return res;
    }

    void backtrack(int i, string curStr, string &digits) {
        if (curStr.size() == digits.size()) {
            res.push_back(curStr);
            return;
        }
        string chars = digitToChar[digits[i] - '0'];
        for (char c : chars) {
            backtrack(i + 1, curStr + c, digits);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} digits
     * @return {string[]}
     */
    letterCombinations(digits) {
        let res = [];
        if (digits.length === 0) return res;
        const digitToChar = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "qprs",
            "8": "tuv",
            "9": "wxyz"
        };

        const backtrack = (i, curStr) => {
            if (curStr.length === digits.length) {
                res.push(curStr);
                return;
            }
            for (const c of digitToChar[digits[i]]) {
                backtrack(i + 1, curStr + c);
            }
        }
        backtrack(0, "");
        return res;
    }
}
```

```csharp
public class Solution {
    
    private List<string> res = new List<string>();
    private Dictionary<char, string> digitToChar = new Dictionary<char, string> {
        {'2', "abc"}, {'3', "def"}, {'4', "ghi"}, {'5', "jkl"},
        {'6', "mno"}, {'7', "qprs"}, {'8', "tuv"}, {'9', "wxyz"}
    };

    public List<string> LetterCombinations(string digits) {
        if (digits.Length == 0) return res;
        Backtrack(0, "", digits);
        return res;
    }

    private void Backtrack(int i, string curStr, string digits) {
        if (curStr.Length == digits.Length) {
            res.Add(curStr);
            return;
        }
        foreach (char c in digitToChar[digits[i]]) {
            Backtrack(i + 1, curStr + c, digits);
        }
    }
}
```

```go
func letterCombinations(digits string) []string {
    if len(digits) == 0 {
        return []string{}
    }

    res := []string{}
    digitToChar := map[byte]string{
        '2': "abc",
        '3': "def",
        '4': "ghi",
        '5': "jkl",
        '6': "mno",
        '7': "pqrs",
        '8': "tuv",
        '9': "wxyz",
    }

    var backtrack func(i int, curStr string)
    backtrack = func(i int, curStr string) {
        if len(curStr) == len(digits) {
            res = append(res, curStr)
            return
        }
        for _, c := range digitToChar[digits[i]] {
            backtrack(i+1, curStr+string(c))
        }
    }

    backtrack(0, "")
    return res
}
```

```kotlin
class Solution {
    fun letterCombinations(digits: String): List<String> {
        if (digits.isEmpty()) return emptyList()

        val res = mutableListOf<String>()
        val digitToChar = mapOf(
            '2' to "abc",
            '3' to "def",
            '4' to "ghi",
            '5' to "jkl",
            '6' to "mno",
            '7' to "pqrs",
            '8' to "tuv",
            '9' to "wxyz"
        )

        fun backtrack(i: Int, curStr: String) {
            if (curStr.length == digits.length) {
                res.add(curStr)
                return
            }
            for (c in digitToChar[digits[i]]!!) {
                backtrack(i + 1, curStr + c)
            }
        }

        backtrack(0, "")
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 4 ^ n)$
* Space complexity: $O(n)$

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        res = [""]
        digitToChar = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "qprs",
            "8": "tuv",
            "9": "wxyz",
        }

        for digit in digits:
            tmp = []
            for curStr in res:
                for c in digitToChar[digit]:
                    tmp.append(curStr + c)
            res = tmp
        return res
```

```java
public class Solution {
    
    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) return new ArrayList<>();
        
        List<String> res = new ArrayList<>();
        res.add("");
        String[] digitToChar = {
            "", "", "abc", "def", "ghi", "jkl", 
            "mno", "qprs", "tuv", "wxyz"
        };

        for (char digit : digits.toCharArray()) {
            List<String> tmp = new ArrayList<>();
            for (String curStr : res) {
                for (char c : digitToChar[digit - '0'].toCharArray()) {
                    tmp.add(curStr + c);
                }
            }
            res = tmp;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        
        vector<string> res = {""};
        vector<string> digitToChar = {
            "", "", "abc", "def", "ghi", "jkl",
            "mno", "qprs", "tuv", "wxyz"
        };

        for (char digit : digits) {
            vector<string> tmp;
            for (string &curStr : res) {
                for (char c : digitToChar[digit - '0']) {
                    tmp.push_back(curStr + c);
                }
            }
            res = tmp;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} digits
     * @return {string[]}
     */
    letterCombinations(digits) {
        if (digits.length === 0) return [];
    
        let res = [""];
        const digitToChar = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "qprs",
            "8": "tuv",
            "9": "wxyz"
        };

        for (const digit of digits) {
            const tmp = [];
            for (const curStr of res) {
                for (const c of digitToChar[digit]) {
                    tmp.push(curStr + c);
                }
            }
            res = tmp;
        }
        return res;
    }
}
```

```csharp
public class Solution {

    public List<string> LetterCombinations(string digits) {
        if (digits.Length == 0) return new List<string>();
        
        List<string> res = new List<string> { "" };
        Dictionary<char, string> digitToChar = new Dictionary<char, string> {
            { '2', "abc" }, { '3', "def" }, { '4', "ghi" }, { '5', "jkl" },
            { '6', "mno" }, { '7', "qprs" }, { '8', "tuv" }, { '9', "wxyz" }
        };

        foreach (char digit in digits) {
            List<string> tmp = new List<string>();
            foreach (string curStr in res) {
                foreach (char c in digitToChar[digit]) {
                    tmp.Add(curStr + c);
                }
            }
            res = tmp;
        }
        return res;
    }
}
```

```go
func letterCombinations(digits string) []string {
    if len(digits) == 0 {
        return []string{}
    }

    res := []string{""}
    digitToChar := map[byte]string{
        '2': "abc",
        '3': "def",
        '4': "ghi",
        '5': "jkl",
        '6': "mno",
        '7': "pqrs",
        '8': "tuv",
        '9': "wxyz",
    }

    for i := 0; i < len(digits); i++ {
        digit := digits[i]
        tmp := []string{}
        for _, curStr := range res {
            for _, c := range digitToChar[digit] {
                tmp = append(tmp, curStr+string(c))
            }
        }
        res = tmp
    }
    return res
}
```

```kotlin
class Solution {
    fun letterCombinations(digits: String): List<String> {
        if (digits.isEmpty()) return emptyList()

        var res = listOf("")
        val digitToChar = mapOf(
            '2' to "abc",
            '3' to "def",
            '4' to "ghi",
            '5' to "jkl",
            '6' to "mno",
            '7' to "pqrs",
            '8' to "tuv",
            '9' to "wxyz"
        )

        for (digit in digits) {
            val tmp = mutableListOf<String>()
            for (curStr in res) {
                for (c in digitToChar[digit]!!) {
                    tmp.add(curStr + c)
                }
            }
            res = tmp
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 4 ^ n)$
* Space complexity: $O(n)$