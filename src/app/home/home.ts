import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(public auth: Auth) {}

  logOut() {
    this.auth.signOut();
    window.location.reload();
  }

  get userName(): string | null {
    const email = this.auth.getEmail();
    return email?.split('@')[0] ?? null;
  }
}
