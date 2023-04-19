import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptateurComponent } from './adaptateur.component';

describe('AdaptateurComponent', () => {
  let component: AdaptateurComponent;
  let fixture: ComponentFixture<AdaptateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaptateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaptateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
