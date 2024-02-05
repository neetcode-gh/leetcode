class Solution:
    def bestClosingTime(self, customers: str) -> int:
        '''
        Calculate penalty if closing at 0 = Total of Y characters
        '''
        counter = Counter(customers)
        optimal_pen, res = counter.get('Y', 0), 0
        cur_pen = optimal_pen

        '''
        Iterate customers[1:] string
        '''
        for index in range(1, len(customers)+1):
            '''
            calculate optimal_pen if close at index
            curr_pen -= 1 if previous character is 'Y else curr_pen += 1 (or curr_pen -= -1)
            '''
            cur_pen -= 1 if customers[index-1] == 'Y' else -1
            
            '''
            update optimal pen if it smaller.
            since we iterate from the start of the customer
            it will make sure we get the optimal time at earliest hour
            '''
            if cur_pen < optimal_pen:
                optimal_pen = cur_pen
                res = index
        return res
