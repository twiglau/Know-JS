/**
 * prototype 什么?
 * 1. 这个对象在调用 new Foo()时创建的,
 *    最后会被关联到这个 "Foo点prototype"对象上
 */
function foo(){
    // ...
}
var a = new foo();
console.log(Object.getPrototypeOf( a) === foo.prototype)

/**
 * 1.1调用new foo()时会创建a,其中的一步就是给a一个内部
 * 的 [[Prototype]]链接,关联到Foo.prototype指向的那个对象上.
 * 1.2一个类智能创建多个对象,它们[[Prototype]]关联的是同一个对象,
 * 在默认情况下并不会进行复制,因此这些对象之间并不会完全失去联系,它们
 * 是互相关联的
 */

/**
 * 2. "构造函数"?
 */
function Foo(){
    // ...
}
var a = new Foo();
//到底是什么让我们认为Foo是一个 "类"呢?

//2.1 原因:
/**
 * 2.1.1 关键字new
 */
/**
 * 2.2 以上函数本身并不是构造函数,然而,当你在
 * 普通的函数调用前面加上new关键字之后,就会把
 * 这个函数调用变成一个 "构造函数调用",实际上,
 * new会劫持所有普通函数并用构造函数的形式来调用它
 */

/**
 * 1.原型继承
 */
function Foo(name){
    this.name = name;
}
Foo.prototype.myName = function(){
    return this.name;
}
function Bar(name,label) {
    Foo.call(this,name);
    this.label = label;
}
//声明function Bar(){ ... }时,和其他函数一样,Bar会有一个.prototype关联到默认的
//对象,但是这个对象并不是我们想要的Foo.prototype.

//我们创建了一个新的Bar.prototype 对象并关联到Foo.prototype
Bar.prototype = Object.create(Foo.prototype);
//以上代码调用Object.create(...)会凭空创建一个"新"对象并把新对象内部的
//[[Prototype]]关联到你指定的对象

//以上是ES6 之前需要抛弃默认的 Bar.prototype
// ES6 之后可以直接修改现有的Bar.prototype
Object.setPrototypeOf(Bar.prototype,Foo.prototype)

//注意! 现在没有Bar.prototype.constructor了
//如果你需要这个属性的话,可能需要手动修复一下ta
Bar.prototype.myLabel = function(){
    return this.label;
}
var a = new Bar("a","obj a");
console.log(a.myName(),a.myLabel())


/**
 * 2.检查"类"关系
 * 检查一个实例(JavaScript中的对象)的继承祖先(JavaScript 中的委托关联)通常被称为
 * 内省 (反射)
 */

/**
 * 2.1   a instanceof Foo;
 * instanceof 回答的问题是:  在 a 的整条 [[Prototype]] 链中是否有指向Foo.prototype的
 * 对象?
 */


/**
 * 2.1 判断[[Prototype]] 反射的方法
 * Foo.prototype.isPrototypeOf( a ); //true
 * isPrototypeOf(...)回答的问题是: 在 a 的整条 [[Prototype]]链中是否出现过Foo.prototype?
 */