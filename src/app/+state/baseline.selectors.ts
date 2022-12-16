import { createSelector } from '@ngrx/store';
import { adapter, baselinesFeature } from './baseline.reducer';

const { selectAll, selectTotal } = adapter.getSelectors();
export const selectAllBaselines = createSelector(
  baselinesFeature.selectBaselinesState,
  selectAll
);

export const selectBaselinesCount = createSelector(
  baselinesFeature.selectBaselinesState,
  selectTotal
);
