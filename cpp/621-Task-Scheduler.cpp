class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        // to minimize cooldown, process the most frequent task first
        unordered_map<char,int> count;
        for (auto c : tasks)
            ++count[c - 'A'];
        priority_queue<int> processQ;
        for (auto& e : count)
            processQ.push(e.second);

        int time = 0;
        queue<pair<int, int>> idleQ; // queue for <count, idleTime>. can be moved to processQ when time == idleTime
        while (!processQ.empty() || !idleQ.empty()) {
            ++time; // increase time by 1
            if (!processQ.empty()) {
                // process the most frequent task
                int cnt = processQ.top() - 1;
                processQ.pop();
                if (cnt > 0) // move to idleQ with cooldown time
                    idleQ.push({ cnt,time + n });
            }
            if (!idleQ.empty() && idleQ.front().second == time) {
                // when time reaches the idleTime, move to processQ
                processQ.push(idleQ.front().first);
                idleQ.pop();
            }
        }
        return time;
    }
};
