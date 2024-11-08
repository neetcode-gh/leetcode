## 1. Brute Force

::tabs-start

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        binary = ""
        for i in range(32):
            if n & (1 << i):
                binary += "1"
            else:
                binary += "0"
                
        res = 0
        for i, bit in enumerate(binary[::-1]):
            if bit == "1":
                res |= (1 << i)
                
        return res
```

```java
public class Solution {
    public int reverseBits(int n) {
        StringBuilder binary = new StringBuilder();
        for (int i = 0; i < 32; i++) {
            if ((n & (1 << i)) != 0) {
                binary.append("1");
            } else {
                binary.append("0");
            }
        }
        
        int res = 0;
        String reversedBinary = binary.reverse().toString();
        for (int i = 0; i < 32; i++) {
            if (reversedBinary.charAt(i) == '1') {
                res |= (1 << i);
            }
        }
        
        return res;
    }
}
```

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        string binary = "";
        for (int i = 0; i < 32; i++) {
            if (n & (1 << i)) {
                binary += '1';
            } else {
                binary += '0';
            }
        }
        
        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            if (binary[31 - i] == '1') { 
                res |= (1 << i);
            }
        }
        
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number} - a positive integer
     */
    reverseBits(n) {
        let binary = "";
        for (let i = 0; i < 32; i++) {
            if (n & (1 << i)) {
                binary += "1";
            } else {
                binary += "0";
            }
        }
        
        let res = 0;
        for (let i = 0; i < 32; i++) {
            if (binary[31 - i] === "1") { 
                res |= (1 << i);
            }
        }
        
        return res >>> 0;
    }
}
```

```csharp
public class Solution {
    public uint ReverseBits(uint n) {
        string binary = "";
        for (int i = 0; i < 32; i++) {
            if ((n & (1 << i)) != 0) {
                binary += "1";
            } else {
                binary += "0";
            }
        }
        
        uint res = 0;
        for (int i = 0; i < 32; i++) {
            if (binary[31 - i] == '1') { 
                res |= (1u << i);
            }
        }
        
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$

---

## 2. Bit Manipulation

::tabs-start

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for i in range(32):
            bit = (n >> i) & 1
            res += (bit << (31 - i))
        return res
```

```java
public class Solution {
    public int reverseBits(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (n >> i) & 1;
            res += (bit << (31 - i));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            uint32_t bit = (n >> i) & 1;
            res += (bit << (31 - i));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number} - a positive integer
     */
    reverseBits(n) {
        let res = 0;
        for (let i = 0; i < 32; i++) {
            const bit = (n >>> i) & 1;
            res += bit << (31 - i);
        }
        return res >>> 0;
    }
}
```

```csharp
public class Solution {
    public uint ReverseBits(uint n) {
        uint res = 0;
        for (int i = 0; i < 32; i++) {
            uint bit = (n >> i) & 1;
            res += (bit << (31 - i));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$

---

## 3. Bit Manipulation (Optimal)

::tabs-start

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = n
        res = (res >> 16) | (res << 16) & 0xFFFFFFFF
        res = ((res & 0xff00ff00) >> 8) | ((res & 0x00ff00ff) << 8)
        res = ((res & 0xf0f0f0f0) >> 4) | ((res & 0x0f0f0f0f) << 4)
        res = ((res & 0xcccccccc) >> 2) | ((res & 0x33333333) << 2)
        res = ((res & 0xaaaaaaaa) >> 1) | ((res & 0x55555555) << 1)
        return res & 0xFFFFFFFF 
```

```java
public class Solution {
    public int reverseBits(int n) {
        int ret = n;
        ret = ret >>> 16 | ret << 16;
        ret = (ret & 0xff00ff00) >>> 8 | (ret & 0x00ff00ff) << 8;
        ret = (ret & 0xf0f0f0f0) >>> 4 | (ret & 0x0f0f0f0f) << 4;
        ret = (ret & 0xcccccccc) >>> 2 | (ret & 0x33333333) << 2;
        ret = (ret & 0xaaaaaaaa) >>> 1 | (ret & 0x55555555) << 1;
        return ret;
    }
}
```

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t ret = n;
        ret = (ret >> 16) | (ret << 16);
        ret = ((ret & 0xff00ff00) >> 8) | ((ret & 0x00ff00ff) << 8);
        ret = ((ret & 0xf0f0f0f0) >> 4) | ((ret & 0x0f0f0f0f) << 4);
        ret = ((ret & 0xcccccccc) >> 2) | ((ret & 0x33333333) << 2);
        ret = ((ret & 0xaaaaaaaa) >> 1) | ((ret & 0x55555555) << 1);
        return ret;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number} - a positive integer
     */
    reverseBits(n) {
        let ret = n >>> 0;  
        ret = (ret >>> 16) | (ret << 16);
        ret = ((ret & 0xff00ff00) >>> 8) | ((ret & 0x00ff00ff) << 8);
        ret = ((ret & 0xf0f0f0f0) >>> 4) | ((ret & 0x0f0f0f0f) << 4);
        ret = ((ret & 0xcccccccc) >>> 2) | ((ret & 0x33333333) << 2);
        ret = ((ret & 0xaaaaaaaa) >>> 1) | ((ret & 0x55555555) << 1);
        return ret >>> 0;
    }
}
```

```csharp
public class Solution {
    public uint ReverseBits(uint n) {
        uint ret = n;
        ret = (ret >> 16) | (ret << 16);
        ret = ((ret & 0xff00ff00) >> 8) | ((ret & 0x00ff00ff) << 8);
        ret = ((ret & 0xf0f0f0f0) >> 4) | ((ret & 0x0f0f0f0f) << 4);
        ret = ((ret & 0xcccccccc) >> 2) | ((ret & 0x33333333) << 2);
        ret = ((ret & 0xaaaaaaaa) >> 1) | ((ret & 0x55555555) << 1);
        return ret;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$