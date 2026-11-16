## 1. Brute Force

::tabs-start

```python
class Solution:
    def tripletCount(self, a: List[int], b: List[int], c: List[int]) -> int:
        res = 0
        for x in a:
            for y in b:
                for z in c:
                    if bin(x ^ y ^ z).count("1") % 2 == 0:
                        res += 1
        return res
```

```java
public class Solution {
    public int tripletCount(int[] a, int[] b, int[] c) {
        int res = 0;
        for (int x : a) {
            for (int y : b) {
                for (int z : c) {
                    if (Integer.bitCount(x ^ y ^ z) % 2 == 0) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int tripletCount(vector<int>& a, vector<int>& b, vector<int>& c) {
        int res = 0;
        for (int x : a) {
            for (int y : b) {
                for (int z : c) {
                    if (__builtin_popcount(x ^ y ^ z) % 2 == 0) {
                        res++;
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
     * @param {number[]} a
     * @param {number[]} b
     * @param {number[]} c
     * @return {number}
     */
    tripletCount(a, b, c) {
        const popcount = (x) => {
            let bits = 0;
            while (x > 0) {
                bits += x & 1;
                x >>= 1;
            }
            return bits;
        };

        let res = 0;
        for (const x of a) {
            for (const y of b) {
                for (const z of c) {
                    if (popcount(x ^ y ^ z) % 2 === 0) {
                        res++;
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
    public int TripletCount(int[] a, int[] b, int[] c) {
        int res = 0;
        foreach (int x in a) {
            foreach (int y in b) {
                foreach (int z in c) {
                    if (System.Numerics.BitOperations.PopCount((uint)(x ^ y ^ z)) % 2 == 0) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func tripletCount(a []int, b []int, c []int) int {
    res := 0
    for _, x := range a {
        for _, y := range b {
            for _, z := range c {
                if bits.OnesCount(uint(x^y^z))%2 == 0 {
                    res++
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun tripletCount(a: IntArray, b: IntArray, c: IntArray): Int {
        var res = 0
        for (x in a) {
            for (y in b) {
                for (z in c) {
                    if (Integer.bitCount(x xor y xor z) % 2 == 0) {
                        res++
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
    func tripletCount(_ a: [Int], _ b: [Int], _ c: [Int]) -> Int {
        var res = 0
        for x in a {
            for y in b {
                for z in c {
                    if (x ^ y ^ z).nonzeroBitCount % 2 == 0 {
                        res += 1
                    }
                }
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn triplet_count(a: Vec<i32>, b: Vec<i32>, c: Vec<i32>) -> i32 {
        let mut res = 0;
        for &x in &a {
            for &y in &b {
                for &z in &c {
                    if (x ^ y ^ z).count_ones() % 2 == 0 {
                        res += 1;
                    }
                }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} a
     * @param {number[]} b
     * @param {number[]} c
     * @return {number}
     */
    tripletCount(a: number[], b: number[], c: number[]): number {
        const popcount = (x: number): number => {
            let bits = 0;
            while (x > 0) {
                bits += x & 1;
                x >>= 1;
            }
            return bits;
        };

        let res = 0;
        for (const x of a) {
            for (const y of b) {
                for (const z of c) {
                    if (popcount(x ^ y ^ z) % 2 === 0) {
                        res++;
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

- Time complexity: $O(n ^ 3 \log m)$
- Space complexity: $O(1)$

> Where $n$ is the maximum length of the arrays $a$, $b$, $c$ and $m$ is the maximum value in them.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def tripletCount(self, a: List[int], b: List[int], c: List[int]) -> int:
        countA, countB, countC = Counter(a), Counter(b), Counter(c)
        res = 0
        for x, p in countA.items():
            for y, q in countB.items():
                for z, r in countC.items():
                    if bin(x ^ y ^ z).count("1") % 2 == 0:
                        res += p * q * r
        return res
```

```java
public class Solution {
    public int tripletCount(int[] a, int[] b, int[] c) {
        Map<Integer, Integer> countA = count(a), countB = count(b), countC = count(c);
        int res = 0;
        for (Map.Entry<Integer, Integer> ea : countA.entrySet()) {
            for (Map.Entry<Integer, Integer> eb : countB.entrySet()) {
                for (Map.Entry<Integer, Integer> ec : countC.entrySet()) {
                    int xor = ea.getKey() ^ eb.getKey() ^ ec.getKey();
                    if (Integer.bitCount(xor) % 2 == 0) {
                        res += ea.getValue() * eb.getValue() * ec.getValue();
                    }
                }
            }
        }
        return res;
    }

    private Map<Integer, Integer> count(int[] arr) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int x : arr) {
            map.put(x, map.getOrDefault(x, 0) + 1);
        }
        return map;
    }
}
```

```cpp
class Solution {
public:
    int tripletCount(vector<int>& a, vector<int>& b, vector<int>& c) {
        unordered_map<int, int> countA = count(a), countB = count(b), countC = count(c);
        int res = 0;
        for (auto& [x, p] : countA) {
            for (auto& [y, q] : countB) {
                for (auto& [z, r] : countC) {
                    if (__builtin_popcount(x ^ y ^ z) % 2 == 0) {
                        res += p * q * r;
                    }
                }
            }
        }
        return res;
    }

private:
    unordered_map<int, int> count(vector<int>& arr) {
        unordered_map<int, int> mp;
        for (int x : arr) {
            mp[x]++;
        }
        return mp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} a
     * @param {number[]} b
     * @param {number[]} c
     * @return {number}
     */
    tripletCount(a, b, c) {
        const count = (arr) => {
            const mp = new Map();
            for (const x of arr) {
                mp.set(x, (mp.get(x) || 0) + 1);
            }
            return mp;
        };
        const popcount = (x) => {
            let bits = 0;
            while (x > 0) {
                bits += x & 1;
                x >>= 1;
            }
            return bits;
        };

        const countA = count(a), countB = count(b), countC = count(c);
        let res = 0;
        for (const [x, p] of countA) {
            for (const [y, q] of countB) {
                for (const [z, r] of countC) {
                    if (popcount(x ^ y ^ z) % 2 === 0) {
                        res += p * q * r;
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
    public int TripletCount(int[] a, int[] b, int[] c) {
        var countA = Count(a);
        var countB = Count(b);
        var countC = Count(c);
        int res = 0;
        foreach (var ea in countA) {
            foreach (var eb in countB) {
                foreach (var ec in countC) {
                    int xor = ea.Key ^ eb.Key ^ ec.Key;
                    if (System.Numerics.BitOperations.PopCount((uint)xor) % 2 == 0) {
                        res += ea.Value * eb.Value * ec.Value;
                    }
                }
            }
        }
        return res;
    }

    private Dictionary<int, int> Count(int[] arr) {
        Dictionary<int, int> map = new Dictionary<int, int>();
        foreach (int x in arr) {
            map[x] = map.GetValueOrDefault(x, 0) + 1;
        }
        return map;
    }
}
```

```go
func tripletCount(a []int, b []int, c []int) int {
    count := func(arr []int) map[int]int {
        mp := map[int]int{}
        for _, x := range arr {
            mp[x]++
        }
        return mp
    }

    countA, countB, countC := count(a), count(b), count(c)
    res := 0
    for x, p := range countA {
        for y, q := range countB {
            for z, r := range countC {
                if bits.OnesCount(uint(x^y^z))%2 == 0 {
                    res += p * q * r
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun tripletCount(a: IntArray, b: IntArray, c: IntArray): Int {
        val countA = count(a)
        val countB = count(b)
        val countC = count(c)
        var res = 0
        for ((x, p) in countA) {
            for ((y, q) in countB) {
                for ((z, r) in countC) {
                    if (Integer.bitCount(x xor y xor z) % 2 == 0) {
                        res += p * q * r
                    }
                }
            }
        }
        return res
    }

    private fun count(arr: IntArray): HashMap<Int, Int> {
        val map = HashMap<Int, Int>()
        for (x in arr) {
            map[x] = map.getOrDefault(x, 0) + 1
        }
        return map
    }
}
```

```swift
class Solution {
    func tripletCount(_ a: [Int], _ b: [Int], _ c: [Int]) -> Int {
        let countA = count(a), countB = count(b), countC = count(c)
        var res = 0
        for (x, p) in countA {
            for (y, q) in countB {
                for (z, r) in countC {
                    if (x ^ y ^ z).nonzeroBitCount % 2 == 0 {
                        res += p * q * r
                    }
                }
            }
        }
        return res
    }

    private func count(_ arr: [Int]) -> [Int: Int] {
        var map = [Int: Int]()
        for x in arr {
            map[x, default: 0] += 1
        }
        return map
    }
}
```

```rust
use std::collections::HashMap;

impl Solution {
    pub fn triplet_count(a: Vec<i32>, b: Vec<i32>, c: Vec<i32>) -> i32 {
        let (count_a, count_b, count_c) = (Self::count(&a), Self::count(&b), Self::count(&c));
        let mut res = 0;
        for (&x, &p) in &count_a {
            for (&y, &q) in &count_b {
                for (&z, &r) in &count_c {
                    if (x ^ y ^ z).count_ones() % 2 == 0 {
                        res += p * q * r;
                    }
                }
            }
        }
        res
    }

    fn count(arr: &[i32]) -> HashMap<i32, i32> {
        let mut map = HashMap::new();
        for &x in arr {
            *map.entry(x).or_insert(0) += 1;
        }
        map
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} a
     * @param {number[]} b
     * @param {number[]} c
     * @return {number}
     */
    tripletCount(a: number[], b: number[], c: number[]): number {
        const count = (arr: number[]): Map<number, number> => {
            const mp = new Map<number, number>();
            for (const x of arr) {
                mp.set(x, (mp.get(x) || 0) + 1);
            }
            return mp;
        };
        const popcount = (x: number): number => {
            let bits = 0;
            while (x > 0) {
                bits += x & 1;
                x >>= 1;
            }
            return bits;
        };

        const countA = count(a), countB = count(b), countC = count(c);
        let res = 0;
        for (const [x, p] of countA) {
            for (const [y, q] of countB) {
                for (const [z, r] of countC) {
                    if (popcount(x ^ y ^ z) % 2 === 0) {
                        res += p * q * r;
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

- Time complexity: $O(n + d ^ 3 \log m)$
- Space complexity: $O(d)$

> Where $n$ is the maximum length of the arrays $a$, $b$, $c$, $d$ is the number of distinct values in an array ($d \le 101$) and $m$ is the maximum value.

---

## 3. Bit Manipulation

::tabs-start

```python
class Solution:
    def tripletCount(self, a: List[int], b: List[int], c: List[int]) -> int:
        def count(arr):
            odd = 0
            for x in arr:
                odd += bin(x).count("1") % 2
            return len(arr) - odd, odd

        evenA, oddA = count(a)
        evenB, oddB = count(b)
        evenC, oddC = count(c)
        return (evenA * evenB * evenC + evenA * oddB * oddC +
                oddA * evenB * oddC + oddA * oddB * evenC)
```

```java
public class Solution {
    public int tripletCount(int[] a, int[] b, int[] c) {
        int[] ca = count(a), cb = count(b), cc = count(c);
        return ca[0] * cb[0] * cc[0] + ca[0] * cb[1] * cc[1] +
               ca[1] * cb[0] * cc[1] + ca[1] * cb[1] * cc[0];
    }

    private int[] count(int[] arr) {
        int odd = 0;
        for (int x : arr) {
            odd += Integer.bitCount(x) % 2;
        }
        return new int[] { arr.length - odd, odd };
    }
}
```

```cpp
class Solution {
public:
    int tripletCount(vector<int>& a, vector<int>& b, vector<int>& c) {
        auto [evenA, oddA] = count(a);
        auto [evenB, oddB] = count(b);
        auto [evenC, oddC] = count(c);
        return evenA * evenB * evenC + evenA * oddB * oddC +
               oddA * evenB * oddC + oddA * oddB * evenC;
    }

private:
    pair<int, int> count(vector<int>& arr) {
        int odd = 0;
        for (int x : arr) {
            odd += __builtin_popcount(x) % 2;
        }
        return {(int)arr.size() - odd, odd};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} a
     * @param {number[]} b
     * @param {number[]} c
     * @return {number}
     */
    tripletCount(a, b, c) {
        const count = (arr) => {
            let odd = 0;
            for (let x of arr) {
                let bits = 0;
                while (x > 0) {
                    bits += x & 1;
                    x >>= 1;
                }
                odd += bits % 2;
            }
            return [arr.length - odd, odd];
        };

        const [evenA, oddA] = count(a);
        const [evenB, oddB] = count(b);
        const [evenC, oddC] = count(c);
        return (
            evenA * evenB * evenC +
            evenA * oddB * oddC +
            oddA * evenB * oddC +
            oddA * oddB * evenC
        );
    }
}
```

```csharp
public class Solution {
    public int TripletCount(int[] a, int[] b, int[] c) {
        int[] ca = Count(a), cb = Count(b), cc = Count(c);
        return ca[0] * cb[0] * cc[0] + ca[0] * cb[1] * cc[1] +
               ca[1] * cb[0] * cc[1] + ca[1] * cb[1] * cc[0];
    }

    private int[] Count(int[] arr) {
        int odd = 0;
        foreach (int x in arr) {
            odd += System.Numerics.BitOperations.PopCount((uint)x) % 2;
        }
        return new int[] { arr.Length - odd, odd };
    }
}
```

```go
func tripletCount(a []int, b []int, c []int) int {
    count := func(arr []int) (int, int) {
        odd := 0
        for _, x := range arr {
            odd += bits.OnesCount(uint(x)) % 2
        }
        return len(arr) - odd, odd
    }

    evenA, oddA := count(a)
    evenB, oddB := count(b)
    evenC, oddC := count(c)
    return evenA*evenB*evenC + evenA*oddB*oddC +
        oddA*evenB*oddC + oddA*oddB*evenC
}
```

```kotlin
class Solution {
    fun tripletCount(a: IntArray, b: IntArray, c: IntArray): Int {
        val (evenA, oddA) = count(a)
        val (evenB, oddB) = count(b)
        val (evenC, oddC) = count(c)
        return evenA * evenB * evenC + evenA * oddB * oddC +
               oddA * evenB * oddC + oddA * oddB * evenC
    }

    private fun count(arr: IntArray): Pair<Int, Int> {
        var odd = 0
        for (x in arr) {
            odd += Integer.bitCount(x) % 2
        }
        return Pair(arr.size - odd, odd)
    }
}
```

```swift
class Solution {
    func tripletCount(_ a: [Int], _ b: [Int], _ c: [Int]) -> Int {
        let (evenA, oddA) = count(a)
        let (evenB, oddB) = count(b)
        let (evenC, oddC) = count(c)
        return evenA * evenB * evenC + evenA * oddB * oddC +
               oddA * evenB * oddC + oddA * oddB * evenC
    }

    private func count(_ arr: [Int]) -> (Int, Int) {
        var odd = 0
        for x in arr {
            odd += x.nonzeroBitCount % 2
        }
        return (arr.count - odd, odd)
    }
}
```

```rust
impl Solution {
    pub fn triplet_count(a: Vec<i32>, b: Vec<i32>, c: Vec<i32>) -> i32 {
        let (even_a, odd_a) = Self::count(&a);
        let (even_b, odd_b) = Self::count(&b);
        let (even_c, odd_c) = Self::count(&c);
        even_a * even_b * even_c + even_a * odd_b * odd_c +
            odd_a * even_b * odd_c + odd_a * odd_b * even_c
    }

    fn count(arr: &[i32]) -> (i32, i32) {
        let mut odd = 0;
        for &x in arr {
            odd += (x.count_ones() % 2) as i32;
        }
        (arr.len() as i32 - odd, odd)
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} a
     * @param {number[]} b
     * @param {number[]} c
     * @return {number}
     */
    tripletCount(a: number[], b: number[], c: number[]): number {
        const count = (arr: number[]): [number, number] => {
            let odd = 0;
            for (let x of arr) {
                let bits = 0;
                while (x > 0) {
                    bits += x & 1;
                    x >>= 1;
                }
                odd += bits % 2;
            }
            return [arr.length - odd, odd];
        };

        const [evenA, oddA] = count(a);
        const [evenB, oddB] = count(b);
        const [evenC, oddC] = count(c);
        return (
            evenA * evenB * evenC +
            evenA * oddB * oddC +
            oddA * evenB * oddC +
            oddA * oddB * evenC
        );
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log m)$
- Space complexity: $O(1)$

> Where $n$ is the maximum length of the arrays $a$, $b$, $c$ and $m$ is the maximum value in them.
