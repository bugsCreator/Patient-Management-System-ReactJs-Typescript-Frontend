export interface Patient {
  _id?: string;
  name: string;
  age: number;
  sex: string;
  fathersName: string;
  contactNumber: string;
  designation: string;
  address: string;
}

export interface PatientHistory {
  id: number;
  name: string;
  age: number;
  address: string;
  pastPhotos: string[];
  prescriptions: string[];
}