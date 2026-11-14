## 1. Built-In Function

::tabs-start

```python
class Solution:
    def toHexspeak(self, num: str) -> str:
        res = []
        for c in format(int(num), "X"):
            if c == "0":
                res.append("O")
            elif c == "1":
                res.append("I")
            elif c.isdigit():
                return "ERROR"
            else:
                res.append(c)
        return "".join(res)
```

```java
public class Solution {
    public String toHexspeak(String num) {
        String hex = Long.toHexString(Long.parseLong(num)).toUpperCase();
        StringBuilder res = new StringBuilder();
        for (char c : hex.toCharArray()) {
            if (c == '0') {
                res.append('O');
            } else if (c == '1') {
                res.append('I');
            } else if (Character.isDigit(c)) {
                return "ERROR";
            } else {
                res.append(c);
            }
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string toHexspeak(string num) {
        stringstream ss;
        ss << hex << uppercase << stoll(num);
        string res;
        for (char c : ss.str()) {
            if (c == '0') {
                res += 'O';
            } else if (c == '1') {
                res += 'I';
            } else if (isdigit(c)) {
                return "ERROR";
            } else {
                res += c;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    toHexspeak(num) {
        const hex = Number(num).toString(16).toUpperCase();
        let res = '';
        for (const c of hex) {
            if (c === '0') {
                res += 'O';
            } else if (c === '1') {
                res += 'I';
            } else if (c >= '2' && c <= '9') {
                return 'ERROR';
            } else {
                res += c;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public string ToHexspeak(string num) {
        string hex = long.Parse(num).ToString("X");
        var res = new StringBuilder();
        foreach (char c in hex) {
            if (c == '0') {
                res.Append('O');
            } else if (c == '1') {
                res.Append('I');
            } else if (char.IsDigit(c)) {
                return "ERROR";
            } else {
                res.Append(c);
            }
        }
        return res.ToString();
    }
}
```

```go
func toHexspeak(num string) string {
    n, _ := strconv.ParseInt(num, 10, 64)
    hex := fmt.Sprintf("%X", n)
    var res strings.Builder
    for _, c := range hex {
        if c == '0' {
            res.WriteByte('O')
        } else if c == '1' {
            res.WriteByte('I')
        } else if c >= '2' && c <= '9' {
            return "ERROR"
        } else {
            res.WriteRune(c)
        }
    }
    return res.String()
}
```

```kotlin
class Solution {
    fun toHexspeak(num: String): String {
        val hex = num.toLong().toString(16).uppercase()
        val res = StringBuilder()
        for (c in hex) {
            if (c == '0') {
                res.append('O')
            } else if (c == '1') {
                res.append('I')
            } else if (c.isDigit()) {
                return "ERROR"
            } else {
                res.append(c)
            }
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func toHexspeak(_ num: String) -> String {
        let hex = String(Int(num)!, radix: 16, uppercase: true)
        var res = ""
        for c in hex {
            if c == "0" {
                res.append("O")
            } else if c == "1" {
                res.append("I")
            } else if c.isNumber {
                return "ERROR"
            } else {
                res.append(c)
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn to_hexspeak(num: String) -> String {
        let hex = format!("{:X}", num.parse::<i64>().unwrap());
        let mut res = String::new();
        for c in hex.chars() {
            if c == '0' {
                res.push('O');
            } else if c == '1' {
                res.push('I');
            } else if c.is_ascii_digit() {
                return "ERROR".to_string();
            } else {
                res.push(c);
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    toHexspeak(num: string): string {
        const hex = Number(num).toString(16).toUpperCase();
        let res = '';
        for (const c of hex) {
            if (c === '0') {
                res += 'O';
            } else if (c === '1') {
                res += 'I';
            } else if (c >= '2' && c <= '9') {
                return 'ERROR';
            } else {
                res += c;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

> Where $n$ is the integer value of $num$.

---

## 2. Math (Repeated Division)

::tabs-start

```python
class Solution:
    def toHexspeak(self, num: str) -> str:
        n = int(num)
        res = []
        while n > 0:
            d = n % 16
            if d == 0:
                res.append("O")
            elif d == 1:
                res.append("I")
            elif d >= 10:
                res.append(chr(ord("A") + d - 10))
            else:
                return "ERROR"
            n //= 16
        return "".join(reversed(res))
```

```java
public class Solution {
    public String toHexspeak(String num) {
        long n = Long.parseLong(num);
        StringBuilder res = new StringBuilder();
        while (n > 0) {
            int d = (int) (n % 16);
            if (d == 0) {
                res.append('O');
            } else if (d == 1) {
                res.append('I');
            } else if (d >= 10) {
                res.append((char) ('A' + d - 10));
            } else {
                return "ERROR";
            }
            n /= 16;
        }
        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string toHexspeak(string num) {
        long long n = stoll(num);
        string res;
        while (n > 0) {
            int d = n % 16;
            if (d == 0) {
                res += 'O';
            } else if (d == 1) {
                res += 'I';
            } else if (d >= 10) {
                res += (char) ('A' + d - 10);
            } else {
                return "ERROR";
            }
            n /= 16;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    toHexspeak(num) {
        let n = Number(num);
        const res = [];
        while (n > 0) {
            const d = n % 16;
            if (d === 0) {
                res.push('O');
            } else if (d === 1) {
                res.push('I');
            } else if (d >= 10) {
                res.push(String.fromCharCode(65 + d - 10));
            } else {
                return 'ERROR';
            }
            n = Math.floor(n / 16);
        }
        return res.reverse().join('');
    }
}
```

```csharp
public class Solution {
    public string ToHexspeak(string num) {
        long n = long.Parse(num);
        var res = new StringBuilder();
        while (n > 0) {
            int d = (int) (n % 16);
            if (d == 0) {
                res.Insert(0, 'O');
            } else if (d == 1) {
                res.Insert(0, 'I');
            } else if (d >= 10) {
                res.Insert(0, (char) ('A' + d - 10));
            } else {
                return "ERROR";
            }
            n /= 16;
        }
        return res.ToString();
    }
}
```

```go
func toHexspeak(num string) string {
    n, _ := strconv.ParseInt(num, 10, 64)
    res := []byte{}
    for n > 0 {
        d := n % 16
        if d == 0 {
            res = append(res, 'O')
        } else if d == 1 {
            res = append(res, 'I')
        } else if d >= 10 {
            res = append(res, byte('A'+d-10))
        } else {
            return "ERROR"
        }
        n /= 16
    }
    for l, r := 0, len(res)-1; l < r; l, r = l+1, r-1 {
        res[l], res[r] = res[r], res[l]
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun toHexspeak(num: String): String {
        var n = num.toLong()
        val res = StringBuilder()
        while (n > 0) {
            val d = (n % 16).toInt()
            if (d == 0) {
                res.append('O')
            } else if (d == 1) {
                res.append('I')
            } else if (d >= 10) {
                res.append('A' + (d - 10))
            } else {
                return "ERROR"
            }
            n /= 16
        }
        return res.reverse().toString()
    }
}
```

```swift
class Solution {
    func toHexspeak(_ num: String) -> String {
        var n = Int(num)!
        var res = [Character]()
        let letters = Array("ABCDEF")
        while n > 0 {
            let d = n % 16
            if d == 0 {
                res.append("O")
            } else if d == 1 {
                res.append("I")
            } else if d >= 10 {
                res.append(letters[d - 10])
            } else {
                return "ERROR"
            }
            n /= 16
        }
        return String(res.reversed())
    }
}
```

```rust
impl Solution {
    pub fn to_hexspeak(num: String) -> String {
        let mut n: i64 = num.parse().unwrap();
        let mut res = Vec::new();
        while n > 0 {
            let d = (n % 16) as u8;
            if d == 0 {
                res.push(b'O');
            } else if d == 1 {
                res.push(b'I');
            } else if d >= 10 {
                res.push(b'A' + d - 10);
            } else {
                return "ERROR".to_string();
            }
            n /= 16;
        }
        res.reverse();
        String::from_utf8(res).unwrap()
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    toHexspeak(num: string): string {
        let n = Number(num);
        const res: string[] = [];
        while (n > 0) {
            const d = n % 16;
            if (d === 0) {
                res.push('O');
            } else if (d === 1) {
                res.push('I');
            } else if (d >= 10) {
                res.push(String.fromCharCode(65 + d - 10));
            } else {
                return 'ERROR';
            }
            n = Math.floor(n / 16);
        }
        return res.reverse().join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

> Where $n$ is the integer value of $num$.

---

## 3. Bit Manipulation

::tabs-start

```python
class Solution:
    def toHexspeak(self, num: str) -> str:
        n = int(num)
        res = []
        while n > 0:
            d = n & 15
            if d == 0:
                res.append("O")
            elif d == 1:
                res.append("I")
            elif d >= 10:
                res.append(chr(ord("A") + d - 10))
            else:
                return "ERROR"
            n >>= 4
        return "".join(reversed(res))
```

```java
public class Solution {
    public String toHexspeak(String num) {
        long n = Long.parseLong(num);
        StringBuilder res = new StringBuilder();
        while (n > 0) {
            int d = (int) (n & 15);
            if (d == 0) {
                res.append('O');
            } else if (d == 1) {
                res.append('I');
            } else if (d >= 10) {
                res.append((char) ('A' + d - 10));
            } else {
                return "ERROR";
            }
            n >>= 4;
        }
        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string toHexspeak(string num) {
        long long n = stoll(num);
        string res;
        while (n > 0) {
            int d = n & 15;
            if (d == 0) {
                res += 'O';
            } else if (d == 1) {
                res += 'I';
            } else if (d >= 10) {
                res += (char) ('A' + d - 10);
            } else {
                return "ERROR";
            }
            n >>= 4;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    toHexspeak(num) {
        let n = BigInt(num);
        const res = [];
        while (n > 0n) {
            const d = Number(n & 15n);
            if (d === 0) {
                res.push('O');
            } else if (d === 1) {
                res.push('I');
            } else if (d >= 10) {
                res.push(String.fromCharCode(65 + d - 10));
            } else {
                return 'ERROR';
            }
            n >>= 4n;
        }
        return res.reverse().join('');
    }
}
```

```csharp
public class Solution {
    public string ToHexspeak(string num) {
        long n = long.Parse(num);
        var res = new StringBuilder();
        while (n > 0) {
            int d = (int) (n & 15);
            if (d == 0) {
                res.Insert(0, 'O');
            } else if (d == 1) {
                res.Insert(0, 'I');
            } else if (d >= 10) {
                res.Insert(0, (char) ('A' + d - 10));
            } else {
                return "ERROR";
            }
            n >>= 4;
        }
        return res.ToString();
    }
}
```

```go
func toHexspeak(num string) string {
    n, _ := strconv.ParseInt(num, 10, 64)
    res := []byte{}
    for n > 0 {
        d := n & 15
        if d == 0 {
            res = append(res, 'O')
        } else if d == 1 {
            res = append(res, 'I')
        } else if d >= 10 {
            res = append(res, byte('A'+d-10))
        } else {
            return "ERROR"
        }
        n >>= 4
    }
    for l, r := 0, len(res)-1; l < r; l, r = l+1, r-1 {
        res[l], res[r] = res[r], res[l]
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun toHexspeak(num: String): String {
        var n = num.toLong()
        val res = StringBuilder()
        while (n > 0) {
            val d = (n and 15L).toInt()
            if (d == 0) {
                res.append('O')
            } else if (d == 1) {
                res.append('I')
            } else if (d >= 10) {
                res.append('A' + (d - 10))
            } else {
                return "ERROR"
            }
            n = n shr 4
        }
        return res.reverse().toString()
    }
}
```

```swift
class Solution {
    func toHexspeak(_ num: String) -> String {
        var n = Int(num)!
        var res = [Character]()
        let letters = Array("ABCDEF")
        while n > 0 {
            let d = n & 15
            if d == 0 {
                res.append("O")
            } else if d == 1 {
                res.append("I")
            } else if d >= 10 {
                res.append(letters[d - 10])
            } else {
                return "ERROR"
            }
            n >>= 4
        }
        return String(res.reversed())
    }
}
```

```rust
impl Solution {
    pub fn to_hexspeak(num: String) -> String {
        let mut n: i64 = num.parse().unwrap();
        let mut res = Vec::new();
        while n > 0 {
            let d = (n & 15) as u8;
            if d == 0 {
                res.push(b'O');
            } else if d == 1 {
                res.push(b'I');
            } else if d >= 10 {
                res.push(b'A' + d - 10);
            } else {
                return "ERROR".to_string();
            }
            n >>= 4;
        }
        res.reverse();
        String::from_utf8(res).unwrap()
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    toHexspeak(num: string): string {
        let n = BigInt(num);
        const res: string[] = [];
        while (n > BigInt(0)) {
            const d = Number(n & BigInt(15));
            if (d === 0) {
                res.push('O');
            } else if (d === 1) {
                res.push('I');
            } else if (d >= 10) {
                res.push(String.fromCharCode(65 + d - 10));
            } else {
                return 'ERROR';
            }
            n >>= BigInt(4);
        }
        return res.reverse().join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

> Where $n$ is the integer value of $num$.
