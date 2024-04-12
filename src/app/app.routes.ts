import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in-up',
    async loadComponent() {
      const c = await import('./sign-in-up/sign-in-up.component');
      return c.SignInUpComponent;
    },
  },
  {
    path: '',
    async loadComponent() {
      const c = await import('./sign-in-up/sign-in-up.component');
      return c.SignInUpComponent;
    },
  },
];
