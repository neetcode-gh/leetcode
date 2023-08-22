class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        tasks = sorted([(t[0], t[1], i) for i, t in enumerate(tasks)])
        result, heap = [], []
        cur_task_index = 0
        cur_time = tasks[0][0]
        
        while len(result) < len(tasks):
            while (cur_task_index < len(tasks)) and (tasks[cur_task_index][0] <= cur_time):
                heapq.heappush(heap, (tasks[cur_task_index][1], tasks[cur_task_index][2]))
                cur_task_index += 1
            if heap:
                time_difference, original_index = heapq.heappop(heap)
                cur_time += time_difference
                result.append(original_index)
            elif cur_task_index < len(tasks):
                cur_time = tasks[cur_task_index][0]
                
        return result
