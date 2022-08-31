class Solution {
    public boolean checkValidString(String s) {
        int count = 0;
        Stack<Integer> op = new Stack<>();
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) == '(')
                op.push(i); // index of opening
            else if (s.charAt(i) == ')') {
                if (op.size() > 0)
                    op.pop(); // if we have brackets
                else if (st.size() > 0)
                    st.pop(); // if not brackets do we have stars
                else
                    return false; // a closing bracket without opening and star
            } else
                st.push(i); // index of star
        }
        // if we left with some opening bracket that over stars con cover up
        while (op.size() > 0 && st.size() > 0) {
            if (op.peek() > st.peek())
                return false;
            op.pop();
            st.pop();
        }

        return op.size() == 0;
    }
}

// Time complexity: O(n)
// Space complexity: O(1)
class Solution2 {
    public boolean checkValidString(String s) {
            int low = 0, high = 0;
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) == '(') {
                    low++;
                    high++;
                } else if (s.charAt(i) == ')') {
                    if (low > 0 ) {
                        low--;
                    }
                    high--;
                } else {
                    if (low > 0) {
                        low--;
                    } 
                    high++;
                }
                if (high < 0) {
                    return false;
                }
            }
            return low == 0;
        }
    }
