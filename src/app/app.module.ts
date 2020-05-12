import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InitPlotDataComponent} from './components/init-plot-data/init-plot-data.component';
import {PlotComponent} from './components/plot/plot.component';
import {FormsModule} from '@angular/forms';
import { NumberInputComponent } from './components/number-input/number-input.component';

@NgModule({
	declarations: [
		AppComponent,
		InitPlotDataComponent,
		PlotComponent,
		NumberInputComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
