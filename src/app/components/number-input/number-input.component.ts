import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'number-input',
	templateUrl: './number-input.component.html',
	styleUrls: ['./number-input.component.less']
})
export class NumberInputComponent implements OnInit {

	@Output()
	public valueChange: EventEmitter<number> = new EventEmitter<number>();

	@Input()
	public step: number;

	@Input()
	public value: number;

	@Input()
	public text: string;

	constructor() {
	}

	public ngOnInit(): void {
	}

	public onDecrease() {
		this.value -= this.step;
		this.valueChange.emit(this.value);
	}

	public onIncrease() {
		this.value += this.step;
		this.valueChange.emit(this.value);
	}

}
