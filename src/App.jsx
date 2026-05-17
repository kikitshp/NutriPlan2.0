import { useState, useEffect, useRef } from "react";
 
// ─── PLAN BASE ────────────────────────────────────────────────────────────────
const PLAN_BASE = {
  Lunes:     { entrenamiento: "Tren Superior — Pecho, Espalda & Brazos", comidas: [
    { tiempo: "Almuerzo", desc: "Quinoa con atún y verduras — ¾ taza quinoa, 1 lata atún, tomate, pepino, limón", proteinas: 35, carbos: 48, grasas: 8, calorias: 404 },
    { tiempo: "Colación", desc: "2 huevos duros + fruta de temporada", proteinas: 14, carbos: 20, grasas: 10, calorias: 226 },
    { tiempo: "Cena",     desc: "Omelette 3 huevos con queso gouda y espinaca + 1 tostada", proteinas: 28, carbos: 14, grasas: 20, calorias: 348 },
  ]},
  Martes:    { entrenamiento: "Tren Inferior — Glúteos, Cuádriceps & Femoral", comidas: [
    { tiempo: "Almuerzo", desc: "Arroz con pulpa de pierna + ensalada lechuga tomate cebolla", proteinas: 38, carbos: 52, grasas: 10, calorias: 458 },
    { tiempo: "Colación", desc: "1 yogurt natural + nueces o maní", proteinas: 10, carbos: 12, grasas: 12, calorias: 192 },
    { tiempo: "Cena",     desc: "Sopa de verduras con pollo desmenuzado + pan", proteinas: 26, carbos: 30, grasas: 7, calorias: 291 },
  ]},
  Miércoles: { entrenamiento: "Descanso activo — Estiramiento 15 min", comidas: [
    { tiempo: "Almuerzo", desc: "Tallarín con salsa italiana + trucha al horno + queso gouda", proteinas: 36, carbos: 58, grasas: 12, calorias: 484 },
    { tiempo: "Colación", desc: "2 huevos revueltos con tomate", proteinas: 14, carbos: 4, grasas: 10, calorias: 162 },
    { tiempo: "Cena",     desc: "Ensalada grande: lechuga, tomate, atún, huevo duro, queso gouda", proteinas: 38, carbos: 8, grasas: 16, calorias: 328 },
  ]},
  Jueves:    { entrenamiento: "Full Body — Fuerza completa + Core", comidas: [
    { tiempo: "Almuerzo", desc: "Quinoa + molida salteada con cebolla, tomate y ajo", proteinas: 36, carbos: 44, grasas: 14, calorias: 446 },
    { tiempo: "Colación", desc: "Fruta + 2 huevos duros", proteinas: 14, carbos: 20, grasas: 10, calorias: 226 },
    { tiempo: "Cena",     desc: "3 huevos a la plancha + jamón pierna + ensalada espinaca", proteinas: 32, carbos: 6, grasas: 16, calorias: 296 },
  ]},
  Viernes:   { entrenamiento: "Glúteos & Hombros — Énfasis glúteos + definición", comidas: [
    { tiempo: "Almuerzo", desc: "Arroz + pechuga de pollo a la plancha + verduras de feria al vapor", proteinas: 40, carbos: 50, grasas: 8, calorias: 436 },
    { tiempo: "Colación", desc: "Gelatina diet + 2 huevos duros", proteinas: 14, carbos: 4, grasas: 10, calorias: 162 },
    { tiempo: "Cena",     desc: "Sopa de campo con quinoa + huevo batido al final", proteinas: 22, carbos: 36, grasas: 8, calorias: 308 },
  ]},
  Sábado:    { entrenamiento: "Descanso — Día flexible con familia", comidas: [
    { tiempo: "Almuerzo", desc: "Flexible con la familia — prioriza proteína primero, luego el plato familiar", proteinas: 28, carbos: 45, grasas: 14, calorias: 418 },
    { tiempo: "Antojo",   desc: "Si quieres algo dulce con los niños: hazlo sin culpa", proteinas: 2, carbos: 25, grasas: 8, calorias: 176 },
    { tiempo: "Cena",     desc: "Huevos, atún o queso + algo de feria. Volver al plato proteico.", proteinas: 26, carbos: 8, grasas: 14, calorias: 258 },
  ]},
  Domingo:   { entrenamiento: "Descanso total — Tiempo en familia", comidas: [
    { tiempo: "Almuerzo", desc: "Almuerzo familiar — come con conciencia: proteína + verdura primero", proteinas: 28, carbos: 40, grasas: 12, calorias: 376 },
    { tiempo: "Tarde",    desc: "Leche descremada con café o té + fruta", proteinas: 8, carbos: 18, grasas: 2, calorias: 122 },
    { tiempo: "Cena",     desc: "Quinoa con huevo revuelto y queso gouda", proteinas: 24, carbos: 38, grasas: 12, calorias: 356 },
  ]},
};
 
const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const DIA_COLORS = {
  Lunes:     { bg:"#fdf2ec", accent:"#C97B5A", light:"#fae6d8" },
  Martes:    { bg:"#edf5ee", accent:"#7A9E7E", light:"#d8edd9" },
  Miércoles: { bg:"#fdf8ec", accent:"#D4A847", light:"#faefd4" },
  Jueves:    { bg:"#fdf2ec", accent:"#C97B5A", light:"#fae6d8" },
  Viernes:   { bg:"#eff4f8", accent:"#8AAEC5", light:"#d8eaf5" },
  Sábado:    { bg:"#fdf0f1", accent:"#C06870", light:"#fad8da" },
  Domingo:   { bg:"#edf5ee", accent:"#7A9E7E", light:"#d8edd9" },
};
 
const SYSTEM_PROMPT = `Eres una nutrióloga y personal trainer experta que asiste a una usuaria específica.
 
PERFIL:
- Mujer, 40 años, 3 hijos, 1 adulta mayor en casa
- Meta: bajar 5 kg y construir músculo (glúteos y brazos)
- Ayuno hasta el almuerzo (16/8), creatina 5g/día, sin trotar
- Ingredientes habituales: huevos, arroz, tallarín, pan, pollo, carne molida, pulpa de pierna, trucha, atún, leche descremada, queso gouda, jamón, yogurt, frutas, quinoa
 
OBJETIVO MACROS DIARIO: Proteínas 100-120g, Carbos 100-140g, Grasas 40-55g, Calorías 1400-1600 kcal
 
TU ROL:
- Cuando la usuaria diga que cambió algo, calcula macros y actualiza
- Si comió algo fuera del plan, no juzgues, solo calcula
- SIEMPRE que des modificación de comida, incluye este formato exacto al final:
  [MACROS: proteinas=XX, carbos=XX, grasas=XX, calorias=XX]
- Si es solo consulta sin cambio de alimento, no incluyas [MACROS]
- Responde en español, breve, cálido y práctico.`;
 
const SCAN_PROMPT = `Eres una nutrióloga experta en análisis visual de alimentos. Analiza esta imagen de comida y estima los macronutrientes.
 
INSTRUCCIONES:
1. Identifica todos los alimentos visibles en el plato
2. Estima las porciones visualmente (tamaño del plato como referencia)
3. Calcula macros totales del plato completo
4. Sé realista con las porciones — no subestimes ni sobreestimes
5. Considera métodos de cocción visibles (frito, hervido, a la plancha)
 
RESPONDE EXACTAMENTE en este formato JSON, sin texto adicional:
{
  "alimentos": ["alimento 1", "alimento 2"],
  "descripcion": "Descripción breve del plato en 1 oración",
  "porcion": "Descripción de la porción estimada",
  "proteinas": 00,
  "carbos": 00,
  "grasas": 00,
  "calorias": 000,
  "confianza": "alta|media|baja",
  "nota": "Observación breve sobre la estimación"
}`;
 
// ─── UTILS ────────────────────────────────────────────────────────────────────
function getTodayName() {
  return ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][new Date().getDay()];
}
function parseMacros(text) {
  const m = text.match(/\[MACROS:\s*proteinas=(\d+),\s*carbos=(\d+),\s*grasas=(\d+),\s*calorias=(\d+)\]/i);
  return m ? { proteinas:+m[1], carbos:+m[2], grasas:+m[3], calorias:+m[4] } : null;
}
function cleanReply(text) { return text.replace(/\[MACROS:.*?\]/gi,"").trim(); }
 
function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
 
// ─── COMPONENTES ─────────────────────────────────────────────────────────────
function MacroBar({ label, value, max, color, unit="g" }) {
  const pct = Math.min(100, Math.round((value/max)*100));
  const over = value > max;
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:600, marginBottom:5, color:"#5C4A3A" }}>
        <span style={{ letterSpacing:1, textTransform:"uppercase" }}>{label}</span>
        <span style={{ color: over ? "#e05050" : color }}>
          {value}{unit} <span style={{ color:"#ccc", fontWeight:400 }}>/ {max}{unit}</span>
          {over && <span style={{ color:"#e05050", fontSize:9, marginLeft:4 }}>↑</span>}
        </span>
      </div>
      <div style={{ height:8, background:"#f0ebe4", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background: over ? "#e05050" : color, borderRadius:99, transition:"width 0.6s ease" }} />
      </div>
    </div>
  );
}
 
// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const today = getTodayName();
  const [selectedDay, setSelectedDay] = useState(today);
  const [tab, setTab] = useState("plan");
  const [messages, setMessages] = useState([
    { role:"assistant", content:"¡Hola! 👋 Soy tu nutrióloga IA. Cuéntame qué cambió hoy o usa la pestaña 📷 para escanear tu plato y calcular los macros al instante." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("anthropic_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [modificaciones, setModificaciones] = useState([]);
 
  // Estado escáner
  const [scanImage, setScanImage] = useState(null);      // base64
  const [scanPreview, setScanPreview] = useState(null);  // object URL
  const [scanResult, setScanResult] = useState(null);    // parsed JSON
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [scanAdded, setScanAdded] = useState(false);
  const fileInputRef = useRef(null);
 
  const [dailyMacros, setDailyMacros] = useState(() => {
    const plan = PLAN_BASE[today];
    return plan.comidas.reduce((a,c) => ({
      proteinas: a.proteinas+c.proteinas, carbos: a.carbos+c.carbos,
      grasas: a.grasas+c.grasas, calorias: a.calorias+c.calorias
    }), { proteinas:0, carbos:0, grasas:0, calorias:0 });
  });
 
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);
 
  const plan = PLAN_BASE[selectedDay];
  const color = DIA_COLORS[selectedDay];
  const planMacros = plan.comidas.reduce((a,c) => ({
    proteinas:a.proteinas+c.proteinas, carbos:a.carbos+c.carbos,
    grasas:a.grasas+c.grasas, calorias:a.calorias+c.calorias
  }), {proteinas:0,carbos:0,grasas:0,calorias:0});
  const macroTarget = { proteinas:110, carbos:120, grasas:48, calorias:1500 };
 
  function addMacrosToDay(macros) {
    setDailyMacros(prev => ({
      proteinas: prev.proteinas + macros.proteinas,
      carbos:    prev.carbos    + macros.carbos,
      grasas:    prev.grasas    + macros.grasas,
      calorias:  prev.calorias  + macros.calorias,
    }));
  }
 
  function saveApiKey(key) {
    localStorage.setItem("anthropic_key", key);
    setApiKey(key);
    setShowKeyInput(false);
  }
 
  // ── CHAT ──
  async function sendMessage() {
    if (!input.trim() || loading) return;
    if (!apiKey) { setShowKeyInput(true); return; }
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role:"user", content:userMsg }]);
    setLoading(true);
    try {
      const ctx = `Contexto: día ${selectedDay}, macros acumulados hoy: P${dailyMacros.proteinas}g C${dailyMacros.carbos}g G${dailyMacros.grasas}g ${dailyMacros.calorias}kcal\n\nMensaje: ${userMsg}`;
      const history = messages.map(m => ({ role:m.role, content:m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:SYSTEM_PROMPT, messages:[...history,{role:"user",content:ctx}] })
      });
      if (!res.ok) throw new Error((await res.json()).error?.message || "Error API");
      const data = await res.json();
      const reply = data.content?.map(b=>b.text||"").join("") || "";
      const macros = parseMacros(reply);
      if (macros) {
        setModificaciones(prev=>[...prev,{dia:selectedDay,descripcion:userMsg,...macros}]);
        if (selectedDay===today) addMacrosToDay(macros);
      }
      setMessages(prev=>[...prev,{role:"assistant",content:cleanReply(reply),macros}]);
    } catch(e) {
      setMessages(prev=>[...prev,{role:"assistant",content:`Error: ${e.message}`}]);
    }
    setLoading(false);
  }
  function handleKey(e) { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();} }
 
  // ── SCAN ──
  async function handleImageSelect(file) {
    if (!file) return;
    setScanResult(null); setScanError(null); setScanAdded(false);
    setScanPreview(URL.createObjectURL(file));
    const b64 = await fileToBase64(file);
    setScanImage(b64);
  }
 
  async function analyzeScan() {
    if (!scanImage || scanLoading) return;
    if (!apiKey) { setShowKeyInput(true); return; }
    setScanLoading(true); setScanError(null); setScanAdded(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:600,
          messages:[{ role:"user", content:[
            { type:"image", source:{ type:"base64", media_type:"image/jpeg", data:scanImage } },
            { type:"text",  text: SCAN_PROMPT }
          ]}]
        })
      });
      if (!res.ok) throw new Error((await res.json()).error?.message || "Error API");
      const data = await res.json();
      const raw = data.content?.map(b=>b.text||"").join("").trim() || "";
      const clean = raw.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setScanResult(parsed);
    } catch(e) {
      setScanError(e.message.includes("JSON") ? "No pude leer la imagen. Intenta con una foto más clara del plato." : e.message);
    }
    setScanLoading(false);
  }
 
  function confirmAddScan() {
    if (!scanResult) return;
    const macros = { proteinas:scanResult.proteinas, carbos:scanResult.carbos, grasas:scanResult.grasas, calorias:scanResult.calorias };
    addMacrosToDay(macros);
    setModificaciones(prev=>[...prev,{ dia:today, descripcion:`📷 ${scanResult.descripcion}`, ...macros }]);
    setScanAdded(true);
  }
 
  function resetScan() {
    setScanImage(null); setScanPreview(null); setScanResult(null); setScanError(null); setScanAdded(false);
  }
 
  const confianzaColor = { alta:"#7A9E7E", media:"#D4A847", baja:"#C97B5A" };
 
  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", background:"#FAF6F0", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#1C1410", maxWidth:480, margin:"0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#c4a88a;border-radius:99px;}
        textarea{resize:none;outline:none;border:none;background:transparent;font-family:inherit;font-size:14px;color:#1C1410;width:100%;}
        button{cursor:pointer;border:none;font-family:inherit;}
        input{font-family:inherit;}
        .fade-in{animation:fadeUp 0.35s ease both;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .tab-btn{padding:7px 13px;border-radius:99px;font-size:12px;font-weight:600;letter-spacing:0.5px;transition:all 0.2s;}
        .day-pill{padding:6px 12px;border-radius:99px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.18s;white-space:nowrap;border:2px solid transparent;}
        .send-btn{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#1C1410;color:#FAF6F0;font-size:17px;transition:transform 0.15s;flex-shrink:0;}
        .send-btn:hover{transform:scale(1.08);}
        .send-btn:disabled{background:#ccc;cursor:default;transform:none;}
        .macro-pill{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:99px;font-size:11px;font-weight:600;}
        .msg-user{background:#1C1410;color:#FAF6F0;border-bottom-right-radius:4px;}
        .msg-asst{background:white;color:#1C1410;border-bottom-left-radius:4px;box-shadow:0 1px 8px rgba(0,0,0,0.06);}
        .chip{padding:6px 12px;background:white;border:1px solid #e8ddd4;border-radius:99px;font-size:11px;color:#5C4A3A;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.04);cursor:pointer;}
        .chip:hover{background:#fdf2ec;}
        .upload-zone{border:2px dashed #e8ddd4;border-radius:18px;padding:36px 20px;text-align:center;cursor:pointer;transition:all 0.2s;background:white;}
        .upload-zone:hover{border-color:#C97B5A;background:#fdf2ec;}
        .btn-primary{background:#1C1410;color:#FAF6F0;border-radius:12px;padding:13px 20px;font-size:14px;font-weight:600;width:100%;transition:opacity 0.2s;}
        .btn-primary:hover{opacity:0.85;}
        .btn-primary:disabled{background:#ccc;cursor:default;}
        .btn-ghost{background:transparent;color:#C97B5A;border:1.5px solid #C97B5A;border-radius:12px;padding:11px 20px;font-size:13px;font-weight:600;width:100%;transition:all 0.2s;}
        .btn-ghost:hover{background:#fdf2ec;}
        .btn-green{background:#7A9E7E;color:white;border-radius:12px;padding:13px 20px;font-size:14px;font-weight:600;width:100%;transition:opacity 0.2s;}
        .btn-green:hover{opacity:0.88;}
        .spinner{width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;margin-right:8px;vertical-align:middle;}
      `}</style>
 
      {/* ── HEADER ── */}
      <div style={{ background:"#1C1410", color:"#FAF6F0", padding:`calc(env(safe-area-inset-top,0px) + 18px) 18px 0` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:13 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"#C97B5A", marginBottom:2 }}>Plan personalizado</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:21, fontWeight:900, lineHeight:1 }}>
              NutriPlan <span style={{ fontStyle:"italic", color:"#C97B5A" }}>IA</span>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:8, color:"#5a4a38", letterSpacing:1 }}>HOY</div>
              <div style={{ fontWeight:700, fontSize:13, color:DIA_COLORS[today].accent }}>{today}</div>
            </div>
            <button onClick={()=>setShowKeyInput(v=>!v)}
              style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.08)", color:apiKey?"#7A9E7E":"#C97B5A", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>
              🔑
            </button>
          </div>
        </div>
 
        {showKeyInput && (
          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:11, padding:"11px 13px", marginBottom:12 }} className="fade-in">
            <div style={{ fontSize:9, color:"#a89880", marginBottom:7, letterSpacing:1 }}>ANTHROPIC API KEY</div>
            <div style={{ display:"flex", gap:7 }}>
              <input type="password" placeholder="sk-ant-..." defaultValue={apiKey} id="apikey-input"
                style={{ flex:1, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:7, padding:"7px 10px", color:"#FAF6F0", fontSize:12 }} />
              <button onClick={()=>{ const v=document.getElementById("apikey-input").value.trim(); if(v) saveApiKey(v); }}
                style={{ background:"#C97B5A", color:"white", borderRadius:7, padding:"7px 12px", fontSize:12, fontWeight:600 }}>
                Guardar
              </button>
            </div>
            <div style={{ fontSize:9, color:"#5a4a38", marginTop:6 }}>console.anthropic.com → API Keys</div>
          </div>
        )}
 
        {/* TABS — ahora con 📷 */}
        <div style={{ display:"flex", gap:5, paddingBottom:13, overflowX:"auto" }}>
          {[["plan","📋 Plan"],["macros","📊 Macros"],["scan","📷 Escanear"],["chat","💬 Chat"]].map(([id,label]) => (
            <button key={id} className="tab-btn" onClick={()=>setTab(id)}
              style={{ background:tab===id?"#FAF6F0":"rgba(255,255,255,0.07)", color:tab===id?"#1C1410":"#a89880", flexShrink:0 }}>
              {label}
            </button>
          ))}
        </div>
      </div>
 
      {/* ── DAY SELECTOR ── */}
      {(tab==="plan"||tab==="macros") && (
        <div style={{ padding:"11px 13px 3px", overflowX:"auto" }}>
          <div style={{ display:"flex", gap:6, minWidth:"max-content" }}>
            {DIAS.map(d => {
              const col=DIA_COLORS[d]; const isSel=selectedDay===d; const isToday=d===today;
              return (
                <button key={d} className="day-pill" onClick={()=>setSelectedDay(d)}
                  style={{ background:isSel?col.accent:col.bg, color:isSel?"white":col.accent,
                    borderColor:isToday?col.accent:"transparent", boxShadow:isToday&&!isSel?`0 0 0 2px ${col.accent}55`:"none" }}>
                  {d.slice(0,3)}{isToday?" ★":""}
                </button>
              );
            })}
          </div>
        </div>
      )}
 
      {/* ══ TAB: PLAN ══ */}
      {tab==="plan" && (
        <div style={{ padding:"13px 13px 100px" }} className="fade-in">
          <div style={{ background:color.light, border:`1px solid ${color.accent}44`, borderRadius:11, padding:"9px 13px", marginBottom:13, display:"flex", alignItems:"center", gap:9 }}>
            <span style={{ fontSize:18 }}>💪</span>
            <div>
              <div style={{ fontSize:8, letterSpacing:1.5, textTransform:"uppercase", color:color.accent, fontWeight:700 }}>Entrenamiento</div>
              <div style={{ fontSize:12, color:"#5C4A3A", marginTop:1 }}>{plan.entrenamiento}</div>
            </div>
          </div>
 
          <div style={{ background:"white", borderRadius:15, padding:"3px 17px 7px", boxShadow:"0 2px 14px rgba(0,0,0,0.05)", marginBottom:13 }}>
            {plan.comidas.map((c,i) => (
              <div key={i} style={{ padding:"11px 0", borderBottom:i<plan.comidas.length-1?"1px dashed #e8e0d8":"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", gap:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:8, letterSpacing:2, textTransform:"uppercase", color:color.accent, fontWeight:700, marginBottom:2 }}>{c.tiempo}</div>
                    <div style={{ fontSize:12.5, color:"#5C4A3A", lineHeight:1.5 }}>{c.desc}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:15, fontWeight:800 }}>{c.calorias}</div>
                    <div style={{ fontSize:8, color:"#bbb" }}>KCAL</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:5, marginTop:6, flexWrap:"wrap" }}>
                  <span className="macro-pill" style={{ background:"#fdf2ec", color:"#C97B5A" }}>🥩 {c.proteinas}g</span>
                  <span className="macro-pill" style={{ background:"#fdf8ec", color:"#b8942a" }}>🌾 {c.carbos}g</span>
                  <span className="macro-pill" style={{ background:"#edf5ee", color:"#7A9E7E" }}>🫒 {c.grasas}g</span>
                </div>
              </div>
            ))}
          </div>
 
          <div style={{ background:`linear-gradient(135deg,${color.bg},${color.light})`, border:`1px solid ${color.accent}33`, borderRadius:13, padding:"13px 15px", marginBottom:13 }}>
            <div style={{ fontSize:8, letterSpacing:2, textTransform:"uppercase", color:color.accent, fontWeight:700, marginBottom:9 }}>Total — {selectedDay}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:5 }}>
              {[["🥩","Prot.",planMacros.proteinas,"g","#C97B5A"],["🌾","Carbos",planMacros.carbos,"g","#D4A847"],["🫒","Grasas",planMacros.grasas,"g","#7A9E7E"],["🔥","Kcal",planMacros.calorias,"","#8AAEC5"]].map(([ico,lbl,val,unit,clr])=>(
                <div key={lbl} style={{ textAlign:"center", background:"rgba(255,255,255,0.6)", borderRadius:9, padding:"9px 3px" }}>
                  <div style={{ fontSize:15 }}>{ico}</div>
                  <div style={{ fontSize:14, fontWeight:800, color:clr }}>{val}</div>
                  <div style={{ fontSize:7, color:"#bbb" }}>{unit||"kcal"}</div>
                  <div style={{ fontSize:7, color:"#bbb" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
 
          {modificaciones.filter(m=>m.dia===selectedDay).length>0 && (
            <div>
              <div style={{ fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"#5C4A3A", fontWeight:700, marginBottom:7 }}>✏️ Extras registrados</div>
              {modificaciones.filter(m=>m.dia===selectedDay).map((mod,i)=>(
                <div key={i} style={{ background:"white", borderRadius:9, padding:"9px 11px", marginBottom:6, borderLeft:`3px solid ${color.accent}`, boxShadow:"0 1px 5px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize:11.5, color:"#5C4A3A", marginBottom:4 }}>{mod.descripcion}</div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    <span className="macro-pill" style={{ background:"#fdf2ec", color:"#C97B5A" }}>+{mod.proteinas}g prot</span>
                    <span className="macro-pill" style={{ background:"#fdf8ec", color:"#b8942a" }}>+{mod.carbos}g carb</span>
                    <span className="macro-pill" style={{ background:"#fdf5e8", color:"#C97B5A" }}>+{mod.calorias} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
 
      {/* ══ TAB: MACROS ══ */}
      {tab==="macros" && (
        <div style={{ padding:"17px 13px 100px" }} className="fade-in">
          <div style={{ background:"white", borderRadius:15, padding:"19px 17px", boxShadow:"0 2px 14px rgba(0,0,0,0.05)", marginBottom:13 }}>
            <div style={{ fontSize:8, letterSpacing:2, textTransform:"uppercase", color:DIA_COLORS[today].accent, fontWeight:700, marginBottom:3 }}>Macros de hoy — {today}</div>
            <div style={{ fontSize:10, color:"#ccc", marginBottom:15 }}>Plan base + extras escaneados o del chat</div>
            <MacroBar label="Proteínas"     value={dailyMacros.proteinas} max={macroTarget.proteinas} color="#C97B5A" />
            <MacroBar label="Carbohidratos" value={dailyMacros.carbos}    max={macroTarget.carbos}    color="#D4A847" />
            <MacroBar label="Grasas"        value={dailyMacros.grasas}    max={macroTarget.grasas}    color="#7A9E7E" />
            <MacroBar label="Calorías"      value={dailyMacros.calorias}  max={macroTarget.calorias}  color="#8AAEC5" unit=" kcal" />
          </div>
 
          <div style={{ background:"#1C1410", borderRadius:15, padding:"17px", color:"#FAF6F0", marginBottom:13 }}>
            <div style={{ fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"#C97B5A", fontWeight:700, marginBottom:11 }}>Tu objetivo diario</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              {[["🥩","Proteínas","100–120g","Construir músculo"],["🌾","Carbos","100–140g","Energía"],["🫒","Grasas","40–55g","Hormonas"],["🔥","Calorías","1400–1600","Déficit ~300 kcal"]].map(([ico,lbl,val,tip])=>(
                <div key={lbl} style={{ background:"rgba(255,255,255,0.05)", borderRadius:9, padding:"11px 9px" }}>
                  <div style={{ fontSize:17 }}>{ico}</div>
                  <div style={{ fontSize:14, fontWeight:800, marginTop:3 }}>{val}</div>
                  <div style={{ fontSize:8, color:"#5a4a38", marginTop:2 }}>{lbl}</div>
                  <div style={{ fontSize:8, color:"#5a4a38", marginTop:3, lineHeight:1.4 }}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
 
          <div style={{ background:"linear-gradient(135deg,#fdf2ec,#fae8d5)", border:"1px solid #C97B5A44", borderRadius:11, padding:"13px 15px" }}>
            <div style={{ fontSize:12.5, fontWeight:600, color:"#C97B5A", marginBottom:4 }}>⚡ Creatina hoy</div>
            <div style={{ fontSize:12, color:"#5C4A3A", lineHeight:1.6 }}>5g en un vaso de agua, cualquier hora del día. Aunque no entrenes, tómala igual.</div>
          </div>
        </div>
      )}
 
      {/* ══ TAB: SCAN ══ */}
      {tab==="scan" && (
        <div style={{ padding:"16px 13px 100px" }} className="fade-in">
          <div style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#5C4A3A", fontWeight:700, marginBottom:10 }}>
            📷 ESCANEAR PLATO
          </div>
          <p style={{ fontSize:13, color:"#7a6a5a", lineHeight:1.6, marginBottom:16 }}>
            Saca una foto a tu plato o sube una imagen y la IA calculará los macros automáticamente para agregarlos a tu día.
          </p>
 
          {/* Zona de upload */}
          {!scanPreview ? (
            <div>
              {/*
                UN solo input sin capture="environment":
                - Android: muestra selector con "Cámara" y "Galería" nativo
                - iPhone: muestra menú con "Tomar foto", "Biblioteca de fotos", "Archivos"
                - No requiere ningún permiso explícito en la app, el OS lo maneja solo
              */}
              <input ref={fileInputRef} type="file" accept="image/*"
                style={{ display:"none" }}
                onChange={e=>e.target.files[0]&&handleImageSelect(e.target.files[0])} />
 
              <button className="btn-primary" style={{ marginBottom:10 }} onClick={()=>{ fileInputRef.current.value=""; fileInputRef.current.click(); }}>
                📷 Cámara o galería
              </button>
 
              <div className="upload-zone" style={{ marginTop:16 }} onClick={()=>fileInputRef.current.click()}>
                <div style={{ fontSize:36, marginBottom:10 }}>🍽</div>
                <div style={{ fontSize:13, fontWeight:600, color:"#5C4A3A", marginBottom:5 }}>O arrastra una foto aquí</div>
                <div style={{ fontSize:11, color:"#bbb" }}>JPEG, PNG, HEIC — máx. 5 MB</div>
              </div>
            </div>
          ) : (
            <div>
              {/* Preview imagen */}
              <div style={{ borderRadius:16, overflow:"hidden", marginBottom:14, position:"relative" }}>
                <img src={scanPreview} alt="Plato a analizar"
                  style={{ width:"100%", maxHeight:260, objectFit:"cover", display:"block" }} />
                {!scanResult && !scanLoading && (
                  <button onClick={resetScan}
                    style={{ position:"absolute", top:10, right:10, width:30, height:30, borderRadius:"50%", background:"rgba(0,0,0,0.5)", color:"white", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    ✕
                  </button>
                )}
              </div>
 
              {/* Botón analizar */}
              {!scanResult && !scanLoading && (
                <button className="btn-primary" onClick={analyzeScan}>
                  🔍 Analizar plato y calcular macros
                </button>
              )}
 
              {/* Loading */}
              {scanLoading && (
                <div style={{ background:"white", borderRadius:14, padding:"20px", textAlign:"center", boxShadow:"0 2px 14px rgba(0,0,0,0.06)" }}>
                  <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:12 }}>
                    {[0,1,2].map(j=>(
                      <div key={j} style={{ width:8, height:8, borderRadius:"50%", background:"#C97B5A", animation:`bounce 0.9s ${j*0.15}s infinite` }} />
                    ))}
                  </div>
                  <div style={{ fontSize:13, color:"#7a6a5a" }}>Analizando tu plato...</div>
                  <div style={{ fontSize:11, color:"#bbb", marginTop:4 }}>Identificando alimentos y calculando macros</div>
                </div>
              )}
 
              {/* Error */}
              {scanError && (
                <div style={{ background:"#fdf0f0", border:"1px solid #e0a0a0", borderRadius:12, padding:"14px 16px", marginBottom:12 }}>
                  <div style={{ fontSize:13, color:"#c05050" }}>⚠️ {scanError}</div>
                  <button onClick={resetScan} style={{ marginTop:10, fontSize:12, color:"#C97B5A", background:"none", textDecoration:"underline" }}>
                    Intentar con otra foto
                  </button>
                </div>
              )}
 
              {/* Resultado */}
              {scanResult && (
                <div className="fade-in">
                  {/* Card resultado */}
                  <div style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", marginBottom:12 }}>
                    <div style={{ background:"#1C1410", padding:"13px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#C97B5A", marginBottom:2 }}>Lo que detecté</div>
                        <div style={{ fontSize:14, fontWeight:700, color:"white" }}>{scanResult.descripcion}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:8, color:"#5a4a38", marginBottom:2 }}>CONFIANZA</div>
                        <div style={{ fontSize:11, fontWeight:700, color:confianzaColor[scanResult.confianza]||"#C97B5A", textTransform:"uppercase" }}>
                          {scanResult.confianza}
                        </div>
                      </div>
                    </div>
 
                    <div style={{ padding:"14px 16px" }}>
                      {/* Alimentos identificados */}
                      <div style={{ marginBottom:12 }}>
                        <div style={{ fontSize:9, letterSpacing:1.5, textTransform:"uppercase", color:"#bbb", fontWeight:600, marginBottom:6 }}>Alimentos identificados</div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                          {(scanResult.alimentos||[]).map((a,i)=>(
                            <span key={i} style={{ background:"#f5f0ea", color:"#5C4A3A", padding:"3px 10px", borderRadius:99, fontSize:11.5 }}>{a}</span>
                          ))}
                        </div>
                      </div>
 
                      {/* Macros */}
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:12 }}>
                        {[["🥩","Proteínas",scanResult.proteinas,"g","#C97B5A"],["🌾","Carbos",scanResult.carbos,"g","#D4A847"],["🫒","Grasas",scanResult.grasas,"g","#7A9E7E"],["🔥","Calorías",scanResult.calorias,"","#8AAEC5"]].map(([ico,lbl,val,unit,clr])=>(
                          <div key={lbl} style={{ textAlign:"center", background:"#f9f5f0", borderRadius:10, padding:"10px 4px" }}>
                            <div style={{ fontSize:16 }}>{ico}</div>
                            <div style={{ fontSize:16, fontWeight:800, color:clr }}>{val}</div>
                            <div style={{ fontSize:7, color:"#bbb" }}>{unit||"kcal"}</div>
                            <div style={{ fontSize:7, color:"#bbb" }}>{lbl}</div>
                          </div>
                        ))}
                      </div>
 
                      {/* Porción y nota */}
                      <div style={{ background:"#f9f5f0", borderRadius:10, padding:"10px 12px", marginBottom:4 }}>
                        <div style={{ fontSize:11, color:"#7a6a5a", lineHeight:1.5 }}>
                          <span style={{ fontWeight:600 }}>Porción: </span>{scanResult.porcion}
                        </div>
                        {scanResult.nota && (
                          <div style={{ fontSize:10.5, color:"#bbb", marginTop:4, lineHeight:1.5 }}>💡 {scanResult.nota}</div>
                        )}
                      </div>
                    </div>
                  </div>
 
                  {/* Botones acción */}
                  {!scanAdded ? (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      <button className="btn-green" onClick={confirmAddScan}>
                        ✅ Agregar a mis macros de hoy
                      </button>
                      <button className="btn-ghost" onClick={resetScan}>
                        📷 Escanear otro plato
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ background:"linear-gradient(135deg,#edf5ee,#d8edd9)", border:"1px solid #7A9E7E44", borderRadius:13, padding:"16px", textAlign:"center", marginBottom:10 }}>
                        <div style={{ fontSize:28, marginBottom:6 }}>✅</div>
                        <div style={{ fontSize:14, fontWeight:700, color:"#4a7a50" }}>¡Macros agregados!</div>
                        <div style={{ fontSize:12, color:"#7a9a7a", marginTop:4 }}>Ve a 📊 Macros para ver tu progreso del día</div>
                      </div>
                      <button className="btn-ghost" onClick={resetScan}>
                        📷 Escanear otro plato
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
 
      {/* ══ TAB: CHAT ══ */}
      {tab==="chat" && (
        <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 108px)" }} className="fade-in">
          <div style={{ padding:"8px 13px 3px", overflowX:"auto", flexShrink:0 }}>
            <div style={{ display:"flex", gap:6, minWidth:"max-content" }}>
              {["No tenía atún, usé huevo","¿Puedo comer empanada hoy?","Calorías del dulce de membrillo","Cambia la cena de hoy","Comí pizza con los niños"].map(s=>(
                <button key={s} className="chip" onClick={()=>setInput(s)}>{s}</button>
              ))}
            </div>
          </div>
 
          <div style={{ flex:1, overflowY:"auto", padding:"10px 13px", display:"flex", flexDirection:"column", gap:9 }}>
            {messages.map((m,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
                {m.role==="assistant" && (
                  <div style={{ width:27,height:27,borderRadius:"50%",background:"#1C1410",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,marginRight:6,flexShrink:0,marginTop:2 }}>🌿</div>
                )}
                <div className={m.role==="user"?"msg-user":"msg-asst"}
                  style={{ maxWidth:"80%",padding:"10px 13px",borderRadius:15,fontSize:13.5,lineHeight:1.6,
                    ...(m.role==="user"?{borderBottomRightRadius:4}:{borderBottomLeftRadius:4}) }}>
                  {m.content.split("\n").map((line,li,arr)=>(
                    <span key={li}>{line}{li<arr.length-1&&<br/>}</span>
                  ))}
                  {m.macros && (
                    <div style={{ display:"flex",gap:4,marginTop:8,flexWrap:"wrap" }}>
                      <span className="macro-pill" style={{ background:"#fdf2ec",color:"#C97B5A" }}>🥩+{m.macros.proteinas}g</span>
                      <span className="macro-pill" style={{ background:"#fdf8ec",color:"#b8942a" }}>🌾+{m.macros.carbos}g</span>
                      <span className="macro-pill" style={{ background:"#edf5ee",color:"#7A9E7E" }}>🫒+{m.macros.grasas}g</span>
                      <span className="macro-pill" style={{ background:"#eff4f8",color:"#5a8aaa" }}>🔥+{m.macros.calorias}kcal</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                <div style={{ width:27,height:27,borderRadius:"50%",background:"#1C1410",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12 }}>🌿</div>
                <div style={{ background:"white",borderRadius:15,borderBottomLeftRadius:4,padding:"10px 15px",boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
                  <div style={{ display:"flex",gap:4 }}>
                    {[0,1,2].map(j=>(<div key={j} style={{ width:6,height:6,borderRadius:"50%",background:"#C97B5A",animation:`bounce 0.9s ${j*0.15}s infinite` }}/>))}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}/>
          </div>
 
          <div style={{ padding:"8px 13px",paddingBottom:`calc(env(safe-area-inset-bottom,0px) + 11px)`,background:"white",borderTop:"1px solid #f0ebe4",flexShrink:0 }}>
            {!apiKey && (
              <div style={{ background:"#fdf2ec",border:"1px solid #C97B5A44",borderRadius:9,padding:"7px 11px",marginBottom:7,fontSize:11.5,color:"#C97B5A" }}>
                ⚠️ Configura tu API key (🔑 arriba) para usar el chat
              </div>
            )}
            <div style={{ display:"flex",gap:7,alignItems:"flex-end",background:"#FAF6F0",border:"1.5px solid #e8ddd4",borderRadius:13,padding:"8px 11px" }}>
              <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Cuéntame qué cambió hoy..." rows={1} style={{ maxHeight:70,lineHeight:1.5 }}
                onInput={e=>{e.target.style.height="auto";e.target.style.height=e.target.scrollHeight+"px";}}/>
              <button className="send-btn" onClick={sendMessage} disabled={loading||!input.trim()}>→</button>
            </div>
            <div style={{ textAlign:"center",marginTop:5,fontSize:9,color:"#ccc",letterSpacing:0.5 }}>Powered by Claude · Tu nutrióloga IA</div>
          </div>
        </div>
      )}
    </div>
  );
}
 
