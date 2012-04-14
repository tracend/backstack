(function(a,b){typeof exports!="undefined"?b(a,exports,require("underscore"),require("jquery"),require("Backbone")):typeof define=="function"&&define.amd?define(["underscore","jquery","Backbone","exports"],function(c,d,e,f){a.BackStack=b(a,f,c,d,e)}):a.BackStack=b(a,{},a._,a.jQuery||a.Zepto||a.ender,a.Backbone)})(this,function(a,b,c,d,e){var f,g,h;return function(a){function j(a,b){if(a&&a.charAt(0)==="."&&b){b=b.split("/"),b=b.slice(0,b.length-1),a=b.concat(a.split("/"));var c,d;for(c=0;d=a[c];c++)if(d===".")a.splice(c,1),c-=1;else if(d==="..")if(c!==1||a[2]!==".."&&a[0]!=="..")c>0&&(a.splice(c-1,2),c-=2);else break;a=a.join("/")}return a}function k(b,c){return function(){return i.apply(a,d.call(arguments,0).concat([b,c]))}}function l(a){return function(b){return j(b,a)}}function m(a){return function(c){b[a]=c}}function n(d){if(c.hasOwnProperty(d)){var f=c[d];delete c[d],e.apply(a,f)}return b[d]}function o(a,b){var c,d,e=a.indexOf("!");return e!==-1?(c=j(a.slice(0,e),b),a=a.slice(e+1),d=n(c),d&&d.normalize?a=d.normalize(a,l(b)):a=j(a,b)):a=j(a,b),{f:c?c+"!"+a:a,n:a,p:d}}var b={},c={},d=[].slice,e,i;if(typeof h=="function")return;e=function(d,e,f,g){var h=[],i,j,l,p,q,r;g||(g=d);if(typeof f=="function"){!e.length&&f.length&&(e=["require","exports","module"]);for(p=0;p<e.length;p++){r=o(e[p],g),l=r.f;if(l==="require")h[p]=k(d);else if(l==="exports")h[p]=b[d]={},i=!0;else if(l==="module")j=h[p]={id:d,uri:"",exports:b[d]};else if(b.hasOwnProperty(l)||c.hasOwnProperty(l))h[p]=n(l);else if(r.p)r.p.load(r.n,k(g,!0),m(l),{}),h[p]=b[l];else throw d+" missing "+l}q=f.apply(b[d],h),d&&(j&&j.exports!==a?b[d]=j.exports:i||(b[d]=q))}else d&&(b[d]=f)},f=i=function(b,c,d,f){return typeof b=="string"?n(o(b,c).f):(b.splice||(c.splice?(b=c,c=arguments[2]):b=[]),f?e(a,b,c,d):setTimeout(function(){e(a,b,c,d)},15),i)},i.config=function(){return i},g||(g=i),h=function(a,b,d){b.splice||(d=b,b=[]),h.unordered?c[a]=[a,b,d]:e(a,b,d)},h.amd={jQuery:!0}}(),h("almond",function(){}),h("StackView",[],function(){var a=e.View.extend({destructionPolicy:"auto",stackNavigator:null,rendered:!1,setStackNavigator:function(a,b){this.stackNavigator=a,b&&b.destructionPolicy&&(this.destructionPolicy=b.destructionPolicy),this.$el.css({position:"absolute",overflow:"hidden",width:"100%",height:"100%"})}});return a}),h("effects/NoEffect",[],function(){var a=function(a){this.stackNavigator=a};return a.prototype.play=function(a,b,c,d){b&&(b.css("display",b.data("original-display")),b.removeData("original-display")),c.call(d)},a}),h("effects/vendorPrefix",[],function(){var a,b=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,c=document.getElementsByTagName("script")[0];if("WebkitOpacity"in c.style)a="Webkit";else if("KhtmlOpacity"in c.style)a="Khtml";else for(var d in c.style)if(b.test(d)){a=d.match(b)[0];break}return a||""}),h("effects/SlideEffect",["effects/vendorPrefix"],function(a){var b=function(b,c,d){this.stackNavigator=b,this.direction=c?c:"left",this.effectParams="all "+(d?d:"0.4s ease-out 0.1s")};return b.prototype.play=function(b,c,e,f){var g=0,h,i;a=="Moz"||a==""?h="transitionend":a=="ms"?h="MSTransitionEnd":h=a.toLowerCase()+"TransitionEnd";var j=function(b){g--,d(b.target)[0].style[a+"Transition"]="",g==0&&e&&e.call(f)};b&&(b.one(h,j),b.css("left",0),b[0].style[a+"Transition"]=this.effectParams,g++),c&&(c.one(h,j),c.css("left",this.direction=="left"?this.stackNavigator.$el.width():-this.stackNavigator.$el.width()),c[0].style[a+"Transition"]=this.effectParams,g++,c.css("display",c.data("original-display")),c.removeData("original-display"));if(b||c)this.stackNavigator.$el.css("width"),i="translateX("+(this.direction=="left"?-this.stackNavigator.$el.width():this.stackNavigator.$el.width())+"px)";b&&c?b[0].style[a+"Transform"]=c[0].style[a+"Transform"]=i:c?c[0].style[a+"Transform"]=i:b&&(b[0].style[a+"Transform"]=i)},b}),h("StackNavigator",["effects/SlideEffect"],function(a){var b=function(b,c,d){c.instance.$el.data("original-display",c.instance.$el.css("display")),c.instance.$el.css("display","none"),this.$el.append(c.instance.$el),c.instance.rendered||(c.instance.render.call(c.instance),c.instance.rendered=!0),this.viewsStack.push(c),d=d||this.defaultPushTransition||(this.defaultPushTransition=new a(this,"left")),d.play(b?b.instance.$el:null,c.instance.$el,function(){this.activeView=c.instance,c.instance.$el.trigger("viewActivate"),b&&(b.instance.$el.trigger("viewDeactivate"),b.instance.destructionPolicy=="never"?b.instance.$el.detach():(b.instance.remove(),b.instance=null)),this.trigger("viewChanged")},this)},f=function(b,c,d){this.viewsStack.pop();if(c){if(!c.instance){var e=c.viewClass;c.instance=new e(c.options),c.instance.setStackNavigator(this,c.options?c.options.navigationOptions:null)}c.instance.$el.data("original-display",c.instance.$el.css("display")),c.instance.$el.css("display","none"),this.$el.append(c.instance.$el),c.instance.rendered||(c.instance.render.call(c.instance),c.instance.rendered=!0)}d=d||this.defaultPopTransition||(this.defaultPopTransition=new a(this,"right")),d.play(b.instance.$el,c?c.instance.$el:null,function(){c?(this.activeView=c.instance,c.instance.$el.trigger("viewActivate")):this.activeView=null,b.instance.$el.trigger("viewDeactivate"),b.instance.remove(),b.instance=null,this.trigger("viewChanged")},this)},g=e.View.extend({viewsStack:null,activeView:null,defaultPushTransition:null,defaultPopTransition:null,events:{viewActivate:"proxyActivationEvents",viewDeactivate:"proxyActivationEvents"},proxyActivationEvents:function(a){this.trigger(a.type,a)},initialize:function(a){this.$el.css({overflow:"hidden"}),this.viewsStack=[]},pushView:function(a,e,f){var g,h,i=typeof a!="function",j=c.last(this.viewsStack);g=i?a:new a(e),g.setStackNavigator(this,e?e.navigationOptions:null),h={instance:g,viewClass:g.constructor,options:e};var k=d.Event("viewChanging",{action:"push",fromViewClass:j?j.viewClass:null,fromView:j?j.instance:null,toViewClass:h.viewClass,toView:h.instance});return this.trigger(k.type,k),k.isDefaultPrevented()?null:(b.call(this,j,h,f),g)},popView:function(a){var b,c;this.viewsStack.length>0&&(c=this.viewsStack[this.viewsStack.length-1]),this.viewsStack.length>1&&(b=this.viewsStack[this.viewsStack.length-2]);var e=d.Event("viewChanging",{action:"pop",fromViewClass:c?c.viewClass:null,fromView:c?c.instance:null,toViewClass:b?b.viewClass:null,toView:b?b.instance:null});this.trigger(e.type,e);if(!e.isDefaultPrevented()){var g=c.instance;return f.call(this,c,b,a),g}return null},popAll:function(a){if(this.viewsStack.length>0){var b;this.viewsStack.length>0&&(b=this.viewsStack[this.viewsStack.length-1]);var c=d.Event("viewChanging",{action:"popAll",fromViewClass:b?b.viewClass:null,fromView:b?b.instance:null,toViewClass:null,toView:null});this.trigger(c.type,c),c.isDefaultPrevented()||(this.viewsStack.splice(0,this.viewsStack.length-1),f.call(this,b,null,a))}return null},replaceView:function(a,c,e){if(this.viewsStack.length>0){var f,g,h=typeof a!="function",i=this.viewsStack[this.viewsStack.length-1];f=h?a:new a(c),f.setStackNavigator(this,c?c.navigationOptions:null),g={instance:f,viewClass:f.constructor,options:c};var j=d.Event("viewChanging",{action:"replace",fromViewClass:i.viewClass,fromView:i.instance,toViewClass:g.viewClass,toView:g.instance});this.trigger(j.type,j);if(!j.isDefaultPrevented())return this.viewsStack.pop(),b.call(this,i,g,e),f}return null}});return g}),h("effects/FadeEffect",["effects/vendorPrefix"],function(a){var b=function(a,b){this.stackNavigator=a,this.effectParams="opacity "+b?b:"0.3s ease-in-out"};return b.prototype.play=function(b,c,e,f){var g=0,h;a=="Moz"||a==""?h="transitionend":a=="ms"?h="MSTransitionEnd":h=a.toLowerCase()+"TransitionEnd";var i=function(b){g--,d(b.target)[0].style[a+"Transition"]="",g==0&&e&&e.call(f)};b&&(b.one(h,i),b[0].style[a+"Transition"]=this.effectParams,g++),c&&(c.css("opacity",0),c.one(h,i),c[0].style[a+"Transition"]=this.effectParams,g++,c.css("display",c.data("original-display")),c.removeData("original-display")),this.stackNavigator.$el.css("width"),c&&c.css("opacity",1),b&&b.css("opacity",0);var j=this;setTimeout(function(){g>0&&(g=-1,c&&(b.off(h,i),c[0].style[j.vendorPrefix+"Transition"]=""),b&&(c.off(h,i),b[0].style[j.vendorPrefix+"Transition"]=""),e.call(f))},350)},b}),h("BackStack",["StackNavigator","StackView","effects/NoEffect","effects/SlideEffect","effects/FadeEffect"],function(a,c,d,e,f){return b.StackNavigator=a,b.StackView=c,b.NoEffect=d,b.SlideEffect=e,b.FadeEffect=f,b}),b})