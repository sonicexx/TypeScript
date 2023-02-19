"use strict";
// *****定时器装饰器
// const Adecorator:MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor)=>{
//     // 存储原方法
//     const method = descriptor.value
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const user = { name: 'gangdan', isLogin: false };
const AccessDer = (user) => {
    return (arget, propertyKey, descriptor) => {
        const method = descriptor.value;
        descriptor.value = () => {
            if (!user.isLogin) {
                console.log('请先登录');
                return;
            }
            method();
        };
    };
};
class Article {
    constructor(user) {
        this.user = user;
    }
    store() {
        console.log('store done');
    }
}
__decorate([
    AccessDer(user),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Article.prototype, "store", null);
const art = new Article(user);
art.store();
console.log(art.user);
