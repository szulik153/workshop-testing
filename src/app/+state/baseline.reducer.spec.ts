import { baselinesFeature, initialState, State } from './baseline.reducer';
import { AppActions } from './app.actions';
import { BaselineApiActions } from './baseline.actions';
import { BaselineDto } from '../types/baseline';

describe('Baseline Reducer', () => {
  it('should set loading to true after app opened', () => {
    const action = AppActions.appOpened();
    const result = baselinesFeature.reducer(initialState, action);
    expect(result.loading).toBeTrue();
  });

  it('should set loading to false after load baselines failed', () => {
    const action = BaselineApiActions.loadAllBaselinesFailure();
    const state: State = {
      ...initialState,
      loading: true,
    };

    const result = baselinesFeature.reducer(state, action);

    expect(result.loading).toBeFalse();
  });

  it('should add baseline after add baseline success', () => {
    const baseline: BaselineDto = {
      id: '12321',
      actualPartNumber: '00',
      targetPartNumber: '11',
      createdAt: new Date().toISOString(),
    };
    const action = BaselineApiActions.addBaselineSuccess({ baseline });

    const result = baselinesFeature.reducer(initialState, action);

    expect(result.ids).toContain(baseline.id);
    expect(result.entities[baseline.id]).toEqual(baseline);
  });

  it('should replace all baselines after load all baselines success', () => {
    const existingBaseline: BaselineDto = {
      id: '11',
      actualPartNumber: '1',
      targetPartNumber: '2',
      createdAt: new Date().toISOString(),
    };
    const state: State = {
      ...initialState,
      loading: true,
      ids: ['11'],
      entities: {
        '11': existingBaseline,
      },
    };

    const baselines: BaselineDto[] = [
      {
        id: '22',
        actualPartNumber: '2',
        targetPartNumber: '3',
        createdAt: new Date(2022, 10, 4, 12, 50).toISOString(),
      },
      {
        id: '33',
        actualPartNumber: '3',
        targetPartNumber: '4',
        createdAt: new Date(2022, 10, 3, 12, 50).toISOString(),
      },
    ];
    const action = BaselineApiActions.loadAllBaselinesSuccess({ baselines });

    const result = baselinesFeature.reducer(state, action);

    expect(result.loading).toBeFalse();
    expect(result.ids).not.toContain('11');
    expect(result.ids).toEqual(['22', '33']);
    expect(result.entities['22']).toEqual(baselines[0]);
    expect(result.entities['33']).toEqual(baselines[1]);
  });
});
