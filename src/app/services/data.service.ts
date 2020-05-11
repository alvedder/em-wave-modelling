import {Injectable} from '@angular/core';
import {GivenData} from '../models/given-data.model';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	private _model: GivenData;

	get model(): GivenData {
		return this._model;
	}

	set model(value: GivenData) {
		this._model = value;
	}

	constructor() {
	}
}
