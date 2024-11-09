class LFUCache {
    private static class Entry {
        int key;
        int value;
        int freq;

        public Entry(int key, int value, int freq) {
            this.key = key;
            this.value = value;
            this.freq = freq;
        }
    }

    private final int capacity;
    private int minFreq = 0;
    private final Map<Integer, Entry> entries = new HashMap<>();
    private final Map<Integer, LinkedHashSet<Entry>> freqMap = new HashMap<>();

    public LFUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        Entry e = entries.get(key);
        if (e == null) return -1;
        updateFrequency(e);
        return e.value;
    }

    public void put(int key, int value) {
        if (capacity == 0) return;
        if (entries.containsKey(key)) {
            Entry e = entries.get(key);
            e.value = value;
            updateFrequency(e);
        } else {
            if (entries.size() == capacity) {
                evictLeastFrequent();
            }
            Entry e = new Entry(key, value, 1);
            entries.put(key, e);
            freqMap.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(e);
            minFreq = 1; // Reset min frequency to 1 for new entry
        }
    }

    private void updateFrequency(Entry e) {
        int oldFreq = e.freq;
        int newFreq = oldFreq + 1;

        freqMap.get(oldFreq).remove(e);
        if (freqMap.get(oldFreq).isEmpty()) {
            freqMap.remove(oldFreq);
            if (minFreq == oldFreq) minFreq++;
        }

        e.freq = newFreq;
        freqMap.computeIfAbsent(newFreq, k -> new LinkedHashSet<>()).add(e);
    }

    private void evictLeastFrequent() {
        LinkedHashSet<Entry> minFreqEntries = freqMap.get(minFreq);
        Entry toRemove = minFreqEntries.iterator().next();
        minFreqEntries.remove(toRemove);
        if (minFreqEntries.isEmpty()) {
            freqMap.remove(minFreq);
        }

        entries.remove(toRemove.key);
    }
}
