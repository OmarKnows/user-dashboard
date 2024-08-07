import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { IUserModel } from '../dummyData';
import { UsersService } from '../../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIconComponent, RouterLink, MatButtonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  viewProviders: [provideIcons({ heroArrowLeft })],
})
export class UserDetailsComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  id = input.required<string>();

  user = signal<IUserModel | undefined>(undefined);
  isLoading = signal<boolean>(false);
  error = signal<string | undefined>(undefined);

  ngOnInit(): void {
    const subscription = this.usersService.getUser(this.id()).subscribe({
      next: (user) => {
        this.user.set(user);
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
