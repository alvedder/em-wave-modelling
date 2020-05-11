import {Component} from '@angular/core';

@Component({
	selector: 'root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {

	public title: string = 'EM wave model';
	private _isDataInitialized: boolean = false;

	get isDataInitialized(): boolean {
		return this._isDataInitialized;
	}
	set isDataInitialized(value: boolean) {
		this._isDataInitialized = value;
	}

}
