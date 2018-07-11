import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphControllComponent } from './graph-controll.component';

describe('GraphControllComponent', () => {
  let component: GraphControllComponent;
  let fixture: ComponentFixture<GraphControllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphControllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
