export type TToastType = 'info' |'success' | 'warning' | 'error';

export interface IToastData {
  id: string;
  message: string;
  type: TToastType;
}
