import type { InitData, PaymentMethodField, ProjectSettingsData } from './data';

export type ProjectSettings = Omit<ProjectSettingsData, 'methods'> & { methods: PaymentMethod[] };

export type PaymentMethodFactory = (initData: InitData, projectSettings: ProjectSettingsData) => Promise<PaymentMethod[]>;

export interface PaymentMethod {
  code: string,
  icon: string,
  paymentForm: PaymentForm,
  getCollectedData: () => Record<string, unknown>,
  onRemove?: () => Promise<void>,
}

export interface PaymentForm {
  fields: PaymentMethodField[],
  onSubmit?: (data: Record<string, unknown>) => Promise<void> | void,
}
