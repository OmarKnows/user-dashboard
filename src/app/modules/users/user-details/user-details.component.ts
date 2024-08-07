import { Component } from '@angular/core';
import { IUserModel, users } from '../dummyData';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  user: IUserModel = users[0];
  formattedName: string = this.user.first_name + ' ' + this.user.last_name;
}
