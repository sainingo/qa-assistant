export const mockPatient = {
  uuid: '4075e8e7-ea62-42f7-b4c9-52bbc83fb587',
  display: '100000Y - Betty Williams',
  identifiers: [
    {
      uuid: '14881f59-1576-491c-be10-d2f75618affd',
      display: 'OpenMRS ID = 100000Y',
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587/identifier/14881f59-1576-491c-be10-d2f75618affd',
          resourceAlias: 'identifier',
        },
      ],
    },
  ],
  person: {
    uuid: '4075e8e7-ea62-42f7-b4c9-52bbc83fb587',
    display: 'Betty Williams',
    gender: 'F',
    age: 51,
    birthdate: '1971-03-15T00:00:00.000+0000',
    birthdateEstimated: false,
    dead: false,
    deathDate: null,
    causeOfDeath: null,
    preferredName: {
      uuid: '3c706b84-afe2-4b27-affe-94802a4871af',
      display: 'Betty Williams',
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587/name/3c706b84-afe2-4b27-affe-94802a4871af',
          resourceAlias: 'name',
        },
      ],
    },
    preferredAddress: {
      uuid: '0275e512-ff68-4d18-a30c-ca19799feb06',
      display: 'Address15311',
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587/address/0275e512-ff68-4d18-a30c-ca19799feb06',
          resourceAlias: 'address',
        },
      ],
    },
    attributes: [],
    voided: false,
    birthtime: null,
    deathdateEstimated: false,
    links: [
      {
        rel: 'self',
        uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587',
        resourceAlias: 'person',
      },
      {
        rel: 'full',
        uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/person/4075e8e7-ea62-42f7-b4c9-52bbc83fb587?v=full',
        resourceAlias: 'person',
      },
    ],
    resourceVersion: '1.11',
  },
  voided: false,
  links: [
    {
      rel: 'self',
      uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587',
      resourceAlias: 'patient',
    },
    {
      rel: 'full',
      uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/4075e8e7-ea62-42f7-b4c9-52bbc83fb587?v=full',
      resourceAlias: 'patient',
    },
  ],
  resourceVersion: '1.8',
};
