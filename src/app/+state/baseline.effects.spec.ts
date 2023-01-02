import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions, EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';
import { BaselineEffects } from './baseline.effects';
import { MappingService } from '../services/mapping.service';
import { cold, hot } from 'jasmine-marbles';
import { BaselineApiActions, MappingTabActions } from './baseline.actions';
import { BaselineDto, BaselineSaveDto } from '../types/baseline';
import { of } from 'rxjs';

describe('Baseline Effects', () => {
  let actions$: Actions;
  let effects: BaselineEffects;
  let metadata: EffectsMetadata<BaselineEffects>;
  const mappingServiceSpy = jasmine.createSpyObj<MappingService>([
    'addBaseline',
    'getAllBaselines',
    'removeBaseline',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaselineEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: MappingService,
          useValue: mappingServiceSpy,
        },
      ],
    });

    effects = TestBed.inject(BaselineEffects);
    metadata = getEffectsMetadata(effects);
  });

  it('should dispatch addBaselineSuccess after addBaseline', () => {
    const baselineToSave: BaselineSaveDto = {
      actualPartNumber: '1',
      targetPartNumber: '2',
    };
    const action = hot('--a--a', {
      a: MappingTabActions.addBaseline({ baselineToSave }),
    });

    const newBaseline: BaselineDto = {
      id: '22',
      actualPartNumber: '1',
      targetPartNumber: '2',
      createdAt: new Date().toISOString(),
    };
    const response = cold('----b|', { b: newBaseline });
    mappingServiceSpy.addBaseline.and.returnValue(response);

    const expected = hot('------c--c', {
      c: BaselineApiActions.addBaselineSuccess({ baseline: newBaseline }),
    });

    actions$ = action;

    expect(effects.addBaseline$).toBeObservable(expected);
  });

  it('should dispatch addBaselineFailure after addBaseline', () => {
    const baselineToSave: BaselineSaveDto = {
      actualPartNumber: '1',
      targetPartNumber: '2',
    };
    const action = hot('---a', {
      a: MappingTabActions.addBaseline({ baselineToSave }),
    });

    const response = cold('--#', null, 'error');
    mappingServiceSpy.addBaseline.and.returnValue(response);

    const expected = hot('-----c', {
      c: BaselineApiActions.addBaselineFailure(),
    });

    actions$ = action;

    expect(effects.addBaseline$).toBeObservable(expected);
  });

  it('should show error on addBaselineFailure', () => {
    spyOn(console, 'error');
    const action = BaselineApiActions.addBaselineFailure();
    actions$ = of(action);

    effects.addBaselineFailure$.subscribe();

    expect(console.error).toHaveBeenCalledOnceWith('ERROR');
    expect(metadata.addBaselineFailure$?.dispatch).toBeFalse();
  });
});
