export class Coupon {
    constructor(
        public id: string,
        public codeCoupon: string,
        public startDate: Date,
        public endDate: Date,
        public discountPercentage: number,
        public description: string,
        public usageLimit: number
    ) { }
}