import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import{Filter }from './interface';
import { FormBuilder,FormGroup } from '@angular/forms';



@Component({
  selector: 'app-creer-consulter',
  templateUrl: './creer-consulter.component.html',
  styleUrls: ['./creer-consulter.component.css']
})

export class CreerConsulterComponent implements OnInit {
  selectItem:any;
  selectRow(dev: any) {
    this.selectItem = dev;
  }
  searchText:any;
  
  //var pour developpeur
  optionsDev:any;
  selectedOptionDev:any;
  //var pour ref cdc 
  optionsCdc:any;
 selectedOptionCdc:any;
//var pour Site
  optionsSite:any;
  selectedOptionSite:any;
   //var pour Version
   optionsVersion:any;
  selectedOptionVersion:any;
  //var pour Marque
  optionsMarque:any;
  selectedOptionMarque:any;
  //var pour Marque
  optionsModele:any;
  selectedOptionModele:any;
  //var pour affichage tableau 
  tableauDevs: any;
  constructor(private fb:FormBuilder ,private _ser:LoginServiceService, private http:HttpClient){}
  ngOnInit(): void {
    //Affichage du tableau 
    this._ser.getDevs().subscribe(res => {
      console.log(res);
      this.tableauDevs = res;
      console.log(this.tableauDevs);
 },
    err => console.log("Erreur : " + err)
  ); 
  //selectionner un developpeur
    this._ser.getallNonDev().subscribe(res => {
      console.log(res);
      this.optionsDev = res;
      console.log(this.optionsDev);
     
 },
    err => console.log("Erreur : " + err)
  );
  //selectionner une ref cdc
  this._ser.getallRefCdc().subscribe(res => {
    console.log(res);
    this.optionsCdc = res;
    console.log(this.optionsCdc);
   
},
  err => console.log("Erreur : " + err)
);
//selectionner un Site
this._ser.getAllNomSite().subscribe(res => {
  console.log(res);
  this.optionsSite = res;
  console.log(this.optionsSite);
  
},
err => console.log("Erreur : " + err));
//selectionner une version
this._ser.getAllVersion().subscribe(res => {
  console.log(res);
  this.optionsVersion = res;
  console.log(this.optionsVersion);
  
},
err => console.log("Erreur : " + err));
//selectionner une Marque
this._ser.getAllMarque().subscribe(res => {
  console.log(res);
  this.optionsMarque = res;
  console.log(this.optionsMarque);
  
},
err => console.log("Erreur : " + err));
//selectionner un Modele
this._ser.getAllModele().subscribe(res => {
  console.log(res);
  this.optionsModele = res;
  console.log(this.optionsModele);
   
},
err => console.log("Erreur : " + err));

  }
  form: FormGroup = this.fb.group({
    marque: [''],
    cdc: [''],
    modele:[''],
    dev:[''],
    version:[''],
    site:[''],
  });
 

selectedOptions: any[] = [];

onSelectCdc(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedOptionCdc = target.value;}

onSelectDev(event: Event): void { 
  const target = event.target as HTMLSelectElement;
  this.selectedOptionDev=target.value;
 
}
onSelectVersion(event: Event): void { 
  const target = event.target as HTMLSelectElement;
  this.selectedOptionVersion=target.value;
  
}
onSelectSite(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedOptionSite = target.value;}
onSelectModele(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedOptionModele = target.value;}
onSelectMarque(event: Event): void {
      const target = event.target as HTMLSelectElement;
this.selectedOptionMarque  = target.value;}
  
 

filtrer(){
 
  this.selectedOptions.push(this.selectedOptionCdc, this.selectedOptionDev,this.selectedOptionVersion,this.selectedOptionMarque,this.selectedOptionModele,this.selectedOptionSite);
  const filters = this.selectedOptions.reduce((obj, item, index) => {
    const key = ['cdc', 'dev', 'version', 'marque', 'modele', 'site'][index];
    obj[key] = item;
    return obj;
  }, {});
  console.log(filters);
 
  this._ser.FiltreCreerConsulter(filters).subscribe(
    res=>{console.log("succes")
    this. tableauDevs = res;}
    ,
    err=>{console.log(err)});
  console.log(this.selectedOptions);
  this.form.reset();
  this.selectedOptionCdc="";
  this.selectedOptionDev="";
  this.selectedOptionVersion="";
  this.selectedOptionMarque="";
  this.selectedOptionModele="";
  this.selectedOptionSite="";
  this.selectedOptions = [];
 
}

resetFilters() {
  this.form.reset();
  this.selectedOptionCdc="";
  this.selectedOptionDev="";
  this.selectedOptionVersion="";
  this.selectedOptionMarque="";
  this.selectedOptionModele="";
  this.selectedOptionSite="";

  
}



}