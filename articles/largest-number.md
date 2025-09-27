## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * N)$
- Space complexity: $O(N)$

> Where $n$ is the size of the array $nums$ and $N$ is the total number of digits in the array $nums$.

---

## 2. Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

> Where $N$ is the total number of digits in the array $nums$.
