import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataTableParams } from 'angular-2-data-table';
import 'rxjs/add/operator/toPromise';


const BASE_URL = 'http://localhost:55706//Home';

function paramsToQueryString(params: DataTableParams) {
    let result = [];

    if (params.offset != null) {
        result.push(['_start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['_limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['_sort', params.sortBy]);
    }
    if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
    }

    return result.map(param => param.join('=')).join('&');
}


@Injectable()
export class RemoteService {

    constructor(private http: Http) { }

    getGridData(params: DataTableParams) {
    debugger
        return this.http.get(BASE_URL + '/GetGridData?' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => ({
                items: resp.json().griddata,
                count: resp.json().TotalCount[0].TotalCount
            }));
    }
}