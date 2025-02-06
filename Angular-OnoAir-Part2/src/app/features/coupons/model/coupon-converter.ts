import { QueryDocumentSnapshot } from "firebase/firestore";
import { Coupon } from "./coupon";
import { Timestamp } from "@angular/fire/firestore";

export const CouponConverter = {
    toFirestore(coupon: Coupon) {
        return {
            codeCoupon: coupon.codeCoupon,
            startDate: Timestamp.fromDate(coupon.startDate),
            endDate: Timestamp.fromDate(coupon.endDate),
            discountPercentage: coupon.discountPercentage,
            description: coupon.description,
            usageLimit: coupon.usageLimit
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Coupon {
        const data = snapshot.data();
        return new Coupon(
            snapshot.id, // Assign the Firestore document ID
            data['codeCoupon'],
            this.convertToValidDate(data['startDate']),
            this.convertToValidDate(data['endDate']),
            data['discountPercentage'],
            data['description'],
            data['usageLimit']
        );
    },
    convertToValidDate(field: any): Date {
        if (field instanceof Date) {
            return field; // Already a Date object
        } else if (field instanceof Timestamp) {
            return field.toDate(); // Firestore Timestamp object
        } else if (typeof field === 'string') {
            return new Date(field); // ISO string
        } else {
            console.warn('Invalid date field:', field);
            return new Date(0); // Fallback to epoch
        }
    }
}