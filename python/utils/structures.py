import heapq
from typing import Optional

from deprecated import deprecated


class SLLNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def link_next(self, next):
        self.next = next
        return self

    def __str__(self):
        return f'{self.val} -> {self.next or "$NULL"}'


class TreeNode:
    def __init__(self, x, print_dfs=True, is_root=True, is_leaf=True):
        self.val = x
        self.left = None
        self.right = None
        self.is_root = is_root
        self.is_leaf = is_leaf

        self.print_dfs = print_dfs
        self.print_bfs = not print_dfs

    def link_left(self, next):
        self.left = TreeNode(next) if not isinstance(next, TreeNode) else next
        self.left.is_root = False
        self.is_leaf = False
        return self

    def link_right(self, next):
        self.right = TreeNode(next) if not isinstance(next, TreeNode) else next
        self.right.is_root = False
        self.is_leaf = False
        return self

    def __str__(self):
        return self.__str_dfs() if self.print_dfs else self.__str_bfs()

    def __str_bfs(self):
        print_prefix = 'BFS: ' if self.is_root else ''
        return print_prefix + ''

    def __str_dfs(self):
        naive_values = [self.val]
        naive_values += [self.left] if self.left else ["$NULL"]
        naive_values += [self.right] if self.right else []

        naive_values += ["$NULL"] if not self.is_leaf and not self.right else []

        # Debugger
        # print(['--->'], [str(n) for n in naive_values], ['<---']) if self.val == 4 else None

        print_prefix = 'DFS: ' if self.is_root else ''
        return print_prefix + ', '.join([str(v) for v in naive_values])

    # Check before using
    def delete(self, root: Optional["TreeNode"], key: int) -> Optional["TreeNode"]:
        if not root:
            return root

        if key > root.val:
            root.right = self.delete(root.right, key)
        elif key < root.val:
            root.left = self.delete(root.left, key)
        else:
            if not root.left:
                return root.right
            elif not root.right:
                return root.left

            # Find the min from right subtree
            cur = root.right
            while cur.left:
                cur = cur.left
            root.val = cur.val
            root.right = self.delete(root.right, root.val)
        return root

    # def __str__(self):
    #     naive_values = [self.val]
    #     naive_values += [self.left] if self.left else []
    #     naive_values += [self.right] if self.right else []
    #     naive_values += ["$NULL"] if not self.right and not self.left else []
    #     return ', '.join([str(v) for v in naive_values])


class _AbstractHeapList(list):
    def __init__(self):
        super().__init__()
        self.h = []

    def __getitem__(self, i): return self.h[i]

    def __len__(self): return len(self.h)

    def __repr__(self):
        return f'Node value: {self.h}'


class _MinHeapListList(_AbstractHeapList):

    def heappush(self, x): heapq.heappush(self.h, x)

    def heappop(self): return heapq.heappop(self.h)

    def __eq__(self, other): return self.h == other.h


class _MaxHeapListList(_AbstractHeapList):

    class MaxHeapObj(object):
        def __init__(self, val): self.val = val

        def __lt__(self, other): return self.val > other.val

        def __eq__(self, other): return self.val == other.val

        def __str__(self): return str(self.val)

    def heappush(self, x): heapq.heappush(self.h, _MaxHeapListList.MaxHeapObj(x))

    def heappop(self): return heapq.heappop(self.h).val

    def __getitem__(self, i): return self.h[i].val


@deprecated
class HeapList:
    def __init__(self, is_root_min: bool):
        self.struct = _MinHeapListList() if is_root_min else _MaxHeapListList()

    def heapify(self, ele_list):
        [self.struct.heappush(x) for x in ele_list]

    def heappush(self, x): self.struct.heappush(x)

    def heappop(self): return self.struct.heappop()

    def __getitem__(self, i): return self.struct[i]

    def __repr__(self):
        return self.struct.__repr__()

    def __len__(self):
        return self.struct.__len__()

    def append(self, x):
        self.struct.append(x)


class TestStructs:

    @staticmethod
    def tree_nodes():
        root1 = TreeNode(5) \
            .link_left(TreeNode(3)
                       .link_left(21)) \
            .link_right(TreeNode(4)
                        .link_left(2)
                        .link_right(1))
        print(root1)
        root2 = TreeNode(5) \
            .link_left(TreeNode(3)
                       .link_left(21)
                       .link_right(TreeNode(12)
                                   .link_left(231)
                                   .link_right(123))) \
            .link_right(TreeNode(4)
                        .link_left(TreeNode(2)
                                   .link_left(43))
                        .link_right(1))
        print(root2)

    @staticmethod
    def heaps():
        minh = HeapList(is_root_min=True)
        maxh = HeapList(is_root_min=False)
        # add some values
        minh.heappush(12)
        maxh.heappush(12)
        minh.heappush(135)
        maxh.heappush(135)
        minh.heappush(4)
        maxh.heappush(4)
        minh.heappush(2135)
        maxh.heappush(2135)
        # fetch "top" values
        print(minh[0], maxh[0])  # "4 12"
        # fetch and remove "top" values
        print(minh.heappop(), maxh.heappop())  # "4 12"


if __name__ == '__main__':
    TestStructs.heaps()

# DFS: 5, 3, 21, $NULL, 4, 2, $NULL, 1, $NULL
# DFS: 5, 3, 21, $NULL, 4, 2, 43, $NULL
