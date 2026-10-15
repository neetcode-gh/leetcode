/**
 * PriorityQueue | Sorting | Counting
 * Time O(n*log(n) + n*log(m)) | Space O(n) (n = number of meetings | m = number of rooms)
 * https://leetcode.com/problems/meeting-rooms-iii/
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function(n, meetings) {
    
    const usedRoomFreq = new Array(n).fill(0);

    const roomHeap = new MinPriorityQueue({
        compare: (a,b) => {
            return a-b;
        }
    });

    // [endtime, room#]
    const goingOnMeeting = new MinPriorityQueue({
        compare: (a,b) => {
            if (a[0] === b[0]) return a[1] - b[1];
            return a[0] - b[0];
        }
    });

    // add all rooms
    for (let i = 0; i < n; i++) {
        roomHeap.enqueue(i);
    }

    // sort the meeting based on start time
    meetings = meetings.sort((a,b) => a[0]-b[0]);

    for (const [start, end] of meetings) {

        while (!goingOnMeeting.isEmpty() && goingOnMeeting.front()[0] <= start) {
            const [_, room] = goingOnMeeting.dequeue();
            roomHeap.enqueue(room);
        }

        let nextEndTime = end;
        if (roomHeap.isEmpty()) {
             const [end1, room] = goingOnMeeting.dequeue();
            nextEndTime = end1 + (end-start);
            roomHeap.enqueue(room);
        }

        const nextRoom = roomHeap.dequeue();
        goingOnMeeting.enqueue([nextEndTime, nextRoom]);
        usedRoomFreq[nextRoom] += 1;
    }

    return usedRoomFreq.indexOf(Math.max(...usedRoomFreq))
};
