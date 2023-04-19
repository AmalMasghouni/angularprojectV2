import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule}from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './web/login/login.component';
import { RegisterComponent } from './web/register/register.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './web/forgot-password/forgot-password.component';
import { ChangerMdpComponent } from './web/changer-mdp/changer-mdp.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HeaderComponent } from './dashbord/header/header.component';
import { SidebarComponent } from './dashbord/sidebar/sidebar.component';
import { CreerConsulterComponent } from './dashbord/creer-consulter/creer-consulter.component';

import{Ng2SearchPipeModule}from 'ng2-search-filter';
import { EssaiComponent } from './dashbord/essai/essai.component';
import{AgGridModule} from 'ag-grid-angular';
import { ParametrageComponent } from './dashbord/parametrage/parametrage.component';
import { VehiculeComponent } from './dashbord/parametrage/vehicule/vehicule.component';
import { CdcComponent } from './dashbord/parametrage/cdc/cdc.component';
import { AdaptateurComponent } from './dashbord/parametrage/adaptateur/adaptateur.component';
import { FamilleEcuComponent } from './dashbord/parametrage/famille-ecu/famille-ecu.component';

import { ModificationComponent } from './dashbord/modification/modification.component';
import { ModifierVehiculeComponent } from './dashbord/modification/modifier-vehicule/modifier-vehicule.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangerMdpComponent,
    DashbordComponent,
    HeaderComponent,
    SidebarComponent,
    CreerConsulterComponent,
    EssaiComponent,
   ParametrageComponent,
   VehiculeComponent,
   CdcComponent,
   AdaptateurComponent,
   FamilleEcuComponent,
 

   ModificationComponent,
   ModifierVehiculeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SearchPipeModule,
    AgGridModule,
    CommonModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
