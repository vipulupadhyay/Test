import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RemoteService } from './Datatable.Servce';
import { DataTableParams } from 'angular-2-data-table';
@Component({
    selector: "my-app",
    providers: [RemoteService],
    templateUrl: 'app/Grid/Datatable.html',

})
export class AppComponent {

    items: any[];
    itemCount = 0;
    constructor(private remoteService: RemoteService) {
    }
    reloadItems(params: any) {
        debugger
        this.remoteService.getGridData(params).then(result => {
            this.items = result.items;
            this.itemCount = result.count;
        });
    }
    rowClick(rowEvent: any) {
        //console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent: any) {
        //alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item: any) { return item.jobTitle; }
}