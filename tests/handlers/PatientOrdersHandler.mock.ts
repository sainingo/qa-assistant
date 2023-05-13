import { rest } from 'msw';
import { mockPatient } from '../__mocks__/Patient.mock';
import { mockPatientOrders } from '../__mocks__/PatientOrders.mock';
import { mockPatientVoidedOrder } from '../__mocks__/PatientVoidedOrders.mock';

const BaseURL = `https://dev3.openmrs.org/openmrs/ws/rest/v1`;

export const fetchActiveOrders = rest.get(`${BaseURL}/order`, (req, res, ctx) => {
  req.url.searchParams.get('patient');
  return res(ctx.status(200), ctx.json(mockPatientOrders));
});

export const fetchVoidedOrders = rest.get(`${BaseURL}/order`, (req, res, ctx) => {
  req.url.searchParams.get('patient');
  return res(ctx.status(200), ctx.json(mockPatientVoidedOrder));
});

export const gettingPatientName = rest.get(`${BaseURL}/patient/:id`, (req, res, ctx) => {
  req.params;
  return res(ctx.status(200), ctx.json(mockPatient));
});
