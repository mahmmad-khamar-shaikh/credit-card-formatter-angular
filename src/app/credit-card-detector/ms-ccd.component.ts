import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { CreditCardDetectorService } from './ms-ccd.service';

@Component({
  selector: 'ms-ccd',
  templateUrl: './ms-ccd.component.html',
  styleUrls: ['./ms-ccd.component.css'],
  providers: [CreditCardDetectorService]
})
export class CardDetectorComponent implements OnInit {
  customCredtiCardFormGroup: FormGroup;
  cardImage: string='./assets/img/card-logo-unknown.svg';
  constructor(private _creditCardDetectorService : CreditCardDetectorService){

  }
  ngOnInit() {
    this.customCredtiCardFormGroup = new FormGroup({
      creditInfo: new FormControl('')
    });
  }
  restrictChar(event) {
    const code = (event.which) ? event.which : event.keyCode;

    if ((code < 48 || code > 57) && (code > 31)) {
      return false;
    }

    return true;
  }
  inputFormatter() {
    if (this.customCredtiCardFormGroup.get('creditInfo').value !== null) {
      const v = this.customCredtiCardFormGroup.get('creditInfo').value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = matches && matches[0] || '';
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
      }

      if (parts.length) {
        this.customCredtiCardFormGroup.get('creditInfo').setValue(parts.join(' '));
      }
    }
  }
carImageChooser(){
  if(this.customCredtiCardFormGroup.get('creditInfo').value!==null){
    const cardType=this.detectCard(this.customCredtiCardFormGroup.get('creditInfo').value);
    this.cardImage=this._creditCardDetectorService.getCardImage(cardType);
  }
}


  detectCard(number: string) {
    let re = new RegExp('^4');
    console.log('re' + number.match(re));
    if (number.match(re) != null) {
      return 'VISA';
    }

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
      return 'MASTERCARD';
    }

    // AMEX
    re = new RegExp('^3[47]');
    if (number.match(re) != null) {
      return 'AMEX';
    }
    // Discover
    re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
    if (number.match(re) != null) {
      return 'DISCOVER';
    }
    // Diners
    re = new RegExp('^36');
    if (number.match(re) != null) {
      return 'DINNER';
    }
    // Diners - Carte Blanche
    re = new RegExp('^30[0-5]');
    if (number.match(re) != null) {
      return 'Diners - Carte Blanche';
    }
    // JCB
    re = new RegExp('^35(2[89]|[3-8][0-9])');
    if (number.match(re) != null) {
      return 'JCB';
    }
    // Visa Electron
    re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
    if (number.match(re) != null) {
      return 'Visa Electron';
    }
    return 'DEFAULT';
  }
}
