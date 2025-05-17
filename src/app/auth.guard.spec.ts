import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    // Simula que o usuário está logado
    spyOn(localStorage, 'getItem').and.returnValue('true');
    
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should redirect to login if user is not logged in', () => {
    // Simula que o usuário NÃO está logado
    spyOn(localStorage, 'getItem').and.returnValue('false');
    const navigateSpy = spyOn(router, 'navigate');

    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});