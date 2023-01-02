import { createFeature, createReducer, on } from '@ngrx/store';
import { BaselineApiActions } from './baseline.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BaselineDto } from '../types/baseline';
import { AppActions } from './app.actions';

export interface State extends EntityState<BaselineDto> {
  loading: boolean;
}

export const adapter = createEntityAdapter<BaselineDto>({
  selectId: (entity) => entity.id, // optional if property is called id
  sortComparer: (a, b) =>
    new Date(a.createdAt).getUTCMilliseconds() -
    new Date(b.createdAt).getUTCMilliseconds(),
});

export const initialState: State = adapter.getInitialState({
  loading: false,
});

export const baselinesFeature = createFeature({
  name: 'baselines',
  reducer: createReducer(
    initialState,
    on(
      BaselineApiActions.addBaselineSuccess,
      (state, action): State => adapter.addOne(action.baseline, state)
    ),
    on(AppActions.appOpened, (state) => ({
      ...state,
      loading: true,
    })),
    on(BaselineApiActions.loadAllBaselinesSuccess, (state, action) =>
      adapter.setAll(action.baselines, { ...state, loading: false })
    ),
    on(BaselineApiActions.loadAllBaselinesFailure, (state) => ({
      ...state,
      loading: false,
    })),
    on(BaselineApiActions.deleteBaselineSuccess, (state, action) =>
      adapter.removeOne(action.id, state)
    )
  ),
});
