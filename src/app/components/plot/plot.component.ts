import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {pi, sin, cos} from 'mathjs';
import {GivenData} from '../../models/given-data.model';

@Component({
	selector: 'plot',
	templateUrl: './plot.component.html',
	styleUrls: ['./plot.component.less']
})
export class PlotComponent implements OnInit {

	private readonly iterationsTotal: number = 200;

	private model: GivenData;

	public board;
	public timeSlider = {Value: () => 0};
	public plot;

	private Ey = (z: number, x: number, t: number) => (this.U(z, t) + this.Teta(z, t)) * sin(pi * x / this.model.l);

	private EyWrapper = (z: number) => {
		let solution = this.Ey(z, this.model.l / 2, this.timeSlider.Value());
		console.log(solution);
		return solution;
	};


	private U = (z: number, t: number) => {
		let series: number = 0;
		for (let n = 1; n <= this.iterationsTotal; ++n) {
			series += this.omegaTildaN(n) * sin(pi * n * z / this.model.L) * (
				(
					(1 / this.omega() - this.omegaN(n)) * cos((this.omega() - this.omegaN(n)) * t) -
					(1 / this.omega() + this.omegaN(n)) * cos((this.omega() + this.omegaN(n)) * t)
				) * cos(pi * n * t / this.model.L) -
				(
					(1 / this.omega() - this.omegaN(n)) * cos((this.omega() - this.omegaN(n)) * t) +
					(1 / this.omega() + this.omegaN(n)) * cos((this.omega() + this.omegaN(n)) * t)
				) * sin(pi * n * t / this.model.L) -
				(1 / this.omega() + this.omegaN(n)) +
				(1 / this.omega() - this.omegaN(n)) -
				(2 * this.omega() / (this.omegaTop() ** 2 - this.omega() ** 2))
			) * sin(pi * z * n / this.model.L);
		}
		return series;
	};

	private Teta = (z: number, t: number) => sin(this.omega() * t) * (this.model.L - z) / z;

	private omega = () => 2 * pi * this.model.c / this.model.lambda;

	private omegaN = (n: number) => pi * n / this.model.L;

	private omegaTildaN = (n: number) => this.model.L * (this.omegaTop() ** 2 - this.omega() ** 2) / (pi * n) ** 2;

	private readonly omegaTop = () => pi * this.model.c / this.model.L;

	constructor(private dataService: DataService) {
	}

	public ngOnInit(): void {
		this.model = this.dataService.model;
		this.initializeGraph();
	}

	private initializeGraph() {
		const left = -this.model.L / 8;
		const right = this.model.L;
		const top = 2e25;
		const bottom = -top / 8;
		// @ts-ignore
		this.board = JXG.JSXGraph.initBoard('box', {boundingbox: [left, top, right, bottom], axis: true, grid: false});
		this.timeSlider = this.board.create('slider', [[-left, top/5], [right*0.8, top/5], [0, 0, this.model.T]], {name: 't', snapWidth: 2});
		this.plot = this.board.create('functiongraph', [this.EyWrapper, 0, this.model.L]);
	}
}
