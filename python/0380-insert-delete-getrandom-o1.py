from random import choice


class RandomizedSet:

    def __init__(self):
        self.dict = {}
        self.list = []

    def insert(self, val: int) -> bool:
        if val in self.dict:
            return False

        self.dict[val] = len(self.list)
        self.list.append(val)

        return True

    def remove(self, val: int) -> bool:
        if val not in self.dict:
            return False

        idx, last_element = self.dict[val], self.list[-1]
        self.list[idx], self.dict[last_element] = last_element, idx
        self.list.pop()
        del self.dict[val]

        return True

    def getRandom(self) -> int:
        return choice(self.list)
