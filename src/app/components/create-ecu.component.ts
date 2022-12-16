import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EcuSaveDto } from '../types/ecu';

@Component({
  selector: 'wsp-create-ecu',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  template: `
    <form
      class="flex flex-col gap-2 m-4 max-w-lg"
      (ngSubmit)="onSubmit()"
      #form="ngForm"
    >
      <mat-form-field appearance="outline">
        <mat-label>Actual ECU ID</mat-label>
        <input
          matInput
          required
          name="actualEcuId"
          [(ngModel)]="ecuToSave.actualEcuId"
        />
        <mat-error>Field is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Target ECU ID</mat-label>
        <input
          matInput
          required
          name="targetEcuId"
          [(ngModel)]="ecuToSave.targetEcuId"
        />
        <mat-error>Field is required</mat-error>
      </mat-form-field>

      <div class="flex flex-row items-center justify-end gap-2">
        <button mat-flat-button color="warn" type="reset">Reset</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="form.invalid"
        >
          Save
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class CreateEcuComponent {
  ecuToSave: EcuSaveDto = {
    actualEcuId: '',
    targetEcuId: '',
  };

  onSubmit(): void {
    // TODO
  }
}
