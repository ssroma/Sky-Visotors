

export class Prebook {
    constructor(
        public hostName: string,
        public visitCategory: string,
        public dateExpected: string,
        public timeExpected: string,
        public dateEnd: string,
        public timeEnd: string,
        public location: Array<any>,
    ){ }
}