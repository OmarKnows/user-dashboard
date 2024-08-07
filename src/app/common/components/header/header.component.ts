import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ROUTES } from '../../../constants/routes';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapGithub,
  bootstrapGrid1x2Fill,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgIconComponent,
  ],
  viewProviders: [provideIcons({ bootstrapGithub, bootstrapGrid1x2Fill })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  HomeURL = ROUTES.HOME;
}
