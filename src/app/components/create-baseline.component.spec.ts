import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaselineComponent } from './create-baseline.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

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

  it('should submit button be disabled when target number is empty', () => {
    const inputDe = fixture.debugElement.query(
      By.css('input[name=actualPartNumber]')
    );
    const input = inputDe.nativeElement as HTMLInputElement;
    input.value = '12345';

    fixture.detectChanges();

    const buttonDe = fixture.debugElement.query(By.css('button[type=submit]'));
    const button = buttonDe.nativeElement as HTMLButtonElement;

    expect(button.disabled).toBeTrue();
  });
});
