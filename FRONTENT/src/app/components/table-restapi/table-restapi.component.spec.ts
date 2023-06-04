import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRestapiComponent } from './table-restapi.component';

describe('TableRestapiComponent', () => {
  let component: TableRestapiComponent;
  let fixture: ComponentFixture<TableRestapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRestapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRestapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
