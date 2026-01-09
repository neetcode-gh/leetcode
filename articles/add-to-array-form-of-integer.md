## 1. Reverse and Add

::tabs-start

```python
class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        num.reverse()
        i = 0
        while k:
            digit = k % 10
            if i < len(num):
                num[i] += digit
            else:
                num.append(digit)
            carry = num[i] // 10
            num[i] %= 10
            k //= 10
            k += carry
            i += 1
        num.reverse()
        return num
```

```java
public class Solution {
    public List<Integer> addToArrayForm(int[] num, int k) {
        List<Integer> result = new ArrayList<>();
        for (int i = num.length - 1; i >= 0; i--) {
            k += num[i];
            result.add(k % 10);
            k /= 10;
        }
        while (k > 0) {
            result.add(k % 10);
            k /= 10;
        }
        Collections.reverse(result);
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> addToArrayForm(vector<int>& num, int k) {
        reverse(num.begin(), num.end());
        int i = 0;
        while (k) {
            int digit = k % 10;
            if (i < num.size()) {
                num[i] += digit;
            } else {
                num.push_back(digit);
            }
            int carry = num[i] / 10;
            num[i] %= 10;
            k /= 10;
            k += carry;
            i++;
        }
        reverse(num.begin(), num.end());
        return num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} num
     * @param {number} k
     * @return {number[]}
     */
    addToArrayForm(num, k) {
        num.reverse();
        let i = 0;
        while (k > 0) {
            const digit = k % 10;
            if (i < num.length) {
                num[i] += digit;
            } else {
                num.push(digit);
            }
            const carry = Math.floor(num[i] / 10);
            num[i] %= 10;
            k = Math.floor(k / 10) + carry;
            i++;
        }
        num.reverse();
        return num;
    }
}
```

```csharp
public class Solution {
    public IList<int> AddToArrayForm(int[] num, int k) {
        List<int> result = new List<int>();
        for (int i = num.Length - 1; i >= 0; i--) {
            k += num[i];
            result.Add(k % 10);
            k /= 10;
        }
        while (k > 0) {
            result.Add(k % 10);
            k /= 10;
        }
        result.Reverse();
        return result;
    }
}
```

```go
func addToArrayForm(num []int, k int) []int {
    result := []int{}
    for i := len(num) - 1; i >= 0; i-- {
        k += num[i]
        result = append(result, k%10)
        k /= 10
    }
    for k > 0 {
        result = append(result, k%10)
        k /= 10
    }
    for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
        result[i], result[j] = result[j], result[i]
    }
    return result
}
```

```kotlin
class Solution {
    fun addToArrayForm(num: IntArray, k: Int): List<Int> {
        val result = mutableListOf<Int>()
        var carry = k
        for (i in num.size - 1 downTo 0) {
            carry += num[i]
            result.add(carry % 10)
            carry /= 10
        }
        while (carry > 0) {
            result.add(carry % 10)
            carry /= 10
        }
        result.reverse()
        return result
    }
}
```

```swift
class Solution {
    func addToArrayForm(_ num: [Int], _ k: Int) -> [Int] {
        var result = [Int]()
        var k = k
        for i in stride(from: num.count - 1, through: 0, by: -1) {
            k += num[i]
            result.append(k % 10)
            k /= 10
        }
        while k > 0 {
            result.append(k % 10)
            k /= 10
        }
        return result.reversed()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(max(n, m))$
- Space complexity: $O(n)$.

> Where $n$ is the size of the array $num$ and $m$ is the number of digits in $k$.

---

## 2. Without Reverse()

::tabs-start

```python
class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        from collections import deque
        result = deque()
        i = len(num) - 1
        carry = 0

        while i >= 0 or k > 0 or carry > 0:
            digit = k % 10
            sum_val = carry + (num[i] if i >= 0 else 0) + digit

            result.appendleft(sum_val % 10)
            carry = sum_val // 10

            k //= 10
            i -= 1

        return list(result)
```

```java
public class Solution {
    public List<Integer> addToArrayForm(int[] num, int k) {
        LinkedList<Integer> result = new LinkedList<>();
        int carry = 0, i = num.length - 1;

        while (i >= 0 || k > 0 || carry > 0) {
            int digit = k % 10;
            int sum = carry + (i >= 0 ? num[i] : 0) + digit;

            result.addFirst(sum % 10);
            carry = sum / 10;

            k /= 10;
            i--;
        }

        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> addToArrayForm(vector<int>& num, int k) {
        list<int> result;
        int carry = 0, i = num.size() - 1;

        while (i >= 0 || k > 0 || carry > 0) {
            int digit = k % 10;
            int sum = carry + (i >= 0 ? num[i] : 0) + digit;

            result.push_front(sum % 10);
            carry = sum / 10;

            k /= 10;
            i--;
        }

        return vector<int>(result.begin(), result.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} num
     * @param {number} k
     * @return {number[]}
     */
    addToArrayForm(num, k) {
        let res = new Deque();
        let carry = 0,
            i = num.length - 1;

        while (i >= 0 || k > 0 || carry > 0) {
            const digit = k % 10;
            const sum = carry + (i >= 0 ? num[i] : 0) + digit;

            res.pushFront(sum % 10);
            carry = Math.floor(sum / 10);

            k = Math.floor(k / 10);
            i--;
        }

        const resultArray = [];
        while (!res.isEmpty()) {
            resultArray.push(res.popFront());
        }

        return resultArray;
    }
}
```

```csharp
public class Solution {
    public IList<int> AddToArrayForm(int[] num, int k) {
        LinkedList<int> result = new LinkedList<int>();
        int carry = 0, i = num.Length - 1;

        while (i >= 0 || k > 0 || carry > 0) {
            int digit = k % 10;
            int sum = carry + (i >= 0 ? num[i] : 0) + digit;

            result.AddFirst(sum % 10);
            carry = sum / 10;

            k /= 10;
            i--;
        }

        return result.ToList();
    }
}
```

```go
func addToArrayForm(num []int, k int) []int {
    result := []int{}
    carry := 0
    i := len(num) - 1

    for i >= 0 || k > 0 || carry > 0 {
        digit := k % 10
        numDigit := 0
        if i >= 0 {
            numDigit = num[i]
        }
        sum := carry + numDigit + digit

        result = append([]int{sum % 10}, result...)
        carry = sum / 10

        k /= 10
        i--
    }

    return result
}
```

```kotlin
class Solution {
    fun addToArrayForm(num: IntArray, k: Int): List<Int> {
        val result = LinkedList<Int>()
        var carry = 0
        var i = num.size - 1
        var remaining = k

        while (i >= 0 || remaining > 0 || carry > 0) {
            val digit = remaining % 10
            val sum = carry + (if (i >= 0) num[i] else 0) + digit

            result.addFirst(sum % 10)
            carry = sum / 10

            remaining /= 10
            i--
        }

        return result
    }
}
```

```swift
class Solution {
    func addToArrayForm(_ num: [Int], _ k: Int) -> [Int] {
        var result = [Int]()
        var carry = 0
        var i = num.count - 1
        var k = k

        while i >= 0 || k > 0 || carry > 0 {
            let digit = k % 10
            let sum = carry + (i >= 0 ? num[i] : 0) + digit

            result.insert(sum % 10, at: 0)
            carry = sum / 10

            k /= 10
            i -= 1
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(max(n, m))$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $num$ and $m$ is the number of digits in $k$.
