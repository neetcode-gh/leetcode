## 1. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor + 1})$

- Space complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor})$

>  Where $N$ is the length of strobogrammatic numbers we need to find.

---

## 2. Iteration (Level Order Traversal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor + 1})$

- Space complexity: $O(N \cdot 5^{\lfloor N/2 \rfloor})$
    - Note: In javascript and python, in the last iteration the arrary, is the output array. Thus it will not be considered in auxiliary space. But still, the overall order of the complexity remains the same.

>  Where $N$ is the length of strobogrammatic numbers we need to find.
