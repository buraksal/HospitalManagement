import { Nurse } from "./nurse.model";

export class Doctor {
    constructor(public id: number, 
        public name: string,
        public email: string,
        public password: string,
        public ssn: string,
        public department: string,
        public nurse: Nurse[]) {}
}