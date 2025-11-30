## 1. Find Rightmost Atomic Expression

::tabs-start

```python
class Solution:
    def parseTernary(self, expression: str) -> str:

        # Checks if the string s is a valid atomic expression
        def isValidAtomic(s):
            return s[0] in 'TF' and s[1] == '?' and s[2] in 'TF0123456789'\
                and s[3] == ':' and s[4] in 'TF0123456789'

        # Returns the value of the atomic expression
        def solveAtomic(s):
            return s[2] if s[0] == 'T' else s[4]

        # Reduce expression until we are left with a single character
        while len(expression) != 1:
            j = len(expression) - 1
            while not isValidAtomic(expression[j-4:j+1]):
                j -= 1
            expression = expression[:j-4] + \
                solveAtomic(expression[j-4:j+1]) + expression[j+1:]

        # Return the final character
        return expression
```

```java
class Solution {
    public String parseTernary(String expression) {
        
        // Checks if the string s is a valid atomic expression
        Predicate<String> isValidAtomic = s -> (s.charAt(0) == 'T' || s.charAt(0) == 'F') && s.charAt(1) == '?' && ((s.charAt(2) >= '0' && s.charAt(2) <= '9') || s.charAt(2) == 'T' || s.charAt(2) == 'F') && s.charAt(3) == ':' && ((s.charAt(4) >= '0' && s.charAt(4) <= '9') || s.charAt(4) == 'T' || s.charAt(4) == 'F');
        
        // Returns the value of the atomic expression
        Function<String, String> solveAtomic = s -> s.charAt(0) == 'T' ? s.substring(2, 3) : s.substring(4, 5);
        
        // Reduce expression until we are left with a single character
        while (expression.length() != 1) {
            int j = expression.length() - 1;
            while (!isValidAtomic.test(expression.substring(j-4, j+1))) {
                j--;
            }
            expression = expression.substring(0, j-4) + solveAtomic.apply(expression.substring(j-4, j+1)) + expression.substring(j+1, expression.length());
        }
        
        // Return the final character
        return expression;
    }
}
```

```cpp
class Solution {
public:
    string parseTernary(string expression) {
        
        // Checks if the string s is a valid atomic expression
        auto isValidAtomic = [](string s) {
            return (s[0] == 'T' || s[0] == 'F') && s[1] == '?' && ((s[2] >= '0' && s[2] <= '9') || s[2] == 'T' || s[2] == 'F') && s[3] == ':' && ((s[4] >= '0' && s[4] <= '9') || s[4] == 'T' || s[4] == 'F'); 
        };
        
        // Returns the value of the atomic expression
        auto solveAtomic = [](string s) {
            return s[0] == 'T' ? s[2] : s[4];
        };
        
        // Reduce expression until we are left with a single character
        while (expression.size() != 1) {
            int j = expression.size() - 1;
            while (!isValidAtomic(expression.substr(j-4, 5))) {
                j--;
            }
            expression = expression.substr(0, j-4) + solveAtomic(expression.substr(j-4, 5)) + expression.substr(j+1);
        }
        
        // Return the final character
        return expression;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} expression
     * @return {string}
     */
    parseTernary(expression) {
        // Checks if the string s is a valid atomic expression
        const isValidAtomic = (s) => {
            return s[0] && (s[0] === 'T' || s[0] === 'F') && 
                   s[1] === '?' && 
                   s[2] && /[TF0-9]/.test(s[2]) && 
                   s[3] === ':' && 
                   s[4] && /[TF0-9]/.test(s[4]);
        };
        
        // Returns the value of the atomic expression
        const solveAtomic = (s) => {
            return s[0] === 'T' ? s[2] : s[4];
        };
        
        // Reduce expression until we are left with a single character
        while (expression.length !== 1) {
            let j = expression.length - 1;
            while (!isValidAtomic(expression.substring(j - 4, j + 1))) {
                j--;
            }
            expression = expression.substring(0, j - 4) + 
                        solveAtomic(expression.substring(j - 4, j + 1)) + 
                        expression.substring(j + 1);
        }
        
        // Return the final character
        return expression;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(N)$

>  Where $N$ is the length of `expression`

---

## 2. Reverse Polish Notation

::tabs-start

```python
class Solution:
    def parseTernary(self, expression: str) -> str:

        # Reduce expression until we are left with a single character
        while len(expression) != 1:
            questionMarkIndex = len(expression) - 1
            while expression[questionMarkIndex] != '?':
                questionMarkIndex -= 1

            # Find the value of the expression.
            if expression[questionMarkIndex - 1] == 'T':
                value = expression[questionMarkIndex + 1]
            else:
                value = expression[questionMarkIndex + 3]

            # Replace the expression with the value
            expression = expression[:questionMarkIndex - 1] + value\
                + expression[questionMarkIndex + 4:]

        # Return the final character
        return expression
```

```java
class Solution {
    public String parseTernary(String expression) {
        
        // Reduce expression until we are left with a single character
        while (expression.length() != 1) {
            int questionMarkIndex = expression.length() - 1;
            while (expression.charAt(questionMarkIndex) != '?') {
                questionMarkIndex--;
            }
            
            // Find the value of the expression.
            char value;
            if (expression.charAt(questionMarkIndex - 1) == 'T') {
                value = expression.charAt(questionMarkIndex + 1);
            } else {
                value = expression.charAt(questionMarkIndex + 3);
            }
            
            // Replace the expression with the value
            expression = expression.substring(0, questionMarkIndex - 1) + value + expression.substring(questionMarkIndex + 4);
        }
        
        // Return the final character
        return expression;
    }
}
```

```cpp
class Solution {
public:
    string parseTernary(string expression) {
        
        // Reduce expression until we are left with a single character
        while (expression.size() != 1) {
            int questionMarkIndex = expression.size() - 1;
            while (expression[questionMarkIndex] != '?') {
                questionMarkIndex--;
            }
            
            // Find the value of the expression.
            char value;
            if (expression[questionMarkIndex - 1] == 'T') {
                value = expression[questionMarkIndex + 1];
            } else {
                value = expression[questionMarkIndex + 3];
            }
            
            // Replace the expression with the value
            expression = expression.substr(0, questionMarkIndex - 1) + value + expression.substr(questionMarkIndex + 4);
        }
        
        // Return the final character
        return expression;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} expression
     * @return {string}
     */
    parseTernary(expression) {

        // Reduce expression until we are left with a single character
        while (expression.length !== 1) {
            let questionMarkIndex = expression.length - 1;
            while (expression[questionMarkIndex] !== '?') {
                questionMarkIndex--;
            }
            // Find the value of the expression.
            let value;
            if (expression[questionMarkIndex - 1] === 'T') {
                value = expression[questionMarkIndex + 1];
            } else {
                value = expression[questionMarkIndex + 3];
            }
            // Replace the expression with the value
            expression = expression.substring(0, questionMarkIndex - 1) + value +
                expression.substring(questionMarkIndex + 4);
        }
        // Return the final character
        return expression;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(N)$

>  Where $N$ is the length of `expression`

---

## 3. Reverse Polish Notation using Stack

::tabs-start

```python
class Solution:
    def parseTernary(self, expression: str) -> str:
        
        # Initialize a stack
        stack = []
        
        # Traverse the expression from right to left
        for char in expression[::-1]:
            
            # If stack top is ?, then replace next four characters
            # with E1 or E2 depending on the value of B
            if stack and stack[-1] == '?':
                stack.pop()
                onTrue = stack.pop()
                stack.pop()
                onFalse = stack.pop()
                stack.append(onTrue if char == 'T' else onFalse)
            
            # Otherwise, push this character
            else:
                stack.append(char)
        
        # Return the final character
        return stack[0]
```

```java
class Solution {
    public String parseTernary(String expression) {
        
        // Initialize a stack
        Stack<Character> stack = new Stack<>();
        
        // Traverse the expression from right to left
        for (int i = expression.length() - 1; i >= 0; i--) {
            
            // If stack top is ?, then replace next four characters
            // with E1 or E2 depending on the value of B
            if (!stack.isEmpty() && stack.peek() == '?') {
                stack.pop();
                char onTrue = stack.pop();
                stack.pop();
                char onFalse = stack.pop();
                stack.push(expression.charAt(i) == 'T' ? onTrue : onFalse);
            }
            
            // Otherwise, push this character
            else {
                stack.push(expression.charAt(i));
            }
        }
        
        // Return the final character
        return String.valueOf(stack.peek());
    }
}
```

```cpp
class Solution {
public:
    string parseTernary(string expression) {
        
        // Initialize a stack
        stack<char> stack;
        
        // Traverse the expression from right to left
        for (int i = expression.length() - 1; i >= 0; i--) {
            
            // If stack top is ?, then replace next four characters
            // with E1 or E2 depending on the value of B
            if (!stack.empty() && stack.top() == '?') {
                stack.pop();
                char onTrue = stack.top();
                stack.pop();
                stack.pop();
                char onFalse = stack.top();
                stack.pop();
                stack.push(expression[i] == 'T' ? onTrue : onFalse);
            }
            
            // Otherwise, push this character
            else {
                stack.push(expression[i]);
            }
        }
        
        // Return the final character
        return string(1, stack.top());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} expression
     * @return {string}
     */
    parseTernary(expression) {
        
        // Initialize a stack
        const stack = [];
        
        // Traverse the expression from right to left
        for (let i = expression.length - 1; i >= 0; i--) {
            const char = expression[i];
            
            // If stack top is ?, then replace next four characters
            // with E1 or E2 depending on the value of B
            if (stack.length > 0 && stack[stack.length - 1] === '?') {
                stack.pop();
                const onTrue = stack.pop();
                stack.pop();
                const onFalse = stack.pop();
                stack.push(char === 'T' ? onTrue : onFalse);
            }
            
            // Otherwise, push this character
            else {
                stack.push(char);
            }
        }
        
        // Return the final character
        return stack[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the length of `expression`

---

## 4. Binary Tree

::tabs-start

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class Solution:
    def parseTernary(self, expression: str) -> str:
        
        # Global Index to Construct Binary Tree
        self.index = 0
        root = self.constructTree(expression)
        
        # Parse the binary tree till we reach the leaf node
        while root.left and root.right:
            if root.val == 'T':
                root = root.left
            else:
                root = root.right
        
        return root.val

    def constructTree(self, expression):
        
        # Storing current character of expression
        root = TreeNode(expression[self.index])

        # If the last character of expression, return
        if self.index == len(expression) - 1:
            return root
        
        # Check the next character
        self.index += 1
        if expression[self.index] == '?':
            self.index += 1
            root.left = self.constructTree(expression)
            self.index += 1
            root.right = self.constructTree(expression)
            
        return root
```

```java
class TreeNode {
    char val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(char val) {
        this.val = val;
    }
}

class Solution {
    int index = 0;
    
    public String parseTernary(String expression) {
        
        // Construct Binary Tree
        TreeNode root = constructTree(expression);
        
        // Parse the binary tree till we reach the leaf node
        while (root.left != null && root.right != null) {
            if (root.val == 'T') {
                root = root.left;
            } else {
                root = root.right;
            }
        }
        
        return String.valueOf(root.val);
    }
    
    private TreeNode constructTree(String expression) {
        
        // Storing current character of expression
        TreeNode root = new TreeNode(expression.charAt(index));

        // If last character of expression, return
        if (index == expression.length() - 1) {
            return root;
        }
        
        // Check next character
        index++;
        if (expression.charAt(index) == '?') {
            index++;
            root.left = constructTree(expression);
            index++;
            root.right = constructTree(expression);
        }
        
        return root;
    }
}
```

```cpp
struct TreeNode {
    char val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(char val) : val(val), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    int index = 0;
    
    TreeNode* constructTree(string& expression) {
        
        // Storing current character of expression
        TreeNode* root = new TreeNode(expression[index]);
        // If last character of expression, return
        if (index == expression.length() - 1) {
            return root;
        }
        
        // Check next character
        index++;
        if (expression[index] == '?') {
            index++;
            root->left = constructTree(expression);
            index++;
            root->right = constructTree(expression);
        }
        
        return root;
    }
    
public:
    string parseTernary(string expression) {
        
        // Construct Binary Tree
        TreeNode* root = constructTree(expression);
        
        // Parse the binary tree till we reach the leaf node
        while (root->left != nullptr && root->right != nullptr) {
            if (root->val == 'T') {
                root = root->left;
            } else {
                root = root->right;
            }
        }
        
        return string(1, root->val);
    }
};
```

```javascript
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    constructor() {
        this.index = 0;
    }
    
    /**
     * @param {string} expression
     * @return {string}
     */
    parseTernary(expression) {
        
        // Construct Binary Tree
        let root = this.constructTree(expression);
        
        // Parse the binary tree till we reach the leaf node
        while (root.left !== null && root.right !== null) {
            if (root.val === 'T') {
                root = root.left;
            } else {
                root = root.right;
            }
        }
        
        return root.val;
    }
    
    constructTree(expression) {
        
        // Storing current character of expression
        const root = new TreeNode(expression[this.index]);
        // If last character of expression, return
        if (this.index === expression.length - 1) {
            return root;
        }
        
        // Check next character
        this.index++;
        if (expression[this.index] === '?') {
            this.index++;
            root.left = this.constructTree(expression);
            this.index++;
            root.right = this.constructTree(expression);
        }
        
        return root;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the length of `expression`

---

## 5. Recursion

::tabs-start

```python
class Solution:
    def parseTernary(self, expression: str) -> str:

        # To analyze the expression between two indices
        def solve(i, j):

            # If expression is a single character, return it
            if i == j:
                return expression[i]

            # Find the index of ?
            questionMarkIndex = i
            while expression[questionMarkIndex] != '?':
                questionMarkIndex += 1

            # Find one index after corresponding :
            aheadColonIndex = questionMarkIndex + 1
            count = 1
            while count != 0:
                if expression[aheadColonIndex] == '?':
                    count += 1
                elif expression[aheadColonIndex] == ':':
                    count -= 1
                aheadColonIndex += 1

            # Check the value of B and recursively solve
            if expression[i] == 'T':
                return solve(questionMarkIndex + 1, aheadColonIndex - 2)
            else:
                return solve(aheadColonIndex, j)

        # Solve for the entire expression
        return solve(0, len(expression) - 1)
```

```java
class Solution {
    public String parseTernary(String expression) {
        return solve(expression, 0, expression.length() - 1);
    }
    
    private String solve(String expression, int i, int j) {
        
        // If expression is a single character, return it
        if (i == j) {
            return expression.substring(i, i + 1);
        }
        
        // Find the index of ?
        int questionMarkIndex = i;
        while (expression.charAt(questionMarkIndex) != '?') {
            questionMarkIndex++;
        }
        
        // Find one index after corresponding :
        int aheadColonIndex = questionMarkIndex + 1;
        int count = 1;
        while (count != 0) {
            if (expression.charAt(aheadColonIndex) == '?') {
                count++;
            } else if (expression.charAt(aheadColonIndex) == ':') {
                count--;
            }
            aheadColonIndex++;
        }
        
        // Check the value of B and recursively solve
        if (expression.charAt(i) == 'T') {
            return solve(expression, questionMarkIndex + 1, aheadColonIndex - 2);
        } else {
            return solve(expression, aheadColonIndex, j);
        }
    }
}
```

```cpp
class Solution {
private:
    string expression;
    
    // To analyze the expression between two indices
    string solve(int i, int j) {
        // If expression is a single character, return it
        if (i == j) {
            return string(1, expression[i]);
        }
        
        // Find the index of ?
        int questionMarkIndex = i;
        while (expression[questionMarkIndex] != '?') {
            questionMarkIndex++;
        }
        
        // Find one index after corresponding :
        int aheadColonIndex = questionMarkIndex + 1;
        int count = 1;
        while (count != 0) {
            if (expression[aheadColonIndex] == '?') {
                count++;
            } else if (expression[aheadColonIndex] == ':') {
                count--;
            }
            aheadColonIndex++;
        }
        
        // Check the value of B and recursively solve
        if (expression[i] == 'T') {
            return solve(questionMarkIndex + 1, aheadColonIndex - 2);
        } else {
            return solve(aheadColonIndex, j);
        }
    }
    
public:
    string parseTernary(string expr) {
        expression = expr;
        // Solve for the entire expression
        return solve(0, expression.length() - 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} expression
     * @return {string}
     */
    parseTernary(expression) {
        // To analyze the expression between two indices
        const solve = (i, j) => {
            // If expression is a single character, return it
            if (i === j) {
                return expression[i];
            }
            
            // Find the index of ?
            let questionMarkIndex = i;
            while (expression[questionMarkIndex] !== '?') {
                questionMarkIndex++;
            }
            
            // Find one index after corresponding :
            let aheadColonIndex = questionMarkIndex + 1;
            let count = 1;
            while (count !== 0) {
                if (expression[aheadColonIndex] === '?') {
                    count++;
                } else if (expression[aheadColonIndex] === ':') {
                    count--;
                }
                aheadColonIndex++;
            }
            
            // Check the value of B and recursively solve
            if (expression[i] === 'T') {
                return solve(questionMarkIndex + 1, aheadColonIndex - 2);
            } else {
                return solve(aheadColonIndex, j);
            }
        };
        
        // Solve for the entire expression
        return solve(0, expression.length - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(N)$

>  Where $N$ is the length of `expression`

---

## 6. Constant Space Solution

::tabs-start

```python
class Solution:
    def parseTernary(self, expression: str) -> str:
        i = 0
        while True:

            if expression[i] not in 'TF' or i == len(expression) - 1\
            or expression[i + 1] == ':':
                return expression[i]
            if expression[i] == 'T':
                i = i + 2
            else:
                count = 1
                i = i + 2
                while count != 0:
                    if expression[i] == ':':
                        count -= 1
                    elif expression[i] == '?':
                        count += 1
                    i += 1
```

```java
class Solution {
    public String parseTernary(String expression) {
        int i = 0;
        for ( ; i < expression.length(); ) {
            
            if (expression.charAt(i) != 'T' && expression.charAt(i) != 'F'
            || i == expression.length() - 1 || expression.charAt(i + 1) == ':') {
                break;
            }
            if (expression.charAt(i) == 'T') {
                i += 2;
            } else {
                int count;
                for (count = 1, i += 2; count != 0; i++) {
                    if (expression.charAt(i) == ':') {
                        count--;
                    } else if (expression.charAt(i) == '?') {
                        count++;
                    }
                }
            }
        }

        return expression.substring(i, i + 1);
    }
}
```

```cpp
class Solution {
public:
    string parseTernary(string expression) {
        int i = 0;
        for ( ; i < expression.length(); ) {
            
            if (expression[i] != 'T' && expression[i] != 'F'
            || i == expression.length() - 1 || expression[i + 1] == ':') {
                break;
            }
            if (expression[i] == 'T') {
                i += 2;
            } else {
                int count;
                for (count = 1, i += 2; count != 0; i++) {
                    if (expression[i] == ':') {
                        count--;
                    } else if (expression[i] == '?') {
                        count++;
                    }
                }
            }
        }

        return expression.substr(i, 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} expression
     * @return {string}
     */
    parseTernary(expression) {
        let i = 0;
        for ( ; i < expression.length; ) {
            
            if (expression[i] != 'T' && expression[i] != 'F'
            || i == expression.length - 1 || expression[i + 1] == ':') {
                break;
            }
            if (expression[i] == 'T') {
                i += 2;
            } else {
                let count;
                for (count = 1, i += 2; count != 0; i++) {
                    if (expression[i] == ':') {
                        count--;
                    } else if (expression[i] == '?') {
                        count++;
                    }
                }
            }
        }

        return expression.substring(i, i + 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

>  Where $N$ is the length of `expression`
