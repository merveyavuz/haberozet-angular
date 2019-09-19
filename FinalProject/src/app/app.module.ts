import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppFinalProjectComponent } from './app-final-project/app-final-project.component';
import { HttpClientModule } from '@angular/common/http';
import { HaberService } from './app-final-project/haber.service';



@NgModule({
    declarations: [
        AppComponent,       
        AppFinalProjectComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [HaberService],
    bootstrap: [AppComponent]
})
export class AppModule { }
