import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../dashbord/creer-consulter/interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {


  private url='http://localhost:8080/';
  constructor(private http:HttpClient) { }
  login(UserData:any){
    return this.http.post(this.url+ 'api/auth/login',UserData);
  }
  isLoggedIn(){
    let token=localStorage.getItem('token');
    if(token){
return true;
    }
    else{
      return false;
    }
  }
  forgotpassword(email:String): Observable<any> {
    const baseurl = `${this.url}api/auth/mot-de-passe-oublie`
    return this.http.post(baseurl, { email });
  }
  changermdp(UserData:any){
    return this.http.post(this.url+'api/auth/changer-mdp',UserData);
  }
  public checkPasswordChanged(email: string):Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/auth/check-password-changed?email=${email}`);
  }
  getDevs(): Observable<any[]> { // méthode qui récupère les données pour chaque colonne
    return this.http.get<any[]>(this.url+'api/auth/getTabCreerConsulter'); // remplacer "votre-api-endpoint" par le nom de l'endpoint de votre API qui retourne les données pour chaque colonne
  }
  getMyModels(): Observable<any> {
    return this.http.get(this.url+'api/auth/mymodels');
  }
  getallNonDev(): Observable<any> {
    return this.http.get(this.url+'api/auth/getdev');
  }
  getallRefCdc(): Observable<any> {
    return this.http.get(this.url+'api/auth/getrefcdc');
  }
  getAllNomSite(): Observable<any>
  { return this.http.get(this.url+'api/auth/getAllNomSite');}
  getAllVersion(): Observable<any>
  { return this.http.get(this.url+'api/auth/getAllVersion');}
  getAllMarque(): Observable<any>
  { return this.http.get(this.url+'api/auth/getAllMarque');}
  getAllModele(): Observable<any>
  { return this.http.get(this.url+'api/auth/getAllModele');}
 

  FiltreCreerConsulter(Data:any){
    return this.http.post(this.url+'api/auth/filtrer',Data);
  }
}
