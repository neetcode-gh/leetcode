## 1. Brute Force

::tabs-start

```python
class Solution:
    def similarRGB(self, color: str) -> str:
        digits = "0123456789abcdef"
        r = int(color[1:3], 16)
        g = int(color[3:5], 16)
        b = int(color[5:7], 16)
        best = float("-inf")
        bx = by = bz = 0
        for x in range(16):
            for y in range(16):
                for z in range(16):
                    sim = -(r - 17 * x) ** 2 - (g - 17 * y) ** 2 - (b - 17 * z) ** 2
                    if sim > best:
                        best = sim
                        bx, by, bz = x, y, z
        return "#" + digits[bx] * 2 + digits[by] * 2 + digits[bz] * 2
```

```java
public class Solution {
    public String similarRGB(String color) {
        String digits = "0123456789abcdef";
        int r = Integer.parseInt(color.substring(1, 3), 16);
        int g = Integer.parseInt(color.substring(3, 5), 16);
        int b = Integer.parseInt(color.substring(5, 7), 16);
        int best = Integer.MIN_VALUE;
        int bx = 0, by = 0, bz = 0;
        for (int x = 0; x < 16; x++) {
            for (int y = 0; y < 16; y++) {
                for (int z = 0; z < 16; z++) {
                    int dr = r - 17 * x, dg = g - 17 * y, db = b - 17 * z;
                    int sim = -dr * dr - dg * dg - db * db;
                    if (sim > best) {
                        best = sim;
                        bx = x;
                        by = y;
                        bz = z;
                    }
                }
            }
        }
        char cx = digits.charAt(bx), cy = digits.charAt(by), cz = digits.charAt(bz);
        return "#" + cx + cx + cy + cy + cz + cz;
    }
}
```

```cpp
class Solution {
public:
    string similarRGB(string color) {
        string digits = "0123456789abcdef";
        int r = stoi(color.substr(1, 2), nullptr, 16);
        int g = stoi(color.substr(3, 2), nullptr, 16);
        int b = stoi(color.substr(5, 2), nullptr, 16);
        int best = INT_MIN;
        int bx = 0, by = 0, bz = 0;
        for (int x = 0; x < 16; x++) {
            for (int y = 0; y < 16; y++) {
                for (int z = 0; z < 16; z++) {
                    int dr = r - 17 * x, dg = g - 17 * y, db = b - 17 * z;
                    int sim = -dr * dr - dg * dg - db * db;
                    if (sim > best) {
                        best = sim;
                        bx = x;
                        by = y;
                        bz = z;
                    }
                }
            }
        }
        return "#" + string(2, digits[bx]) + string(2, digits[by]) + string(2, digits[bz]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color) {
        const digits = '0123456789abcdef';
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        let best = -Infinity;
        let bx = 0,
            by = 0,
            bz = 0;
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                for (let z = 0; z < 16; z++) {
                    const dr = r - 17 * x,
                        dg = g - 17 * y,
                        db = b - 17 * z;
                    const sim = -dr * dr - dg * dg - db * db;
                    if (sim > best) {
                        best = sim;
                        bx = x;
                        by = y;
                        bz = z;
                    }
                }
            }
        }
        return (
            '#' +
            digits[bx].repeat(2) +
            digits[by].repeat(2) +
            digits[bz].repeat(2)
        );
    }
}
```

```csharp
public class Solution {
    public string SimilarRGB(string color) {
        string digits = "0123456789abcdef";
        int r = Convert.ToInt32(color.Substring(1, 2), 16);
        int g = Convert.ToInt32(color.Substring(3, 2), 16);
        int b = Convert.ToInt32(color.Substring(5, 2), 16);
        int best = int.MinValue;
        int bx = 0, by = 0, bz = 0;
        for (int x = 0; x < 16; x++) {
            for (int y = 0; y < 16; y++) {
                for (int z = 0; z < 16; z++) {
                    int dr = r - 17 * x, dg = g - 17 * y, db = b - 17 * z;
                    int sim = -dr * dr - dg * dg - db * db;
                    if (sim > best) {
                        best = sim;
                        bx = x;
                        by = y;
                        bz = z;
                    }
                }
            }
        }
        return "#" + new string(digits[bx], 2) + new string(digits[by], 2) + new string(digits[bz], 2);
    }
}
```

```go
func similarRGB(color string) string {
    digits := "0123456789abcdef"
    parse := func(s string) int {
        v, _ := strconv.ParseInt(s, 16, 64)
        return int(v)
    }
    r, g, b := parse(color[1:3]), parse(color[3:5]), parse(color[5:7])
    best := math.MinInt32
    bx, by, bz := 0, 0, 0
    for x := 0; x < 16; x++ {
        for y := 0; y < 16; y++ {
            for z := 0; z < 16; z++ {
                dr, dg, db := r-17*x, g-17*y, b-17*z
                sim := -dr*dr - dg*dg - db*db
                if sim > best {
                    best = sim
                    bx, by, bz = x, y, z
                }
            }
        }
    }
    return "#" + strings.Repeat(string(digits[bx]), 2) +
        strings.Repeat(string(digits[by]), 2) +
        strings.Repeat(string(digits[bz]), 2)
}
```

```kotlin
class Solution {
    fun similarRGB(color: String): String {
        val digits = "0123456789abcdef"
        val r = color.substring(1, 3).toInt(16)
        val g = color.substring(3, 5).toInt(16)
        val b = color.substring(5, 7).toInt(16)
        var best = Int.MIN_VALUE
        var bx = 0
        var by = 0
        var bz = 0
        for (x in 0 until 16) {
            for (y in 0 until 16) {
                for (z in 0 until 16) {
                    val dr = r - 17 * x
                    val dg = g - 17 * y
                    val db = b - 17 * z
                    val sim = -dr * dr - dg * dg - db * db
                    if (sim > best) {
                        best = sim
                        bx = x
                        by = y
                        bz = z
                    }
                }
            }
        }
        return "#" + digits[bx].toString().repeat(2) +
            digits[by].toString().repeat(2) +
            digits[bz].toString().repeat(2)
    }
}
```

```swift
class Solution {
    func similarRGB(_ color: String) -> String {
        let chars = Array(color)
        let digits = Array("0123456789abcdef")
        let r = Int(String(chars[1...2]), radix: 16)!
        let g = Int(String(chars[3...4]), radix: 16)!
        let b = Int(String(chars[5...6]), radix: 16)!
        var best = Int.min
        var bx = 0, by = 0, bz = 0
        for x in 0..<16 {
            for y in 0..<16 {
                for z in 0..<16 {
                    let dr = r - 17 * x, dg = g - 17 * y, db = b - 17 * z
                    let sim = -dr * dr - dg * dg - db * db
                    if sim > best {
                        best = sim
                        bx = x
                        by = y
                        bz = z
                    }
                }
            }
        }
        var res = "#"
        for d in [bx, by, bz] {
            res += String(repeating: digits[d], count: 2)
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn similar_rgb(color: String) -> String {
        let digits = b"0123456789abcdef";
        let r = i32::from_str_radix(&color[1..3], 16).unwrap();
        let g = i32::from_str_radix(&color[3..5], 16).unwrap();
        let b = i32::from_str_radix(&color[5..7], 16).unwrap();
        let mut best = i32::MIN;
        let (mut bx, mut by, mut bz) = (0, 0, 0);
        for x in 0..16 {
            for y in 0..16 {
                for z in 0..16 {
                    let (dr, dg, db) = (r - 17 * x, g - 17 * y, b - 17 * z);
                    let sim = -dr * dr - dg * dg - db * db;
                    if sim > best {
                        best = sim;
                        bx = x;
                        by = y;
                        bz = z;
                    }
                }
            }
        }
        let mut res = String::from("#");
        for d in [bx, by, bz] {
            let c = digits[d as usize] as char;
            res.push(c);
            res.push(c);
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color: string): string {
        const digits = '0123456789abcdef';
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        let best = -Infinity;
        let bx = 0,
            by = 0,
            bz = 0;
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                for (let z = 0; z < 16; z++) {
                    const dr = r - 17 * x,
                        dg = g - 17 * y,
                        db = b - 17 * z;
                    const sim = -dr * dr - dg * dg - db * db;
                    if (sim > best) {
                        best = sim;
                        bx = x;
                        by = y;
                        bz = z;
                    }
                }
            }
        }
        return (
            '#' +
            digits[bx].repeat(2) +
            digits[by].repeat(2) +
            digits[bz].repeat(2)
        );
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ 3)$
- Space complexity: $O(1)$

> Where $k = 16$ is the number of possible shorthand values for each channel.

---

## 2. Linear Search

::tabs-start

```python
class Solution:
    def similarRGB(self, color: str) -> str:
        digits = "0123456789abcdef"
        res = "#"
        for i in range(1, 7, 2):
            v = int(color[i:i + 2], 16)
            best = 0
            for x in range(1, 16):
                if abs(v - 17 * x) < abs(v - 17 * best):
                    best = x
            res += digits[best] * 2
        return res
```

```java
public class Solution {
    public String similarRGB(String color) {
        String digits = "0123456789abcdef";
        StringBuilder res = new StringBuilder("#");
        for (int i = 1; i < 7; i += 2) {
            int v = Integer.parseInt(color.substring(i, i + 2), 16);
            int best = 0;
            for (int x = 1; x < 16; x++) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x;
                }
            }
            char c = digits.charAt(best);
            res.append(c).append(c);
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string similarRGB(string color) {
        string digits = "0123456789abcdef";
        string res = "#";
        for (int i = 1; i < 7; i += 2) {
            int v = stoi(color.substr(i, 2), nullptr, 16);
            int best = 0;
            for (int x = 1; x < 16; x++) {
                if (abs(v - 17 * x) < abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += string(2, digits[best]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color) {
        const digits = '0123456789abcdef';
        let res = '#';
        for (let i = 1; i < 7; i += 2) {
            const v = parseInt(color.slice(i, i + 2), 16);
            let best = 0;
            for (let x = 1; x < 16; x++) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += digits[best].repeat(2);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public string SimilarRGB(string color) {
        string digits = "0123456789abcdef";
        string res = "#";
        for (int i = 1; i < 7; i += 2) {
            int v = Convert.ToInt32(color.Substring(i, 2), 16);
            int best = 0;
            for (int x = 1; x < 16; x++) {
                if (Math.Abs(v - 17 * x) < Math.Abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += new string(digits[best], 2);
        }
        return res;
    }
}
```

```go
func similarRGB(color string) string {
    digits := "0123456789abcdef"
    abs := func(a int) int {
        if a < 0 {
            return -a
        }
        return a
    }
    res := "#"
    for i := 1; i < 7; i += 2 {
        p, _ := strconv.ParseInt(color[i:i+2], 16, 64)
        v := int(p)
        best := 0
        for x := 1; x < 16; x++ {
            if abs(v-17*x) < abs(v-17*best) {
                best = x
            }
        }
        res += strings.Repeat(string(digits[best]), 2)
    }
    return res
}
```

```kotlin
class Solution {
    fun similarRGB(color: String): String {
        val digits = "0123456789abcdef"
        val res = StringBuilder("#")
        for (i in 1 until 7 step 2) {
            val v = color.substring(i, i + 2).toInt(16)
            var best = 0
            for (x in 1 until 16) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x
                }
            }
            res.append(digits[best]).append(digits[best])
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func similarRGB(_ color: String) -> String {
        let chars = Array(color)
        let digits = Array("0123456789abcdef")
        var res = "#"
        for i in stride(from: 1, to: 7, by: 2) {
            let v = Int(String(chars[i...i + 1]), radix: 16)!
            var best = 0
            for x in 1..<16 {
                if abs(v - 17 * x) < abs(v - 17 * best) {
                    best = x
                }
            }
            res += String(repeating: digits[best], count: 2)
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn similar_rgb(color: String) -> String {
        let digits = b"0123456789abcdef";
        let mut res = String::from("#");
        for i in (1..7).step_by(2) {
            let v = i32::from_str_radix(&color[i..i + 2], 16).unwrap();
            let mut best = 0;
            for x in 1..16 {
                if (v - 17 * x).abs() < (v - 17 * best).abs() {
                    best = x;
                }
            }
            let c = digits[best as usize] as char;
            res.push(c);
            res.push(c);
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color: string): string {
        const digits = '0123456789abcdef';
        let res = '#';
        for (let i = 1; i < 7; i += 2) {
            const v = parseInt(color.slice(i, i + 2), 16);
            let best = 0;
            for (let x = 1; x < 16; x++) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += digits[best].repeat(2);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k)$
- Space complexity: $O(1)$

> Where $k = 16$ is the number of possible shorthand values for each channel.

---

## 3. Greedy

::tabs-start

```python
class Solution:
    def similarRGB(self, color: str) -> str:
        digits = "0123456789abcdef"
        res = "#"
        for i in range(1, 7, 2):
            v = int(color[i:i + 2], 16)
            d = v // 16
            best = d
            for x in range(max(0, d - 1), min(15, d + 1) + 1):
                if abs(v - 17 * x) < abs(v - 17 * best):
                    best = x
            res += digits[best] * 2
        return res
```

```java
public class Solution {
    public String similarRGB(String color) {
        String digits = "0123456789abcdef";
        StringBuilder res = new StringBuilder("#");
        for (int i = 1; i < 7; i += 2) {
            int v = Integer.parseInt(color.substring(i, i + 2), 16);
            int d = v / 16;
            int best = d;
            for (int x = Math.max(0, d - 1); x <= Math.min(15, d + 1); x++) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x;
                }
            }
            char c = digits.charAt(best);
            res.append(c).append(c);
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string similarRGB(string color) {
        string digits = "0123456789abcdef";
        string res = "#";
        for (int i = 1; i < 7; i += 2) {
            int v = stoi(color.substr(i, 2), nullptr, 16);
            int d = v / 16;
            int best = d;
            for (int x = max(0, d - 1); x <= min(15, d + 1); x++) {
                if (abs(v - 17 * x) < abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += string(2, digits[best]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color) {
        const digits = '0123456789abcdef';
        let res = '#';
        for (let i = 1; i < 7; i += 2) {
            const v = parseInt(color.slice(i, i + 2), 16);
            const d = Math.floor(v / 16);
            let best = d;
            for (let x = Math.max(0, d - 1); x <= Math.min(15, d + 1); x++) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += digits[best].repeat(2);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public string SimilarRGB(string color) {
        string digits = "0123456789abcdef";
        string res = "#";
        for (int i = 1; i < 7; i += 2) {
            int v = Convert.ToInt32(color.Substring(i, 2), 16);
            int d = v / 16;
            int best = d;
            for (int x = Math.Max(0, d - 1); x <= Math.Min(15, d + 1); x++) {
                if (Math.Abs(v - 17 * x) < Math.Abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += new string(digits[best], 2);
        }
        return res;
    }
}
```

```go
func similarRGB(color string) string {
    digits := "0123456789abcdef"
    abs := func(a int) int {
        if a < 0 {
            return -a
        }
        return a
    }
    res := "#"
    for i := 1; i < 7; i += 2 {
        p, _ := strconv.ParseInt(color[i:i+2], 16, 64)
        v := int(p)
        d := v / 16
        best := d
        for x := max(0, d-1); x <= min(15, d+1); x++ {
            if abs(v-17*x) < abs(v-17*best) {
                best = x
            }
        }
        res += strings.Repeat(string(digits[best]), 2)
    }
    return res
}
```

```kotlin
class Solution {
    fun similarRGB(color: String): String {
        val digits = "0123456789abcdef"
        val res = StringBuilder("#")
        for (i in 1 until 7 step 2) {
            val v = color.substring(i, i + 2).toInt(16)
            val d = v / 16
            var best = d
            for (x in maxOf(0, d - 1)..minOf(15, d + 1)) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x
                }
            }
            res.append(digits[best]).append(digits[best])
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func similarRGB(_ color: String) -> String {
        let chars = Array(color)
        let digits = Array("0123456789abcdef")
        var res = "#"
        for i in stride(from: 1, to: 7, by: 2) {
            let v = Int(String(chars[i...i + 1]), radix: 16)!
            let d = v / 16
            var best = d
            for x in max(0, d - 1)...min(15, d + 1) {
                if abs(v - 17 * x) < abs(v - 17 * best) {
                    best = x
                }
            }
            res += String(repeating: digits[best], count: 2)
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn similar_rgb(color: String) -> String {
        let digits = b"0123456789abcdef";
        let mut res = String::from("#");
        for i in (1..7).step_by(2) {
            let v = i32::from_str_radix(&color[i..i + 2], 16).unwrap();
            let d = v / 16;
            let mut best = d;
            for x in (d - 1).max(0)..=(d + 1).min(15) {
                if (v - 17 * x).abs() < (v - 17 * best).abs() {
                    best = x;
                }
            }
            let c = digits[best as usize] as char;
            res.push(c);
            res.push(c);
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color: string): string {
        const digits = '0123456789abcdef';
        let res = '#';
        for (let i = 1; i < 7; i += 2) {
            const v = parseInt(color.slice(i, i + 2), 16);
            const d = Math.floor(v / 16);
            let best = d;
            for (let x = Math.max(0, d - 1); x <= Math.min(15, d + 1); x++) {
                if (Math.abs(v - 17 * x) < Math.abs(v - 17 * best)) {
                    best = x;
                }
            }
            res += digits[best].repeat(2);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 4. Math

::tabs-start

```python
class Solution:
    def similarRGB(self, color: str) -> str:
        digits = "0123456789abcdef"
        res = "#"
        for i in range(1, 7, 2):
            x = (int(color[i:i + 2], 16) + 8) // 17
            res += digits[x] * 2
        return res
```

```java
public class Solution {
    public String similarRGB(String color) {
        String digits = "0123456789abcdef";
        StringBuilder res = new StringBuilder("#");
        for (int i = 1; i < 7; i += 2) {
            int x = (Integer.parseInt(color.substring(i, i + 2), 16) + 8) / 17;
            char c = digits.charAt(x);
            res.append(c).append(c);
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string similarRGB(string color) {
        string digits = "0123456789abcdef";
        string res = "#";
        for (int i = 1; i < 7; i += 2) {
            int x = (stoi(color.substr(i, 2), nullptr, 16) + 8) / 17;
            res += string(2, digits[x]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color) {
        const digits = '0123456789abcdef';
        let res = '#';
        for (let i = 1; i < 7; i += 2) {
            const x = Math.floor((parseInt(color.slice(i, i + 2), 16) + 8) / 17);
            res += digits[x].repeat(2);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public string SimilarRGB(string color) {
        string digits = "0123456789abcdef";
        string res = "#";
        for (int i = 1; i < 7; i += 2) {
            int x = (Convert.ToInt32(color.Substring(i, 2), 16) + 8) / 17;
            res += new string(digits[x], 2);
        }
        return res;
    }
}
```

```go
func similarRGB(color string) string {
    digits := "0123456789abcdef"
    res := "#"
    for i := 1; i < 7; i += 2 {
        v, _ := strconv.ParseInt(color[i:i+2], 16, 64)
        x := (v + 8) / 17
        res += strings.Repeat(string(digits[x]), 2)
    }
    return res
}
```

```kotlin
class Solution {
    fun similarRGB(color: String): String {
        val digits = "0123456789abcdef"
        val res = StringBuilder("#")
        for (i in 1 until 7 step 2) {
            val x = (color.substring(i, i + 2).toInt(16) + 8) / 17
            res.append(digits[x]).append(digits[x])
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func similarRGB(_ color: String) -> String {
        let chars = Array(color)
        let digits = Array("0123456789abcdef")
        var res = "#"
        for i in stride(from: 1, to: 7, by: 2) {
            let x = (Int(String(chars[i...i + 1]), radix: 16)! + 8) / 17
            res += String(repeating: digits[x], count: 2)
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn similar_rgb(color: String) -> String {
        let digits = b"0123456789abcdef";
        let mut res = String::from("#");
        for i in (1..7).step_by(2) {
            let x = (u32::from_str_radix(&color[i..i + 2], 16).unwrap() + 8) / 17;
            let c = digits[x as usize] as char;
            res.push(c);
            res.push(c);
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} color
     * @return {string}
     */
    similarRGB(color: string): string {
        const digits = '0123456789abcdef';
        let res = '#';
        for (let i = 1; i < 7; i += 2) {
            const x = Math.floor((parseInt(color.slice(i, i + 2), 16) + 8) / 17);
            res += digits[x].repeat(2);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
