import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Coupon } from '../../model/coupon';
import { CouponService } from '../../service/coupon.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATETIME_FORMATS, CustomDateAdapter } from '../../../flights/model/CustomDateAdapter';
@Component({
  selector: 'app-coupon-form',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, RouterModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './coupon-form.component.html',
  styleUrl: './coupon-form.component.css',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ]
})
export class CouponFormComponent implements OnInit {
  newCoupon: Coupon = new Coupon('', '', new Date(), new Date(), 0, '', 0);

  today: Date = new Date();
  exitingCoupons: Coupon[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  couponErrorMessage: string | null = null;
  @Input() id = 0;
  @Input() coupon: Coupon = new Coupon('', '', new Date(), new Date(), 0, '', 0);
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<Coupon>();

  constructor(
    private couponService: CouponService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  async ngOnInit(): Promise<void> {
    this.exitingCoupons = await firstValueFrom(this.couponService.coupons$);
  }


  submitForm(): void {
    this.formSubmit.emit(this.coupon);
  }

  async onSubmitRegistration(): Promise<void> {
    this.couponErrorMessage = null; // Reset previous error

    try {
      await this.couponService.addCoupon(this.coupon);
      this.router.navigate(['/manage-coupons']); // Redirect after success
    } catch (error) {
      if (error instanceof Error) {
        this.couponErrorMessage = error.message; // Set the error message
      } else {
        this.couponErrorMessage = 'An unknown error occurred';
      }
    }
  }
}