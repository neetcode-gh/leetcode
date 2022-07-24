class Solution:
    def count_components(self, n: int, edges: List[List[int]]) -> int:
        parent = [i for i in range(n)]
        rank = [1] * n

        def find_union(node: int) -> None:
            result = node
            while result != parent[result]:
                parent[result] = parent[parent[result]]  # path compression
                result = parent[result]
            return result

        def union(node_1: int, node_2: int):
            parent_1 = find_union(node_1)
            parent_2 = find_union(node_2)
            if parent_1 == parent_2:
                return 0
            if rank[parent_2] < rank[parent_1]:
                parent[parent_1] = parent_2
                rank[parent_2] += rank[parent_1]
            else:
                parent[parent_2] = parent_1
                rank[parent_1] += rank[parent_2]
            return 1

        result = n
        for node_1, node_2 in edges:
            result -= union(node_1, node_2)
        return result
