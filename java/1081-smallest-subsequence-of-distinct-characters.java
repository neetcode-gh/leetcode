class Solution {
    public String smallestSubsequence(String s) {
        Set<Character> seen = new HashSet<>();
        HashMap<Character, Integer> last = new HashMap<>();
        for(char c : s.toCharArray()){
            if(!last.containsKey(c))
                last.put(c, s.lastIndexOf(c));
        }
        Stack<Character> stack = new Stack();
        for(int i = 0; i < s.length(); i++){
            char c = s.charAt(i);
            if(seen.contains(c))
                continue;
            while(!stack.isEmpty() && stack.peek() > c && i < last.get(stack.peek()))
                seen.remove(stack.pop());
            stack.push(c);
            seen.add(c);        
        }
        StringBuilder sb = new StringBuilder();
        for(char c: stack)
            sb.append(c);
        return sb.toString();    
    }
}
