import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIz7s7FLyF2RMR9OZ6Y-ld-sw7BUiInQU',
      authDomain: 'cookbook-e21a4.firebaseapp.com'
    });
  }
}
