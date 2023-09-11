/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DescriptionComponent } from './description.component'

describe('DescriptionComponent', () => {
  let component: DescriptionComponent
  let fixture: ComponentFixture<DescriptionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionComponent)
    component = fixture.componentInstance
  })

  it('should display the correct pokemon description', () => {
    component.pokemon = {
      id: 1,
      description: 'Bulbasaur is a grass/poison-type Pokémon.',
    } as any

    fixture.detectChanges()

    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('.description__title').textContent).toContain(
      'Description',
    )
    expect(compiled.querySelector('.description p').textContent).toContain(
      'Bulbasaur is a grass/poison-type Pokémon.',
    )
  })
})
