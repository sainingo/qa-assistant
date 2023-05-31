export interface Observation {
  uuid: string;
  display: string;
  concept: {
    uuid: string;
    display: string;
    links: {
      rel: string;
      uri: string;
      resourceAlias: string;
    }[];
  };
  person: {
    uuid: string;
    display: string;
    links: {
      rel: string;
      uri: string;
      resourceAlias: string;
    }[];
  };
  obsDatetime: string;
  accessionNumber: string | null;
  obsGroup: {
    uuid: string;
    display: string;
    links: {
      rel: string;
      uri: string;
      resourceAlias: string;
    }[];
  };
  location: {
    uuid: string;
    display: string;
    links: {
      rel: string;
      uri: string;
      resourceAlias: string;
    }[];
  };
  encounter: {
    uuid: string;
    display: string;
    links: {
      rel: string;
      uri: string;
      resourceAlias: string;
    }[];
  };
  voided: boolean;
  value: {
    uuid: string;
    display: string;
    name: {
      display: string;
      uuid: string;
      name: string;
      locale: string;
      localePreferred: boolean;
      conceptNameType: string;
      links: {
        rel: string;
        uri: string;
        resourceAlias: string;
      }[];
      resourceVersion: string;
    };
    datatype: {
      uuid: string;
      display: string;
      links: {
        rel: string;
        uri: string;
        resourceAlias: string;
      }[];
    };
    conceptClass: {
      uuid: string;
      display: string;
      links: {
        rel: string;
        uri: string;
        resourceAlias: string;
      }[];
    };
    set: boolean;
    retired: boolean;
    names: {
      uuid: string;
      display: string;
      links: {
        rel: string;
        uri: string;
        resourceAlias: string;
      }[];
    }[];
    descriptions: {
      uuid: string;
      display: string;
      links: {
        rel: string;
        uri: string;
        resourceAlias: string;
      }[];
    }[];
    mappings: {
      uuid: string;
      display: string;
      links: {
        rel: string;
        uri: string;
        resourceAlias: string;
      }[];
    }[];
    links: {
      rel: string;
      uri: string;
      resourceAlias: string;
    }[];
    resourceVersion: string;
  };
  status: string;
  links: {
    rel: string;
    uri: string;
    resourceAlias: string;
  }[];
  resourceVersion: string;
}
