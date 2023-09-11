import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EvolutionChainComponent } from './evolution-chain.component'

describe('EvolutionChainComponent', () => {
  let component: EvolutionChainComponent
  let fixture: ComponentFixture<EvolutionChainComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvolutionChainComponent],
    })
    fixture = TestBed.createComponent(EvolutionChainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
