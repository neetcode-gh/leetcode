## 1. Invert and Reverse

### Intuition
A confusing number looks different when rotated 180 degrees. Only digits `0`, `1`, `6`, `8`, and `9` remain valid after rotation (`6` becomes `9` and vice versa). We invert each digit, reverse the result, and check if it differs from the original.

### Algorithm
1. Create a mapping of valid digits to their rotated counterparts: `0->0`, `1->1`, `6->9`, `8->8`, `9->6`.
2. Iterate through each digit of `n` as a string.
3. If any digit is not in the map (`2`, `3`, `4`, `5`, `7`), return `false` immediately.
4. Build the rotated number by appending the inverted digit for each character.
5. Reverse the rotated number and compare it to the original. If different, return `true`.

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

### Intuition
Instead of converting to a string, we can extract digits using modular arithmetic. Processing digits from right to left while building the rotated number from left to right naturally produces the reversed rotated version.

### Algorithm
1. Create a mapping of valid digits (`0`, `1`, `6`, `8`, `9`) to their rotated values.
2. Make a copy of `n` and initialize the rotated number to `0`.
3. Extract digits using modulo `10`. If a digit is invalid, return `false`.
4. Build the rotated number by multiplying by `10` and adding the inverted digit.
5. Divide the copy by `10` to move to the next digit. After processing all digits, compare the rotated number to the original.

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

---

## Common Pitfalls

### Confusing "Different" with "Invalid"
A confusing number must be valid (all digits can be rotated) AND look different after rotation. Returning `true` for invalid digits like `2, 3, 4, 5, 7` instead of returning `false` is incorrect.

```python
# Wrong: treats invalid digits as confusing
if ch not in invert_map:
    return True  # Should be False

# Correct
if ch not in invert_map:
    return False
```

### Forgetting to Reverse After Inversion
Rotating 180 degrees means both inverting each digit AND reversing their order. Only inverting without reversing (or vice versa) gives the wrong result. For example, `69` inverts to `96` but must then reverse to `69`, so `69` is NOT confusing.
