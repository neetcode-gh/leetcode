from collections import defaultdict, deque
from typing import List
class Solution:
    # This function performs topological sort on a directed graph represented by successors and predecessors_count arrays.
    def topologicalSort(self, successors: List[List[int]], predecessors_count: List[int], num_nodes: int) -> List[int]:
        order = []  # To store the topologically sorted nodes
        # Initialize a deque with all nodes that have no predecessors (i.e., in-degree of 0)
        nodes_with_no_predecessors = deque(node for node in range(num_nodes) if not predecessors_count[node])
        
        while nodes_with_no_predecessors:  # Process nodes while there are nodes without predecessors
            node = nodes_with_no_predecessors.popleft()  # Get the node with no predecessors
            order.append(node)  # Add the node to the sorted order
            for successor in successors[node]:  # For each successor of the current node
                predecessors_count[successor] -= 1  # Decrement the in-degree of the successor
                if not predecessors_count[successor]:  # If the successor now has no predecessors
                    nodes_with_no_predecessors.append(successor)  # Add it to the queue for processing
        
        # If the number of nodes in the order is less than the total number of nodes, a cycle was detected
        return order if len(order) == num_nodes else []  # Return the order if all nodes were sorted, else return empty list

    def sortItems(self, n: int, m: int, group: List[int], beforeItems: List[List[int]]) -> List[int]:
        # Step 1: Assign unique group IDs to items that don't belong to any group
        for item in range(n):
            if group[item] == -1:  # If the item doesn't belong to any group
                group[item] = m  # Assign a new group ID
                m += 1  # Increment the group ID for the next item
        
        # Step 2: Initialize graphs for item dependencies and group dependencies
        successors_group, successors_item = [[] for _ in range(m)], [[] for _ in range(n)]  # Graphs for group and item dependencies
        predecessors_count_group, predecessors_count_item = [0] * m, [0] * n  # Count of incoming edges (predecessors) for each group and item
        
        # Step 3: Build the dependency graphs based on beforeItems
        for item in range(n):
            current_group = group[item]  # Get the group of the current item
            for before in beforeItems[item]:  # Process each item that should come before the current item
                before_group = group[before]  # Get the group of the item that should come before
                
                if current_group == before_group:  # If the two items belong to the same group
                    successors_item[before].append(item)  # Add a dependency from 'before' to the current item
                    predecessors_count_item[item] += 1  # Increment the in-degree of the current item
                else:  # If the items belong to different groups
                    successors_group[before_group].append(current_group)  # Add a group dependency
                    predecessors_count_group[current_group] += 1  # Increment the in-degree of the current group
        
        # Step 4: Perform topological sort on both the group dependencies and item dependencies
        groups_order = self.topologicalSort(successors_group, predecessors_count_group, m)  # Topological sort of groups
        items_order = self.topologicalSort(successors_item, predecessors_count_item, n)  # Topological sort of items
        
        # Step 5: If there was a cycle detected in either group or item sorting, return an empty list
        if not groups_order or not items_order:
            return []  # Return an empty list if either the group or item topological sort failed
        
        # Step 6: Group the items based on the group IDs
        items_grouped = [[] for _ in range(m)]  # Create an empty list for each group to store its items
        for item in items_order:  # Process each item in topologically sorted order
            items_grouped[group[item]].append(item)  # Add the item to the appropriate group
        
        # Step 7: Combine the groups in topologically sorted order
        result = []  # The final result list to store the sorted items
        for grp in groups_order:  # For each group in topologically sorted order
            result.extend(items_grouped[grp])  # Add the items of the group to the result
        
        return result  # Return the final sorted list of items respecting both item and group dependencies
