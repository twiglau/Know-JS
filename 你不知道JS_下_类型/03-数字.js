var a = 42.300;
var b = 42.0;
console.log(a,b);// 42.3   42

var c = 5E10;
console.log(c.toExponential());

//1.由于数字值可以使用Number对象进行封装,因此
//数字值可以调用Number.prototype中的方法,例如:
// tofixed(...)方法可指定小数部分的显示位数:
var d = 42.59;
console.table(
    [
        a.toFixed(0),
        a.toFixed(1),
        a.toFixed(2),
        a.toFixed(3),
        a.toFixed(4)
    ]
)
//2.toPrecision(..)方法用来指定有效数位的显示位数
console.table(
    [
        a.toPrecision(5),
        a.toPrecision(1),
        a.toPrecision(2),
        a.toPrecision(3),
        a.toPrecision(4)
    ]
)

//3. 以上方法:toFixed(...), toPrecision(...)
// 不仅适用于数字变量,也适用于数字变量.

//3.1 无效语法, 因为 . 被视为常量 42. 的一部分,所以没有 .属性
// 访问运算符来调用 toFixed 方法
// 42.toFixed(3);

//3.2 以下都有效:
console.table([
    (42).toFixed(3),
    0.42.toFixed(3),
    42..toFixed(3)
])


//4. 整数的安全范围
//4.1 数字的呈现方式决定了 "整数" 的安全值范围远远小于 Number.MAX_VALUE
//    能够被 "安全" 呈现的最大整数是 2^53 - 1
console.log(Math.pow(2,53) - 1);

//4.2 时常JavaScript 程序需要处理些比较大的数字,如数据库中 64位 ID 等,
// 由于 JavaScript 的数字类型无法精确呈现 64 位数值,所以必须将它们保存(转换)为字符串

//5. 整数检测
console.table([
    Number.isInteger(42), // true
    Number.isInteger(42.000), // true,
    Number.isInteger(42.3) // false
])

// 6. 特殊数值
// 6.1 不是值得值
//  undefined 类型只有一个值,即undefined. null 类型也只有一个值,即null.
//  它们的名称即是类型也是值

// undefined 指从未赋值
// null 指曾赋过值,但是目前没有值

// 6.2 void 运算符
// undefined 是一个内置标识符它的值为 undefined, 通过 void 运算符即可得到该值
// 表达式 void ___ 没有返回值,因此返回结果是 undefined. void 并不改变表达式的结果
// 只是让表达式不返回值:
var a = 42;
console.log( void a, a); // undefined 42
// 6.2.1 void 不让表达式返回任何结果
function doSomething(){
    if(true){
        //稍后再试
        return void setTimeout( doSomething,100);
    }
    var result;
    return result;
}

//7. 特殊的数字
// 7.1 不是数字的数字
// 如果数学运算的操作数不是数字类型,就无法返回一个有效的数字,这种情况下返回值为 NaN.
// NaN 可以理解为 "无效数值" "失败数值" 或者 "坏数值" 可能更准确些
var h = 2 / "foo";
console.log(h);
// 7.2 NaN 是一个"警戒值"(sentinel value,有特殊用途的常规值),用于指出数字类型中的错误情况
// "执行数学运算没有成功,这是失败后返回的结果"

// 7.3 该如何判断它 NaN 呢?
var a = 2 / "foo";
var b = "foo";
console.log(isNaN(a));// true
console.log(isNaN(b));// true, "foo" 不是一个数字,但是它也不是NaN.


