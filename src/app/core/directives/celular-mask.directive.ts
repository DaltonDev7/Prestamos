import { NgControl } from '@angular/forms';
import { HostListener, Directive } from '@angular/core';


@Directive({
    selector: '[formControlName][appCelularMask]',
})
export class CelularMaskDirective {

    public isValidFlg: boolean = true;

    constructor(public ngControl: NgControl) { }


    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event);
    }

    // @HostListener('keydown.backspace', ['$event'])
    // keydownBackspace(event) {
    //     this.onInputChange(event.target.value, true);
    // }


    onInputChange(event) {

        var phoneNumDigits = event.replace(/\D/g, '');

        this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 10);

        var formattedNumber = phoneNumDigits;
        if (phoneNumDigits.length >= 6){
          formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3, 6) + '-' + phoneNumDigits.substring(6);
        }else if (phoneNumDigits.length >= 3){
          formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3);
        }

        event = formattedNumber;

        this.ngControl.valueAccessor.writeValue(event)

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