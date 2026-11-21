
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const state = {
  properties: [
    {id:1,name:"Greenview Apartments",address:"Plot 18, New Owerri, Imo State",units:12,status:"Occupied",rent:180000,icon:"⌂"},
    {id:2,name:"Palm Court Residence",address:"Ikenegbu Layout, Owerri",units:8,status:"Occupied",rent:250000,icon:"⌂"},
    {id:3,name:"The Meridian Towers",address:"Wetheral Road, Owerri",units:16,status:"Vacant",rent:320000,icon:"▥"},
    {id:4,name:"Oakwood Duplexes",address:"World Bank Housing, Owerri",units:6,status:"Maintenance",rent:400000,icon:"⌂"},
    {id:5,name:"Sunrise Commercial Plaza",address:"Douglas Road, Owerri",units:10,status:"Occupied",rent:210000,icon:"▦"},
    {id:6,name:"Hilltop Gardens",address:"Orji, Owerri",units:9,status:"Occupied",rent:150000,icon:"⌂"}
  ],
  tenants: [
    {id:1,name:"Amara Okafor",email:"amara.okafor@email.com",phone:"0803 123 4567",property:"Greenview Apartments",lease:"30 Jun 2027",status:"Paid"},
    {id:2,name:"David Eze",email:"david.eze@email.com",phone:"0806 234 5678",property:"Palm Court Residence",lease:"15 Jan 2027",status:"Pending"},
    {id:3,name:"Chidinma Obi",email:"chidinma.obi@email.com",phone:"0812 345 6789",property:"Sunrise Commercial Plaza",lease:"01 Sep 2027",status:"Paid"},
    {id:4,name:"Emeka Nwosu",email:"emeka.nwosu@email.com",phone:"0705 456 7890",property:"Greenview Apartments",lease:"20 Mar 2027",status:"Paid"}
  ],
  payments: [
    {ref:"EF-2026-038",tenant:"Amara Okafor",property:"Greenview Apartments",date:"20 Nov 2026",amount:180000,status:"Successful"},
    {ref:"EF-2026-037",tenant:"Chidinma Obi",property:"Sunrise Commercial Plaza",date:"18 Nov 2026",amount:210000,status:"Successful"},
    {ref:"EF-2026-036",tenant:"Emeka Nwosu",property:"Greenview Apartments",date:"16 Nov 2026",amount:180000,status:"Successful"},
    {ref:"EF-2026-035",tenant:"David Eze",property:"Palm Court Residence",date:"14 Nov 2026",amount:250000,status:"Pending"}
  ],
  maintenance: [
    {title:"Leaking kitchen pipe",property:"Greenview Apartments",tenant:"Amara Okafor",priority:"High",status:"In progress",date:"Today"},
    {title:"Faulty security gate",property:"Oakwood Duplexes",tenant:"Estate security",priority:"Medium",status:"Pending",date:"Yesterday"},
    {title:"Generator servicing",property:"Palm Court Residence",tenant:"Facility team",priority:"Low",status:"Completed",date:"18 Nov 2026"},
    {title:"Damaged ceiling panel",property:"The Meridian Towers",tenant:"David Eze",priority:"Medium",status:"Pending",date:"17 Nov 2026"}
  ],
  landlords:[{name:"Mrs. Grace Nwankwo",email:"grace@email.com",phone:"0802 555 0192",properties:3},{name:"Mr. Daniel Okorie",email:"daniel@email.com",phone:"0809 555 0174",properties:2}],
  staff:[{name:"Ifeanyi Maduka",role:"Facility Manager",email:"ifeanyi@estateflow.example",phone:"0805 111 2233"},{name:"Blessing Nnamdi",role:"Accountant",email:"blessing@estateflow.example",phone:"0813 222 3344"},{name:"Kelechi Umeh",role:"Security Supervisor",email:"kelechi@estateflow.example",phone:"0706 333 4455"}]
};

const money=n=>"₦"+Number(n).toLocaleString("en-NG");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function toast(message){const el=$("#toast");if(!el)return;el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2400)}
function pill(s){return `<span class="pill ${String(s).toLowerCase().replace(/\s+/g,"-")}">${esc(s)}</span>`}
function render(){
 const p=location.pathname.split("/").pop().replace(".html","")||"index";
 const page=p==="index"?"overview":p;
 const recent=$("#recentPropertiesBody");
 if(recent) recent.innerHTML=state.properties.slice(0,4).map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.address)}</td><td>${x.units}</td><td>${pill(x.status)}</td><td>${money(x.rent)}</td></tr>`).join("");
 const pg=$("#propertyGrid");
 if(pg) pg.innerHTML=state.properties.map(x=>`<article class="property-card"><div class="property-art">${esc(x.icon)}</div><div class="property-card-body"><h3>${esc(x.name)}</h3><p>${esc(x.address)}</p><div class="property-card-meta"><span>${x.units} units · ${pill(x.status)}</span><b>${money(x.rent)}<small> /mo</small></b></div></div></article>`).join("");
 const tb=$("#tenantTableBody");
 if(tb) tb.innerHTML=state.tenants.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.property)}</td><td>${esc(x.phone)}</td><td>${esc(x.lease)}</td><td>${pill(x.status)}</td></tr>`).join("");
 const pay=$("#paymentTableBody");
 if(pay) pay.innerHTML=state.payments.map(x=>`<tr><td><b>${esc(x.ref)}</b></td><td>${esc(x.tenant)}</td><td>${esc(x.property)}</td><td>${esc(x.date)}</td><td>${money(x.amount)}</td><td>${pill(x.status)}</td></tr>`).join("");
 const mg=$("#maintenanceGrid");
 if(mg) mg.innerHTML=state.maintenance.map(x=>`<article class="request-card"><span class="report-icon">⚒</span><h3>${esc(x.title)}</h3><p>${esc(x.property)}<br>Reported by: ${esc(x.tenant)}</p><div class="request-meta"><span class="request-tag">${esc(x.priority)} priority</span>${pill(x.status)}</div><p>${esc(x.date)}</p></article>`).join("");
 const lg=$("#landlordGrid");
 if(lg) lg.innerHTML=state.landlords.map(x=>`<article class="person-card"><div class="person-avatar">${esc(x.name.split(" ").map(y=>y[0]).slice(0,2).join(""))}</div><h3>${esc(x.name)}</h3><p>${esc(x.email)}<br>${esc(x.phone)}</p><span class="pill">${x.properties} properties</span></article>`).join("");
 const sg=$("#staffGrid");
 if(sg) sg.innerHTML=state.staff.map(x=>`<article class="person-card"><div class="person-avatar">${esc(x.name.split(" ").map(y=>y[0]).slice(0,2).join(""))}</div><h3>${esc(x.name)}</h3><p>${esc(x.role)}<br>${esc(x.email)}<br>${esc(x.phone)}</p><span class="pill">Active staff</span></article>`).join("");
}
$("#menuToggle")?.addEventListener("click",()=>$("#sidebar")?.classList.toggle("open"));
$("#notificationButton")?.addEventListener("click",()=>toast("You’re all caught up!"));
$("#propertySearch")?.addEventListener("input",e=>{$$(".property-card").forEach(c=>c.hidden=!c.textContent.toLowerCase().includes(e.target.value.toLowerCase()))});
$("#tenantSearch")?.addEventListener("input",e=>{[...($("#tenantTableBody")?.querySelectorAll("tr") || [])].forEach(r=>r.hidden=!r.textContent.toLowerCase().includes(e.target.value.toLowerCase()))});
function exportTable(filename,rows){const csv=rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=filename;a.click();URL.revokeObjectURL(a.href);toast("CSV export downloaded.");}
$("#propertyExport")?.addEventListener("click",()=>exportTable("properties.csv",[["Name","Address","Units","Status","Rent"],...state.properties.map(x=>[x.name,x.address,x.units,x.status,x.rent])]));
$("#tenantExport")?.addEventListener("click",()=>exportTable("tenants.csv",[["Name","Email","Phone","Property","Lease","Status"],...state.tenants.map(x=>[x.name,x.email,x.phone,x.property,x.lease,x.status])]));
$("#exportPayments")?.addEventListener("click",()=>exportTable("payments.csv",[["Reference","Tenant","Property","Date","Amount","Status"],...state.payments.map(x=>[x.ref,x.tenant,x.property,x.date,x.amount,x.status])]));
$("#revenueExport")?.addEventListener("click",()=>exportTable("payments.csv",[["Reference","Tenant","Property","Date","Amount","Status"],...state.payments.map(x=>[x.ref,x.tenant,x.property,x.date,x.amount,x.status])]));
$("#exportOverview")?.addEventListener("click",()=>exportTable("estateflow-report.csv",[["Property","Address","Units","Status","Rent"],...state.properties.map(x=>[x.name,x.address,x.units,x.status,x.rent])]));
$("#globalSearch")?.addEventListener("keydown",e=>{if(e.key==="Enter"){const q=e.target.value.toLowerCase();const match=state.properties.some(x=>x.name.toLowerCase().includes(q))?"properties":state.tenants.some(x=>x.name.toLowerCase().includes(q))?"tenants":null;if(match)location.href=match+".html";else toast("No matching record found.");}});
const today=$("#todayLabel");if(today)today.textContent=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}).toUpperCase();
render();
