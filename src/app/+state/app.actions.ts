import { createActionGroup, emptyProps } from '@ngrx/store';

export const AppActions = createActionGroup({
  source: 'App Component',
  events: {
    'App Opened': emptyProps(),
  },
});
