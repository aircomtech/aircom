import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient | null = null;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.initClient();
  }

  private initClient(): void {
    try {
      if (environment.supabase?.url && environment.supabase?.anonKey) {
        this.client = createClient(environment.supabase.url, environment.supabase.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });

        // Check active session
        this.client.auth.getSession().then(({ data }) => {
          this.currentUserSubject.next(data.session?.user ?? null);
        });

        // Listen for auth state changes
        this.client.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
          this.currentUserSubject.next(session?.user ?? null);
        });
      }
    } catch (err) {
      console.warn('Supabase client initialization warning:', err);
    }
  }

  getClient(): SupabaseClient | null {
    if (!this.client) {
      this.initClient();
    }
    return this.client;
  }

  get isConfigured(): boolean {
    return !!(this.client && environment.supabase?.url && environment.supabase?.anonKey);
  }

  // Authentication helpers
  async signIn(email: string, password: string): Promise<{ data: any; error: any }> {
    if (!this.client) {
      return { data: null, error: new Error('Supabase client is not configured') };
    }
    const res = await this.client.auth.signInWithPassword({ email, password });
    if (res.data?.user) {
      this.currentUserSubject.next(res.data.user);
    }
    return res;
  }

  async signUp(email: string, password: string): Promise<{ data: any; error: any }> {
    if (!this.client) {
      return { data: null, error: new Error('Supabase client is not configured') };
    }
    return await this.client.auth.signUp({ email, password });
  }

  async signOut(): Promise<{ error: any }> {
    if (!this.client) {
      this.currentUserSubject.next(null);
      return { error: null };
    }
    const res = await this.client.auth.signOut();
    this.currentUserSubject.next(null);
    return res;
  }

  async resetPasswordForEmail(email: string): Promise<{ data: any; error: any }> {
    if (!this.client) {
      return { data: null, error: new Error('Supabase client is not configured') };
    }
    return await this.client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`
    });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    // Check Supabase session or localStorage admin session marker
    return !!this.currentUserSubject.value || localStorage.getItem('aircom_admin_session') === 'active';
  }

  setDemoSession(active: boolean, email = 'admin@aircomtech.com'): void {
    if (active) {
      localStorage.setItem('aircom_admin_session', 'active');
      localStorage.setItem('aircom_admin_email', email);
    } else {
      localStorage.removeItem('aircom_admin_session');
      localStorage.removeItem('aircom_admin_email');
    }
  }

  getAdminEmail(): string {
    return this.currentUserSubject.value?.email || localStorage.getItem('aircom_admin_email') || 'admin@aircomtech.com';
  }
}

