import type { Api, ApiResponse } from '../types/api';
import type { PaymentStatusData, SavedCard, SessionData, TranslationData } from '../types/data'
// import { PaymentStatus } from '../types/data';
import type { Language } from '../types/translator';
import useHttp from './useHttp';
import { HttpMethod } from "./../types/http";

export default function(host: string): Api {
  const { request } = useHttp();

  async function getSession(sid: string): Promise<SessionData> {
    return request<ApiResponse<SessionData>>(`${host}/v1/session?client_secret=${sid}`).then(({ data }) => data);
  }

  async function getTranslations(language: Language): Promise<TranslationData> {
    return request<TranslationData>(`/translations/${language}.json`);
  }

  // let attempts = 0;
  async function getPaymentStatus(sid: string): Promise<PaymentStatusData> {
    return request<ApiResponse<PaymentStatusData>>(`${host}/v1/status?client_secret=${sid}`)
      .then(
        ({ data }) => {
          data.status = data.payment.status;

          return data;
        }
      );
    // console.log(`Getting payment status via sid: ${sid}`);
    //
    // attempts += 1;
    //
    // const kindaRequest = new Promise<PaymentStatusData>(
    //   (resolve) => {
    //     setTimeout(() => {
    //       if (attempts === 1) {
    //         resolve({
    //           status: PaymentStatus.NOT_STARTED,
    //         });
    //       } else if (attempts < 5) {
    //         resolve({
    //           status: PaymentStatus.PENDING,
    //           payment_method_code: 'card'
    //         });
    //       } else if (attempts < 10) {
    //         resolve({
    //           status: PaymentStatus.AWAITING_3DS_RESULT,
    //           account: {
    //             number: '4242******424242',
    //             expiry_month: '11',
    //             expiry_year: '33',
    //             card_holder: 'SOME CARDHOLDER'
    //           },
    //           threeds: {
    //             is_cascading: true,
    //             redirect: {
    //               url: 'https://example.com/3ds-iframe',
    //               params: {
    //                 md: 'md-data',
    //                 pa_req: 'pa_req-data',
    //                 term_url: 'https://example.com/term-url'
    //               }
    //             }
    //           },
    //           payment_method_code: 'card'
    //         });
    //       }  else if (attempts < 15) {
    //         resolve({
    //           status: PaymentStatus.AWAITING_CLARIFICATION,
    //           clarification_fields: [
    //             { name: 'first_name', type: 'text', validation: { required: [] } },
    //             { name: 'last_name', type: 'text', validation: { required: [] } },
    //             { name: 'email', type: 'text' },
    //           ],
    //           payment_method_code: 'card'
    //         });
    //       }  else if (attempts < 15) {
    //         resolve({
    //           status: PaymentStatus.AWAITING_CUSTOMER_ACTION,
    //           payment_method_code: 'card'
    //         });
    //       }  else if (attempts < 10) {
    //         resolve({
    //           status: PaymentStatus.AWAITING_REDIRECT,
    //           redirect: {
    //             url: 'https://example.com/aps',
    //             method: 'GET'
    //           },
    //           payment_method_code: 'card'
    //         });
    //       }  else if (attempts < 15) {
    //         resolve({
    //           status: PaymentStatus.AWAITING_3DS_RESULT,
    //           account: {
    //             number: '4242******424242',
    //             expiry_month: '11',
    //             expiry_year: '33',
    //             card_holder: 'SOME CARDHOLDER'
    //           },
    //           threeds: {
    //             iframe: {
    //               url: 'https://example.com/3ds-iframe',
    //               params: {
    //                 threeDSMethodData: 'some-data',
    //                 '3DSMethodData': 'some-data'
    //               }
    //             },
    //           },
    //           payment_method_code: 'card'
    //         });
    //       }  else if (attempts < 20) {
    //         resolve({
    //           status: PaymentStatus.AWAITING_3DS_RESULT,
    //           account: {
    //             number: '4242******424242',
    //             expiry_month: '11',
    //             expiry_year: '33',
    //             card_holder: 'SOME CARDHOLDER'
    //           },
    //           threeds: {
    //             redirect: {
    //               url: 'https://example.com/3ds-redirect',
    //               params: {
    //                 threeDSSessionData: 'session-data',
    //                 creq: 'creq-data'
    //               }
    //             },
    //           },
    //           payment_method_code: 'card'
    //         });
    //       } else {
    //         resolve({
    //           status: PaymentStatus.SUCCESS,
    //           payment_method_code: 'card'
    //         });
    //       }
    //     }, 1000);
    //   }
    // );
    //
    // return await kindaRequest;
  }

  async function removeSavedCard(sid: string, cardId: number): Promise<void> {
    console.log(`Removing saved card with ID ${cardId} via sid: ${sid}`);

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async function getSavedCards(sid: string): Promise<SavedCard[]> {
    console.log(`Getting saved cards via sid: ${sid}`);

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

  async function pay(sid: string, paymentMethodCode: string, data: Record<string, unknown>): Promise<void> {
    await request(
      `${host}/v1/session/confirm?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          methodCode: paymentMethodCode,
          fields: data
        }
      }
    );
  }

  async function clarify(sid: string, data: Record<string, unknown>): Promise<void> {
    console.log(`Clarify request is not implemented yet. sid: ${sid}, Data:`, data);
  }

  return {
    getSession,
    getSavedCards,
    getTranslations,
    getPaymentStatus,
    removeSavedCard,
    pay,
    clarify
  }
}
