import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InitPlotDataComponent} from './init-plot-data.component';

describe('InitPlotDataComponent', () => {
	let component: InitPlotDataComponent;
	let fixture: ComponentFixture<InitPlotDataComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InitPlotDataComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InitPlotDataComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
