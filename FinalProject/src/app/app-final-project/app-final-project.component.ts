import { Component, OnInit, ViewChild } from '@angular/core';
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
    @ViewChild('tabs') tabs;
    @ViewChild('selectpicker') selectpicker;
    activeTab = 'yaziOzeti';
    select = '';
    fileSelect: string = "Select File";

    yaziOzeti(activeTab) {
        this.activeTab = activeTab;
    }

    linkOzeti(activeTab) {
        this.activeTab = activeTab;
    }

    dosyaOzeti(activeTab) {
        this.activeTab = activeTab;
    }

    selector(select) {
        this.select = select;
        console.log(select);
    }


    message = 'Natural Language Processing';
    baslik = '';
    ozet = '';
    ozetLink = '';
    link = '';
    ozetFile = '';
    files = null;

    public model: Ozet;
    public show: boolean = false;
    public showLinkOzet: boolean = false;
    public showFileOzet: boolean = false;
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
                    var o = Ozet.create(val) + "";
                    var sentences = o.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
                    var txt = "";
                    sentences.forEach(element => {
                        txt += element + "\n";
                    });
                    this.ozet = txt;

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


    registerLink(form: NgForm) {
        this.show2 = true;
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
        // debugger;
        this.http.post<any>("http://localhost:8080/news/addLink", {
            "url": form.value['url'],
            "brand": this.select
        })
            .subscribe(
                (val) => {
                    console.log("POST call successful value returned in body",
                        val);
                    this.show2 = false;
                    this.showLinkOzet = true;
                    var o = Ozet.create(val) + "";
                    var sentences = o.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
                    var txt = "";
                    sentences.forEach(element => {
                        txt += element + "\n";
                    });

                    this.ozetLink = txt;
                    //  this.ozet = Ozet.create(val);
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

    onFileChange(event) {
        let reader = new FileReader();
        this.files = event.target.files;
        let fileName = this.files[0].name;
        console.log(fileName);
        this.fileSelect = fileName;
    }

    submitFile() {
        let file = this.files[0];
        console.log(file);
        console.log(file.name);

        this.show2 = true;
        // debugger;

        const formData = new FormData();

        formData.append('file', file, file.name);
        this.http.post('http://localhost:8080/news/addFile', formData).subscribe(
            data => console.log(data),
            err => console.log(err)
        );

    }

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {

    }

}
