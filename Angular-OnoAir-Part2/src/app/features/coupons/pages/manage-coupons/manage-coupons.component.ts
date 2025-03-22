import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, inject } from '@angular/core';

import { Coupon } from '../../model/coupon';

import { CouponService } from '../../service/coupon.service';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-coupons',
  imports: [MatSortModule, MatTableModule, MatIconModule, MatButtonModule, MatProgressBarModule, CommonModule, MatPaginatorModule],
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.css']
})

export class ManageCouponsComponent implements OnInit {
  [x: string]: any;
  private_liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['id', 'code', 'startDate', 'endDate', 'discount', 'description', 'usageLimit', 'actions'];
  dataSource = new MatTableDataSource<Coupon>();
  isLoading: boolean = true;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private couponService: CouponService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  async loadCoupons(): Promise<void> {
    await this.couponService.refreshCoupons();
    try {
      this.couponService.refreshCoupons().then((coupons) => {
        this.dataSource.data = coupons;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.error('Error loading coupons:', error);
    } finally {
      this.isLoading = false;
    }
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.private_liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.private_liveAnnouncer.announce('Sorting cleared');
    }
  }

  openCouponDetails(coupon: Coupon): void {
    this.router.navigate(['/bookings/coupons', coupon.codeCoupon]);
  }

  openEditCoupon(coupon: Coupon): void {
    this.router.navigate(['edit-coupon', coupon.id]);
  }
  deleteCoupon(coupon: Coupon): void {
    const confirmation = confirm('Are you sure you want to delete this coupon: ' + coupon.codeCoupon + '?');
    if (confirmation) {
      this.couponService.removeCoupon(coupon.id).then(() => {
        console.log(`Coupon with ID ${coupon.id} deleted successfully`);
        this.loadCoupons();
      });
    }
  }

  navigateToAddCoupon(): void {
    this.couponService.createUniqueId().then((uniqueId) => {
      this.router.navigate(['/coupon-form', uniqueId]);
    }).catch((error) => {
      console.error('Error creating unique ID:', error);
    });
  }
}