import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import{Row} from './interfaces';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-essai',
  templateUrl: './essai.component.html',
  styleUrls: ['./essai.component.css']
})
export class EssaiComponent implements OnInit {

  constructor(private router:Router,private modalService: NgbModal,
    private fb: FormBuilder, private http: HttpClient,private _ser:LoginServiceService){}
    optionsMarque:any;
    selectedOptionMarque:any;
  vehicule:any
      filter = new FormControl('');
  ngOnInit(): void { 
    this._ser.getAllMarque().subscribe(res => {
      console.log(res);
      this.optionsMarque = res;
      console.log(this.optionsMarque);
      
    },
    err => console.log("Erreur : " + err));
      
      this.http.get<any[]>('http://localhost:8080/api/auth/getallVoiture').subscribe(
      response => {
        console.log(response); // afficher la réponse dans la console
        this.vehicule = response;
        },
      error => {
        console.error(error); // afficher l'erreur dans la console
      }
    );
  }
  
  open(content:any) {this.modalService.open(content, { centered: true });}
  vehiculeForm = this.fb.group({
    marque: [''],
    groupe :[''] ,
    code: [''], 
    nom: [''],
    nomInterne: [''],
    message: [''],
    de: [''],
    a: [''],
    testGlobal: [''],
    seulementElectrique: [''],
    avertissementElectrique: ['']
  });
  OnSubmit(){
    
    const formData=this.vehiculeForm.value;
    
   const vehiDto = {
     nomVeh: formData.nom,
     nomInterne: formData.nomInterne,
     testGlobal: formData.testGlobal,
     msgDiag: formData.message,
     grpMarq: formData.marque,
     fro: formData.de,
     t: formData.a,
     onlyElec: formData.seulementElectrique,
     avertissElec: formData.avertissementElectrique,
     marque: formData.code,
   };
   
   console.log(vehiDto);
   this.http.post('http://localhost:8080/api/auth/ajout-vehicule', vehiDto).subscribe(
     response => {console.log('vehicule ajoute  successfully');
     
     Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: 'Véhicule ajoutée !',
       showConfirmButton: false,
       timer: 1500
     });
     window.location.reload();
   },
    
     error => {console.error('Error ', error);}
   );
   
   }
   
  }

  

