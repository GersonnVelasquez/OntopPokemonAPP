/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
  })

  it('should display the correct pokemon main details', () => {
    component.pokemon = {
      id: 1,
      name: 'Bulbasaur',
      imageUrl: 'https://example.com/bulbasaur.png',
      mainTypeColor: '#48D0B0',
      pokedexNumber: '1',
      mainType: 'Grass',
      types: ['Grass', 'Poison'],
    } as any

    fixture.detectChanges()

    const compiled = fixture.debugElement.nativeElement
    expect(
      compiled.querySelector('.pokemon-main-details').style.backgroundColor,
    ).toBe('rgb(72, 208, 176)')
    expect(compiled.querySelector('.pokemon-main-details__image').src).toBe(
      'https://example.com/bulbasaur.png',
    )
    expect(compiled.querySelector('.pokemon-main-details__image').alt).toBe(
      'Bulbasaur',
    )
    expect(
      compiled.querySelector('.pokemon-main-details__main-info__name')
        .textContent,
    ).toContain('BULBASAUR')
    expect(
      compiled.querySelector('.pokemon-main-details__main-info__pokedex-number')
        .textContent,
    ).toContain('#1')
    expect(
      compiled.querySelector('.pokemon-main-details__main-info__main-type')
        .textContent,
    ).toContain('Grass')

    const typeElements = compiled.querySelectorAll(
      '.pokemon-main-details__main-info__types__type',
    )
    expect(typeElements.length).toBe(2)
    expect(typeElements[0].textContent).toContain('Grass')
    expect(typeElements[1].textContent).toContain('Poison')
  })
})
