/**
 * 6中主要类型[语言类型]:
 * *string
 * *number
 * *boolean
 * *null
 * *undefined
 * *object
 */

/**
 * 内置对象[对象子类型]
 * *String
 * *Number
 * *Boolean
 * *Object
 * *Function
 * *Array
 * *Date
 * *RegExp
 * *Error
 * 这些内置对象从表现形式来说很像其他语言中的类型(type) 或者 类(class)
 * 但在JS中,它们实际上只是一些内置函数,这些内置函数可以当作构造函数来使用,
 * 从而可以构造一个对应子类型的新对象.
 */

/**
 * 对象不变性
 * 1. 对象常量
 * 结合writable:false 和 configurable:false 就可以创建一个真正
 * 的常量属性
 */
var myObject = {};
Object.defineProperty(myObject,"FAVORITE_NUMBER",{
    value:42,
    writable:false,
    configurable:false
})

/**
 * 2. 禁止扩展
 * 如果你想禁止一个对象添加新属性并且保留已有属性,可以使用 Object.preventExtensions(...);
 */
var myObject1 = {
    a:2
};
Object.preventExtensions(myObject1);

myObject1.b = 3;
console.log(myObject1.b) //undefined


/**
 * 3.密封
 * Object.seal(...)会创建一个 "密封" 的对象,这个方法实际上会在一个现有
 * 对象上调用Object.prevExtensions(...)并把所有现有属性标记为
 * configurable:false
 */


