import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseProductsComponent } from './use-products.component';

describe('UseProductsComponent', () => {
  let component: UseProductsComponent;
  let fixture: ComponentFixture<UseProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
