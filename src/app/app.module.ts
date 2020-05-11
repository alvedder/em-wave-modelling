import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InitPlotDataComponent} from './components/init-plot-data/init-plot-data.component';
import {PlotComponent} from './components/plot/plot.component';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		InitPlotDataComponent,
		PlotComponent
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
