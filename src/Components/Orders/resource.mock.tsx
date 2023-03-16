export const mockOrders = {
  results: [
    {
      uuid: "eb098df9-301d-4033-808c-d7220286abfe",
      orderNumber: "ORD-24",
      accessionNumber: null,
      patient: {
        uuid: "4075e8e7-ea62-42f7-b4c9-52bbc83fb587",
        display: "100000Y - Betty Williams",
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587",
            resourceAlias: "patient",
          },
        ],
      },
      concept: {
        uuid: "161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        display: "International normalized ratio",
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            resourceAlias: "concept",
          },
        ],
      },
      action: "NEW",
      careSetting: {
        uuid: "6f0c9a92-6f24-11e3-af88-005056821db0",
        name: "Outpatient",
        description: "Out-patient care setting",
        retired: false,
        careSettingType: "OUTPATIENT",
        display: "Outpatient",
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/caresetting/6f0c9a92-6f24-11e3-af88-005056821db0",
            resourceAlias: "caresetting",
          },
          {
            rel: "full",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/caresetting/6f0c9a92-6f24-11e3-af88-005056821db0?v=full",
            resourceAlias: "caresetting",
          },
        ],
        resourceVersion: "1.10",
      },
      previousOrder: null,
      dateActivated: "2021-12-09T02:38:52.000+0000",
      scheduledDate: null,
      dateStopped: null,
      autoExpireDate: null,
      encounter: {
        uuid: "3d91969d-db04-4486-a7eb-a583a50a2389",
        display: "Order 12/09/2021",
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/3d91969d-db04-4486-a7eb-a583a50a2389",
            resourceAlias: "encounter",
          },
        ],
      },
      orderer: {
        uuid: "1fee2f21-82f3-4aab-8d87-f1cf19034649",
        display: "nurse - Jane Nurse",
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/provider/1fee2f21-82f3-4aab-8d87-f1cf19034649",
            resourceAlias: "provider",
          },
        ],
      },
      orderReason: null,
      orderReasonNonCoded: null,
      orderType: {
        uuid: "52a447d3-a64a-11e3-9aeb-50e549534c5e",
        display: "Test Order",
        name: "Test Order",
        javaClassName: "org.openmrs.TestOrder",
        retired: false,
        description: "Order type for test orders",
        conceptClasses: [],
        parent: null,
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/ordertype/52a447d3-a64a-11e3-9aeb-50e549534c5e",
            resourceAlias: "ordertype",
          },
          {
            rel: "full",
            uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/ordertype/52a447d3-a64a-11e3-9aeb-50e549534c5e?v=full",
            resourceAlias: "ordertype",
          },
        ],
        resourceVersion: "1.10",
      },
      urgency: "ROUTINE",
      instructions: null,
      commentToFulfiller: null,
      display: "International normalized ratio",
      auditInfo: {
        creator: {
          uuid: "A4F30A1B-5EB9-11DF-A648-37A07F9C90FB",
          display: "daemon",
          links: [
            {
              rel: "self",
              uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB",
              resourceAlias: "user",
            },
          ],
        },
        dateCreated: "2023-03-09T19:16:56.000+0000",
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
          rel: "self",
          uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/order/eb098df9-301d-4033-808c-d7220286abfe",
          resourceAlias: "order",
        },
      ],
      type: "testorder",
      resourceVersion: "1.10",
    },
  ],
};

export const mockPatient = {
  uuid: "4075e8e7-ea62-42f7-b4c9-52bbc83fb587",
  display: "100000Y - Betty Williams",
  identifiers: [
    {
      uuid: "14881f59-1576-491c-be10-d2f75618affd",
      display: "OpenMRS ID = 100000Y",
      links: [
        {
          rel: "self",
          uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587/identifier/14881f59-1576-491c-be10-d2f75618affd",
          resourceAlias: "identifier",
        },
      ],
    },
  ],
  person: {
    uuid: "4075e8e7-ea62-42f7-b4c9-52bbc83fb587",
    display: "Betty Williams",
    gender: "F",
    age: 51,
    birthdate: "1971-03-15T00:00:00.000+0000",
    birthdateEstimated: false,
    dead: false,
    deathDate: null,
    causeOfDeath: null,
    preferredName: {
      uuid: "3c706b84-afe2-4b27-affe-94802a4871af",
      display: "Betty Williams",
      links: [
        {
          rel: "self",
          uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587/name/3c706b84-afe2-4b27-affe-94802a4871af",
          resourceAlias: "name",
        },
      ],
    },
    preferredAddress: {
      uuid: "0275e512-ff68-4d18-a30c-ca19799feb06",
      display: "Address15311",
      links: [
        {
          rel: "self",
          uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587/address/0275e512-ff68-4d18-a30c-ca19799feb06",
          resourceAlias: "address",
        },
      ],
    },
    attributes: [],
    voided: false,
    birthtime: null,
    deathdateEstimated: false,
    links: [
      {
        rel: "self",
        uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587",
        resourceAlias: "person",
      },
      {
        rel: "full",
        uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587?v=full",
        resourceAlias: "person",
      },
    ],
    resourceVersion: "1.11",
  },
  voided: false,
  links: [
    {
      rel: "self",
      uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587",
      resourceAlias: "patient",
    },
    {
      rel: "full",
      uri: "http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587?v=full",
      resourceAlias: "patient",
    },
  ],
  resourceVersion: "1.8",
};

export const mockVoidOrder = {
  results: [
    {
      uuid: "eb098df9-301d-4033-808c-d7220286abfe",
      orderNumber: "ORD-24",
      voided: true,
      concept: {
        uuid: "161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        display: "International normalized ratio",
        name: {
          display: "International normalized ratio",
          uuid: "111053BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
          name: "International normalized ratio",
          locale: "en",
          localePreferred: true,
          conceptNameType: "FULLY_SPECIFIED",
          links: [
            {
              rel: "self",
              uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/111053BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
              resourceAlias: "name",
            },
            {
              rel: "full",
              uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/111053BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full",
              resourceAlias: "name",
            },
          ],
          resourceVersion: "1.9",
        },
        datatype: {
          uuid: "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
          display: "Numeric",
          links: [
            {
              rel: "self",
              uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
              resourceAlias: "conceptdatatype",
            },
          ],
        },
        conceptClass: {
          uuid: "8d4907b2-c2cc-11de-8d13-0010c6dffd0f",
          display: "Test",
          links: [
            {
              rel: "self",
              uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/conceptclass/8d4907b2-c2cc-11de-8d13-0010c6dffd0f",
              resourceAlias: "conceptclass",
            },
          ],
        },
        set: false,
        version: null,
        retired: false,
        names: [
          {
            uuid: "111053BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            display: "International normalized ratio",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/111053BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                resourceAlias: "name",
              },
            ],
          },
          {
            uuid: "136658BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            display: "Rapport international normalisé",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/136658BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                resourceAlias: "name",
              },
            ],
          },
          {
            uuid: "136659BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            display: "Rapò entènasyonal nomalize",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/136659BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                resourceAlias: "name",
              },
            ],
          },
          {
            uuid: "111054BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            display: "INR",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/111054BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                resourceAlias: "name",
              },
            ],
          },
        ],
        descriptions: [],
        mappings: [
          {
            uuid: "146789ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            display: "LOINC: 34714-6",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/146789ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                resourceAlias: "mapping",
              },
            ],
          },
          {
            uuid: "b6224913-7b5e-313c-9d7c-594a11b05a66",
            display: "CIEL: 161482",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/b6224913-7b5e-313c-9d7c-594a11b05a66",
                resourceAlias: "mapping",
              },
            ],
          },
          {
            uuid: "274612ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            display: "IMO ProcedureIT: 1060767",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/274612ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                resourceAlias: "mapping",
              },
            ],
          },
          {
            uuid: "146620ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            display: "SNOMED CT: 440685005",
            links: [
              {
                rel: "self",
                uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/146620ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                resourceAlias: "mapping",
              },
            ],
          },
        ],
        answers: [],
        setMembers: [],
        attributes: [],
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            resourceAlias: "concept",
          },
          {
            rel: "full",
            uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/concept/161482AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?v=full",
            resourceAlias: "concept",
          },
        ],
        resourceVersion: "2.0",
      },
      dateActivated: "2021-12-09T02:38:52.000+0000",
      orderer: {
        uuid: "1fee2f21-82f3-4aab-8d87-f1cf19034649",
        display: "nurse - Jane Nurse",
        person: {
          uuid: "9bed23d0-0502-11e3-8ffd-0800200c9a66",
          display: "Jane Nurse",
          links: [
            {
              rel: "self",
              uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/person/9bed23d0-0502-11e3-8ffd-0800200c9a66",
              resourceAlias: "person",
            },
          ],
        },
        identifier: "nurse",
        attributes: [],
        retired: false,
        links: [
          {
            rel: "self",
            uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/provider/1fee2f21-82f3-4aab-8d87-f1cf19034649",
            resourceAlias: "provider",
          },
          {
            rel: "full",
            uri: "http://dev3.openmrs.org/openmrs/ws/rest/v1/provider/1fee2f21-82f3-4aab-8d87-f1cf19034649?v=full",
            resourceAlias: "provider",
          },
        ],
        resourceVersion: "1.9",
      },
      urgency: "ROUTINE",
    },
  ],
};
