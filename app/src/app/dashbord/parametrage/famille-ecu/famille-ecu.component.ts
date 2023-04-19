import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-famille-ecu',
  templateUrl: './famille-ecu.component.html',
  styleUrls: ['./famille-ecu.component.css'], 
  providers: [DatePipe]
})
export class FamilleEcuComponent implements OnInit{
  datePipe: any;
  constructor(private fb: FormBuilder,private router:Router,private modalService: NgbModal,private http:HttpClient){}
  famille:any;
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/auth/getAllFamille').subscribe(res=>{
      this.famille=res;
      console.log(res);
    },
      err=>{console.error(err)})
   }
   open(content:any) {this.modalService.open(content, { centered: true });}
   familleForm=this.fb.group({
    nom: [''],
    descriptionFr: [''],
    phrase: [''],
  descriptionEn: [''],
  ordre: [''],
  update: [''],
  gmf: [''],
  spf: [''],
})
OnSubmit(){
  const formData=this.familleForm.value;
  //const updateDate = this.datePipe.transform(formData.update, 'yyyy-MM-dd');
 
  const FamilleDto={
    nomFamille:formData.nom,
    description:formData.descriptionFr,
    phrase:formData.phrase,
    descrAnglais:formData.descriptionEn,
    ordre:formData.ordre,
    update:formData.update,
    guidedMethFilter:formData.gmf,
    sparePartsFilter:formData.spf
  };
  console.log(FamilleDto)
  this.http.post('http://localhost:8080/api/auth/ajout-famille', FamilleDto).subscribe(
  response => {console.log('famille  ajoute  successfully');
  window.location.reload();
},
 
  error => {console.error('Error ', error);}
);
  
}
}
