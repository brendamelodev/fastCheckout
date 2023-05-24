export interface ContractAccount {
  uc: number;
  contract: string;
  partnerNumber: string;
  installation: string;
  number: string;
  dv: string;
  idUnidade: number;
  idCidade: number;
  document: string;
  address: string;
  name: string;
}

export interface Invoice {
  invoiceId: string;
  amount: number;
  dueDate: Date;
  barCodeOne: string;
  barCodeTwo: string;
  street: string;
  complement: string;
  district: string;
  zipcode: string;
  status: string;
  accountContractId: string;
  fidic: string;
  retention: string;
  retentionMessage: null | string;
  reference: string;
  isAutomaticDebt: boolean;
}

export interface Installments {
  [key: string]: number;
}

export interface Payment {
  installments: string;
  amount: number;
  payment_module: number;
  card_request: CardRequest;
  id: string;
}

export interface CardRequest {
  card_number: string;
  holder: string;
  brand: string;
  expiration_date: string;
  security_code: string;
}
