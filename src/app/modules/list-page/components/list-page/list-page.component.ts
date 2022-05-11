import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IUser, GetUserResponse} from '../../interfaces/user.interface';
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
    forkJoin({
      request1: this.listApiService.getUser(id),
      request2: this.listApiService.getUser(id + 1),
    }).subscribe((user: GetUserResponse<IUser>) => {
      this.addUser(user.request1);
      this.addUser(user.request2);

      this.lastLoadedPage=this.lastLoadedPage+2;
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
