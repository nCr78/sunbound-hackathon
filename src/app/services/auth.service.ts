import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Auth,
  User,
  user,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public fbUser: User;
  public fbUser$: Observable<User | null>;

  constructor(private fireAuth: Auth, private router: Router) {
    user(fireAuth).subscribe(usr => this.fbUser = usr);
    this.fbUser$ = user(fireAuth);
  }

  public login(username: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.fireAuth, username, password)
      .then(userCred => {
        if (!userCred.user) {
          throw Error('Login failed');
        }
      });
  }

  public logout(): Promise<void> {
    return this.fireAuth.signOut();
  }

  public loginWithEmailLink(email: string, link: string): Promise<void> {
    return signInWithEmailLink(this.fireAuth, email, link)
      .then(userCred => {
        if (!userCred.user) {
          throw Error('Login failed');
        }
      });
  }

  loginWithGoogle() {
    return signInWithPopup(this.fireAuth, new GoogleAuthProvider());
  }

  /**
   * Sends a link to the user's e-mail, if it exists.
   *
   * @param email The user's email.
   */
  public sendPasswordResetEmail(email: string): Promise<void> {
    return sendPasswordResetEmail(this.fireAuth, email);
  }

  /**
   * Sends a link to the user's e-mail, if it exists.
   *
   * @param code The password reset link token.
   * @param newPassword The new password.
   */
  public confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    return confirmPasswordReset(this.fireAuth, code, newPassword);
  }
}
