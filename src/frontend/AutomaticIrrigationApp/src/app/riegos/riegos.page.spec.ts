import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiegosPage } from './riegos.page';

describe('RiegosPage', () => {
  let component: RiegosPage;
  let fixture: ComponentFixture<RiegosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RiegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
