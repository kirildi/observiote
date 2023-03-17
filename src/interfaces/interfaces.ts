export interface AlertState {
  triggered?: boolean;
  alertType: string;
  alertCode: string;
  alertMessage: string;
}
