public class Solution {

    public String encode(List<String> strs) {
        StringBuilder encodedString = new StringBuilder();
        for(String str: strs){
            int length = str.length();
            encodedString.append(length+"#");
            encodedString.append(str);
        }
        return encodedString.toString();
    }

    public List<String> decode(String str) {
        // Create two pointers as a sliding window
        // The start will be used to mark the beginning of the length of each encoded string
        // The end will be pointing to the # symbol when we parse through the string
        // From there, we will be able to compute the length of the upcoming string
        int start = 0, end = 0;
        
        // The List that will store the decoded Strings
        List<String> decodedStrings = new LinkedList();
        
        // Parse the string until its end
        while(end < str.length()) {
            // Find the "#" symbol first
            while(str.charAt(end) != '#') {
                end++;
            }

            // The length of each encoded string is between the start and the end indices
            int length = Integer.parseInt(str.substring(start, end));
            
            // Compute the decoded string by creating a substring between "end + 1" and "end + 1 + length"
            // We are doing a "+ 1" operation because we need to skip the # symbol
            decodedStrings.add(str.substring(end + 1, end + 1 + length));
            
            // Move the start and end pointers to after the last found decoded string
            // We are doing a "+ 1" operation because we need to skip the # symbol
            start = end = end + 1 + length;
        }
        return decodedStrings;
    }
}
