import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/internal/operators/map';
import { Ozet } from './ozet';
import { HaberService } from './haber.service';


@Component({
    selector: 'app-app-final-project',
    templateUrl: './app-final-project.component.html',
    styleUrls: ['./app-final-project.component.css'],
    providers: [HaberService]
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
    fileTitle = '';
    fileTxt = '';
    txtTitle;
    txt = '';
    rangeValue = 50;

    public model: Ozet;
    public show: boolean = false;
    public showLinkOzet: boolean = false;
    public showFileOzet: boolean = false;
    public show2: boolean = false;

     register(form: NgForm) {
        this.show2 = true;
        let t = form.value['title'];
        let c = form.value['context'];
        let r = this.rangeValue;
        this.haberService.getYaziOzeti(t, c, r, 'addHaber')
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

        let u =form.value['url'];
        let b = this.select;
        this.haberService.getLinkOzeti(u, b,  'addLink')
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
        this.files = event.target.files;
        let fileName = this.files[0].name;
        this.fileSelect = fileName;
    }


    storeResults(result) {
        this.txt = result;

        const lines = this.txt.split('\n');
        this.fileTitle = lines[0];
        this.fileTxt = "";
        for (let line = 1; line < lines.length; line++) {
            this.fileTxt += lines[line];
        }

        let fT= this.fileTitle;
        let fTxt= this.fileTxt;
        this.show2 = true;
        this.haberService.getDosyaOzeti(fT, fTxt,  'addFile')
            .subscribe(
                (val) => {
                    console.log("POST call successful value returned in body",
                        val);
                    this.show2 = false;
                    this.showFileOzet = true;
                    var o = Ozet.create(val) + "";
                    var sentences = o.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
                    var txt = "";
                    sentences.forEach(element => {
                        txt += element + "\n";
                    });

                    this.ozetFile = txt;
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

    registerFile() {
        const reader = new FileReader();
        reader.readAsText(this.files[0], 'UTF-8');
        reader.onload = () => this.storeResults(reader.result);
    }



    range(event) {
        this.rangeValue = event;
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

    constructor(private http: HttpClient, private haberService: HaberService) {

    }

    ngOnInit(): void {

    }

}
