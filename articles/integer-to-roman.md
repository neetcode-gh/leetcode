## 1. Math - I

### Intuition

Roman numerals are built by combining symbols that represent specific values. The key insight is to process values from largest to smallest, repeatedly subtracting the largest possible value and appending its symbol. We include the subtractive combinations (like IV for 4, IX for 9) in our value list to handle them naturally.

### Algorithm

1. Create a list of symbol-value pairs in ascending order, including subtractive forms (IV, IX, XL, XC, CD, CM).
2. Iterate through the list from largest to smallest value.
3. For each pair, divide the remaining number by the value to get the `count`.
4. Append the symbol `count` times to the result and update the number using modulo.
5. Return the resulting Roman numeral string.

::tabs-start

```python
class Solution:
    def intToRoman(self, num: int) -> str:
        symList = [
            ["I", 1], ["IV", 4], ["V", 5], ["IX", 9],
            ["X", 10], ["XL", 40], ["L", 50], ["XC", 90],
            ["C", 100], ["CD", 400], ["D", 500], ["CM", 900],
            ["M", 1000]
        ]

        res = ""
        for sym, val in reversed(symList):
            count = num // val
            if count:
                res += sym * count
                num %= val

        return res
```

```java
public class Solution {
    public String intToRoman(int num) {
        String[][] symList = {
            {"I", "1"}, {"IV", "4"}, {"V", "5"}, {"IX", "9"},
            {"X", "10"}, {"XL", "40"}, {"L", "50"}, {"XC", "90"},
            {"C", "100"}, {"CD", "400"}, {"D", "500"}, {"CM", "900"},
            {"M", "1000"}
        };

        StringBuilder res = new StringBuilder();
        for (int i = symList.length - 1; i >= 0; i--) {
            String sym = symList[i][0];
            int val = Integer.parseInt(symList[i][1]);
            int count = num / val;
            if (count > 0) {
                res.append(sym.repeat(count));
                num %= val;
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string intToRoman(int num) {
        vector<pair<string, int>> symList = {
            {"I", 1}, {"IV", 4}, {"V", 5}, {"IX", 9},
            {"X", 10}, {"XL", 40}, {"L", 50}, {"XC", 90},
            {"C", 100}, {"CD", 400}, {"D", 500}, {"CM", 900},
            {"M", 1000}
        };

        string res = "";
        for (int i = symList.size() - 1; i >= 0; i--) {
            string sym = symList[i].first;
            int val = symList[i].second;
            int count = num / val;
            if (count > 0) {
                res.append(count, sym[0]);
                if (sym.size() == 2) res.append(1, sym[1]);
                num %= val;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} num
     * @return {string}
     */
    intToRoman(num) {
        const symList = [
            ['I', 1],
            ['IV', 4],
            ['V', 5],
            ['IX', 9],
            ['X', 10],
            ['XL', 40],
            ['L', 50],
            ['XC', 90],
            ['C', 100],
            ['CD', 400],
            ['D', 500],
            ['CM', 900],
            ['M', 1000],
        ];

        let res = '';
        for (let i = symList.length - 1; i >= 0; i--) {
            const [sym, val] = symList[i];
            let count = Math.floor(num / val);
            if (count > 0) {
                res += sym.repeat(count);
                num %= val;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public string IntToRoman(int num) {
        string[][] symList = new string[][] {
            new[] {"I", "1"},   new[] {"IV", "4"},
            new[] {"V", "5"},   new[] {"IX", "9"},
            new[] {"X", "10"},  new[] {"XL", "40"},
            new[] {"L", "50"},  new[] {"XC", "90"},
            new[] {"C", "100"}, new[] {"CD", "400"},
            new[] {"D", "500"}, new[] {"CM", "900"},
            new[] {"M", "1000"}
        };

        var res = new StringBuilder();
        for (int i = symList.Length - 1; i >= 0; i--) {
            string sym = symList[i][0];
            int val = int.Parse(symList[i][1]);
            int count = num / val;
            for (int k = 0; k < count; k++) {
                res.Append(sym);
            }
            num %= val;
        }

        return res.ToString();
    }
}
```

```go
func intToRoman(num int) string {
    symList := [][]interface{}{
        {"I", 1}, {"IV", 4}, {"V", 5}, {"IX", 9},
        {"X", 10}, {"XL", 40}, {"L", 50}, {"XC", 90},
        {"C", 100}, {"CD", 400}, {"D", 500}, {"CM", 900},
        {"M", 1000},
    }

    res := ""
    for i := len(symList) - 1; i >= 0; i-- {
        sym := symList[i][0].(string)
        val := symList[i][1].(int)
        count := num / val
        for j := 0; j < count; j++ {
            res += sym
        }
        num %= val
    }

    return res
}
```

```kotlin
class Solution {
    fun intToRoman(num: Int): String {
        val symList = listOf(
            "I" to 1, "IV" to 4, "V" to 5, "IX" to 9,
            "X" to 10, "XL" to 40, "L" to 50, "XC" to 90,
            "C" to 100, "CD" to 400, "D" to 500, "CM" to 900,
            "M" to 1000
        )

        var n = num
        val res = StringBuilder()
        for (i in symList.indices.reversed()) {
            val (sym, v) = symList[i]
            val count = n / v
            repeat(count) {
                res.append(sym)
            }
            n %= v
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func intToRoman(_ num: Int) -> String {
        let symList: [(String, Int)] = [
            ("I", 1), ("IV", 4), ("V", 5), ("IX", 9),
            ("X", 10), ("XL", 40), ("L", 50), ("XC", 90),
            ("C", 100), ("CD", 400), ("D", 500), ("CM", 900),
            ("M", 1000)
        ]

        var num = num
        var res = ""
        for i in stride(from: symList.count - 1, through: 0, by: -1) {
            let (sym, val) = symList[i]
            let count = num / val
            for _ in 0..<count {
                res += sym
            }
            num %= val
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 2. Math - II

### Intuition

Since the input is constrained to 1-3999, we can precompute all possible Roman representations for each digit place (ones, tens, hundreds, thousands). Then we simply look up each digit and concatenate the results. This trades space for simplicity and speed.

### Algorithm

1. Create four arrays containing Roman representations for:
   - Thousands: "", "M", "MM", "MMM"
   - Hundreds: "", "C", "CC", ... "CM"
   - Tens: "", "X", "XX", ... "XC"
   - Ones: "", "I", "II", ... "IX"
2. Extract each digit using division and modulo.
3. Look up the corresponding string from each array.
4. Concatenate and return the result.

::tabs-start

```python
class Solution:
    def intToRoman(self, num: int) -> str:
        thousands = ["", "M", "MM", "MMM"]
        hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
        tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
        ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]

        return (
            thousands[num // 1000] +
            hundreds[(num % 1000) // 100] +
            tens[(num % 100) // 10] +
            ones[num % 10]
        )
```

```java
public class Solution {
    public String intToRoman(int num) {
        String[] thousands = {"", "M", "MM", "MMM"};
        String[] hundreds = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        String[] tens = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        String[] ones = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

        return thousands[num / 1000] +
               hundreds[(num % 1000) / 100] +
               tens[(num % 100) / 10] +
               ones[num % 10];
    }
}
```

```cpp
class Solution {
public:
    string intToRoman(int num) {
        string thousands[] = {"", "M", "MM", "MMM"};
        string hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        string tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        string ones[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

        return thousands[num / 1000] +
               hundreds[(num % 1000) / 100] +
               tens[(num % 100) / 10] +
               ones[num % 10];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} num
     * @return {string}
     */
    intToRoman(num) {
        const thousands = ['', 'M', 'MM', 'MMM'];
        const hundreds = [
            '',
            'C',
            'CC',
            'CCC',
            'CD',
            'D',
            'DC',
            'DCC',
            'DCCC',
            'CM',
        ];
        const tens = [
            '',
            'X',
            'XX',
            'XXX',
            'XL',
            'L',
            'LX',
            'LXX',
            'LXXX',
            'XC',
        ];
        const ones = [
            '',
            'I',
            'II',
            'III',
            'IV',
            'V',
            'VI',
            'VII',
            'VIII',
            'IX',
        ];

        return (
            thousands[Math.floor(num / 1000)] +
            hundreds[Math.floor((num % 1000) / 100)] +
            tens[Math.floor((num % 100) / 10)] +
            ones[num % 10]
        );
    }
}
```

```csharp
public class Solution {
    public string IntToRoman(int num) {
        string[] thousands = { "", "M", "MM", "MMM" };
        string[] hundreds  = { "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" };
        string[] tens      = { "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" };
        string[] ones      = { "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" };

        return thousands[num / 1000]
             + hundreds[(num % 1000) / 100]
             + tens[(num % 100) / 10]
             + ones[num % 10];
    }
}
```

```go
func intToRoman(num int) string {
    thousands := []string{"", "M", "MM", "MMM"}
    hundreds := []string{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"}
    tens := []string{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"}
    ones := []string{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"}

    return thousands[num/1000] +
        hundreds[(num%1000)/100] +
        tens[(num%100)/10] +
        ones[num%10]
}
```

```kotlin
class Solution {
    fun intToRoman(num: Int): String {
        val thousands = arrayOf("", "M", "MM", "MMM")
        val hundreds = arrayOf("", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM")
        val tens = arrayOf("", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC")
        val ones = arrayOf("", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX")

        return thousands[num / 1000] +
                hundreds[(num % 1000) / 100] +
                tens[(num % 100) / 10] +
                ones[num % 10]
    }
}
```

```swift
class Solution {
    func intToRoman(_ num: Int) -> String {
        let thousands = ["", "M", "MM", "MMM"]
        let hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
        let tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
        let ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]

        return thousands[num / 1000] +
            hundreds[(num % 1000) / 100] +
            tens[(num % 100) / 10] +
            ones[num % 10]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
