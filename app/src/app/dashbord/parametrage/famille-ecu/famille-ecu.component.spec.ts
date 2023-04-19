import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilleEcuComponent } from './famille-ecu.component';

describe('FamilleEcuComponent', () => {
  let component: FamilleEcuComponent;
  let fixture: ComponentFixture<FamilleEcuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilleEcuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilleEcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
