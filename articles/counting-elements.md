## 1. Search with Array

::tabs-start

```python
class Solution:
    def countElements(self, arr: List[int]) -> int:
        count = 0
        for x in arr:
            if x + 1 in arr:
                count += 1
        return count
```

```java
class Solution {
    public int countElements(int[] arr) {
        int count = 0;
        for (int x : arr) {
            if (integerInArray(arr, x + 1)) {
                count++;
            }
        }
        return count;
    }

    public boolean integerInArray(int[] arr, int target) {
        for (int x : arr) {
            if (x == target) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    int countElements(vector<int>& arr) {
        int count = 0;
        for (auto x : arr) {
            if (integerInArray(arr, x + 1)) {
                count++;
            }
        }
        return count;
    }

    bool integerInArray(vector<int>& arr, int target) {
        for (auto x : arr) {
            if (x == target) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countElements(arr) {
        let count = 0;
        for (const x of arr) {
            if (arr.includes(x + 1)) {
                count++;
            }
        }
        return count;
    }
}
```

```csharp
public class Solution {
    public int CountElements(int[] arr) {
        int count = 0;
        foreach (int x in arr) {
            if (IntegerInArray(arr, x + 1)) {
                count++;
            }
        }
        return count;
    }

    private bool IntegerInArray(int[] arr, int target) {
        foreach (int x in arr) {
            if (x == target) {
                return true;
            }
        }
        return false;
    }
}
```

```go
func countElements(arr []int) int {
    count := 0
    for _, x := range arr {
        if integerInArray(arr, x+1) {
            count++
        }
    }
    return count
}

func integerInArray(arr []int, target int) bool {
    for _, x := range arr {
        if x == target {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun countElements(arr: IntArray): Int {
        var count = 0
        for (x in arr) {
            if (integerInArray(arr, x + 1)) {
                count++
            }
        }
        return count
    }

    private fun integerInArray(arr: IntArray, target: Int): Boolean {
        for (x in arr) {
            if (x == target) {
                return true
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func countElements(_ arr: [Int]) -> Int {
        var count = 0
        for x in arr {
            if arr.contains(x + 1) {
                count += 1
            }
        }
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(1)$ constant space

>  Where $N$ is the length of the input array `arr`.

---

## 2. Search with HashSet

::tabs-start

```python
class Solution:
    def countElements(self, arr: List[int]) -> int:
        hash_set = set(arr)
        count = 0
        for x in arr:
            if x + 1 in hash_set:
                count += 1
        return count
```

```java
class Solution {
    public int countElements(int[] arr) {
        Set<Integer> hashSet = new HashSet<>();
        for (int x : arr) {
            hashSet.add(x);
        }
        int count = 0;
        for (int x : arr) {
            if (hashSet.contains(x + 1)) {
                count++;
            }
        }
        return count;
    }
}
```

```cpp
class Solution {
public:
    int countElements(vector<int>& arr) {
        unordered_set<int> hashSet(arr.begin(), arr.end());
        int count = 0;
        for (int x : arr) {
            if (hashSet.find(x + 1) != hashSet.end()) {
                count++;
            }
        }
        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countElements(arr) {
        const hashSet = new Set(arr);
        let count = 0;
        for (const x of arr) {
            if (hashSet.has(x + 1)) {
                count++;
            }
        }
        return count;
    }
}
```

```csharp
public class Solution {
    public int CountElements(int[] arr) {
        HashSet<int> hashSet = new HashSet<int>(arr);
        int count = 0;
        foreach (int x in arr) {
            if (hashSet.Contains(x + 1)) {
                count++;
            }
        }
        return count;
    }
}
```

```go
func countElements(arr []int) int {
    hashSet := make(map[int]bool)
    for _, x := range arr {
        hashSet[x] = true
    }
    count := 0
    for _, x := range arr {
        if hashSet[x+1] {
            count++
        }
    }
    return count
}
```

```kotlin
class Solution {
    fun countElements(arr: IntArray): Int {
        val hashSet = arr.toHashSet()
        var count = 0
        for (x in arr) {
            if (hashSet.contains(x + 1)) {
                count++
            }
        }
        return count
    }
}
```

```swift
class Solution {
    func countElements(_ arr: [Int]) -> Int {
        let hashSet = Set(arr)
        var count = 0
        for x in arr {
            if hashSet.contains(x + 1) {
                count += 1
            }
        }
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the length of the input array `arr`.

---

## 3. Search with Sorted Array

::tabs-start

```python
class Solution:
    def countElements(self, arr: List[int]) -> int:
        arr.sort()
        count = 0
        run_length = 1
        for i in range(1, len(arr)):
            if arr[i - 1] != arr[i]:
                if arr[i - 1] + 1 == arr[i]:
                    count += run_length
                run_length = 0
            run_length += 1
        return count
```

```java
class Solution {
    public int countElements(int[] arr) {
        Arrays.sort(arr);
        int count = 0;
        int runLength = 1;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i - 1] != arr[i]) {
                if (arr[i - 1] + 1 == arr[i]) {
                    count += runLength;
                }
                runLength = 0;
            }
            runLength++;
        }
        return count;
    }
}
```

```cpp
class Solution {
public:
    int countElements(vector<int>& arr) {
        std::sort(arr.begin(), arr.end());
        int count = 0;
        int runLength = 1;
        for (int i = 1; i < arr.size(); i++) {
            if (arr[i - 1] != arr[i]) {
                if (arr[i - 1] + 1 == arr[i]) {
                    count += runLength;
                }
                runLength = 0;
            }
            runLength++;
        }
        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    countElements(arr) {
        arr.sort((a, b) => a - b);
        let count = 0;
        let runLength = 1;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] !== arr[i]) {
                if (arr[i - 1] + 1 === arr[i]) {
                    count += runLength;
                }
                runLength = 0;
            }
            runLength++;
        }
        return count;
    }
}
```

```csharp
public class Solution {
    public int CountElements(int[] arr) {
        Array.Sort(arr);
        int count = 0;
        int runLength = 1;
        for (int i = 1; i < arr.Length; i++) {
            if (arr[i - 1] != arr[i]) {
                if (arr[i - 1] + 1 == arr[i]) {
                    count += runLength;
                }
                runLength = 0;
            }
            runLength++;
        }
        return count;
    }
}
```

```go
func countElements(arr []int) int {
    sort.Ints(arr)
    count := 0
    runLength := 1
    for i := 1; i < len(arr); i++ {
        if arr[i-1] != arr[i] {
            if arr[i-1]+1 == arr[i] {
                count += runLength
            }
            runLength = 0
        }
        runLength++
    }
    return count
}
```

```kotlin
class Solution {
    fun countElements(arr: IntArray): Int {
        arr.sort()
        var count = 0
        var runLength = 1
        for (i in 1 until arr.size) {
            if (arr[i - 1] != arr[i]) {
                if (arr[i - 1] + 1 == arr[i]) {
                    count += runLength
                }
                runLength = 0
            }
            runLength++
        }
        return count
    }
}
```

```swift
class Solution {
    func countElements(_ arr: [Int]) -> Int {
        let sortedArr = arr.sorted()
        var count = 0
        var runLength = 1
        for i in 1..<sortedArr.count {
            if sortedArr[i - 1] != sortedArr[i] {
                if sortedArr[i - 1] + 1 == sortedArr[i] {
                    count += runLength
                }
                runLength = 0
            }
            runLength += 1
        }
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: varies from $O(N)$ to $O(1)$
    - The overall space complexity is dependent on the space complexity of the sorting algorithm you're using. The space complexity of sorting algorithms built into programming languages are generally anywhere from $O(N)$ to $O(1)$.

>  Where $N$ is the length of the input array `arr`.
