class Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        queue<int> q1;
        for(int i = 0; i < students.size(); i++) {
            q1.push(students[i]);
        }

        int sandwichPos = 0;
        int curr = 0;
        while(!q1.empty() && curr <= q1.size()) {
            if(q1.front() == sandwiches[sandwichPos]) {
                q1.pop();
                sandwichPos++;
                curr = 0;
            } else {
                q1.push(q1.front());
                q1.pop();
            }
            curr++;
        }
        return q1.size();
    }
};
