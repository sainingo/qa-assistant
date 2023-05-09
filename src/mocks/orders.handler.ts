import { rest } from 'msw';
import { mockOrders, mockPatient, mockVoidOrder } from '../components/Orders/resource.mock';

const BaseURL = `https://dev3.openmrs.org/openmrs/ws/rest/v1`;

export const fetchActiveOrders = rest.get(`${BaseURL}/order`, (req, res, ctx) => {
  const patientUuid = req.url.searchParams.get('patient');
  return res(ctx.status(200), ctx.json(mockOrders));
});

export const fetchVoidedOrders = rest.get(`${BaseURL}/order`, (req, res, ctx) => {
  const patientUuid = req.url.searchParams.get('patient');
  return res(ctx.status(200), ctx.json(mockVoidOrder));
});

export const gettingPatientName = rest.get(`${BaseURL}/patient/:id`, (req, res, ctx) => {
  const { id } = req.params;
  return res(ctx.status(200), ctx.json(mockPatient));
});
