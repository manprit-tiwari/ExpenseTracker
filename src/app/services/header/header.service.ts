import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class headerService {

    updateHeader = () => {
        let authToken: string = `${localStorage.getItem('auth_token')}`;
        let headers: HttpHeaders = new HttpHeaders({
            'authorization': `Bearer ${authToken}`
        });

        let httpOptions: any = {
            headers: headers
        }

        return httpOptions;
    };
}