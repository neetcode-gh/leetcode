class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        h = {
            '+': self.add,
            '-': self.subtract,
            '*': self.multiply,
            '/': self.divide
        }
        
        stack = []
        for t in tokens:
            if t in h:
                b, a = stack.pop(), stack.pop()
                t = h[t](a, b)
            stack.append(int(t))
                
        return stack[0]
    
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b
    
    def divide(self, a, b):
        return a / b