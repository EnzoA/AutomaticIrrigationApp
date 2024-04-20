import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  login = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router, private _loginService: LoginService
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this._loginService.login(this.login.username, this.login.password).pipe(
        take(1),
        tap(_ => {
          this.login = { username: '', password: '' };
          this.submitted = false;
          form.resetForm();
        })
      ).subscribe();
    }
  }
}
