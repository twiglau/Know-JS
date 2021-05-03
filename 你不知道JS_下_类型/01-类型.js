/**
 * JavaScript 7种内置类型:
 * 
 * *空值(null)
 * *未定义(undefined)
 * *布尔值(boolean)
 * *数字(number)
 * *字符串(string)
 * *对象(object)
 * *符号(symbol,ES6中新增)
 * 1. 内置类型
 */



console.log(typeof undefined === "undefined");
console.log(typeof true === "boolean");
console.log(typeof 42 === "number");
console.log(typeof "42" === "string");
console.log(typeof {life:42} === "object");
console.log(typeof Symbol() === "symbol");
console.log(typeof null === "object");

var a = null;
console.log(!a && typeof a === "object");

//2.null是基本类型中唯一的一个"假值"(falsy 或者 false-like)类型,typeof 对它的返回值为 "object"

//3.函数说明
console.log(typeof function a(){} === "function");
/**
 * function(函数)也是JavaScript 的一个内置类型,它实际上是object的一个"子类型",具体来说,函数是"可调用
 * 对象",它由一个内部属性 [[call]],该属性使其可以被调用.
 */

//函数不仅是对象,还可以拥有属性:
function b(c,d){}
console.log(b.length)//该函数声明了两个命名参数,c,d.所以其length值为2.

//4.数组 -->也是对象,一个object的"子类型"
console.log( typeof [1,2,3] === "object");


//5.JavaScript 中的变量是没有类型的,只有值才有,语言引擎不要求变量总是持有与其初始值同类型的值.
//  在对变量执行typeof操作时,得到的结果并不是该变量的类型,而是该变量持有的值得类型,因为JavaScript
//  中的变量没有类型
var a = 42;
typeof a; // "number"
a = true;
typeof a; // "boolean"

// 5.1 typeof运算符总是会返回一个字符串
// 解释: typeof 42 首先返回字符串 "number",然后 typeof "number" 返回 "string".
console.log( typeof typeof 42); // "string"


//6. undefined 和 undeclared
// 已在作用域中声明但还没有赋值的变量,是undefined的,相反,还没有在作用域中声明过的变量,是undeclared的
var e;
console.log(e); //undefined
console.log(f); // ReferenceError: b is not defined
// "undefined" 和 "is not defined" 是两码事