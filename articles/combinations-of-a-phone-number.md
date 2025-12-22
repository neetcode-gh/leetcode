## 1. Backtracking

### Intuition
Each digit maps to a set of characters (like on a phone keypad).  
The task is to **choose one character per digit**, in order, and generate **all possible combinations**.

Think of it as building a string **step by step**:
- At index `i`, pick **one character** from the mapping of `digits[i]`
- Move to the next digit
- When the length of the built string equals the number of digits, we have formed **one valid combination**

This is a classic **decision tree** problem:
- Each level → one digit
- Each branch → one possible character for that digit

Backtracking lets us explore all branches efficiently.

---

### Algorithm
1. If the input string is empty, return an empty list.
2. Create a mapping from digits (`2–9`) to their corresponding letters.
3. Use a recursive function `backtrack(index, currentString)`:
   - If `currentString` length equals the number of digits:
     - Add it to the result.
     - Return.
   - Otherwise:
     - For each character mapped from `digits[index]`:
       - Append the character to `currentString`
       - Recurse to the next index.
4. Start backtracking from index `0` with an empty string.
5. Return all collected combinations.

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
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'qprs',
            8: 'tuv',
            9: 'wxyz',
        };

        const backtrack = (i, curStr) => {
            if (curStr.length === digits.length) {
                res.push(curStr);
                return;
            }
            for (const c of digitToChar[digits[i]]) {
                backtrack(i + 1, curStr + c);
            }
        };
        backtrack(0, '');
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

```swift
class Solution {
    func letterCombinations(_ digits: String) -> [String] {
        guard !digits.isEmpty else { return [] }

        let digitToChar: [Character: String] = [
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        ]

        var res = [String]()
        let digitsArray = Array(digits)

        func backtrack(_ i: Int, _ curStr: String) {
            if curStr.count == digits.count {
                res.append(curStr)
                return
            }
            if let letters = digitToChar[digitsArray[i]] {
                for c in letters {
                    backtrack(i + 1, curStr + String(c))
                }
            }
        }

        backtrack(0, "")
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 4 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(n * 4 ^ n)$ space for the output list.

---

## 2. Iteration

### Intuition
Instead of using recursion, we **build combinations level by level**.

Start with an empty string.  
For each digit:
- Take all combinations built so far
- Append every possible character mapped to the current digit
- This creates a new list of combinations

This is similar to **BFS / level-wise expansion**:
- Each digit adds a new “layer” of characters
- Combinations grow step by step until all digits are processed

---

### Algorithm
1. If the input string is empty, return an empty list.
2. Initialize the result list with one empty string: `[""]`.
3. Create a digit-to-characters mapping (phone keypad).
4. For each digit in the input:
   - Create a temporary list.
   - For every existing string in the result:
     - Append each possible character of the current digit.
     - Store the new strings in the temporary list.
   - Replace the result list with the temporary list.
5. After processing all digits, return the result list.

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

        let res = [''];
        const digitToChar = {
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'qprs',
            8: 'tuv',
            9: 'wxyz',
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

```swift
class Solution {
    func letterCombinations(_ digits: String) -> [String] {
        guard !digits.isEmpty else { return [] }

        let digitToChar: [Character: String] = [
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        ]

        var res = [""]

        for digit in digits {
            guard let letters = digitToChar[digit] else { continue }
            var tmp = [String]()
            for curStr in res {
                for c in letters {
                    tmp.append(curStr + String(c))
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

- Time complexity: $O(n * 4 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(n * 4 ^ n)$ space for the output list.
