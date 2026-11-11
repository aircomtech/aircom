import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const adminGuard: CanActivateFn = () => {
  const sb = inject(SupabaseService);
  const router = inject(Router);

  if (sb.isAuthenticated()) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};
