class Solution {
    public String removeDuplicates(String s, int k) {
        Stack<Pair<Character, Integer>> stack = new Stack<>();
        char[] ss = s.toCharArray();

        for (char current : ss) {
            if (!stack.isEmpty() && stack.peek().getKey() == current) {
                int topCharCount = stack.pop().getValue();
                stack.push(new Pair<>(current, topCharCount + 1));
            } else {
                stack.push(new Pair<>(current, 1));
            }

            if (stack.peek().getValue() == k) {
                stack.pop();
            }
        }

        StringBuilder result = new StringBuilder();

        while (!stack.isEmpty()) {
            Pair<Character, Integer> poppedPair = stack.pop();
            for (int i = 0; i < poppedPair.getValue(); i++) {
                result.append(poppedPair.getKey());
            }
        }

        return result.reverse().toString();
    }
}
