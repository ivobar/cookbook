import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token = '';

  constructor(private router: Router) {
  }

  loginUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        () => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                this.router.navigate(['/']);
              },
              (rej) => {
                alert(rej.message);
              }
            );
        },
        (rej) => {
          alert(rej.message);
        }
      );
  }

  registerUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                this.router.navigate(['/']);
              },
              (rej) => {
                alert(rej.message);
              }
            );
        },
        (rej) => {
          alert(rej.message);
        }
      );
  }

  logoutUser() {
    firebase.auth().signOut()
      .then(
        () => {
          this.token = '';
          this.router.navigate(['/']);
        },
        (rej) => {
          alert(rej.message);
        }
      );
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
