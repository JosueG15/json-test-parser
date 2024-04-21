import { OrdenItem } from './OrdenItem';

export class Orden {
  direccionRecoleccion: string;
  fecha: Date;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  direccionDestinatario: string;
  departamento: string;
  municipio: string;
  puntoReferencia: string;
  indicaciones: string;
  items: OrdenItem[];
}
