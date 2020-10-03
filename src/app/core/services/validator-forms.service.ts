import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';



@Injectable({
    providedIn: 'root'
})
export class ValidatorFormsService {



    constructor(){}



    setDisabledControls(controls:AbstractControl[] , emit = true){
        controls.forEach((control)=>{
            control.setValue(null);
            control.disable({emitEvent:emit})
        })
    }

    setEnableControls(controls:AbstractControl[],  emit = true){
        controls.forEach((control)=>{
            control.setValue(null);
            control.enable({emitEvent:emit});
        })
    }

    setEnableControlsRequired(controls:AbstractControl[],  emit = true){
        controls.forEach((control)=>{
            control.setValue(null);
            control.enable({emitEvent:emit});
            control.setValidators([Validators.required])
            control.updateValueAndValidity();
        })
    }

     requiredControls(form : FormGroup, requeridos : string[] = []){
        for(let key in form.controls) {
            if(requeridos.find((requerido) => requerido == key)){
                form.get(key).setValidators([Validators.required]);
                form.get(key).updateValueAndValidity();
            }
        }
    }

     disabledAllControls(form : FormGroup, exepciones : string[] = []){
        for(let key in form.controls) {
            if(!exepciones.find((campo) => campo == key)){
                form.get(key).disable();
            }
        }
    }

    enableAllControls(form : FormGroup, exepciones : string[] = []){
        for(let key in form.controls) {
            if(!exepciones.find((campo) => campo == key)){
                form.get(key).enable();
            }
        }
    }





}