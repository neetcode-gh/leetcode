class Solution {
    
    int index = 0; 
    
    public String decodeString(String s) {
        
        StringBuilder decoded = new StringBuilder();
        while (index < s.length() && s.charAt(index) != ']') {
            
            // character is a letter of encoded
            if (!Character.isDigit(s.charAt(index))) decoded.append(s.charAt(index++));
            
            // character is number or [ ]
            else {
                int k = 0;
                
                // case: number
                while (index < s.length() && Character.isDigit(s.charAt(index))) k = k * 10 + s.charAt(index++) - '0';
                
                // case: [
                index++;
                String answer = decodeString(s);
                
                // case: ]
                index++;
                
                // add k*encoded to decoded
                while (k-- > 0) decoded.append(answer);
            }
        }
        return new String(decoded);
    }
}
