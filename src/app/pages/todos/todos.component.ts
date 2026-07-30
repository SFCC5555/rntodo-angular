import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

type Todo = { id: string; text: string; done: boolean };

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-[#1a0005] via-[#3d0010] to-[#9e1b32]">
      <div class="mx-auto max-w-lg px-4 py-8">

        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-white">My Todos</h1>
            <p class="max-w-[220px] truncate text-xs text-white/40">{{ userEmail }}</p>
          </div>
          <button (click)="signOut()"
            class="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/20">
            Sign out
          </button>
        </div>

        <div class="mb-6 flex gap-2">
          <input [(ngModel)]="newText" (keyup.enter)="addTodo()" placeholder="Add a new todo…"
            class="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
          <button (click)="addTodo()" [disabled]="adding"
            class="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-50">
            {{ adding ? '…' : '+' }}
          </button>
        </div>

        <div *ngIf="loading" class="py-20 text-center text-white/40">Loading…</div>

        <div *ngIf="!loading && todos.length === 0" class="py-20 text-center">
          <p class="mb-3 text-4xl">✅</p>
          <p class="text-white/40">No todos yet. Add one above!</p>
        </div>

        <div *ngFor="let todo of todos"
          class="mb-3 flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 transition hover:bg-white/10"
          (click)="toggleTodo(todo)">

          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition"
            [ngClass]="todo.done ? 'border-red-400 bg-red-600' : 'border-white/30'">
            <span *ngIf="todo.done" class="text-xs text-white">✓</span>
          </div>

          <span class="flex-1 text-base" [ngClass]="todo.done ? 'text-white/40 line-through' : 'text-white'">
            {{ todo.text }}
          </span>

          <button (click)="deleteTodo(todo.id, $event)" class="text-white/20 transition hover:text-red-400">🗑</button>
        </div>
      </div>
    </div>
  `,
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newText = '';
  loading = true;
  adding = false;
  userEmail = '';

  private supabase = inject(SupabaseService);
  private router = inject(Router);

  async ngOnInit() {
    const { data: { user } } = await this.supabase.auth.getUser();
    this.userEmail = user?.email ?? '';
    const { data, error } = await this.supabase.client.from('todos').select('id, text, done').order('created_at', { ascending: true });
    if (!error && data) this.todos = data;
    this.loading = false;
  }

  async addTodo() {
    const trimmed = this.newText.trim();
    if (!trimmed) return;
    this.adding = true;
    const { data: { user } } = await this.supabase.auth.getUser();
    const { data, error } = await this.supabase.client.from('todos').insert({ text: trimmed, user_id: user!.id }).select('id, text, done').single();
    if (!error && data) { this.todos = [...this.todos, data]; this.newText = ''; }
    this.adding = false;
  }

  async toggleTodo(todo: Todo) {
    const { error } = await this.supabase.client.from('todos').update({ done: !todo.done }).eq('id', todo.id);
    if (!error) this.todos = this.todos.map(t => t.id === todo.id ? { ...t, done: !todo.done } : t);
  }

  async deleteTodo(id: string, event: Event) {
    event.stopPropagation();
    const { error } = await this.supabase.client.from('todos').delete().eq('id', id);
    if (!error) this.todos = this.todos.filter(t => t.id !== id);
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigate(['/login']);
  }
}
