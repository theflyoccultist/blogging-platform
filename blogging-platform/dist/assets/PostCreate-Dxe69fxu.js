import{k as g,r as a,j as t,B as j,m as y,l as v}from"./index-CrREwKdg.js";import{E as b}from"./Editor-DGvntPUf.js";/* empty css                 */const f="https://www.blogging-platform.rinkakuworks.com/backend",k=()=>{const u=g(),[s,i]=a.useState(""),[l,x]=a.useState(""),[r,d]=a.useState(""),[o,p]=a.useState(""),[c,n]=a.useState(null),h=()=>{i(""),x(""),d(""),p(""),n(null)},m=async()=>{if(!s||!r||!o){n("All fields are required.");return}try{await y();const e=await v.post(`${f}/api/blog`,{title:s,thumbnail:l,content:r,author:o},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});h(),u("/platform"),console.log("Post created successfully:",e.data)}catch(e){console.error("Error creating post",e),n("Failed to create post. Please try again.")}};return t.jsxs("div",{style:{maxWidth:"800px",margin:"50px auto"},children:[t.jsx("h3",{children:"Create New Post"}),c&&t.jsx("div",{style:{color:"red",marginBottom:"10px"},children:c}),t.jsxs("div",{style:{marginBottom:"20px"},children:[t.jsx("label",{children:"Title:"}),t.jsx("br",{}),t.jsx("input",{type:"text",value:s,onChange:e=>i(e.target.value),style:{width:"100%",padding:"10px",fontSize:"18px",marginTop:"5px"}})]}),t.jsxs("div",{style:{marginBottom:"20px"},children:[t.jsx("label",{children:"Thumbnail:"}),t.jsx("br",{}),t.jsx("div",{className:"mb-2 text-muted",children:"Add your image URL here"}),t.jsx("input",{type:"text",value:l,onChange:e=>x(e.target.value),style:{width:"100%",padding:"10px",fontSize:"18px",marginTop:"5px"}})]}),t.jsxs("div",{style:{marginBottom:"20px"},children:[t.jsx("label",{children:"Content:"}),t.jsx(b,{value:r,handleChange:d})]}),t.jsxs("div",{children:[t.jsx("label",{children:"Author:"}),t.jsx("input",{type:"text",value:o,onChange:e=>p(e.target.value),style:{width:"100%",padding:"10px",fontSize:"18px",marginTop:"50px"}})]}),t.jsx(j,{onClick:m,style:{margin:"50px 20px",padding:"10px 20px"},children:"Create Post"})]})};export{k as default};
