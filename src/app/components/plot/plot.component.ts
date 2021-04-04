import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ceil, max, pi, sin, sqrt} from 'mathjs';
import {GivenData} from '../../models/given-data.model';

@Component({
	selector: 'plot',
	templateUrl: './plot.component.html',
	styleUrls: ['./plot.component.less']
})
export class PlotComponent implements OnInit {

	@Output()
	public readonly initialized: EventEmitter<boolean> = new EventEmitter<boolean>();
	public board;
	public timeSlider = {Value: () => 0};
	public plot;
	public leftBorder;
	public rightBorder;
	private data: GivenData;



	constructor(private dataService: DataService) {
	}

	public ngOnInit(): void {
		this.data = this.dataService.model;
		this.initializeGraph();
	}

	public returnToInit() {
		this.initialized.emit(false);
	}

	// TODO fix a bug: N2 is too huge
	private findIterationNum = () => {
		let a1 = this.omega() ** 2 - this.omegaTop() ** 2,
			a2 = (this.data.L ** 2),
			b1 = this.data.epsilon * (pi ** 3) * (this.data.c ** 2);

		const N1 = ceil(sqrt(a1 * a2 / b1) - 1);

		let d1 = 2 * this.omega() * this.data.c * (this.data.L ** 2);

		let N2 = ceil((d1 / this.data.epsilon) - 1);

		// TODO uncomment once the bug is fixed
		return max(N1/*, N2*/);
	};

	private Ey = (z: number, x: number, t: number, n: number) => (this.U(z, t, n) + this.Teta(z, t)) * sin(pi * x / this.data.l);

	private U = (z: number, t: number, n: number) => {
		let series: number = 0;
		for (let i = 1; i <= n; ++i) {
			series += this.Tn(t, i) * this.Yn(z, i);
		}
		return series;
	};

	private Tn = (t: number, n: number) => (2 / ((pi * n) * ((this.gammaN(n) ** 2) - (this.omega() ** 2)))) *
		(((this.omega() ** 2) - (this.omegaTop() ** 2)) * sin(this.omega() * t) - (this.omega() * (this.omegaN(n) ** 2) * sin(this.gammaN(n) * t)) / this.gammaN(n));

	private Yn = (z: number, n: number) => sin(pi * n * z / this.data.L);

	private Teta = (z: number, t: number) => sin(this.omega() * t) * (this.data.L - z) / this.data.L;

	private omega = () => (2 * pi * this.data.c) / this.data.lambda;

	private omegaN = (n: number) => (pi * this.data.c * n) / this.data.L;

	private omegaTop = () => (pi * this.data.c) / this.data.l;

	private gammaN = (n: number) => sqrt(this.omegaTop() ** 2 + this.omegaN(n) ** 2);

	private findEy = (z: number) => this.Ey(z, this.data.l / 2, this.timeSlider.Value(), this.findIterationNum());

	private initializeGraph() {
		const left = -this.data.L / 8;
		const right = 1.1 * this.data.L;
		const top = 3;
		const bottom = -top;
		// @ts-ignore
		this.board = JXG.JSXGraph.initBoard('box', {
			boundingbox: [left, top, right, bottom],
			axis: true,
			grid: false
		});
		this.timeSlider = this.board.create('slider', [[-0.5 * left, -0.6 * top], [0.62 * right, -0.6 * top], [0, 0, this.data.T]], {
			name: 't',
			snapWidth: this.data.T / 20,
			precision: 16
		});
		this.plot = this.board.create('functiongraph', [this.findEy, 0, this.data.L]);
		this.leftBorder = this.board.create('line', [[0, 0], [0, 1]], {strokeColor: 'red'});
		this.rightBorder = this.board.create('line', [[this.data.L, 0], [this.data.L, 1]], {strokeColor: 'red'});
	}
}
