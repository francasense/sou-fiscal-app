import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {CadastrarPage} from "../cadastrar/cadastrar";
import {AuthProvider} from "../../providers/auth/auth";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'page-logar',
  templateUrl: 'logar.html'
})
export class LogarPage {
  toke = '';

  constructor(private readonly navCtrl: NavController,
              private readonly authProvider: AuthProvider) {
                this.toke = this.authProvider.tk;
console.log("RESULTADO",this.toke);
  }

  signup() {
    this.navCtrl.push(CadastrarPage);
  }

  login(form: NgForm) {
        this.authProvider.logout();
        this.authProvider.teste(form.value.email, form.value.password);
        
                this.authProvider.teste_anonimo(true);
    }
  logina() {
            this.authProvider.testea();

        this.authProvider.teste_anonimo(false);
        //
  }
}