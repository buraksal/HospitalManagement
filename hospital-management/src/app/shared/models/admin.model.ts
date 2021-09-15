import { UserTypes } from "./usertypes.model";

export class Doctor {
    constructor(
        public userType: UserTypes = UserTypes.Admin,
        public name: string,
        public email: string,
        public password: string,
        public ssn: string) {}
}