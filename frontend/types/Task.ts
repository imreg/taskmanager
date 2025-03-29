export interface Task {
  id: number;
  megnevezes: string;
  prioritas: 'alacsony' | 'normal' | 'magas';
  hossz: number;
  kesz: boolean;
  megbizottak: string[];
  utemezett_nap: string;
}

