## 1. Invert and Reverse

::tabs-start

```python
class Solution:
    def confusingNumber(self, n: int) -> bool:
        # Use 'invertMap' to invert each valid digit.
        invert_map = {"0":"0", "1":"1", "8":"8", "6":"9", "9":"6"}
        rotated_number = []
        
        # Iterate over each digit of 'n'.
        for ch in str(n):
            if ch not in invert_map:
                return False

            # Append the inverted digit of 'ch' to the end of 'rotated_number'. 
            rotated_number.append(invert_map[ch])
        
        rotated_number = "".join(rotated_number)

        # Check if the reversed 'rotated_number' equals 'n'.
        return int(rotated_number[::-1]) != n
```

```java
class Solution {
    public boolean confusingNumber(int n) {
        // Use 'invertMap' to invert each valid digit.
        Map<Character, Character> invertMap = new HashMap<>() {{
            put('0', '0');
            put('1', '1');
            put('6', '9');
            put('8', '8');
            put('9', '6');
        }};
        StringBuilder sb = new StringBuilder();

        // Iterate over each digit of 'n'.
        for (char ch : String.valueOf(n).toCharArray()) {
            if (!invertMap.containsKey(ch)) {
                return false;
            }

            // Append the inverted digit of 'ch' to the end of 'rotatedNumber'. 
            sb.append(invertMap.get(ch));
        }

        // Check if the reversed 'rotatedNumber' equals 'n'.
        sb.reverse();
        return Integer.parseInt(sb.toString()) != n;
    }
}
```

```cpp
class Solution {
public:
    bool confusingNumber(int n) {
        // Use 'invertMap' to invert each valid digit.
        unordered_map<char, char> invertMap = {{'0','0'}, {'1','1'}, {'6','9'}, {'8','8'}, {'9','6'}};
        string rotatedNumber;

        // Iterate over each digit of 'n'.
        for (auto ch : to_string(n)) {
            if (invertMap.find(ch) == invertMap.end()) {
                return false;
            }

            // Append the inverted digit of 'ch' to the end of 'rotatedNumber'. 
            rotatedNumber += invertMap[ch];
        }
        
        // Check if the reversed 'rotatedNumber' equals 'n'.
        reverse(begin(rotatedNumber), end(rotatedNumber));
        return stoi(rotatedNumber) != n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    confusingNumber(n) {
        // Use 'invertMap' to invert each valid digit.
        const invertMap = {
            '0': '0',
            '1': '1',
            '6': '9',
            '8': '8',
            '9': '6'
        };

        let rotatedNumber = '';
        // Iterate over each digit of 'n'.
        for (const ch of String(n)) {
            if (!(ch in invertMap)) {
                return false;
            }
            // Append the inverted digit of 'ch' to the end of 'rotatedNumber'.
            rotatedNumber += invertMap[ch];
        }
        // Check if the reversed 'rotatedNumber' equals 'n'.
        rotatedNumber = rotatedNumber.split('').reverse().join('');
        return parseInt(rotatedNumber) !== n;
    }
}
```

```csharp
public class Solution {
    public bool ConfusingNumber(int n) {
        // Use 'invertMap' to invert each valid digit.
        var invertMap = new Dictionary<char, char> {
            {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
        };
        var sb = new StringBuilder();

        // Iterate over each digit of 'n'.
        foreach (char ch in n.ToString()) {
            if (!invertMap.ContainsKey(ch)) {
                return false;
            }
            // Append the inverted digit of 'ch' to the end of 'rotatedNumber'.
            sb.Append(invertMap[ch]);
        }

        // Check if the reversed 'rotatedNumber' equals 'n'.
        char[] arr = sb.ToString().ToCharArray();
        Array.Reverse(arr);
        return int.Parse(new string(arr)) != n;
    }
}
```

```go
func confusingNumber(n int) bool {
    // Use 'invertMap' to invert each valid digit.
    invertMap := map[byte]byte{
        '0': '0', '1': '1', '6': '9', '8': '8', '9': '6',
    }
    s := strconv.Itoa(n)
    rotatedNumber := make([]byte, len(s))

    // Iterate over each digit of 'n'.
    for i := 0; i < len(s); i++ {
        ch := s[i]
        if _, ok := invertMap[ch]; !ok {
            return false
        }
        // Append the inverted digit of 'ch' to the end of 'rotatedNumber'.
        rotatedNumber[i] = invertMap[ch]
    }

    // Check if the reversed 'rotatedNumber' equals 'n'.
    for i, j := 0, len(rotatedNumber)-1; i < j; i, j = i+1, j-1 {
        rotatedNumber[i], rotatedNumber[j] = rotatedNumber[j], rotatedNumber[i]
    }
    result, _ := strconv.Atoi(string(rotatedNumber))
    return result != n
}
```

```kotlin
class Solution {
    fun confusingNumber(n: Int): Boolean {
        // Use 'invertMap' to invert each valid digit.
        val invertMap = mapOf(
            '0' to '0', '1' to '1', '6' to '9', '8' to '8', '9' to '6'
        )
        val sb = StringBuilder()

        // Iterate over each digit of 'n'.
        for (ch in n.toString()) {
            if (ch !in invertMap) {
                return false
            }
            // Append the inverted digit of 'ch' to the end of 'rotatedNumber'.
            sb.append(invertMap[ch])
        }

        // Check if the reversed 'rotatedNumber' equals 'n'.
        return sb.reverse().toString().toInt() != n
    }
}
```

```swift
class Solution {
    func confusingNumber(_ n: Int) -> Bool {
        // Use 'invertMap' to invert each valid digit.
        let invertMap: [Character: Character] = [
            "0": "0", "1": "1", "6": "9", "8": "8", "9": "6"
        ]
        var rotatedNumber = ""

        // Iterate over each digit of 'n'.
        for ch in String(n) {
            guard let inverted = invertMap[ch] else {
                return false
            }
            // Append the inverted digit of 'ch' to the end of 'rotatedNumber'.
            rotatedNumber.append(inverted)
        }

        // Check if the reversed 'rotatedNumber' equals 'n'.
        return Int(String(rotatedNumber.reversed()))! != n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(L)$
- Space complexity: $O(L)$ extra space used

>  Where $L$ is the maximum number of digits $n$ can have ($L = \log_{10} n$).

---

## 2. Use the remainder

::tabs-start

```python
class Solution:
    def confusingNumber(self, n: int) -> bool:
        # Use 'invert_map' to invert each valid digit. Since we don't want to modify
        # 'n', we create a copy of it as 'nCopy'.
        invert_map = {0:0, 1:1, 8:8, 6:9, 9:6}
        invert_number = 0
        n_copy = n
        
        # Get every digit of 'n_copy' by taking the remainder of it to 10.
        while n_copy:
            res = n_copy % 10
            if res not in invert_map:
                return False
            
            # Append the inverted digit of 'res' to the end of 'rotated_number'. 
            invert_number = invert_number * 10 + invert_map[res]
            n_copy //= 10
        
        # Check if 'rotated_number' equals 'n'.
        return  invert_number != n
```

```java
class Solution {
    public boolean confusingNumber(int n) {
        // Use 'invertMap' to invert each valid digit. Since we don't want to modify
        // 'n', we create a copy of it as 'nCopy'.
        Map<Integer, Integer> invertMap = new HashMap<>() {{
            put(0, 0);
            put(1, 1);
            put(6, 9);
            put(8, 8);
            put(9, 6);
        }};
        int nCopy = n, rotatedNumber = 0;
        
        // Get every digit of 'nCopy' by taking the remainder of it to 10.
        while (nCopy > 0) {
            int res = nCopy % 10;
            if (!invertMap.containsKey(res)) {
                return false;
            }

            // Append the inverted digit of 'res' to the end of 'rotatedNumber'. 
            rotatedNumber = rotatedNumber * 10 + invertMap.get(res);
            nCopy /= 10;
        }

        // Check if 'rotatedNumber' equals 'n'.
        return rotatedNumber != n;
    }
}
```

```cpp
class Solution {
public:
    bool confusingNumber(int n) {
        // Use 'invertMap' to invert each valid digit. Since we don't want to modify
        // 'n', we create a copy of it as 'nCopy'. 
        map<int, int> invertMap = {{0, 0}, {1, 1}, {6, 9}, {8, 8}, {9, 6}};
        int rotatedNumber = 0, nCopy = n;

        // Get every digit of 'nCopy' by taking the remainder of it to 10.
        while (nCopy > 0) {
            int res = nCopy % 10;
            if (invertMap.find(res) == invertMap.end()) {
                return false;
            }

            // Append the inverted digit of 'res' to the end of 'rotatedNumber'. 
            rotatedNumber = rotatedNumber * 10 + invertMap[res];
            nCopy /= 10;
        }
        
        // Check if 'rotatedNumber' equals 'n'.
        return rotatedNumber != n; 
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    confusingNumber(n) {
        // Use 'invertMap' to invert each valid digit. Since we don't want to modify
        // 'n', we create a copy of it as 'nCopy'.
        const invertMap = {
            0: 0,
            1: 1,
            6: 9,
            8: 8,
            9: 6
        };
        let nCopy = n;
        let rotatedNumber = 0;

        // Get every digit of 'nCopy' by taking the remainder of it to 10.
        while (nCopy > 0) {
            let res = nCopy % 10;
            if (!(res in invertMap)) {
                return false;
            }
            // Append the inverted digit of 'res' to the end of 'rotatedNumber'.
            rotatedNumber = rotatedNumber * 10 + invertMap[res];
            nCopy = Math.floor(nCopy / 10);
        }
        // Check if 'rotatedNumber' equals 'n'.
        return rotatedNumber !== n;
    }
}
```

```csharp
public class Solution {
    public bool ConfusingNumber(int n) {
        // Use 'invertMap' to invert each valid digit. Since we don't want to modify
        // 'n', we create a copy of it as 'nCopy'.
        var invertMap = new Dictionary<int, int> {
            {0, 0}, {1, 1}, {6, 9}, {8, 8}, {9, 6}
        };
        int nCopy = n, rotatedNumber = 0;

        // Get every digit of 'nCopy' by taking the remainder of it to 10.
        while (nCopy > 0) {
            int res = nCopy % 10;
            if (!invertMap.ContainsKey(res)) {
                return false;
            }
            // Append the inverted digit of 'res' to the end of 'rotatedNumber'.
            rotatedNumber = rotatedNumber * 10 + invertMap[res];
            nCopy /= 10;
        }

        // Check if 'rotatedNumber' equals 'n'.
        return rotatedNumber != n;
    }
}
```

```go
func confusingNumber(n int) bool {
    // Use 'invertMap' to invert each valid digit. Since we don't want to modify
    // 'n', we create a copy of it as 'nCopy'.
    invertMap := map[int]int{0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
    nCopy := n
    rotatedNumber := 0

    // Get every digit of 'nCopy' by taking the remainder of it to 10.
    for nCopy > 0 {
        res := nCopy % 10
        if _, ok := invertMap[res]; !ok {
            return false
        }
        // Append the inverted digit of 'res' to the end of 'rotatedNumber'.
        rotatedNumber = rotatedNumber*10 + invertMap[res]
        nCopy /= 10
    }

    // Check if 'rotatedNumber' equals 'n'.
    return rotatedNumber != n
}
```

```kotlin
class Solution {
    fun confusingNumber(n: Int): Boolean {
        // Use 'invertMap' to invert each valid digit. Since we don't want to modify
        // 'n', we create a copy of it as 'nCopy'.
        val invertMap = mapOf(0 to 0, 1 to 1, 6 to 9, 8 to 8, 9 to 6)
        var nCopy = n
        var rotatedNumber = 0

        // Get every digit of 'nCopy' by taking the remainder of it to 10.
        while (nCopy > 0) {
            val res = nCopy % 10
            if (res !in invertMap) {
                return false
            }
            // Append the inverted digit of 'res' to the end of 'rotatedNumber'.
            rotatedNumber = rotatedNumber * 10 + invertMap[res]!!
            nCopy /= 10
        }

        // Check if 'rotatedNumber' equals 'n'.
        return rotatedNumber != n
    }
}
```

```swift
class Solution {
    func confusingNumber(_ n: Int) -> Bool {
        // Use 'invertMap' to invert each valid digit. Since we don't want to modify
        // 'n', we create a copy of it as 'nCopy'.
        let invertMap: [Int: Int] = [0: 0, 1: 1, 6: 9, 8: 8, 9: 6]
        var nCopy = n
        var rotatedNumber = 0

        // Get every digit of 'nCopy' by taking the remainder of it to 10.
        while nCopy > 0 {
            let res = nCopy % 10
            guard let inverted = invertMap[res] else {
                return false
            }
            // Append the inverted digit of 'res' to the end of 'rotatedNumber'.
            rotatedNumber = rotatedNumber * 10 + inverted
            nCopy /= 10
        }

        // Check if 'rotatedNumber' equals 'n'.
        return rotatedNumber != n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(L)$
- Space complexity: $O(L)$ extra space used

>  Where $L$ is the maximum number of digits $n$ can have.
