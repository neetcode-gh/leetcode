
class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        dirX, dirY = 0, 1
        x, y = 0, 0
        for d in instructions:
            if d == 'G':
                x, y = x + dirX, y + dirY
            elif d == 'L':
                dirX, dirY = -1*dirY, dirX
            else:
                dirX, dirY = dirY, -1*dirX
        return (x, y) == (0, 0) or (dirX, dirY) != (0, 1)

      
      
# longer solution but the one you could come with solving the challenge from the scratch
class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        x, y = 0, 0
        current_direction = 'N'  # N-north, S-south, W-west, E-east
        for _ in range(4):
            for inst in instructions:
                if inst == 'G':  # "G": go straight 1 unit.
                    if current_direction == 'N':
                        y += 1
                    elif current_direction == 'S':
                        y -= 1
                    elif current_direction == 'W':
                        x -= 1
                    elif current_direction == 'E':
                        x += 1
                elif inst == 'L':  # "L": turn 90 degrees to the left (i.e., anti-clockwise direction).
                    if current_direction == 'N':
                        current_direction = 'W'
                    elif current_direction == 'S':
                        current_direction = 'E'
                    elif current_direction == 'W':
                        current_direction = 'S'
                    elif current_direction == 'E':
                        current_direction = 'N'
                elif inst == 'R':  # "R": turn 90 degrees to the right (i.e., clockwise direction).
                    if current_direction == 'N':
                        current_direction = 'E'
                    elif current_direction == 'S':
                        current_direction = 'W'
                    elif current_direction == 'W':
                        current_direction = 'N'
                    elif current_direction == 'E':
                        current_direction = 'S'
            if x == 0 and y == 0:
                return True
        return False

