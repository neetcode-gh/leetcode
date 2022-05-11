class GenerateParenthesis {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        Stack<String> stack = new Stack<>();
        
        backtrack(0, 0, n, result, stack);
        return result;
    }
    
    private void backtrack(int open, int closed, int n, List<String> result, Stack<String> stack) {
        if (open == n && closed == n) {
            result.add(stack.stream().collect(Collectors.joining("")));
        }
        
        if (open < n) {
            stack.push("(");
            backtrack(open + 1, closed, n, result, stack);
            stack.pop();
        }
        
        if (closed < open) {
            stack.push(")");
            backtrack(open, closed + 1, n, result, stack);
            stack.pop();
        }
    }
}
