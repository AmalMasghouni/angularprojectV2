import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
 
})
export class RegisterComponent implements OnInit {
 
  constructor(private fb: FormBuilder, private http: HttpClient,private Route:Router ){}
  RegisterDto={
    nom:"",
    prenom:"",
    email:"",
    password:""

  }
  registrationForm = this.fb.group({
    nom : ['', Validators.required],
    prenom : ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@actia-engineering\.tn$/)]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
    ]]
  });
  ngOnInit(): void { }
  
OnSubmit(){
  if (this.registrationForm.controls.email.invalid || !this.registrationForm.controls.email.value?.endsWith('@actia-eng.com')) {
   
    if (this.registrationForm.controls.password.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifier les champs ',
       
      })
  }
    
    }
 
 
  const formData = this.registrationForm.value;
  const registerDto = {
    firstName:formData.nom,
    lastName:formData.prenom,
    email:formData.email,
    password: formData.password};
  this.http.post('http://localhost:8080/api/auth/register', registerDto).subscribe(
    response => {console.log('User  registred  successfully');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Compte crée',
      showConfirmButton: false,
      timer: 1500
    });
    this.Route.navigate(['/changer-mdp']);
  },
   
    error => {console.error('Error registering user', error);
   /* Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Un compte avec cette adresse email existe déja',
     
    })*/}
  );

  }}

  
