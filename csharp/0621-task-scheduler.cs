public class Solution
{
    private PriorityQueue<FreqClass, int> pq;
    private Dictionary<char, int> dictionary;
    public int LeastInterval(char[] tasks, int n)
    {
        // Count tasks in the array
        if (n == 0)
            return tasks.Length;
        dictionary = new Dictionary<char, int>();
        foreach (var task in tasks)
        {
            if (dictionary.ContainsKey(task))
            {
                dictionary[task]++;
            }
            else
                dictionary.Add(task, 1);
        }


        pq = new PriorityQueue<FreqClass, int>(new MaxHeap());

        var time = 0;

        AddItemsToPQ();


        while (pq.Count > 0)
        {
            var list = new List<FreqClass>();
            var cnt = 0;
            for (var i = 0; i < n + 1; i++)
            {
                if (pq.Count > 0)
                {
                    var item = pq.Dequeue();
                    cnt++;
                    //Console.WriteLine($"Dequeued {item.Task} with frequency : {item.Frequency}");
                    item.Frequency--;
                    if (item.Frequency > 0)
                        list.Add(item);
                }
            }

            for (var i = 0; i < list.Count; i++)
            {
                var item = list[i];
                //Console.WriteLine($"Enqueued {item.Task} with frequency : {item.Frequency}");
                pq.Enqueue(item, item.Frequency);
            }

            time += pq.Count == 0 ? cnt : n + 1;
            //Console.WriteLine($"Done with iteration, current time: {time}");
        }

        return time;
    }

    private void AddItemsToPQ()
    {
        foreach (var keyValuePair in dictionary)
        {
            pq.Enqueue(new FreqClass(keyValuePair.Value, 0, keyValuePair.Key), keyValuePair.Value);
        }
    }

    public class MaxHeap : IComparer<int>
    {
        public int Compare(int x, int y)
        {
            return y - x;
        }
    }

    public class FreqClass
    {
        public int Frequency;
        public int IdleTime;
        public char Task;

        public FreqClass(int frequency, int idleTime, char task)
        {
            Frequency = frequency;
            IdleTime = idleTime;
            Task = task;
        }
    }
}