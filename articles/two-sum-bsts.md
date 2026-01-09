## 1. Brute Force

::tabs-start

```python
class Solution:
    def twoSumBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode], target: int) -> bool:
        def dfs(curr_node, node_list):
            if not curr_node:
                return
            node_list.append(curr_node.val)
            dfs(curr_node.left, node_list)
            dfs(curr_node.right, node_list)
        
        node_list1, node_list2 = [], []
        dfs(root1, node_list1)
        dfs(root2, node_list2)
        
        for a in node_list1:
            for b in node_list2:
                if a + b == target:
                    return True
        return False
```

```java
class Solution {
    private void dfs(TreeNode currNode, List<Integer> nodeList) {
        if (currNode == null) {
            return;
        }
        node_list.add(currNode.val);
        dfs(currNode.left, nodeList);
        dfs(currNode.right, nodeList);
    }

    public boolean twoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        List<Integer> nodeList1 = new ArrayList<>();
        List<Integer> nodeList2 = new ArrayList<>();
        dfs(root1, nodeList1);
        dfs(root2, nodeList2);

        for (int a : nodeList1) {
            for (int b : nodeList2) {
                if (a + b == target) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    void dfs(TreeNode* currNode, vector<int>& nodeList) {
        if (currNode == nullptr) {
            return;
        }
        nodeList.push_back(currNode->val);
        dfs(currNode->left, nodeList);
        dfs(currNode->right, nodeList);
    }

    bool twoSumBSTs(TreeNode* root1, TreeNode* root2, int target) {
        vector<int> nodeList1, nodeList2;
        dfs(root1, nodeList1);
        dfs(root2, nodeList2);

        for (int a : nodeList1) {
            for (int b : nodeList2) {
                if (a + b == target) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @param {number} target
     * @return {boolean}
     */
    twoSumBSTs(root1, root2, target) {
        const dfs = (currNode, nodeList) => {
            if (!currNode) {
                return;
            }
            nodeList.push(currNode.val);
            dfs(currNode.left, nodeList);
            dfs(currNode.right, nodeList);
        };

        const nodeList1 = [], nodeList2 = [];
        dfs(root1, nodeList1);
        dfs(root2, nodeList2);

        for (const a of nodeList1) {
            for (const b of nodeList2) {
                if (a + b === target) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    private void Dfs(TreeNode currNode, List<int> nodeList) {
        if (currNode == null) {
            return;
        }
        nodeList.Add(currNode.val);
        Dfs(currNode.left, nodeList);
        Dfs(currNode.right, nodeList);
    }

    public bool TwoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        List<int> nodeList1 = new List<int>();
        List<int> nodeList2 = new List<int>();
        Dfs(root1, nodeList1);
        Dfs(root2, nodeList2);

        foreach (int a in nodeList1) {
            foreach (int b in nodeList2) {
                if (a + b == target) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    var dfs func(currNode *TreeNode, nodeList *[]int)
    dfs = func(currNode *TreeNode, nodeList *[]int) {
        if currNode == nil {
            return
        }
        *nodeList = append(*nodeList, currNode.Val)
        dfs(currNode.Left, nodeList)
        dfs(currNode.Right, nodeList)
    }

    var nodeList1, nodeList2 []int
    dfs(root1, &nodeList1)
    dfs(root2, &nodeList2)

    for _, a := range nodeList1 {
        for _, b := range nodeList2 {
            if a+b == target {
                return true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    private fun dfs(currNode: TreeNode?, nodeList: MutableList<Int>) {
        if (currNode == null) {
            return
        }
        nodeList.add(currNode.`val`)
        dfs(currNode.left, nodeList)
        dfs(currNode.right, nodeList)
    }

    fun twoSumBSTs(root1: TreeNode?, root2: TreeNode?, target: Int): Boolean {
        val nodeList1 = mutableListOf<Int>()
        val nodeList2 = mutableListOf<Int>()
        dfs(root1, nodeList1)
        dfs(root2, nodeList2)

        for (a in nodeList1) {
            for (b in nodeList2) {
                if (a + b == target) {
                    return true
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func twoSumBSTs(_ root1: TreeNode?, _ root2: TreeNode?, _ target: Int) -> Bool {
        func dfs(_ currNode: TreeNode?, _ nodeList: inout [Int]) {
            guard let currNode = currNode else {
                return
            }
            nodeList.append(currNode.val)
            dfs(currNode.left, &nodeList)
            dfs(currNode.right, &nodeList)
        }

        var nodeList1 = [Int](), nodeList2 = [Int]()
        dfs(root1, &nodeList1)
        dfs(root2, &nodeList2)

        for a in nodeList1 {
            for b in nodeList2 {
                if a + b == target {
                    return true
                }
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n)$
- Space complexity: $O(m+n)$

>  Where $m$ and $n$ are the number of nodes in the two trees.

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def twoSumBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode], target: int) -> bool:
        def binarySearch(root2, target2):
            if not root2:
                return False
            if root2.val == target2:
                return True
            elif root2.val > target2:
                return binarySearch(root2.left, target2)
            else:
                return binarySearch(root2.right, target2)

        def dfs(root, target):
            if not root:
                return False
            if binarySearch(root2, target - root.val):
                return True
            return dfs(root.left, target) or dfs(root.right, target)

        return dfs(root1, target)
```

```java
class Solution {
    private boolean binarySearch(TreeNode root2, int target2) {
        if (root2 == null) {
            return false;
        }
        if (root2.val == target2) {
            return true;
        } else if (root2.val > target2) {
            return binarySearch(root2.left, target2);
        } else {
            return binarySearch(root2.right, target2);
        }
    }

    private boolean dfs(TreeNode root1, TreeNode root2, int target) {
        if (root1 == null) {
            return false;
        }
        if (binarySearch(root2, target - root1.val)) {
            return true;
        }
        return dfs(root1.left, root2, target) || dfs(root1.right, root2, target);
    }

    public boolean twoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        return dfs(root1, root2, target);
    }
}
```

```cpp
class Solution {
public:
    bool binarySearch(TreeNode* root2, int target2) {
        if (root2 == nullptr) {
            return false;
        }
        if (root2->val == target2) {
            return true;
        } else if (root2->val > target2) {
            return binarySearch(root2->left, target2);
        } else {
            return binarySearch(root2->right, target2);
        }
    }

    bool dfs(TreeNode* root1, TreeNode* root2, int target) {
        if (root1 == nullptr) {
            return false;
        }
        if (binarySearch(root2, target - root1->val)) {
            return true;
        }
        return dfs(root1->left, root2, target) || dfs(root1->right, root2, target);
    }

    bool twoSumBSTs(TreeNode* root1, TreeNode* root2, int target) {
        return dfs(root1, root2, target);
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @param {number} target
     * @return {boolean}
     */
    twoSumBSTs(root1, root2, target) {
        const binarySearch = (root2, target2) => {
            if (!root2) {
                return false;
            }
            if (root2.val === target2) {
                return true;
            } else if (root2.val > target2) {
                return binarySearch(root2.left, target2);
            } else {
                return binarySearch(root2.right, target2);
            }
        };

        const dfs = (root1, target) => {
            if (!root1) {
                return false;
            }
            if (binarySearch(root2, target - root1.val)) {
                return true;
            }
            return dfs(root1.left, target) || dfs(root1.right, target);
        };

        return dfs(root1, target);
    }
}
```

```csharp
public class Solution {
    private bool BinarySearch(TreeNode root2, int target2) {
        if (root2 == null) {
            return false;
        }
        if (root2.val == target2) {
            return true;
        } else if (root2.val > target2) {
            return BinarySearch(root2.left, target2);
        } else {
            return BinarySearch(root2.right, target2);
        }
    }

    private bool Dfs(TreeNode root1, TreeNode root2, int target) {
        if (root1 == null) {
            return false;
        }
        if (BinarySearch(root2, target - root1.val)) {
            return true;
        }
        return Dfs(root1.left, root2, target) || Dfs(root1.right, root2, target);
    }

    public bool TwoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        return Dfs(root1, root2, target);
    }
}
```

```go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    var binarySearch func(root2 *TreeNode, target2 int) bool
    binarySearch = func(root2 *TreeNode, target2 int) bool {
        if root2 == nil {
            return false
        }
        if root2.Val == target2 {
            return true
        } else if root2.Val > target2 {
            return binarySearch(root2.Left, target2)
        } else {
            return binarySearch(root2.Right, target2)
        }
    }

    var dfs func(root1 *TreeNode, target int) bool
    dfs = func(root1 *TreeNode, target int) bool {
        if root1 == nil {
            return false
        }
        if binarySearch(root2, target-root1.Val) {
            return true
        }
        return dfs(root1.Left, target) || dfs(root1.Right, target)
    }

    return dfs(root1, target)
}
```

```kotlin
class Solution {
    private fun binarySearch(root2: TreeNode?, target2: Int): Boolean {
        if (root2 == null) {
            return false
        }
        return when {
            root2.`val` == target2 -> true
            root2.`val` > target2 -> binarySearch(root2.left, target2)
            else -> binarySearch(root2.right, target2)
        }
    }

    private fun dfs(root1: TreeNode?, root2: TreeNode?, target: Int): Boolean {
        if (root1 == null) {
            return false
        }
        if (binarySearch(root2, target - root1.`val`)) {
            return true
        }
        return dfs(root1.left, root2, target) || dfs(root1.right, root2, target)
    }

    fun twoSumBSTs(root1: TreeNode?, root2: TreeNode?, target: Int): Boolean {
        return dfs(root1, root2, target)
    }
}
```

```swift
class Solution {
    func twoSumBSTs(_ root1: TreeNode?, _ root2: TreeNode?, _ target: Int) -> Bool {
        func binarySearch(_ root2: TreeNode?, _ target2: Int) -> Bool {
            guard let root2 = root2 else {
                return false
            }
            if root2.val == target2 {
                return true
            } else if root2.val > target2 {
                return binarySearch(root2.left, target2)
            } else {
                return binarySearch(root2.right, target2)
            }
        }

        func dfs(_ root1: TreeNode?, _ target: Int) -> Bool {
            guard let root1 = root1 else {
                return false
            }
            if binarySearch(root2, target - root1.val) {
                return true
            }
            return dfs(root1.left, target) || dfs(root1.right, target)
        }

        return dfs(root1, target)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot \log n)$
- Space complexity: $O(\log m + \log n)$

>  Where $m$ and $n$ are the number of nodes in the two trees.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def twoSumBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode], target: int) -> bool:
        def dfs(curr_node, node_set):
            if not curr_node:
                return
            dfs(curr_node.left, node_set)
            node_set.add(curr_node.val)
            dfs(curr_node.right, node_set)
        
        node_set1, node_set2 = set(), set()
        dfs(root1, node_set1)
        dfs(root2, node_set2)
        
        for value1 in node_set1:
            if target - value1 in node_set2:
                return True
        return False
```

```java
class Solution {
    private void dfs(TreeNode currNode, Set<Integer> nodeSet) {
        if (currNode == null) {
            return;
        }
        dfs(currNode.left, nodeSet);
        nodeSet.add(currNode.val);
        dfs(currNode.right, nodeSet);
    }

    public boolean twoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        Set<Integer> nodeSet1 = new HashSet<>();
        Set<Integer> nodeSet2 = new HashSet<>();
        dfs(root1, nodeSet1);
        dfs(root2, nodeSet2);

        for (int value1 : nodeSet1) {
            if (nodeSet2.contains(target - value1)) {
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
    void dfs(TreeNode* currNode, unordered_set<int>& nodeSet) {
        if (currNode == nullptr) {
            return;
        }
        dfs(currNode->left, nodeSet);
        nodeSet.insert(currNode->val);
        dfs(currNode->right, nodeSet);
    }

    bool twoSumBSTs(TreeNode* root1, TreeNode* root2, int target) {
        unordered_set<int> nodeSet1, nodeSet2;
        dfs(root1, nodeSet1);
        dfs(root2, nodeSet2);

        for (int value1 : nodeSet1) {
            if (nodeSet2.count(target - value1)) {
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
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @param {number} target
     * @return {boolean}
     */
    twoSumBSTs(root1, root2, target) {
        const dfs = (currNode, nodeSet) => {
            if (!currNode) {
                return;
            }
            dfs(currNode.left, nodeSet);
            nodeSet.add(currNode.val);
            dfs(currNode.right, nodeSet);
        };

        const nodeSet1 = new Set(), nodeSet2 = new Set();
        dfs(root1, nodeSet1);
        dfs(root2, nodeSet2);

        for (const value1 of nodeSet1) {
            if (nodeSet2.has(target - value1)) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    private void Dfs(TreeNode currNode, HashSet<int> nodeSet) {
        if (currNode == null) {
            return;
        }
        Dfs(currNode.left, nodeSet);
        nodeSet.Add(currNode.val);
        Dfs(currNode.right, nodeSet);
    }

    public bool TwoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        HashSet<int> nodeSet1 = new HashSet<int>();
        HashSet<int> nodeSet2 = new HashSet<int>();
        Dfs(root1, nodeSet1);
        Dfs(root2, nodeSet2);

        foreach (int value1 in nodeSet1) {
            if (nodeSet2.Contains(target - value1)) {
                return true;
            }
        }

        return false;
    }
}
```

```go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    var dfs func(currNode *TreeNode, nodeSet map[int]bool)
    dfs = func(currNode *TreeNode, nodeSet map[int]bool) {
        if currNode == nil {
            return
        }
        dfs(currNode.Left, nodeSet)
        nodeSet[currNode.Val] = true
        dfs(currNode.Right, nodeSet)
    }

    nodeSet1 := make(map[int]bool)
    nodeSet2 := make(map[int]bool)
    dfs(root1, nodeSet1)
    dfs(root2, nodeSet2)

    for value1 := range nodeSet1 {
        if nodeSet2[target-value1] {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    private fun dfs(currNode: TreeNode?, nodeSet: MutableSet<Int>) {
        if (currNode == null) {
            return
        }
        dfs(currNode.left, nodeSet)
        nodeSet.add(currNode.`val`)
        dfs(currNode.right, nodeSet)
    }

    fun twoSumBSTs(root1: TreeNode?, root2: TreeNode?, target: Int): Boolean {
        val nodeSet1 = mutableSetOf<Int>()
        val nodeSet2 = mutableSetOf<Int>()
        dfs(root1, nodeSet1)
        dfs(root2, nodeSet2)

        for (value1 in nodeSet1) {
            if (nodeSet2.contains(target - value1)) {
                return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func twoSumBSTs(_ root1: TreeNode?, _ root2: TreeNode?, _ target: Int) -> Bool {
        func dfs(_ currNode: TreeNode?, _ nodeSet: inout Set<Int>) {
            guard let currNode = currNode else {
                return
            }
            dfs(currNode.left, &nodeSet)
            nodeSet.insert(currNode.val)
            dfs(currNode.right, &nodeSet)
        }

        var nodeSet1 = Set<Int>(), nodeSet2 = Set<Int>()
        dfs(root1, &nodeSet1)
        dfs(root2, &nodeSet2)

        for value1 in nodeSet1 {
            if nodeSet2.contains(target - value1) {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m + n)$

>  Where $m$ and $n$ are the number of nodes in the two trees.

---

## 4. Two Pointers

::tabs-start

```python
class Solution:
    def twoSumBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode], target: int) -> bool:
        def dfs(curr_node, node_list):
            if not curr_node:
                return
            dfs(curr_node.left, node_list)
            node_list.append(curr_node.val)
            dfs(curr_node.right, node_list)
        
        node_list1, node_list2 = [], []
        dfs(root1, node_list1)
        dfs(root2, node_list2)
        
        pointer1 = 0
        pointer2 = len(node_list2) - 1
        while pointer1 < len(node_list1) and pointer2 >= 0:
            if node_list1[pointer1] + node_list2[pointer2] == target:
                return True
            elif node_list1[pointer1] + node_list2[pointer2] < target:
                pointer1 += 1
            else:
                pointer2 -= 1
        return False
```

```java
class Solution {
    private void dfs(TreeNode currNode, List<Integer> nodeList) {
        if (currNode == null) {
            return;
        }
        dfs(currNode.left, nodeList);
        nodeList.add(currNode.val);
        dfs(currNode.right, nodeList);
    }

    public boolean twoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        List<Integer> nodeList1 = new ArrayList<>();
        List<Integer> nodeList2 = new ArrayList<>();
        dfs(root1, nodeList1);
        dfs(root2, nodeList2);

        int pointer1 = 0, pointer2 = nodeList2.size() - 1;
        while (pointer1 < nodeList1.size() && pointer2 >= 0) {
            if (nodeList1.get(pointer1) + nodeList2.get(pointer2) == target) {
                return true;
            } else if (nodeList1.get(pointer1) + nodeList2.get(pointer2) < target) {
                pointer1++;
            } else {
                pointer2--;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    void dfs(TreeNode* currNode, vector<int>& nodeList) {
        if (currNode == nullptr) {
            return;
        }
        dfs(currNode->left, nodeList);
        nodeList.push_back(currNode->val);
        dfs(currNode->right, nodeList);
    }

    bool twoSumBSTs(TreeNode* root1, TreeNode* root2, int target) {
        vector<int> nodeList1, nodeList2;
        dfs(root1, nodeList1);
        dfs(root2, nodeList2);

        int pointer1 = 0, pointer2 = nodeList2.size() - 1;
        while (pointer1 < (int)nodeList1.size() && pointer2 >= 0) {
            if (nodeList1[pointer1] + nodeList2[pointer2] == target) {
                return true;
            } else if (nodeList1[pointer1] + nodeList2[pointer2] < target) {
                pointer1++;
            } else {
                pointer2--;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @param {number} target
     * @return {boolean}
     */
    twoSumBSTs(root1, root2, target) {
        const dfs = (currNode, nodeList) => {
            if (!currNode) {
                return;
            }
            dfs(currNode.left, nodeList);
            nodeList.push(currNode.val);
            dfs(currNode.right, nodeList);
        };

        const nodeList1 = [], nodeList2 = [];
        dfs(root1, nodeList1);
        dfs(root2, nodeList2);

        let pointer1 = 0, pointer2 = nodeList2.length - 1;
        while (pointer1 < nodeList1.length && pointer2 >= 0) {
            if (nodeList1[pointer1] + nodeList2[pointer2] === target) {
                return true;
            } else if (nodeList1[pointer1] + nodeList2[pointer2] < target) {
                pointer1++;
            } else {
                pointer2--;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    private void Dfs(TreeNode currNode, List<int> nodeList) {
        if (currNode == null) {
            return;
        }
        Dfs(currNode.left, nodeList);
        nodeList.Add(currNode.val);
        Dfs(currNode.right, nodeList);
    }

    public bool TwoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        List<int> nodeList1 = new List<int>();
        List<int> nodeList2 = new List<int>();
        Dfs(root1, nodeList1);
        Dfs(root2, nodeList2);

        int pointer1 = 0, pointer2 = nodeList2.Count - 1;
        while (pointer1 < nodeList1.Count && pointer2 >= 0) {
            if (nodeList1[pointer1] + nodeList2[pointer2] == target) {
                return true;
            } else if (nodeList1[pointer1] + nodeList2[pointer2] < target) {
                pointer1++;
            } else {
                pointer2--;
            }
        }

        return false;
    }
}
```

```go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    var dfs func(currNode *TreeNode, nodeList *[]int)
    dfs = func(currNode *TreeNode, nodeList *[]int) {
        if currNode == nil {
            return
        }
        dfs(currNode.Left, nodeList)
        *nodeList = append(*nodeList, currNode.Val)
        dfs(currNode.Right, nodeList)
    }

    var nodeList1, nodeList2 []int
    dfs(root1, &nodeList1)
    dfs(root2, &nodeList2)

    pointer1, pointer2 := 0, len(nodeList2)-1
    for pointer1 < len(nodeList1) && pointer2 >= 0 {
        if nodeList1[pointer1]+nodeList2[pointer2] == target {
            return true
        } else if nodeList1[pointer1]+nodeList2[pointer2] < target {
            pointer1++
        } else {
            pointer2--
        }
    }

    return false
}
```

```kotlin
class Solution {
    private fun dfs(currNode: TreeNode?, nodeList: MutableList<Int>) {
        if (currNode == null) {
            return
        }
        dfs(currNode.left, nodeList)
        nodeList.add(currNode.`val`)
        dfs(currNode.right, nodeList)
    }

    fun twoSumBSTs(root1: TreeNode?, root2: TreeNode?, target: Int): Boolean {
        val nodeList1 = mutableListOf<Int>()
        val nodeList2 = mutableListOf<Int>()
        dfs(root1, nodeList1)
        dfs(root2, nodeList2)

        var pointer1 = 0
        var pointer2 = nodeList2.size - 1
        while (pointer1 < nodeList1.size && pointer2 >= 0) {
            when {
                nodeList1[pointer1] + nodeList2[pointer2] == target -> return true
                nodeList1[pointer1] + nodeList2[pointer2] < target -> pointer1++
                else -> pointer2--
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func twoSumBSTs(_ root1: TreeNode?, _ root2: TreeNode?, _ target: Int) -> Bool {
        func dfs(_ currNode: TreeNode?, _ nodeList: inout [Int]) {
            guard let currNode = currNode else {
                return
            }
            dfs(currNode.left, &nodeList)
            nodeList.append(currNode.val)
            dfs(currNode.right, &nodeList)
        }

        var nodeList1 = [Int](), nodeList2 = [Int]()
        dfs(root1, &nodeList1)
        dfs(root2, &nodeList2)

        var pointer1 = 0, pointer2 = nodeList2.count - 1
        while pointer1 < nodeList1.count && pointer2 >= 0 {
            if nodeList1[pointer1] + nodeList2[pointer2] == target {
                return true
            } else if nodeList1[pointer1] + nodeList2[pointer2] < target {
                pointer1 += 1
            } else {
                pointer2 -= 1
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m + n)$

>  Where $m$ and $n$ are the number of nodes in the two trees.

---

## 5. Morris Traversal

::tabs-start

```python
class Solution:
    def twoSumBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode], target: int) -> bool:
        def morris_traversal(root):
            current = root
            while current:
                if not current.left:
                    yield current.val
                    current = current.right
                else:
                    pre = current.left
                    while pre.right and pre.right != current:
                        pre = pre.right
                    if not pre.right:
                        pre.right = current
                        current = current.left
                    else:
                        pre.right = None
                        yield current.val
                        current = current.right

        def reversed_morris_traversal(root):
            current = root
            while current:
                if not current.right:
                    yield current.val
                    current = current.left
                else:
                    pre = current.right
                    while pre.left and pre.left != current:
                        pre = pre.left
                    if not pre.left:
                        pre.left = current
                        current = current.right
                    else:
                        pre.left = None
                        yield current.val
                        current = current.left
                        
        iterater1 = morris_traversal(root1)
        iterater2 = reversed_morris_traversal(root2)
        value1 = next(iterater1, None)
        value2 = next(iterater2, None)

        while value1 is not None and value2 is not None:
            if value1 + value2 == target:
                return True
            elif value1 + value2 < target:
                value1 = next(iterater1, None)
            else:
                value2 = next(iterater2, None)
        return False
```

```java
class MorrisIterator implements Iterator<Integer> {
    private TreeNode current;
    private TreeNode pre;

    public MorrisIterator(TreeNode root) {
        current = root;
        pre = null;
    }

    public boolean hasNext() {
        return current != null;
    }

    public Integer next() {
        Integer val = null;
        while (current != null) {
            if (current.left == null) {
                val = current.val;
                current = current.right;
                break;
            } else {
                pre = current.left;
                while (pre.right != null && pre.right != current) {
                    pre = pre.right;
                }
                if (pre.right == null) {
                    pre.right = current;
                    current = current.left;
                } else {
                    pre.right = null;
                    val = current.val;
                    current = current.right;
                    break;
                }
            }
        }
        return val;
    }
}

class ReversedMorrisIterator implements Iterator<Integer> {
    private TreeNode current;
    private TreeNode pre;

    public ReversedMorrisIterator(TreeNode root) {
        current = root;
        pre = null;
    }

    public boolean hasNext() {
        return current != null;
    }

    public Integer next() {
        Integer val = null;
        while (current != null) {
            if (current.right == null) {
                val = current.val;
                current = current.left;
                break;
            } else {
                pre = current.right;
                while (pre.left != null && pre.left != current) {
                    pre = pre.left;
                }
                if (pre.left == null) {
                    pre.left = current;
                    current = current.right;
                } else {
                    pre.left = null;
                    val = current.val;
                    current = current.left;
                    break;
                }
            }
        }
        return val;
    }
}

class Solution {
    public boolean twoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        MorrisIterator iterator1 = new MorrisIterator(root1);
        ReversedMorrisIterator iterator2 = new ReversedMorrisIterator(root2);
        
        int value1 = iterator1.next(), value2 = iterator2.next();
        
        while (value1 != Integer.MIN_VALUE && value2 != Integer.MIN_VALUE) {
            if (value1 + value2 == target) {
                return true;
            } else if (value1 + value2 < target) {
                if (iterator1.hasNext()) {
                    value1 = iterator1.next();
                } else {
                    value1 = Integer.MIN_VALUE;
                }
            } else {
                if (iterator2.hasNext()) {
                    value2 = iterator2.next();
                } else {
                    value2 = Integer.MIN_VALUE;
                }
            }
        }
        
        return false;
    }
}
```

```cpp
class MorrisIterator {
private:
    TreeNode* current;
    TreeNode* pre;
    
public:
    MorrisIterator(TreeNode* root) : current(root), pre(nullptr) {}
    
    bool hasNext() {
        return current != nullptr;
    }
    
    int next() {
        int val = INT_MIN;
        while (current != nullptr) {
            if (current->left == nullptr) {
                val = current->val;
                current = current->right;
                break;
            } else {
                pre = current->left;
                while (pre->right != nullptr && pre->right != current) {
                    pre = pre->right;
                }
                if (pre->right == nullptr) {
                    pre->right = current;
                    current = current->left;
                } else {
                    pre->right = nullptr;
                    val = current->val;
                    current = current->right;
                    break;
                }
            }
        }
        return val;
    }
};

class ReversedMorrisIterator {
private:
    TreeNode* current;
    TreeNode* pre;
    
public:
    ReversedMorrisIterator(TreeNode* root) : current(root), pre(nullptr) {}
    
    bool hasNext() {
        return current != nullptr;
    }
    
    int next() {
        int val = INT_MIN;
        while (current != nullptr) {
            if (current->right == nullptr) {
                val = current->val;
                current = current->left;
                break;
            } else {
                pre = current->right;
                while (pre->left != nullptr && pre->left != current) {
                    pre = pre->left;
                }
                if (pre->left == nullptr) {
                    pre->left = current;
                    current = current->right;
                } else {
                    pre->left = nullptr;
                    val = current->val;
                    current = current->left;
                    break;
                }
            }
        }
        return val;
    }
};

class Solution {
public:
    bool twoSumBSTs(TreeNode* root1, TreeNode* root2, int target) {
        MorrisIterator iterator1(root1);
        ReversedMorrisIterator iterator2(root2);
        
        int value1 = iterator1.next();
        int value2 = iterator2.next();
        
        while (value1 != INT_MIN && value2 != INT_MIN) {
            if (value1 + value2 == target) {
                return true;
            } else if (value1 + value2 < target) {
                if (iterator1.hasNext()) {
                    value1 = iterator1.next();
                } else {
                    value1 = INT_MIN;
                }
            } else {
                if (iterator2.hasNext()) {
                    value2 = iterator2.next();
                } else {
                    value2 = INT_MIN;
                }
            }
        }
        
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @param {number} target
     * @return {boolean}
     */
    twoSumBSTs(root1, root2, target) {
        function* morrisTraversal(root) {
            let current = root;
            while (current) {
                if (!current.left) {
                    yield current.val;
                    current = current.right;
                } else {
                    let pre = current.left;
                    while (pre.right && pre.right !== current) {
                        pre = pre.right;
                    }
                    if (!pre.right) {
                        pre.right = current;
                        current = current.left;
                    } else {
                        pre.right = null;
                        yield current.val;
                        current = current.right;
                    }
                }
            }
        }

        function* reversedMorrisTraversal(root) {
            let current = root;
            while (current) {
                if (!current.right) {
                    yield current.val;
                    current = current.left;
                } else {
                    let pre = current.right;
                    while (pre.left && pre.left !== current) {
                        pre = pre.left;
                    }
                    if (!pre.left) {
                        pre.left = current;
                        current = current.right;
                    } else {
                        pre.left = null;
                        yield current.val;
                        current = current.left;
                    }
                }
            }
        }

        const iterator1 = morrisTraversal(root1);
        const iterator2 = reversedMorrisTraversal(root2);

        let result1 = iterator1.next();
        let result2 = iterator2.next();

        let value1 = result1.done ? null : result1.value;
        let value2 = result2.done ? null : result2.value;

        while (value1 !== null && value2 !== null) {
            if (value1 + value2 === target) {
                return true;
            } else if (value1 + value2 < target) {
                result1 = iterator1.next();
                value1 = result1.done ? null : result1.value;
            } else {
                result2 = iterator2.next();
                value2 = result2.done ? null : result2.value;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    private class MorrisIterator {
        private TreeNode current;
        private TreeNode pre;

        public MorrisIterator(TreeNode root) {
            current = root;
            pre = null;
        }

        public bool HasNext() {
            return current != null;
        }

        public int? Next() {
            int? val = null;
            while (current != null) {
                if (current.left == null) {
                    val = current.val;
                    current = current.right;
                    break;
                } else {
                    pre = current.left;
                    while (pre.right != null && pre.right != current) {
                        pre = pre.right;
                    }
                    if (pre.right == null) {
                        pre.right = current;
                        current = current.left;
                    } else {
                        pre.right = null;
                        val = current.val;
                        current = current.right;
                        break;
                    }
                }
            }
            return val;
        }
    }

    private class ReversedMorrisIterator {
        private TreeNode current;
        private TreeNode pre;

        public ReversedMorrisIterator(TreeNode root) {
            current = root;
            pre = null;
        }

        public bool HasNext() {
            return current != null;
        }

        public int? Next() {
            int? val = null;
            while (current != null) {
                if (current.right == null) {
                    val = current.val;
                    current = current.left;
                    break;
                } else {
                    pre = current.right;
                    while (pre.left != null && pre.left != current) {
                        pre = pre.left;
                    }
                    if (pre.left == null) {
                        pre.left = current;
                        current = current.right;
                    } else {
                        pre.left = null;
                        val = current.val;
                        current = current.left;
                        break;
                    }
                }
            }
            return val;
        }
    }

    public bool TwoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        var iterator1 = new MorrisIterator(root1);
        var iterator2 = new ReversedMorrisIterator(root2);

        int? value1 = iterator1.Next();
        int? value2 = iterator2.Next();

        while (value1 != null && value2 != null) {
            if (value1 + value2 == target) {
                return true;
            } else if (value1 + value2 < target) {
                value1 = iterator1.HasNext() ? iterator1.Next() : null;
            } else {
                value2 = iterator2.HasNext() ? iterator2.Next() : null;
            }
        }

        return false;
    }
}
```

```go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    morrisChan := func(root *TreeNode) <-chan int {
        ch := make(chan int)
        go func() {
            defer close(ch)
            current := root
            for current != nil {
                if current.Left == nil {
                    ch <- current.Val
                    current = current.Right
                } else {
                    pre := current.Left
                    for pre.Right != nil && pre.Right != current {
                        pre = pre.Right
                    }
                    if pre.Right == nil {
                        pre.Right = current
                        current = current.Left
                    } else {
                        pre.Right = nil
                        ch <- current.Val
                        current = current.Right
                    }
                }
            }
        }()
        return ch
    }

    reversedMorrisChan := func(root *TreeNode) <-chan int {
        ch := make(chan int)
        go func() {
            defer close(ch)
            current := root
            for current != nil {
                if current.Right == nil {
                    ch <- current.Val
                    current = current.Left
                } else {
                    pre := current.Right
                    for pre.Left != nil && pre.Left != current {
                        pre = pre.Left
                    }
                    if pre.Left == nil {
                        pre.Left = current
                        current = current.Right
                    } else {
                        pre.Left = nil
                        ch <- current.Val
                        current = current.Left
                    }
                }
            }
        }()
        return ch
    }

    ch1 := morrisChan(root1)
    ch2 := reversedMorrisChan(root2)

    value1, ok1 := <-ch1
    value2, ok2 := <-ch2

    for ok1 && ok2 {
        if value1+value2 == target {
            return true
        } else if value1+value2 < target {
            value1, ok1 = <-ch1
        } else {
            value2, ok2 = <-ch2
        }
    }

    return false
}
```

```kotlin
class Solution {
    private class MorrisIterator(root: TreeNode?) : Iterator<Int> {
        private var current: TreeNode? = root
        private var pre: TreeNode? = null
        private var nextVal: Int? = null

        init {
            advance()
        }

        private fun advance() {
            nextVal = null
            while (current != null) {
                if (current!!.left == null) {
                    nextVal = current!!.`val`
                    current = current!!.right
                    break
                } else {
                    pre = current!!.left
                    while (pre!!.right != null && pre!!.right != current) {
                        pre = pre!!.right
                    }
                    if (pre!!.right == null) {
                        pre!!.right = current
                        current = current!!.left
                    } else {
                        pre!!.right = null
                        nextVal = current!!.`val`
                        current = current!!.right
                        break
                    }
                }
            }
        }

        override fun hasNext(): Boolean = nextVal != null

        override fun next(): Int {
            val result = nextVal!!
            advance()
            return result
        }
    }

    private class ReversedMorrisIterator(root: TreeNode?) : Iterator<Int> {
        private var current: TreeNode? = root
        private var pre: TreeNode? = null
        private var nextVal: Int? = null

        init {
            advance()
        }

        private fun advance() {
            nextVal = null
            while (current != null) {
                if (current!!.right == null) {
                    nextVal = current!!.`val`
                    current = current!!.left
                    break
                } else {
                    pre = current!!.right
                    while (pre!!.left != null && pre!!.left != current) {
                        pre = pre!!.left
                    }
                    if (pre!!.left == null) {
                        pre!!.left = current
                        current = current!!.right
                    } else {
                        pre!!.left = null
                        nextVal = current!!.`val`
                        current = current!!.left
                        break
                    }
                }
            }
        }

        override fun hasNext(): Boolean = nextVal != null

        override fun next(): Int {
            val result = nextVal!!
            advance()
            return result
        }
    }

    fun twoSumBSTs(root1: TreeNode?, root2: TreeNode?, target: Int): Boolean {
        val iterator1 = MorrisIterator(root1)
        val iterator2 = ReversedMorrisIterator(root2)

        var value1: Int? = if (iterator1.hasNext()) iterator1.next() else null
        var value2: Int? = if (iterator2.hasNext()) iterator2.next() else null

        while (value1 != null && value2 != null) {
            when {
                value1 + value2 == target -> return true
                value1 + value2 < target -> value1 = if (iterator1.hasNext()) iterator1.next() else null
                else -> value2 = if (iterator2.hasNext()) iterator2.next() else null
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func twoSumBSTs(_ root1: TreeNode?, _ root2: TreeNode?, _ target: Int) -> Bool {
        class MorrisIterator: IteratorProtocol {
            private var current: TreeNode?
            private var pre: TreeNode?

            init(_ root: TreeNode?) {
                current = root
                pre = nil
            }

            func next() -> Int? {
                var val: Int? = nil
                while current != nil {
                    if current!.left == nil {
                        val = current!.val
                        current = current!.right
                        break
                    } else {
                        pre = current!.left
                        while pre!.right != nil && pre!.right !== current {
                            pre = pre!.right
                        }
                        if pre!.right == nil {
                            pre!.right = current
                            current = current!.left
                        } else {
                            pre!.right = nil
                            val = current!.val
                            current = current!.right
                            break
                        }
                    }
                }
                return val
            }
        }

        class ReversedMorrisIterator: IteratorProtocol {
            private var current: TreeNode?
            private var pre: TreeNode?

            init(_ root: TreeNode?) {
                current = root
                pre = nil
            }

            func next() -> Int? {
                var val: Int? = nil
                while current != nil {
                    if current!.right == nil {
                        val = current!.val
                        current = current!.left
                        break
                    } else {
                        pre = current!.right
                        while pre!.left != nil && pre!.left !== current {
                            pre = pre!.left
                        }
                        if pre!.left == nil {
                            pre!.left = current
                            current = current!.right
                        } else {
                            pre!.left = nil
                            val = current!.val
                            current = current!.left
                            break
                        }
                    }
                }
                return val
            }
        }

        var iterator1 = MorrisIterator(root1)
        var iterator2 = ReversedMorrisIterator(root2)

        var value1 = iterator1.next()
        var value2 = iterator2.next()

        while value1 != nil && value2 != nil {
            let sum = value1! + value2!
            if sum == target {
                return true
            } else if sum < target {
                value1 = iterator1.next()
            } else {
                value2 = iterator2.next()
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$

>  Where $m$ and $n$ are the number of nodes in the two trees.
