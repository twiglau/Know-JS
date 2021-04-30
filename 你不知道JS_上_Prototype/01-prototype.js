/**
 * 属性设置和屏蔽
 */

/**
 * 分析如果foo 不直接存在于myObject中而是存在于原型链上层时
 * myObject.foo = "bar" 会出现的三种情况
 */

/**
 * 1. 如果在[[Prototype]]链上层存在名为foo的普通数据访问属性并且
 *    没有被标记为只读(writable:false),那就会直接在myObject中添加
 *    一个名为foo的新属性,它是  --> 屏蔽属性
 */
/**
 * 2. 如果在[[Prototype]]链上层存在foo,但是它被标记为只读(writable:false),
 *    那么无法修改已有属性或者在myObject上创建屏蔽属性,如果运行在严格模式下,代码
 *    会抛出一个错误,否则,这条赋值语句会被忽略.
 *    --- 只读属性会阻止[[Prototype]]链下层隐式创建(屏蔽)同名属性
 */
/**
 * 3. 如果在[[Prototype]]链上层存在foo并且它是一个setter,那就一定会调用这个setter
 *    foo 不会被添加到(或者说屏蔽于)myObject,也不会重新定义foo这个setter.
 */

var anotherObject = {
    a:2
}
var myObject = Object.create(anotherObject);
console.log(anotherObject.a,myObject.a)
console.log(anotherObject.hasOwnProperty("a"))
console.log(myObject.hasOwnProperty("a"))

myObject.a++; //隐式屏蔽
console.log(anotherObject.a,myObject.a) //与预想的并不符合?
console.log(myObject.hasOwnProperty("a"))

/**
 * 解释:尽管myObject.a++看起来应该(通过委托)查找并增加anotherObject.a属性,
 *     但是别忘了 ++ 操作相当于 myObject.a = myObject.a + 1, 因此 ++ 操作
 *     首先会通过 [[Prototype]] 查找属性 a 并从 anotherObject.a 获取当前属性值 2,
 *     然后给这个值加1,接着用[[Put]]将值3赋给myObject中新建的屏蔽属性a
 */
