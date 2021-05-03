/**
 * 对象关联风格的行为委托来实现 -- ES6 语法来优化
 * 1.ES6的class 语法可以简洁地定义类方法,这个特性让class乍看起来
 * 更具吸引力
 * class Foo {
 *     methodName(){...}
 * }
 * 唯一区别是对象的字面形式仍然需要使用"."来分割元素,而class语法不需要
 * 
 * 
 * 2.在ES6中,可以使用对象的字面形式(这样就可以使用简洁方法定义)来
 * 改写之前繁琐的属性赋值语法(比如AuthController 的定义),然后用
 * Object.setPrototypeOf(...)来修改它的[[Prototype]]
 */
 var LoginController = {
    errors:[],
    getUser(){
        return document.getElementById("login_username").value;
    },
    getPassword(){
        return document.getElementById("login_password").value;
    },
    validateEntry(user,pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
        if(!(user && pw)){
            return this.failure(
                "Please enter a username & password!"
            );
        }
        else if(user.length < 5) {
            return this.failure(
                "Password must be 5+ characters"
            )
        }
        //如果执行到这里说明通过验证
        return true;
    },
    showDialog(title,msg) {
        //给用户显示标题和消息
    },
    failure(err){
        this.errors.push( err );
        this.showDialog("Error","Login invalid: " + err);
    }
};
//让AuthController 委托 LoginController
var AuthController = {
    errors = [],
    checkAuth() {
        var user = this.getUser();
        var pw = this.getPassword();
        if(this.validateEntry(user,pw)){
            this.server("/check-auth",{
                user:user,
                pw:pw
            })
            .then( this.accepted.bind(this))
            .fail( this.rejected.bind(this));
        }
    },
    server(url,data){
        return $.ajax({
            url:url,
            data:data
        })
    },
    accepted() {
        this.showDialog("Success","Authenticated!")
    },
    rejected(err) {
        this.failure("Auth Failed: " + err);
    }

}
//现在把AuthController 关联到 LoginController
Object.setPrototypeOf(AuthController,LoginController);

/**
 * 反词法
 * 简洁方法有一个非常小但是非常重要的缺点.
 */
var Foo = {
    bar() { /** */},
    baz:function baz(){/** */}
};
//去掉语法糖之后的代码如下所示:
var Foo = {
    bar: function() { /** */}
}
/**
 * 由于函数对象本身没有名称标识符,所以bar()的缩写形式(function()..)
 * 实际上会变成一个匿名函数表达式并赋值给bar属性. 相比之下,具名函数表达式(function baz()..)
 * 会额外给 .baz 属性附加一个词法名称标识符baz.
 * 
 * 匿名函数没有name标识符,这回导致:
 * 1> 调试栈更难追踪;
 * 2> 自我引用(递归,事件(解除)绑定,等等) 更难;
 * 3> 代码(稍微)更难理解.
 */
