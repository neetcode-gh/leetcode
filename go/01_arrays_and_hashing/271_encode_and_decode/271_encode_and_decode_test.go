package encodeanddecode

import (
	"reflect"
	"testing"
)

func Test_encode(t *testing.T) {
	type args struct {
		strs []string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			name: "encode-1",
			args: args{
				strs: []string{
					"this",
					"is",
					"testString",
				},
			},
			want: "4#this2#is10#testString",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := encode(tt.args.strs); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("encode() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_decode(t *testing.T) {
	type args struct {
		str string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "decode",
			args: args{
				str: "4#this2#is10#testString",
			},
			want: []string{
				"this",
				"is",
				"testString",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := decode(tt.args.str); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("decode() = %v, want %v", got, tt.want)
			}
		})
	}
}
