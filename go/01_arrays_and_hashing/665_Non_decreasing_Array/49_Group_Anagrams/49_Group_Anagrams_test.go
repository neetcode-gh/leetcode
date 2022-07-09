package groupAnagrams

import (
	"reflect"
	"testing"
)

func Test_groupAnagrams(t *testing.T) {
	type args struct {
		strs []string
	}
	tests := []struct {
		name string
		args args
		want [][]string
	}{
		{
			name: "case1",
			args: args{
				[]string{
					"cat",
					"bat",
					"tac",
					"ate",
					"eat",
				},
			},
			want: [][]string{
				{"cat", "tac"},
				{"bat"},
				{"ate", "eat"},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := groupAnagrams(tt.args.strs); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("groupAnagrams() = %v, want %v", got, tt.want)
			}
		})
	}
}
