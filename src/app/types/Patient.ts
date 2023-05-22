// Type definitions for Patient
interface Identifier {
  uuid: string;
  display: string;
}

interface PreferredName {
  uuid: string;
  display: string;
}

interface PreferredAddress {
  uuid: string;
  display: string;
}

interface Attribute {
  uuid: string;
  display: string;
}

interface Person {
  uuid: string;
  display: string;
  gender: string;
  age: number;
  birthdate: string;
  birthdateEstimated: boolean;
  dead: boolean;
  deathDate: string | null;
  causeOfDeath: string | null;
  preferredName: PreferredName;
  preferredAddress: PreferredAddress;
  attributes: Attribute[];
  voided: boolean;
  birthtime: string | null;
  deathdateEstimated: boolean;
  resourceVersion: string;
}

export interface Patient {
  uuid: string;
  display: string;
  identifiers: Identifier[];
  person: Person;
  voided: boolean;
  resourceVersion: string;
}
