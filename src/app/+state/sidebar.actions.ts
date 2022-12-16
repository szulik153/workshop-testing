import { createActionGroup, props } from '@ngrx/store';

export const SidebarActions = createActionGroup({
  source: 'Sidebar',
  events: {
    'Delete Baseline': props<{ id: string }>(),
  },
});
