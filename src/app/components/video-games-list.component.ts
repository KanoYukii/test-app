import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoGameService, VideoGame } from '../services/video-game.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-video-games-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2><i class="fas fa-gamepad me-2"></i>Catálogo de Videojuegos</h2>
              <p class="text-muted">Explora nuestra colección de videojuegos</p>
            </div>
            <div>
              <button class="btn btn-outline-danger" (click)="logout()">
                <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando videojuegos...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
      </div>

      <!-- Games Grid -->
      <div *ngIf="!isLoading && !error" class="row">
        <div class="col-lg-4 col-md-6 mb-4" *ngFor="let game of videoGames">
          <div class="card h-100 game-card" (click)="viewGameDetails(game._id)">
            <img [src]="game.imageUrl" class="card-img-top game-image" [alt]="game.title">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ game.title }}</h5>
              <p class="card-text text-muted mb-2">
                <i class="fas fa-tag me-1"></i>{{ game.genre }} |
                <i class="fas fa-gamepad ms-2 me-1"></i>{{ game.platform }}
              </p>
              <p class="card-text flex-grow-1">{{ game.description }}</p>

              <div class="mt-auto">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="rating">
                      <i class="fas fa-star text-warning"></i>
                      <span class="ms-1">{{ game.rating }}/10</span>
                    </div>
                    <small class="text-muted">{{ game.releaseYear }}</small>
                  </div>
                  <div class="price">
                    <h6 class="mb-0 text-primary">\${{ game.price }}</h6>
                  </div>
                </div>
                <button class="btn btn-primary btn-sm w-100 mt-2">
                  <i class="fas fa-eye me-1"></i>Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && !error && videoGames.length === 0" class="text-center">
        <i class="fas fa-gamepad fa-3x text-muted mb-3"></i>
        <h4>No hay videojuegos disponibles</h4>
        <p class="text-muted">Intenta recargar la página</p>
      </div>

      <!-- Stats Footer -->
      <div *ngIf="videoGames.length > 0" class="row mt-5">
        <div class="col-12">
          <div class="card bg-light">
            <div class="card-body text-center">
              <h6><i class="fas fa-chart-bar me-2"></i>Estadísticas del Catálogo</h6>
              <div class="row">
                <div class="col-md-3">
                  <strong>{{ videoGames.length }}</strong>
                  <div class="text-muted">Total de Juegos</div>
                </div>
                <div class="col-md-3">
                  <strong>{{ getAverageRating() }}</strong>
                  <div class="text-muted">Rating Promedio</div>
                </div>
                <div class="col-md-3">
                  <strong>{{ getUniqueGenres().length }}</strong>
                  <div class="text-muted">Géneros Únicos</div>
                </div>
                <div class="col-md-3">
                  <strong>\${{ getAveragePrice() }}</strong>
                  <div class="text-muted">Precio Promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      border: none;
      border-radius: 15px;
      overflow: hidden;
    }

    .game-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .game-image {
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .game-card:hover .game-image {
      transform: scale(1.05);
    }

    .card-body {
      padding: 1.5rem;
    }

    .rating {
      display: flex;
      align-items: center;
    }

    .price h6 {
      font-weight: bold;
    }

    .btn-primary {
      background: linear-gradient(135deg, #007bff, #0056b3);
      border: none;
      border-radius: 20px;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }

    .btn-outline-danger {
      border-radius: 20px;
      padding: 8px 20px;
    }

    .container {
      max-width: 1200px;
    }

    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `]
})
export class VideoGamesListComponent implements OnInit {
  videoGames: VideoGame[] = [];
  isLoading = true;
  error = '';

  constructor(
    private videoGameService: VideoGameService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVideoGames();
  }

  loadVideoGames(): void {
    this.isLoading = true;
    this.error = '';

    this.videoGameService.getVideoGames().subscribe({
      next: (games) => {
        this.videoGames = games;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los videojuegos. Intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }

  viewGameDetails(gameId: string): void {
    this.router.navigate(['/video-games', gameId]);
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

  getAverageRating(): string {
    if (this.videoGames.length === 0) return '0.0';
    const average = this.videoGames.reduce((sum, game) => sum + game.rating, 0) / this.videoGames.length;
    return average.toFixed(1);
  }

  getUniqueGenres(): string[] {
    return [...new Set(this.videoGames.map(game => game.genre))];
  }

  getAveragePrice(): string {
    if (this.videoGames.length === 0) return '0.00';
    const average = this.videoGames.reduce((sum, game) => sum + game.price, 0) / this.videoGames.length;
    return average.toFixed(2);
  }
}
