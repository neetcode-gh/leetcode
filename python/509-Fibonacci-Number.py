class Solution:    
    Memo = {}    
    def fib(self, n: int):        
        if n in self.Memo:            
            return self.Memo[n]        
        if n == 0:            
            return 0        
        if n == 1:            
            return 1        
        self.Memo[n] = self.fib(n - 1) + self.fib(n - 2)        
        return self.Memo[n]
