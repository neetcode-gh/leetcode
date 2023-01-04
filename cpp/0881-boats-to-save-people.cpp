/*
    Given an array people[i] is the weight of the ith person, 
    and an infinite number of boats where each boat can carry a maximum weight of limit. 
    Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.
    Return minimum number of boats to carry every given person.

    sort, while there is people to carry 
    carry the heaviest and lightest person provided their weight doesn't exceed limit.
    otherwise, carry the heaviest person only

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int numRescueBoats(vector<int>& people, int limit) {
        sort(people.begin(), people.end());
        
        int boatRequired = 0;
        int lightestPerson = 0;
        int heaviestPerson = people.size()-1;

        //WHILE THERE IS SOMEONE TO CARRY
        while (lightestPerson <= heaviestPerson){
            if(people[lightestPerson] + people[heaviestPerson] <= limit){
                --heaviestPerson;
                ++lightestPerson;
            }
            else{
                --heaviestPerson;
            }
            ++boatRequired;
        }

        return boatRequired;
    }
};
