import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GivenData} from '../../models/given-data.model';
import {DataService} from '../../services/data.service';

export const START_MODEL: GivenData = {
	l: 10,
	L: 4,
	T: 0.1,
	c: 3e14,
	lambda: 2,
	iterationsTotal: 200
}

@Component({
	selector: 'init-plot-data',
	templateUrl: './init-plot-data.component.html',
	styleUrls: ['./init-plot-data.component.less']
})
export class InitPlotDataComponent implements OnInit {

	public model: GivenData;

	@Output()
	public readonly initialized: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private dataService: DataService) {
	}

	public ngOnInit(): void {
		this.model = START_MODEL;
	}

	public buildPlot(): void {
		// validate data
		this.dataService.model = this.model;
		this.initialized.emit(true);
	}
}
