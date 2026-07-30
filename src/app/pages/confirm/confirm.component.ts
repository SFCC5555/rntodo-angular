import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4"
      [ngClass]="isNative
        ? 'bg-gradient-to-br from-[#042f2e] via-[#134e4a] to-[#0f766e]'
        : 'bg-gradient-to-br from-[#1a0005] via-[#3d0010] to-[#9e1b32]'">
      <div class="w-full max-w-md text-center">

        <div *ngIf="loading" class="text-lg text-white/60">Confirming your email…</div>

        <div *ngIf="!loading && confirmed" class="rounded-3xl border border-white/10 bg-white/5 p-10">
          <p class="mb-4 text-5xl">🎉</p>
          <h1 class="mb-2 text-3xl font-bold text-white">Email confirmed!</h1>
          <p class="mb-8 text-white/50">Your account is now active.</p>

          <ng-container *ngIf="isNative">
            <a href="rntodo://" class="mb-3 block w-full rounded-xl bg-teal-500 py-3 font-semibold text-white transition hover:bg-teal-400">
              Open the app
            </a>
            <a href="/download" class="block text-sm text-white/40 transition hover:text-white/60">
              Don't have the app? Download it →
            </a>
          </ng-container>

          <ng-container *ngIf="!isNative">
            <a routerLink="/todos" class="block w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500">
              Go to my todos →
            </a>
          </ng-container>
        </div>

        <div *ngIf="!loading && !confirmed" class="rounded-3xl border border-white/10 bg-white/5 p-10">
          <p class="mb-4 text-4xl">❌</p>
          <h1 class="mb-2 text-2xl font-bold text-white">Confirmation failed</h1>
          <p class="mb-6 text-white/50">The link may have expired. Try registering again.</p>
          <a routerLink="/register" class="font-semibold hover:underline"
            [ngClass]="isNative ? 'text-teal-300' : 'text-red-300'">Back to register</a>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmComponent implements OnInit {
  loading = true;
  confirmed = false;
  isNative = false;

  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);

  async ngOnInit() {
    this.isNative = this.route.snapshot.queryParamMap.get('source') === 'native';
    const { data: { session } } = await this.supabase.auth.getSession();
    this.confirmed = !!session;
    this.loading = false;
  }
}
