export interface PaymentIntentData {
  amount: number,
  currency: string,
  paymentId: string,
  paymentDescription?: string,
}

export interface CustomerData {
  id?: number,
  billing?: BillingData,
  shipping?: ShippingData,
}

export interface BillingData {
  mode: 'required' | 'auto',
}

export interface ShippingData {
  mode: 'required' | 'auto',
  allowedCountries?: string[],
}

export interface SessionData {
  customer: CustomerData,
  payment: PaymentIntentData,
  methods: PaymentMethodData[],
  redirect: RedirectData
}

export type TranslationData = Record<string, string>;

export interface RedirectData {
  return_url?: string,
  cancel_url?: string
}

export interface PaymentMethodData {
  code: string,
  icon: string,
  schema: Field[]
}

export interface FieldValidationRules {
  required: [];
  pan: [];
  expiry_month: [];
  expiry_year: [string|undefined];
  cvv: [string|undefined];
  cardholder: [];
}

export interface FieldOption {
  value: string;
}

export interface FieldBase {
  name: string,
  value?: string;
  disabled?: boolean,
  autocomplete?: string,
  validation?: Partial<FieldValidationRules>,
}

export interface FieldText extends FieldBase {
  type:
    | 'number'
    | 'text'
    | 'email'
    | 'tel'
    | 'password';
}

export interface FieldSelect extends FieldBase {
  type: 'select';
  options: FieldOption[];
}

export interface FieldCheckbox extends FieldBase {
  type: 'checkbox';
}

export type Field =
  | FieldText
  | FieldSelect
  | FieldCheckbox;

export type PaymentStatusData =
  | PaymentStatusDataBase<PaymentStatus.NOT_STARTED, undefined>
  | PaymentStatusDataBase<PaymentStatus.PENDING, undefined>
  | PaymentStatusDataBase<PaymentStatus.AWAITING_3DS_RESULT, string> & AcsSection & AccountSection
  | PaymentStatusDataBase<PaymentStatus.AWAITING_REDIRECT, string> & ApsSection
  | PaymentStatusDataBase<PaymentStatus.AWAITING_CLARIFICATION, string> & ClarificationSection
  | PaymentStatusDataBase<PaymentStatus.AWAITING_CUSTOMER_ACTION, string>
  | PaymentStatusDataBase<PaymentStatus.SUCCESS, string>
  | PaymentStatusDataBase<PaymentStatus.FAILED, string>
  ;

export type PaymentStatusDataBase<S extends PaymentStatus, M> = { status: S } & PaymentSection<S, M>;

export interface PaymentSection<S extends PaymentStatus, M> {
  payment: {
    status: S,
    method_code: M
  }
}

export interface AccountSection {
  account: {
    number: string;
    expiry_month: string;
    expiry_year: string;
    card_holder: string;
  }
}

export interface ApsSection {
  aps: {
    redirect: Redirect
  }
}

export interface AcsSection {
  acs: {
    iframe: Redirect<ThreeDs2IframeBody>
  } | {
    redirect: Redirect<ThreeDs1Body> | Redirect<ThreeDs2Body>,
    is_cascading?: boolean
  }
}

export type ClarificationSection = {
  clarification: Field[]
}

export type Redirect<B extends Record<string, string> = Record<string, string>> = {
  url: string;
  method: 'GET' | 'POST';
  body?: B;
}

export type ThreeDs1Body = {
  md: string;
  pa_req: string;
  term_url: string;
}

export type ThreeDs2Body = {
  threeDSSessionData: string,
  creq: string,
}

export type ThreeDs2IframeBody = {
  threeDSMethodData: string;
  '3DSMethodData': string;
}

export enum PaymentStatus {
  NOT_STARTED = 'unpaid',
  PENDING = 'pending',
  AWAITING_3DS_RESULT = 'awaiting 3ds result',
  AWAITING_REDIRECT = 'awaiting redirect result',
  AWAITING_CLARIFICATION = 'awaiting clarification',
  AWAITING_CUSTOMER_ACTION = 'awaiting customer action',
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
