/**
 * 1.[[Prototype]]机制就是指对象中的一个内部链接引用
 * 另一个对象
 * 如果在第一个对象上没有找到需要的属性或者方法引用,引擎就会
 * 继续在[[Prototype]]关联的对象上进行查找,同理,如果在后者中
 * 也没有找到需要的引用就会继续查找它的[[Prototype]],以此类推,
 * 这一系列对象的链接就称为 "原型链"
 */

/**
 * 本质就是对象的关联
 */

/**
 * 2.[[Prototype]] 代表的是一种不同于类的设计模式
 */

Task = {
    setID:function(ID) { this.id = ID;},
    outputID:function() { console.log( this.id );}
};
//让XYZ委托Task
XYZ = Object.create(Task);

XYZ.prepareTask = function(ID,Label){
    this.setID( ID );
    this.label = Label;
}
XYZ.outputTaskDetails = function(){
    this.outputID();
    console.log( this.label);
};

/**
 * Task 和 XYZ 并不是类 (或者函数),它们是对象,XYZ通过
 * Object.create(...)创建,它的 [[Prototype]] 委托了
 * Task 对象
 */

// 对象关联风格的代码的不同之处?
/**
 * 1. 在上面代码中,id 和 label 数据成员都是直接存储在XYZ上(而不是Task),
 * 通常来说,在[[Prototype]]委托中最好把状态保存在委托者(XYZ,ABC)而不是委托目标
 * (Task)上.
 */

/**
 * 2.在类的设计模式中,我们故意让父类(Task)和子类(XYZ)中都有outputTask 方法,这样就可以
 * 利用重写(多态)的优势,在委托行为中恰好相反,我们会尽量避免在[[Prototype]]链的不同级别中使用相同
 * 的命名,否则就需要使用笨拙且脆弱的语法来消除引用歧义
 */

/**
 * 3.this.setID(ID); XYZ中的方法首先会寻找XYZ自身是否有 setID(...),但是 XYZ 中并没有这个方法名,
 * 因此会通过 [[Prototype]] 委托关联到 Task 继续寻找,这时就可以找到 setID(...)方法. 
 * 另外: 
 * 由于调用位置触发了 this 的隐式绑定规则,因此虽然 setID(...)方法在 Task 中,运行时 this 仍然会绑定到XYZ.
 */

//以上委托行为 意味着某些对象 (XYZ) 在找不到属性或方法引用时会把这个请求委托给另一个对象 (Task).



/**
 * 3.比较思维模型
 */

function Foo(who){
    this.me = who;
}
Foo.prototype.identify = function(){
    return "I am " + this.me;
};
function Bar(who){
    Foo.call(this, who);
}
Bar.prototype = Object.create( Foo.prototype );
Bar.prototype.speak = function(){
    alert("Hello, " + this.identify() + ".");
};
var b1 = new Bar("b1");
var b2 = new Bar("b2");
b1.speak()
b2.speak()


/**
 * 以上: 子类Bar 继承了父类Foo, 然后生成了b1 和 b2 两个实例. b1 委托了 Bar.prototype, 后者委托了 
 *      Foo.prototype.
 */

// 对象关联风格的代码
Foo = {
    init: function(who){
        this.me = who;
    },
    identify:function(){
        return "I am " + this.me;
    }
};
Bar = Object.create(Foo);
Bar.speak = function(){
    alert("Hello, " + this.identify() + ".");
};
var b1 = Object.create( Bar );
b1.init("b1");
var b2 = Object.create( Bar );
b2.init("b2");
b1.speak();
b2.speak();