'use client'
import { useState, useEffect } from 'react'
type Stats = { total_supply: number; circulating_supply: number; total_holders: number; total_transactions: number; total_pkr_deposited: number; rate_pkr_per_coin: number }
export default function CoinPage() {
  const [dark, setDark] = useState(true)
  const [stats, setStats] = useState<Stats|null>(null)
  useEffect(() => {
    const t = localStorage.getItem('its-r-theme')
    if (t === 'light') { setDark(false); document.documentElement.setAttribute('data-theme','light') }
    fetch('/api/stats').then(r=>r.json()).then(d=>{ if(d.stats) setStats(d.stats) })
  }, [])
  const toggleTheme = () => {
    const next = !dark; setDark(next)
    if (next) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('its-r-theme','dark') }
    else { document.documentElement.setAttribute('data-theme','light'); localStorage.setItem('its-r-theme','light') }
  }
  const fmt = (n: number) => new Intl.NumberFormat('en-PK').format(n)
  const fmtT = (n: number) => n >= 1e12 ? (n/1e12).toFixed(2)+'T' : n >= 1e9 ? (n/1e9).toFixed(2)+'B' : n >= 1e6 ? (n/1e6).toFixed(2)+'M' : fmt(n)
  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',color:'var(--text)',fontFamily:'system-ui,sans-serif'}}>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 2rem',borderBottom:'1px solid var(--border)'}}>
        <span style={{color:'var(--gold)',fontWeight:800,fontSize:'1.1rem'}}>🪙 ITSR Coin</span>
        <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
          <a href="https://its-r-bank.vercel.app" style={{color:'var(--text)',fontSize:'0.9rem'}}>🏦 Bank</a>
          <a href="https://its-r-portal.vercel.app" style={{color:'var(--text)',fontSize:'0.9rem'}}>🌐 Portal</a>
          <button onClick={toggleTheme} style={{background:'var(--card)',border:'1px solid var(--border)',color:'var(--text)',padding:'0.4rem 0.75rem',borderRadius:'0.5rem',cursor:'pointer',fontSize:'0.8rem'}}>{dark?'☀️ Day':'🌙 Night'}</button>
        </div>
      </nav>
      <div style={{maxWidth:900,margin:'0 auto',padding:'3rem 1.5rem'}}>
        <div style={{textAlign:'center',marginBottom:'3rem'}}>
          <div style={{fontSize:'5rem',marginBottom:'1rem'}}>🪙</div>
          <h1 style={{fontSize:'2.5rem',fontWeight:800,marginBottom:'0.75rem',color:'var(--gold)'}}>ITSR Coin</h1>
          <p style={{color:'var(--sub)',fontSize:'1.1rem',maxWidth:500,margin:'0 auto'}}>The internal currency of ITS-R Universe. Earn, hold, and spend on 2,213 services.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem',marginBottom:'3rem'}}>
          {[
            {label:'Total Supply',value:'1 Trillion',sub:'1,000,000,000,000 ₡',gold:true},
            {label:'Circulating',value:stats?fmtT(stats.circulating_supply):'—',sub:'coins in circulation'},
            {label:'Total Holders',value:stats?fmt(stats.total_holders):'—',sub:'active wallets'},
            {label:'Transactions',value:stats?fmt(stats.total_transactions):'—',sub:'total movements'},
            {label:'PKR Deposited',value:stats?'₨'+fmtT(stats.total_pkr_deposited):'—',sub:'total invested'},
          ].map(item=>(
            <div key={item.label} style={{background:'var(--card)',border:`1px solid ${item.gold?'var(--gold)':'var(--border)'}`,borderRadius:'1rem',padding:'1.25rem',textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',fontWeight:800,color:item.gold?'var(--gold)':'var(--text)',marginBottom:'0.25rem'}}>{item.value}</div>
              <div style={{color:'var(--sub)',fontSize:'0.75rem',marginBottom:'0.25rem'}}>{item.sub}</div>
              <div style={{color:'var(--sub)',fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.05em'}}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'2rem'}}>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'1rem',padding:'1.5rem'}}>
            <h2 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1.25rem',color:'var(--gold)'}}>📋 Coin Details</h2>
            {[
              ['Symbol','₡ ITSR'],['Name','ITSR Coin'],['Total Supply','1,000,000,000,000'],
              ['Rate','100 PKR = 100 ITSR'],['Decimals','4'],['Expiry','Never (active users)'],
              ['Network','ITS-R Universe (internal)'],
            ].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'0.5rem 0',borderBottom:'1px solid var(--border)',fontSize:'0.875rem'}}>
                <span style={{color:'var(--sub)'}}>{k}</span>
                <span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'1rem',padding:'1.5rem'}}>
            <h2 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1.25rem',color:'var(--gold)'}}>💡 How It Works</h2>
            {[
              {icon:'📥',title:'Earn',desc:'Deposit 100 PKR → Get 100 ITSR Coins'},
              {icon:'🎁',title:'Bonus',desc:'Earn coins for activity & referrals'},
              {icon:'💸',title:'Spend',desc:'Use on any of 2,213 ITS-R services'},
              {icon:'🔒',title:'No Withdrawal',desc:'Coins stay inside ITS-R Universe'},
              {icon:'♾️',title:'Never Expire',desc:'Active users keep coins forever'},
            ].map(item=>(
              <div key={item.title} style={{display:'flex',gap:'0.75rem',padding:'0.5rem 0',alignItems:'center'}}>
                <span style={{fontSize:'1.1rem'}}>{item.icon}</span>
                <div>
                  <span style={{fontWeight:600,fontSize:'0.875rem'}}>{item.title}: </span>
                  <span style={{color:'var(--sub)',fontSize:'0.8rem'}}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:'center'}}>
          <a href="https://its-r-bank.vercel.app/deposit" style={{display:'inline-block',padding:'1rem 2rem',background:'var(--gold)',color:'#000',fontWeight:700,borderRadius:'0.75rem',fontSize:'1rem',marginRight:'1rem'}}>🏦 Get ITSR Coins</a>
          <a href="https://its-r-portal.vercel.app" style={{display:'inline-block',padding:'1rem 2rem',background:'var(--card)',border:'1px solid var(--border)',color:'var(--text)',fontWeight:600,borderRadius:'0.75rem',fontSize:'1rem'}}>🌐 Explore Services</a>
        </div>
      </div>
      <footer style={{textAlign:'center',padding:'2rem',borderTop:'1px solid var(--border)',color:'var(--sub)',fontSize:'0.8rem',marginTop:'2rem'}}>
        ITSR Coin | ITS-R Universe | In loving memory of Roshan Ali Sahab 🤲
      </footer>
    </div>
  )
}