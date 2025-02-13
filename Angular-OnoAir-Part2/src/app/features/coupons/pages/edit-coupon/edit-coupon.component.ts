import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Coupon } from '../../model/coupon';

import { CouponService } from '../../service/coupon.service';

import { CouponFormComponent } from '../coupon-form/coupon-form.component';

@Component({
  selector: 'app-edit-coupon',
  imports: [CouponFormComponent],
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css'],
})

export class EditCouponComponent implements OnInit {
  coupon: Coupon = new Coupon('', '', new Date(), new Date(), 0, '', 0);
  isLoading: boolean = true;

  constructor(
    private couponService: CouponService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    const couponId = this.route.snapshot.paramMap.get('id');
    if (couponId) {
      await this.loadCoupon(couponId);
    } else {
      console.error('No coupon ID provided.');
      this.router.navigate(['/manage-coupons']);
    }
  }

  async loadCoupon(id: string): Promise<void> {
    try {
      this.isLoading = true;
      const coupon = await this.couponService.getCouponById(id);
      if (coupon) {
        this.coupon = coupon;
      } else {
        console.error('Coupon not found.');
        this.router.navigate(['/manage-coupons']);
      }
    } catch (error) {
      console.error('Error loading coupon:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async saveCoupon(updatedCoupon: Coupon): Promise<void> {
    try {
      await this.couponService.updateCoupon(updatedCoupon.id, updatedCoupon);
      this.snackBar.open('Coupon updated successfully', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      this.router.navigate(['/manage-coupons']);
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  }
}