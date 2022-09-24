import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class WebRequestService {

readonly ROOT_URL;

constructor(private http: HttpClient) {
this.ROOT_URL = 'http://localhost:8077';
}

get(uri: any):Observable<any> {
return this.http.get(`${this.ROOT_URL}/${uri}`);
}

post(uri: string, payload: Object) {
return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
}

patch(uri: string, payload: Object) {
return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
}

delete(uri: string) {
return this.http.delete(`${this.ROOT_URL}/${uri}`);
}

login(email: string, password: string) {
return this.http.post(`${this.ROOT_URL}/users/login`, {
email,
password
}, {
observe: 'response'
});
}

signup(fname:string,phoneNo:string,email: string, password: string) {
return this.http.post(`${this.ROOT_URL}/users`, {
fname,
phoneNo,
email,
password
}, {
observe: 'response'
});
}


}
