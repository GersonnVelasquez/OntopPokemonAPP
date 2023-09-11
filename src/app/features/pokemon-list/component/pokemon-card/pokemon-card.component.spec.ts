/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { PokemonCardComponent } from './pokemon-card.component'
import { By } from '@angular/platform-browser'

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent
  let fixture: ComponentFixture<PokemonCardComponent>

  const pokemonMock: any = {
    id: 1,
    name: 'Pikachu',
    mainTypeColor: '#F7D02C',
    imageUrl: 'pikachu-image-url',
    pokedexNumber: '25',
    types: ['Electric'],
    evolutionChain: [],
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent)
    component = fixture.componentInstance
    component.pokemon = pokemonMock
    fixture.detectChanges()
  })

  it('should display the Pokemon card with correct data', () => {
    const cardElement = fixture.debugElement.query(By.css('.pokemon-card'))
    const imageElement = fixture.debugElement.query(
      By.css('.pokemon-card__image'),
    )
    const nameElement = fixture.debugElement.query(
      By.css('.pokemon-card__name'),
    )

    expect(cardElement).toBeTruthy()
    expect(imageElement.nativeElement.src).toContain(pokemonMock.imageUrl)
    expect(imageElement.nativeElement.alt).toContain(pokemonMock.name)
    expect(nameElement.nativeElement.textContent).toContain(
      `#${pokemonMock.pokedexNumber}`,
    )
    expect(nameElement.nativeElement.textContent).toContain(pokemonMock.name)
  })

  it('should emit "pokemonSelected" event when the button is clicked', () => {
    const spy = spyOn(component.pokemonSelected, 'emit')
    const cardButton = fixture.debugElement.query(By.css('.pokemon-card'))

    cardButton.nativeElement.click()

    expect(spy).toHaveBeenCalledWith(pokemonMock.id)
  })

  it('should set the correct background color', () => {
    const buttonElement = fixture.debugElement.query(By.css('.pokemon-card'))
    const backgroundColor = buttonElement.styles['background-color']

    expect(backgroundColor).toBe('rgb(247, 208, 44)')
  })
})
