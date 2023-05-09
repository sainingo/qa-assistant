export const mappingOrders = async (results: []) => {
  const orders = results?.map(
    ({
      orderNumber,
      concept,
      dateActivated,
      orderer,
      urgency,
      uuid,
    }: {
      orderNumber: string;
      concept: { display: string };
      dateActivated: string;
      orderer: { display: string };
      urgency: string;
      uuid: string;
    }) => ({
      orderNumber: orderNumber,
      order: concept.display,
      date: new Date(dateActivated).toLocaleDateString('en-GB'),
      orderer: orderer.display,
      urgency: urgency,
      orderUuid: uuid,
    }),
  );
  return orders;
};

export const fetchActiveOrders = async (uuid: any) => {
  const response = await fetch(`/ws/rest/v1/order?patient=${uuid}&v=full`);
  const data = await response.json();
  const { results } = data;
  if (results) {
    const orders = mappingOrders(results);
    return orders;
  }
};

export const fetchVoidedOrders = async (uuid: any) => {
  const response = await fetch(
    `/ws/rest/v1/order?patient=${uuid}&v=custom:(uuid,orderNumber,voided,concept,dateActivated,orderer,urgency)&includeVoided=true`,
  );
  const data = await response.json();
  const { results } = data;
  const voidedOrders = results?.filter((result: { voided: boolean }) => result.voided !== false);
  const orders = await mappingOrders(voidedOrders);

  return orders;
};

export function getUser() {
  const userData = localStorage.getItem('userInformation');
  const { user } = JSON.parse(userData as string);
  return user;
}

export const gettingPatientName = async (id: any) => {
  const response = await fetch(`/ws/rest/v1/patient/${id}`);
  const data = await response.json();
  const patientName = data?.person?.display;

  return patientName;
};
