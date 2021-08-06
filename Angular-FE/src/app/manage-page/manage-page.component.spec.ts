/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManagePageComponent } from './manage-page.component';

describe('ManagePageComponent', () => {
  let component: ManagePageComponent;
  let fixture: ComponentFixture<ManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
