(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[395],{8741:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[locale]/contact-us",function(){return t(4673)}])},297:function(e,a,t){"use strict";var s=t(5893);t(7294);var l=t(9200),n=t(2175),r=t(4184),i=t.n(r);let d=e=>{let{field:a,fieldLabel:t,placeholder:r,errors:d,touched:o,required:c}=e;return(0,s.jsxs)(l.cw,{row:!0,children:[(0,s.jsxs)(l.__,{for:a,lg:2,children:[t,c&&(0,s.jsx)("span",{className:"required-asterisk",children:"*"})]}),(0,s.jsxs)(l.JX,{lg:10,children:[(0,s.jsx)(l.BZ,{children:(0,s.jsx)(l.II,{type:"text",name:a,id:a,tag:n.gN,required:!0,className:i()({"is-invalid":o[a]&&d[a]}),placeholder:r||"Type here..."})}),(0,s.jsx)(n.Bc,{name:a,render:e=>(0,s.jsx)("small",{className:"text-danger",children:e})})]})]})};a.Z=d},4673:function(e,a,t){"use strict";t.r(a),t.d(a,{__N_SSG:function(){return g},default:function(){return f}});var s=t(5893),l=t(7294),n=t(9016),r=t(7054),i=t(9200),d=t(2175),o=t(297),c=t(4184),u=t.n(c);let h=e=>{let{fieldName:a,fieldLabel:t,placeholder:l,inputGroupClasses:n,errors:r,touched:o,required:c}=e;return(0,s.jsxs)(i.cw,{row:!0,children:[t&&(0,s.jsxs)(i.__,{for:a,lg:2,children:[t,c&&(0,s.jsx)("span",{className:"required-asterisk",children:"*"})]}),(0,s.jsxs)(i.JX,{lg:10,children:[(0,s.jsx)(i.BZ,{className:n,children:(0,s.jsx)(d.gN,{name:a,children:e=>{let{field:a}=e;return(0,s.jsx)(i.II,{id:a.name,name:a.name,type:"textarea",className:u()({"is-invalid":o[a.name]&&r[a.name]}),placeholder:l,value:a.value||"",onChange:a.onChange})}})}),(0,s.jsx)(d.Bc,{name:a,render:e=>(0,s.jsx)("small",{className:"text-danger",children:e})})]})]})};var _=t(259),m=t.n(_),x=t(4231),p=t(3125);let j=()=>{let[e,a]=(0,l.useState)(!1),{t}=(0,n.$G)("contactUs"),{isLoaded:c}=(0,r.Db)({googleMapsApiKey:"AIzaSyDqmAZBN1UdBwWUf33tX-XB1WDUw8jwL_E"}),{center:u,zoom:_,markerPosition:j}=(0,l.useMemo)(()=>({center:{lat:45.40788320621722,lng:-73.9168146150809},zoom:17,markerPosition:{lat:45.40768,lng:-73.91684}}),[]),g=(e,t)=>{let{resetForm:s}=t;p.Ws.sendContactUsEmail(e).then(()=>{s(),a(!0)})},f=x.Ry().shape({name:x.Z_().min(2,t("validation_too_short")).max(50,t("validation_too_long")).required(t("validation_required")),email:x.Z_().email(t("validation_email_invalid")).required(t("validation_required")),subject:x.Z_().min(2,t("validation_too_short")).max(50,t("validation_too_long")).required(t("validation_required")),body:x.Z_().min(10,t("validation_body_too_short")).max(500,t("validation_body_too_long")).required(t("validation_required"))});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(i.W2,{className:"mt-5",children:[(0,s.jsx)("h1",{className:"mb-4",children:t("page_title")}),(0,s.jsxs)("div",{className:"d-flex flex-column justify-content-center align-items-center mb-4",children:[(0,s.jsx)("h5",{children:t("contact_us_phone_number")}),(0,s.jsx)("h5",{children:t("contact_us_email")}),(0,s.jsx)("h5",{children:t("contact_us_address_1")}),(0,s.jsx)("h5",{children:t("contact_us_address_2")})]}),(0,s.jsxs)(i.X2,{children:[(0,s.jsx)(i.JX,{lg:6,children:(0,s.jsx)(d.J9,{initialValues:{name:"",email:"",subject:"",body:""},validationSchema:f,onSubmit:g,children:e=>{let{errors:a,touched:l,isSubmitting:n,submitForm:r,isValid:c}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d.l0,{children:[(0,s.jsx)(o.Z,{field:"name",fieldLabel:t("name_label"),placeholder:t("name_placeholder"),errors:a,touched:l,required:!0}),(0,s.jsx)(o.Z,{field:"email",fieldLabel:t("email_label"),placeholder:t("email_placeholder"),errors:a,touched:l,required:!0}),(0,s.jsx)(o.Z,{field:"subject",fieldLabel:t("subject_label"),placeholder:t("subject_placeholder"),errors:a,touched:l,required:!0}),(0,s.jsx)(h,{fieldName:"body",fieldLabel:t("body_label"),placeholder:t("body_placeholder"),inputGroupClasses:m().messageTextArea,errors:a,touched:l,required:!0}),(0,s.jsx)("div",{className:"w-100 d-flex justify-content-end",children:(0,s.jsx)(i.zx,{className:"mt-3",color:"primary",disabled:n||!c,onClick:()=>{r()},children:t("send_button")})})]})})}})}),c&&(0,s.jsx)(i.JX,{lg:6,children:(0,s.jsx)(r.b6,{mapContainerStyle:{height:"50vh",width:"100%"},center:u,zoom:_,children:(0,s.jsx)(r.Jx,{position:j,clickable:!1})})})]})]}),(0,s.jsxs)(i.u_,{centered:!0,isOpen:e,toggle:()=>a(e=>!e),size:"lg",children:[(0,s.jsx)(i.xB,{toggle:()=>a(e=>!e),children:t("message_sent_success_title")}),(0,s.jsx)(i.fe,{className:"h4 my-3",children:t("message_sent_success_description")})]})]})};var g=!0,f=j},3125:function(e,a,t){"use strict";t.d(a,{H6:function(){return m},Ws:function(){return p},KH:function(){return d}});var s=t(6509);let l=()=>s.Z.get("/todos").then(e=>e.data),n=e=>s.Z.post("/todos",e).then(e=>e.data),r=(e,a)=>s.Z.put("/todos/".concat(e),a).then(e=>e.data),i=e=>s.Z.delete("todos/".concat(e));var d={index:l,store:n,update:r,deleteTodo:i};let o=()=>s.Z.get("/allowed-skippers").then(e=>e.data),c=(e,a)=>s.Z.get("/allowed-skippers/datatable",{params:{page:e,per_page:a}}).then(e=>e.data),u=e=>s.Z.post("/allowed-skippers",e).then(e=>e.data),h=(e,a)=>s.Z.put("/allowed-skippers/".concat(e),a).then(e=>e.data),_=e=>s.Z.delete("allowed-skippers/".concat(e));var m={index:o,datatable:c,store:u,update:h,deleteTodo:_};let x=e=>s.Z.post("/mail/send-contact-us-email",e).then(e=>e.data);var p={sendContactUsEmail:x}},259:function(e){e.exports={messageTextArea:"Contact-us_messageTextArea__qz0xv"}}},function(e){e.O(0,[255,141,774,888,179],function(){return e(e.s=8741)}),_N_E=e.O()}]);