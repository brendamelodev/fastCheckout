import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../Service/data.service';
import { LocalStorageService } from '../Service/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService: LocalStorageService = new LocalStorageService;
  const sessionStorage = JSON.parse(localStorageService.getItem('contractAccount'));
  const router: Router = new Router;

  if (sessionStorage.length > 0) {
    console.log('rota autorizada');
    return true;
  } else {
    console.log('rota não autorizada');
    router.navigate(['/idClienteP1']);
    return false;
  }
};
