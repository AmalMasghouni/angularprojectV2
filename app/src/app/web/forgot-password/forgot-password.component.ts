import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder ,private _ser:LoginServiceService, private Route:Router,private http:HttpClient){ }
  forgotpasswordForm = this.fb.group({ email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@actia-engineering\.tn$/)]]});
  
   
  ngOnInit(): void {
    
  }
  
  OnSubmit(){
  const formData = this.forgotpasswordForm.value;
  const registerDto = {
   email: formData.email};
  this.http.post('http://localhost:8080/api/auth/mot-de-passe-oublie', registerDto)
  .subscribe(
    response => {console.log('User registered successfully');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Si on trouve votre adresse mail on va vous envoyé un mail',
      showConfirmButton: false,
      timer: 1500
    });
    this.Route.navigate(['/login']);
  },
   
    Error=> {console.error('Error registering user', Error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Veuillez vérifier vos coordonnées',
     
    })
  }
  );
  
  
  }
}
