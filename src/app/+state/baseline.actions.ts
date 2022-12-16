import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BaselineDto, BaselineSaveDto } from '../types/baseline';

/*const addBaseline = createAction(
  '[Mappings Tab] Add Baseline',
  props<{ baselineToSave: BaselineSaveDto }>()
);

const updateBaseline = createAction(
  '[Mappings Tab] Update Baseline',
  props<{ baselineToUpdate: BaselineSaveDto }>()
);*/

export const MappingTabActions = createActionGroup({
  source: 'Mappings Tab',
  events: {
    'Add Baseline': props<{ baselineToSave: BaselineSaveDto }>(),
    'Update Baseline': props<{ baselineToUpdate: BaselineSaveDto }>(),
  },
});

export const BaselineApiActions = createActionGroup({
  source: 'Baseline Api',
  events: {
    'Add Baseline Success': props<{ baseline: BaselineDto }>(),
    'Add Baseline Failure': emptyProps(),
    'Load All Baselines Success': props<{ baselines: BaselineDto[] }>(),
    'Load All Baselines Failure': emptyProps(),
    'Delete Baseline Success': props<{ id: string }>(),
    'Delete Baseline Failure': emptyProps(),
  },
});
