import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  session?: { access_token: string };
  user?: { id: string; email: string };
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'access_token';
  private emailKey = 'user_email';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { email, password });
  }

  signIn(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, { email, password }).pipe(
      tap((response) => {
        if (response.session?.access_token) {
          localStorage.setItem(this.tokenKey, response.session.access_token);
          localStorage.setItem(this.emailKey, email);
        }
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }

  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.emailKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
