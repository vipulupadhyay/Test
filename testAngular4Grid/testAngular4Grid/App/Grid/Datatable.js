"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Datatable_Servce_1 = require("./Datatable.Servce");
var MyDatatableComponent = (function () {
    function MyDatatableComponent(remoteService) {
        this.remoteService = remoteService;
        this.itemCount = 0;
    }
    MyDatatableComponent.prototype.reloadItems = function (params) {
        var _this = this;
        this.remoteService.getGridData(params).then(function (result) {
            _this.items = result.items;
            _this.itemCount = result.count;
        });
    };
    MyDatatableComponent.prototype.rowClick = function (rowEvent) {
        //console.log('Clicked: ' + rowEvent.row.item.name);
    };
    MyDatatableComponent.prototype.rowDoubleClick = function (rowEvent) {
        //alert('Double clicked: ' + rowEvent.row.item.name);
    };
    MyDatatableComponent.prototype.rowTooltip = function (item) { return item.jobTitle; };
    return MyDatatableComponent;
}());
MyDatatableComponent = __decorate([
    core_1.Component({
        providers: [Datatable_Servce_1.RemoteService],
        templateUrl: 'app/DatatableClientSidePaging/Datatable.html',
    }),
    __metadata("design:paramtypes", [Datatable_Servce_1.RemoteService])
], MyDatatableComponent);
exports.MyDatatableComponent = MyDatatableComponent;
//# sourceMappingURL=Datatable.js.map