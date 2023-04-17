import getPaymentsMock from '@/mocks/getPayments';
import api from '@/api';

const getPayments = () => {
  return process.env.VUE_APP_USE_MOCK ? getPaymentsMock() : api.getPayments();
};

export default {
  getPayments,
};
