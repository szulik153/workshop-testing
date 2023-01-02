import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BaselineApiActions, MappingTabActions } from './baseline.actions';
import { MappingService } from '../services/mapping.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AppActions } from './app.actions';
import { SidebarActions } from './sidebar.actions';

@Injectable()
export class BaselineEffects {
  addBaseline$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MappingTabActions.addBaseline),
      mergeMap((action) =>
        this.service.addBaseline(action.baselineToSave).pipe(
          map((result) =>
            BaselineApiActions.addBaselineSuccess({ baseline: result })
          ),
          catchError(() => of(BaselineApiActions.addBaselineFailure()))
        )
      )
    );
  });

  addBaselineFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BaselineApiActions.addBaselineFailure),
        tap(() => console.error('ERROR'))
      );
    },
    {
      dispatch: false,
    }
  );

  loadBaselinesOnStartup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.appOpened),
      switchMap(() =>
        this.service.getAllBaselines().pipe(
          map((result) =>
            BaselineApiActions.loadAllBaselinesSuccess({ baselines: result })
          ),
          catchError(() => of(BaselineApiActions.loadAllBaselinesFailure()))
        )
      )
    );
  });

  deleteBaseline$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SidebarActions.deleteBaseline),
      mergeMap((action) =>
        this.service.removeBaseline(action.id).pipe(
          map(() =>
            BaselineApiActions.deleteBaselineSuccess({ id: action.id })
          ),
          catchError(() => of(BaselineApiActions.deleteBaselineFailure()))
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly service: MappingService
  ) {}
}
