export const VERSION='2026-10-26.1';
export const scenarios=['loss','credentials','remote','suspicious'];
const actions={
 disconnect:{en:['Stop remote access','If someone can control your device, disconnect it from the internet. Use a different trusted device or phone for bank contact and reporting.'],hi:['रिमोट एक्सेस रोकें','अगर कोई आपका डिवाइस नियंत्रित कर सकता है, तो उसे इंटरनेट से अलग करें। बैंक और शिकायत के लिए दूसरा भरोसेमंद डिवाइस या फोन लें।']},
 report:{en:['Call 1930 now','Report suspected financial cyber fraud immediately. Do not wait to finish this form. Follow the helpline instructions and keep the acknowledgement.'],hi:['अभी 1930 पर कॉल करें','वित्तीय साइबर धोखाधड़ी की तुरंत शिकायत करें। यह फॉर्म पूरा होने का इंतज़ार न करें। हेल्पलाइन के निर्देश मानें और पावती रखें।']},
 bank:{en:['Contact your bank or payment provider','Use the number in its official app, on your card, or on its verified website. Ask it to secure affected payment access and record a fraud complaint.'],hi:['अपने बैंक या भुगतान सेवा से संपर्क करें','आधिकारिक ऐप, कार्ड या सत्यापित वेबसाइट का नंबर लें। प्रभावित भुगतान सुविधा सुरक्षित करने और धोखाधड़ी की शिकायत दर्ज करने को कहें।']},
 secure:{en:['Secure exposed accounts','From a trusted device, change exposed passwords, review active sessions and contact the provider. Never share an OTP, PIN, CVV or password with a caller or here.'],hi:['प्रभावित खाते सुरक्षित करें','भरोसेमंद डिवाइस से उजागर पासवर्ड बदलें, सक्रिय सत्र जाँचें और सेवा प्रदाता से संपर्क करें। OTP, PIN, CVV या पासवर्ड किसी कॉलर को या यहाँ न दें।']},
 pause:{en:['Pause the conversation','Stop replying or paying. Verify the request independently using an official contact you already trust. A familiar name or logo is not proof.'],hi:['बातचीत रोकें','जवाब देना या भुगतान करना रोकें। पहले से भरोसेमंद आधिकारिक संपर्क से अलग से सत्यापन करें। परिचित नाम या लोगो प्रमाण नहीं है।']},
 evidence:{en:['Keep the original evidence','Keep transaction receipts, messages and call details on your own device. Prepare details below only after urgent calls. Do not delete originals.'],hi:['मूल सबूत सुरक्षित रखें','लेनदेन रसीद, संदेश और कॉल विवरण अपने डिवाइस पर रखें। ज़रूरी कॉल के बाद ही नीचे विवरण तैयार करें। मूल सबूत न मिटाएँ।']},
 portal:{en:['Complete official reporting','Use cybercrime.gov.in and follow the helpline instructions. Sanket does not submit a complaint, freeze funds, or guarantee recovery.'],hi:['आधिकारिक शिकायत पूरी करें','cybercrime.gov.in का उपयोग करें और हेल्पलाइन निर्देश मानें। संकेत शिकायत जमा नहीं करता, पैसा फ्रीज़ नहीं करता और वापसी की गारंटी नहीं देता।']},
 chakshu:{en:['Report a suspicious communication','For suspected fraudulent calls, SMS or WhatsApp messages, use Chakshu on Sanchar Saathi. If money is lost or a cybercrime occurred, use 1930 / cybercrime.gov.in instead.'],hi:['संदिग्ध संदेश या कॉल की सूचना दें','संदिग्ध धोखाधड़ी वाले कॉल, SMS या WhatsApp संदेश के लिए संचार साथी पर चक्षु इस्तेमाल करें। पैसा गया हो या साइबर अपराध हुआ हो तो 1930 / cybercrime.gov.in पर जाएँ।']}
};
export function makePlan(selected=[],lang='en'){
 const flags=new Set(selected.filter(x=>scenarios.includes(x)));
 if(!flags.size)return [];
 let ids=[];
 if(flags.has('remote'))ids.push('disconnect');
 if(flags.has('loss'))ids.push('report','bank');
 else if(flags.has('credentials')||flags.has('remote'))ids.push('bank');
 else ids.push('pause');
 if(flags.has('credentials')||flags.has('remote'))ids.push('secure');
 ids.push('evidence');
 ids.push(flags.has('loss')||flags.has('credentials')||flags.has('remote')?'portal':'chakshu');
 return [...new Set(ids)].map(id=>({id,title:actions[id][lang==='hi'?'hi':'en'][0],body:actions[id][lang==='hi'?'hi':'en'][1]}));
}
export const blankIncident=()=>({amount:'',date:'',provider:'',reference:'',channel:'UPI',description:'',files:[]});
export function validateIncident(d,now=Date.now()){
 const errors=[];
 if(d.amount!==''&&(!/^\d+(\.\d{1,2})?$/.test(String(d.amount))||Number(d.amount)<=0||Number(d.amount)>100000000))errors.push('Enter a positive amount up to 10 crore, with at most 2 decimals.');
 if(d.date&&(!Number.isFinite(Date.parse(d.date))||Date.parse(d.date)>now+60000))errors.push('Choose a valid incident time that is not in the future.');
 if(String(d.description||'').length>1200)errors.push('Keep the description within 1,200 characters.');
 for(const f of ['provider','reference'])if(String(d[f]||'').length>100)errors.push('Provider and reference must be at most 100 characters.');
 return errors;
}
export function mask(value){const s=String(value||'').trim();return !s?'Not entered':s.length<=4?'[hidden]':'••••'+s.slice(-4);}
export function buildReport(d,selected=[],full=false,now=new Date()){
 return {document:'Sanket preparation summary - NOT an official complaint',version:VERSION,createdAt:now.toISOString(),mode:full?'PRIVATE FULL COPY':'MASKED SHARING COPY',scenarios:selected.filter(x=>scenarios.includes(x)),amountINR:d.amount||'Not entered',incidentTime:d.date||'Not entered',timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,channel:d.channel||'Not entered',provider:full?(d.provider||'Not entered'):'[withheld]',transactionReference:full?(d.reference||'Not entered'):mask(d.reference),description:full?(d.description||'Not entered'):'[withheld: may contain personal data]',files:(d.files||[]).map((f,i)=>({name:full?f.name:`Evidence ${i+1}`,size:f.size,sha256:f.sha256})),notice:'No complaint has been submitted. Original files stay on your device. A hash records bytes and does not prove authenticity. Review this copy before sharing. Contact 1930 and your bank immediately for suspected financial cyber fraud.'};
}
export function reportText(report){return Object.entries(report).map(([k,v])=>`${k}: ${typeof v==='object'?JSON.stringify(v,null,2):v}`).join('\n\n');}
export function safeRestore(raw){
 try{const d=JSON.parse(raw);if(!d||typeof d!=='object')return null;const out=blankIncident();for(const k of ['amount','date','provider','reference','channel','description'])out[k]=String(d[k]||'').slice(0,k==='description'?1200:100);out.files=Array.isArray(d.files)?d.files.filter(f=>f&&typeof f.name==='string'&&/^[a-f0-9]{64}$/.test(f.sha256)&&Number.isFinite(f.size)).slice(0,5).map(f=>({name:f.name.slice(0,150),size:f.size,sha256:f.sha256})):[];return validateIncident(out).length?null:out;}catch{return null;}
}
