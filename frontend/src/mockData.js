export const initialWorkspaces = [
  { id: 'ws1', name: 'Acme Product & Engineering', membersCount: 14, plan: 'Enterprise Pro', active: true },
  { id: 'ws2', name: 'Strategic Growth & Operations', membersCount: 8, plan: 'Team', active: false }
];

export const initialCurrentUser = {
  id: 'u1',
  name: 'Andika Pratama',
  role: 'Meeting Organizer',
  email: 'andika.pratama@meetmanage.io',
  avatar: 'AP',
  avatarColor: '#6366F1'
};

export const initialMeetings = [
  {
    id: 'm-101',
    title: 'Q3 Architecture Sprint & Decision Sync',
    workspaceId: 'ws1',
    description: 'Finalisasi migrasi modular monolith, mekanisme outbox BullMQ, dan validasi RBAC workspace-level.',
    date: 'Hari ini, 14:00 - 15:30 WIB',
    status: 'In Progress', // Draft, Scheduled, In Progress, Completed, Cancelled
    location: 'Google Meet: meet.google.com/xyz-meet-sync',
    organizer: 'Andika Pratama',
    participants: [
      { id: 'u1', name: 'Andika Pratama', role: 'Organizer', avatar: 'AP', color: '#6366F1', present: true },
      { id: 'u2', name: 'Sarah Jenkins', role: 'Lead Architect', avatar: 'SJ', color: '#8B5CF6', present: true },
      { id: 'u3', name: 'Budi Santoso', role: 'Backend Engineer', avatar: 'BS', color: '#06B6D4', present: true },
      { id: 'u4', name: 'Rina Wijaya', role: 'DevOps Specialist', avatar: 'RW', color: '#EC4899', present: false }
    ],
    agenda: [
      {
        id: 'ag-1',
        title: 'Review Database Indexing & Prisma Transactions',
        duration: '20 min',
        status: 'Completed',
        notes: 'Disepakati: index pada workspace_id, due_date, dan assignee_id wajib ada di schema Prisma awal.'
      },
      {
        id: 'ag-2',
        title: 'Transactional Outbox & BullMQ Reliability Pattern',
        duration: '35 min',
        status: 'In Progress',
        notes: 'Pola outbox: tulis ke postgres dan outbox_events dalam 1 transaksi atomik. BullMQ worker memproses retry dengan idempotency.'
      },
      {
        id: 'ag-3',
        title: 'RBAC Authorization Guard & Multi-tenant Isolation',
        duration: '25 min',
        status: 'Pending',
        notes: 'Pencegahan IDOR dan akses lintas workspace dengan otorisasi ketat di level NestJS controller guards.'
      }
    ],
    decisions: [
      {
        id: 'dec-1',
        title: 'Implementasi Modular Monolith dengan Process Worker Terpisah',
        rationale: 'Microservices menambah kompleksitas distributed tracing dan overhead jaringan di tahap MVP. Modular monolith menjaga batas modul domain tanpa beban deployment berlebih.',
        status: 'Approved', // Draft, Proposed, Approved, Superseded
        approvedBy: 'Sarah Jenkins (Lead Architect)',
        approvedAt: 'Hari ini, 14:25 WIB',
        version: 2,
        agendaTitle: 'Transactional Outbox & BullMQ Reliability Pattern',
        actionItemCount: 2
      },
      {
        id: 'dec-2',
        title: 'Session Cookie HttpOnly + CSRF Protection untuk Web First-Party',
        rationale: 'Menyimpan token JWT di localStorage memiliki celah keamanan XSS. Session cookie dengan HttpOnly + Secure + SameSite memberikan proteksi yang jauh lebih kuat.',
        status: 'Proposed',
        approvedBy: null,
        approvedAt: null,
        version: 1,
        agendaTitle: 'RBAC Authorization Guard & Multi-tenant Isolation',
        actionItemCount: 1
      }
    ],
    actionItems: [
      {
        id: 'act-1',
        title: 'Buat Prisma migration untuk tabel outbox_events dan audit_logs',
        assignee: 'Budi Santoso',
        assigneeAvatar: 'BS',
        priority: 'High',
        dueDate: '2026-10-15',
        status: 'In Progress', // Open, In Progress, Blocked, Completed
        decisionId: 'dec-1',
        decisionTitle: 'Modular Monolith & Outbox',
        isOverdue: false,
        blockerNote: null
      },
      {
        id: 'act-2',
        title: 'Konfigurasi Redis BullMQ retry backoff & worker heartbeat',
        assignee: 'Rina Wijaya',
        assigneeAvatar: 'RW',
        priority: 'Urgent',
        dueDate: '2026-10-11',
        status: 'Blocked',
        decisionId: 'dec-1',
        decisionTitle: 'Modular Monolith & Outbox',
        isOverdue: true,
        blockerNote: 'Terkendala akses VPC ke Redis cluster staging dari penyedia cloud.'
      },
      {
        id: 'act-3',
        title: 'Setup NestJS Guard untuk validasi keanggotaan workspace',
        assignee: 'Andika Pratama',
        assigneeAvatar: 'AP',
        priority: 'Medium',
        dueDate: '2026-10-18',
        status: 'Open',
        decisionId: 'dec-2',
        decisionTitle: 'Session Cookie & RBAC Guard',
        isOverdue: false,
        blockerNote: null
      }
    ],
    auditTrail: [
      { id: 'aud-1', time: '14:25 WIB', actor: 'Sarah Jenkins', action: 'DECISION_APPROVED', details: 'Menyetujui keputusan Modular Monolith (v2)' },
      { id: 'aud-2', time: '14:15 WIB', actor: 'Andika Pratama', action: 'AGENDA_STATUS_CHANGED', details: 'Mengubah status agenda Review Database Indexing ke Completed' },
      { id: 'aud-3', time: '14:00 WIB', actor: 'Andika Pratama', action: 'MEETING_STATUS_CHANGED', details: 'Memulai rapat: Scheduled -> In Progress' }
    ]
  },
  {
    id: 'm-102',
    title: 'Sprint Retrospective & Action Follow-up #14',
    workspaceId: 'ws1',
    description: 'Evaluasi ketepatan waktu penyelesaian action items sprint sebelumnya dan pemetaan hambatan tim.',
    date: 'Besok, 10:00 - 11:00 WIB',
    status: 'Scheduled',
    location: 'Meeting Room Berlin & Google Meet',
    organizer: 'Sarah Jenkins',
    participants: [
      { id: 'u1', name: 'Andika Pratama', role: 'Member', avatar: 'AP', color: '#6366F1', present: true },
      { id: 'u2', name: 'Sarah Jenkins', role: 'Organizer', avatar: 'SJ', color: '#8B5CF6', present: true },
      { id: 'u3', name: 'Budi Santoso', role: 'Member', avatar: 'BS', color: '#06B6D4', present: false }
    ],
    agenda: [
      { id: 'ag-21', title: 'Analisis Tugas Overdue & Root Cause', duration: '30 min', status: 'Pending', notes: '' },
      { id: 'ag-22', title: 'Penyusunan Action Plan Mitigasi', duration: '30 min', status: 'Pending', notes: '' }
    ],
    decisions: [],
    actionItems: [
      {
        id: 'act-4',
        title: 'Audit log indexing performance benchmark',
        assignee: 'Budi Santoso',
        assigneeAvatar: 'BS',
        priority: 'High',
        dueDate: '2026-10-10',
        status: 'Blocked',
        decisionId: null,
        decisionTitle: 'Retro Sprint #13',
        isOverdue: true,
        blockerNote: 'Perlu dump dataset anonymized dari production replica.'
      }
    ],
    auditTrail: [
      { id: 'aud-4', time: 'Kemarin, 09:00 WIB', actor: 'Sarah Jenkins', action: 'MEETING_SCHEDULED', details: 'Membuat jadwal pertemuan Sprint Retrospective #14' }
    ]
  },
  {
    id: 'm-103',
    title: 'Product Roadmap Alignment & Launch Strategy Q4',
    workspaceId: 'ws1',
    description: 'Penetapan target rilis fitur Decision Management, Action Items follow-up, dan Audit Trail.',
    date: '10 Okt 2026, 15:00 - 16:30 WIB',
    status: 'Completed',
    location: 'HQ Boardroom',
    organizer: 'Andika Pratama',
    participants: [
      { id: 'u1', name: 'Andika Pratama', role: 'Organizer', avatar: 'AP', color: '#6366F1', present: true },
      { id: 'u2', name: 'Sarah Jenkins', role: 'Lead Architect', avatar: 'SJ', color: '#8B5CF6', present: true }
    ],
    agenda: [
      { id: 'ag-31', title: 'Review Target MVP Scope vs Post-MVP', duration: '40 min', status: 'Completed', notes: 'Fitur AI summary dan video call native di-hold untuk post-MVP.' }
    ],
    decisions: [
      {
        id: 'dec-3',
        title: 'Fokus MVP: Core Meeting Lifecycle, Decisions, dan Action Item Accountability',
        rationale: 'Fokus pada problem utama: memastikan setiap keputusan meeting memiliki rationale dan penanggung jawab yang terlacak.',
        status: 'Approved',
        approvedBy: 'Andika Pratama',
        approvedAt: '10 Okt 2026, 16:15 WIB',
        version: 1,
        agendaTitle: 'Review Target MVP Scope',
        actionItemCount: 3
      }
    ],
    actionItems: [
      {
        id: 'act-5',
        title: 'Rilis Dokumen PRD v1 dan UI Flow Prototype',
        assignee: 'Andika Pratama',
        assigneeAvatar: 'AP',
        priority: 'Urgent',
        dueDate: '2026-10-12',
        status: 'Completed',
        decisionId: 'dec-3',
        decisionTitle: 'Fokus MVP Core Lifecycle',
        isOverdue: false,
        blockerNote: null
      }
    ],
    auditTrail: [
      { id: 'aud-5', time: '10 Okt 2026, 16:30 WIB', actor: 'Andika Pratama', action: 'MEETING_COMPLETED', details: 'Menutup rapat dan mendistribusikan notulen keputusan' }
    ]
  }
];

export const globalAuditLogs = [
  { id: 'log-101', timestamp: 'Hari ini, 14:25:12 WIB', actor: 'Sarah Jenkins', role: 'Lead Architect', action: 'DECISION_APPROVED', entity: 'Decision #dec-1', details: 'Menyetujui keputusan Modular Monolith dengan Background Worker (v2)', outboxStatus: 'PROCESSED' },
  { id: 'log-102', timestamp: 'Hari ini, 14:15:04 WIB', actor: 'Andika Pratama', role: 'Organizer', action: 'AGENDA_COMPLETED', entity: 'Agenda #ag-1', details: 'Menandai pembahasan Database Indexing selesai', outboxStatus: 'PROCESSED' },
  { id: 'log-103', timestamp: 'Hari ini, 14:00:20 WIB', actor: 'Andika Pratama', role: 'Organizer', action: 'MEETING_STARTED', entity: 'Meeting #m-101', details: 'Memulai sesi rapat secara langsung (In Progress)', outboxStatus: 'PROCESSED' },
  { id: 'log-104', timestamp: 'Kemarin, 16:42:10 WIB', actor: 'Rina Wijaya', role: 'DevOps Specialist', action: 'ACTION_BLOCKED', entity: 'Action #act-2', details: 'Menandai status tugas Blocked: Terkendala akses VPC Redis', outboxStatus: 'PROCESSED' },
  { id: 'log-105', timestamp: '10 Okt 2026, 16:30:00 WIB', actor: 'Andika Pratama', role: 'Organizer', action: 'MEETING_COMPLETED', entity: 'Meeting #m-103', details: 'Menyelesaikan sesi rapat Product Roadmap Alignment Q4', outboxStatus: 'PROCESSED' }
];
