import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/loginServices/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const token = sessionStorage.getItem('user_session'); // Verifica si el usuario está autenticado
  const router = new Router(); // Crea una instancia del Router
  if (!token) {
    loginService.setStatus = true;
    sessionStorage.setItem('redirectUrl', state.url);
    // router.navigate(['/login']); // Redirige al login si no hay token
    return false;
  }

  return true;
};
