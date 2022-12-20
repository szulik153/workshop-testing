import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaselineComponent } from './create-baseline.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('CreateBaselineComponent', () => {
  let component: CreateBaselineComponent;
  let fixture: ComponentFixture<CreateBaselineComponent>;
  let page: PageObject;

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
    page = new PageObject(fixture);
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

  it('Harness - should submit button be disabled when target number is empty', async () => {
    await page.setActualPartNumberValue('12345');
    const button = await page.getSaveButton();

    expect(await button.isDisabled()).toBeTrue();
  });

  it('should submit button be enabled when all fields are not empty', () => {
    const actualPartNumberInputDe = fixture.debugElement.query(
      By.css('input[name=actualPartNumber]')
    );
    const actualPartNumberInput =
      actualPartNumberInputDe.nativeElement as HTMLInputElement;

    const targetPartNumberInputDe = fixture.debugElement.query(
      By.css('input[name=targetPartNumber]')
    );
    const targetPartNumberInput =
      targetPartNumberInputDe.nativeElement as HTMLInputElement;

    actualPartNumberInput.value = 'abcd';
    targetPartNumberInput.value = '1234';

    const buttonDe = fixture.debugElement.query(By.css('button[type=submit]'));
    const button = buttonDe.nativeElement as HTMLButtonElement;

    expect(button.disabled).toBeFalse();
  });

  it('Harness - should submit button be enabled when all fields are not empty', async () => {
    const submitButton = await page.getSaveButton();

    await page.setActualPartNumberValue('abcd');
    await page.setTargetPartNumberValue('1234');

    expect(await submitButton.isDisabled()).toBeFalse();
  });

  it('should reset button clear the form', async () => {
    const resetButton = await page.getResetButton();

    await page.setActualPartNumberValue('abcd');
    await page.setTargetPartNumberValue('1234');

    expect(component.baselineToSave.actualPartNumber).toEqual('abcd');
    expect(component.baselineToSave.targetPartNumber).toEqual('1234');

    await resetButton.click();

    expect(component.baselineToSave.actualPartNumber).toBeNull();
    expect(component.baselineToSave.targetPartNumber).toBeNull();
  });

  it('should add event on save', async () => {
    const actualPartNumber = 'A1';
    const targetPartNumber = 'A2';
    spyOn(component.addMapping, 'emit');

    await page.setActualPartNumberValue(actualPartNumber);
    await page.setTargetPartNumberValue(targetPartNumber);
    const saveButton = await page.getSaveButton();
    await saveButton.click();

    expect(component.addMapping.emit).toHaveBeenCalledOnceWith({
      actualPartNumber,
      targetPartNumber,
    });
  });

  it('should emit add event on submit', () => {
    const actualPartNumber = 'A1';
    const targetPartNumber = 'A2';
    spyOn(component.addMapping, 'emit');

    component.baselineToSave.actualPartNumber = actualPartNumber;
    component.baselineToSave.targetPartNumber = targetPartNumber;

    component.onSubmit();

    expect(component.addMapping.emit).toHaveBeenCalledOnceWith({
      actualPartNumber,
      targetPartNumber,
    });
  });
});

class PageObject {
  private loader;

  constructor(fixture: ComponentFixture<CreateBaselineComponent>) {
    this.loader = TestbedHarnessEnvironment.loader(fixture);
  }

  async getSaveButton(): Promise<MatButtonHarness> {
    return await this.loader.getHarness(
      MatButtonHarness.with({ text: 'Save' })
    );
  }

  async getResetButton(): Promise<MatButtonHarness> {
    return await this.loader.getHarness(
      MatButtonHarness.with({ text: 'Reset' })
    );
  }

  async setActualPartNumberValue(value: string): Promise<void> {
    const input = await this.loader.getHarness(
      MatInputHarness.with({ selector: '[name=actualPartNumber]' })
    );

    await input.setValue(value);
  }

  async setTargetPartNumberValue(value: string): Promise<void> {
    const input = await this.loader.getHarness(
      MatInputHarness.with({ selector: '[name=targetPartNumber]' })
    );

    await input.setValue(value);
  }
}
