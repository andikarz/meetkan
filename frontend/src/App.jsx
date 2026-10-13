import { useState } from 'react';
import {
  LayoutGrid, Calendar, FileText, CheckCircle2, AlertTriangle,
  Clock, Users, Bell, Search, Plus, ChevronRight, X, Shield,
  Sparkles, MoreHorizontal, Activity
} from 'lucide-react';
import './App.css';

// ── Mock Data ─────────────────────────────────────────────
const user = { name: 'Andika Pratama', role: 'Product Lead', initials: 'AP' };

const meetings = [
  { id: 'm1', title: 'Q3 Architecture Sprint & Decision Sync', desc: 'Finalisasi arsitektur modular monolith, mekanisme outbox BullMQ, dan validasi RBAC.', time: '14:00', dur: '90 mnt', status: 'In Progress', organizer: 'Andika Pratama', participants: 4, agendaCount: 3, date: 'Senin, 12 Okt 2026' },
  { id: 'm2', title: 'Sprint Retrospective & Follow-up #14', desc: 'Evaluasi ketepatan waktu action items sprint dan pemetaan hambatan.', time: '10:00', dur: '60 mnt', status: 'Scheduled', organizer: 'Sarah Jenkins', participants: 3, agendaCount: 2, date: 'Selasa, 13 Okt 2026' },
  { id: 'm3', title: 'Product Roadmap Alignment Q4', desc: 'Penetapan target rilis fitur Decision Management dan Audit Trail.', time: '15:00', dur: '90 mnt', status: 'Completed', organizer: 'Andika Pratama', participants: 2, agendaCount: 1, date: '10 Okt 2026' },
];

const agendas = [
  { id: 'ag1', title: 'Review Database Indexing & Prisma Transactions', dur: '20 mnt', status: 'done', notes: 'Disepakati: index pada workspace_id, due_date, dan assignee_id wajib di schema awal.' },
  { id: 'ag2', title: 'Transactional Outbox & BullMQ Reliability', dur: '35 mnt', status: 'active', notes: 'Pola outbox: tulis ke postgres dan outbox_events dalam 1 transaksi atomik.' },
  { id: 'ag3', title: 'RBAC Authorization Guard & Multi-tenant Isolation', dur: '25 mnt', status: '', notes: '' },
];

const decisions = [
  { id: 'd1', title: 'Implementasi Modular Monolith dengan Worker Terpisah', rationale: 'Microservices menambah kompleksitas di tahap MVP. Modular monolith menjaga batas modul domain tanpa beban deployment berlebih.', status: 'Approved', by: 'Sarah Jenkins', version: 2 },
  { id: 'd2', title: 'Session Cookie HttpOnly + CSRF Protection', rationale: 'JWT di localStorage memiliki celah XSS. Session cookie dengan HttpOnly + Secure + SameSite memberikan proteksi lebih kuat.', status: 'Proposed', by: null, version: 1 },
];

const actionItems = [
  { id: 'a1', task: 'Buat Prisma migration tabel outbox_events', owner: 'BS', name: 'Budi Santoso', due: 'Besok', tone: 'soon', priority: 'High', status: 'In Progress', blocker: null },
  { id: 'a2', task: 'Konfigurasi Redis BullMQ retry backoff', owner: 'RW', name: 'Rina Wijaya', due: 'Hari ini', tone: 'urgent', priority: 'Urgent', status: 'Blocked', blocker: 'Terkendala akses VPC ke Redis cluster staging.' },
  { id: 'a3', task: 'Setup NestJS Guard validasi workspace', owner: 'AP', name: 'Andika Pratama', due: '18 Okt', tone: 'normal', priority: 'Medium', status: 'Open', blocker: null },
  { id: 'a4', task: 'Audit log indexing performance benchmark', owner: 'BS', name: 'Budi Santoso', due: '10 Okt', tone: 'urgent', priority: 'High', status: 'Blocked', blocker: 'Perlu dump dataset dari production replica.' },
  { id: 'a5', task: 'Rilis Dokumen PRD v1 dan UI Flow Prototype', owner: 'AP', name: 'Andika Pratama', due: '12 Okt', tone: 'completed', priority: 'Urgent', status: 'Completed', blocker: null },
];

const auditLogs = [
  { time: 'Baru saja', actor: 'Sarah Jenkins', action: 'Menyetujui keputusan Modular Monolith (v2)' },
  { time: '14:15', actor: 'Andika Pratama', action: 'Menandai agenda Database Indexing selesai' },
  { time: '14:00', actor: 'Andika Pratama', action: 'Memulai rapat Q3 Architecture Sprint' },
  { time: 'Kemarin', actor: 'Rina Wijaya', action: 'Menandai tugas Blocked: VPC Redis' },
  { time: '10 Okt', actor: 'Andika Pratama', action: 'Menyelesaikan rapat Product Roadmap Q4' },
];

const nav = [
  ['grid', 'Ringkasan', LayoutGrid],
  ['calendar', 'Meetings', Calendar],
  ['clipboard', 'Decisions', FileText],
  ['check', 'Action Items', CheckCircle2],
  ['alert', 'Follow-up', AlertTriangle],
  ['activity', 'Audit Trail', Activity],
];

// ── App ───────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('Ringkasan');
  const [detailTab, setDetailTab] = useState('agenda');
  const [role, setRole] = useState('Meeting Organizer');
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null); // 'meeting' | 'decision' | 'action' | 'blocker'

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };
  const overdueCount = actionItems.filter(a => a.tone === 'urgent' && a.status !== 'Completed').length;
  const blockedCount = actionItems.filter(a => a.status === 'Blocked').length;
  const completedCount = actionItems.filter(a => a.status === 'Completed').length;

  return (
    <div className="app-shell">
      {/* Toast */}
      {toast && <div className="toast"><CheckCircle2 size={17} /> {toast}</div>}

      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside className="sidebar">
        <div>
          <div className="brand"><span className="brand-mark"><span /></span><span>MeetManage</span></div>
          <nav className="nav-list" aria-label="Navigasi utama">
            {nav.map(([key, label, Icon]) => (
              <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label)}>
                <Icon size={18} /><span>{label}</span>
                {label === 'Action Items' && <b>{actionItems.filter(a => a.status !== 'Completed').length}</b>}
                {label === 'Follow-up' && (overdueCount + blockedCount > 0) && <b>{overdueCount + blockedCount}</b>}
              </button>
            ))}
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="role-simulator">
            <div className="role-simulator-label"><Shield size={12} /> SIMULASI ROLE</div>
            <select className="role-select" value={role} onChange={e => { setRole(e.target.value); showToast(`Beralih ke role: ${e.target.value}`); }}>
              <option>Meeting Organizer</option>
              <option>Member</option>
              <option>Admin</option>
              <option>Viewer</option>
            </select>
          </div>
          <div className="tip"><span><Sparkles size={18} /></span><strong>Kelola, bukan sekadar rapat.</strong><p>Pastikan setiap diskusi berakhir dengan keputusan yang jelas dan tindak lanjut terukur.</p></div>
          <button className="profile"><span className="avatar">{user.initials}</span><span><strong>{user.name}</strong><small>{role}</small></span><MoreHorizontal size={16} /></button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────── */}
      <main>
        <header>
          <div className="header-left">
            <h1 className="view-title">
              {active === 'Ringkasan' && 'Ringkasan'}
              {active === 'Meetings' && 'Meetings'}
              {active === 'Detail Meeting' && 'Ruang Kerja Meeting'}
              {active === 'Decisions' && 'Keputusan'}
              {active === 'Action Items' && 'Action Items'}
              {active === 'Follow-up' && 'Follow-up & Blocker'}
              {active === 'Audit Trail' && 'Audit Trail'}
            </h1>
            <span className="breadcrumb">Acme Engineering</span>
          </div>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifikasi"><Bell size={18} /><span className="notif-dot" /></button>
            {role !== 'Viewer' && <button className="btn-primary" onClick={() => setModal('meeting')}><Plus size={16} /> Buat meeting</button>}
          </div>
        </header>

        <div className="content">

          {/* ═══════════ RINGKASAN ═══════════ */}
          {active === 'Ringkasan' && (
            <div className="animate-fade">
              <section className="welcome">
                <div>
                  <p className="eyebrow">SELAMAT DATANG, ANDIKA</p>
                  <h1>Semua tindak lanjut,<br/>dalam satu kendali.</h1>
                  <p>Pantau meeting, keputusan, dan tugas tim tanpa ada yang terlewat.</p>
                </div>
                <div className="date-card"><span>OKT</span><strong>12</strong><small>Senin, 2026</small></div>
              </section>

              <section className="stats">
                <article><span className="stat-icon blue"><Calendar size={20} /></span><div><small>Meeting minggu ini</small><strong>{meetings.length}</strong><p><b>1</b> berlangsung sekarang</p></div></article>
                <article><span className="stat-icon amber"><Clock size={20} /></span><div><small>Action items terbuka</small><strong>{actionItems.filter(a => a.status !== 'Completed').length}</strong><p><b>{overdueCount}</b> mendekati tenggat</p></div></article>
                <article><span className="stat-icon green"><CheckCircle2 size={20} /></span><div><small>Keputusan bulan ini</small><strong>{decisions.length}</strong><p><b>{decisions.filter(d => d.status === 'Approved').length}</b> disetujui</p></div></article>
                {(overdueCount + blockedCount > 0) && (
                  <article><span className="stat-icon red"><AlertTriangle size={20} /></span><div><small>Overdue & Blocked</small><strong>{overdueCount + blockedCount}</strong><p><b className="warn">{blockedCount}</b> terhambat</p></div></article>
                )}
              </section>

              <div className="dashboard-grid">
                {/* Schedule */}
                <section className="panel schedule">
                  <div className="panel-head"><div><p className="eyebrow">JADWAL</p><h2>Meeting hari ini</h2></div><button className="text-button" onClick={() => setActive('Meetings')}>Lihat semua <ChevronRight size={14} /></button></div>

                  <div className="meeting-row current">
                    <div className="time-col"><strong>14:00</strong><small>90 mnt</small></div>
                    <div className="line-col" />
                    <div className="meeting-info">
                      <span className="status-dot">BERLANGSUNG</span>
                      <h3>Q3 Architecture Sprint & Decision Sync</h3>
                      <p>Finalisasi arsitektur modular monolith dan transactional outbox</p>
                      <div className="meta"><span className="avatar-stack"><i>AP</i><i>SJ</i><i>+2</i></span><span>4 peserta</span><span>•</span><span>3 agenda</span></div>
                    </div>
                    <button className="open-button" onClick={() => { setActive('Detail Meeting'); setDetailTab('agenda'); }}>Buka ruang kerja <ChevronRight size={14} /></button>
                  </div>

                  {meetings.filter(m => m.id !== 'm1').map(m => (
                    <div className="meeting-row" key={m.id}>
                      <div className="time-col"><strong>{m.time}</strong><small>{m.dur}</small></div>
                      <div className="line-col" />
                      <div className="meeting-info">
                        <h3>{m.title}</h3>
                        <p>{m.desc}</p>
                        <div className="meta"><span className="avatar-stack"><i>AP</i><i>SJ</i></span><span>{m.participants} peserta</span><span>•</span><span>{m.agendaCount} agenda</span></div>
                      </div>
                      <button className="more-button"><MoreHorizontal size={16} /></button>
                    </div>
                  ))}
                </section>

                {/* Activity */}
                <aside className="panel activity">
                  <div className="panel-head"><div><p className="eyebrow">AKTIVITAS</p><h2>Terbaru</h2></div><button className="more-button"><MoreHorizontal size={16} /></button></div>
                  {auditLogs.slice(0, 4).map((log, i) => (
                    <div className="activity-item" key={i}>
                      <span className={`activity-icon ${i === 0 ? 'decision' : i === 1 ? 'note' : i === 2 ? 'meeting-ev' : 'task'}`}>
                        {i === 0 ? <CheckCircle2 size={15} /> : i === 1 ? <FileText size={15} /> : i === 2 ? <Calendar size={15} /> : <AlertTriangle size={15} />}
                      </span>
                      <div><p><strong>{log.actor}</strong> — {log.action}</p><small>{log.time}</small></div>
                    </div>
                  ))}
                  <button className="all-activity" onClick={() => setActive('Audit Trail')}>Lihat semua aktivitas</button>
                </aside>
              </div>

              {/* Action items table */}
              <section className="panel tasks">
                <div className="panel-head"><div><p className="eyebrow">PRIORITAS</p><h2>Action items terdekat</h2></div><button className="text-button" onClick={() => setActive('Action Items')}>Lihat semua <ChevronRight size={14} /></button></div>
                <div className="task-header"><span>TUGAS</span><span>KEPUTUSAN</span><span>PENANGGUNG JAWAB</span><span>TENGGAT</span></div>
                {actionItems.filter(a => a.status !== 'Completed').slice(0, 3).map(item => (
                  <div className="task-row" key={item.id}>
                    <div><button className="checkbox" aria-label={`Tandai ${item.task} selesai`} onClick={() => showToast('Status action item diperbarui')} /><strong>{item.task}</strong></div>
                    <span>Keputusan terkait</span>
                    <span className="owner"><i>{item.owner}</i>{item.name}</span>
                    <span className={`due ${item.tone}`}>{item.due}</span>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ═══════════ MEETINGS LIST ═══════════ */}
          {active === 'Meetings' && (
            <div className="animate-fade">
              <section className="welcome">
                <div><p className="eyebrow">MEETING HUB</p><h1>Daftar meeting</h1><p>Kelola siklus hidup meeting dari penjadwalan hingga tindak lanjut.</p></div>
              </section>
              <section className="panel">
                <div className="panel-head"><div><h2>Semua meeting</h2></div>{role !== 'Viewer' && <button className="btn-primary" onClick={() => setModal('meeting')}><Plus size={15} /> Jadwalkan</button>}</div>
                {meetings.map(m => (
                  <div className="meeting-row" key={m.id} style={{ cursor: 'pointer' }} onClick={() => { setActive('Detail Meeting'); setDetailTab('agenda'); }}>
                    <div className="time-col"><strong>{m.time}</strong><small>{m.dur}</small></div>
                    <div className="line-col" />
                    <div className="meeting-info">
                      {m.status === 'In Progress' && <span className="status-dot">BERLANGSUNG</span>}
                      <h3>{m.title}</h3>
                      <p>{m.desc}</p>
                      <div className="meta">
                        <span className={`status-pill ${m.status.toLowerCase().replace(' ', '-')}`}>{m.status}</span>
                        <span>•</span><span>{m.date}</span><span>•</span>
                        <span>{m.participants} peserta</span><span>•</span><span>{m.agendaCount} agenda</span>
                      </div>
                    </div>
                    <button className="open-button">Buka <ChevronRight size={14} /></button>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ═══════════ DETAIL MEETING ═══════════ */}
          {active === 'Detail Meeting' && (
            <div className="animate-fade">
              <button className="back-button" onClick={() => setActive('Ringkasan')}><span>←</span> Kembali ke ringkasan</button>

              <div className="detail-hero">
                <div>
                  <div className="detail-status"><span /> BERLANGSUNG</div>
                  <h1>Q3 Architecture Sprint & Decision Sync</h1>
                  <p>Finalisasi arsitektur modular monolith, transactional outbox BullMQ, dan validasi RBAC workspace-level.</p>
                  <div className="detail-meta">
                    <span><Calendar size={14} /> Senin, 12 Okt 2026</span>
                    <span><Clock size={14} /> 14:00 – 15:30</span>
                    <span><Users size={14} /> 4 peserta</span>
                  </div>
                </div>
                <div className="detail-actions">
                  {role !== 'Viewer' && <button className="btn-primary" onClick={() => { if (detailTab === 'decisions') setModal('decision'); else if (detailTab === 'actions') setModal('action'); else setModal('decision'); }}>
                    <Plus size={15} /> {detailTab === 'actions' ? 'Action Item' : 'Keputusan'}
                  </button>}
                </div>
              </div>

              {/* Tabs */}
              <div className="tabs-nav">
                {[['agenda', `Agenda & Notulen (${agendas.length})`], ['decisions', `Keputusan (${decisions.length})`], ['actions', `Action Items (${actionItems.length})`], ['audit', `Audit (${auditLogs.length})`]].map(([key, label]) => (
                  <button key={key} className={`tab-btn ${detailTab === key ? 'active' : ''}`} onClick={() => setDetailTab(key)}>{label}</button>
                ))}
              </div>

              <div className="detail-layout">
                <div className="detail-main">
                  {/* TAB: Agenda */}
                  {detailTab === 'agenda' && (
                    <section className="panel detail-panel animate-fade">
                      <div className="panel-head"><div><p className="eyebrow">ALUR DISKUSI</p><h2>Agenda meeting</h2></div><span className="progress-label">1 dari 3 dibahas</span></div>
                      <div className="progress"><span style={{ width: '33%' }} /></div>
                      {agendas.map((ag, i) => (
                        <div className={`agenda-detail ${ag.status}`} key={ag.id}>
                          <button>{ag.status === 'done' ? <CheckCircle2 size={14} /> : i + 1}</button>
                          <div><strong>{ag.title}</strong>{ag.notes && <p>{ag.notes}</p>}</div>
                          <time>{ag.dur}</time>
                        </div>
                      ))}
                    </section>
                  )}

                  {/* TAB: Decisions */}
                  {detailTab === 'decisions' && (
                    <section className="panel detail-panel animate-fade">
                      <div className="panel-head"><div><p className="eyebrow">HASIL</p><h2>Keputusan & Rationale</h2></div>{role !== 'Viewer' && <button className="text-button" onClick={() => setModal('decision')}><Plus size={14} /> Tambah</button>}</div>
                      {decisions.map(dec => (
                        <div className={`outcome ${dec.status === 'Approved' ? 'decision-row' : 'action-row'}`} key={dec.id}>
                          <span>{dec.status === 'Approved' ? <CheckCircle2 size={16} /> : <FileText size={16} />}</span>
                          <div>
                            <small>{dec.status === 'Approved' ? 'DISETUJUI' : 'DIAJUKAN'} — v{dec.version}</small>
                            <strong>{dec.title}</strong>
                            <p style={{ marginTop: 6, fontStyle: 'italic', lineHeight: 1.5 }}>"{dec.rationale}"</p>
                            {dec.by && <p className="outcome-meta" style={{ marginTop: 6 }}><i>{dec.by.split(' ').map(s=>s[0]).join('')}</i> Disetujui oleh {dec.by}</p>}
                          </div>
                          {dec.status === 'Proposed' && role !== 'Viewer' && (
                            <button className="btn-primary" style={{ height: 32, fontSize: 10, padding: '0 12px' }} onClick={() => showToast('Keputusan disetujui! Outbox event dibuat.')}>Setujui</button>
                          )}
                        </div>
                      ))}
                    </section>
                  )}

                  {/* TAB: Actions */}
                  {detailTab === 'actions' && (
                    <section className="panel detail-panel animate-fade">
                      <div className="panel-head"><div><p className="eyebrow">TINDAK LANJUT</p><h2>Action Items</h2></div>{role !== 'Viewer' && <button className="text-button" onClick={() => setModal('action')}><Plus size={14} /> Tambah</button>}</div>
                      <div className="task-header"><span>TUGAS</span><span>PRIORITAS</span><span>PENANGGUNG JAWAB</span><span>TENGGAT</span></div>
                      {actionItems.map(item => (
                        <div className="task-row" key={item.id}>
                          <div>
                            <button className="checkbox" onClick={() => showToast('Status diperbarui')} />
                            <div>
                              <strong>{item.task}</strong>
                              {item.blocker && <div className="blocker-callout"><AlertTriangle size={13} /><span><strong>Blocker:</strong> {item.blocker}</span></div>}
                            </div>
                          </div>
                          <span><span className={`priority-pill ${item.priority.toLowerCase()}`}>{item.priority}</span></span>
                          <span className="owner"><i>{item.owner}</i>{item.name}</span>
                          <span className={`due ${item.tone}`}>{item.due}</span>
                        </div>
                      ))}
                    </section>
                  )}

                  {/* TAB: Audit */}
                  {detailTab === 'audit' && (
                    <section className="panel detail-panel animate-fade">
                      <div className="panel-head"><div><p className="eyebrow">RIWAYAT</p><h2>Audit Trail (Append-Only)</h2></div></div>
                      {auditLogs.map((log, i) => (
                        <div className="activity-item" key={i}>
                          <span className={`activity-icon ${i === 0 ? 'decision' : i < 3 ? 'meeting-ev' : 'task'}`}>
                            <Activity size={15} />
                          </span>
                          <div><p><strong>{log.actor}</strong> — {log.action}</p><small>{log.time}</small></div>
                        </div>
                      ))}
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="detail-side">
                  <section className="panel">
                    <div className="panel-head"><div><p className="eyebrow">PESERTA</p><h2>4 orang</h2></div></div>
                    <div className="participant"><i className="purple">AP</i><div><strong>Andika Pratama</strong><small>Penyelenggara</small></div><span>Hadir</span></div>
                    <div className="participant"><i className="cyan">SJ</i><div><strong>Sarah Jenkins</strong><small>Lead Architect</small></div><span>Hadir</span></div>
                    <div className="participant"><i className="green">BS</i><div><strong>Budi Santoso</strong><small>Backend Engineer</small></div><span>Hadir</span></div>
                    <div className="participant"><i className="pink">RW</i><div><strong>Rina Wijaya</strong><small>DevOps Specialist</small></div></div>
                  </section>
                  <section className="panel">
                    <div className="panel-head"><div><p className="eyebrow">RIWAYAT</p><h2>Aktivitas</h2></div></div>
                    {auditLogs.slice(0, 3).map((log, i) => (
                      <div className="timeline" key={i}><span /><div><strong>{log.action}</strong><small>{log.time}</small></div></div>
                    ))}
                  </section>
                  <div className="meeting-note"><Sparkles size={18} /><div><strong>Keputusan & Action Items</strong><p>Semua akan tersimpan otomatis di riwayat meeting dan dapat ditelusuri.</p></div></div>
                </aside>
              </div>
            </div>
          )}

          {/* ═══════════ DECISIONS HUB ═══════════ */}
          {active === 'Decisions' && (
            <div className="animate-fade">
              <section className="welcome"><div><p className="eyebrow">REPOSITORI KEPUTUSAN</p><h1>Keputusan organisasi</h1><p>Kumpulan keputusan yang dapat ditelusuri ke meeting sumber.</p></div></section>
              <section className="panel">
                <div className="panel-head"><div><h2>Semua keputusan</h2></div></div>
                {decisions.map(dec => (
                  <div className={`outcome ${dec.status === 'Approved' ? 'decision-row' : 'action-row'}`} key={dec.id}>
                    <span>{dec.status === 'Approved' ? <CheckCircle2 size={16} /> : <FileText size={16} />}</span>
                    <div>
                      <small>{dec.status} — v{dec.version}</small>
                      <strong>{dec.title}</strong>
                      <p style={{ marginTop: 4, fontStyle: 'italic' }}>"{dec.rationale}"</p>
                    </div>
                    {dec.status === 'Proposed' && role !== 'Viewer' && (
                      <button className="btn-primary" style={{ height: 32, fontSize: 10, padding: '0 12px' }} onClick={() => showToast('Keputusan disetujui!')}>Setujui</button>
                    )}
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ═══════════ ACTION ITEMS ═══════════ */}
          {active === 'Action Items' && (
            <div className="animate-fade">
              <section className="welcome"><div><p className="eyebrow">AKUNTABILITAS</p><h1>Action Items</h1><p>Pantau status pengerjaan seluruh tugas lintas tim.</p></div></section>
              <section className="panel tasks">
                <div className="panel-head"><div><h2>Semua action items</h2></div>{role !== 'Viewer' && <button className="btn-primary" onClick={() => setModal('action')}><Plus size={15} /> Tambah</button>}</div>
                <div className="task-header"><span>TUGAS</span><span>PRIORITAS</span><span>PENANGGUNG JAWAB</span><span>TENGGAT</span></div>
                {actionItems.map(item => (
                  <div className="task-row" key={item.id}>
                    <div>
                      <button className="checkbox" onClick={() => showToast('Status diperbarui')} />
                      <div><strong>{item.task}</strong>{item.blocker && <div className="blocker-callout"><AlertTriangle size={12} /><span>{item.blocker}</span></div>}</div>
                    </div>
                    <span><span className={`priority-pill ${item.priority.toLowerCase()}`}>{item.priority}</span></span>
                    <span className="owner"><i>{item.owner}</i>{item.name}</span>
                    <span className={`due ${item.tone}`}>{item.due}</span>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ═══════════ FOLLOW-UP ═══════════ */}
          {active === 'Follow-up' && (
            <div className="animate-fade">
              <section className="welcome"><div><p className="eyebrow">RADAR TINDAK LANJUT</p><h1>Follow-up & Blocker</h1><p>Identifikasi hambatan eksekusi keputusan tim.</p></div></section>
              <section className="panel">
                <div className="panel-head"><div><h2>Tugas terhambat & tertunda</h2></div></div>
                {actionItems.filter(a => a.status === 'Blocked' || a.tone === 'urgent').map(item => (
                  <div className="outcome action-row" key={item.id} style={{ marginBottom: 4 }}>
                    <span><AlertTriangle size={16} /></span>
                    <div>
                      <small>{item.status === 'Blocked' ? 'BLOCKED' : 'OVERDUE'} — {item.priority}</small>
                      <strong>{item.task}</strong>
                      {item.blocker && <p style={{ color: '#991b1b', marginTop: 4 }}><strong>Hambatan:</strong> {item.blocker}</p>}
                      <p className="outcome-meta" style={{ marginTop: 6 }}><i>{item.owner}</i> {item.name} — Tenggat: <b>{item.due}</b></p>
                    </div>
                    {role !== 'Viewer' && item.status === 'Blocked' && <button className="btn-secondary" onClick={() => showToast('Blocker ditandai selesai')}>Selesaikan</button>}
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ═══════════ AUDIT TRAIL ═══════════ */}
          {active === 'Audit Trail' && (
            <div className="animate-fade">
              <section className="welcome"><div><p className="eyebrow">TRANSPARANSI</p><h1>Audit Trail</h1><p>Jejak audit append-only untuk seluruh aktivitas penting workspace.</p></div></section>
              <section className="panel">
                <div className="panel-head"><div><h2>Riwayat aktivitas</h2></div></div>
                <div className="task-header"><span>WAKTU</span><span>AKTOR</span><span>KEJADIAN</span><span>STATUS</span></div>
                {auditLogs.map((log, i) => (
                  <div className="task-row" key={i}>
                    <span style={{ fontSize: 9, color: '#95a09d' }}>{log.time}</span>
                    <span><strong>{log.actor}</strong></span>
                    <span>{log.action}</span>
                    <span className="due completed">Processed</span>
                  </div>
                ))}
              </section>
            </div>
          )}

        </div>
      </main>

      {/* ── MODALS ────────────────────────────── */}
      {modal === 'meeting' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-head"><div><p className="eyebrow">MEETING BARU</p><h2>Jadwalkan meeting</h2><p>Siapkan konteks dan agenda agar waktu tim tetap terarah.</p></div><button className="modal-close" onClick={() => setModal(null)}>×</button></div>
            <form onSubmit={e => { e.preventDefault(); setModal(null); showToast('Meeting berhasil dijadwalkan!'); }}>
              <label className="field full"><span>Nama meeting</span><input required placeholder="Contoh: Weekly Product Sync" /></label>
              <label className="field full"><span>Tujuan meeting</span><textarea required rows={2} placeholder="Apa hasil yang ingin dicapai?" /></label>
              <div className="form-grid">
                <label className="field"><span>Tanggal</span><input required type="date" /></label>
                <label className="field"><span>Waktu</span><input required type="time" /></label>
              </div>
              <label className="field full"><span>Agenda awal</span><input placeholder="Topik utama yang akan dibahas" /></label>
              <div className="modal-actions"><button type="button" className="cancel" onClick={() => setModal(null)}>Batal</button><button type="submit" className="submit">Jadwalkan meeting <span>→</span></button></div>
            </form>
          </div>
        </div>
      )}

      {modal === 'decision' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-head"><div><p className="eyebrow">KEPUTUSAN BARU</p><h2>Rumuskan keputusan</h2><p>Catat keputusan beserta alasan di baliknya.</p></div><button className="modal-close" onClick={() => setModal(null)}>×</button></div>
            <form onSubmit={e => { e.preventDefault(); setModal(null); showToast('Keputusan berhasil diajukan!'); }}>
              <label className="field full"><span>Pernyataan keputusan</span><input required placeholder="Contoh: Menggunakan Session Cookie HttpOnly" /></label>
              <label className="field full"><span>Rationale (alasan & pertimbangan)</span><textarea required rows={3} placeholder="Jelaskan alasan dan pertimbangan..." /></label>
              <div className="modal-actions"><button type="button" className="cancel" onClick={() => setModal(null)}>Batal</button><button type="submit" className="submit">Ajukan keputusan <span>→</span></button></div>
            </form>
          </div>
        </div>
      )}

      {modal === 'action' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-head"><div><p className="eyebrow">ACTION ITEM BARU</p><h2>Buat tindak lanjut</h2><p>Tugaskan ke anggota tim dengan tenggat yang jelas.</p></div><button className="modal-close" onClick={() => setModal(null)}>×</button></div>
            <form onSubmit={e => { e.preventDefault(); setModal(null); showToast('Action item berhasil ditugaskan!'); }}>
              <label className="field full"><span>Deskripsi tugas</span><input required placeholder="Contoh: Implementasi Guard RBAC di NestJS" /></label>
              <div className="form-grid">
                <label className="field"><span>Penanggung jawab</span><select defaultValue="Andika Pratama"><option>Andika Pratama</option><option>Sarah Jenkins</option><option>Budi Santoso</option><option>Rina Wijaya</option></select></label>
                <label className="field"><span>Prioritas</span><select defaultValue="High"><option>Urgent</option><option>High</option><option>Medium</option></select></label>
              </div>
              <label className="field full"><span>Tenggat waktu</span><input type="date" required /></label>
              <div className="modal-actions"><button type="button" className="cancel" onClick={() => setModal(null)}>Batal</button><button type="submit" className="submit">Simpan & tugaskan <span>→</span></button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
