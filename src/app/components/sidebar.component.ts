import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaselineDetailsComponent } from './baseline-details.component';
import { EcuDetailsComponent } from './ecu-details.component';
import { Store } from '@ngrx/store';
import { selectAllBaselines } from '../+state/baseline.selectors';
import { SidebarActions } from '../+state/sidebar.actions';

@Component({
  selector: 'wsp-sidebar',
  standalone: true,
  imports: [CommonModule, BaselineDetailsComponent, EcuDetailsComponent],
  template: `
    <p>List of mappings:</p>
    <div class="flex flex-col gap-2">
      <wsp-baseline-details
        *ngFor="let baseline of baselineMapping$ | async"
        [baseline]="baseline"
        (deleteBaseline)="onDeleteBaseline($event)"
      ></wsp-baseline-details>
      <wsp-ecu-details></wsp-ecu-details>
    </div>
  `,
  styles: [
    `
      :host {
        @apply block m-2;
      }
    `,
  ],
})
export class SidebarComponent {
  baselineMapping$ = this.store.select(selectAllBaselines);

  constructor(private readonly store: Store) {}

  onDeleteBaseline(id: string) {
    this.store.dispatch(SidebarActions.deleteBaseline({ id }));
  }
}
