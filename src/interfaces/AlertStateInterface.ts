export interface AlertStateInterface {
  triggered?: boolean;
  alertType?: string;
  alertCode: string | number;
  alertMessage: string;
}
