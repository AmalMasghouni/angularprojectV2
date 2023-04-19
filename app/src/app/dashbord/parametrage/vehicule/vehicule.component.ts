import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { LoginComponent } from 'src/app/web/login/login.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  //var pour Marque
  optionsMarque:any;
  selectedOptionMarque:any;


  filteredVehicules: any;
  constructor(private router:Router,private modalService: NgbModal,
    private fb: FormBuilder, private http: HttpClient,private _ser:LoginServiceService ){}
    vehicule:any
    filter = new FormControl('');
  ngOnInit():void
  
  {this._ser.getAllMarque().subscribe(res => {
    console.log(res);
    this.optionsMarque = res;
    console.log(this.optionsMarque);
    
  },
  err => console.log("Erreur : " + err));
    
    this.http.get<any[]>('http://localhost:8080/api/auth/getallVoiture').subscribe(
    response => {
      console.log(response); // afficher la réponse dans la console
      this.vehicule = response;
      this.filter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
       this.applyFilter();
  }); // affecter la réponse à la variable voitures pour l'affichage dans le template
    },
    error => {
      console.error(error); // afficher l'erreur dans la console
    }
  );
  
}
 
  open(content:any) {
 
    this.modalService.open(content, { centered: true });
  }
  openEditModal(content:any, index:any) {
    const voiture = this.vehicule[index];
    console.log(voiture)
    this.modalService.open(content, { centered: true });
   this.vehiculeForm.setValue({
      marque:voiture.grpMarq,
      groupe: '',
      code:voiture.marque,
      nom:voiture.nomVeh,
      nomInterne:voiture.nomInterne,
      message:voiture.msgDiag,
      de:voiture.fro,
      a: voiture.t,
      testGlobal:voiture.testGlobal,
      seulementElectrique:voiture.onlyElec,
      avertissementElectrique:voiture.avertissElec
    });
    
  }
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
  updateRadio(radioName: string) {
    const radios = ['testGlobal', 'seulementElectrique', 'avertissementElectrique'];
    radios.filter(radio => radio !== radioName).forEach(radio => {
      this.vehiculeForm.get(radio)?.setValue(false);
    });
  }
  OnSubmit(){
    
 const formData=this.vehiculeForm.value;
 

if (formData.testGlobal) {
  this.updateRadio('testGlobal');
} else if (formData.seulementElectrique) {
  this.updateRadio('seulementElectrique');
} else if (formData.avertissementElectrique) {
  this.updateRadio('avertissementElectrique');
}
const vehiDto = {
  nomVeh: formData.nom,
  nomInterne: formData.nomInterne,
  marque: formData.code,
  testGlobal: formData.testGlobal,
  msgDiag: formData.message,
  grpMarq: formData.marque,
  fro: formData.de,
  t: formData.a,
  onlyElec: formData.seulementElectrique,
  avertissElec: formData.avertissementElectrique
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


ModiferVeh(){
  const formData=this.vehiculeForm.value;
  const updatedFormData = {
   ...formData,
   testGlobal: true,
   seulementElectrique: true,
   avertissementElectrique: true
 };
 
 if (updatedFormData.testGlobal) {
   updatedFormData.seulementElectrique = false;
   updatedFormData.avertissementElectrique = false;
 }
 
 if (updatedFormData.seulementElectrique) {
   updatedFormData.testGlobal = false;
   updatedFormData.avertissementElectrique = false;
 }
 
 if (updatedFormData.avertissementElectrique) {
   updatedFormData.testGlobal = false;
   updatedFormData.seulementElectrique = false;
 }
 
 // vérification des options sélectionnées
 
 
 const vehiDto = {
   nomVeh: formData.nom,
   nomInterne: formData.nomInterne,
   codeVeh: formData.code,
   testGlobal: formData.testGlobal,
   msgDiag: formData.message,
   grpMarq: formData.marque,
   fro: formData.de,
   t: formData.a,
   onlyElec: formData.seulementElectrique,
   avertissElec: formData.avertissementElectrique
 };
 
 console.log(vehiDto);
 this.http.put('http://localhost:8080/api/auth/update-vehicule', vehiDto).subscribe(
   response => {console.log('vehicule modifier');
   Swal.fire({
     position: 'top-end',
     icon: 'success',
     title: 'Véhicule modifiée !',
     showConfirmButton: false,
     timer: 1500
   });
   window.location.reload();
  
 },
  
   error => {console.error('Error ', error);}
 );
 
}



applyFilter() {
  const filterValue = this.filter.value
  this.filteredVehicules = this.vehicule.filter((voiture: any) => {
    return (
      voiture.grpMarq.toLowerCase().includes(filterValue) ||
      voiture.codeVeh.toString().includes(filterValue) ||
      voiture.nomVeh.toLowerCase().includes(filterValue) ||
      voiture.nomInterne.toLowerCase().includes(filterValue) ||
      (voiture.testGlobal ? 'true' : 'false') ||
      voiture.msgDiag.toLowerCase().includes(filterValue) ||
      voiture.fro.toString().includes(filterValue) ||
      voiture.t.toString().includes(filterValue) ||
      voiture.onlyElec.includes(filterValue) ||
      voiture.avertissElec.includes(filterValue)
    );
  });
}
}
