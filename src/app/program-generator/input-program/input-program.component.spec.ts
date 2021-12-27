import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProgramComponent } from './input-program.component';

describe('InputProgramComponent', () => {
  let component: InputProgramComponent;
  let fixture: ComponentFixture<InputProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
