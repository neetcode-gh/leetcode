## 1. Storing indexes for all letters

::tabs-start

```python
class Solution:
    def calculateTime(self, keyboard: str, word: str) -> int:
        key_indices = {}
        # Get the index for each key.
        for i in range(len(keyboard)):
            key_indices[keyboard[i]] = i
            
        # Initialize previous index as starting index = 0.
        prev = 0
        result = 0
        
        # Calculate the total time.
        for c in word:
            # Add the distance from previous index
            # to current letter's index to the result.
            result += abs(prev - key_indices[c])
            
            # Update the previous index to current index for next iteration.
            prev = key_indices[c]
            
        return result
```

```java
class Solution {
    public int calculateTime(String keyboard, String word) {
        int[] keyIndices = new int[26];

        // Get the index for each key.
        for (int i = 0; i < keyboard.length(); i++)
            keyIndices[keyboard.charAt(i) - 'a'] = i;

        // Initialize previous index as starting index = 0.
        int prev = 0;
        int result = 0;

        // Calculate the total time.
        for (char c : word.toCharArray()) {
            // Add the distance from previous index
            // to current letter's index to the result.
            result += Math.abs(prev - keyIndices[c - 'a']);

            // Update the previous index to current index for next iteration.
            prev = keyIndices[c - 'a'];
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    int calculateTime(string keyboard, string word) {
        vector<int> keyIndices(26, -1);

        // Get the index for each key.
        for (int i = 0; i < keyboard.length(); i++)
            keyIndices[keyboard[i] - 'a'] = i;

        // Initialize previous index as starting index = 0.
        int prev = 0;
        int result = 0;

        // Calculate the total time.
        for (char &c : word) {
            // Add the distance from previous index
            // to current letter's index to the result.
            result += abs(prev - keyIndices[c - 'a']);

            // Update the previous index to current index for next iteration.
            prev = keyIndices[c - 'a'];
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} keyboard
     * @param {string} word
     * @return {number}
     */
    calculateTime(keyboard, word) {
        const keyIndices = {};
        // Get the index for each key.
        for (let i = 0; i < keyboard.length; i++)
            keyIndices[keyboard[i]] = i;
            
        // Initialize previous index as starting index = 0.
        let prev = 0;
        let result = 0;
        
        // Calculate the total time.
        for (const c of word) {
            // Add the distance from previous index
            // to current letter's index to the result.
            result += Math.abs(prev - keyIndices[c]);
            
            // Update the previous index to current index for next iteration.
            prev = keyIndices[c];
        }
        
        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the length of `word`.
