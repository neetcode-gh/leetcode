## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search Tree Properties** - Understanding that left subtree values are less than root and right subtree values are greater
- **Preorder Traversal** - Knowing the order of visiting nodes (root, left subtree, right subtree)
- **Monotonic Stack** - Using a stack that maintains increasing or decreasing order to track ancestors
- **Recursion with Bounds** - Validating BST nodes by passing min/max constraints through recursive calls

---

## 1. Monotonic Stack

### Intuition
In a BST preorder traversal, we visit root, then left subtree, then right subtree. When we move to a right subtree, all subsequent values must be greater than the ancestors we are leaving behind. The key insight is to use a decreasing stack to track ancestors. When we encounter a larger value, we pop smaller ancestors and update the minimum limit, as we are now in a right subtree.

### Algorithm
1. Initialize a stack and set `min_limit` to negative infinity.
2. Iterate through each number in the `preorder` sequence.
3. While the stack is not empty and the stack top is less than the current number, pop from the stack and update `min_limit` to the popped value.
4. If the current number is less than or equal to `min_limit`, return `false` as it violates BST property.
5. Push the current number onto the stack.
6. If all numbers are processed without violations, return `true`.

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

```go
func verifyPreorder(preorder []int) bool {
    minLimit := math.MinInt32
    stack := []int{}

    for _, num := range preorder {
        for len(stack) > 0 && stack[len(stack)-1] < num {
            minLimit = stack[len(stack)-1]
            stack = stack[:len(stack)-1]
        }

        if num <= minLimit {
            return false
        }

        stack = append(stack, num)
    }

    return true
}
```

```kotlin
class Solution {
    fun verifyPreorder(preorder: IntArray): Boolean {
        var minLimit = Int.MIN_VALUE
        val stack = ArrayDeque<Int>()

        for (num in preorder) {
            while (stack.isNotEmpty() && stack.last() < num) {
                minLimit = stack.removeLast()
            }

            if (num <= minLimit) {
                return false
            }

            stack.addLast(num)
        }

        return true
    }
}
```

```swift
class Solution {
    func verifyPreorder(_ preorder: [Int]) -> Bool {
        var minLimit = Int.min
        var stack = [Int]()

        for num in preorder {
            while !stack.isEmpty && stack.last! < num {
                minLimit = stack.removeLast()
            }

            if num <= minLimit {
                return false
            }

            stack.append(num)
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of `preorder`

---

## 2. Constant Auxiliary Space

### Intuition
We can optimize the stack approach by reusing the input array itself as our stack. Since we process elements left to right and the stack never grows larger than the elements we have processed, we can use the prefix of the preorder array to simulate the stack.

### Algorithm
1. Initialize `min_limit` to negative infinity and use index `i` as the stack pointer.
2. Iterate through each number in the `preorder` sequence.
3. While `i > 0` and `preorder[i-1]` is less than the current number, set `min_limit` to `preorder[i-1]` and decrement `i`.
4. If the current number is less than or equal to `min_limit`, return `false`.
5. Write the current number to `preorder[i]` and increment `i` to simulate pushing onto the stack.
6. Return `true` if all numbers are processed without violations.

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

```go
func verifyPreorder(preorder []int) bool {
    minLimit := math.MinInt32
    i := 0

    for _, num := range preorder {
        for i > 0 && preorder[i-1] < num {
            minLimit = preorder[i-1]
            i--
        }

        if num <= minLimit {
            return false
        }

        preorder[i] = num
        i++
    }

    return true
}
```

```kotlin
class Solution {
    fun verifyPreorder(preorder: IntArray): Boolean {
        var minLimit = Int.MIN_VALUE
        var i = 0

        for (num in preorder) {
            while (i > 0 && preorder[i - 1] < num) {
                minLimit = preorder[i - 1]
                i--
            }

            if (num <= minLimit) {
                return false
            }

            preorder[i] = num
            i++
        }

        return true
    }
}
```

```swift
class Solution {
    func verifyPreorder(_ preorder: inout [Int]) -> Bool {
        var minLimit = Int.min
        var i = 0

        for num in preorder {
            while i > 0 && preorder[i - 1] < num {
                minLimit = preorder[i - 1]
                i -= 1
            }

            if num <= minLimit {
                return false
            }

            preorder[i] = num
            i += 1
        }

        return true
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

### Intuition
We can verify the preorder sequence by simulating the construction of the BST. Each recursive call attempts to build a subtree within given bounds. The key insight is that for a valid preorder sequence, we can greedily consume elements that fall within the current subtree's valid range, recursively processing left and right subtrees.

### Algorithm
1. Maintain a global index to track the current position in the `preorder` array.
2. Create a recursive helper function that takes `min_limit` and `max_limit` as boundaries.
3. If the index reaches the end, return `true` as all elements have been processed.
4. Check if the current element falls within the valid range. If not, return `false`.
5. Increment the index and recursively verify the left subtree (with `max_limit` as current value) and right subtree (with `min_limit` as current value).
6. Return `true` if either the left or right subtree verification succeeds, allowing the sequence to be valid.

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

```go
func verifyPreorder(preorder []int) bool {
    i := 0
    return helper(preorder, &i, math.MinInt32, math.MaxInt32)
}

func helper(preorder []int, i *int, minLimit, maxLimit int) bool {
    if *i == len(preorder) {
        return true
    }

    root := preorder[*i]
    if root <= minLimit || root >= maxLimit {
        return false
    }

    *i++
    left := helper(preorder, i, minLimit, root)
    right := helper(preorder, i, root, maxLimit)
    return left || right
}
```

```kotlin
class Solution {
    fun verifyPreorder(preorder: IntArray): Boolean {
        val i = intArrayOf(0)
        return helper(preorder, i, Int.MIN_VALUE, Int.MAX_VALUE)
    }

    private fun helper(preorder: IntArray, i: IntArray, minLimit: Int, maxLimit: Int): Boolean {
        if (i[0] == preorder.size) {
            return true
        }

        val root = preorder[i[0]]
        if (root <= minLimit || root >= maxLimit) {
            return false
        }

        i[0]++
        val left = helper(preorder, i, minLimit, root)
        val right = helper(preorder, i, root, maxLimit)
        return left || right
    }
}
```

```swift
class Solution {
    func verifyPreorder(_ preorder: [Int]) -> Bool {
        var i = 0
        return helper(preorder, &i, Int.min, Int.max)
    }

    private func helper(_ preorder: [Int], _ i: inout Int, _ minLimit: Int, _ maxLimit: Int) -> Bool {
        if i == preorder.count {
            return true
        }

        let root = preorder[i]
        if root <= minLimit || root >= maxLimit {
            return false
        }

        i += 1
        let left = helper(preorder, &i, minLimit, root)
        let right = helper(preorder, &i, root, maxLimit)
        return left || right
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of `preorder`

---

## Common Pitfalls

### Using Wrong Comparison Operator

When checking if a value violates BST constraints, you must use less than or equal (`<=`) for the minimum limit check, not just less than. BSTs typically do not allow duplicate values, so a value equal to an ancestor it should be greater than is invalid.

### Misunderstanding When to Update the Minimum Limit

The minimum limit should only be updated when you pop elements from the stack (transitioning to a right subtree). A common mistake is updating the limit at the wrong time, such as when pushing elements. The limit represents the most recently left ancestor whose right subtree you are now in.

### Not Maintaining a Decreasing Stack

The stack should maintain a decreasing order from bottom to top. When you encounter a larger value, you pop smaller values to find the correct parent. Forgetting to maintain this invariant or popping incorrectly will cause the algorithm to fail on valid preorder sequences.
