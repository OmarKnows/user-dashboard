import { Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { heroArrowRightCircle } from '@ng-icons/heroicons/outline';
import { IUser } from '../../types/user.types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  viewProviders: [provideIcons({ heroArrowRightCircle })],
})
export class CardComponent {
  user = input.required<IUser>();
  formattedName: string = '';

  ngOnInit() {
    this.formattedName = this.user().first_name + ' ' + this.user().last_name;
  }
}
