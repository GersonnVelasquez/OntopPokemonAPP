import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PokemoncardComponent } from './pokemon-card.component'

describe('PokemoncardComponent', () => {
  let component: PokemoncardComponent
  let fixture: ComponentFixture<PokemoncardComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemoncardComponent],
    })
    fixture = TestBed.createComponent(PokemoncardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
