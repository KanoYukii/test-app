import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary text-white text-center">
              <h4><i class="fas fa-gamepad"></i> Video Games Portal</h4>
              <p class="mb-0">Ingresa tu nombre para obtener acceso</p>
            </div>
            <div class="card-body">
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Nombre completo:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    formControlName="name"
                    [class.is-invalid]="loginForm.get('name')?.invalid && loginForm.get('name')?.touched"
                    placeholder="Ingresa tu nombre completo">
                  <div class="invalid-feedback" *ngIf="loginForm.get('name')?.invalid && loginForm.get('name')?.touched">
                    El nombre es requerido y debe tener al menos 2 caracteres.
                  </div>
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="loginForm.invalid || isLoading">
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    <i *ngIf="!isLoading" class="fas fa-key me-2"></i>
                    {{ isLoading ? 'Generando token...' : 'Obtener Token de Acceso' }}
                  </button>
                </div>
              </form>

              <div *ngIf="error" class="alert alert-danger mt-3">
                <i class="fas fa-exclamation-triangle"></i> {{ error }}
              </div>

              <div *ngIf="token" class="alert alert-success mt-3">
                <h6><i class="fas fa-check-circle"></i> Token generado exitosamente!</h6>
                <small class="text-muted">Token: {{ token.substring(0, 20) }}...</small>
              </div>
            </div>
            <div class="card-footer text-center text-muted">
              <small>
                <i class="fas fa-info-circle"></i>
                El token se genera localmente para simular la autenticación
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-top: 3rem;
      border-radius: 15px;
      overflow: hidden;
    }

    .card-header {
      background: linear-gradient(135deg, #007bff, #0056b3) !important;
    }

    .btn-primary {
      background: linear-gradient(135deg, #007bff, #0056b3);
      border: none;
      border-radius: 25px;
      padding: 12px 20px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }

    .form-control {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      padding: 12px 15px;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .alert {
      border-radius: 10px;
    }

    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error = '';
  token = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = '';

      const name = this.loginForm.value.name;

      this.authService.generateToken(name).subscribe({
        next: (response) => {
          this.token = response.token;
          this.isLoading = false;

          // Redirigir a la lista de videojuegos después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/video-games']);
          }, 10);
        },
        error: (error) => {
          this.error = 'Error al generar el token. Intenta nuevamente.';
          this.isLoading = false;
        }
      });
    }
  }
}
