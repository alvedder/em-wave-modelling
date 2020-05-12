import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../services/data.service';
import {pi, sin, sqrt} from 'mathjs';
import {GivenData} from '../../models/given-data.model';

@Component({
	selector: 'plot',
	templateUrl: './plot.component.html',
	styleUrls: ['./plot.component.less']
})
export class PlotComponent implements OnInit {

	@Output()
	public readonly initialized: EventEmitter<boolean> = new EventEmitter<boolean>();

	private readonly iterationsTotal: number = 200;

	private data: GivenData;

	public board;
	public timeSlider = {Value: () => 0};
	public plot;

	private Ey = (z: number, x: number, t: number) => (this.U(z, t) + this.Teta(z, t)) * sin(pi * x / this.data.l);

	private U = (z: number, t: number) => {
		const Tn = (t: number, n: number) => (2 / ((pi * n) * (this.gammaN(n) ** 2 - this.omega() ** 2))) *
			((this.omega() ** 2 - this.omegaTop() ** 2) * sin(this.omega() * t) - (this.omega() * (this.omegaN(n) ** 2) * sin(this.gammaN(n) * t)));

		const Yn = (z: number, n: number) => sin(pi * n * z / this.data.L);

		let series: number = 0;

		for (let n = 1; n <= this.iterationsTotal; ++n) {
			series += Tn(t, n) * Yn(z, n);
		}

		return series;
	};

	private Teta = (z: number, t: number) => sin(this.omega() * t) * (this.data.L - z) / z;

	private omega = () => 2 * pi * this.data.c / this.data.lambda;

	private omegaN = (n: number) => pi * this.data.c * n / this.data.L;

	private omegaTop = () => pi * this.data.c / this.data.l;

	private gammaN = (n: number) => sqrt(this.omegaTop() + this.omegaN(n));

	private findEy = (z: number) => {
		// TODO here the spinner must get turned on
		let solution = this.Ey(z, this.data.l / 2, this.timeSlider.Value());
		// console.log(solution);
		// TODO here the spinner must get turned off
		return solution;
	};

	constructor(private dataService: DataService) {
	}

	public ngOnInit(): void {
		this.data = this.dataService.model;
		this.initializeGraph();
	}

	private initializeGraph() {
		const left = -this.data.L / 8;
		const right = this.data.L;
		const top = 5e7;
		const bottom = -top;
		// @ts-ignore
		this.board = JXG.JSXGraph.initBoard('box', {
			boundingbox: [left, top, right, bottom],
			axis: true,
			grid: false
		});
		this.timeSlider = this.board.create('slider', [[-left, top / 5], [right * 0.8, top / 5], [0, 0, this.data.T]], {
			name: 't',
			snapWidth: 1,
		});
		this.plot = this.board.create('functiongraph', [this.findEy, 0, this.data.L]);
	}

	public returnToInit() {
		this.initialized.emit(false);
	}
}
