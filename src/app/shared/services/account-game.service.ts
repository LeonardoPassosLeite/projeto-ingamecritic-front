import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorHandlingService } from './commons/error-handlig.service';
import { ApiResponse } from '../models/coomons/api-response.model';
import { AccountGame } from '../models/account-game.model';

@Injectable({
    providedIn: 'root',
})
export class AccountGameService {
    private readonly baseUrl = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private errorHandlingService: ErrorHandlingService
    ) { }

    storeAccountGames(token: string): Observable<AccountGame> {
        return this.http.post<AccountGame>(`${this.baseUrl}/accountgame/store-games`, {}, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }),
            withCredentials: true,
        }).pipe(
            map(response => {
                console.log('Resposta do servidor:', response);
                return response;
            }),
            catchError(error => {
                const errorMessage = this.errorHandlingService.handleHttpError(error);
                console.error('Erro na requisição para store-games:', errorMessage);
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    getAccountGames(token: string): Observable<AccountGame[]> {
        return this.http.get<AccountGame[]>(`${this.baseUrl}/accountgame/stored-games`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            withCredentials: true,
        }).pipe(
            catchError(error => {
                const errorMessage = this.errorHandlingService.handleHttpError(error);
                console.error('Erro na requisição para stored-games:', errorMessage);
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}