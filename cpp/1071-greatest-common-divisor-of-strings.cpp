/**
 *  Time Complexity: O(n^2) 
 *  Space Complexity: O(1)
 */

class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        string shortest, longest;
        
        if(str1.length() < str2.length()){
            shortest = str1;
            longest = str2;
        }
        else{
            shortest = str2;
            longest = str1;
        }

        string solution = "";   
        ushort shortest_length = shortest.length();
        ushort longest_length = longest.length();

        for(ushort i = shortest_length; i > 0; --i)
        {   
            if (longest_length % i != 0 || shortest_length % i != 0) continue;

            for(ushort j = 0; j < longest_length; ++j)
            {
                ushort first_pointer = j % i;
                ushort second_pointer = j % shortest_length;

                if(shortest[first_pointer] != longest[j] || shortest[second_pointer] != longest[j])
                {
                    solution = "";
                    break;
                }

                if(first_pointer == j) solution += longest[j];
            }
            
            if(solution != "") return solution;
        }

        return "";
    }
};