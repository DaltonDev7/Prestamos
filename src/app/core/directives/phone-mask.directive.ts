import { NgControl } from '@angular/forms';
import { HostListener, Directive } from '@angular/core';


@Directive({
    selector: '[formControlName][appPhoneMask]',
  })
export class PhoneMaskDirective{


  constructor(public ngControl: NgControl) { }


  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }
  

  onInputChange(event, backspace) {
    let newVal = event.replace(/\D/g, '');
    // if (backspace && newVal.length <= 6) {
    //   newVal = newVal.substring(0, newVal.length - 1);
    // }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1'); 
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
    }
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}

/*
public isValidFlg:boolean = true;

validatePhoneNo(field) {
  var phoneNumDigits = field.value.replace(/\D/g, '');

  this.isValidFlg = (phoneNumDigits.length==0 || phoneNumDigits.length == 10);

  var formattedNumber = phoneNumDigits;
  if (phoneNumDigits.length >= 6)
    formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3, 6) + '-' + phoneNumDigits.substring(6);
  else if (phoneNumDigits.length >= 3)
    formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3);

  field.value = formattedNumber;
}


*/ 