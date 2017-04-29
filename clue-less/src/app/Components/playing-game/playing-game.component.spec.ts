import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingGameComponent } from './playing-game.component';

describe('PlayingGameComponent', () => {
  let component: PlayingGameComponent;
  let fixture: ComponentFixture<PlayingGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
