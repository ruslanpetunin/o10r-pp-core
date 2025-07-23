import { CardTypeCode } from './../types/card';
import type { CardType } from './../types/card';

const cardTypes: CardType[] = [
  {
    code: CardTypeCode.VISA,
    regExp: /^4\d{12}(\d{3}){0,2}$/,
    minLength: 13,
    maxLength: 19,
    luhn: true,
  },
  {
    code: CardTypeCode.MASTERCARD,
    regExp:
      /^(5[1-5]\d{4}|677189|229240)\d{10}$|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)\d{12}$/,
    minLength: 16,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.CUP,
    regExp: /^(62\d{14,17})$/,
    minLength: 16,
    maxLength: 19,
    luhn: false,
  },
  {
    code: CardTypeCode.DISCOVER,
    regExp: /^(6011|65\d{2}|64[4-9]\d)\d{12}|(^62\d{14})$/,
    minLength: 13,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.AMEX,
    regExp: /^3[47]\d{13}$/,
    minLength: 15,
    maxLength: 15,
    luhn: true,
  },
  {
    code: CardTypeCode.DINERS_CLUB,
    regExp: /^3(0[0-5]|[68]\d)\d{11}$/,
    minLength: 14,
    maxLength: 14,
    luhn: true,
  },
  {
    code: CardTypeCode.JCB,
    regExp: /^35(28|29|[3-8]\d)\d{12}$/,
    minLength: 16,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.SWITCH,
    regExp: /^6759\d{12}(\d{2,3})?$/,
    minLength: 16,
    maxLength: 19,
    luhn: true,
  },
  {
    code: CardTypeCode.DANKORT,
    regExp: /^5019\d{12}$/,
    minLength: 16,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.VERVE,
    regExp:
      /^(506099|5061[0-9][0-9]|50786[5-9]|5078[7-9][0-9]|50796[0-4]|627309|627629|627903|628051|636625|637058|637634|639245|639383|65000[2-8]|65001[0-9]|65002[0-7])\d{10,13}$/,
    minLength: 16,
    maxLength: 19,
    luhn: true,
  },
  {
    code: CardTypeCode.RUPAY,
    regExp:
      /^(508[5-9][0-9]{12})|(6069[8-9][0-9]{11})|(607[0-8][0-9]{12})|(6079[0-8][0-9]{11})|(608[0-5][0-9]{12})|(6521[5-9][0-9]{11})|(652[2-9][0-9]{12})|(6530[0-9]{12})|(6531[0-4][0-9]{11})$/,
    minLength: 16,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.MAESTRO,
    regExp: /^(5[06-8]|6\d)\d{10,17}$/,
    minLength: 13,
    maxLength: 19,
    luhn: true,
  },
  {
    code: CardTypeCode.SOLO,
    regExp: /^6767\d{12}(\d{2,3})?$/,
    minLength: 16,
    maxLength: 19,
    luhn: true,
  },
  {
    code: CardTypeCode.FORBRUGSFORENIGEN,
    regExp: /^600722\d{10}$/,
    minLength: 16,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.LASER,
    regExp: /^(6304|6706|6709|6771(?!89))\d{8}(\d{4}|\d{6,7})?$/,
    minLength: 15,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.BELCARD,
    regExp: /^9112[\d]{12}$/,
    minLength: 16,
    maxLength: 16,
    luhn: false,
  },
  {
    code: CardTypeCode.MIR,
    regExp: /^220[0-4]{1}[0-9]{12,15}$/,
    minLength: 16,
    maxLength: 19,
    luhn: true,
  },
  {
    code: CardTypeCode.NAPAS,
    regExp: /^9704\d{12}$/,
    minLength: 16,
    maxLength: 16,
    luhn: true,
  },
  {
    code: CardTypeCode.UZCARD,
    regExp: /^(6262\d{12}|8600\d{12})$/,
    minLength: 16,
    maxLength: 16,
    luhn: false,
  },
  {
    code: CardTypeCode.HUMO,
    regExp: /^9860\d{12}$/,
    minLength: 16,
    maxLength: 16,
    luhn: false,
  },
  {
    code: CardTypeCode.TROY,
    regExp: /^9792\d{12}$/,
    minLength: 16,
    maxLength: 16,
    luhn: false,
  },
  {
    code: CardTypeCode.PROSTIR,
    regExp: /^980\d{13}$/,
    minLength: 16,
    maxLength: 16,
    luhn: false,
  },
  {
    code: CardTypeCode.ELCART,
    regExp:
      /^9417(00|01|02|03|04|05977|06977|08|13|14|17|18|20|21|26|27|28|29|30|33|38|41|42|43|44|45|46|47|48|49|51|52|53|54|55|57|58|60|61|62|63|64|65|66|68|67|69|71|72|73|74|75|76|77|98|99)\d{10}$/,
    minLength: 16,
    maxLength: 19,
    luhn: false,
  },
  {
    code: CardTypeCode.KOREANLOCALCARD,
    regExp: /^(9\d|20)\d{14}$/,
    minLength: 16,
    maxLength: 16,
    luhn: false,
  },
];

function detect(cardNumber: string): CardType | null {
  if (cardNumber.length >= 2) {
    for (const cardType of cardTypes) {
      const autofillTo = cardType.minLength;
      let autofilledCardNumber = cardNumber;

      while (autofilledCardNumber.length < autofillTo) {
        autofilledCardNumber += '0';
      }

      if (cardType.regExp.test(autofilledCardNumber)) {
        return cardType;
      }
    }
  }

  return null;
}

export default function() {
  return {
    detect
  };
}
