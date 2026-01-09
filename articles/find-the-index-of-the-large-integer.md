## 1. Binary Search

::tabs-start

```python
class Solution(object):
    def getIndex(self, reader):
        left = 0
        length = reader.length()

        while (length > 1):
            length //= 2
            cmp = reader.compareSub(left, left + length - 1, left + length,
                                              left + length + length - 1)
            if cmp == 0:
                return left + length + length
            
            if cmp < 0:
                left += length
        return left
```

```java
class Solution {
    public int getIndex(ArrayReader reader) {
        int left = 0;
        int length = reader.length(); 

        while (length > 1) {
            length /= 2;
            // The left subarray starts from index left and the right part starts from left + length, both subarrays have length elements. 
            final int cmp = reader.compareSub(left, left + length - 1, left + length, left + length + length - 1);
            if (cmp == 0) {
                // The extra element is the larger integer.
                return left + length + length;
            }
            
            if (cmp < 0) {
                left += length;
            }
        }
        return left;
        
    }
}
```

```cpp
class Solution {
public:
    int getIndex(ArrayReader &reader) {
        int left = 0;
        int length = reader.length();
        
        while (length > 1) {
            length /= 2;
            int cmp = reader.compareSub(
                left, 
                left + length - 1, 
                left + length,
                left + length + length - 1
            );
            
            if (cmp == 0) {
                return left + length + length;
            }
            if (cmp < 0) {
                left += length;
            }
        }
        
        return left;
    }
};
```

```javascript
class Solution {
    /**
     * @param {ArrayReader} reader
     * @return {number}
     */
    getIndex(reader) {
        let left = 0;
        let length = reader.length();

        while (length > 1) {
            length = Math.floor(length / 2);
            const cmp = reader.compareSub(
                left,
                left + length - 1,
                left + length,
                left + length + length - 1
            );

            if (cmp === 0) {
                return left + length + length;
            }
            if (cmp < 0) {
                left += length;
            }
        }

        return left;
    }
}
```

```csharp
public class Solution {
    public int GetIndex(ArrayReader reader) {
        int left = 0;
        int length = reader.Length();

        while (length > 1) {
            length /= 2;
            int cmp = reader.CompareSub(
                left,
                left + length - 1,
                left + length,
                left + length + length - 1
            );

            if (cmp == 0) {
                return left + length + length;
            }
            if (cmp < 0) {
                left += length;
            }
        }

        return left;
    }
}
```

```go
func getIndex(reader ArrayReader) int {
    left := 0
    length := reader.Length()

    for length > 1 {
        length /= 2
        cmp := reader.CompareSub(
            left,
            left+length-1,
            left+length,
            left+length+length-1,
        )

        if cmp == 0 {
            return left + length + length
        }
        if cmp < 0 {
            left += length
        }
    }

    return left
}
```

```kotlin
class Solution {
    fun getIndex(reader: ArrayReader): Int {
        var left = 0
        var length = reader.length()

        while (length > 1) {
            length /= 2
            val cmp = reader.compareSub(
                left,
                left + length - 1,
                left + length,
                left + length + length - 1
            )

            if (cmp == 0) {
                return left + length + length
            }
            if (cmp < 0) {
                left += length
            }
        }

        return left
    }
}
```

```swift
class Solution {
    func getIndex(_ reader: ArrayReader) -> Int {
        var left = 0
        var length = reader.length()

        while length > 1 {
            length /= 2
            let cmp = reader.compareSub(
                left,
                left + length - 1,
                left + length,
                left + length + length - 1
            )

            if cmp == 0 {
                return left + length + length
            }
            if cmp < 0 {
                left += length
            }
        }

        return left
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log N)$
- Space complexity: $O(1)$ constant space

>  Where $N$ is the length of the internal array.
