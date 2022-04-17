class MedianFinder {
private:
    // all values in smallQ should be smaller than largeQ
    priority_queue<int> smallQ; // map heap
    priority_queue<int,vector<int>,greater<int>> largeQ; // min heap
public:
    MedianFinder() {}

    void addNum(int num) {
        smallQ.push(num);
        // make every num in small <= every num in large
        if (!smallQ.empty() && !largeQ.empty() && smallQ.top() > largeQ.top()) {
            int val = smallQ.top();
            smallQ.pop();
            largeQ.push(val);
        }

        // make size difference of two pqs at most 1
        if (smallQ.size() > largeQ.size() + 1) {
            int val = smallQ.top();
            smallQ.pop();
            largeQ.push(val);
        }
        else if (largeQ.size() > smallQ.size() + 1) {
            int val = largeQ.top();
            largeQ.pop();
            smallQ.push(val);
        }
    }

    double findMedian() {
        // if size is different, return  
        if (smallQ.size() > largeQ.size())
            return smallQ.top();
        else if (smallQ.size() < largeQ.size())
            return largeQ.top();
        else // else, return median of two
            return ((double)smallQ.top() + (double)largeQ.top()) / 2.0;
    }
};
