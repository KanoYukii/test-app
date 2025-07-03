import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoGameService, VideoGame } from '../services/video-game.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-video-game-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <!-- Navigation -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-primary" (click)="goBack()">
              <i class="fas fa-arrow-left me-2"></i>Volver al Catálogo
            </button>
            <button class="btn btn-outline-danger" (click)="logout()">
              <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando detalles del videojuego...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
        <button class="btn btn-outline-danger btn-sm ms-3" (click)="loadGameDetails()">
          <i class="fas fa-redo me-1"></i>Reintentar
        </button>
      </div>

      <!-- Game Details -->
      <div *ngIf="!isLoading && !error && game" class="row">
        <div class="col-lg-5">
          <div class="card">
            <img [src]="game.imageUrl" class="card-img-top game-detail-image" [alt]="game.title">
          </div>
        </div>

        <div class="col-lg-7">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h1 class="card-title mb-0">{{ game.title }}</h1>
                <span class="badge bg-primary fs-6">\${{ game.price }}</span>
              </div>

              <div class="row mb-4">
                <div class="col-md-6">
                  <div class="info-item">
                    <i class="fas fa-tag text-primary me-2"></i>
                    <strong>Género:</strong> {{ game.genre }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info-item">
                    <i class="fas fa-gamepad text-primary me-2"></i>
                    <strong>Plataforma:</strong> {{ game.platform }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info-item">
                    <i class="fas fa-calendar text-primary me-2"></i>
                    <strong>Año:</strong> {{ game.releaseYear }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info-item">
                    <i class="fas fa-star text-warning me-2"></i>
                    <strong>Rating:</strong> {{ game.rating }}/10
                    <div class="rating-stars ms-2">
                      <i *ngFor="let star of getStars()"
                         [class]="star ? 'fas fa-star text-warning' : 'far fa-star text-muted'"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <h5><i class="fas fa-info-circle text-primary me-2"></i>Descripción</h5>
                <p class="card-text description">{{ game.description }}</p>
              </div>

              <div class="action-buttons">
                <button class="btn btn-success btn-lg me-3">
                  <i class="fas fa-shopping-cart me-2"></i>Agregar al Carrito
                </button>
                <button class="btn btn-outline-primary btn-lg">
                  <i class="fas fa-heart me-2"></i>Agregar a Favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div *ngIf="game" class="row mt-4">
        <div class="col-lg-4">
          <div class="card info-card">
            <div class="card-body text-center">
              <i class="fas fa-trophy fa-2x text-warning mb-3"></i>
              <h6>Rating Excelente</h6>
              <p class="text-muted mb-0">Este juego tiene una calificación de {{ game.rating }}/10</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card info-card">
            <div class="card-body text-center">
              <i class="fas fa-clock fa-2x text-info mb-3"></i>
              <h6>Lanzamiento</h6>
              <p class="text-muted mb-0">Lanzado en el año {{ game.releaseYear }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card info-card">
            <div class="card-body text-center">
              <i class="fas fa-tags fa-2x text-success mb-3"></i>
              <h6>Categoría</h6>
              <p class="text-muted mb-0">Género {{ game.genre }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Token Info -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="card bg-light">
            <div class="card-body">
              <h6><i class="fas fa-shield-alt me-2"></i>Información de Autenticación</h6>
              <p class="mb-0 text-muted">
                <small>
                  Token activo: {{ getTokenPreview() }} |
                  Solicitud realizada con Bearer Token en el header Authorization
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-detail-image {
      height: 400px;
      object-fit: cover;
      border-radius: 15px;
    }

    .card {
      border: none;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .info-item {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .rating-stars {
      display: inline-flex;
    }

    .rating-stars i {
      font-size: 0.9rem;
    }

    .description {
      line-height: 1.6;
      font-size: 1.1rem;
      color: #666;
    }

    .action-buttons .btn {
      border-radius: 25px;
      padding: 12px 30px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .action-buttons .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .info-card {
      transition: transform 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-3px);
    }

    .badge {
      border-radius: 20px;
      padding: 8px 16px;
    }

    .btn-outline-primary,
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

    h1.card-title {
      color: #333;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .action-buttons .btn {
        width: 100%;
        margin-bottom: 10px;
      }

      .action-buttons .btn:last-child {
        margin-bottom: 0;
      }
    }
  `]
})
export class VideoGameDetailsComponent implements OnInit {
  game: VideoGame | null = null;
  isLoading = true;
  error = '';
  gameId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoGameService: VideoGameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      this.loadGameDetails();
    });
  }

  loadGameDetails(): void {
    this.isLoading = true;
    this.error = '';

    this.videoGameService.getVideoGameById(this.gameId).subscribe({
      next: (game) => {
        this.game = game;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los detalles del videojuego. Verifica que el ID sea correcto.';
        this.isLoading = false;
      }
    });
  }

  getStars(): boolean[] {
    if (!this.game) return [];
    const rating = this.game.rating;
    const stars = [];
    const fullStars = Math.floor(rating / 2); // Convertir rating de 10 a escala de 5 estrellas

    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars);
    }
    return stars;
  }

  getTokenPreview(): string {
    const token = this.authService.getToken();
    return token ? `${token.substring(0, 8)}...` : 'No disponible';
  }

  goBack(): void {
    this.router.navigate(['/video-games']);
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
