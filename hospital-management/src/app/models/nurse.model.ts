import { Patient } from "./patient.model";

export class Nurse {
    constructor(public id: number, 
        public name: string,
        public email: string,
        public password: string,
        public ssn: string,
        public patient: Patient[]) {}
}