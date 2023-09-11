/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EvolutionChainComponent } from './evolution-chain.component'

describe('EvolutionChainComponent', () => {
  let component: EvolutionChainComponent
  let fixture: ComponentFixture<EvolutionChainComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvolutionChainComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionChainComponent)
    component = fixture.componentInstance
  })

  it('should display the correct pokemon evolution chain', () => {
    component.pokemon = {
      id: 1,
      name: 'Bulbasaur',
      evolutionChain: ['Bulbasaur', 'Ivysaur', 'Venusaur'],
    } as any

    fixture.detectChanges()

    const compiled = fixture.debugElement.nativeElement
    expect(
      compiled.querySelector('.evolution-chain__title').textContent,
    ).toContain('Evolution Chain')

    const listItems = compiled.querySelectorAll('.evolution-chain__list__item')
    expect(listItems.length).toBe(3)
    expect(listItems[0].textContent).toContain('Bulbasaur')
    expect(listItems[1].textContent).toContain('Ivysaur')
    expect(listItems[2].textContent).toContain('Venusaur')
  })
})
