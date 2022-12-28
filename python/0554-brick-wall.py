class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        # 1. count the number of edges
        # 2. find the most common edge
        # 3. return the number of rows - the most common edge
        edges = {}
        for row in wall:
            edge = 0
            for brick in row[:-1]:
                edge += brick
                edges[edge] = edges.get(edge, 0) + 1
        return len(wall) - max(edges.values()) if edges else len(wall)