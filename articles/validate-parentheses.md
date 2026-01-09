## 1. Brute Force

### Intuition

The idea is simple:  
valid parentheses must always appear in matching pairs like `"()"`, `"{}"`, or `"[]"`.  
So if the string is valid, we can repeatedly remove these matching pairs until nothing is left.  
If, after removing all possible pairs, the string becomes empty, then the parentheses were properly matched.  
Otherwise, some unmatched characters remain, meaning the string is invalid.

### Algorithm

1. While the string still contains `"()"`, `"{}"`, or `"[]"`:
   - Remove all occurrences of those pairs.
2. After no more pairs can be removed:
   - If the string is empty, return `True`.
   - Otherwise, return `False`.

<details>
<summary>Example - Dry Run</summary>

Input: `s = "({[]})"`

We repeatedly remove matching pairs `()`, `{}`, `[]` until no more can be removed.

```
Initial String:
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘
  0   1   2   3   4   5

═══════════════════════════════════════

Iteration 1:
    Remove "()" → not found at adjacent positions
    Remove "{}" → not found at adjacent positions
    Remove "[]" → found at positions 2-3!

             Found pair
               ↓↓
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘

    After removal:
    ┌───┬───┬───┬───┐
    │ ( │ { │ } │ ) │
    └───┴───┴───┴───┘
      0   1   2   3

═══════════════════════════════════════

Iteration 2:
    Remove "()" → not found at adjacent positions
    Remove "{}" → found at positions 1-2!

         Found pair
           ↓↓
    ┌───┬───┬───┬───┐
    │ ( │ { │ } │ ) │
    └───┴───┴───┴───┘

    After removal:
    ┌───┬───┐
    │ ( │ ) │
    └───┴───┘
      0   1

═══════════════════════════════════════

Iteration 3:
    Remove "()" → found at positions 0-1!

     Found pair
       ↓↓
    ┌───┬───┐
    │ ( │ ) │
    └───┴───┘

    After removal:
    ┌───┐
    │   │  ← Empty string!
    └───┘

═══════════════════════════════════════

Final Result:
    String is empty → return True
```

</details>

::tabs-start

```python
class Solution:
    def isValid(self, s: str) -> bool:
        while '()' in s or '{}' in s or '[]' in s:
            s = s.replace('()', '')
            s = s.replace('{}', '')
            s = s.replace('[]', '')
        return s == ''
```

```java
public class Solution {
    public boolean isValid(String s) {
        while (s.contains("()") || s.contains("{}") || s.contains("[]")) {
            s = s.replace("()", "");
            s = s.replace("{}", "");
            s = s.replace("[]", "");
        }
        return s.isEmpty();
    }
}
```

```cpp
class Solution {
public:
    bool isValid(string s) {
        while (true) {
            size_t pos = string::npos;
            if ((pos = s.find("()")) != string::npos) {
                s.erase(pos, 2);
                continue;
            }
            if ((pos = s.find("{}")) != string::npos) {
                s.erase(pos, 2);
                continue;
            }
            if ((pos = s.find("[]")) != string::npos) {
                s.erase(pos, 2);
                continue;
            }
            break;
        }
        return s.empty();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        while (s.includes('()') || s.includes('{}') || s.includes('[]')) {
            s = s.replace('()', '');
            s = s.replace('{}', '');
            s = s.replace('[]', '');
        }
        return s === '';
    }
}
```

```csharp
public class Solution {
    public bool IsValid(string s) {
        while (s.Contains("()") || s.Contains("{}") || s.Contains("[]")) {
            s = s.Replace("()", "");
            s = s.Replace("{}", "");
            s = s.Replace("[]", "");
        }
        return s == "";
    }
}
```

```go
func isValid(s string) bool {
	for strings.Contains(s, "()") || strings.Contains(s, "{}") || strings.Contains(s, "[]") {
		s = strings.ReplaceAll(s, "()", "")
		s = strings.ReplaceAll(s, "{}", "")
		s = strings.ReplaceAll(s, "[]", "")
	}
	return s == ""
}
```

```kotlin
class Solution {
    fun isValid(s: String): Boolean {
        var str = s
        while (str.contains("()") || str.contains("{}") || str.contains("[]")) {
            str = str.replace("()", "")
            str = str.replace("{}", "")
            str = str.replace("[]", "")
        }
        return str.isEmpty()
    }
}
```

```swift
class Solution {
    func isValid(_ s: String) -> Bool {
        var str = s
        while str.contains("()") || str.contains("{}") || str.contains("[]") {
            str = str.replacingOccurrences(of: "()", with: "")
            str = str.replacingOccurrences(of: "{}", with: "")
            str = str.replacingOccurrences(of: "[]", with: "")
        }
        return str.isEmpty
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Stack

### Intuition

Valid parentheses must follow a last-opened, first-closed order — just like stacking plates.  
So we use a **stack** to track opening brackets.  
Whenever we see a closing bracket, we simply check whether it matches the most recent opening bracket on top of the stack.  
If it matches, we remove that opening bracket.  
If it doesn’t match (or the stack is empty), the string is invalid.  
A valid string ends with an empty stack.

### Algorithm

1. Create a stack to store opening brackets.
2. For each character in the string:
   - If it is an opening bracket, push it onto the stack.
   - If it is a closing bracket:
     - Check if the stack is not empty **and** its top matches the corresponding opening bracket.
     - If yes, pop the stack.
     - Otherwise, return `False`.
3. After processing all characters:
   - If the stack is empty, return `True`.
   - Otherwise, return `False`.

<details>
<summary>Example - Dry Run</summary>

Input: `s = "({[]})"`

We use a stack to track opening brackets and match them with closing brackets.

```
String (processing left to right):
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘
  0   1   2   3   4   5

═══════════════════════════════════════

Step 1: char = '('

    Current char
         ↓
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘

Action: '(' is an opening bracket → Push to stack

Stack:
┌───┐
│ ( │ ← top
└───┘

═══════════════════════════════════════

Step 2: char = '{'

        Current char
             ↓
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘

Action: '{' is an opening bracket → Push to stack

Stack:
┌───┐
│ { │ ← top
├───┤
│ ( │
└───┘

═══════════════════════════════════════

Step 3: char = '['

            Current char
                 ↓
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘

Action: '[' is an opening bracket → Push to stack

Stack:
┌───┐
│ [ │ ← top
├───┤
│ { │
├───┤
│ ( │
└───┘

═══════════════════════════════════════

Step 4: char = ']'

                Current char
                     ↓
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘

Action: ']' is a closing bracket
        Top of stack is '[' which matches! → Pop from stack

Stack:
┌───┐
│ { │ ← top
├───┤
│ ( │
└───┘

═══════════════════════════════════════

Step 5: char = '}'

                    Current char
                         ↓
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘

Action: '}' is a closing bracket
        Top of stack is '{' which matches! → Pop from stack

Stack:
┌───┐
│ ( │ ← top
└───┘

═══════════════════════════════════════

Step 6: char = ')'

                        Current char
                             ↓
┌───┬───┬───┬───┬───┬───┐
│ ( │ { │ [ │ ] │ } │ ) │
└───┴───┴───┴───┴───┴───┘

Action: ')' is a closing bracket
        Top of stack is '(' which matches! → Pop from stack

Stack:
┌───┐
│   │ ← empty
└───┘

═══════════════════════════════════════

Final Result:
    Stack is empty → All brackets matched correctly!
    Return: True
```

</details>

::tabs-start

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        closeToOpen = { ")" : "(", "]" : "[", "}" : "{" }

        for c in s:
            if c in closeToOpen:
                if stack and stack[-1] == closeToOpen[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)

        return True if not stack else False
```

```java
public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> closeToOpen = new HashMap<>();
        closeToOpen.put(')', '(');
        closeToOpen.put(']', '[');
        closeToOpen.put('}', '{');

        for (char c : s.toCharArray()) {
            if (closeToOpen.containsKey(c)) {
                if (!stack.isEmpty() && stack.peek() == closeToOpen.get(c)) {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}
```

```cpp
class Solution {
public:
    bool isValid(string s) {
        std::stack<char> stack;
        std::unordered_map<char, char> closeToOpen = {
            {')', '('},
            {']', '['},
            {'}', '{'}
        };

        for (char c : s) {
            if (closeToOpen.count(c)) {
                if (!stack.empty() && stack.top() == closeToOpen[c]) {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        return stack.empty();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        const stack = [];
        const closeToOpen = {
            ')': '(',
            ']': '[',
            '}': '{',
        };

        for (let c of s) {
            if (closeToOpen[c]) {
                if (
                    stack.length > 0 &&
                    stack[stack.length - 1] === closeToOpen[c]
                ) {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        return stack.length === 0;
    }
}
```

```csharp
public class Solution {
    public bool IsValid(string s) {
        Stack<char> stack = new Stack<char>();
        Dictionary<char, char> closeToOpen = new Dictionary<char, char> {
            { ')', '(' },
            { ']', '[' },
            { '}', '{' }
        };

        foreach (char c in s) {
            if (closeToOpen.ContainsKey(c)) {
                if (stack.Count > 0 && stack.Peek() == closeToOpen[c]) {
                    stack.Pop();
                } else {
                    return false;
                }
            } else {
                stack.Push(c);
            }
        }
        return stack.Count == 0;
    }
}
```

```go
func isValid(s string) bool {
    stack := linkedliststack.New()
    closeToOpen := map[rune]rune{')': '(', ']': '[', '}': '{'}

    for _, c := range s {
        if open, exists := closeToOpen[c]; exists {
            if !stack.Empty() {
                top, ok := stack.Pop()
                if ok && top.(rune) != open {
                    return false
                }
            } else {
                return false
            }
        } else {
            stack.Push(c)
        }
    }

    return stack.Empty()
}
```

```kotlin
class Solution {
    fun isValid(s: String): Boolean {
        val stack = ArrayDeque<Char>()
        val closeToOpen = hashMapOf(')' to '(', ']' to '[', '}' to '{')

        for (c in s) {
            if (c in closeToOpen) {
                if (stack.isNotEmpty() && stack.first() == closeToOpen[c]) {
                    stack.removeFirst()
                } else {
                    return false
                }
            } else {
                stack.addFirst(c)
            }
        }

        return stack.isEmpty()
    }
}
```

```swift
class Solution {
    func isValid(_ s: String) -> Bool {
        var stack = [Character]()
        let closeToOpen: [Character: Character] = [")": "(", "]": "[", "}": "{"]

        for c in s {
            if let open = closeToOpen[c] {
                if !stack.isEmpty && stack.last! == open {
                    stack.popLast()
                } else {
                    return false
                }
            } else {
                stack.append(c)
            }
        }

        return stack.isEmpty
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
