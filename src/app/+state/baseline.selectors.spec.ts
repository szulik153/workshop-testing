import { baselinesFeature, initialState, State } from './baseline.reducer';
import { selectAllBaselines, selectBaselinesCount } from './baseline.selectors';

describe('Baseline Selectors', () => {
  const baseline = {
    id: '22',
    actualPartNumber: '1',
    targetPartNumber: '2',
    createdAt: new Date().toISOString(),
  };
  let state: { [baselinesFeature.name]: State };

  beforeEach(() => {
    state = {
      [baselinesFeature.name]: {
        ...initialState,
        loading: true,
        ids: ['22'],
        entities: {
          '22': baseline,
        },
      },
    };
  });

  it('should select all baselines', () => {
    const result = selectAllBaselines(state);
    expect(result.length).toEqual(1);
    expect(result).toContain(baseline);
  });

  it('should select count', () => {
    const result = selectBaselinesCount(state);
    expect(result).toEqual(1);
  });
});
