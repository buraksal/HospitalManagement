export class Patient {
    constructor(public id: number, 
        public name: string,
        public email: string,
        public password: string,
        public ssn: string,
        public complaint: string,
        public createdby: string) {}
}
  