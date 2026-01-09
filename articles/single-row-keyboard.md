## 1. Storing indexes for all letters

### Intuition

To type a word efficiently, we need to know where each key is located on the keyboard. By precomputing the position of every letter, we can quickly look up the distance between consecutive characters. The total time is the sum of all these distances as we move from one key to the next.

### Algorithm

1. Create a mapping from each character in the keyboard to its index position.
2. Initialize `prev` to 0 (starting position) and `result` to 0.
3. For each character in the word:
   - Look up its position and add the absolute distance from `prev` to `result`.
   - Update `prev` to the current character's position.
4. Return `result` as the total typing time.

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

```csharp
public class Solution {
    public int CalculateTime(string keyboard, string word) {
        int[] keyIndices = new int[26];

        // Get the index for each key.
        for (int i = 0; i < keyboard.Length; i++)
            keyIndices[keyboard[i] - 'a'] = i;

        // Initialize previous index as starting index = 0.
        int prev = 0;
        int result = 0;

        // Calculate the total time.
        foreach (char c in word) {
            // Add the distance from previous index
            // to current letter's index to the result.
            result += Math.Abs(prev - keyIndices[c - 'a']);

            // Update the previous index to current index for next iteration.
            prev = keyIndices[c - 'a'];
        }

        return result;
    }
}
```

```go
func calculateTime(keyboard string, word string) int {
    keyIndices := make([]int, 26)

    // Get the index for each key.
    for i := 0; i < len(keyboard); i++ {
        keyIndices[keyboard[i]-'a'] = i
    }

    // Initialize previous index as starting index = 0.
    prev := 0
    result := 0

    // Calculate the total time.
    for _, c := range word {
        // Add the distance from previous index
        // to current letter's index to the result.
        dist := prev - keyIndices[c-'a']
        if dist < 0 {
            dist = -dist
        }
        result += dist

        // Update the previous index to current index for next iteration.
        prev = keyIndices[c-'a']
    }

    return result
}
```

```kotlin
class Solution {
    fun calculateTime(keyboard: String, word: String): Int {
        val keyIndices = IntArray(26)

        // Get the index for each key.
        for (i in keyboard.indices) {
            keyIndices[keyboard[i] - 'a'] = i
        }

        // Initialize previous index as starting index = 0.
        var prev = 0
        var result = 0

        // Calculate the total time.
        for (c in word) {
            // Add the distance from previous index
            // to current letter's index to the result.
            result += kotlin.math.abs(prev - keyIndices[c - 'a'])

            // Update the previous index to current index for next iteration.
            prev = keyIndices[c - 'a']
        }

        return result
    }
}
```

```swift
class Solution {
    func calculateTime(_ keyboard: String, _ word: String) -> Int {
        var keyIndices = [Int](repeating: 0, count: 26)
        let keyboardArr = Array(keyboard)

        // Get the index for each key.
        for i in 0..<keyboardArr.count {
            keyIndices[Int(keyboardArr[i].asciiValue! - Character("a").asciiValue!)] = i
        }

        // Initialize previous index as starting index = 0.
        var prev = 0
        var result = 0

        // Calculate the total time.
        for c in word {
            // Add the distance from previous index
            // to current letter's index to the result.
            let idx = Int(c.asciiValue! - Character("a").asciiValue!)
            result += abs(prev - keyIndices[idx])

            // Update the previous index to current index for next iteration.
            prev = keyIndices[idx]
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the length of `word`.
