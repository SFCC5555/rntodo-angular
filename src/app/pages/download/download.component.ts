import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#042f2e] via-[#134e4a] to-[#0f766e] px-4">
      <div class="w-full max-w-md text-center">

        <div class="mb-6">
          <svg class="mx-auto h-20 w-20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <circle cx="128" cy="128" r="30" fill="#14b8a6"/>
            <g stroke="#14b8a6" stroke-width="10" fill="none">
              <ellipse cx="128" cy="128" rx="120" ry="45"/>
              <ellipse cx="128" cy="128" rx="120" ry="45" transform="rotate(60 128 128)"/>
              <ellipse cx="128" cy="128" rx="120" ry="45" transform="rotate(120 128 128)"/>
            </g>
          </svg>
        </div>

        <h1 class="mb-2 text-4xl font-bold text-white">Todo App</h1>
        <p class="mb-2 text-white/50">React Native</p>
        <p class="mb-10 text-sm text-white/40">The native Android app — faster and works offline</p>

        <div class="rounded-3xl border border-white/10 bg-white/5 p-8">
          <a href="#"
            class="mb-4 flex items-center justify-center gap-3 rounded-2xl bg-black px-6 py-4 transition hover:opacity-80">
            <svg class="h-8 w-8" viewBox="0 0 24 24" fill="white">
              <path d="M3.18 23.76c.29.16.62.2.93.12l11.76-11.76L12 9.25 3.18 23.76zm17.33-9.33c.3-.28.49-.67.49-1.1s-.18-.83-.48-1.1l-2.37-1.37-2.97 2.96 2.97 2.97 2.36-1.36zM1.27 1.04C1.1 1.3 1 1.62 1 1.97v20.06c0 .35.1.67.27.93L13.5 10.75 1.27 1.04zm10.47 9.71l2.97-2.97L3.95.4C3.64.22 3.29.18 2.99.27l11.75 10.48z"/>
            </svg>
            <div class="text-left">
              <p class="text-xs text-white/60">Get it on</p>
              <p class="text-lg font-semibold text-white leading-tight">Google Play</p>
            </div>
          </a>

          <a href="rntodo://"
            class="block w-full rounded-2xl border border-teal-500/30 bg-teal-500/10 py-3 text-sm font-medium text-teal-300 transition hover:bg-teal-500/20">
            Already installed? Open the app
          </a>
        </div>

        <p class="mt-8 text-sm text-white/30">
          Prefer the browser?
          <a routerLink="/login" class="font-medium text-teal-400 hover:text-teal-300">Use the web version →</a>
        </p>
      </div>
    </div>
  `,
})
export class DownloadComponent {}
