/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
 var findOrder = function(numCourses, prerequisites) {
	const prereq = [];
	for (let i = 0; i < numCourses; i++) {
		prereq[i] = [];
	};
  for (const [crs, pre] of prerequisites) {
    prereq[crs].push(pre);
  };
  
	const output = [];
  const visit = new Set();
  const cycle = new Set();
	function dfs(course) {
    if (cycle.has(course)) return false;
    if (visit.has(course)) return true;
    
    cycle.add(course);
    for (const pre of prereq[course]) {
      if (!dfs(pre)) return false;
    }
    cycle.delete(course);
    visit.add(course);
    output.push(course);
    return true;
	};

	for (let j = 0; j < numCourses; j++) {
		if (!dfs(j)) return [];
	};
	return output;
};