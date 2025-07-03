import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface TokenRequest {
  name: string;
}

interface TokenResponse {
  token: string;
  expires: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'videogames_token';
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());

  constructor(private http: HttpClient) {}

  generateToken(name: string): Observable<TokenResponse> {
    const mockToken = this.createMockToken(name);
    const response: TokenResponse = {
      token: mockToken,
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    };

    return new Observable(observer => {
      setTimeout(() => {
        this.setToken(response.token);
        observer.next(response);
        observer.complete();
      }, 1000); // Simula delay de red
    });
  }

  private createMockToken(name: string): string {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2);
    const namePart = btoa(name).substring(0, 8);
    return `${namePart}.${timestamp}.${randomPart}`;
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
