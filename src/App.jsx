import { useEffect, useState } from 'react'
import { achievements, contactDetails, projects, skills } from './data'

const Arrow = () => <span aria-hidden="true">↗</span>
const External = () => <span className="external" aria-hidden="true">↗</span>
const isPlaceholder = value => !value || value.startsWith('[')

function ContactLink({ label, value, type }) {
  if (!value) return null
  const href = type === 'email' ? `mailto:${value}` : type === 'phone' ? `tel:${value}` : value
  return isPlaceholder(value) ? <p className="contact-detail"><b>{label}</b><span>{value}</span></p> : <a className="contact-detail" href={href} target={type ? undefined : '_blank'} rel="noreferrer"><b>{label}</b><span>{value} <External /></span></a>
}

function ThemeToggle({ theme, setTheme }) {
  return <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">
    <span>{theme === 'dark' ? '☼' : '☾'}</span>
  </button>
}

function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']
  return <header className="site-header">
    <a href="#home" className="logo" aria-label="Md Azeemuddin home">MA<span>.</span></a>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
      {links.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
      {!isPlaceholder(contactDetails.resume) && <a className="nav-resume" href={contactDetails.resume} target="_blank" rel="noreferrer">Resume <Arrow /></a>}
    </nav>
    <div className="header-actions"><ThemeToggle theme={theme} setTheme={setTheme} /><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? '×' : '☰'}</button></div>
  </header>
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) }, [theme])

  return <>
    <Header theme={theme} setTheme={setTheme} />
    <main>
      <section className="hero section" id="home">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span></span> Available for entry-level opportunities</p>
          <p className="hello">Hi, I’m <strong>Md Azeemuddin.</strong></p>
          <h1>Full Stack Developer <em>building</em> modern web applications.</h1>
          <p className="hero-summary">I build thoughtful digital experiences that pair clean, responsive interfaces with scalable and secure backend systems.</p>
          <div className="hero-actions"><a className="button primary" href="#projects">View projects <Arrow /></a>{!isPlaceholder(contactDetails.resume) ? <a className="button ghost" href={contactDetails.resume} target="_blank" rel="noreferrer">Download resume</a> : <span className="button ghost disabled">Resume: [YOUR_RESUME_URL]</span>}<a className="text-link" href="#contact">Contact me <Arrow /></a></div>
        </div>
        <aside className="hero-card reveal" aria-label="Developer profile">
          <div className="code-dots"><i></i><i></i><i></i></div><p className="code-comment">// developer profile</p><p><b>const</b> developer = {'{'}</p><p className="indent">name: <span>'Md Azeemuddin'</span>,</p><p className="indent">focus: <span>'full stack'</span>,</p><p className="indent">status: <span>'open to work'</span></p><p>{'}'};</p><div className="card-footer"><span className="pulse"></span> Building with intent</div>
        </aside>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="section about" id="about"><div className="section-label">01 / ABOUT ME</div><div><h2>Curious by nature.<br /><em>Intentional</em> by practice.</h2><p>I’m an aspiring full stack developer who enjoys turning ideas into reliable, user-friendly web applications. I’m especially drawn to the balance of frontend craft and backend problem-solving: creating an experience people enjoy using, then making sure it works securely behind the scenes.</p><p>As I begin my software career, I bring a practical mindset, strong attention to detail, and a genuine appetite for learning. I’m ready to contribute, ask thoughtful questions, and grow alongside an ambitious engineering team.</p></div></section>

      <section className="section skills-section" id="skills"><div className="section-heading"><div className="section-label">02 / TECHNICAL TOOLKIT</div><h2>A practical stack for<br /><em>real-world</em> products.</h2></div><div className="skills-grid">{skills.map((skill, index) => <article className="skill-card" key={skill.title}><div className="skill-number">0{index + 1}</div><div className="skill-icon">{skill.icon}</div><h3>{skill.title}</h3><div className="tags">{skill.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div></section>

      <section className="section projects" id="projects"><div className="section-heading split"><div><div className="section-label">03 / SELECTED WORK</div><h2>Projects that turn<br />ideas into <em>impact.</em></h2></div><p>Examples of the kind of thoughtful, end-to-end work I enjoy building.</p></div><div className="project-grid">{projects.map((project, i) => <article className="project-card" key={project.title}><div className={`project-preview preview-${i + 1}`}><span>{project.type}</span><div className="abstract-ui"><i></i><i></i><i></i></div></div><div className="project-content"><p className="project-index">0{i + 1} — CASE STUDY</p><h3>{project.title}</h3><p className="problem">{project.problem}</p><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="project-bottom"><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer">GitHub <External /></a>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <External /></a>}</div></div></div></article>)}</div></section>

      <section className="section journey" id="experience"><div className="section-heading"><div className="section-label">04 / EXPERIENCE & ACHIEVEMENTS</div><h2>Learning fast.<br /><em>Building</em> deliberately.</h2></div><div className="achievement-list">{achievements.map(([num, title, text]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="education"><span>EDUCATION</span><p>Technocrats Institute of Technology, Bhopal<br /><em>B.Tech in Computer Science & Engineering (AI & ML)</em></p><strong>2026</strong></div></section>

      <section className="section resume-callout"><div><p className="eyebrow"><span></span> LET’S CONNECT</p><h2>Looking for someone who<br />cares about the <em>details?</em></h2></div>{!isPlaceholder(contactDetails.resume) ? <a className="button light" href={contactDetails.resume} target="_blank" rel="noreferrer">Download my resume <Arrow /></a> : <p className="resume-placeholder">Resume URL: {contactDetails.resume}</p>}</section>

      <section className="section contact" id="contact"><div><div className="section-label">05 / GET IN TOUCH</div><h2>Let’s build something<br /><em>meaningful.</em></h2><p>I’m actively looking for entry-level software and full stack development opportunities. If you think I could be a good fit, I’d love to hear from you.</p><div className="contact-details"><ContactLink label="Email" value={contactDetails.email} type="email" /><ContactLink label="Phone" value={contactDetails.phone} type="phone" /><ContactLink label="Location" value={contactDetails.location} /><ContactLink label="GitHub" value={contactDetails.github} /><ContactLink label="LinkedIn" value={contactDetails.linkedin} /><ContactLink label="LeetCode" value={contactDetails.leetcode} /><ContactLink label="Portfolio" value={contactDetails.portfolio} /><ContactLink label="Resume" value={contactDetails.resume} /></div></div><form onSubmit={e => { e.preventDefault(); if (!isPlaceholder(contactDetails.email)) window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + e.currentTarget.name.value)}&body=${encodeURIComponent(e.currentTarget.message.value)}` }}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@company.com" /></label><label>Message<textarea name="message" required placeholder="Tell me about the opportunity..." rows="4" /></label><button className="button primary" type="submit" disabled={isPlaceholder(contactDetails.email)}>Send message <Arrow /></button><p className="form-note">Your email client will open with this message ready to send.</p></form></section>
    </main>
    <footer><a className="logo" href="#home">MA<span>.</span></a><p>Designed and built by Md Azeemuddin © {new Date().getFullYear()}</p><a href="#home">Back to top ↑</a></footer>
  </>
}

export default App
