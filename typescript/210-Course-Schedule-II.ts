function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const preMap = {};
  const res: number[] = [];

  for (let i = 0; i < numCourses; i++) {
    preMap[i] = [];
  }

  for (const [crs, pre] of prerequisites) {
    preMap[crs].push(pre);
  }

  const visitSet = new Set();
  const cycleSet = new Set();

  function dfs(crs: number) {
    if (cycleSet.has(crs)) return false;
    if (visitSet.has(crs)) return true;

    cycleSet.add(crs);

    for (const pre of preMap[crs]) {
      if (!dfs(pre)) return false;
    }

    cycleSet.delete(crs);
    visitSet.add(crs);
    res.push(crs);
    return true;
  }
  for (let crs = 0; crs < numCourses; crs++) {
    if (!dfs(crs)) return [];
  }
  return res;
}
