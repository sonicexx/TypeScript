// ****定时器装饰器
// const Adecorator:MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor)=>{
//     // 存储原方法
//     const method = descriptor.value

//     // 定义新方法
//     descriptor.value = ()=>{
//         setTimeout(()=>{
//             // 执行原方法
//             method()
//         },1000)
//     }
// }

// class A{
//     @Adecorator
//     say(){
//         console.log('nice');
//     }
// }

// new A().say()

// **完善

// const SleepDecorator = function(time:number):MethodDecorator{
//     return(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor)=>{
//         // 存储原方法
//         const method = descriptor.value

//         // 定义新方法
//         descriptor.value = ()=>{
//             setTimeout(()=>{
//                 // 执行原方法
//                 method()
//             },time)
//         }
//     }
// }

// class A{
//     @SleepDecorator(100)
//     say(){
//         console.log('nice');
//     }

//     @SleepDecorator(300)
//     say2(){
//         console.log('2222222');
//     }
// }

// new A().say()
// new A().say2()

// ******* 全局异常信息管理

// const Dec = (title: string = 'default err message'): MethodDecorator => {
//   return (
//     target: Object,
//     propertyKey: string | symbol,
//     descriptor: PropertyDescriptor
//   ) => {
//     const method = descriptor.value;

//     descriptor.value = () => {
//       try {
//         method();
//       } catch (err) {
//         console.log(`抓到一个错误:${title}`);
//         console.log(err.message);
//       }
//     };
//   };
// };

// class A {
//   @Dec()
//   public err() {
//     throw new Error('出错了');
//   }

//   @Dec('finding err')
//   find() {
//     console.log('finding...');
//     throw new Error('finding 失败');
//   }
// }

// new A().err();
// new A().find();

// ****登录检测
interface User {
  name: string;
  isLogin: boolean;
}

const user: User = { name: 'gangdan', isLogin: false };

const AccessDer = (user: User): MethodDecorator => {
  return (
    arget: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
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
  user: User;
  constructor(user: User) {
    this.user = user;
  }

  @AccessDer(user)
  store() {
    console.log('store done');
  }
}

const art = new Article(user);
art.store();
console.log(art.user);
