import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { ListApiService } from '../../services/list-api.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  perPage: number = 2;
  lastLoadedPage: number = 1;
  users: IUser[] = [];

  constructor(public listApiService: ListApiService) {}

  ngOnInit() {
    this.getList(this.lastLoadedPage);
  }

  getList(id: number): void {
    this.listApiService.getUser(this.lastLoadedPage).subscribe((user) => {
      this.addUser(user);
      this.lastLoadedPage++;
    });
  }

  loadMore(): void {
    this.getList(this.lastLoadedPage);
  }

  clear(): void {
    this.users = [];
    this.lastLoadedPage = 1;
  }

  // deep clone is mandatory
  private addUser(user: IUser): void {
    this.users = this.deepClone(this.users);
    this.users.push(user);
  }

  private deepClone = <T>(object: T): T => JSON.parse(JSON.stringify(object));
}
