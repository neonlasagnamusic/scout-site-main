import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fundraiser } from '../../shared/models/fundraising.model';
import { FundraisingStore } from '../../shared/stores/fundraising.store';

@Component({
  selector: 'app-fundraising',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './fundraising.component.html',
  styleUrl: './fundraising.component.scss'
})
export class FundraisingComponent {
  private store = inject(FundraisingStore);

  fundraisers = this.store.fundraisers;
  activeFundraisers = this.store.activeFundraisers;
  totalRaised = this.store.totalRaised;
  activeIds   = computed(() => new Set(this.store.activeFundraisers().map(f => f.id)));
  pastIds     = computed(() => {
    const now = Date.now();
    return new Set(
      this.store.fundraisers()
        .filter(f => {
          if (!f.endDate) return false;
          const end = new Date(f.endDate);
          end.setHours(23, 59, 59, 999);
          return now > end.getTime();
        })
        .map(f => f.id)
    );
  });
  upcomingIds = computed(() => {
    const now = Date.now();
    return new Set(
      this.store.fundraisers()
        .filter(f => f.startDate && now < new Date(f.startDate).getTime())
        .map(f => f.id)
    );
  });
  isLoading = this.store.isLoading;
  hasError = this.store.error;

  // Scouting year starts in August: Aug 2026 → "26" / "27"
  readonly scoutingYearLabel: string = (() => {
    const now = new Date();
    const yr = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
    return `${yr.toString().slice(-2)}/${(yr + 1).toString().slice(-2)}`;
  })();
  readonly scoutingYearStart = this.scoutingYearLabel.slice(0, 2);
  readonly scoutingYearEnd   = this.scoutingYearLabel.slice(3);

  progressFor(f: Fundraiser): number {
    if (f.goal <= 0) return 0;
    return Math.min(100, Math.round((f.currentTotal / f.goal) * 100));
  }

  daysUntilEnd(f: Fundraiser): number {
    const end = new Date(f.endDate);
    end.setHours(23, 59, 59, 999);
    return Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86_400_000));
  }
}
