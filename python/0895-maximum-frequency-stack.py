class FreqStack:

    def __init__(self):
        # save as: {val: freq_of_val}
        self.freq_tbl = defaultdict(lambda: -1)
        
        '''
        At index i of self.index: 
        contain value that occur i+1 times
        '''
        self.indexer = []

    def push(self, val: int) -> None:
        # increase 1 for val's frequency
        self.freq_tbl[val] += 1
        # create new empty array tracking for the greatest frequency
        if len(self.indexer) == self.freq_tbl[val]: self.indexer.append([])
        # append to the indexer[freq_index] of the val
        self.indexer[self.freq_tbl[val]].append(val)

    def pop(self) -> int:
        val = self.indexer[-1].pop()
        self.freq_tbl[val] -= 1
        # remove val if does not exist in the FreqStack
        if self.freq_tbl[val] == -1: del self.freq_tbl[val]

        # remove last element of indexer if it is empty
        if not self.indexer[-1]: self.indexer = self.indexer[:-1]
        return val
