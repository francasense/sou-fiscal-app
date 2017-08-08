import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions, Response, Request } from '@angular/http';
import "rxjs/add/operator/map";
import {ReplaySubject} from "rxjs";
import {Storage} from "@ionic/storage";
import {JwtHelper, AuthHttp} from "angular2-jwt";
import {SERVER_URL} from "../../config";
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AddreclamacaoPage } from "../../pages/addreclamacao/addreclamacao";
import { AlertController } from "ionic-angular";
declare const Buffer

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }
}
@Injectable()
export class AuthProvider {
    anonimo = false;
  ativar_menu = false;
  [x: string]: any;//user_id
  emailTEMP: string
  public token: string;
  public imageTEMP: string;
  authUser = new ReplaySubject<any>(1);
  public tk:string;
  private apiUrl = 'url-api';
  //private apiUrl = 'url-api';

  constructor(private readonly http: Http,
              private readonly authHttp: AuthHttp,
              private readonly storage: Storage,
              public alertCtrl: AlertController,
           //   private readonly addreclamacao: AddreclamacaoPage,
              private readonly jwtHelper: JwtHelper) {
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
  }

  checkLogin() {
    this.storage.get('jwt').then(jwt => {

      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.authHttp.get(`url-api`)
          .subscribe(() => this.authUser.next(jwt),
            (err) => this.storage.remove('jwt').then(() => this.authUser.next(null)));
        // OR
        // this.authUser.next(jwt);
      }
      else {
        this.storage.remove('jwt').then(() => this.authUser.next(null));
      }
    });
  }




  

  logouta() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {
    return this.http.post(`url-api`, values)
      .map(response => response.text())
      .map(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        else {
          return jwt;
        }
      });
  }

  private handleJwtResponse(jwt: string) {
    this.tk = jwt
    
    return this.storage.set('jwt', jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }



//LOGIN
teste(email: string, password: string){
  //this.anonimo = false;
  let body = JSON.stringify({
    email: email,
    password: password
  });
  
    this.emailTEMP = email
    let headers = new Headers({
    "content-type": "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    this.http
        .post('url-api', body, options)
        .map(response => response.text())
        .map(jwt => this.handleJwtResponse(jwt))
        .subscribe(
            data => {
              this.ativar_menu = true;
            },
            err => {
              let alert = this.alertCtrl.create({
              title: 'ATENÇÃO!',
              subTitle: 'Caso não esteja acessando como anônimo. Verifique seu usuário e senha!',
              buttons: ['OK']
              });
              alert.present();
             // console.log("ERROR!: ", err);
            }
        );
}

    logout() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
    //this.user = this.jwtHelper.decodeToken(token).username;
    this.storage.remove('token');
    this.user = null;
  }



inserir_reclamacao(data){
  //console.log(data.dada_termino);

  let body = JSON.stringify({
    
     name: data.name,
     detail: data.detail,
     initial_value: data.initial_value,
     initial_date: data.initial_date,
     delivery_forecast: data.delivery_forecast,
     latitude: data.latitude,
     longitude: data.longitude,
     user_id: data.user_id,
     contract: this.imageTEMP,
     status: 'v' 

    });
    const objeto_retorno = JSON.parse(this.tk);
    this.obj = objeto_retorno;
    let headers = new Headers({
    "content-type": "application/json",
    "authorization": this.obj.auth_token,
    
    });
    let options = new RequestOptions({ headers: headers });

    this.http
        .post(this.apiUrl, body, options)
        .map(res => res.json())
        .subscribe(
            data => {
                const toast = this.toastCtrl.create({
          message: 'Reclamação inserida com sucesso!',
          duration: 2500
        });
        toast.present();
            
              //console.log(data);
            },
            err => {
              
              let alert = this.alertCtrl.create({
              title: 'ATENÇÃO!',
              subTitle: 'Verifique todos os campos, lembre sempre de verificar sua conexão!',
              buttons: ['OK']
              });
              alert.present();
              //console.log("ERROR!: ", err);
            }
        );
       
}

gettt(){
    const objeto_retorno = JSON.parse(this.tk);
    this.obj = objeto_retorno;
    console.log("ID DO USUARIO",this.tk);
    let headers = new Headers({
    "content-type": "application/json",
    "authorization": this.obj.auth_token,
    
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiUrl, options)
        .map(res => res.json());

   }

 //Carrega a listagem de Fotos

getphotos() {

    return new Promise(resolve => {
       //this.http.get('url-api',options)
      this.http.get('url-api')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }
  // Adiciona novas fotos
  addPhoto(photo) {
   //alert(photo);
    return new Promise(resolve => {
      this.http.post('url-api', {'pic': {'photo': photo}})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          //alert("data    = "+this.data);
          resolve(this.data);
        });
    });
  }





  capturar_id_usuario(){
    const objeto_retorno = JSON.parse(this.tk);
    this.obj = objeto_retorno;
    console.log("ID DO USUARIO",this.tk);
    let headers = new Headers({
    "content-type": "application/json",
    "authorization": this.obj.auth_token,
    
    });
    let options = new RequestOptions({ headers: headers });

      return this.http.get('url-api', options)
        .map(res => res.json());

   }

   receberlink(foto){
    this.imageTEMP = foto;
   }

//LOGIN
testea(){
  

  let body = JSON.stringify({
    email: 'email',
    password: 'senha'
  });
  
    this.emailTEMP = 'email'
    let headers = new Headers({
    "content-type": "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    this.http
        .post('url-api', body, options)
        .map(response => response.text())
        .map(jwt => this.handleJwtResponse(jwt))
        .subscribe(
            data => {
            },
            err => {
              
             // console.log("ERROR!: ", err);
            }
        );
}
teste_anonimo(anonimo){
this.anonimo = anonimo;
console.log("teste de anonimo no auth ",this.anonimo);
}
  
   }
