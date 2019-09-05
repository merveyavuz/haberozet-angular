import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/internal/operators/map';
import { Ozet } from './ozet';

@Component({
    selector: 'app-app-final-project',
    templateUrl: './app-final-project.component.html',
    styleUrls: ['./app-final-project.component.css']
})

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule, HttpClientModule
    ],
    declarations: [],
    exports: [
        CommonModule
    ]

})

export class AppFinalProjectComponent implements OnInit {

    message = 'Natural Language Processing';
    baslik = '';
    ozet = '';
    public model: Ozet;
    public show: boolean = false;
    public show2: boolean = false;
    public loading = false;

    register(form: NgForm) {
        console.log(form.value);
        console.log(form.touched);
        console.log(form.submitted);
        this.show2 = true;
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
       // debugger;
        this.http.post<any>("http://localhost:8080/news/addHaber", {
            "baslik": form.value['title'],
            "icerik": form.value['context']
        })
            .subscribe(
                (val) => {
                    console.log("POST call successful value returned in body",
                        val);
                    this.show2 = false;
                    this.show = true;
                    this.baslik = form.value['title'];
                    this.ozet = Ozet.create(val);

                },
                response => {
                    this.show2 = false;
                    console.log("POST call in error", response);
                },
                () => {
                    this.show2 = false;
                    console.log("The POST observable is now completed.");
                });
    }
    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

}

