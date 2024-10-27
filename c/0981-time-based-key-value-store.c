#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Define a struct to hold key-value pairs and timestamps
typedef struct {
    char* key;
    char* value;
    int timestamp;
} Entry;

// Define the TimeMap structure
typedef struct {
    Entry** entries;   // Array of arrays to store key-value pairs and timestamps
    int* sizes;        // Array to store the current size of each entry
    int* capacities;   // Array to store the current capacity of each entry
    int size;          // Number of distinct keys
} TimeMap;

// Function to create a new TimeMap
TimeMap* timeMapCreate() {
    TimeMap* obj = (TimeMap*)malloc(sizeof(TimeMap));
    obj->entries = NULL;
    obj->sizes = NULL;
    obj->capacities = NULL;
    obj->size = 0;
    return obj;
}

// Function to set a key-value pair with timestamp
void timeMapSet(TimeMap* obj, char* key, char* value, int timestamp) {
    if (obj == NULL || key == NULL || value == NULL) return;

    int index = -1;
    for (int i = 0; i < obj->size; i++) {
        if (strcmp(obj->entries[i][0].key, key) == 0) {
            index = i;
            break;
        }
    }

    // If key is not found, create a new entry
    if (index == -1) {
        obj->size++;
        obj->entries = (Entry**)realloc(obj->entries, sizeof(Entry*) * obj->size);
        obj->sizes = (int*)realloc(obj->sizes, sizeof(int) * obj->size);
        obj->capacities = (int*)realloc(obj->capacities, sizeof(int) * obj->size);

        index = obj->size - 1;
        obj->entries[index] = (Entry*)malloc(sizeof(Entry));
        obj->sizes[index] = 0;
        obj->capacities[index] = 1;
    }
    // If the entry is full, double its capacity
    else if (obj->sizes[index] == obj->capacities[index]) {
        obj->capacities[index] *= 2;
        obj->entries[index] = (Entry*)realloc(obj->entries[index], sizeof(Entry) * obj->capacities[index]);
    }

    // Add the new entry to the TimeMap
    Entry* entry = &obj->entries[index][obj->sizes[index]];
    entry->key = strdup(key);
    entry->value = strdup(value);
    entry->timestamp = timestamp;

    obj->sizes[index]++;
}

// Function to get the value for a given key and timestamp
char* timeMapGet(TimeMap* obj, char* key, int timestamp) {
    if (obj == NULL || key == NULL || obj->size == 0) return "";

    // Iterate through entries to find the matching key
    for (int i = 0; i < obj->size; i++) {
        if (strcmp(obj->entries[i][0].key, key) == 0) {
            Entry* entries = obj->entries[i];
            int left = 0;
            int right = obj->sizes[i] - 1;
            int index = -1;

            // Binary search to find the appropriate timestamp index
            while (left <= right) {
                int mid = left + (right - left) / 2;

                if (entries[mid].timestamp <= timestamp) {
                    index = mid;
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            // If a matching timestamp is found, return the corresponding value
            if (index != -1) {
                return entries[index].value;
            }
        }
    }

    return ""; // Return an empty string if key or timestamp is not found
}

// Function to free memory allocated by the TimeMap
void timeMapFree(TimeMap* obj) {
    if (obj == NULL) return;

    for (int i = 0; i < obj->size; i++) {
        for (int j = 0; j < obj->sizes[i]; j++) {
            free(obj->entries[i][j].key);
            free(obj->entries[i][j].value);
        }
        free(obj->entries[i]);
    }

    free(obj->entries);
    free(obj->sizes);
    free(obj->capacities);
    free(obj);
}
