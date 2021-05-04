/**
 * 数组
 * 1. 类数组
 * 有时需要将类数组(一组通过数字引索的值)转换为真正的数组,这一般通过数组工具函数
 * (如 indexOf(),concat(...),forEach(...)等)来实现
 * 例子: 通过arguments 对象(类数组)将函数的参数当做列表来访问[从ES6开始已经废止]
 */

// 1.1 工具函数 slice(...)经常被用于这类转换:
// function foo(){
//     var arr = Array.prototype.slice.call(arguments);
//     arr.push("bam");
//     console.log(arr);
// }
// foo("bar","baz");

// function foo1(){
//     var arr = Array.from(arguments);
//     arr.push("bax");
//     console.log(arr);
// }
// foo1("bat","baq");

//2. (10).makeltRain()

//3. 字符串,和数组很相似,他们都是类数组,都有Length 属性及 indexOf(...) 和 concat(...)方法
var a = "foo";
var b = ["f","o","o"];
console.log(a.length,b.length);
console.log(a.indexOf("o"),b.indexOf("o"));

var c = a.concat("bar");
var d = b.concat(["b","a","r"]);
console.log(c,d);

/**
 * 3.1JavaScript 中字符串是不可变的,而数组是可变的,
 * 字符串不可变是指:字符串的成员函数不会改变其原始值,而是创建并返回一个新的字符串.
 * 而数组的成员函数都是在其原始值上进行操作.
 */
c = a.toUpperCase();
console.log( a === c);
console.log(a,c);
b.push("!");
console.log(b);

/**
 * 3.2许多数组函数用来处理字符串很方便,虽然 字符串没有这些函数,但可以通过
 * "借用"数组的非变更方法来处理字符串?
 */
console.log(a.join,a.map);

var d = Array.prototype.join.call(a,"-");
var e = Array.prototype.map.call(a,function(v){
    return v.toUpperCase() + ".";
}).join("");
console.log(d,e);

/**
 * 3.3 另一个不同点在于字符串反转.数组有一个字符串没有的可变更成员函数 reverse();
 */
console.log(a.reverse); // undefined
console.log(b.reverse());
//3.3.1 事实上我们无法 "借用" 数组的可变成员函数,因为字符串是不可变的:
// var f = Array.prototype.reverse.call(a);
// console.log(f);
// 3.3.2 一个变通(破解)的办法是先将字符串转换为数组,待处理完后再将结果转换回字符串:
var g = a
        //将a的值转换为字符数组
        .split("")
        //将数组中的字符进行进行倒转
        .reverse()
        //将数组中的字符拼接回字符串
        .join("");
console.log(g);