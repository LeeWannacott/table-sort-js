(this["webpackJsonphtml-tablesorter"]=this["webpackJsonphtml-tablesorter"]||[]).push([[0],{19:function(e,t,l){e.exports=l(31)},24:function(e,t,l){e.exports=l.p+"static/media/logo.5d5d9eef.svg"},25:function(e,t,l){},31:function(e,t,l){"use strict";l.r(t);var a=l(0),n=l.n(a),r=l(16),c=l.n(r),o=(l(24),l(25),l(10)),m=l(8);function u(){console.log("hello world");var e=[],t={};console.log("dom loaded");var l,a=Object(m.a)(document.getElementsByTagName("table"));try{for(a.s();!(l=a.n()).done;){var n=l.value;"table-sort"===n.className&&(console.log("table-sort"),n.getElementsByTagName("thead")?n.getElementsByTagName("tbody")?function(){var l,a=n.querySelector("thead"),r=n.querySelector("tbody"),c=a.querySelectorAll("th"),u=Object(m.a)(c.entries("table"));try{var d=function(){var a=Object(o.a)(l.value,2),n=a[0],c=a[1];console.log("th");var u=0;c.addEventListener("click",(function(){u+=1,console.log("clicked"),function(){var l,a=r.querySelectorAll("tr"),d=Object(m.a)(a.entries());try{for(d.s();!(l=d.n()).done;){var E=Object(o.a)(l.value,2),i=E[0],s=E[1];""!==s.querySelectorAll("td").item(n).innerHTML?(e.push(s.querySelectorAll("td").item(n).innerHTML+"#"+i),t[s.querySelectorAll("td").item(n).innerHTML+"#"+i]=s.innerHTML):(e.push("0#"+i),t["0#"+i]=s.innerHTML)}}catch(w){d.e(w)}finally{d.f()}function h(e,t){return e.localeCompare(t,navigator.languages[0]||navigator.language,{numeric:!0,ignorePunctuation:!0})}function y(e,t){return h(t,e)}console.log(e[0]),"undefined"!==typeof e[0]&&(console.log(typeof e),console.log("test1"),"order-by-desc"===c.className&&1===u?e.sort(y,{numeric:!0,ignorePunctuation:!0}):"order-by-desc"===c.className&&2===u?(e.sort(h,{numeric:!0,ignorePunctuation:!0}),u=0):1===u?e.sort(h):2===u&&(e.sort(y),u=0))}(),function(){var l,a=r.querySelectorAll("tr"),n=Object(m.a)(a.entries());try{for(n.s();!(l=n.n()).done;){var c=Object(o.a)(l.value,2),u=c[0];c[1].innerHTML=t[e[u]]}}catch(d){n.e(d)}finally{n.f()}e.length=0}()}))};for(u.s();!(l=u.n()).done;)d()}catch(E){u.e(E)}finally{u.f()}}():console.log("<tbody> Tag does not exist in table"):console.log("<thead> Tag does not exist in table"))}}catch(r){a.e(r)}finally{a.f()}}"loading"===document.readyState||"interactive"===document.readyState?document.addEventListener("DOMContentLoaded",(function(e){u()})):"complete"===document.readyState&&u();var d=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"}),n.a.createElement("table",{id:"myTable",className:"table-sort"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Last Name"),n.a.createElement("th",null,"First Name"),n.a.createElement("th",null,"Email"),n.a.createElement("th",{className:"order-by-desc"},"Due"),n.a.createElement("th",null,"Web Site"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"Smith"),n.a.createElement("td",null,"John"),n.a.createElement("td",null,"jsmith@gmail.com"),n.a.createElement("td",null,"2234"),n.a.createElement("td",null,"http://www.jsmith.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"Bach"),n.a.createElement("td",null,"Frank"),n.a.createElement("td",null,"fbach@yahoo.com"),n.a.createElement("td",null,"1.6"),n.a.createElement("td",null,"http://www.frank.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"Doe"),n.a.createElement("td",null,"Jason"),n.a.createElement("td",null,"jdoe@hotmail.com"),n.a.createElement("td",null,"1,234,567,8,89"),n.a.createElement("td",null,"http://www.jdoe.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"Conway"),n.a.createElement("td",null,"Tim"),n.a.createElement("td",null,"tconway@earthlink.net"),n.a.createElement("td",null,"1.234.567.8,90"),n.a.createElement("td",null,"http://www.timconway.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"Conway"),n.a.createElement("td",null,"T"),n.a.createElement("td",null,"t.net"),n.a.createElement("td",null,"1,234,567,8,91"),n.a.createElement("td",null,"http://www.ti.com")))),n.a.createElement("table",{id:"myTable",className:"table-sort"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Last Name"),n.a.createElement("th",null,"First Name"),n.a.createElement("th",null,"Email"),n.a.createElement("th",{className:"order-by-desc"},"Due"),n.a.createElement("th",null,"Web Site"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"2"),n.a.createElement("td",null,"John"),n.a.createElement("td",null,"jsmith@gmail.com"),n.a.createElement("td",null,"2020-11-28"),n.a.createElement("td",null,"http://www.jsmith.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"Bach"),n.a.createElement("td",null),n.a.createElement("td",null,"fbach@yahoo.com"),n.a.createElement("td",null),n.a.createElement("td",null,"http://www.frank.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"Doe"),n.a.createElement("td",null,"Jason"),n.a.createElement("td",null,"jdoe@hotmail.com"),n.a.createElement("td",null,"2020-11-25"),n.a.createElement("td",null,"http://www.jdoe.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"t"),n.a.createElement("td",null,"Tim"),n.a.createElement("td",null,"tconway@earthlink.net"),n.a.createElement("td",null,"1"),n.a.createElement("td",null,"http://www.timconway.com")),n.a.createElement("tr",null,n.a.createElement("td",null,"Conway"),n.a.createElement("td",null,"T"),n.a.createElement("td",null,"t.net"),n.a.createElement("td",null,"2020-11-13"),n.a.createElement("td",null,"http://www.ti.com")))))};var E=l(17),i=l(1);c.a.render(n.a.createElement(E.a,null,n.a.createElement(i.a,{exact:!0,path:"/",component:d}),n.a.createElement(d,null)),document.getElementById("display"))}},[[19,1,2]]]);
//# sourceMappingURL=main.8701563e.chunk.js.map