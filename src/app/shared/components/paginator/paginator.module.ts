import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginatorComponent } from './external/paginator/paginator.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, FormsModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
