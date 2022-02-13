import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  forgotPassword = new FormControl('', [Validators.required, Validators.email]);
  newPassword = new FormControl('', [this.passwordRegexValidator(), Validators.required, Validators.max(50)]);
  newRePassword = new FormControl('', [this.passwordMatchValidator(), Validators.required, Validators.max(50)]);
  resetCode: string;

  showSpinner = false;
  isForgotPasswordMode = false;
  isForgotPasswordModeSuccess = false;
  isResetPasswordMode = false;
  isResetPasswordModeSuccess = false;
  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  private processing: boolean;

  constructor(private authSrv: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: ToastController) {
    this.showSpinner = false;
  }

  getErrorMessageEmail(email: AbstractControl): string {
    return email.hasError('required') ? 'EMAIL_REQUIRED' :
      email.hasError('email') ? 'EMAIL_INVALID' : '';
  }

  usernameAndPasswordError(): string {
    return 'PASSWORD_REQUIRED';
  }

  ngOnInit(): void {
    this.processing = false;
    this.showSpinner = false;
    // eslint-disable-next-line max-len
    // localhost:4200/login?token=eyJlbWFpbCI6Imc5TjRWODdVcEFLZ3ExU1dEdnNrLWxlZnRlcmlzQG1lbnUucGxhY2UiLCJsaW5rIjoiaHR0cHM6Ly9xci1tZW51LTEzMzcuZmlyZWJhc2VhcHAuY29tL19fL2F1dGgvYWN0aW9uP21vZGU9c2lnbkluJm9vYkNvZGU9akpyMmNCTWRacU9ST2JzV1VHQU01aW1BamNIODZFR2pmS1F0RGxEVmp5QUFBQUYwNi1XQjZRJmFwaUtleT1BSXphU3lDMnNfZlhRclBsUHNLUjdBNVFuLVJnWG1HZmlpLTZ2WHMmY29udGludWVVcmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTQyMDAlMkZ3YWl0ZXImbGFuZz1lbiJ9
    // TODO: get token from URL and login with email if available.
    this.route.queryParamMap.subscribe(paramMap => {
      const token = paramMap.get('token');
      const mode = paramMap.get('mode');
      this.resetCode = paramMap.get('oobCode');
      if (token) {
        this.loginWithEmailLink(token).then(r => console.log(r));
      } else if (mode && this.resetCode && mode === 'resetPassword') {
        this.isForgotPasswordMode = false;
        this.isForgotPasswordModeSuccess = false;
        this.isResetPasswordModeSuccess = false;
        this.isResetPasswordMode = true;
      }
    });
  }

  fixAutoFill(usr: Event, pwd): void {
    if (usr) { this.loginFormGroup.controls.username.setValue((usr.target as HTMLInputElement).value); }
    if (pwd) { this.loginFormGroup.controls.password.setValue(pwd); }
  }

  login(): void {
    this.showSpinner = true;
    this.authSrv.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password)
      .then(
        () => this.router.navigate([''], { replaceUrl: true }).then(e => this.showSpinner = false),
        () => {
          this.showSpinner = false;
          this.snackBar.create({
            message: 'USERNAME_PASSWORD_INVALID',
            duration: 7800});
        },
      );
  }

  loginWithEmailLink(token: string): Promise<boolean | void> {
    const {email, link} = this.decodeUrlString(token);
    // TODO: provide error to UI if scan fails.
    return this.authSrv.loginWithEmailLink(email, link)
      .then(
        () => this.router.navigate(['/tabs/tab1']),
        (e) => {
          console.error(e);
          this.showSpinner = false;
          this.snackBar.create({
            message: 'EMAIL_LOGIN_ERROR',
            duration: 7800});
        });
  }

  decodeUrlString(url): { email: string; link: string } {
    const json = atob(decodeURIComponent(url)).toString();
    let lgObj: { email: string; link: string };
    try {
      lgObj = JSON.parse(json);
    } catch (e) {
      localStorage.clear();
      return null;
    }
    return lgObj;
  }

  sendPasswordResetEmail(email: string): void {
    this.showSpinner = true;
    this.authSrv.sendPasswordResetEmail(email)
      .then(() => {
        this.isForgotPasswordModeSuccess = true;
      })
      .catch(e => {
        console.error(e);
        this.snackBar.create({
          message: 'PASSWORD_RESET_ERROR',
          duration: 7800});
      })
      .finally(() => this.showSpinner = false);
  }

  passwordRepeat(): boolean {
    const pass = this.newPassword?.value;
    const repass = this.newRePassword?.value;
    return pass && repass && pass === repass;
  }

  invalidPassword(): boolean {
    const pass = this.newPassword?.value;
    return pass?.match(/^(?=.*\d)(?=.*[a-z])(?=.*).{8,}$/);
  }

  passwordRegexValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => !this.invalidPassword()
        ? {invalid: 'PASSWORD_INVALID'}
        : null;
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => !this.passwordRepeat()
        ? {matches: 'PASSWORD_MATCH'}
        : null;
  }

  getPasswordErrorMessage(): string {
    const pass = this.newPassword;
    const repass = this.newRePassword;
    if (pass.hasError('required')) {
      return 'PASSWORD_REQUIRED';
    }
    return (pass.hasError('invalid') || repass.hasError('invalid'))
      ? 'PASSWORD_INVALID'
      : '';
  }

  getRePasswordErrorMessage(): string {
    const pass = this.newPassword;
    const repass = this.newRePassword;
    return (pass.hasError('matches') || repass.hasError('matches'))
      ? 'PASSWORD_MATCH'
      : '';
  }

  confirmPasswordReset(password: string): void {
    if (!this.passwordRepeat()) {
      this.snackBar.create({
        message: 'PASSWORD_MATCH',
        duration: 7800});
      return;
    }
    if (!this.resetCode) {
      this.snackBar.create({
        message: 'NO_RESET_TOKEN',
        duration: 7800});
      return;
    }
    this.showSpinner = true;
    this.authSrv.confirmPasswordReset(this.resetCode, password)
      .then(() => {
        this.isResetPasswordModeSuccess = true;
      })
      .catch(e => {
        console.error(e);
        this.snackBar.create({
          message: 'PASSWORD_RESET_ERROR_CONTACT',
          duration: 7800});
      })
      .finally(() => this.showSpinner = false);
  }
}
