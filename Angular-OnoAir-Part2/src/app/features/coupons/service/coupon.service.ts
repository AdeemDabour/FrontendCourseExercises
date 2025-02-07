import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, setDoc, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Coupon } from '../model/coupon';
import { CouponConverter } from '../model/coupon-converter';
@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private collectionName = 'coupons';
  private couponsSubject = new BehaviorSubject<Coupon[]>([]);
  coupons$ = this.couponsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadCoupons();
  }
  public async loadCoupons(): Promise<Coupon[]> {
    const coupons = await this.refreshCoupons();
    this.couponsSubject.next(coupons);
    return coupons;
  }
  
  async addCoupon(newCoupon: Coupon): Promise<void> {
    const couponsCollection = collection(this.firestore, this.collectionName);
    const querySnapshot = await getDocs(couponsCollection);
    const ids = querySnapshot.docs.map(doc => parseInt(doc.id)).filter(id => !isNaN(id));
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    const couponDoc = doc(this.firestore, this.collectionName, nextId.toString());
    await setDoc(couponDoc, { ...newCoupon, id: nextId.toString() });
    console.log(`Coupon: ${newCoupon.description} added with ID: ${nextId}`);
  }
  async removeCoupon(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(docRef);

    await this.loadCoupons();
  }
  async updateCoupon(id: string, updatedCoupon: Coupon): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`).withConverter(CouponConverter);
    await setDoc(docRef, updatedCoupon);
    console.log(`Coupon ${updatedCoupon.description} updated successfully`);
  }
  async createUniqueId(): Promise<string> {
    const collectionRef = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(collectionRef);
    const ids = snapshot.docs.map((doc) => parseInt(doc.id, 10));
    const maxId = Math.max(...ids, 0);
    return (maxId + 1).toString();
  }
  async getCouponById(id: string): Promise<Coupon | undefined> {
    const collectionRef = collection(this.firestore, this.collectionName).withConverter(CouponConverter);
    const querySnapshot = await getDocs(collectionRef);
    const couponDoc = querySnapshot.docs.find((doc) => doc.id === id);
    if (couponDoc) {
      return couponDoc.data();
    } else {
      console.error(`Coupon with ID ${id} not found.`);
      return undefined;
    }
  }
  async refreshCoupons(): Promise<Coupon[]> {
    const collectionRef = collection(this.firestore, this.collectionName).withConverter(CouponConverter);
    const querySnapshot = await getDocs(collectionRef);
    const coupons = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((a, b) => parseInt(a.id) - parseInt(b.id));
    this.couponsSubject.next(coupons);
    return coupons;
  }

  applyCoupon(couponCode: string): number {
    const coupon = this.couponsSubject.getValue().find(c => c.codeCoupon.toUpperCase() === couponCode.trim().toUpperCase());
    if (!coupon) {
      return 0;
    }
    const today = new Date();
    if (today < new Date(coupon.startDate) || today > new Date(coupon.endDate)) {
      return 0;
    }
    return coupon.discountPercentage;
  }

  async getValidCoupon(code: string): Promise<Coupon | null> {
    const coupons = await this.loadCoupons();
    const today = new Date();
    
    return coupons.find(coupon => 
      coupon.codeCoupon.toUpperCase() === code.toUpperCase() &&
      new Date(coupon.startDate) <= today &&
      new Date(coupon.endDate) >= today
    ) || null;
  }
}