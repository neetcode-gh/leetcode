package carfleet

import "testing"

func Test_carFleet(t *testing.T) {
	type args struct {
		target   int
		position []int
		speed    []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{
			name: "case1",
			args: args{
				target:   12,
				position: []int{10, 8, 0, 5, 3},
				speed:    []int{2, 4, 1, 1, 3},
			},
			want: 3,
		},
		{
			name: "case2",
			args: args{
				target:   10,
				position: []int{3},
				speed:    []int{3},
			},
			want: 1,
		},
		{
			name: "case3",
			args: args{
				target:   100,
				position: []int{0, 2, 4},
				speed:    []int{4, 2, 1},
			},
			want: 1,
		},
		{
			name: "case4",
			args: args{
				target:   10,
				position: []int{6, 8},
				speed:    []int{3, 2},
			},
			want: 1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := carFleet(tt.args.target, tt.args.position, tt.args.speed); got != tt.want {
				t.Errorf("carFleet() = %v, want %v", got, tt.want)
			}
		})
	}
}
