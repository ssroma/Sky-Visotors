

export class Prebook {
    constructor(
        private hostName: string,
        private visitCategory: string,
        private dateExpected: string,
        private timeExpected: string,
        private dateEnd: string,
        private timeEnd: string,
        private location: Array<any>,
    ){ }
}