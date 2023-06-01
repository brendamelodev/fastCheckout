import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  getAll(): number {
    return sessionStorage.length;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

}
