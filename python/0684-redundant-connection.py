class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        parent = [i for i in range(len(edges) + 1)]
        rank = [1] * (len(edges) + 1)

        def find(n):
            while n != parent[n]:
                n, parent[n] = parent[n], parent[parent[n]]
            return n

        def union(n1, n2):
            p1, p2 = find(n1), find(n2)
            if p1 == p2:
                return False

            child, p = (p1, p2) if rank[p1] < rank[p2] else (p2, p1)
            parent[child] = p
            rank[p] += rank[child]
            return True

        for n1, n2 in edges:
            if not union(n1, n2):
                return [n1, n2]