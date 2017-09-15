import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/throw';
declare var require:any;
//const urlConfig = require('../url-provider.js');
@Injectable()
export class CreditCardDetectorService {
  constructor() {

  }
  getCardImage(key: string) {
    switch (key) {
      case 'VISA':
        return '../assets/img/card-logo-visa.svg';
      case 'AMEX':
        return '../assets/img/card-logo-amex.svg';
      case 'MASTERCARD':
        return '../assets/img/card-logo-mastercard.svg';
      default:
        return '../assets/img/card-logo-unknown.svg'
    }
  }
}
