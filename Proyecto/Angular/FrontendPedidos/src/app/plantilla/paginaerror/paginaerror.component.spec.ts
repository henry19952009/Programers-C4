import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaerrorComponent } from './paginaerror.component';

describe('PaginaerrorComponent', () => {
  let component: PaginaerrorComponent;
  let fixture: ComponentFixture<PaginaerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaerrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
