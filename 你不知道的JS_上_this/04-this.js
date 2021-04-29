/**
 * 绑定规则:
 */

/**
 * 1. 默认绑定 , 独立函数调用
 */
// function foo(){
//     console.log( this.a );
// }
// var a = 2;
// foo();// 2

//声明在全局作用域中的变量(var a = 2)就是全局对象
//的一个同名属性

//函数调用时应用了 this 的默认绑定,因此this指向全局对象
/**
 * 如何判断应用了默认绑定?
 * 可以通过分析调用位置来看看foo()是如何调用的
 * 在代码中, foo() 是直接使用不带任何修饰符的函数引用
 * 进行调用的,因此只能使用默认绑定,无法应用其他规则
 */

// function foo(){
//     "use strict";
//     console.log(this.a);
// }
// var a = 2;
// foo();

/**
 * 以上如果使用严格模式(strict mode),那么全局对象将无法
 * 使用默认绑定,因此this 会绑定到unfefined
 * *1, 只有foo()运行在非 strict mode 下时,默认绑定
 *  才能绑定到全局对象,严格模式下与foo()的调用位置无关
 */


/**
 * 2.隐式绑定
 * 调用位置是否有上下文对象,或者说是否被某个对象拥有或者包含
 * 2.1当函数引用有上下文对象是,隐式绑定规则会把函数调用中的this绑定到这个上下文对象
 */
// function foo(){
//     console.log( this.a )
// }
// var obj = {
//     a:2,
//     foo:foo
// }
// obj.foo();

/**
 * 2.2需要进一步说明的是:对象属性引用链中只有最顶层或者说最后一层会影响调用位置
 */
// function foo(){
//     console.log( this.a )
// }
// var obj2 = {
//     a:42,
//     foo:foo
// }
// var obj1 = {
//     a:2,
//     obj2:obj2
// }
// obj1.obj2.foo();

/**
 * 2.3延伸问题: 隐式丢失
 * 2.3.1被隐式绑定的函数会丢失绑定对象,也就是说它会应用默认绑定,从而把this绑定
 * 到全局对象或者undefined上,取决于是否是严格模式
 */
// function foo(){
//     console.log( this.a )
// }
// var obj = {
//     a:2,
//     foo:foo
// }
// var bar = obj.foo; //函数别名!
// var a = "oops, globel"; // a 是全局对象的属性
// bar(); // "oops,gloabel"

/**
 * 解释: 虽然bar 是 obj.foo 的一个引用,但实际上,它引用的是foo函数本身,因此
 *      此时的bar()其实是一个不带任何修饰的函数调用,因此应用了默认绑定
 */

/**
 * 2.3.2 一个更微妙,更常见并且更出乎意料的情况发生在传入回调函数时:
 *       参数传递其实就是一种隐式赋值
 */
// function foo(){
//     console.log( this.a );
// }
// function doFoo(fn){
//     //fn 其实引用的是foo
//     fn(); // <--- 调用位置;
// }
// var obj = {
//     a:2,
//     foo:foo
// }
// var a = "oops,global"; //a 是全局对象的属性
// doFoo(obj.foo); // "oops,global"

/**
 * 3. 显示绑定
 *    如果我们不想再对象内部包含函数引用,而想再某个对象上强制调用函数,该怎么做?
 *    具体说就是 call(...) 和 apply(...) 方法.
 */
function foo(){
    console.log( this.a );
}
var obj = {
    a:2
}
foo.call(obj); //2 
/**
 * 以上通过foo.call(...),我们可以调用foo时强制把它的this绑定到obj上.
 * 3.1注意: 如果你传入了一个原始值(字符串类型,布尔类型或者数字类型) 来当作this的绑定
 * 对象,这个原始值会被转换成它的对象形式(也就是new String(...),new Boolean(...)或者
 * new Number(...)).这通常被称为 "装箱".
 */

/**
 * 3.2 显示绑定仍然无法决绝我们之前提出的丢失绑定问题
 * 3.2.1 硬绑定
 */
// function foo(){
//     console.log( this.a )
// }
// var obj = {
//     a:2
// }
// var bar = function(){
//     foo.call(obj);
// };
// bar(); // 2
// setTimeout(bar,100); //2

// //硬绑定的bar不可能再修改它的this
// bar.call(window); //2

/**
 * 对于以上解释:
 * 1.我们创建了函数bar(),并在它的内部手动调用了foo.call(obj),因此强制
 * 2.把foo 的 this绑定了obj.无论之后如何调用函数bar,它总会手动在obj上调用foo.
 * 这种绑定是一种显式的强制绑定,因此我们称之为硬绑定.
 * 3.硬绑定的典型应用场景就是创建一个包裹函数,传入所有的参数并返回接收到的所有值
 */

// function foo(something){
//     console.log(this.a,something);
//     return this.a + something;
// }
// var obj = {
//     a:2
// }
// var bar = function(){
//     return foo.apply(obj,arguments);
// }
// var b = bar(3);
// console.log(b);
/**
 * 另一种使用方法是创建一个 i 可以重复使用的辅助函数:
 */
// function foo(something){
//     console.log(this.a,something);
//     return this.a + something;
// }
// //简单的辅助绑定函数
// function bind(fn,obj){
//     return function(){
//         return fn.apply(obj,arguments)
//     };
// }
// var obj = {
//     a:2
// }
// var bar = bind(foo,obj);
// var b = bar(3);
// console.log(b);

/**
 * 硬绑定是一种非常常用的模式,在ES5中提供了内置的方法Function.prototype.bind
 * 原理: 会创建一个新的包装函数,这个函数会忽略它当前的this绑定(无论绑定的对象是什么),
 * 并把我们提供的对象绑定到this上.
 */
// function foo(something){
//     console.log(this.a,something);
//     return this.a + something;
// }
// var obj = {
//     a:2
// }
// var bar = foo.bind(obj);
// var b = bar(3);
// console.log(b);

/**
 * 3.2.2 API调用的"上下文"
 */
// function foo(el){
//     console.log(el,this.id);
// }
// var obj = {
//     id:"awesome"
// }
// var array = [1,2,3]
// array.forEach(foo,obj);
//调用foo(...)时把this绑定到obj

/**
 * 4. new绑定
 * 解释:(1)对于JavaScript中的"构造函数",只是一些使用new操作符时被调用的函数,
 * 它们并不会属于某个类,也不会实例化一个类,实际上,它们甚至都不能说是一种特殊
 * 的函数类型,它们只是被new操作符调用的普通函数而已!!!!
 *     (2)实际上并不存在所谓的"构造函数",只有对于函数的"构造调用"
 *     (3)使用new来调用函数,或者说发生构造函数调用时,会执行以下操作:
 *     * 创建(构造)一个全新的对象
 *     * 这个对象会被执行[[原型]]连接
 *     * 这个新对象会绑定到函数调用的this
 *     * 如果函数没有返回其他对象,那么new表达式中的函数调用会自动返回这个新对象.
 */

// function foo(a){
//     this.a = a;
// }
// var bar = new foo(2);
// console.log(bar.a);//2
/**
 * 使用new来调用foo(...)时,我们会构造一个新对象并把它绑定到foo(...)调用
 * 中的this上,new是最后一种可以影响函数调用时this绑定行为的方法,谓之new绑定.
 */

/**
 * 找到函数的调用位置并判断应当应用哪条规则.
 */




