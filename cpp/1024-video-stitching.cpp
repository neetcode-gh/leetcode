/*
  You are given a series of video clips from a sporting event that lasted time seconds. These video clips can be overlapping with each other and have varying lengths.
  Each video clip is described by an array clips where clips[i] = [starti, endi] indicates that the ith clip started at starti and ended at endi.
  We can cut these clips into segments freely.
  For example, a clip [0, 7] can be cut into segments [0, 1] + [1, 3] + [3, 7].
  Return the minimum number of clips needed so that we can cut the clips into segments that cover the entire sporting event [0, time]. If the task is impossible, return -1.

  Ex. Input: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10
      Output: 3
      Explanation: We take the clips [0,2], [8,10], [1,9]; a total of 3 clips.
      Then, we can reconstruct the sporting event as follows:
      We cut [1,9] into segments [1,2] + [2,8] + [8,9].
      Now we have segments [0,2] + [2,8] + [8,10] which cover the sporting event [0, 10].

  Time  : O(N log N)
  Space : O(1)
*/

class Solution {
public:
    int videoStitching(vector<vector<int>>& clips, int time) {
        int maxi = 0;
        sort(clips.begin() , clips.end());
        for(int i = 0 ; i < clips.size() ; i++) 
            maxi = max(maxi, clips[i][1]);

        if(maxi < time)
            return -1;

        int count = 0, endTime = 0, covered = INT_MIN;
        for(int i = 0; endTime < time ; ) {
            ++count;
            while(i < clips.size() && clips[i][0] <= endTime)
                covered = max(covered, clips[i++][1]);

            if(endTime == covered)
                return -1;
            endTime = covered;
        }
        return count;
    }
};
