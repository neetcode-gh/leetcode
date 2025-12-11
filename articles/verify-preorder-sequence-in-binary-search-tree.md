## 1. Monotonic Stack

::tabs-start

```python
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        min_limit = float('-inf')
        stack = []
        
        for num in preorder:
            while stack and stack[-1] < num:
                min_limit = stack.pop()
                
            if num <= min_limit:
                return False
            
            stack.append(num)
        
        return True
```

```java
class Solution {
    public boolean verifyPreorder(int[] preorder) {
        int minLimit = Integer.MIN_VALUE;
        Stack<Integer> stack = new Stack<>();
        
        for (int num: preorder) {
            while (!stack.isEmpty() && stack.peek() < num) {
                minLimit = stack.pop();
            }
            
            if (num <= minLimit) {
                return false;
            }
            
            stack.push(num);
        }
        
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool verifyPreorder(vector<int>& preorder) {
        int minLimit = INT_MIN;
        stack<int> stack;
        
        for (int num: preorder) {
            while (!stack.empty() && stack.top() < num) {
                minLimit = stack.top();
                stack.pop();
            }
            
            if (num <= minLimit) {
                return false;
            }
            
            stack.push(num);
        }
        
        return true;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of `preorder`

---

## 2. Constant Auxiliary Space

::tabs-start

```python
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        min_limit = float('-inf') 
        i = 0
        
        for num in preorder:
            while i > 0 and preorder[i - 1] < num:
                min_limit = preorder[i - 1]
                i -= 1
                
            if num <= min_limit:
                return False
            
            preorder[i] = num
            i += 1
        
        return True
```

```java
class Solution {
    public boolean verifyPreorder(int[] preorder) {
        int minLimit = Integer.MIN_VALUE;
        int i = 0;
        
        for (int num: preorder) {
            while (i > 0 && preorder[i - 1] < num) {
                minLimit = preorder[i - 1];
                i--;
            }
            
            if (num <= minLimit) {
                return false;
            }
            
            preorder[i] = num;
            i++;
        }
        
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool verifyPreorder(vector<int>& preorder) {
        int minLimit = INT_MIN;
        int i = 0;
        
        for (int num: preorder) {
            while (i > 0 && preorder[i - 1] < num) {
                minLimit = preorder[i - 1];
                i--;
            }
            
            if (num <= minLimit) {
                return false;
            }
            
            preorder[i] = num;
            i++;
        }
        
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} preorder
     * @return {boolean}
     */
    verifyPreorder(preorder) {
        let minLimit = -Infinity;
        let i = 0;
        
        for (let num of preorder) {
            while (i > 0 && preorder[i - 1] < num) {
                minLimit = preorder[i - 1];
                i--;
            }
            
            if (num <= minLimit) {
                return false;
            }
            
            preorder[i] = num;
            i++;
        }
        
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ auxiliary
    
    - A common misconception is that modifying an input array for use in an algorithm leads to an $O(1)$ space complexity. In reality, you are still using $O(n)$ space, but $O(1)$ **auxiliary** space.

    - Because we are modifying the input to directly use in the algorithm, we must count it as part of the space complexity. However, we are not using any auxiliary space other than a few integers.
    The exception to this is in-place algorithms where the input is also returned as the output. For example: sorting algorithms.

>  Where $n$ is the length of `preorder`

---

## 3. Recursion

::tabs-start

```python
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        def helper(i, min_limit, max_limit):
            if i[0] == len(preorder):
                return True
            
            root = preorder[i[0]]
            if not min_limit < root < max_limit:
                return False

            i[0] += 1
            left = helper(i, min_limit, root)
            right = helper(i, root, max_limit)
            return left or right
            
        return helper([0], float('-inf'), float('inf'))
```

```java
class Solution {
    public boolean verifyPreorder(int[] preorder) {
        int[] i = {0};
        return helper(preorder, i, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    
    public boolean helper(int[] preorder, int[] i, int minLimit, int maxLimit) {
        if (i[0] == preorder.length) {
            return true;
        }
        
        int root = preorder[i[0]];
        if (root <= minLimit || root >= maxLimit) {
            return false;
        }
        
        i[0]++;
        boolean left = helper(preorder, i, minLimit, root);
        boolean right = helper(preorder, i, root, maxLimit);
        return left || right;
    }
}
```

```cpp
class Solution {
public:
    bool verifyPreorder(vector<int>& preorder) {
        int i = 0;
        return helper(preorder, i, INT_MIN, INT_MAX);
    }
    
    bool helper(vector<int>& preorder, int& i, int minLimit, int maxLimit) {
        if (i == preorder.size()) {
            return true;
        }
        
        int root = preorder[i];
        if (root <= minLimit || root >= maxLimit) {
            return false;
        }
        
        i++;
        bool left = helper(preorder, i, minLimit, root);
        bool right = helper(preorder, i, root, maxLimit);
        return left || right;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of `preorder`
