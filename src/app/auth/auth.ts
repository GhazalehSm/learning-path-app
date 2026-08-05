import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  session?: { access_token: string; refresh_token: string };
  user?: { id: string; email: string };
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
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
          localStorage.setItem(this.refreshTokenKey, response.session.refresh_token);
          localStorage.setItem(this.emailKey, email);
        }
      }),
    );
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((response) => {
        if (response.session?.access_token) {
          localStorage.setItem(this.tokenKey, response.session.access_token);
          localStorage.setItem(this.refreshTokenKey, response.session.refresh_token);
        }
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }

  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.emailKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
