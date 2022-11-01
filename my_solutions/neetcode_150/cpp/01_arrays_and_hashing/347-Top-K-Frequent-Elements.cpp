#include <bits/stdc++.h>

using namespace std;

class MinHeap
{
    vector<vector<int>> heap;
    int capacity;

public:
    MinHeap(int capacity)
    {
        this->capacity = capacity;
    }

    void add(int key, int value)
    {
        vector<int> v{key, value};
        this->heap.push_back(v);
        this->heapifyUp();

        if (this->heap.size() > this->capacity) {
            this->heap[0] = this->heap[this->heap.size() - 1];
            this->heap.pop_back();
            this->heapifyDown();
        }
    }

    vector<int> getHeapElements() {
        vector<int> v;

        for (auto e: this->heap) {
            v.push_back(e[0]);
        }

        return v;;
    }

private:
    void heapifyUp()
    {
        int index = this->heap.size() - 1;
        while (index > 0 && this->heap[index][1] < this->heap[this->parentIndex(index)][1]) {
            swap(this->heap[index], this->heap[this->parentIndex(index)]);
            index = this->parentIndex(index);
        }
        
    }

    void heapifyDown() {
        int index = 0;

        while(leftChildIndex(index) < this->capacity) {
            int smallestIndex = this->leftChildIndex(index);
            if (this->rightChildIndex(index) < this->capacity && this->heap[this->rightChildIndex(index)][1] < this->heap[this->leftChildIndex(index)][1]) {
                smallestIndex = this->rightChildIndex(index);
            }

            if (this->heap[index][1] < this->heap[smallestIndex][1]) {
                break;
            } else {
                swap(this->heap[index], this->heap[smallestIndex]);
            }

            index = smallestIndex;
        }
    }

    int leftChildIndex(int index)
    {
        return 2 * index + 1;
    }
    int rightChildIndex(int index)
    {
        return 2 * index + 2;
    }

    int parentIndex(int i) { return (i-1)/2; }
};

class Solution
{

public:
    vector<int> topKFrequent(vector<int> &nums, int k)
    {
        unordered_map<int, int> uMap;

        for (int num : nums)
        {
            if (uMap.find(num) != uMap.end())
            {
                uMap[num]++;
            }
            else
            {
                uMap[num] = 1;
            }
        }

        MinHeap h(k);

        for (auto e : uMap)
        {
            h.add(e.first, e.second);
        }

        return h.getHeapElements();
    }
};

int main(int argc, char const *argv[])
{
    Solution sol;
    vector<int> v{1, 1, 1, 2, 2, 3};
    int k = 2;
    sol.topKFrequent(v, k);
    return 0;
}