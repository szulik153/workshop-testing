import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaselineComponent } from './create-baseline.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateBaselineComponent', () => {
  let component: CreateBaselineComponent;
  let fixture: ComponentFixture<CreateBaselineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateBaselineComponent,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
