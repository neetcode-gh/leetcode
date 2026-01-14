## 1. Recursion

### Intuition

A strobogrammatic number looks the same when rotated 180 degrees. Only certain digit pairs maintain their appearance after rotation: (0,0), (1,1), (6,9), (8,8), and (9,6). We can build these numbers recursively from the inside out. Start with the base cases: empty string for even length or single symmetric digits (0, 1, 8) for odd length. Then wrap each smaller solution with valid digit pairs. The key insight is that leading zeros are invalid, so we skip adding '0' at the outermost layer.

### Algorithm

1. Define the five reversible digit pairs that look the same when rotated 180 degrees.
2. Create a recursive function that builds strobogrammatic numbers of length `n`:
   - Base case: if `n == 0`, return an empty string (the center for even-length numbers).
   - Base case: if `n == 1`, return the three single-digit strobogrammatic numbers: `"0"`, `"1"`, `"8"`.
3. Recursively generate strobogrammatic numbers of length `n - 2`.
4. For each smaller number, wrap it with each valid digit pair (one digit at the start, its pair at the end).
5. Skip pairs starting with `'0'` when building the outermost layer (when `n` equals the final target length) to avoid leading zeros.
6. Return all generated numbers.

::tabs-start

```python
class Solution:
    def findStrobogrammatic(self, n: int) -> List[str]:
        reversible_pairs = [
            ['0', '0'], ['1', '1'], 
            ['6', '9'], ['8', '8'], ['9', '6']
        ]

        def generate_strobo_numbers(n, final_length):
            if n == 0:
                # 0-digit strobogrammatic number is an empty string.
                return [""]

            if n == 1:
                # 1-digit strobogrammatic numbers.
                return ["0", "1", "8"]

            prev_strobo_nums = generate_strobo_numbers(n - 2, final_length)
            curr_strobo_nums = []

            for prev_strobo_num in prev_strobo_nums:
                for pair in reversible_pairs:
                    if pair[0] != '0' or n != final_length:
                        curr_strobo_nums.append(pair[0] + prev_strobo_num + pair[1])

            return curr_strobo_nums
            
        return generate_strobo_numbers(n, n)
```

```java
class Solution {
    
    public char[][] reversiblePairs = {
        {'0', '0'}, {'1', '1'}, 
        {'6', '9'}, {'8', '8'}, {'9', '6'}
    };
    
    public List<String> generateStroboNumbers(int n, int finalLength) {
        if (n == 0) {
            // 0-digit strobogrammatic number is an empty string.
            return new ArrayList<>(List.of(""));
        }
        
        if (n == 1) {
            // 1-digit strobogrammatic numbers.
            return new ArrayList<>(List.of("0", "1", "8"));
        }
        
        List<String> prevStroboNums = generateStroboNumbers(n - 2, finalLength);
        List<String> currStroboNums = new ArrayList<>();
        
        for (String prevStroboNum : prevStroboNums) {
            for (char[] pair : reversiblePairs) {
                // We can only append 0's if it is not first digit.
                if (pair[0] != '0' || n != finalLength) {
                    currStroboNums.add(pair[0] + prevStroboNum + pair[1]);
                }
            }
        }
        
        return currStroboNums;
    }
    
    public List<String> findStrobogrammatic(int n) {
        return generateStroboNumbers(n, n);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> reversiblePairs = {
        {'0', '0'}, {'1', '1'}, 
        {'6', '9'}, {'8', '8'}, {'9', '6'}
    };
    
    vector<string> generateStroboNumbers(int n, int finalLength) {
        if (n == 0) {
            // 0-digit strobogrammatic number is an empty string.
            return { "" };
        }
        
        if (n == 1) {
            // 1-digit strobogrammatic numbers.
            return { "0", "1", "8" };
        }
        
        vector<string> prevStroboNums = generateStroboNumbers(n - 2, finalLength);
        vector<string> currStroboNums;
        
        for (string& prevStroboNum : prevStroboNums) {
            for (vector<char>& pair : reversiblePairs) {
                // We can only append 0's if it is not first digit.
                if (pair[0] != '0' || n != finalLength) {
                    currStroboNums.push_back(pair[0] + prevStroboNum + pair[1]);
                }
            }
        }
        
        return currStroboNums;
    }
    
    vector<string> findStrobogrammatic(int n) {
        return generateStroboNumbers(n, n);
    }
};
```

```javascript
class Solution {

    reversiblePairs = [
        ['0', '0'], ['1', '1'],
        ['6', '9'], ['8', '8'], ['9', '6']
    ];

    generateStroboNumbers(n, finalLength) {
        if (n == 0) {
            // 0-digit strobogrammatic number is an empty string.
            return [""];
        }

        if (n == 1) {
            // 1-digit strobogrammatic numbers.
            return ["0", "1", "8"];
        }

        let prevStroboNums = this.generateStroboNumbers(n - 2, finalLength);
        let currStroboNums = [];

        for (let prevStroboNum of prevStroboNums) {
            for (let pair of this.reversiblePairs) {
                // We can only append 0's if it is not first digit.
                if (pair[0] != '0' || n != finalLength) {
                    currStroboNums.push(pair[0] + prevStroboNum + pair[1]);
                }
            }
        }

        return currStroboNums;
    }

    /**
     * @param {number} n
     * @return {string[]}
     */
    findStrobogrammatic(n) {
        return this.generateStroboNumbers(n, n);
    }
}
```

```csharp
public class Solution {
    private char[][] reversiblePairs = new char[][] {
        new char[] {'0', '0'}, new char[] {'1', '1'},
        new char[] {'6', '9'}, new char[] {'8', '8'}, new char[] {'9', '6'}
    };

    public IList<string> FindStrobogrammatic(int n) {
        return GenerateStroboNumbers(n, n);
    }

    private List<string> GenerateStroboNumbers(int n, int finalLength) {
        if (n == 0) {
            return new List<string> { "" };
        }

        if (n == 1) {
            return new List<string> { "0", "1", "8" };
        }

        List<string> prevStroboNums = GenerateStroboNumbers(n - 2, finalLength);
        List<string> currStroboNums = new List<string>();

        foreach (string prevStroboNum in prevStroboNums) {
            foreach (char[] pair in reversiblePairs) {
                if (pair[0] != '0' || n != finalLength) {
                    currStroboNums.Add(pair[0] + prevStroboNum + pair[1]);
                }
            }
        }

        return currStroboNums;
    }
}
```

```go
func findStrobogrammatic(n int) []string {
    reversiblePairs := [][]byte{
        {'0', '0'}, {'1', '1'},
        {'6', '9'}, {'8', '8'}, {'9', '6'},
    }

    var generateStroboNumbers func(n, finalLength int) []string
    generateStroboNumbers = func(n, finalLength int) []string {
        if n == 0 {
            return []string{""}
        }

        if n == 1 {
            return []string{"0", "1", "8"}
        }

        prevStroboNums := generateStroboNumbers(n-2, finalLength)
        currStroboNums := []string{}

        for _, prevStroboNum := range prevStroboNums {
            for _, pair := range reversiblePairs {
                if pair[0] != '0' || n != finalLength {
                    currStroboNums = append(currStroboNums,
                        string(pair[0])+prevStroboNum+string(pair[1]))
                }
            }
        }

        return currStroboNums
    }

    return generateStroboNumbers(n, n)
}
```

```kotlin
class Solution {
    private val reversiblePairs = arrayOf(
        charArrayOf('0', '0'), charArrayOf('1', '1'),
        charArrayOf('6', '9'), charArrayOf('8', '8'), charArrayOf('9', '6')
    )

    fun findStrobogrammatic(n: Int): List<String> {
        return generateStroboNumbers(n, n)
    }

    private fun generateStroboNumbers(n: Int, finalLength: Int): List<String> {
        if (n == 0) {
            return listOf("")
        }

        if (n == 1) {
            return listOf("0", "1", "8")
        }

        val prevStroboNums = generateStroboNumbers(n - 2, finalLength)
        val currStroboNums = mutableListOf<String>()

        for (prevStroboNum in prevStroboNums) {
            for (pair in reversiblePairs) {
                if (pair[0] != '0' || n != finalLength) {
                    currStroboNums.add("${pair[0]}$prevStroboNum${pair[1]}")
                }
            }
        }

        return currStroboNums
    }
}
```

```swift
class Solution {
    private let reversiblePairs: [[Character]] = [
        ["0", "0"], ["1", "1"],
        ["6", "9"], ["8", "8"], ["9", "6"]
    ]

    func findStrobogrammatic(_ n: Int) -> [String] {
        return generateStroboNumbers(n, n)
    }

    private func generateStroboNumbers(_ n: Int, _ finalLength: Int) -> [String] {
        if n == 0 {
            return [""]
        }

        if n == 1 {
            return ["0", "1", "8"]
        }

        let prevStroboNums = generateStroboNumbers(n - 2, finalLength)
        var currStroboNums = [String]()

        for prevStroboNum in prevStroboNums {
            for pair in reversiblePairs {
                if pair[0] != "0" || n != finalLength {
                    currStroboNums.append("\(pair[0])\(prevStroboNum)\(pair[1])")
                }
            }
        }

        return currStroboNums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor + 1})$

- Space complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor})$

>  Where $N$ is the length of strobogrammatic numbers we need to find.

---

## 2. Iteration (Level Order Traversal)

### Intuition

Instead of recursion, we can build strobogrammatic numbers iteratively using a BFS-like approach. Start from the center and expand outward level by level. For odd-length numbers, begin with single digits (0, 1, 8). For even-length numbers, begin with an empty string. Each iteration adds two digits to the current strings, growing them symmetrically until we reach the target length.

### Algorithm

1. Determine the starting point based on parity: if `n` is odd, start with `["0", "1", "8"]`; if even, start with `[""]`.
2. Track the current string length, starting at `n % 2`.
3. While the current length is less than `n`:
   - Increment the length by `2` (adding one digit to each end).
   - For each existing string, wrap it with each valid digit pair.
   - Skip `'0'` as the leading digit when at the final length.
4. Return the final list of strobogrammatic numbers.

::tabs-start

```python
class Solution:
    def findStrobogrammatic(self, n: int) -> List[str]:
        reversible_pairs = [
            ['0', '0'], ['1', '1'], 
            ['6', '9'], ['8', '8'], ['9', '6']
        ]

        # When n is even (n % 2 == 0), we start with strings of length 0 and
        # when n is odd (n % 2 == 1), we start with strings of length 1.
        curr_strings_length = n % 2
        
        q = ["0", "1", "8"] if curr_strings_length == 1 else [""]
        
        while curr_strings_length < n:
            curr_strings_length += 2
            next_level = []
            
            for number in q:
                for pair in reversible_pairs:
                    if curr_strings_length != n or pair[0] != '0':
                        next_level.append(pair[0] + number + pair[1])
            q = next_level
            
        return q
```

```java
class Solution {
    
    public char[][] reversiblePairs = {
        {'0', '0'}, {'1', '1'}, 
        {'6', '9'}, {'8', '8'}, {'9', '6'}
    };
    
    public List<String> findStrobogrammatic(int n) {
        Queue<String> q = new LinkedList<>();
        int currStringsLength;
        
        // When n is even, it means when decreasing by 2 we will go till 0.
        if (n % 2 == 0) {
            // We will start with 0-digit strobogrammatic numbers.
            currStringsLength = 0;
            q.add("");
        } else {
            // We will start with 1-digit strobogrammatic numbers.
            currStringsLength = 1;
            q.add("0");
            q.add("1");
            q.add("8");
        }
        
        while (currStringsLength < n) {
            currStringsLength += 2;
            for (int i = q.size(); i > 0; --i) {
                String number = q.poll();
                
                for (char[] pair : reversiblePairs) {
                    if (currStringsLength != n || pair[0] != '0') {
                        q.add(pair[0] + number + pair[1]);
                    }
                }
            }
        }
        
        List<String> stroboNums = new ArrayList<>();
        while (!q.isEmpty()) {
            stroboNums.add(q.poll());
        }
        
        return stroboNums;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> reversiblePairs = {
        {'0', '0'}, {'1', '1'}, 
        {'6', '9'}, {'8', '8'}, {'9', '6'}
    };
    
    vector<string> findStrobogrammatic(int n) {
        queue<string> q;
        int currStringsLength;
        
        // When n is even, it means when decreasing by 2 we will go till 0.
        if (n % 2 == 0) {
            // We will start with 0-digit strobogrammatic numbers.
            currStringsLength = 0;
            q.push("");
        } else {
            // We will start with 1-digit strobogrammatic numbers.
            currStringsLength = 1;
            q.push("0");
            q.push("1");
            q.push("8");
        }
        
        while (currStringsLength < n) {
            currStringsLength += 2;
            for (int i = q.size(); i > 0; --i) {
                string number = q.front();
                q.pop();
                
                for (vector<char>& pair : reversiblePairs) {
                    if (currStringsLength != n || pair[0] != '0') {
                        q.push(pair[0] + number + pair[1]);
                    }
                }
            }
        }
        
        vector<string> stroboNums;
        while (!q.empty()) {
            stroboNums.push_back(q.front());
            q.pop();
        }
        
        return stroboNums;
    }
};
```

```javascript
class Solution {

    reversiblePairs = [
        ['0', '0'], ['1', '1'],
        ['6', '9'], ['8', '8'], ['9', '6']
    ];

    /**
     * @param {number} n
     * @return {string[]}
     */
    findStrobogrammatic(n) {
        let currStringsLength;
        let q = [];

        // When n is even, it means when decreasing by 2 we will go till 0.
        if (n % 2 == 0) {
            // We will start with 0-digit strobogrammatic numbers.
            currStringsLength = 0;
            q = [""];
        } else {
            // We will start with 1-digit strobogrammatic numbers.
            currStringsLength = 1;
            q = ["0", "1", "8"];
        }

        while (currStringsLength < n) {
            currStringsLength += 2;
            let nextLevel = [];

            q.forEach((number) => {
                this.reversiblePairs.forEach((pair) => {
                    if (currStringsLength != n || pair[0] != '0') {
                        nextLevel.push(pair[0] + number + pair[1]);
                    }
                });
            });

            q = nextLevel;
        }

        return q;
    }
}
```

```csharp
public class Solution {
    private char[][] reversiblePairs = new char[][] {
        new char[] {'0', '0'}, new char[] {'1', '1'},
        new char[] {'6', '9'}, new char[] {'8', '8'}, new char[] {'9', '6'}
    };

    public IList<string> FindStrobogrammatic(int n) {
        Queue<string> q = new Queue<string>();
        int currStringsLength;

        if (n % 2 == 0) {
            currStringsLength = 0;
            q.Enqueue("");
        } else {
            currStringsLength = 1;
            q.Enqueue("0");
            q.Enqueue("1");
            q.Enqueue("8");
        }

        while (currStringsLength < n) {
            currStringsLength += 2;
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                string number = q.Dequeue();

                foreach (char[] pair in reversiblePairs) {
                    if (currStringsLength != n || pair[0] != '0') {
                        q.Enqueue(pair[0] + number + pair[1]);
                    }
                }
            }
        }

        return q.ToList();
    }
}
```

```go
func findStrobogrammatic(n int) []string {
    reversiblePairs := [][]byte{
        {'0', '0'}, {'1', '1'},
        {'6', '9'}, {'8', '8'}, {'9', '6'},
    }

    currStringsLength := n % 2
    var q []string

    if currStringsLength == 1 {
        q = []string{"0", "1", "8"}
    } else {
        q = []string{""}
    }

    for currStringsLength < n {
        currStringsLength += 2
        nextLevel := []string{}

        for _, number := range q {
            for _, pair := range reversiblePairs {
                if currStringsLength != n || pair[0] != '0' {
                    nextLevel = append(nextLevel,
                        string(pair[0])+number+string(pair[1]))
                }
            }
        }
        q = nextLevel
    }

    return q
}
```

```kotlin
class Solution {
    private val reversiblePairs = arrayOf(
        charArrayOf('0', '0'), charArrayOf('1', '1'),
        charArrayOf('6', '9'), charArrayOf('8', '8'), charArrayOf('9', '6')
    )

    fun findStrobogrammatic(n: Int): List<String> {
        var currStringsLength = n % 2
        var q = if (currStringsLength == 1) {
            mutableListOf("0", "1", "8")
        } else {
            mutableListOf("")
        }

        while (currStringsLength < n) {
            currStringsLength += 2
            val nextLevel = mutableListOf<String>()

            for (number in q) {
                for (pair in reversiblePairs) {
                    if (currStringsLength != n || pair[0] != '0') {
                        nextLevel.add("${pair[0]}$number${pair[1]}")
                    }
                }
            }
            q = nextLevel
        }

        return q
    }
}
```

```swift
class Solution {
    private let reversiblePairs: [[Character]] = [
        ["0", "0"], ["1", "1"],
        ["6", "9"], ["8", "8"], ["9", "6"]
    ]

    func findStrobogrammatic(_ n: Int) -> [String] {
        var currStringsLength = n % 2
        var q: [String] = currStringsLength == 1 ? ["0", "1", "8"] : [""]

        while currStringsLength < n {
            currStringsLength += 2
            var nextLevel = [String]()

            for number in q {
                for pair in reversiblePairs {
                    if currStringsLength != n || pair[0] != "0" {
                        nextLevel.append("\(pair[0])\(number)\(pair[1])")
                    }
                }
            }
            q = nextLevel
        }

        return q
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor + 1})$

- Space complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor})$
    - Note: In javascript and python, in the last iteration the arrary, is the output array. Thus it will not be considered in auxiliary space. But still, the overall order of the complexity remains the same.

>  Where $N$ is the length of strobogrammatic numbers we need to find.

---

## Common Pitfalls

### Allowing Leading Zeros

Numbers cannot have leading zeros (except for "0" itself when n=1). When building the outermost layer of digits, you must skip the (0, 0) pair to avoid generating invalid numbers like "010" or "00100".

### Forgetting That 6 and 9 Map to Each Other

Unlike 0, 1, and 8 which map to themselves when rotated 180 degrees, 6 becomes 9 and 9 becomes 6. The reversible pairs must include both (6, 9) and (9, 6) to correctly generate all strobogrammatic numbers.

### Incorrect Base Cases for Odd vs Even Length

For even-length numbers, the recursive base case is an empty string (length 0). For odd-length numbers, the center digit must be strobogrammatic by itself: only 0, 1, or 8. Mixing up these base cases or forgetting the odd-length center constraint will produce incorrect results.
