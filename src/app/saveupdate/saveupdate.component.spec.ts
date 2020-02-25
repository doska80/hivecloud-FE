import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveupdateComponent } from './saveupdate.component';

describe('SaveupdateComponent', () => {
  let component: SaveupdateComponent;
  let fixture: ComponentFixture<SaveupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
