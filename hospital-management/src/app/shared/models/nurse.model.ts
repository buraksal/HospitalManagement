import { UserTypes } from "./usertypes.model";

export class Nurse {
    constructor(
        public userType: UserTypes = UserTypes.Nurse,
        public name: string,
        public email: string,
        public password: string,
        public ssn: string
        ) {}
}