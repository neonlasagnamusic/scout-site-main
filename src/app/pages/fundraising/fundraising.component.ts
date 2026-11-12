import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fundraiser } from '../../shared/models/fundraising.model';
import { FundraisingStore } from '../../shared/stores/fundraising.store';

/**
 * Fundraising flyer settings.
 * - src: path under public/ (e.g. 'images/fundraising/popcorn-2026.jpg'). Leave empty to hide the flyer entirely.
 * - showOnPageLoad: true pops the flyer up when someone visits the page (once per browser session).
 *   false (default) only shows it when the "View Flyer" button is clicked.
 */
const FUNDRAISING_FLYER = {
  src: '',
  alt: 'Pack 541 fundraiser flyer',
  showOnPageLoad: false,
};

@Component({
  selector: 'app-fundraising',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './fundraising.component.html',
  styleUrl: './fundraising.component.scss'
})
export class FundraisingComponent implements OnInit {
  private store = inject(FundraisingStore);

  readonly flyer = FUNDRAISING_FLYER;
  showFlyer = signal(false);
  // Keyed by image path so swapping in a new flyer pops up again even for visitors who dismissed the old one.
  private readonly flyerDismissedKey = `pack541-fundraising-flyer-dismissed:${FUNDRAISING_FLYER.src}`;

  ngOnInit(): void {
    if (this.flyer.src && this.flyer.showOnPageLoad && !this.readDismissed()) {
      this.showFlyer.set(true);
    }
  }

  openFlyer(): void {
    this.showFlyer.set(true);
  }

  closeFlyer(): void {
    this.showFlyer.set(false);
    try { sessionStorage.setItem(this.flyerDismissedKey, 'true'); } catch { /* storage unavailable */ }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showFlyer()) this.closeFlyer();
  }

  private readDismissed(): boolean {
    try { return !!sessionStorage.getItem(this.flyerDismissedKey); } catch { return false; }
  }

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
