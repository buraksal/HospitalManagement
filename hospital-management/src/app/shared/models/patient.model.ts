import { UserTypes } from "./usertypes.model";

export class Patient {
    constructor(
        public userType: UserTypes = UserTypes.Patient,
        public name: string,
        public email: string,
        public password: string,
        public ssn: string,
        public complaint: string,
        public createdBySsn: string) {}
}
  