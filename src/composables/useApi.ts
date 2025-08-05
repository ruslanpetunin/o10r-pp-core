import type { Api } from '../types/api';
import type {
  PaymentStatusData,
  ProjectSettingsData,
  SavedCard,
  TranslationData
} from '../types/data'
import { PaymentStatus } from '../types/data';
import type { Language } from '../types/translator';
import useHttp from './useHttp';

export default function(host: string): Api {
  const { request } = useHttp();

  async function getProjectSettings(projectHash: string): Promise<ProjectSettingsData> {
    return request<ProjectSettingsData>(`${host}/project/settings/${projectHash}.json`);
  }

  async function getTranslations(language: Language): Promise<TranslationData> {
    return request<TranslationData>(`${host}/translations/${language}.json`);
  }

  let attempts = 0;
  async function getPaymentStatus(token: string): Promise<PaymentStatusData> {
    console.log(`Getting payment status via token: ${token}`);

    attempts += 1;

    const kindaRequest = new Promise<PaymentStatusData>(
      (resolve) => {
        setTimeout(() => {
          if (attempts === 1) {
            resolve({
              status: PaymentStatus.NOT_STARTED,
            });
          } else if (attempts < 5) {
            resolve({
              status: PaymentStatus.PENDING,
              payment_method_code: 'card'
            });
          // } else if (attempts < 10) {
          //   resolve({
          //     status: PaymentStatus.AWAITING_3DS_RESULT,
          //     threeds: {
          //       redirect: {
          //         url: 'https://example.com/3ds-iframe',
          //         params: {
          //           md: 'md-data',
          //           pa_req: 'pa_req-data',
          //           term_url: 'https://example.com/term-url'
          //         }
          //       }
          //     },
          //     payment_method_code: 'card'
          //   });
          }  else if (attempts < 10) {
            resolve({
              status: PaymentStatus.AWAITING_REDIRECT,
              redirect: {
                url: 'https://example.com/aps',
                method: 'GET'
              },
              payment_method_code: 'card'
            });
          // }  else if (attempts < 10) {
          //   resolve({
          //     status: PaymentStatus.AWAITING_3DS_RESULT,
          //     threeds: {
          //       iframe: {
          //         url: 'https://example.com/3ds-iframe',
          //         params: {
          //           threeDSMethodData: 'some-data',
          //           '3DSMethodData': 'some-data'
          //         }
          //       },
          //     },
          //     payment_method_code: 'card'
          //   });
          // }  else if (attempts < 15) {
          //   resolve({
          //     status: PaymentStatus.AWAITING_3DS_RESULT,
          //     threeds: {
          //       redirect: {
          //         url: 'https://example.com/3ds-redirect',
          //         params: {
          //           threeDSSessionData: 'session-data',
          //           creq: 'creq-data'
          //         }
          //       },
          //     },
          //     payment_method_code: 'card'
          //   });
          } else {
            resolve({
              status: PaymentStatus.SUCCESS,
              payment_method_code: 'card'
            });
          }
        }, 1000);
      }
    );

    return await kindaRequest;
  }

  async function removeSavedCard(token: string, cardId: number): Promise<void> {
    console.log(`Removing saved card with ID ${cardId} via token: ${token}`);

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async function getSavedCards(token: string): Promise<SavedCard[]> {
    console.log(`Getting saved cards via token: ${token}`);

    return await new Promise(
      (resolve) => {
        setTimeout(
          () => resolve([
            {
              id: 1,
              last_four_digits: '4211',
              type: 'visa',
              expiry_month: '11',
              expiry_year: '25'
            },
            {
              id: 2,
              last_four_digits: '1233',
              type: 'mastercard',
              expiry_month: '09',
              expiry_year: '26'
            },
            {
              id: 3,
              last_four_digits: '3781',
              type: 'visa',
              expiry_month: '01',
              expiry_year: '25'
            },
          ]),
          5000
        )
      }
    );
  }

  async function pay(token: string, data: Record<string, unknown>): Promise<void> {
    console.log(`Pay request is not implemented yet. Token: ${token}, Data:`, data);
  }

  return {
    getProjectSettings,
    getSavedCards,
    getTranslations,
    getPaymentStatus,
    removeSavedCard,
    pay
  }
}
