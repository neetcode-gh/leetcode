## 1. Quick Sort

::tabs-start

```python
class Solution:
    def partition(self, nums: List[int], left: int, right: int) -> int:
        mid = (left + right) >> 1
        nums[mid], nums[left + 1] = nums[left + 1], nums[mid]

        if nums[left] > nums[right]:
            nums[left], nums[right] = nums[right], nums[left]
        if nums[left + 1] > nums[right]:
            nums[left + 1], nums[right] = nums[right], nums[left + 1]
        if nums[left] > nums[left + 1]:
            nums[left], nums[left + 1] = nums[left + 1], nums[left]

        pivot = nums[left + 1]
        i = left + 1
        j = right

        while True:
            while True:
                i += 1
                if not nums[i] < pivot:
                    break
            while True:
                j -= 1
                if not nums[j] > pivot:
                    break
            if i > j:
                break
            nums[i], nums[j] = nums[j], nums[i]

        nums[left + 1], nums[j] = nums[j], nums[left + 1]
        return j

    def quickSort(self, nums: List[int], left: int, right: int) -> None:
        if right <= left + 1:
            if right == left + 1 and nums[right] < nums[left]:
                nums[left], nums[right] = nums[right], nums[left]
            return

        j = self.partition(nums, left, right)
        self.quickSort(nums, left, j - 1)
        self.quickSort(nums, j + 1, right)

    def sortArray(self, nums: List[int]) -> List[int]:
        self.quickSort(nums, 0, len(nums) - 1)
        return nums
```

```java
public class Solution {
    private int partition(int[] nums, int left, int right) {
        int mid = (left + right) >> 1;
        swap(nums, mid, left + 1);

        if (nums[left] > nums[right])
            swap(nums, left, right);
        if (nums[left + 1] > nums[right])
            swap(nums, left + 1, right);
        if (nums[left] > nums[left + 1])
            swap(nums, left, left + 1);

        int pivot = nums[left + 1];
        int i = left + 1;
        int j = right;

        while (true) {
            while (nums[++i] < pivot);
            while (nums[--j] > pivot);
            if (i > j) break;
            swap(nums, i, j);
        }

        nums[left + 1] = nums[j];
        nums[j] = pivot;
        return j;
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    private void quickSort(int[] nums, int left, int right) {
        if (right <= left + 1) {
            if (right == left + 1 && nums[right] < nums[left])
                swap(nums, left, right);
            return;
        }

        int j = partition(nums, left, right);
        quickSort(nums, left, j - 1);
        quickSort(nums, j + 1, right);
    }

    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }
}
```

```cpp
class Solution {
public:
int partition(vector<int>& nums, int left, int right) {
        int mid = (left + right) >> 1;
        swap(nums[mid], nums[left + 1]);

        if (nums[left] > nums[right])
            swap(nums[left], nums[right]);
        if (nums[left + 1] > nums[right])
            swap(nums[left + 1], nums[right]);
        if (nums[left] > nums[left + 1])
            swap(nums[left], nums[left + 1]);

        int pivot = nums[left + 1];
        int i = left + 1;
        int j = right;

        while (true) {
            while (nums[++i] < pivot);
            while (nums[--j] > pivot);
            if (i > j) break;
            swap(nums[i], nums[j]);
        }

        nums[left + 1] = nums[j];
        nums[j] = pivot;
        return j;
    }

    void quickSort(vector<int>& nums, int left, int right) {
        if (right <= left + 1) {
            if (right == left + 1 && nums[right] < nums[left])
                swap(nums[left], nums[right]);
            return;
        }

        int j = partition(nums, left, right);
        quickSort(nums, left, j - 1);
        quickSort(nums, j + 1, right);
    }

    vector<int> sortArray(vector<int>& nums) {
        quickSort(nums, 0, nums.size() - 1);
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArray(nums) {
        function partition(left, right) {
            const mid = (left + right) >> 1;
            [nums[mid], nums[left + 1]] = [nums[left + 1], nums[mid]];

            if (nums[left] > nums[right])
                [nums[left], nums[right]] = [nums[right], nums[left]];
            if (nums[left + 1] > nums[right])
                [nums[left + 1], nums[right]] = [nums[right], nums[left + 1]];
            if (nums[left] > nums[left + 1])
                [nums[left], nums[left + 1]] = [nums[left + 1], nums[left]];

            const pivot = nums[left + 1];
            let i = left + 1;
            let j = right;

            while (true) {
                while (nums[++i] < pivot);
                while (nums[--j] > pivot);
                if (i > j) break;
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }

            nums[left + 1] = nums[j];
            nums[j] = pivot;
            return j;
        }

        function quickSort(left, right) {
            if (right <= left + 1) {
                if (right == left + 1 && nums[right] < nums[left])
                    [nums[left], nums[right]] = [nums[right], nums[left]];
                return;
            }

            const j = partition(left, right);
            quickSort(left, j - 1);
            quickSort(j + 1, right);
        }

        quickSort(0, nums.length - 1);
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArray(int[] nums) {
        QuickSort(nums, 0, nums.Length - 1);
        return nums;
    }

    private void QuickSort(int[] nums, int left, int right) {
        if (right <= left + 1) {
            if (right == left + 1 && nums[right] < nums[left]) {
                Swap(nums, left, right);
            }
            return;
        }

        int j = Partition(nums, left, right);
        QuickSort(nums, left, j - 1);
        QuickSort(nums, j + 1, right);
    }

    private int Partition(int[] nums, int left, int right) {
        int mid = (left + right) >> 1;
        Swap(nums, mid, left + 1);

        if (nums[left] > nums[right]) Swap(nums, left, right);
        if (nums[left + 1] > nums[right]) Swap(nums, left + 1, right);
        if (nums[left] > nums[left + 1]) Swap(nums, left, left + 1);

        int pivot = nums[left + 1];
        int i = left + 1, j = right;

        while (true) {
            while (++i <= right && nums[i] < pivot) ;
            while (--j >= left && nums[j] > pivot) ;

            if (i > j) break;

            Swap(nums, i, j);
        }

        Swap(nums, left + 1, j);
        return j;
    }

    private void Swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$ in average case, $O(n ^ 2)$ in worst case.
- Space complexity: $O(\log n)$ for recursive stack.

---

## 2. Merge Sort

::tabs-start

```python
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def merge(arr, L, M, R):
            left, right = arr[L : M + 1], arr[M + 1 : R + 1]
            i, j, k = L, 0, 0

            while j < len(left) and k < len(right):
                if left[j] <= right[k]:
                    arr[i] = left[j]
                    j += 1
                else:
                    arr[i] = right[k]
                    k += 1
                i += 1
            while j < len(left):
                nums[i] = left[j]
                j += 1
                i += 1
            while k < len(right):
                nums[i] = right[k]
                k += 1
                i += 1

        def mergeSort(arr, l, r):
            if l == r:
                return

            m = (l + r) // 2
            mergeSort(arr, l, m)
            mergeSort(arr, m + 1, r)
            merge(arr, l, m, r)
            return

        mergeSort(nums, 0, len(nums))
        return nums
```

```java
public class Solution {
    public int[] sortArray(int[] nums) {
        mergeSort(nums, 0, nums.length - 1);
        return nums;
    }

    private void mergeSort(int[] arr, int l, int r) {
        if (l >= r) return;
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }

    private void merge(int[] arr, int l, int m, int r) {
        ArrayList<Integer> temp = new ArrayList<>();
        int i = l;
        int j = m + 1;

        while (i <= m && j <= r) {
            if (arr[i] <= arr[j]) {
                temp.add(arr[i]);
                i++;
            } else {
                temp.add(arr[j]);
                j++;
            }
        }


        while (i <= m) {
            temp.add(arr[i]);
            i++;
        }

        while (j <= r) {
            temp.add(arr[j]);
            j++;
        }

        for (i = l; i <= r; i++) {
            arr[i] = temp.get(i - l);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        mergeSort(nums, 0, nums.size() - 1);
        return nums;
    }

private:
    void mergeSort(vector<int>& arr, int l, int r) {
        if (l >= r) return;
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }

    void merge(vector<int>& arr, int l, int m, int r) {
        vector<int> temp;
        int i = l, j = m + 1;

        while (i <= m && j <= r) {
            if (arr[i] <= arr[j]) {
                temp.push_back(arr[i++]);
            } else {
                temp.push_back(arr[j++]);
            }
        }

        while (i <= m) temp.push_back(arr[i++]);
        while (j <= r) temp.push_back(arr[j++]);

        for (int i = l; i <= r; i++) {
            arr[i] = temp[i - l];
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArray(nums) {
        this.mergeSort(nums, 0, nums.length - 1);
        return nums;
    }

    /**
     * @param {number[]} arr
     * @param {number} l
     * @param {number} r
     * @return {void}
     */
    mergeSort(arr, l, r) {
        if (l >= r) return;
        let m = Math.floor((l + r) / 2);
        this.mergeSort(arr, l, m);
        this.mergeSort(arr, m + 1, r);
        this.merge(arr, l, m, r);
    }

    /**
     * @param {number[]} arr
     * @param {number} l
     * @param {number} m
     * @param {number} r
     * @return {void}
     */
    merge(arr, l, m, r) {
        let temp = [];
        let i = l,
            j = m + 1;

        while (i <= m && j <= r) {
            if (arr[i] <= arr[j]) {
                temp.push(arr[i++]);
            } else {
                temp.push(arr[j++]);
            }
        }

        while (i <= m) temp.push(arr[i++]);
        while (j <= r) temp.push(arr[j++]);

        for (let i = l; i <= r; i++) {
            arr[i] = temp[i - l];
        }
    }
}
```

```csharp
public class Solution {
    public int[] SortArray(int[] nums) {
        MergeSort(nums, 0, nums.Length - 1);
        return nums;
    }

    private void MergeSort(int[] arr, int l, int r) {
        if (l == r) return;

        int m = (l + r) / 2;
        MergeSort(arr, l, m);
        MergeSort(arr, m + 1, r);
        Merge(arr, l, m, r);
    }

    private void Merge(int[] arr, int L, int M, int R) {
        int[] left = arr[L..(M + 1)];
        int[] right = arr[(M + 1)..(R + 1)];

        int i = L, j = 0, k = 0;

        while (j < left.Length && k < right.Length) {
            if (left[j] <= right[k]) {
                arr[i++] = left[j++];
            } else {
                arr[i++] = right[k++];
            }
        }

        while (j < left.Length) {
            arr[i++] = left[j++];
        }

        while (k < right.Length) {
            arr[i++] = right[k++];
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Heap Sort

::tabs-start

```python
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        self.heapSort(nums)
        return nums

    def heapify(self, arr, n, i):
        l = (i << 1) + 1
        r = (i << 1) + 2
        largestNode = i

        if l < n and arr[l] > arr[largestNode]:
            largestNode = l

        if r < n and arr[r] > arr[largestNode]:
            largestNode = r

        if largestNode != i:
            arr[i], arr[largestNode] = arr[largestNode], arr[i]
            self.heapify(arr, n, largestNode)

    def heapSort(self, arr):
        n = len(arr)
        for i in range(n // 2 - 1, -1, -1):
            self.heapify(arr, n, i)

        for i in range(n - 1, 0, -1):
            arr[0], arr[i] = arr[i], arr[0]
            self.heapify(arr, i, 0)
```

```java
public class Solution {
    public int[] sortArray(int[] nums) {
        heapSort(nums);
        return nums;
    }

    private void heapify(int[] arr, int n, int i) {
        int l = (i << 1) + 1;
        int r = (i << 1) + 2;
        int largestNode = i;

        if (l < n && arr[l] > arr[largestNode]) {
            largestNode = l;
        }

        if (r < n && arr[r] > arr[largestNode]) {
            largestNode = r;
        }

        if (largestNode != i) {
            int temp = arr[i];
            arr[i] = arr[largestNode];
            arr[largestNode] = temp;
            heapify(arr, n, largestNode);
        }
    }

    private void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        heapSort(nums);
        return nums;
    }
private:
    void heapify(vector<int>& arr, int n, int i) {
        int l = (i << 1) + 1;
        int r = (i << 1) + 2;
        int largestNode = i;

        if (l < n && arr[l] > arr[largestNode]) {
            largestNode = l;
        }

        if (r < n && arr[r] > arr[largestNode]) {
            largestNode = r;
        }

        if (largestNode != i) {
            swap(arr[i], arr[largestNode]);
            heapify(arr, n, largestNode);
        }
    }

    void heapSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        for (int i = n - 1; i > 0; i--) {
            swap(arr[0], arr[i]);
            heapify(arr, i, 0);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArray(nums) {
        this.heapSort(nums);
        return nums;
    }

    /**
     * @param {number[]} arr
     * @param {number} n
     * @param {number} i
     * @return {void}
     */
    heapify(arr, n, i) {
        let l = (i << 1) + 1;
        let r = (i << 1) + 2;
        let largestNode = i;

        if (l < n && arr[l] > arr[largestNode]) {
            largestNode = l;
        }

        if (r < n && arr[r] > arr[largestNode]) {
            largestNode = r;
        }

        if (largestNode !== i) {
            [arr[i], arr[largestNode]] = [arr[largestNode], arr[i]];
            this.heapify(arr, n, largestNode);
        }
    }

    /**
     * @param {number[]} arr
     * @return {void}
     */
    heapSort(arr) {
        let n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            this.heapify(arr, i, 0);
        }
    }
}
```

```csharp
public class Solution {
    public int[] SortArray(int[] nums) {
        HeapSort(nums);
        return nums;
    }

    private void Heapify(int[] arr, int n, int i) {
        int l = (i << 1) + 1;
        int r = (i << 1) + 2;
        int largestNode = i;

        if (l < n && arr[l] > arr[largestNode]) {
            largestNode = l;
        }

        if (r < n && arr[r] > arr[largestNode]) {
            largestNode = r;
        }

        if (largestNode != i) {
            Swap(arr, i, largestNode);
            Heapify(arr, n, largestNode);
        }
    }

    private void HeapSort(int[] arr) {
        int n = arr.Length;

        for (int i = n / 2 - 1; i >= 0; i--) {
            Heapify(arr, n, i);
        }

        for (int i = n - 1; i > 0; i--) {
            Swap(arr, 0, i);
            Heapify(arr, i, 0);
        }
    }

    private void Swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(\log n)$ for recursive stack.

---

## 4. Counting Sort

::tabs-start

```python
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def counting_sort():
            count = defaultdict(int)
            minVal, maxVal = min(nums), max(nums)
            for val in nums:
                count[val] += 1

            index = 0
            for val in range(minVal, maxVal + 1):
                while count[val] > 0:
                    nums[index] = val
                    index += 1
                    count[val] -= 1

        counting_sort()
        return nums
```

```java
public class Solution {
    private void countingSort(int[] arr) {
        HashMap<Integer,Integer> count = new HashMap<>();
        int minVal = arr[0], maxVal = arr[0];

        for (int i = 0; i < arr.length; i++) {
            minVal = Math.min(minVal, arr[i]);
            maxVal = Math.max(maxVal, arr[i]);
            count.put(arr[i], count.getOrDefault(arr[i], 0) + 1);
        }

        int index = 0;
        for (int val = minVal; val <= maxVal; ++val) {
            while (count.getOrDefault(val, 0) > 0) {
                arr[index] = val;
                index += 1;
                count.put(val, count.get(val) - 1);
            }
        }
    }

    public int[] sortArray(int[] nums) {
        countingSort(nums);
        return nums;
    }
}
```

```cpp
class Solution {
private:
    void countingSort(vector<int> &arr) {
        unordered_map<int, int> count;
        int minVal = *min_element(arr.begin(), arr.end());
        int maxVal = *max_element(arr.begin(), arr.end());

        for (auto& val : arr) {
            count[val]++;
        }

        int index = 0;
        for (int val = minVal; val <= maxVal; ++val) {
            while (count[val] > 0) {
                arr[index] = val;
                index += 1;
                count[val] -= 1;
            }
        }
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        countingSort(nums);
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArray(nums) {
        this.countingSort(nums);
        return nums;
    }

    /**
     * @param {number[]} arr
     * @return {void}
     */
    countingSort(arr) {
        let count = new Map();
        let minVal = Math.min(...nums);
        let maxVal = Math.max(...nums);

        nums.forEach((val) => {
            if (!count.has(val)) {
                count.set(val, 0);
            }
            count.set(val, count.get(val) + 1);
        });

        let index = 0;
        for (let val = minVal; val <= maxVal; val += 1) {
            while (count.get(val) > 0) {
                nums[index] = val;
                index += 1;
                count.set(val, count.get(val) - 1);
            }
        }
    }
}
```

```csharp
public class Solution {
    public int[] SortArray(int[] nums) {
        CountingSort(nums);
        return nums;
    }

    private void CountingSort(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int minVal = int.MaxValue, maxVal = int.MinValue;

        foreach (int val in nums) {
            if (!count.ContainsKey(val)) {
                count[val] = 0;
            }
            count[val]++;
            minVal = Math.Min(minVal, val);
            maxVal = Math.Max(maxVal, val);
        }

        int index = 0;
        for (int val = minVal; val <= maxVal; val++) {
            if (!count.ContainsKey(val)) continue;
            while (count[val]-- > 0) {
                nums[index++] = val;
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + k)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the range between the minimum and maximum values in the array.

---

## 5. Radix Sort

::tabs-start

```python
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def countSort(arr, n, d):
            count = [0] * 10
            for num in arr:
                count[(num // d) % 10] += 1
            for i in range(1, 10):
                count[i] += count[i - 1]

            res = [0] * n
            for i in range(n - 1, -1, -1):
                idx = (arr[i] // d) % 10
                res[count[idx] - 1] = arr[i]
                count[idx] -= 1

            for i in range(n):
                arr[i] = res[i]

        def radixSort(arr):
            n = len(arr)
            max_element = max(arr)
            d = 1
            while max_element // d > 0:
                countSort(arr, n, d)
                d *= 10

        negatives = [-num for num in nums if num < 0]
        positives = [num for num in nums if num >= 0]

        if negatives:
            radixSort(negatives)
            negatives = [-num for num in reversed(negatives)]

        if positives:
            radixSort(positives)

        return negatives + positives
```

```java
public class Solution {
    public int[] sortArray(int[] nums) {
        ArrayList<Integer> negatives = new ArrayList<>();
        ArrayList<Integer> positives = new ArrayList<>();

        for (int num : nums) {
            if (num < 0) {
                negatives.add(-num);
            } else {
                positives.add(num);
            }
        }

        if (!negatives.isEmpty()) {
            radixSort(negatives);
            Collections.reverse(negatives);
            for (int i = 0; i < negatives.size(); i++) {
                negatives.set(i, -negatives.get(i));
            }
        }

        if (!positives.isEmpty()) {
            radixSort(positives);
        }

        int index = 0;
        for (int num : negatives) {
            nums[index++] = num;
        }
        for (int num : positives) {
            nums[index++] = num;
        }
        return nums;
    }

    private void countSort(ArrayList<Integer> arr, int n, int d) {
        int[] count = new int[10];
        for (int num : arr) {
            count[(num / d) % 10]++;
        }
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        ArrayList<Integer> res = new ArrayList<>(Collections.nCopies(n, 0));
        for (int i = n - 1; i >= 0; i--) {
            int idx = (arr.get(i) / d) % 10;
            res.set(count[idx] - 1, arr.get(i));
            count[idx]--;
        }

        for (int i = 0; i < n; i++) {
            arr.set(i, res.get(i));
        }
    }

    private void radixSort(ArrayList<Integer> arr) {
        int n = arr.size();
        int maxElement = Collections.max(arr);
        int d = 1;

        while (maxElement / d > 0) {
            countSort(arr, n, d);
            d *= 10;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        vector<int> negatives, positives;

        for (int num : nums) {
            if (num < 0) {
                negatives.push_back(-num);
            } else {
                positives.push_back(num);
            }
        }

        if (!negatives.empty()) {
            radixSort(negatives);
            reverse(negatives.begin(), negatives.end());
            for (int& num : negatives) {
                num = -num;
            }
        }

        if (!positives.empty()) {
            radixSort(positives);
        }

        int index = 0;
        for (int& num : negatives) {
            nums[index++] = num;
        }
        for (int& num : positives) {
            nums[index++] = num;
        }
        return nums;
    }

private:
    void countSort(vector<int>& arr, int n, int d) {
        vector<int> count(10, 0);
        for (int num : arr) {
            count[(num / d) % 10]++;
        }
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        vector<int> res(n);
        for (int i = n - 1; i >= 0; i--) {
            int idx = (arr[i] / d) % 10;
            res[count[idx] - 1] = arr[i];
            count[idx]--;
        }

        for (int i = 0; i < n; i++) {
            arr[i] = res[i];
        }
    }

    void radixSort(vector<int>& arr) {
        int n = arr.size();
        int maxElement = *max_element(arr.begin(), arr.end());
        int d = 1;

        while (maxElement / d > 0) {
            countSort(arr, n, d);
            d *= 10;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArray(nums) {
        const negatives = nums.filter((num) => num < 0).map((num) => -num);
        const positives = nums.filter((num) => num >= 0);

        if (negatives.length > 0) {
            this.radixSort(negatives);
            negatives.reverse();
            for (let i = 0; i < negatives.length; i++) {
                negatives[i] = -negatives[i];
            }
        }

        if (positives.length > 0) {
            this.radixSort(positives);
        }

        return [...negatives, ...positives];
    }

    /**
     * @param {number[]} arr
     * @return {void}
     */
    radixSort(arr) {
        const maxElement = Math.max(...arr);
        let d = 1;

        while (Math.floor(maxElement / d) > 0) {
            this.countSort(arr, d);
            d *= 10;
        }
    }

    /**
     * @param {number[]} arr
     * @param {number} d
     * @return {void}
     */
    countSort(arr, d) {
        const count = Array(10).fill(0);
        for (const num of arr) {
            count[Math.floor(num / d) % 10]++;
        }
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        const res = Array(arr.length);
        for (let i = arr.length - 1; i >= 0; i--) {
            const idx = Math.floor(arr[i] / d) % 10;
            res[count[idx] - 1] = arr[i];
            count[idx]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = res[i];
        }
    }
}
```

```csharp
public class Solution {
    public int[] SortArray(int[] nums) {
        List<int> negatives = new List<int>();
        List<int> positives = new List<int>();

        foreach (int num in nums) {
            if (num < 0) negatives.Add(-num);
            else positives.Add(num);
        }

        if (negatives.Count > 0) {
            RadixSort(negatives);
            negatives.Reverse();
            for (int i = 0; i < negatives.Count; i++) {
                negatives[i] = -negatives[i];
            }
        }

        if (positives.Count > 0) {
            RadixSort(positives);
        }

        List<int> result = new List<int>();
        result.AddRange(negatives);
        result.AddRange(positives);

        return result.ToArray();
    }

    private void RadixSort(List<int> arr) {
        int n = arr.Count;
        int maxElement = 0;
        foreach (int num in arr) {
            if (num > maxElement) maxElement = num;
        }

        int d = 1;
        while (maxElement / d > 0) {
            CountSort(arr, n, d);
            d *= 10;
        }
    }

    private void CountSort(List<int> arr, int n, int d) {
        int[] count = new int[10];
        for (int i = 0; i < n; i++) {
            int digit = (arr[i] / d) % 10;
            count[digit]++;
        }

        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        int[] res = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / d) % 10;
            res[--count[digit]] = arr[i];
        }

        for (int i = 0; i < n; i++) {
            arr[i] = res[i];
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(d * n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $d$ is the number of digits in the maximum element of the array.

---

## 6. Shell Sort

::tabs-start

```python
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def shell_sort(nums, n):
            gap = n // 2
            while gap >= 1:
                for i in range(gap, n):
                    tmp = nums[i]
                    j = i - gap
                    while j >= 0 and nums[j] > tmp:
                        nums[j + gap] = nums[j]
                        j -= gap
                    nums[j + gap] = tmp
                gap //= 2

        n = len(nums)
        if n == 1:
            return nums
        shell_sort(nums, n)
        return nums
```

```java
public class Solution {
    private void shellSort(int[] nums, int n) {
        int gap = n / 2;
        while (gap >= 1) {
            for (int i = gap; i < n; i++) {
                int tmp = nums[i];
                int j = i - gap;
                while (j >= 0 && nums[j] > tmp) {
                    nums[j + gap] = nums[j];
                    j -= gap;
                }
                nums[j + gap] = tmp;
            }
            gap /= 2;
        }
    }

    public int[] sortArray(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums;

        shellSort(nums, n);
        return nums;
    }
}
```

```cpp
class Solution {
private:
    void shellSort(vector<int>& nums, int n) {
        for (int gap = n / 2; gap >= 1; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int tmp = nums[i];
                int j = i - gap;
                while (j >= 0 && nums[j] > tmp) {
                    nums[j + gap] = nums[j];
                    j -= gap;
                }
                nums[j + gap] = tmp;
            }
        }
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        if (nums.size() == 1) return nums;
        shellSort(nums, nums.size());
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortArray(nums) {
        const n = nums.length;
        if (n === 1) return nums;

        const shellSort = () => {
            let gap = Math.floor(n / 2);
            while (gap >= 1) {
                for (let i = gap; i < n; i++) {
                    let key = nums[i];
                    let j = i - gap;
                    while (j >= 0 && nums[j] > key) {
                        nums[j + gap] = nums[j];
                        j -= gap;
                    }
                    nums[j + gap] = key;
                }
                gap = Math.floor(gap / 2);
            }
        };

        shellSort();
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArray(int[] nums) {
        int n = nums.Length;
        if (n == 1) return nums;

        ShellSort(nums, n);
        return nums;
    }

    private void ShellSort(int[] nums, int n) {
        int gap = n / 2;
        while (gap >= 1) {
            for (int i = gap; i < n; i++) {
                int tmp = nums[i];
                int j = i - gap;
                while (j >= 0 && nums[j] > tmp) {
                    nums[j + gap] = nums[j];
                    j -= gap;
                }
                nums[j + gap] = tmp;
            }
            gap /= 2;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$ in average case, $O(n ^ 2)$ in worst case.
- Space complexity: $O(1)$
