export interface Dispositivo {
  dispositivoId: number;
  nombre?: string;
  ubicacion?: string;
  electrovalvulaId: number;
  ultimaMedicion?: number;
  electrovalvulaAbierta: boolean;
}
