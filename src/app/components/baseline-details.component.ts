import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BaselineDto } from '../types/baseline';

@Component({
  selector: 'wsp-baseline-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card>
      <mat-card-title>Baseline</mat-card-title>
      <mat-card-subtitle>
        Created: {{ baseline.createdAt | date : 'medium' }}
      </mat-card-subtitle>
      <mat-card-content>
        <p>Actual: {{ baseline.actualPartNumber }}</p>
        <p>Target: {{ baseline.targetPartNumber }}</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button
          mat-icon-button
          data-cy="delete-button"
          color="warn"
          (click)="onDelete()"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class BaselineDetailsComponent {
  @Input()
  baseline!: BaselineDto;

  @Output()
  readonly deleteBaseline = new EventEmitter<string>();

  onDelete() {
    this.deleteBaseline.emit(this.baseline.id);
  }
}
