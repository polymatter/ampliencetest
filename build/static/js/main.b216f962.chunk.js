(this["webpackJsonppoq.amplience.product-picker"]=this["webpackJsonppoq.amplience.product-picker"]||[]).push([[0],{18:function(e,n,t){},19:function(e,n,t){},24:function(e,n,t){"use strict";t.r(n);var o,c,i,a,r=t(0),d=t.n(r),s=t(9),p=t.n(s),u=(t(18),t(7)),b=(t(19),t(10)),l=t(2),h=t(3),f=h.a.div(o||(o=Object(l.a)(["\n    padding-bottom: 10px;\n    font-weight: bold;\n"]))),j=h.a.div(c||(c=Object(l.a)(["\n    padding-bottom: 10px;\n"]))),g=h.a.input(i||(i=Object(l.a)(["\n    width: 100%;\n    padding: 0.5em 0.8em 0.5em 2.5em;\n    border: 1px solid #ced4da;\n    border-radius: 4px;\n    outline: none;\n    background: #fff\n    line-height: 1.5;\n    color: #000\n    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n"]))),m=h.a.button(a||(a=Object(l.a)(["\n    width: 100%;\n    padding-bottom: 10px;\n    display: inline-block;\n    position: relative;\n    padding: 10px 32px;\n    border: none;\n    border-radius: 8px;\n    outline: none;\n    background: rgb(97,60,122);\n    font: inherit;\n    text-align: center;\n    white-space: no-wrap;\n    user-select: none;\n    color: #fff;\n    cursor: pointer;\n    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    -webkit-appearance: button;\n"]))),x=t(1),O={Authorization:"Bearer anonymous+1fcac1b5-a3c6-4a62-80c1-62a478186863","Content-Type":"application/json","poq-app-identifier":"ca315772-4803-4b48-ae99-5683133770e6","Poq-Currency-Identifier":"GBP","User-Agent":"com.poq.poqdemoapp-uat/20.0.1 iOS/15.0"};var v=function(){var e=Object(r.useState)("hello"),n=Object(u.a)(e,2),t=(n[0],n[1]),o=Object(r.useState)(),c=Object(u.a)(o,2),i=c[0],a=c[1];Object(r.useEffect)((function(){Object(b.a)().then(a)}),[]),Object(r.useEffect)((function(){d(i)&&i.field.getValue()}),[i]);var d=function(e){return!!e};return d(i)?Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)(f,{children:"Product"}),Object(x.jsx)(j,{children:"Enter a product name below, then click Search to find the right product"}),Object(x.jsx)(g,{placeholder:"Search",type:"text",className:"input"}),Object(x.jsx)(m,{onClick:function(){var e;fetch((e="dr","https://dev.poq.io/clients/demo/search/predictive?keyword=".concat(e)),{method:"GET",headers:O}).then((function(e){return e.json()})).then((function(e){console.log(e),t("elephant")}))},children:"Search"})]}):Object(x.jsx)("div",{className:"App",children:"Loading ..."})},k=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,25)).then((function(n){var t=n.getCLS,o=n.getFID,c=n.getFCP,i=n.getLCP,a=n.getTTFB;t(e),o(e),c(e),i(e),a(e)}))};p.a.render(Object(x.jsx)(d.a.StrictMode,{children:Object(x.jsx)(v,{})}),document.getElementById("root")),k()}},[[24,1,2]]]);
//# sourceMappingURL=main.b216f962.chunk.js.map