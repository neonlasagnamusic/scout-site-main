import { inject } from '@angular/core';
import { EMPTY, catchError, pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { RoleEntry } from '../models/roles.model';
import { RolesService } from '../services/roles.service';

interface RolesState {
  roles: RoleEntry[];
  isLoading: boolean;
  error: boolean;
}

const initialState: RolesState = {
  roles: [],
  isLoading: false,
  error: false,
};

export const RolesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const rolesService = inject(RolesService);
    return {
      loadRoles: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: false })),
          switchMap(() =>
            rolesService.getRoles().pipe(
              tap(roles => patchState(store, { roles, isLoading: false })),
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
      store.loadRoles();
    },
  })
);
