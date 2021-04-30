/**
 * [[Prototype]]机制的意义? 为什么JS开发者
 * 非这么大力气(模拟类)在代码中创建这些关联呢?
 */

var foo = {
    something: function(){
        console.log( "Tell me something good ...")
    }
}
var bar = Object.create(foo);
bar.something();

/**
 * 对于以上的解释:
 * Object.create(...)会创建一个新对象(bar)并把它关联到我们指定的对象(foo),这样
 * 我们就可以充分发挥[[Prototype]]机制的威力(委托)并且避免不必要的麻烦(比如使用new的构造函数
 * 调用会生成.prototype 和 .constructor 引用)
 */

/**
 * Object.create(null)会创建一个拥有空(或者说null)[[Prototype]]链接的对象,这个对象
 * 无法进行委托,由于这个对象没有原型链,所以instanceof 操作符 无法进行判断,因此总是会返回false,
 * 这些特殊的空[[Prototype]]对象通常被称为"字典",它们完全不会受到原型链的干扰,因此非常适合用来
 * 存储数据.
 */