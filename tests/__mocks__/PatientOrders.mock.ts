export const mockPatientOrders = {
  results: [
    {
      uuid: 'eb098df9-301d-4033-808c-d7220286abfe',
      orderNumber: 'ORD-24',
      accessionNumber: null,
      patient: {
        uuid: '4075e8e7-ea62-42f7-b4c9-52bbc83fb587',
        display: '100000Y - Betty Williams',
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587',
            resourceAlias: 'patient',
          },
        ],
      },
      concept: {
        uuid: '161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        display: 'International normalized ratio',
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            resourceAlias: 'concept',
          },
        ],
      },
      action: 'NEW',
      careSetting: {
        uuid: '6f0c9a92-6f24-11e3-af88-005056821db0',
        name: 'Outpatient',
        description: 'Out-patient care setting',
        retired: false,
        careSettingType: 'OUTPATIENT',
        display: 'Outpatient',
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/caresetting/6f0c9a92-6f24-11e3-af88-005056821db0',
            resourceAlias: 'caresetting',
          },
          {
            rel: 'full',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/caresetting/6f0c9a92-6f24-11e3-af88-005056821db0?v=full',
            resourceAlias: 'caresetting',
          },
        ],
        resourceVersion: '1.10',
      },
      previousOrder: null,
      dateActivated: '2021-12-09T02:38:52.000+0000',
      scheduledDate: null,
      dateStopped: null,
      autoExpireDate: null,
      encounter: {
        uuid: '3d91969d-db04-4486-a7eb-a583a50a2389',
        display: 'Order 12/09/2021',
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/3d91969d-db04-4486-a7eb-a583a50a2389',
            resourceAlias: 'encounter',
          },
        ],
      },
      orderer: {
        uuid: '1fee2f21-82f3-4aab-8d87-f1cf19034649',
        display: 'nurse - Jane Nurse',
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/provider/1fee2f21-82f3-4aab-8d87-f1cf19034649',
            resourceAlias: 'provider',
          },
        ],
      },
      orderReason: null,
      orderReasonNonCoded: null,
      orderType: {
        uuid: '52a447d3-a64a-11e3-9aeb-50e549534c5e',
        display: 'Test Order',
        name: 'Test Order',
        javaClassName: 'org.openmrs.TestOrder',
        retired: false,
        description: 'Order type for test orders',
        conceptClasses: [],
        parent: null,
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/ordertype/52a447d3-a64a-11e3-9aeb-50e549534c5e',
            resourceAlias: 'ordertype',
          },
          {
            rel: 'full',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/ordertype/52a447d3-a64a-11e3-9aeb-50e549534c5e?v=full',
            resourceAlias: 'ordertype',
          },
        ],
        resourceVersion: '1.10',
      },
      urgency: 'ROUTINE',
      instructions: null,
      commentToFulfiller: null,
      display: 'International normalized ratio',
      auditInfo: {
        creator: {
          uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
          display: 'daemon',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
              resourceAlias: 'user',
            },
          ],
        },
        dateCreated: '2023-03-09T19:16:56.000+0000',
        changedBy: null,
        dateChanged: null,
      },
      fulfillerStatus: null,
      fulfillerComment: null,
      specimenSource: null,
      laterality: null,
      clinicalHistory: null,
      frequency: null,
      numberOfRepeats: null,
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/order/eb098df9-301d-4033-808c-d7220286abfe',
          resourceAlias: 'order',
        },
      ],
      type: 'testorder',
      resourceVersion: '1.10',
    },
  ],
};
