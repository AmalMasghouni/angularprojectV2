import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';

import { HomeCComponent } from './Home/home-c/home-c.component';
import { ChangerMdpComponent } from './web/changer-mdp/changer-mdp.component';
import { ForgotPasswordComponent } from './web/forgot-password/forgot-password.component';
import { LoginComponent } from './web/login/login.component';
import { RegisterComponent } from './web/register/register.component';
import { CreerConsulterComponent } from './dashbord/creer-consulter/creer-consulter.component';
import { EssaiComponent } from './dashbord/essai/essai.component';
import { ParametrageComponent } from './dashbord/parametrage/parametrage.component';
import { VehiculeComponent } from './dashbord/parametrage/vehicule/vehicule.component';
import { CdcComponent } from './dashbord/parametrage/cdc/cdc.component';
import { FamilleEcuComponent } from './dashbord/parametrage/famille-ecu/famille-ecu.component';
import { AdaptateurComponent } from './dashbord/parametrage/adaptateur/adaptateur.component';


import { ModificationComponent } from './dashbord/modification/modification.component';
import { ModifierVehiculeComponent } from './dashbord/modification/modifier-vehicule/modifier-vehicule.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'mot-de-passe-oublie',component:ForgotPasswordComponent},
  {path:'home',component:DashbordComponent,children:[
    {path:'creer-consulter',component:CreerConsulterComponent},
    {path:'essai',component:EssaiComponent},
    {path:'parametrage',component:ParametrageComponent,children:[
      {path:'gestion-vehicules',component:VehiculeComponent},
      {path:'gestion-cdc',component:CdcComponent},
      {path:'gestion-famille-ecu',component:FamilleEcuComponent},
      {path:'gestion-adaptateurs',component:AdaptateurComponent}
    ]},
   {path:'modification',component:ModificationComponent,children:[
    {path:'modifier-vehicule/:id',component:ModifierVehiculeComponent}
   ]}

  ]},
  {path:'changer-mdp',component:ChangerMdpComponent},
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
