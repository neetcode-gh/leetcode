## 1. Multiplication & Addition

::tabs-start

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"
        
        if len(num1) < len(num2):
            return self.multiply(num2, num1)
        
        res, zero = "", 0
        for i in range(len(num2) - 1, -1, -1):
            cur = self.mul(num1, num2[i], zero)
            res = self.add(res, cur)
            zero += 1
        
        return res
    
    def mul(self, s: str, d: str, zero: int) -> str:
        i, carry = len(s) - 1, 0
        d = int(d)
        cur = []

        while i >= 0 or carry:
            n = int(s[i]) if i >= 0 else 0
            prod = n * d + carry
            cur.append(str(prod % 10))
            carry = prod // 10
            i -= 1
        
        return ''.join(cur[::-1]) + '0' * zero

    def add(self, num1: str, num2: str) -> str:
        i, j, carry = len(num1) - 1, len(num2) - 1, 0
        res = []

        while i >= 0 or j >= 0 or carry:
            n1 = int(num1[i]) if i >= 0 else 0
            n2 = int(num2[j]) if j >= 0 else 0
            total = n1 + n2 + carry
            res.append(str(total % 10))
            carry = total // 10
            i -= 1
            j -= 1
        
        return ''.join(res[::-1])
```

```java
public class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";

        if (num1.length() < num2.length()) {
            return multiply(num2, num1);
        }
        
        String res = "";
        int zero = 0;
        for (int i = num2.length() - 1; i >= 0; i--) {
            String cur = mul(num1, num2.charAt(i), zero);
            res = add(res, cur);
            zero++;
        }
        
        return res;
    }
    
    private String mul(String s, char d, int zero) {
        int i = s.length() - 1, carry = 0;
        int digit = d - '0';
        StringBuilder cur = new StringBuilder();

        while (i >= 0 || carry > 0) {
            int n = (i >= 0) ? s.charAt(i) - '0' : 0;
            int prod = n * digit + carry;
            cur.append(prod % 10);
            carry = prod / 10;
            i--;
        }
        
        return cur.reverse().toString() + "0".repeat(zero);
    }

    private String add(String num1, String num2) {
        int i = num1.length() - 1, j = num2.length() - 1, carry = 0;
        StringBuilder res = new StringBuilder();

        while (i >= 0 || j >= 0 || carry > 0) {
            int n1 = (i >= 0) ? num1.charAt(i) - '0' : 0;
            int n2 = (j >= 0) ? num2.charAt(j) - '0' : 0;
            int total = n1 + n2 + carry;
            res.append(total % 10);
            carry = total / 10;
            i--;
            j--;
        }
        
        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        
        if (num1.size() < num2.size()) {
            return multiply(num2, num1);
        }
        
        string res = "";
        int zero = 0;
        for (int i = num2.size() - 1; i >= 0; --i) {
            string cur = mul(num1, num2[i], zero);
            res = add(res, cur);
            zero++;
        }
        
        return res;
    }
    
    string mul(string s, char d, int zero) {
        int i = s.size() - 1, carry = 0;
        int digit = d - '0';
        string cur;

        while (i >= 0 || carry) {
            int n = (i >= 0) ? s[i] - '0' : 0;
            int prod = n * digit + carry;
            cur.push_back((prod % 10) + '0');
            carry = prod / 10;
            i--;
        }
        
        reverse(cur.begin(), cur.end());
        return cur + string(zero, '0');
    }

    string add(string num1, string num2) {
        int i = num1.size() - 1, j = num2.size() - 1, carry = 0;
        string res;

        while (i >= 0 || j >= 0 || carry) {
            int n1 = (i >= 0) ? num1[i] - '0' : 0;
            int n2 = (j >= 0) ? num2[j] - '0' : 0;
            int total = n1 + n2 + carry;
            res.push_back((total % 10) + '0');
            carry = total / 10;
            i--;
            j--;
        }
        
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num1
     * @param {string} num2
     * @return {string}
     */
    multiply(num1, num2) {
        if (num1 === "0" || num2 === "0") return "0";

        if (num1.length < num2.length) {
            return this.multiply(num2, num1);
        }
        
        let res = "";
        let zero = 0;
        for (let i = num2.length - 1; i >= 0; i--) {
            const cur = this.mul(num1, num2[i], zero);
            res = this.add(res, cur);
            zero++;
        }
        
        return res;
    }
    
    /**
     * @param {string} s
     * @param {Character} d
     * @param {number} zero
     * @return {string}
     */
    mul(s, d, zero) {
        let i = s.length - 1;
        let carry = 0;
        const digit = Number(d);
        let cur = "";

        while (i >= 0 || carry) {
            const n = i >= 0 ? Number(s[i]) : 0;
            const prod = n * digit + carry;
            cur = (prod % 10) + cur;
            carry = Math.floor(prod / 10);
            i--;
        }
        
        return cur + "0".repeat(zero);
    }

    /**
     * @param {string} num1
     * @param {string} num2
     * @return {string}
     */
    add(num1, num2) {
        let i = num1.length - 1, j = num2.length - 1, carry = 0;
        let res = "";

        while (i >= 0 || j >= 0 || carry) {
            const n1 = i >= 0 ? Number(num1[i]) : 0;
            const n2 = j >= 0 ? Number(num2[j]) : 0;
            const total = n1 + n2 + carry;
            res = (total % 10) + res;
            carry = Math.floor(total / 10);
            i--;
            j--;
        }
        
        return res;
    }
}
```

```csharp
public class Solution {
    public string Multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";

        if (num1.Length < num2.Length) {
            return Multiply(num2, num1);
        }
        
        string res = "";
        int zero = 0;
        for (int i = num2.Length - 1; i >= 0; i--) {
            string cur = Mul(num1, num2[i], zero);
            res = Add(res, cur);
            zero++;
        }
        
        return res;
    }
    
    private string Mul(string s, char d, int zero) {
        int i = s.Length - 1, carry = 0;
        int digit = d - '0';
        var cur = new List<char>();

        while (i >= 0 || carry > 0) {
            int n = (i >= 0) ? s[i] - '0' : 0;
            int prod = n * digit + carry;
            cur.Add((char)('0' + (prod % 10)));
            carry = prod / 10;
            i--;
        }
        
        cur.Reverse();
        return new string(cur.ToArray()) + new string('0', zero);
    }

    private string Add(string num1, string num2) {
        int i = num1.Length - 1, j = num2.Length - 1, carry = 0;
        var res = new List<char>();

        while (i >= 0 || j >= 0 || carry > 0) {
            int n1 = (i >= 0) ? num1[i] - '0' : 0;
            int n2 = (j >= 0) ? num2[j] - '0' : 0;
            int total = n1 + n2 + carry;
            res.Add((char)('0' + (total % 10)));
            carry = total / 10;
            i--;
            j--;
        }
        
        res.Reverse();
        return new string(res.ToArray());
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(min(m, n) * (m + n))$
* Space complexity: $O(m + n)$

> Where $m$ is the length of the string $num1$ and $n$ is the length of the string $num2$.

---

## 2. Multiplication

::tabs-start

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if "0" in [num1, num2]:
            return "0"

        res = [0] * (len(num1) + len(num2))
        num1, num2 = num1[::-1], num2[::-1]
        for i1 in range(len(num1)):
            for i2 in range(len(num2)):
                digit = int(num1[i1]) * int(num2[i2])
                res[i1 + i2] += digit
                res[i1 + i2 + 1] += res[i1 + i2] // 10
                res[i1 + i2] = res[i1 + i2] % 10

        res, beg = res[::-1], 0
        while beg < len(res) and res[beg] == 0:
            beg += 1
        res = map(str, res[beg:])
        return "".join(res)
```

```java
public class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) {
            return "0";
        }

        int[] res = new int[num1.length() + num2.length()];
        num1 = new StringBuilder(num1).reverse().toString();
        num2 = new StringBuilder(num2).reverse().toString();
        for (int i1 = 0; i1 < num1.length(); i1++) {
            for (int i2 = 0; i2 < num2.length(); i2++) {
                int digit = (num1.charAt(i1) - '0') * (num2.charAt(i2) - '0');
                res[i1 + i2] += digit;
                res[i1 + i2 + 1] += res[i1 + i2] / 10;
                res[i1 + i2] %= 10;
            }
        }

        StringBuilder result = new StringBuilder();
        int i = res.length - 1;
        while (i >= 0 && res[i] == 0) {
            i--;
        }
        while (i >= 0) {
            result.append(res[i--]);
        }
        return result.toString();
    }
}
```

```cpp
class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") {
            return "0";
        }

        vector<int> res(num1.length() + num2.length(), 0);
        reverse(num1.begin(), num1.end());
        reverse(num2.begin(), num2.end());
        for (int i1 = 0; i1 < num1.length(); i1++) {
            for (int i2 = 0; i2 < num2.length(); i2++) {
                int digit = (num1[i1] - '0') * (num2[i2] - '0');
                res[i1 + i2] += digit;
                res[i1 + i2 + 1] += res[i1 + i2] / 10;
                res[i1 + i2] %= 10;
            }
        }

        stringstream result;
        int i = res.size() - 1;
        while (i >= 0 && res[i] == 0) {
            i--;
        }
        while (i >= 0) {
            result << res[i--];
        }
        return result.str();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num1
     * @param {string} num2
     * @return {string}
     */
    multiply(num1, num2) {
        if (num1 === '0' || num2 === '0') {
            return '0';
        }

        const res = new Array(num1.length + num2.length).fill(0);
        num1 = num1.split('').reverse().join('');
        num2 = num2.split('').reverse().join('');
        for (let i1 = 0; i1 < num1.length; i1++) {
            for (let i2 = 0; i2 < num2.length; i2++) {
                const digit = parseInt(num1[i1]) * parseInt(num2[i2]);
                res[i1 + i2] += digit;
                res[i1 + i2 + 1] += Math.floor(res[i1 + i2] / 10);
                res[i1 + i2] %= 10;
            }
        }

        let result = '';
        let i = res.length - 1;
        while (i >= 0 && res[i] === 0) {
            i--;
        }
        while (i >= 0) {
            result += res[i--];
        }
        return result;
    }
}
```

```csharp
public class Solution {
    public string Multiply(string num1, string num2) {
        if (new string[] { num1, num2 }.Contains("0")) {
            return "0";
        }

        int[] res = new int[num1.Length + num2.Length];
        num1 = new string(num1.Reverse().ToArray());
        num2 = new string(num2.Reverse().ToArray());
        for (int i1 = 0; i1 < num1.Length; i1++) {
            for (int i2 = 0; i2 < num2.Length; i2++) {
                int digit = (num1[i1] - '0') * (num2[i2] - '0');
                res[i1 + i2] += digit;
                res[i1 + i2 + 1] += res[i1 + i2] / 10;
                res[i1 + i2] %= 10;
            }
        }

        Array.Reverse(res);
        int beg = 0;
        while (beg < res.Length && res[beg] == 0) {
            beg++;
        }

        string[] result = res.Skip(beg).Select(x => x.ToString()).ToArray();
        return string.Join("", result);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m + n)$

> Where $m$ is the length of the string $num1$ and $n$ is the length of the string $num2$.