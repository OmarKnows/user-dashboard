import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CardComponent } from '../../../common/components/card/card.component';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../common/types/user.types';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    CardComponent,
    MatProgressBarModule,
    MatPaginatorModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  users = signal<IUser[] | undefined>(undefined);
  isLoading = signal<boolean>(false);
  error = signal<string | undefined>(undefined);

  page = signal<number>(1);
  per_page = signal<number>(1);
  total = signal<number>(1);
  total_pages = signal<number>(1);

  ngOnInit(): void {
    const subscription = this.fetchUsers();
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  fetchUsers() {
    this.isLoading.set(true);
    return this.usersService.getUsers(this.page()).subscribe({
      next: (response) => {
        this.users.set(response.data);
        this.per_page.set(response.per_page);
        this.total.set(response.total);
        this.total_pages.set(response.total_pages);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  onPageChange(event: PageEvent) {
    if (typeof event.previousPageIndex !== 'undefined') {
      if (event.pageIndex > event.previousPageIndex) {
        this.page.set(this.page() + 1);
      } else {
        this.page.set(this.page() - 1);
      }
    }
    this.fetchUsers();
  }
}
