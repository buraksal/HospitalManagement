import { Nurse } from "./nurse.model";

export class Patient {
    constructor(public id: number, 
        public name: string,
        public email: string,
        public password: string,
        public ssn: string,
        public nurse: Nurse) {}
}
  