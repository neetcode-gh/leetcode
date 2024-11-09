
class SeatManager {
    /**
    * MinHeap
    * Time O(n*log(n)) | Space O(n)
    * https://leetcode.com/problems/seat-reservation-manager/
    * @param {number} n
    */
    constructor(n) {
        this.unreserved = new MinPriorityQueue({
            compare: (a, b) => a - b
        });

        for (let i = 1; i < n + 1; i++) {
            this.unreserved.enqueue(i);
        }
    }

    /**
     * Time O(log(n)) | Space O(1)
     * @return {number}
     */
    reserve() {
        const minAvailableSeat = this.unreserved.dequeue();
        return minAvailableSeat;
    }

    /** 
     * Time O(log(n)) | Space O(1)
     * @param {number} seatNumber
     * @return {void}
     */
    unreserve(seatNumber) {
        this.unreserved.enqueue(seatNumber);
    }
}
