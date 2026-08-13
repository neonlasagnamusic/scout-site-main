import { computed, inject } from '@angular/core';
import { EMPTY, catchError, pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Fundraiser } from '../models/fundraising.model';
import { FundraisingService } from '../services/fundraising.service';

interface FundraisingState {
  fundraisers: Fundraiser[];
  additionalFunds: number;
  isLoading: boolean;
  error: boolean;
}

const initialState: FundraisingState = {
  fundraisers: [],
  additionalFunds: 0,
  isLoading: false,
  error: false,
};

export const FundraisingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    fundraiserById: computed(() => {
      const map = new Map<string, Fundraiser>();
      for (const f of store.fundraisers()) map.set(f.id, f);
      return map;
    }),
    totalRaised: computed(() =>
      store.fundraisers().reduce((sum, f) => sum + f.currentTotal, 0) + store.additionalFunds()
    ),
    activeFundraisers: computed(() => {
      const now = new Date();
      return store.fundraisers().filter(f => {
        if (!f.startDate || !f.endDate) return false;
        const start = new Date(f.startDate);
        const end = new Date(f.endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;
        end.setHours(23, 59, 59, 999);
        return now >= start && now <= end;
      });
    }),
  })),
  withMethods((store) => {
    const fundraisingService = inject(FundraisingService);
    return {
      loadFundraisers: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: false })),
          switchMap(() =>
            fundraisingService.getFundraisers().pipe(
              tap(data => patchState(store, {
                fundraisers: data.fundraisers,
                additionalFunds: data.additionalFunds,
                isLoading: false
              })),
              catchError(() => {
                patchState(store, { error: true, isLoading: false });
                return EMPTY;
              })
            )
          )
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store.loadFundraisers();
    },
  })
);
