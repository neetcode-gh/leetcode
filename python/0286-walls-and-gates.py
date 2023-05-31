class Solution:
    """
    @param rooms: m x n 2D grid
    @return: nothing
    """

    def walls_and_gates(self, rooms: List[List[int]]):
        ROWS, COLS = len(rooms), len(rooms[0])
        q = deque()

        def addRooms(r, c):
            if (
                min(r, c) < 0
                or r == ROWS
                or c == COLS
                or rooms[r][c] == -1
            ):
                return
            q.append([r, c])

        for r in range(ROWS):
            for c in range(COLS):
                if rooms[r][c] == 0:
                    q.append([r, c])

        dist = 0
        while q:
            for i in range(len(q)):
                r, c = q.popleft()
                if rooms[r][c] >= dist:
                    rooms[r][c] = dist
                    addRooms(r + 1, c)
                    addRooms(r - 1, c)
                    addRooms(r, c + 1)
                    addRooms(r, c - 1)
            dist += 1
