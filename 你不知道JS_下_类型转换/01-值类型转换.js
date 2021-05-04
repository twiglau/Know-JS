/**
 * 类型转换(type casting), 隐式的情况称为 强制类型转换(coercion)
 */
var a = 42;
var b = a + ""; //隐式强制类型转换
var c = String(a); //显式强制类型转换
console.log(b,c);

/**
 * 2. 抽象值操作
 * toString, toNumber, toBoolean, toPrimitive
 */

//2.1 toString
// 基本类型值的字符串规则为: null 转换为 "null", undefined 转换为 "undefined", true 转换为 "true"
// 2.1.1 数组的默认 toString()方法经过了重新定义,将所有单元字符串化以后再用","连接起来:
var a = [1,2,3];
console.log(a.toString());// "1,2,3"

//2.2 toNumber
// 其中 true 转换为1, false 转换为 0, undefined 转换为 NaN, null 转换为 0.
// 对象(包括数组)会首先被转换为相应的基本类型值,如果返回的是非数字的基本类型值,
// 则再遵循以上规则将其强制转换为数字,为将值转换为相应的基本类型值,抽象操作ToPrimitvie会
// 首先(通过内部操作DefaultValue) 检查该值是否有valueOf()方法