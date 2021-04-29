/**
 * 1.绑定例外
 */
/**
 * 1.1 被忽略的this
 * 如果你把null 或者 undefined 作为this 的绑定对象传入call,apply或者bind,这些值
 * 在调用时会被忽略,实际应用的是默认绑定规则
 */
// function foo(){
//     console.log(this.a);
// }
// var a = 2;
// foo.call(null);

/**
 * 什么情况下你会传入null呢?
 * 1.1.1 --> 一种常见的做法是使用apply(...)来"展开"一个数组,并当做参数传入一个
 * 函数,类似的,bind(...)可以对参数进行柯里化(预先设置一些参数)
 */
function foo(a,b){
    console.log("a:" + a + ", b:" + b);
}
//把数组 "展开" 成参数
foo.apply(null,[2,3]); //
//使用 bind(...)进行柯里化
var bar = foo.bind(null,2)
bar(3);

/**
 * 以上两种方法都需要传入一个参数当做this的绑定对象,如果函数并不关心this的话,你
 * 仍然需要传入一个占位值,这是null可能是一个不错的选择.
 */

/**
 * "更安全"做法, 可以创建一个 "DMZ" (demilitarized zone, 非军事区)对象
 * ----- 它就是一个空的非委托的对象
 * JavaScript 中创建一个空对象最简单的方法都是  Object.create(null)
 */