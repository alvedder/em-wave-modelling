import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GivenData} from '../../models/given-data.model';
import {DataService} from '../../services/data.service';

@Component({
	selector: 'init-plot-data',
	templateUrl: './init-plot-data.component.html',
	styleUrls: ['./init-plot-data.component.less']
})
export class InitPlotDataComponent implements OnInit {

	public model: GivenData = {
		l: 10,
		L: 5,
		T: 0,
		c: 300_000_000,
		lambda: 1e-3
	}

	@Output()
	public readonly initialized: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private dataService: DataService) {
	}

	public ngOnInit(): void {
	}

	public buildPlot(): void {
		// validate data
		this.dataService.model = this.model;
		this.initialized.emit(true);
	}
}
