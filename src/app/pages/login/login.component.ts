import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0005] via-[#3d0010] to-[#9e1b32] px-4">
      <div class="w-full max-w-md">

        <div class="mb-8 text-center">
          <svg class="mx-auto mb-4 h-20 w-20" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
            <path d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" fill="#dd0031"/>
            <path d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" fill="#c3002f"/>
            <path d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z" fill="#fff"/>
          </svg>
          <h1 class="text-4xl font-bold text-white">Todo App</h1>
          <p class="mt-1 text-white/50">Angular</p>
        </div>

        <div class="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <label class="mb-1 block text-sm font-medium text-white/70">Email</label>
          <input
            type="email"
            [(ngModel)]="email"
            placeholder="you@example.com"
            class="mb-4 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />

          <label class="mb-1 block text-sm font-medium text-white/70">Password</label>
          <div class="relative mb-6">
            <input
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="password"
              placeholder="••••••••"
              class="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <button type="button" (click)="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>

          <button (click)="handleLogin()" [disabled]="loading"
            class="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-50">
            {{ loading ? 'Signing in…' : 'Sign in' }}
          </button>

          <p *ngIf="error" class="mt-3 text-center text-sm text-red-300">{{ error }}</p>
        </div>

        <p class="mt-6 text-center text-white/50">
          No account?
          <a routerLink="/register" class="font-semibold text-red-300 hover:text-red-200">Register</a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  loading = false;
  error = '';

  private supabase = inject(SupabaseService);
  private router = inject(Router);

  async handleLogin() {
    this.loading = true;
    this.error = '';
    const { error } = await this.supabase.auth.signInWithPassword({ email: this.email, password: this.password });
    this.loading = false;
    if (error) { this.error = error.message; return; }
    this.router.navigate(['/todos']);
  }
}
