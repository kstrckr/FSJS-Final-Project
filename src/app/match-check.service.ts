import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';





@Injectable()

export class MatchCheckService {

    tileIndex: string;

    constructor( private http: Http) { };

//wip--

    getTile(id, a): Promise<string> {
        let url = "http://localhost:3000"
        let fullUrl = `${url}/api/checkmatch/${id}/${a}`
        console.log(id);
        return this.http.get(fullUrl)
            .toPromise()
            .then(res => {
                return res.json() as string;
                }
            )
    }

    matchCheck(){
        
    }
}