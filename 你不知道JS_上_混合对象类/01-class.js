/**
 * JS中的类 实际上是一种设计模式
 */

// //1.构造函数
// class CoolGuy {
//     specialTrick = nothing 
//     CoolGuy(trick){
//         specialTrick = trick
//     }
//     showOff(){
//         output("Here's my trick: ",specialTrick)
//     }
// }

// //调用类构造函数生成一个CoolGuy实例:
// Joe = new CoolGuy("jumping rope")
// Joe.showOff() //这是我的绝技:跳绳

/**
 * 注意: 1. CoolGuy 类有一个 CoolBuy() 构造函数,执行 new CoolGuy()时实际上
 *       调用的就是它,构造函数会返回一个对象(也就是类的一个实例)
 *      2. 类构造函数属于类,而且通常和类同名.
 */

// //2.类的继承
// class Vehicle {
//     engines = 1
//     ignition() {
//         output("Turning on my engine.")
//     }
//     drive(){
//         ignition()
//         output("Steering and moving forward!")
//     }
// }
// class Car inherits Vehicle {
//     wheels = 4
//     drive(){
//         inherited:drive()
//         output("Rolling on all ", wheels," wheels!" )
//     }
// }
// class SpeedBoat inherits Vehicle {
//     engines = 2
//     ignition(){
//         output("Turning on my", engines, " engines.")
//     }
//     pilot(){
//         inherited:drive()
//         output("Speeding through the water with ease!")
//     }
// }


// //3.多态
/**
 * Car 重写了继承自父类的drive()方法,但是之后Car调用了inherited:drive()方法,
 * 这表明Car可以引用继承来的原始drive()方法. 快艇的pilot()方法同样引用了原始drive()方法
 * -----  这个技术被称为 多态或者虚拟多态
 */


// //4.混入

/**
 * JavaScript 不会自动实现Vehicle 到 Car 的复制行为
 * 需要手动实现复制功能,这个功能在许多库和框架中被称为extend(...),
 * 但是为了方便理解我们称之为mixin(...)
 */

//非常简单的mixin(...)例子
function mixin(sourceObj,targetObj) {
    for (var key in sourceObj) {
        //只会在不存在的情况下复制
        if(!(key in targetObj)){
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}