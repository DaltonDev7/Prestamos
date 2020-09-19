import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Combox } from 'src/app/core/interfaces/combox';
import { ComboxService } from 'src/app/core/services/combox.service';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';
import { PrestamoService } from 'src/app/core/services/prestamo.service';

@Component({
  selector: 'app-editprestamo',
  templateUrl: './editprestamo.component.html',
  styleUrls: ['./editprestamo.component.scss'],
})
export class EditprestamoComponent implements OnInit {

  //atributos
  prestamoForm:FormGroup;
  estadoCombox:Combox[]
  constructor(
    public prestamoService : PrestamoService,
    public formBuilderService: FormsBuilderService,
    public comboxService: ComboxService
  ) { }

  ngOnInit() {
    this.prestamoForm = this.formBuilderService.getPrestamoForm();
    this.estadoCombox = this.comboxService.EstadoCombox;

    
  }

}
