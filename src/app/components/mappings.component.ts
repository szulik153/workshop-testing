import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBaselineComponent } from './create-baseline.component';
import { CreateEcuComponent } from './create-ecu.component';
import { Store } from '@ngrx/store';
import { MappingTabActions } from '../+state/baseline.actions';
import { MatTabsModule } from '@angular/material/tabs';
import { BaselineSaveDto } from '../types/baseline';

@Component({
  selector: 'wsp-mappings',
  standalone: true,
  imports: [
    CommonModule,
    CreateBaselineComponent,
    CreateEcuComponent,
    MatTabsModule,
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="Baseline">
        <ng-template matTabContent>
          <wsp-create-baseline
            (addMapping)="onBaselineMappingAdded($event)"
          ></wsp-create-baseline>
        </ng-template>
      </mat-tab>
      <mat-tab label="Ecu">
        <ng-template matTabContent>
          <wsp-create-ecu></wsp-create-ecu>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [],
})
export class MappingsComponent {
  constructor(private readonly store: Store) {}

  onBaselineMappingAdded(mapping: BaselineSaveDto) {
    this.store.dispatch(
      MappingTabActions.addBaseline({ baselineToSave: mapping })
    );
  }
}
