import { Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { IUserModel } from '../../../modules/users/dummyData';
import { RouterLink } from '@angular/router';
import { heroArrowRightCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  viewProviders: [provideIcons({ heroArrowRightCircle })],
})
export class CardComponent {
  user = input.required<IUserModel>();
  formattedName: string = '';

  ngOnInit() {
    this.formattedName = this.user().first_name + ' ' + this.user().last_name;
  }
}
