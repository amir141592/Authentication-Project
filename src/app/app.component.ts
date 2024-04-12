import { Component } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  saxShopOutline,
  sax3dcubeOutline,
  saxShoppingCartOutline,
  saxInformationOutline,
  saxUserOutline,
  saxLoginOutline,
} from '@ng-icons/iconsax/outline';
import { saxShoppingBagBold } from '@ng-icons/iconsax/bold';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, RouterLinkActive, NgIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [
    provideIcons({
      saxShopOutline,
      saxShoppingBagBold,
      sax3dcubeOutline,
      saxShoppingCartOutline,
      saxInformationOutline,
      saxUserOutline,
      saxLoginOutline,
    }),
  ],
})
export class AppComponent {}
