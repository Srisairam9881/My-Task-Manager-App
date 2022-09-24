import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';


@Injectable({
providedIn: 'root'
})
export class AuthService {

constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

login(email: string, password: string) {
return this.webService.login(email, password).pipe(
shareReplay(),
tap((res: HttpResponse<any>) => {
// the auth tokens will be in the header of this response
this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
console.log("LOGGED IN!");
})
)
}


signup(fname:string,phoneNo:string,email: string, password: string) {
return this.webService.signup(fname,phoneNo,email, password).pipe(
shareReplay(),
tap((res: HttpResponse<any>) => {
// the auth tokens will be in the header of this response
this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
console.log("Successfully signed up and now you login!");
})
)
}


logout() {
this.removeSession();
return true;
}

getAccessToken() {
return localStorage.getItem('x-access-token');
}

getRefreshToken():string {
return localStorage.getItem('x-refresh-token') || '';
}

getUserId():string {
return localStorage.getItem('user-id') || '';
}

setAccessToken(accessToken: any) {
localStorage.setItem('x-access-token', accessToken)
}

private setSession(userId: string, accessToken: any, refreshToken: any) {
localStorage.setItem('user-id', userId);
localStorage.setItem('x-access-token', accessToken);
localStorage.setItem('x-refresh-token', refreshToken);
}

private removeSession() {
localStorage.removeItem('user-id');
localStorage.removeItem('x-access-token');
localStorage.removeItem('x-refresh-token');
}

getNewAccessToken() {
return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
headers: {
'x-refresh-token': this.getRefreshToken(),
'_id': this.getUserId()
},
observe: 'response'
}).pipe(
tap((res: HttpResponse<any>) => {
this.setAccessToken(res.headers.get('x-access-token'));
})
)
}

isLoggedIn()
{
return localStorage.getItem('x-access-token')
}


}