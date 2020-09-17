import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuOpciones } from 'src/app/core/constants/menuOpciones'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  //ATRIBUTOS
  MenuLabel;

  constructor(
    public menuController: MenuController
  ) { }

  ngOnInit() {
    this.MenuLabel = MenuOpciones;
   }



}
