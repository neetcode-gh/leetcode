## 1. Math - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 2. Math - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
