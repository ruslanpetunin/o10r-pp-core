export interface ProjectSettingsData {
  methods: PaymentMethodData[];
}

export interface InitData {
  amount: number;
  currency: string;
  project_hash: string;
  has_saved_cards?: boolean;
}

export type TranslationData = Record<string, string>;

export interface PaymentMethodData {
  code: string,
  icon: string,
  fields: PaymentMethodField[]
}

export interface PaymentMethodFieldValidationRules {
  required: [];
  pan: [];
  expiry_month: [];
  expiry_year: [string|undefined];
  cvv: [string|undefined];
  cardholder: [];
}

export interface PaymentMethodFieldOption {
  label: string;
  value: string;
}

export interface PaymentMethodFieldBase {
  name: string,
  value?: string;
  disabled?: boolean,
  autocomplete?: string,
  validation?: Partial<PaymentMethodFieldValidationRules>,
}

export interface PaymentMethodFieldText extends PaymentMethodFieldBase {
  type:
    | 'number'
    | 'text'
    | 'email'
    | 'tel'
    | 'password';
}

export interface PaymentMethodFieldSelect extends PaymentMethodFieldBase {
  type: 'select';
  options: PaymentMethodFieldOption[];
}

export interface PaymentMethodFieldCheckbox extends PaymentMethodFieldBase {
  type: 'checkbox';
}

export type PaymentMethodField =
  | PaymentMethodFieldText
  | PaymentMethodFieldSelect
  | PaymentMethodFieldCheckbox;

export type PaymentStatusData =
  | { status: PaymentStatus.NOT_STARTED }
  | { status: PaymentStatus.PENDING } & PaymentStatusInfo
  | { status: PaymentStatus.AWAITING_3DS_RESULT } & PaymentStatusInfo & ThreeDS
  | { status: PaymentStatus.SUCCESS } & PaymentStatusInfo
  | { status: PaymentStatus.FAILED } & PaymentStatusInfo;

export type ThreeDS = { threeds: { iframe: ThreeDS2Iframe } | { redirect: ThreeDS2Redirect | ThreeDS1 } };

export type ThreeDS1 = {
  url: string;
  params: {
    md: string;
    pa_req: string;
    term_url: string;
  }
}

export type ThreeDS2Iframe = {
  url: string;
  params: {
    threeDSMethodData: string;
    '3DSMethodData': string;
  };
}

export type ThreeDS2Redirect = {
  url: string,
  params: {
    threeDSSessionData: string,
    creq: string,
  }
}

export type PaymentStatusInfo = {
  payment_method_code: string;
}

export enum PaymentStatus {
  NOT_STARTED = 'not found',
  PENDING = 'pending',
  AWAITING_3DS_RESULT = 'awaiting 3ds result',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface SavedCard {
  id: number;
  type: string;
  last_four_digits: string;
  expiry_month: string;
  expiry_year: string;
}
