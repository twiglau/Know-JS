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

(10).makeltRain()
