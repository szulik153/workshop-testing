import { TestBed } from '@angular/core/testing';
import { MappingService } from './mapping.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BaselineDto } from '../types/baseline';
import { HttpErrorResponse } from '@angular/common/http';

describe('MappingService', () => {
  let service: MappingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MappingService],
    });

    service = TestBed.inject(MappingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return baselines', () => {
    const httpResponse = [
      {
        id: '1234',
        actualPartNumber: 'a1',
        targetPartNumber: 'a2',
        createdAt: new Date().toISOString(),
      },
    ];
    const expected: BaselineDto[] = [
      {
        id: '1234',
        actualPartNumber: 'a1',
        targetPartNumber: 'a2',
        createdAt: new Date().toISOString(),
      },
    ];

    service.getAllBaselines().subscribe((result) => {
      expect(result).toEqual(expected);
    });

    const request = httpTestingController.expectOne('api/baseline');
    expect(request.request.method).toEqual('GET');
    request.flush(httpResponse);
  });

  it('should return error', () => {
    const expected = { error: 'error msg' };

    service.getAllBaselines().subscribe({
      error: (err) =>
        expect((err as HttpErrorResponse).error).toEqual(expected),
    });

    const request = httpTestingController.expectOne('api/baseline');
    expect(request.request.method).toEqual('GET');
    request.flush(
      { error: 'error msg' },
      { status: 404, statusText: 'Not Found' }
    );
  });
});
