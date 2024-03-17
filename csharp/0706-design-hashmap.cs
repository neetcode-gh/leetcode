public class MyHashMap
{
    private class LinkedListNode
    {
        public LinkedListNode(int key, int val, LinkedListNode next)
        {
            this.Key = key;
            this.Val = val;
            this.Next = next;
        }

        public int Key { get; set; }
        public int Val { get; set; }
        public LinkedListNode Next { get; set; }
    }

    public MyHashMap()
    {
        Map = new LinkedListNode[10000];
    }

    public int Hash(int key)
    {
        return key % Map.Length;
    }

    public void Put(int key, int value)
    {
        int index = Hash(key);
        if (Map[index] == null)
            Map[index] = new LinkedListNode(key, value, null);
        else
        {
            LinkedListNode node = Map[index];
            while (true)
            {
                if (node.Key == key)
                {
                    node.Val = value;
                    return;
                }
                if (node.Next == null)
                    break;
                else
                    node = node.Next;
            }
            node.Next = new LinkedListNode(key, value, null);
        }
    }

    public int Get(int key)
    {
        int index = Hash(key);
        LinkedListNode node = Map[index];
        if (node != null)
        {
            while (true)
            {
                if (node.Key == key)
                    return node.Val;

                if (node.Next == null)
                    break;
                else
                    node = node.Next;
            }
        }

        return -1;
    }

    public void Remove(int key)
    {
        int index = Hash(key);
        LinkedListNode node = Map[index];
        if (node == null)
            return;
        if (node.Key == key)
        {
            Map[index] = node.Next;
            node = null;
            return;
        }
        while (node.Next != null)
        {
            if (node.Next.Key == key)
            {
                node.Next = node.Next.Next;
                return;
            }

            node = node.Next;
        }
    }

    private LinkedListNode[] Map { get; set; }
}