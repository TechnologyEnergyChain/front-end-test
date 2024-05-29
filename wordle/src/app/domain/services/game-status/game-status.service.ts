import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStatusService {
  private gameIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private isGameActiveSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showVictoryMessageSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showDefeatMessageSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private resetBoardSubject = new BehaviorSubject<void>(undefined); 

  constructor() {}

  setGameId(gameId: string): void {
    this.gameIdSubject.next(gameId);
  }

  getGameId(): Observable<string | null> {
    return this.gameIdSubject.asObservable();
  }

  setIsGameActive(isActive: boolean): void {
    this.isGameActiveSubject.next(isActive);
  }

  getIsGameActive(): Observable<boolean> {
    return this.isGameActiveSubject.asObservable();
  }

  setShowVictoryMessageSubject(victoryMessage: boolean): void {
    this.showVictoryMessageSubject.next(victoryMessage);
  }

  getShowVictoryMessage(): Observable<boolean> {
    return this.showVictoryMessageSubject.asObservable();
  }

  setShowDefeatMessageSubject(defeatMessage: boolean): void {
    this.showDefeatMessageSubject.next(defeatMessage);
  }

  getShowDefeatMessage(): Observable<boolean> {
    return this.showDefeatMessageSubject.asObservable();
  }
  
  getResetBoard(): Observable<void> {
    return this.resetBoardSubject.asObservable();
  }

  sendResetBoardSignal(): void {
    this.resetBoardSubject.next(undefined);
  }
}
