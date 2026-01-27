import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingCount = 0;
  readonly loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingCount++;
    this.loadingSubject.next(true);
  }

  hide() {
    if (this.loadingCount === 0) {
      return;
    }

    this.loadingCount--;

    if (this.loadingCount === 0) {
      this.loadingSubject.next(false);
      this.emitLoadingState(false);
    }
  }

  private emitLoadingState(isLoading: boolean) {
    Promise.resolve().then(() => {
      this.loadingSubject.next(isLoading);
    });
  }
}
