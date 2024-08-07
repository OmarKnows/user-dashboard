import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CardComponent } from '../../../common/components/card/card.component';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../common/types/user.types';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, CardComponent, MatProgressBarModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  users = signal<IUser[] | undefined>(undefined);
  isLoading = signal<boolean>(false);
  error = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        console.log(this.users());
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
