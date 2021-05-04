/**
 * 常用的原生函数有:
 * *String()
 * *Number()
 * *Boolean()
 * *Array()
 * *Object()
 * *Function()
 * *RegExp()
 * *Date()
 * *Error()
 * *Symbol()
 * 它们就是 内建函数
 */

//1. 原生函数可以被当做构造函数来使用,但其构造出来的对象可能会有区别:
var a = new String("abc");
console.log( typeof a );// 是 "object",不是 "String"
console.log( a instanceof String);// true
console.log( Object.prototype.toString.call(a)); // "[object String]"
//1.1 以上通过构造函数(如 new String("abc"))创建出来的是封装了基本类型值(如 "abc")的封装对象
// typeof 在这里返回的是对象类型的子类型


//2. 内部属性 [[class]]
// 所有 typeof 返回值为 "object" 的对象(如数组)都包含一个内部属性[[class]] --> 
// 我们可以把它看做一个内部的分类,而非传统的面向对象意义上的类.
// 这个属性无法直接访问,一般通过Object.prototype.toString(...)来查看
console.log(Object.prototype.toString.call([1,2,3]))
console.log(Object.prototype.toString.call(/regex-literal/i))
/**
 * 数组的内部[[class]]属性值是"Array",正则表达式的值是 "RegExp"
 */
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
// Null() 和 Undefined() 这样的原生构造函数并不存在,但是内部 [[class]] 属性值仍然
// 是 "Null" 和 "Undefined"

//3. 其他基本类型值(如字符串,数字和布尔) 的情况有所不同,通常称为"包装"(boxing):
console.log(Object.prototype.toString.call("abc")); 
console.log(Object.prototype.toString.call(42));
console.log(Object.prototype.toString.call(true));
// 上例中基本类型值被各自的封装对象自动包装,所以它们的内部[[class]]属性值分别为
// "String", "Number" 和 "Boolean"

//4.封装对象包装
//  封装对象(object wrapper), 基本类型值没有 .length 和 .toString() 这样的属性和方法,
//  需要通过封装才能访问,此时 JavaScript 会自动为基本类型值 包装(box 或者 wrap) 一个封装对象:

var a = "abc";
console.log(a.length,a.toUpperCase());

//5. 拆封 --> 如果想要得到封装对象中的基本类型值, 可以使用 valueOf()函数:
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);
console.log(a.valueOf(),b.valueOf(),c.valueOf());

