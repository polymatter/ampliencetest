(this["webpackJsonppoq.amplience.product-picker"]=this["webpackJsonppoq.amplience.product-picker"]||[]).push([[0],{19:function(n,e,t){},24:function(n,e,t){"use strict";t.r(e);var a,r,o,i,c,d,s,l,p,b,u=t(0),j=t.n(u),h=t(10),x=t.n(h),f=(t(19),t(4)),g=(t(9),t(11)),O=t(2),m=t(3),k=m.a.div(a||(a=Object(O.a)(["\n    width: 25%;\n    padding: 16px;\n    border-radius: 8px;\n    box-shadow: 0 0 4px rgb(0 0 0 / 5%);\n    background: #fff;\n    overflow-y: hidden;\n"]))),w=m.a.div(r||(r=Object(O.a)(["\n    padding-bottom: 10px;\n    font-weight: bold;\n"]))),v=m.a.div(o||(o=Object(O.a)(["\n    padding-bottom: 10px;\n"]))),y=m.a.div(i||(i=Object(O.a)(["\n    padding-bottom: 10px;\n"]))),C=m.a.input(c||(c=Object(O.a)(["\n    width: calc(100% - 3.3em);\n    padding: 0.5em 0.8em 0.5em 2.5em;\n    border: 1px solid #ced4da;\n    border-radius: 4px;\n    outline: none;\n    background: #fff;\n    line-height: 1.5;\n    color: #000;\n    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n\n    -webkit-writing-mode: horizontal-tb !important;\n    text-rendering: auto;\n    letter-spacing: normal;\n    word-spacing: normal;\n    text-transform: none;\n    text-indent: 0px;\n    text-shadow: none;\n    display: inline-block;\n    text-align: start;\n    appearance: auto;\n    -webkit-rtl-ordering: logical;\n    cursor: text;\n\n"]))),S=m.a.button(d||(d=Object(O.a)(["\n    width: 100%;\n    padding-bottom: 10px;\n    display: inline-block;\n    position: relative;\n    padding: 10px 32px;\n    border: none;\n    border-radius: 8px;\n    outline: none;\n    background: rgb(97,60,122);\n    font: inherit;\n    text-align: center;\n    white-space: no-wrap;\n    user-select: none;\n    color: #fff;\n    cursor: pointer;\n    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    -webkit-appearance: button;\n"]))),P=m.a.table(s||(s=Object(O.a)(["\n    display: table;\n    text-indent: initial;\n    border-spacing: 2px;\n    width: 100%;\n    border: none;\n    padding-bottom: 10px;\n"]))),E=m.a.tbody(l||(l=Object(O.a)(["\n    display: table-row-group;\n    vertical-align: middle;\n"]))),L=m.a.tr(p||(p=Object(O.a)(["\n    display: table-row;\n    outline: none;\n    cursor: pointer;\n"]))),F=m.a.td(b||(b=Object(O.a)(["\n    border-bottom: 5px solid #efefef;\n    padding: 8px 16px;\n    text-align: left;\n    background: ","\n"])),(function(n){return n.selected?"black":"red"})),N=t(1),T=function(n){var e=n.sdk,t=Object(u.useState)(""),a=Object(f.a)(t,2),r=a[0],o=a[1],i=Object(u.useState)([]),c=Object(f.a)(i,2),d=c[0],s=c[1],l=Object(u.useState)(""),p=Object(f.a)(l,2),b=p[0],j=p[1];Object(u.useEffect)((function(){e.field.getValue().then(j)}),[]);var h=e.params.instance.endpoint.displayLabelProperty,x=function(n){return function(){j(n[h])}},g=function(n){return b===n[h]};return Object(N.jsxs)(k,{className:"App",children:[Object(N.jsx)(w,{children:"Product"}),Object(N.jsx)(v,{children:"Enter a product name below, then click Search to find the right product"}),Object(N.jsx)(y,{children:Object(N.jsx)(C,{placeholder:"Product name eg. Dress",type:"text",className:"input",onChange:function(n){var e=n.target.value;o(e)},value:r})}),Object(N.jsx)(S,{onClick:function(){var n,t=e.params.instance.headers,a=null===(n=e.params.instance.endpoint.searchUrl)||void 0===n?void 0:n.replace("${search}",r);a?fetch(a,{method:"GET",headers:t}).then((function(n){return n.json()})).then((function(n){var t=e.params.instance.endpoint.listProperty;s(t?n[t]:n)})):console.error("No searchUrl specified")},children:"Search"}),d.length>0&&Object(N.jsx)(P,{children:Object(N.jsx)(E,{children:d.map((function(n){return Object(N.jsx)(L,{children:Object(N.jsx)(F,{onClick:x(n),selected:g(n),children:n[h]})})}))})})]})},A=function(n){n.sdk;return Object(N.jsx)("div",{children:"Category Picker here"})};var q=function(){var n=Object(u.useState)(),e=Object(f.a)(n,2),t=e[0],a=e[1];return Object(u.useEffect)((function(){Object(g.a)().then(a)}),[]),t?(t.frame.startAutoResizer(),"category"==t.params.instance.pickerType.toLowerCase()?Object(N.jsx)(A,{sdk:t}):Object(N.jsx)(T,{sdk:t})):Object(N.jsx)("div",{className:"App",children:"Loading ..."})},z=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,25)).then((function(e){var t=e.getCLS,a=e.getFID,r=e.getFCP,o=e.getLCP,i=e.getTTFB;t(n),a(n),r(n),o(n),i(n)}))};x.a.render(Object(N.jsx)(j.a.StrictMode,{children:Object(N.jsx)(q,{})}),document.getElementById("root")),z()},9:function(n,e,t){}},[[24,1,2]]]);
//# sourceMappingURL=main.134e1959.chunk.js.map