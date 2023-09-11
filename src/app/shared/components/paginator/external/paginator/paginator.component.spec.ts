import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { PaginatorComponent } from './paginator.component'

describe('PaginatorComponent', () => {
  let component: PaginatorComponent
  let fixture: ComponentFixture<PaginatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      imports: [FormsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display correct total pages after initialization', () => {
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const pageInfo = fixture.debugElement.nativeElement.querySelector(
      '.pagination-container__pagination-options__page-info',
    )
    expect(pageInfo.textContent).toContain('Page 1 of 10')
  })

  it('should go to the next page when next button is clicked', () => {
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const nextButton = fixture.debugElement.nativeElement.querySelector(
      '.pagination-container__pagination-options__next-button',
    )
    nextButton.click()
    fixture.detectChanges()
    const pageInfo = fixture.debugElement.nativeElement.querySelector(
      '.pagination-container__pagination-options__page-info',
    )
    expect(pageInfo.textContent).toContain('Page 2 of 10')
  })

  it('should go to the previous page when previous button is clicked', () => {
    component.currentPage = 2
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const prevButton = fixture.debugElement.nativeElement.querySelector(
      '.pagination-container__pagination-options__previous-button',
    )
    prevButton.click()
    fixture.detectChanges()
    const pageInfo = fixture.debugElement.nativeElement.querySelector(
      '.pagination-container__pagination-options__page-info',
    )
    expect(pageInfo.textContent).toContain('Page 1 of 10')
  })

  it('should update items per page and display correct information when dropdown is changed', () => {
    component.currentPage = 1
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const select: HTMLSelectElement =
      fixture.debugElement.nativeElement.querySelector(
        '.pagination-container__items-per-page__select',
      )
    const pageInfo = fixture.debugElement.nativeElement.querySelector(
      '.pagination-container__pagination-options__page-info',
    )
    select.value = select.options[2].value
    select.dispatchEvent(new Event('change'))
    fixture.detectChanges()
    expect(component.pageSize.toString()).toEqual(
      component.itemsPerPageOptions[2].toString(),
    )
    expect(component.currentPage).toEqual(1)
    expect(pageInfo.textContent).toEqual('Page 1 of 5')
  })

  it('should disable the previous button on the first page', () => {
    component.currentPage = 1
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const prevButton: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector(
        '.pagination-container__pagination-options__previous-button',
      )
    expect(prevButton.disabled).toBeTrue()
  })

  it('should enable the previous button when not on the first page', () => {
    component.currentPage = 2
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const prevButton: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector(
        '.pagination-container__pagination-options__previous-button',
      )
    expect(prevButton.disabled).toBeFalse()
  })

  it('should disable the next button on the last page', () => {
    component.currentPage = 10
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const nextButton: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector(
        '.pagination-container__pagination-options__next-button',
      )
    expect(nextButton.disabled).toBeTrue()
  })

  it('should enable the next button when not on the last page', () => {
    component.currentPage = 1
    component.length = 100
    component.pageSize = 10
    component.ngOnChanges()
    fixture.detectChanges()
    const nextButton: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector(
        '.pagination-container__pagination-options__next-button',
      )
    expect(nextButton.disabled).toBeFalse()
  })
})
