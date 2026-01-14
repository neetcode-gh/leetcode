## 1. Multiplication & Addition

### Intuition

This approach mimics how we multiply numbers by hand. We multiply the larger number by each digit of the smaller number (starting from the rightmost digit), shifting the result appropriately by appending zeros. Then we add all these partial products together. This simulates the grade-school multiplication algorithm but operates entirely on strings to handle arbitrarily large numbers.

### Algorithm

1. If either number is "0", return "0" immediately.
2. Ensure `num1` is the longer number (swap if needed for efficiency).
3. For each digit in `num2` from right to left:
   - Multiply `num1` by that single digit using a helper function.
   - Append the appropriate number of trailing zeros based on the digit's position.
   - Add this partial `res` to the running total using a string addition helper.
4. The string addition and multiplication helpers handle `carry` values and build the result digit by digit.
5. Return the accumulated `res`.

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
        if (num1 === '0' || num2 === '0') return '0';

        if (num1.length < num2.length) {
            return this.multiply(num2, num1);
        }

        let res = '';
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
        let cur = '';

        while (i >= 0 || carry) {
            const n = i >= 0 ? Number(s[i]) : 0;
            const prod = n * digit + carry;
            cur = (prod % 10) + cur;
            carry = Math.floor(prod / 10);
            i--;
        }

        return cur + '0'.repeat(zero);
    }

    /**
     * @param {string} num1
     * @param {string} num2
     * @return {string}
     */
    add(num1, num2) {
        let i = num1.length - 1,
            j = num2.length - 1,
            carry = 0;
        let res = '';

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

```go
func multiply(num1 string, num2 string) string {
    if num1 == "0" || num2 == "0" {
        return "0"
    }

    if len(num1) < len(num2) {
        return multiply(num2, num1)
    }

    res, zero := "", 0
    for i := len(num2) - 1; i >= 0; i-- {
        cur := mul(num1, num2[i], zero)
        res = add(res, cur)
        zero++
    }

    return res
}

func mul(s string, d byte, zero int) string {
    i, carry := len(s)-1, 0
    d = d - '0'
    cur := make([]byte, 0)

    for i >= 0 || carry > 0 {
        var n int
        if i >= 0 {
            n = int(s[i] - '0')
        }
        prod := n*int(d) + carry
        cur = append(cur, byte(prod%10+'0'))
        carry = prod / 10
        i--
    }

    for i := 0; i < len(cur)/2; i++ {
        cur[i], cur[len(cur)-1-i] = cur[len(cur)-1-i], cur[i]
    }

    result := string(cur)
    for i := 0; i < zero; i++ {
        result += "0"
    }
    return result
}

func add(num1 string, num2 string) string {
    i, j, carry := len(num1)-1, len(num2)-1, 0
    res := make([]byte, 0)

    for i >= 0 || j >= 0 || carry > 0 {
        var n1, n2 int
        if i >= 0 {
            n1 = int(num1[i] - '0')
        }
        if j >= 0 {
            n2 = int(num2[j] - '0')
        }
        total := n1 + n2 + carry
        res = append(res, byte(total%10+'0'))
        carry = total / 10
        i--
        j--
    }

    for i := 0; i < len(res)/2; i++ {
        res[i], res[len(res)-1-i] = res[len(res)-1-i], res[i]
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun multiply(num1: String, num2: String): String {
        if (num1 == "0" || num2 == "0") {
            return "0"
        }

        if (num1.length < num2.length) {
            return multiply(num2, num1)
        }

        var res = ""
        var zero = 0
        for (i in num2.length - 1 downTo 0) {
            val cur = mul(num1, num2[i], zero)
            res = add(res, cur)
            zero++
        }

        return res
    }

    private fun mul(s: String, d: Char, zero: Int): String {
        var i = s.length - 1
        var carry = 0
        val dInt = d - '0'
        val cur = mutableListOf<Char>()

        while (i >= 0 || carry > 0) {
            val n = if (i >= 0) s[i] - '0' else 0
            val prod = n * dInt + carry
            cur.add((prod % 10 + '0'.code).toChar())
            carry = prod / 10
            i--
        }

        return cur.reversed().joinToString("") + "0".repeat(zero)
    }

    private fun add(num1: String, num2: String): String {
        var i = num1.length - 1
        var j = num2.length - 1
        var carry = 0
        val res = mutableListOf<Char>()

        while (i >= 0 || j >= 0 || carry > 0) {
            val n1 = if (i >= 0) num1[i] - '0' else 0
            val n2 = if (j >= 0) num2[j] - '0' else 0
            val total = n1 + n2 + carry
            res.add((total % 10 + '0'.code).toChar())
            carry = total / 10
            i--
            j--
        }

        return res.reversed().joinToString("")
    }
}
```

```swift
class Solution {
    func multiply(_ num1: String, _ num2: String) -> String {
        if num1 == "0" || num2 == "0" {
            return "0"
        }
        if num1.count < num2.count {
            return multiply(num2, num1)
        }

        var res = ""
        var zero = 0
        let num2Arr = Array(num2)

        for i in stride(from: num2Arr.count - 1, through: 0, by: -1) {
            let cur = mul(num1, num2Arr[i], zero)
            res = add(res, cur)
            zero += 1
        }

        return res
    }

    func mul(_ s: String, _ d: Character, _ zero: Int) -> String {
        var i = s.count - 1
        var carry = 0
        let dInt = Int(String(d))!
        let sArr = Array(s)
        var cur = [String]()

        while i >= 0 || carry > 0 {
            let n = i >= 0 ? Int(String(sArr[i]))! : 0
            let prod = n * dInt + carry
            cur.append(String(prod % 10))
            carry = prod / 10
            i -= 1
        }

        let prodStr = cur.reversed().joined()
        let zeros = String(repeating: "0", count: zero)
        return prodStr + zeros
    }

    func add(_ num1: String, _ num2: String) -> String {
        let s1 = Array(num1)
        let s2 = Array(num2)
        var i = s1.count - 1
        var j = s2.count - 1
        var carry = 0
        var res = [String]()

        while i >= 0 || j >= 0 || carry > 0 {
            let n1 = i >= 0 ? Int(String(s1[i]))! : 0
            let n2 = j >= 0 ? Int(String(s2[j]))! : 0
            let total = n1 + n2 + carry
            res.append(String(total % 10))
            carry = total / 10
            i -= 1
            j -= 1
        }

        return res.reversed().joined()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n) * (m + n))$
- Space complexity: $O(m + n)$

> Where $m$ is the length of the string $num1$ and $n$ is the length of the string $num2$.

---

## 2. Multiplication

### Intuition

Instead of generating partial products and adding them as separate strings, we can use a single result array to accumulate all digit multiplications in place. When we multiply digit `i` of `num1` by digit `j` of `num2`, the result contributes to position `i + j` in the final answer. By reversing both strings first, we can work with indices that naturally align with place values. After processing all digit pairs, we handle carries and convert the result array back to a string.

### Algorithm

1. If either number is "0", return "0" immediately.
2. Create a result array of size `len(num1) + len(num2)` initialized to zeros.
3. Reverse both input strings so index `0` corresponds to the ones place.
4. For each pair of indices `(i1, i2)`:
   - Multiply the corresponding digits.
   - Add the product to `res[i1 + i2]`.
   - Propagate any `carry` to `res[i1 + i2 + 1]`.
   - Keep only the ones digit at `res[i1 + i2]`.
5. Reverse the `res` array, skip leading zeros, and join the digits into a string.

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

```go
func multiply(num1 string, num2 string) string {
    if num1 == "0" || num2 == "0" {
        return "0"
    }

    res := make([]int, len(num1)+len(num2))
    for i1 := len(num1) - 1; i1 >= 0; i1-- {
        for i2 := len(num2) - 1; i2 >= 0; i2-- {
            pos := len(num1) - 1 - i1 + len(num2) - 1 - i2
            digit := int(num1[i1]-'0') * int(num2[i2]-'0')

            res[pos] += digit
            res[pos+1] += res[pos] / 10
            res[pos] = res[pos] % 10
        }
    }

    var result strings.Builder
    start := len(res) - 1
    for start >= 0 && res[start] == 0 {
        start--
    }
    if start < 0 {
        return "0"
    }

    for i := start; i >= 0; i-- {
        result.WriteString(strconv.Itoa(res[i]))
    }

    return result.String()
}
```

```kotlin
class Solution {
    fun multiply(num1: String, num2: String): String {
        if ("0" in listOf(num1, num2)) {
            return "0"
        }

        val res = IntArray(num1.length + num2.length)
        for (i1 in num1.indices.reversed()) {
            for (i2 in num2.indices.reversed()) {
                val pos = (num1.length - 1 - i1) + (num2.length - 1 - i2)
                val digit = (num1[i1] - '0') * (num2[i2] - '0')

                res[pos] += digit
                res[pos + 1] += res[pos] / 10
                res[pos] = res[pos] % 10
            }
        }

        var start = res.size - 1
        while (start >= 0 && res[start] == 0) {
            start--
        }

        if (start < 0) {
            return "0"
        }

        return buildString {
            for (i in start downTo 0) {
                append(res[i])
            }
        }
    }
}
```

```swift
class Solution {
    func multiply(_ num1: String, _ num2: String) -> String {
        if num1 == "0" || num2 == "0" {
            return "0"
        }

        let n1 = Array(num1.reversed()).map { Int(String($0))! }
        let n2 = Array(num2.reversed()).map { Int(String($0))! }
        var res = [Int](repeating: 0, count: num1.count + num2.count)

        for i1 in 0..<n1.count {
            for i2 in 0..<n2.count {
                let digit = n1[i1] * n2[i2]
                res[i1 + i2] += digit
                res[i1 + i2 + 1] += res[i1 + i2] / 10
                res[i1 + i2] %= 10
            }
        }

        res.reverse()
        var beg = 0
        while beg < res.count && res[beg] == 0 {
            beg += 1
        }

        return res[beg...].map { String($0) }.joined()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m + n)$

> Where $m$ is the length of the string $num1$ and $n$ is the length of the string $num2$.

## Common Pitfalls

### Not Handling the Zero Case

When either input is "0", the result must be "0". Failing to check this upfront can lead to returning an empty string or a string with leading zeros. Always check for zero inputs before proceeding with multiplication to avoid unnecessary computation and incorrect output formatting.

### Incorrect Position Indexing for Digit Products

When multiplying digit `i` of `num1` by digit `j` of `num2`, the result contributes to a specific position in the output array. If strings are reversed, the position is `i + j`; if not, careful index calculation is needed. Off-by-one errors in position calculation cause digits to be placed incorrectly, resulting in a wrong final product.

### Forgetting to Handle Leading Zeros in the Result

After populating the result array, there may be leading zeros (especially at the highest index positions after reversing). Skipping these zeros before converting to a string is essential. However, if all digits are zero (which should not happen if the zero case is handled), ensure at least one "0" is returned rather than an empty string.
