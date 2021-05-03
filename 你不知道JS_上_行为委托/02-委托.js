/**
 * 实例
 * 1. 类风格代码
 */
// function Widget(width,height){
//     this.width = width || 50;
//     this.height = height || 50;
//     this.$ele = null;
// }
// Widget.prototype.render = function($where){
//     if(this.$ele){
//         this.$ele.css({
//             width:this.width + "px",
//             height:this.height + "px"
//         }).appendTo($where);
//     }
// };

// //子类
// function Button(width,height,label) {
//     //调用 "super" 构造函数
//     Widget.call(this,width,height);
//     this.label = label || "Default";
//     this.$ele = $("<button>").text( this.label)
// }
// //让Button "继承" Widget
// Button.prototype.render = function($where) {
//     // "super" 调用
//     Widget.prototype.render.call( this.$where);
//     this.$ele.click( this.onClick.bind(this));
// };
// Button.prototype.onClick = function(evt){
//     console.log("Button '" + this.label + "' clicked!");
// };
// $(document).ready( function(){
//     var $body = $(document.body);
//     var btn1 = new Button(125,30,"Hello");
//     var btn2 = new Button(150,40,"World");
//     btn1.render($body);
//     btn2.render($body);
// })

/**
 * 2. ES6的class 语法糖
 */
// class Widget {
//     constructor(width,height){
//         this.width = width || 50;
//         this.height = height || 50;
//         this.$ele = null;
//     }
//     render($where){
//         if(this.$ele){
//             this.$ele.css({
//                 width:this.width + 'px',
//                 height:this.height + 'px'
//             }).appendTo($where)
//         }
//     }
// }
// class Button extends Widget {
//     constructor(width,height,label){
//         super(width,height);
//         this.label = label || "Default";
//         this.$ele = $("<button>").text( this.label);
//     }
//     render($where){
//         super($where)
//         this.$ele.click( this.onClick.bind( this ));
//     }
//     onClick(evt){
//         console.log( "Button '" + this.label + "' clicked!");
//     }
// }
// $(document).ready( function(){
//     var $body = $(document.body);
//     var btn1 = new Button(125,30,"Hello");
//     var btn2 = new Button(150,30,"World");

//     btn1.render( $body );
//     btn2.render( $body );
// })

/**
 * 以上尽管语法上得到了改进,但实际上这里并没有真正的类,class仍然是
 * 通过[[Prototype]]机制实现的.
 */

/**
 * 3. 委托控件对象
 */
// var Widget = {
//     init:function(width,height){
//         this.width = width || 50;
//         this.height = height || 50;
//         this.$ele = null;
//     },
//     insert:function($where){
//         if(this.$ele){
//             this.$ele.css({
//                 width:this.width + "px",
//                 height:this.height + "px"
//             }).appendTo($where);
//         }
//     }
// };
// var Button = Object.create(Widget);
// Button.setup = function(width,height,label){
//     //委托调用
//     this.init(width,height);
//     this.label = label || "Default";

//     this.$ele = $("<button>").text( this.label);
// };
// Button.build = function($where){
//     //委托调用
//     this.insert( $where );
//     this.$ele.click( this.onClick.bind( this ));
// };
// Button.onClick = function(evt) {
//     console.log("Button '" + this.label + "' clicked!");
// };
// $(document).ready( function(){
//     var $body = $(document.body);
//     var btn1 = Object.create( Button);
//     btn1.setup(125,30,"Hello");

//     var btn2 = Object.create( Button);
//     btn2.setup(150,40,"World");

//     btn1.build($body);
//     btn2.build($body);
// })