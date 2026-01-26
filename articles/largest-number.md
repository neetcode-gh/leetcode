## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Custom Comparators for Sorting** - Defining comparison logic based on string concatenation rather than numeric value
- **String Manipulation** - Converting integers to strings and concatenating them for comparison
- **Greedy Algorithms** - Making locally optimal choices (ordering pairs) to achieve global optimum

---

## 1. Brute Force

### Intuition

To form the largest number, we need to decide the order of numbers such that when concatenated, they produce the maximum value. The key insight is that comparing two numbers `a` and `b` requires checking which concatenation is larger: `a + b` or `b + a`. For example, given `9` and `34`, we compare `"934"` vs `"349"` and pick the order that gives the larger result.

The brute force approach repeatedly finds the "best" number to place next by comparing all remaining numbers using this concatenation rule, then appends it to the result.

### Algorithm

1. Convert all integers to strings for easy concatenation comparison.
2. Initialize an empty result list.
3. While numbers remain:
   - Find the number that should come first by comparing `arr[i] + arr[maxi]` vs `arr[maxi] + arr[i]` for all candidates.
   - Append the best number to the result and remove it from the list.
4. Join all strings and handle the edge case where the result is all zeros (return `"0"`).

::tabs-start

```python
class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        arr = [str(num) for num in nums]

        res = []
        while arr:
            maxi = 0
            for i in range(1, len(arr)):
                if arr[i] + arr[maxi] > arr[maxi] + arr[i]:
                    maxi = i
            res.append(arr[maxi])
            arr.pop(maxi)

        result = "".join(res)
        return result if result[0] != '0' else '0'
```

```java
public class Solution {
    public String largestNumber(int[] nums) {
        List<String> arr = new ArrayList<>();
        for (int num : nums) {
            arr.add(String.valueOf(num));
        }

        StringBuilder res = new StringBuilder();
        while (!arr.isEmpty()) {
            int maxi = 0;
            for (int i = 1; i < arr.size(); i++) {
                if ((arr.get(i) + arr.get(maxi)).compareTo(arr.get(maxi) + arr.get(i)) > 0) {
                    maxi = i;
                }
            }
            res.append(arr.get(maxi));
            arr.remove(maxi);
        }

        String result = res.toString();
        return result.charAt(0) == '0' ? "0" : result;
    }
}
```

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> arr;
        for (int num : nums) {
            arr.push_back(to_string(num));
        }

        string res;
        while (!arr.empty()) {
            int maxi = 0;
            for (int i = 1; i < arr.size(); i++) {
                if (arr[i] + arr[maxi] > arr[maxi] + arr[i]) {
                    maxi = i;
                }
            }
            res += arr[maxi];
            arr.erase(arr.begin() + maxi);
        }

        return res[0] == '0' ? "0" : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {string}
     */
    largestNumber(nums) {
        let arr = nums.map(String);

        let res = [];
        while (arr.length > 0) {
            let maxi = 0;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] + arr[maxi] > arr[maxi] + arr[i]) {
                    maxi = i;
                }
            }
            res.push(arr[maxi]);
            arr.splice(maxi, 1);
        }

        let result = res.join('');
        return result[0] === '0' ? '0' : result;
    }
}
```

```csharp
public class Solution {
    public string LargestNumber(int[] nums) {
        List<string> arr = new List<string>();
        foreach (int num in nums) {
            arr.Add(num.ToString());
        }

        List<string> res = new List<string>();
        while (arr.Count > 0) {
            int maxi = 0;
            for (int i = 1; i < arr.Count; i++) {
                if (string.Compare(arr[i] + arr[maxi], arr[maxi] + arr[i]) > 0) {
                    maxi = i;
                }
            }
            res.Add(arr[maxi]);
            arr.RemoveAt(maxi);
        }

        string result = string.Join("", res);
        return result[0] == '0' ? "0" : result;
    }
}
```

```go
func largestNumber(nums []int) string {
    arr := make([]string, len(nums))
    for i, num := range nums {
        arr[i] = strconv.Itoa(num)
    }

    var res []string
    for len(arr) > 0 {
        maxi := 0
        for i := 1; i < len(arr); i++ {
            if arr[i]+arr[maxi] > arr[maxi]+arr[i] {
                maxi = i
            }
        }
        res = append(res, arr[maxi])
        arr = append(arr[:maxi], arr[maxi+1:]...)
    }

    result := strings.Join(res, "")
    if result[0] == '0' {
        return "0"
    }
    return result
}
```

```kotlin
class Solution {
    fun largestNumber(nums: IntArray): String {
        val arr = nums.map { it.toString() }.toMutableList()

        val res = mutableListOf<String>()
        while (arr.isNotEmpty()) {
            var maxi = 0
            for (i in 1 until arr.size) {
                if (arr[i] + arr[maxi] > arr[maxi] + arr[i]) {
                    maxi = i
                }
            }
            res.add(arr[maxi])
            arr.removeAt(maxi)
        }

        val result = res.joinToString("")
        return if (result[0] == '0') "0" else result
    }
}
```

```swift
class Solution {
    func largestNumber(_ nums: [Int]) -> String {
        var arr = nums.map { String($0) }

        var res = [String]()
        while !arr.isEmpty {
            var maxi = 0
            for i in 1..<arr.count {
                if arr[i] + arr[maxi] > arr[maxi] + arr[i] {
                    maxi = i
                }
            }
            res.append(arr[maxi])
            arr.remove(at: maxi)
        }

        let result = res.joined()
        return result.first == "0" ? "0" : result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * N)$
- Space complexity: $O(N)$

> Where $n$ is the size of the array $nums$ and $N$ is the total number of digits in the array $nums$.

---

## 2. Sorting

### Intuition

Instead of repeatedly scanning for the best number, we can use sorting with a custom comparator. The comparator determines the order by checking if `a + b > b + a`. By sorting the entire array once using this rule, numbers naturally arrange themselves so that their concatenation yields the largest possible value.

This approach is more efficient because sorting is faster than repeatedly finding and removing the maximum element.

### Algorithm

1. Convert all integers to strings.
2. Sort the strings using a custom comparator: for strings `a` and `b`, place `a` before `b` if `a + b > b + a`.
3. Concatenate all sorted strings.
4. Handle the edge case where the result starts with `"0"` (all zeros) by returning `"0"`.

::tabs-start

```python
class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        for i, num in enumerate(nums):
            nums[i] = str(num)

        def compare(n1, n2):
            if n1 + n2 > n2 + n1:
                return -1
            else:
                return 1
        nums = sorted(nums, key=cmp_to_key(compare))
        return str(int("".join(nums)))
```

```java
public class Solution {
    public String largestNumber(int[] nums) {
        String[] arr = Arrays.stream(nums).mapToObj(String::valueOf).toArray(String[]::new);
        Arrays.sort(arr, (a, b) -> (b + a).compareTo(a + b));
        String res = String.join("", arr);
        return res.charAt(0) == '0' ? "0" : res;
    }
}
```

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> arr;
        for (int num : nums) {
            arr.push_back(to_string(num));
        }

        sort(arr.begin(), arr.end(), [](string& a, string& b) {
            return a + b > b + a;
        });

        string res;
        for (string& num : arr) {
            res += num;
        }

        return res[0] == '0' ? "0" : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {string}
     */
    largestNumber(nums) {
        let arr = nums.map(String);
        arr.sort((a, b) => b + a - (a + b));
        let res = arr.join('');
        return res[0] === '0' ? '0' : res;
    }
}
```

```csharp
public class Solution {
    public string LargestNumber(int[] nums) {
        string[] arr = new string[nums.Length];
        for (int i = 0; i < nums.Length; i++) {
            arr[i] = nums[i].ToString();
        }

        Array.Sort(arr, (a, b) => {
            string order1 = a + b;
            string order2 = b + a;
            return order2.CompareTo(order1);
        });

        string result = string.Join("", arr);
        return result[0] == '0' ? "0" : result;
    }
}
```

```go
func largestNumber(nums []int) string {
    arr := make([]string, len(nums))
    for i, num := range nums {
        arr[i] = strconv.Itoa(num)
    }

    sort.Slice(arr, func(i, j int) bool {
        return arr[i]+arr[j] > arr[j]+arr[i]
    })

    res := strings.Join(arr, "")
    if res[0] == '0' {
        return "0"
    }
    return res
}
```

```kotlin
class Solution {
    fun largestNumber(nums: IntArray): String {
        val arr = nums.map { it.toString() }.sortedWith { a, b ->
            (b + a).compareTo(a + b)
        }

        val res = arr.joinToString("")
        return if (res[0] == '0') "0" else res
    }
}
```

```swift
class Solution {
    func largestNumber(_ nums: [Int]) -> String {
        let arr = nums.map { String($0) }.sorted { a, b in
            a + b > b + a
        }

        let res = arr.joined()
        return res.first == "0" ? "0" : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

> Where $N$ is the total number of digits in the array $nums$.

---

## Common Pitfalls

### Using Numeric Comparison Instead of Concatenation Comparison

Simply sorting numbers by their numeric value does not produce the correct order. For example, `9` should come before `34` because `"934" > "349"`, but `34 > 9` numerically. The correct approach is to compare `a + b` versus `b + a` as strings, where `+` denotes concatenation.

### Forgetting the All-Zeros Edge Case

When the input contains only zeros (e.g., `[0, 0, 0]`), the concatenated result would be `"000"`. The expected output is `"0"`, not `"000"`. Always check if the result starts with `'0'` and return `"0"` in that case, since a valid number representation should not have leading zeros unless the number itself is zero.

### Incorrect Comparator Logic for Sorting

When implementing a custom comparator, the logic must be consistent. For descending order (largest first), return true when `a + b > b + a`. Reversing this condition or using the wrong comparison operator will sort elements in ascending order, producing the smallest number instead of the largest.
