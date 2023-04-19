import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerConsulterComponent } from './creer-consulter.component';

describe('CreerConsulterComponent', () => {
  let component: CreerConsulterComponent;
  let fixture: ComponentFixture<CreerConsulterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerConsulterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
