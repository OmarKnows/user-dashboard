import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IUser } from '../../../common/types/user.types';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIconComponent, RouterLink, MatButtonModule, MatProgressBarModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  viewProviders: [provideIcons({ heroArrowLeft })],
})
export class UserDetailsComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  id = input.required<string>();

  user = signal<IUser | undefined>(undefined);
  isLoading = signal<boolean>(false);
  error = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.usersService.getUser(this.id()).subscribe({
      next: (response) => {
        this.user.set(response.data);
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
