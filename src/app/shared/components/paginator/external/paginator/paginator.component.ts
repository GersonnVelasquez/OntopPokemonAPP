import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core'
import { PaginationEvent } from '../../models/pagination-event.interface'

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() currentPage: number | null
  @Input() length = 0
  @Input() itemsPerPageOptions: number[] = [5, 10, 20, 50]
  @Input() pageSize: number | null
  @Output() paginationEvent: EventEmitter<PaginationEvent> = new EventEmitter()
  totalPages = 0

  get isPreviousDisabled(): boolean {
    if (!this.currentPage) {
      return true
    }
    return this.currentPage <= 1
  }

  get isNextDisabled(): boolean {
    if (!this.currentPage) {
      return true
    }
    return this.currentPage >= this.totalPages
  }

  get hasItems(): boolean {
    return this.length > 0
  }

  ngOnChanges(): void {
    this.calculateTotalPages()
  }

  onPrevious(): void {
    if (!this.isPreviousDisabled && this.currentPage) {
      this.currentPage--
      this.emitPaginateEvent()
    }
  }

  onNext(): void {
    if (!this.isNextDisabled && this.currentPage) {
      this.currentPage++
      this.emitPaginateEvent()
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1
    this.calculateTotalPages()
    this.emitPaginateEvent()
  }

  private emitPaginateEvent(): void {
    this.paginationEvent.emit({
      page: this.currentPage ?? 0,
      pageSize: this.pageSize ?? 0,
    })
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.length / (this.pageSize ?? 1))
    this.currentPage = Math.max(
      1,
      Math.min(this.currentPage ?? 1, this.totalPages),
    )
  }
}
