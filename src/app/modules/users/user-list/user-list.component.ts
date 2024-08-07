import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IUserModel, users } from '../dummyData';
import { CardComponent } from '../../../common/components/card/card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, CardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  usersList: IUserModel[] = users;
}
