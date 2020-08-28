import { MenuOpcion } from '../interfaces/menuOpcion';


export const MenuOpciones:MenuOpcion[]= [
    {
        'icon':'home',
        'label':'Inicio',
        'route':'home'
    },
    {
       'icon':'people',
       'label':'Nuevo Cliente',
       'route':'registrar-cliente'
    },
    {
        'icon':'cash-sharp',
        'label':'Nuevo Prestamo',
        'route':'registrar-prestamo'
     }
]