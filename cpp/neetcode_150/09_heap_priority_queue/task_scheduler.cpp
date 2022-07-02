/*
    Given array of tasks & cooldown b/w same tasks, return least # of units of time
    Ex. tasks = ["A","A","A","B","B","B"] n = 2 -> 8 (A->B->idle->A->B->idle->A->B)

    Key is to determine # of idles, greedy: always arrange task w/ most freq first
    3A, 2B, 1C -> A??A??A -> AB?AB?A -> ABCAB#A, since A most freq, needs most idles

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> counter(26);
        
        int maxCount = 0;
        int maxCountFrequency = 0;
        
        for (int i = 0; i < tasks.size(); i++) {
            counter[tasks[i] - 'A']++;
            int currCount = counter[tasks[i] - 'A'];
            
            if (maxCount == currCount) {
                maxCountFrequency++;
            } else if (maxCount < currCount) {
                maxCount = currCount;
                maxCountFrequency = 1;
            }
        }
        
        int partCount = maxCount - 1;
        int partLength = n - (maxCountFrequency - 1);
        int emptySlots = partCount * partLength;
        int availableTasks = tasks.size() - maxCount * maxCountFrequency;
        int idles = max(0, emptySlots - availableTasks);
        
        return tasks.size() + idles;
    }
};
