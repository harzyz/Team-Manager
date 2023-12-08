import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserListData } from 'src/app/data/userdat';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() limit = 20;
  @Output() changePage = new EventEmitter<number>();

  total = UserListData;
  pages: number[] = [];

  constructor() {}

  ngOnInit() {
    const pagesCount = Math.ceil(this.total.length / this.limit);
    this.pages = this.range(1, pagesCount);
    const indexofLastItem = this.currentPage * this.limit;
    const indexofFirstItem = indexofLastItem - this.limit;
    const currentItems = this.total.slice(indexofFirstItem, indexofLastItem);
    console.log(this.currentPage)
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.changePage.emit(this.currentPage);
    }
  }
}
