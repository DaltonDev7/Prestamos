import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';

@Component({
  selector: 'app-registrar-prestamo',
  templateUrl: './registrar-prestamo.page.html',
  styleUrls: ['./registrar-prestamo.page.scss'],
})
export class RegistrarPrestamoPage implements OnInit {

  //ATRIBUTOS
  prestamoForm: FormGroup;

  constructor(public formBuilderServices : FormsBuilderService) { }

  ngOnInit() {
    this.prestamoForm = this.formBuilderServices.getPrestamoForm();
  }



  savePrestamo(){
    
  }

}
