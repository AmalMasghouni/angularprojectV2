import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-changer-mdp',
  templateUrl: './changer-mdp.component.html',
  styleUrls: ['./changer-mdp.component.css']
})
export class ChangerMdpComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private fb: FormBuilder , private Route:Router,private http:HttpClient){}
changermotdepasseForm = this.fb.group({
  email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@actia-engineering\.tn$/)]],
  mdpgenere: ['', [Validators.required, Validators.minLength(8)]],
  nouveaumdp: ['', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
  ]],
  resetnouveaumdp: ['', [Validators.required, Validators.minLength(8)]]
});
OnSubmit(){
  const formData = this.changermotdepasseForm.value;
const resetDto = {
  email:formData.email,
  mdpgenere: formData.mdpgenere,
  nouveaumdp:formData.nouveaumdp,
  resetnouveaumdp:formData.resetnouveaumdp
};
this.http.post('http://localhost:8080/api/auth/changer-mdp', resetDto).subscribe(
  
  response => {console.log('Mot de passe change ');
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Votre mot de passe a étè changé',
    showConfirmButton: false,
    timer: 1500
  });
  this.Route.navigate(['/login']);
},
 
  error => {console.error('Error registering user', error);
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Veuillez vérifier vos coordonnées',
   
  })
}
);
}

}
