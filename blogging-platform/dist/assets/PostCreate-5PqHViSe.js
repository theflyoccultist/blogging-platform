import{k as y,r as s,j as e,B as f,m as v,l as b}from"./index-DfpqE6C5.js";import{a as C,q as w,R as S}from"./quill.snow-CgNlAh49.js";/* empty css                 */const k="https://www.blogging-platform.rinkakuworks.com/backend",P=()=>{const h=y(),a=s.useRef(null),[o,i]=s.useState(""),[d,u]=s.useState(""),[r,x]=s.useState(""),[n,p]=s.useState(""),[c,l]=s.useState(null);s.useEffect(()=>{C()},[]);const m=()=>{i(""),u(""),x(""),p(""),l(null)},g=s.useMemo(()=>w(a),[a]),j=async()=>{if(!o||!r||!n){l("All fields are required.");return}try{await v();const t=await b.post(`${k}/api/blog`,{title:o,thumbnail:d,content:r,author:n},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});m(),h("/platform"),console.log("Post created successfully:",t.data)}catch(t){console.error("Error creating post",t),l("Failed to create post. Please try again.")}};return e.jsxs("div",{style:{maxWidth:"800px",margin:"50px auto"},children:[e.jsx("h3",{children:"Create New Post"}),c&&e.jsx("div",{style:{color:"red",marginBottom:"10px"},children:c}),e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("label",{children:"Title:"}),e.jsx("br",{}),e.jsx("input",{type:"text",value:o,onChange:t=>i(t.target.value),style:{width:"100%",padding:"10px",fontSize:"18px",marginTop:"5px"}})]}),e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("label",{children:"Thumbnail:"}),e.jsx("br",{}),e.jsx("div",{className:"mb-2 text-muted",children:"Add your image URL here"}),e.jsx("input",{type:"text",value:d,onChange:t=>u(t.target.value),style:{width:"100%",padding:"10px",fontSize:"18px",marginTop:"5px"}})]}),e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("label",{children:"Content:"}),e.jsx(S,{ref:a,value:r,onChange:x,style:{height:"300px"},modules:g})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Author:"}),e.jsx("input",{type:"text",value:n,onChange:t=>p(t.target.value),style:{width:"100%",padding:"10px",fontSize:"18px",marginTop:"50px"}})]}),e.jsx(f,{onClick:j,style:{margin:"50px 20px",padding:"10px 20px"},children:"Create Post"})]})};export{P as default};
