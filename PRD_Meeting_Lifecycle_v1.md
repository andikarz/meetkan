import os
import pypandoc


markdown = r"""# Product Requirements Document (PRD)
# MeetManage — Meeting Lifecycle & Decision Management Platform


# 1. Ringkasan Eksekutif

MeetManage adalah platform untuk mengelola siklus hidup meeting dari perencanaan hingga tindak lanjut keputusan. Produk ini tidak hanya menyimpan kalender atau notulen, tetapi menghubungkan agenda, catatan diskusi, keputusan, action items, penanggung jawab, tenggat waktu, dan riwayat aktivitas.

Alur inti:

**Meeting → Agenda → Discussion/Minutes → Decision → Action Items → Follow-up → Completion**

Tujuan utamanya adalah memastikan keputusan dapat ditelusuri, setiap tindakan memiliki penanggung jawab, progres dapat dipantau, dan aktivitas penting tercatat secara transparan.

## 1.1 Tujuan Produk

- Mengelola meeting dalam satu workspace.
- Menautkan agenda dan catatan ke keputusan yang dihasilkan.
- Mengubah keputusan menjadi action items dengan pemilik dan tenggat.
- Memantau progres, hambatan, dan tugas yang terlambat.
- Menyediakan audit trail untuk perubahan penting.
- Mengontrol akses berdasarkan role dan keanggotaan workspace.
- Menyediakan dashboard dan laporan tindak lanjut.

## 1.2 Problem Statement

Informasi meeting sering tersebar di kalender, dokumen, chat, dan spreadsheet. Akibatnya, keputusan sulit ditelusuri, penanggung jawab tidak jelas, action items terlupakan, dan organisasi kesulitan mengetahui apakah keputusan benar-benar dilaksanakan.

MeetManage menyatukan proses tersebut dengan menghubungkan konteks meeting, keputusan, tugas, dan riwayat aktivitas.

## 1.3 Target Pengguna

- **Owner:** mengelola workspace dan pengaturan tingkat organisasi.
- **Admin:** mengelola anggota, role, dan konfigurasi workspace.
- **Meeting Organizer:** membuat meeting, mengatur agenda, mencatat keputusan, dan mengelola tindak lanjut.
- **Member:** berpartisipasi dalam meeting serta mengelola action items yang ditugaskan.
- **Viewer:** membaca informasi yang diizinkan tanpa melakukan perubahan.

---

# 2. Ruang Lingkup

## 2.1 Termasuk dalam MVP

- Autentikasi dan pengelolaan session.
- Workspace, anggota, dan role.
- Meeting, jadwal, peserta, dan status.
- Agenda dan catatan diskusi.
- Keputusan, alasan, persetujuan, dan riwayat revisi.
- Action items, assignee, prioritas, tenggat, dan status.
- Follow-up, blocker, dan penandaan overdue.
- Audit trail untuk aktivitas penting.
- Notifikasi in-app dan email dasar.
- Dashboard, pencarian, dan laporan ringkas.
- Deployment Docker dan dokumentasi teknis.

## 2.2 Di Luar MVP

- Video conferencing bawaan.
- Transkripsi dan ringkasan meeting berbasis AI.
- Integrasi mendalam dengan seluruh kalender eksternal.
- Aplikasi mobile native.
- Microservices sejak hari pertama.
- Analytics warehouse khusus.
- Workflow approval yang dapat dikonfigurasi secara bebas oleh pengguna.

Fitur di luar MVP dapat dipertimbangkan setelah alur utama stabil dan kebutuhan pengguna terukur.

---

# 3. Persona dan Kebutuhan Pengguna

| Persona | Kebutuhan utama |
|---|---|
| Owner | Melihat aktivitas workspace, pengaturan, dan akuntabilitas |
| Admin | Mengelola anggota, role, dan akses |
| Meeting Organizer | Menyiapkan meeting, agenda, keputusan, dan tindak lanjut |
| Member | Mengetahui tugas, tenggat, dan progresnya |
| Viewer | Membaca meeting atau keputusan yang diizinkan |

## 3.1 Prinsip Produk

1. **Traceability:** keputusan harus dapat ditelusuri ke meeting dan konteks pembahasannya.
2. **Accountability:** setiap action item memiliki penanggung jawab dan status yang jelas.
3. **Least privilege:** pengguna hanya memperoleh akses yang diperlukan.
4. **Auditability:** perubahan penting harus memiliki jejak aktivitas.
5. **Workflow clarity:** status dan transisi harus jelas bagi pengguna.

---

# 4. Functional Requirements

## 4.1 Authentication dan Workspace

- Pengguna dapat login dan logout.
- Sistem menyediakan session yang aman untuk aplikasi web.
- Pengguna dapat menjadi anggota satu atau lebih workspace.
- Admin dapat mengundang atau menonaktifkan anggota sesuai kebijakan produk.
- Role dan keanggotaan workspace menentukan akses.
- Permintaan terhadap resource harus diperiksa berdasarkan workspace dan izin pengguna.

## 4.2 Meeting Management

- Organizer dapat membuat, melihat, memperbarui, dan membatalkan meeting.
- Meeting memiliki judul, deskripsi, waktu mulai dan selesai, lokasi atau tautan, organizer, peserta, dan status.
- Meeting dapat memiliki agenda dan catatan.
- Meeting memiliki status lifecycle yang divalidasi di backend.
- Peserta dapat melihat meeting sesuai izin.
- Perubahan jadwal atau status penting dicatat di audit trail.

## 4.3 Agenda dan Meeting Minutes

- Organizer dapat menambahkan, mengubah urutan, dan menghapus agenda sesuai aturan.
- Agenda memiliki judul, deskripsi, urutan, dan status pembahasan.
- Catatan diskusi dapat dikaitkan dengan agenda.
- Catatan dapat menjadi konteks atau sumber bagi keputusan.
- Perubahan penting pada catatan dapat dicatat sesuai kebijakan audit.

## 4.4 Decision Management

- Pengguna berizin dapat mencatat keputusan.
- Keputusan memiliki judul, deskripsi, rationale, status, waktu, pembuat, dan referensi ke meeting atau agenda.
- Keputusan dapat memerlukan persetujuan sesuai aturan produk.
- Keputusan yang disetujui tidak boleh diubah diam-diam.
- Perubahan keputusan membuat riwayat revisi atau versi.
- Keputusan dapat memiliki satu atau lebih action items.
- Pengguna dapat menelusuri meeting dan agenda asal keputusan.

## 4.5 Action Items

- Action item memiliki judul, deskripsi, assignee, pembuat, prioritas, tenggat, status, dan relasi ke keputusan atau meeting.
- Pengguna berizin dapat memperbarui progres.
- Status awal: `Open`, `In Progress`, `Blocked`, atau `Completed`.
- Perubahan status yang tidak diizinkan harus ditolak.
- Sistem dapat menandai item yang melewati tenggat sebagai overdue.
- Perubahan penting menyimpan aktor dan timestamp.
- Action item dapat memiliki komentar atau pembaruan progres bila diaktifkan dalam MVP.

## 4.6 Follow-up

- Organizer dapat meninjau action items yang belum selesai.
- Sistem menampilkan tugas terlambat dan tugas yang mendekati tenggat.
- Pengguna dapat mencatat hambatan dan pembaruan progres.
- Follow-up dapat ditautkan ke meeting atau keputusan asal.
- Dashboard dapat menunjukkan item yang membutuhkan perhatian.

## 4.7 Notifications

- Sistem mengirim notifikasi untuk undangan meeting, perubahan jadwal, penugasan action item, dan tenggat yang relevan.
- Notifikasi dapat dikirim secara asynchronous.
- Kegagalan pengiriman dapat di-retry.
- Sistem harus mencegah pengiriman duplikat yang tidak terkendali.
- Notifikasi in-app dan email dapat memiliki status pengiriman.

## 4.8 Audit Trail

Audit event dapat mencatat aktor, timestamp, workspace, jenis tindakan, jenis dan ID resource, ringkasan perubahan, serta correlation/request ID jika tersedia.

Audit log bersifat append-only melalui jalur aplikasi dan tidak dapat diubah pengguna biasa. Jangan menyimpan password, token, session cookie, atau informasi sensitif berlebihan ke dalam log.

## 4.9 Dashboard, Search, dan Reports

Dashboard menampilkan meeting mendatang/terbaru, keputusan terbaru, action items berdasarkan status, tugas overdue, tugas pengguna, dan ringkasan penyelesaian workspace.

Pencarian awal dapat menggunakan PostgreSQL. Search engine terpisah hanya dipertimbangkan jika volume dan kebutuhan fitur menuntutnya.

---

# 5. Workflow dan Status

## 5.1 Meeting Lifecycle

Contoh lifecycle meeting:

`Draft → Scheduled → In Progress → Completed`

Meeting juga dapat dibatalkan sesuai aturan. Transisi status divalidasi di backend.

## 5.2 Decision Lifecycle

Contoh status keputusan:

`Draft → Proposed → Approved`

Status tambahan seperti `Rejected`, `Superseded`, atau `Archived` dapat digunakan sesuai kebutuhan. Keputusan yang sudah disetujui tidak boleh diedit tanpa jejak revisi.

## 5.3 Action Item Lifecycle

`Open → In Progress → Blocked → In Progress → Completed`

Transisi yang diizinkan ditentukan oleh aturan domain. Sistem harus menolak transisi ilegal dan mencatat perubahan yang relevan.

## 5.4 Aturan Umum Workflow

- Validasi status dan transisi dilakukan di backend.
- Otorisasi diperiksa sebelum perubahan.
- Setiap perubahan penting memiliki aktor dan timestamp.
- Perubahan status tidak menghapus histori sebelumnya.
- Status overdue dapat dihitung dari tenggat dan status item, bukan semata-mata transisi manual.

---

# 6. Roles dan Authorization

| Role | Hak akses tingkat tinggi |
|---|---|
| Owner | Mengelola workspace dan konfigurasi yang diizinkan |
| Admin | Mengelola anggota, role, dan konfigurasi operasional |
| Meeting Organizer | Mengelola meeting yang menjadi tanggung jawabnya sesuai izin |
| Member | Berpartisipasi dan mengelola action item yang dapat diakses |
| Viewer | Membaca resource yang diizinkan |

Otorisasi final harus menggabungkan role, membership workspace, kepemilikan atau penugasan resource, dan aturan bisnis.

Menyembunyikan tombol di frontend bukan kontrol keamanan. Setiap endpoint harus memeriksa izin dan akses terhadap resource yang diminta.

---

# 7. Domain Model dan Data Utama

Entitas inti:

- `users`
- `workspaces`
- `workspace_members`
- `meetings`
- `meeting_participants`
- `agenda_items`
- `meeting_notes`
- `decisions`
- `decision_versions`
- `action_items`
- `action_item_updates`
- `notifications`
- `audit_logs`
- `outbox_events`

## 7.1 Relasi Konseptual

- Satu workspace memiliki banyak anggota dan meeting.
- Satu meeting memiliki organizer, peserta, agenda, dan catatan.
- Satu meeting dapat menghasilkan beberapa keputusan.
- Satu keputusan dapat menghasilkan beberapa action items.
- Satu action item memiliki assignee dan dapat memiliki beberapa pembaruan progres.
- Aktivitas penting menghasilkan audit event.
- Event asynchronous dicatat di outbox dalam transaksi yang sama dengan perubahan bisnis terkait.

## 7.2 Database

Gunakan PostgreSQL sebagai sumber kebenaran utama. Prisma digunakan untuk schema, migration, query bertipe, dan transaksi.

Indeks awal dapat dipertimbangkan untuk `workspace_id`, `meeting_id`, `status`, `assignee_id`, `due_date`, dan timestamp yang digunakan untuk sorting. Indeks final ditentukan berdasarkan query aktual dan pengukuran.

---

# 8. API Design

Gunakan REST API dengan dokumentasi OpenAPI/Swagger.

| Method | Endpoint | Tujuan |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Login |
| `POST` | `/api/v1/auth/logout` | Logout |
| `GET` | `/api/v1/workspaces` | Daftar workspace pengguna |
| `GET` | `/api/v1/workspaces/:workspaceId/meetings` | Daftar meeting |
| `POST` | `/api/v1/workspaces/:workspaceId/meetings` | Membuat meeting |
| `GET` | `/api/v1/meetings/:meetingId` | Detail meeting |
| `POST` | `/api/v1/meetings/:meetingId/decisions` | Membuat keputusan |
| `POST` | `/api/v1/decisions/:decisionId/approve` | Menyetujui keputusan |
| `POST` | `/api/v1/decisions/:decisionId/action-items` | Membuat action item |
| `PATCH` | `/api/v1/action-items/:actionItemId` | Memperbarui action item |
| `GET` | `/api/v1/notifications` | Daftar notifikasi |
| `GET` | `/api/v1/audit-logs` | Audit log sesuai izin |

Implementasi harus menerapkan validasi input, otorisasi, pagination untuk daftar besar, format error konsisten, dan transaksi sesuai aturan bisnis.

---

# 9. Keputusan Arsitektur

## 9.1 Arsitektur Utama: Modular Monolith

Gunakan **Modular Monolith dengan background worker terpisah**. Sistem dimulai dengan satu backend codebase yang memiliki modul domain dan batas tanggung jawab jelas. Worker dijalankan sebagai proses/container terpisah, tetapi dapat memakai service dan modul dari codebase backend yang sama.

Microservices bukan target MVP.

### Alasan

- Transaksi bisnis lebih sederhana.
- Beban deployment dan networking lebih rendah.
- Tidak perlu mengelola distributed tracing dan konsistensi antarservice sejak awal.
- Batas modul tetap memungkinkan ekstraksi layanan di masa depan.
- Cocok untuk tim kecil dan deployment awal di VPS.

### Gambaran Arsitektur

```text
Browser
   |
   | HTTPS
   v
Nginx reverse proxy
   |-----------------------------|
   v                             v
React SPA (Vite)             NestJS REST API
                                  |
                    +-------------+-------------+
                    |             |             |
                    v             v             v
               PostgreSQL       Redis      Object Storage
               source of truth  job queue   (opsional)
                                  ^
                                  |
                           Background Worker
                           (BullMQ processor)

Deployment: Docker Compose
PostgreSQL dan Redis hanya dapat diakses melalui jaringan internal.
```

### Batas Arsitektur

- Frontend berkomunikasi dengan backend melalui REST API.
- Modul domain tidak mengakses tabel modul lain secara sembarangan; gunakan service internal yang eksplisit.
- PostgreSQL adalah sumber kebenaran utama.
- Redis digunakan untuk queue dan cache yang memang diperlukan, bukan penyimpanan utama data bisnis.
- Request API tidak menunggu email atau reminder dikirim.
- Hindari abstraksi yang belum dibutuhkan.

---

# 10. Tech Stack yang Dipilih

| Lapisan | Teknologi | Penggunaan |
|---|---|---|
| Frontend | **React + TypeScript + Vite** | Single-page application, UI dan routing client-side |
| Routing | React Router | Navigasi halaman dan route guards berbasis UI |
| UI | Tailwind CSS + shadcn/ui (komponen yang kompatibel dengan React/Vite) | Design system, form, dialog, tabel, navigasi |
| Client/server state | TanStack Query | Fetching, caching, invalidation, loading/error states |
| Form | React Hook Form + Zod | Form dan validasi client-side |
| Backend | NestJS + TypeScript | REST API, dependency injection, modul, guards |
| Database | PostgreSQL | Data relasional, transaksi, indeks, pencarian awal |
| ORM | Prisma | Schema, migration, query bertipe, transaksi |
| Background jobs | Redis + BullMQ | Reminder, notifikasi, retry, pekerjaan terjadwal |
| Testing frontend | Vitest + React Testing Library | Unit/component tests |
| Testing backend | Jest + Supertest | Unit test dan integration/API test |
| E2E testing | Playwright | Uji alur end-to-end browser |
| API docs | OpenAPI/Swagger | Kontrak dan dokumentasi API |
| Deployment | Docker Compose + Nginx | Container, reverse proxy, HTTPS |

### Catatan Frontend React + Vite

- React dipakai untuk membangun UI; Vite dipakai untuk development server dan build.
- Aplikasi MVP berupa SPA, sehingga tidak membutuhkan server-side rendering dari Next.js.
- React Router mengatur halaman seperti Dashboard, Meetings, Decisions, Action Items, Reports, dan Settings.
- TanStack Query mengelola server state; hindari menduplikasi cache API ke global state tanpa alasan.
- Gunakan Zod untuk validasi form di client, tetapi backend tetap wajib memvalidasi semua input.
- Untuk komponen shadcn/ui, ikuti panduan setup yang mendukung Vite dan pastikan versi komponen kompatibel.
- Karena SPA tidak melakukan SSR, siapkan fallback routing Nginx agar refresh pada URL client-side tetap menyajikan `index.html`.
- Jangan menyimpan session identifier atau token autentikasi sensitif di `localStorage`.

### Kebijakan Dependency

- Kunci versi dependency melalui lockfile.
- Jangan mengandalkan versi floating di production.
- Upgrade dependency secara terencana dan jalankan test serta build sebelum deploy.

---

# 11. Struktur Repository dan Modul Backend

Contoh struktur repository:

```text
meetmanage/
  apps/
    web/                  # React + Vite SPA
    api/                  # NestJS REST API
    worker/               # BullMQ processor entry point
  packages/
    contracts/            # Shared API schemas/types jika diperlukan
    config/               # Shared lint/TypeScript config
  docker/
  compose.yaml
  .env.example
  README.md
```

Contoh struktur frontend:

```text
apps/web/src/
  app/                    # App bootstrap dan provider
  routes/                 # React Router route definitions
  layouts/                # App layout dan sidebar
  features/
    auth/
    dashboard/
    meetings/
    agenda/
    decisions/
    action-items/
    follow-ups/
    notifications/
    reports/
    settings/
  components/
    ui/
    shared/
  lib/
    api-client.ts
    query-client.ts
    utils.ts
  hooks/
  types/
```

Contoh struktur internal modul backend:

```text
meetings/
  meetings.module.ts
  meetings.controller.ts   # HTTP layer
  meetings.service.ts      # Use cases dan business rules
  meetings.repository.ts   # Data access
  dto/
  policies/
  tests/
```

Tidak semua modul harus memiliki semua file. Tambahkan lapisan khusus saat ada tanggung jawab nyata yang perlu dipisahkan.

## 11.1 Modul Domain

- `auth`: identitas, login, logout, session.
- `workspaces`: organisasi, tim, membership.
- `meetings`: jadwal, peserta, status.
- `agenda` dan `minutes`: agenda dan catatan diskusi.
- `decisions`: keputusan, approval, rationale, versi/revisi.
- `action-items` dan `follow-ups`: assignee, tenggat, progres, blocker.
- `notifications`: notifikasi in-app dan email.
- `audit`: pencatatan aktivitas penting.
- `reports`: statistik dan ringkasan operasional.

---

# 12. Authentication, Authorization, dan Keamanan

## 12.1 Authentication

Gunakan session berbasis cookie untuk web app first-party.

Cookie session harus dikonfigurasi dengan:

- `HttpOnly`
- `Secure` pada production
- `SameSite` sesuai pola aplikasi

Session dikelola dan divalidasi di server. Terapkan perlindungan CSRF sesuai pola request dan konfigurasi cookie.

JWT tidak diwajibkan hanya karena backend menggunakan REST API. Pilihan autentikasi dapat dievaluasi ulang jika aplikasi membutuhkan mobile client atau integrasi pihak ketiga.

## 12.2 Authorization

Gabungkan RBAC dengan pemeriksaan membership workspace dan akses ke resource spesifik. Role baseline: Owner, Admin, Meeting Organizer, Member, dan Viewer.

Setiap endpoint dan resource harus memeriksa izin. Jangan mengandalkan kontrol UI frontend sebagai satu-satunya lapisan keamanan.

## 12.3 Security Baseline

- Validasi input di server.
- Gunakan query terparameterisasi atau ORM.
- Terapkan rate limiting pada login dan endpoint yang rentan disalahgunakan.
- Simpan secret di environment atau secret management, bukan di Git atau image.
- Batasi CORS, ukuran upload, tipe file, dan akses attachment.
- Gunakan HTTPS, security headers, dan database user dengan least privilege.
- Siapkan backup terenkripsi bila memungkinkan.
- Jangan mencatat password, session cookie, token, atau konten privat berlebihan ke log.

---

# 13. Audit Trail, State Transition, dan Reliable Events

## 13.1 Audit Trail

Audit event mencatat aktor, timestamp, workspace, action, resource type/ID, dan perubahan yang relevan.

Riwayat keputusan menyimpan versi, alasan perubahan, serta relasi ke meeting/agenda asal. Audit log bersifat append-only melalui jalur aplikasi dan tidak dapat diubah oleh pengguna biasa.

## 13.2 State Transition

Setiap status memiliki transisi yang diizinkan. Contoh action item:

`Open → In Progress → Blocked → In Progress → Completed`

Validasi transisi dan otorisasi dilakukan di backend. Perubahan status menyimpan aktor, waktu, dan komentar bila diperlukan. Keputusan yang disetujui tidak boleh diubah diam-diam.

## 13.3 Transactional Outbox

Untuk operasi penting, simpan perubahan bisnis, audit event, dan outbox event dalam satu transaksi PostgreSQL.

```text
Approve decision
  -> authorize + validate transition
  -> PostgreSQL transaction:
       update decision
       insert decision version / audit event
       insert outbox event
  -> commit
  -> worker processes outbox
  -> send notification with retry/idempotency
```

Worker membaca outbox lalu mengirim notifikasi atau menjalankan pekerjaan lanjutan.

Persyaratan worker:

- Retry dengan backoff.
- Idempotency atau deduplication.
- Status pemrosesan event.
- Monitoring job gagal.
- Prosedur recovery untuk event yang terus gagal.
- Pengiriman email eksternal tidak dilakukan di dalam transaksi database.

---

# 14. Background Jobs dan Notifications

Redis + BullMQ menangani:

- Reminder sebelum meeting.
- Notifikasi tenggat action item.
- Email undangan dan perubahan jadwal.
- Follow-up terjadwal.
- Pemrosesan outbox event.

Worker perlu memiliki mekanisme retry, idempotency, logging, dan monitoring. Kegagalan provider email tidak boleh menggagalkan penyimpanan keputusan atau action item.

---

# 15. Non-Functional Requirements

## 15.1 Security

- Otorisasi diterapkan di server pada setiap endpoint/resource.
- Tidak ada akses lintas workspace tanpa izin eksplisit.
- Secret tidak disimpan dalam source code.
- Koneksi publik menggunakan HTTPS.
- Database dan Redis tidak diekspos langsung ke internet.

## 15.2 Reliability

- Operasi bisnis penting memakai transaksi.
- Background job dapat di-retry dengan aman.
- Perubahan bisnis dan outbox event tersimpan secara atomik.
- Database memiliki backup dan prosedur restore yang diuji.

## 15.3 Maintainability

- Modul domain memiliki tanggung jawab jelas.
- API didokumentasikan menggunakan OpenAPI/Swagger.
- Migration database tersimpan di version control.
- Business rules diuji melalui unit dan integration tests.
- Dependency dikunci menggunakan lockfile.

## 15.4 Observability

- Structured logs.
- Request/correlation ID.
- Health/readiness checks.
- Monitoring error rate, latency, queue depth, job failures, dan kapasitas disk.
- Data sensitif diredaksi dari log.

---

# 16. Deployment dan Operasional

## 16.1 Container Production

Komponen minimum:

- `web` — hasil build React/Vite disajikan oleh web server statis atau container web.
- `api` — NestJS REST API.
- `worker` — BullMQ processor.
- `postgres`.
- `redis`.
- `nginx` — reverse proxy; dapat berjalan di host atau container, pilih satu pola yang konsisten.

Gunakan private Docker network untuk layanan internal. Hanya reverse proxy yang menerima koneksi publik.

## 16.2 React SPA dan Nginx

- Build frontend menghasilkan aset statis.
- Nginx menyajikan aset statis dan meneruskan request `/api` ke backend.
- Konfigurasikan SPA fallback ke `index.html` untuk URL React Router, tanpa mengubah penanganan asset dan API.
- API, PostgreSQL, dan Redis tidak boleh diekspos langsung kecuali ada kebutuhan yang dirancang secara eksplisit.
- Jika frontend dan API berada pada origin yang sama melalui reverse proxy, konfigurasi CORS dapat dibuat lebih sederhana.

## 16.3 Operasional Minimum

- Health/readiness checks untuk API dan worker.
- Structured logging.
- Persistent volumes untuk stateful service.
- Backup PostgreSQL terjadwal.
- Uji restore berkala ke lingkungan terpisah.
- Migration sebagai langkah deployment terkendali, bukan dijalankan otomatis oleh setiap replica saat startup.
- CI untuk lint, test, build, dan pemeriksaan migration.
- Pin versi image dan dependency.

## 16.4 File Attachment

Jika attachment dibutuhkan, metadata file disimpan di PostgreSQL dan file dapat disimpan di object storage yang kompatibel dengan S3. Jika attachment bukan prioritas MVP, fitur dapat ditunda. Hindari menyimpan file biner besar langsung di tabel bisnis.

---

# 17. UI/UX dan Halaman Utama

Halaman utama:

1. **Dashboard:** ringkasan meeting, keputusan terbaru, action items, dan overdue.
2. **Meetings:** daftar meeting, filter, jadwal, peserta, dan status.
3. **Meeting Detail:** overview, agenda, discussion/minutes, decisions, action items, files, dan activity.
4. **Calendar:** tampilan meeting berdasarkan waktu.
5. **My Tasks:** action items milik pengguna.
6. **Decisions:** daftar keputusan, status, rationale, dan riwayat.
7. **Action Items:** tabel tugas dengan assignee, prioritas, tenggat, dan status.
8. **Follow-ups:** tugas terlambat, blocker, dan progres.
9. **Reports:** statistik meeting dan penyelesaian tugas.
10. **Teams/Users/Settings:** pengelolaan workspace, anggota, role, dan konfigurasi.

Prinsip UI:

- Navigasi konsisten.
- Status dan prioritas mudah dibedakan.
- Tabel memiliki filter dan pagination bila diperlukan.
- Loading, empty, success, dan error state ditangani.
- Aksi sensitif meminta konfirmasi.
- Tampilan responsif dan aksesibel.

---

# 18. Testing dan Acceptance Criteria

## 18.1 Testing

- Unit test untuk aturan bisnis dan state transition.
- Integration test untuk database, transaksi, dan repository.
- API test untuk validasi dan otorisasi.
- Negative authorization test untuk akses lintas workspace.
- Test untuk retry/idempotency background worker.
- Component test untuk UI React.
- End-to-end test untuk alur meeting sampai action item selesai.

## 18.2 Acceptance Criteria Produk

- Pengguna dapat membuat meeting dan menambahkan peserta.
- Meeting dapat memiliki agenda dan catatan.
- Keputusan dapat ditautkan ke meeting dan agenda sumber.
- Keputusan dapat menghasilkan action items.
- Setiap action item memiliki assignee dan tenggat yang jelas.
- Pengguna dapat melihat progres dan tugas overdue.
- Perubahan penting dapat ditelusuri melalui audit trail.
- Pengguna tidak dapat membaca atau mengubah resource di luar izinnya.

## 18.3 Acceptance Criteria Teknis Tambahan

- Pengguna dari workspace lain tidak dapat membaca atau memodifikasi resource tanpa izin eksplisit.
- Endpoint memvalidasi input, otorisasi, dan transisi status di backend.
- Persetujuan keputusan dan audit/outbox event terkait tersimpan secara atomik.
- Kegagalan notifikasi dapat di-retry tanpa duplikasi yang tidak terkendali.
- Session cookie dikonfigurasi dengan aman di production dan alur CSRF diuji.
- Database dan Redis tidak memiliki port publik terbuka pada deployment production.
- Backup database dapat dipulihkan ke lingkungan uji dan hasilnya diverifikasi.
- Test mencakup aturan bisnis, permission negatif, transisi ilegal, dan alur end-to-end inti.
- Refresh pada URL React Router tetap bekerja setelah deployment SPA.
- Frontend build dan test berjalan pada CI.

---

# 19. Roadmap Implementasi

| Fase | Deliverable | Exit criteria |
|---|---|---|
| 1. Foundation | Monorepo, Compose, CI, PostgreSQL, Prisma migration, konfigurasi env, health checks, React/Vite bootstrap | Developer dapat menjalankan stack secara konsisten; migration dan build berhasil |
| 2. Identity & workspace | Login/session, logout, membership, RBAC, workspace authorization | Permission test positif dan negatif lolos |
| 3. Meeting lifecycle | Meeting, peserta, agenda, notes, status, halaman utama | Meeting dapat dibuat hingga ditutup dengan validasi status |
| 4. Decisions & audit | Decision, rationale, approval, revision history, audit log | Keputusan dapat ditelusuri dan revisi tidak menghapus histori |
| 5. Action items | Assignee, due date, priority, blocker, follow-up, overdue | Perubahan status tercatat dan follow-up terlihat |
| 6. Async processing | Redis/BullMQ, outbox, reminder, email/in-app notifications | Retry dan idempotency diuji saat worker/email gagal |
| 7. Production readiness | Rate limiting, structured logs, backup/restore, security review, deployment | HTTPS stabil, restore teruji, test suite lulus |

Implementasikan satu fase sampai kriteria keluarnya terpenuhi sebelum menambah kompleksitas fase berikutnya.

---

# 20. Kriteria Evolusi ke Microservices

Ekstraksi layanan hanya dipertimbangkan jika ada kebutuhan terukur, misalnya notifikasi membutuhkan scaling independen, reporting membebani transaksi utama, atau tim berbeda membutuhkan ownership deployment terpisah.

Kandidat awal adalah notification service atau reporting read model. Meeting, decision, dan action item tetap dalam satu boundary selama aturan bisnis dan transaksi mereka saling terkait erat.

Jangan memecah layanan hanya karena jumlah modul bertambah.

---

# 21. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Otorisasi hanya dilakukan di frontend | Terapkan authorization guard dan resource-level checks di backend |
| Keputusan berubah tanpa jejak | Versioning, audit trail, dan transisi status tervalidasi |
| Notifikasi hilang setelah perubahan tersimpan | Transactional outbox dan retry worker |
| Notifikasi terkirim berkali-kali | Idempotency/deduplication dan status pemrosesan |
| Database hilang saat container dibuat ulang | Persistent volume dan backup di luar lifecycle container |
| Deployment gagal karena migration | Migration terkendali, staging/test, dan rencana rollback |
| Arsitektur terlalu kompleks untuk MVP | Modular monolith, ekstraksi service berdasarkan kebutuhan terukur |
| Log membocorkan data sensitif | Redaksi log dan larangan mencatat token/password |
| Refresh URL SPA menghasilkan 404 | Nginx SPA fallback yang benar dan diuji |

---

# 22. Metrics Keberhasilan

Metrik awal:

- Persentase action items selesai sebelum tenggat.
- Jumlah action items overdue.
- Persentase keputusan yang memiliki rationale dan penanggung jawab tindak lanjut.
- Waktu rata-rata dari keputusan disetujui hingga action item dibuat.
- Jumlah meeting yang memiliki tindak lanjut terdokumentasi.
- Tingkat kegagalan notifikasi.
- API error rate dan latency.
- Rasio job gagal setelah retry.

Nilai target sebaiknya ditentukan setelah ada baseline penggunaan yang nyata.

---

# 23. Skenario End-to-End

1. Organizer membuat meeting pada workspace.
2. Organizer menambahkan peserta dan agenda.
3. Meeting berlangsung dan catatan diskusi disimpan.
4. Organizer membuat keputusan dengan rationale dan menghubungkannya ke agenda.
5. Keputusan disetujui oleh pengguna berizin.
6. Dalam satu transaksi, sistem menyimpan status keputusan, versi/audit event, dan outbox event.
7. Worker memproses event dan mengirim notifikasi.
8. Organizer membuat action items dari keputusan, menetapkan assignee dan due date.
9. Assignee memperbarui progres atau menandai blocker.
10. Dashboard menampilkan item yang belum selesai atau overdue.
11. Ketika action item selesai, status dan aktor perubahan dicatat.
12. Riwayat meeting memperlihatkan hubungan antara agenda, keputusan, action items, dan aktivitas terkait.

---

# 24. Ringkasan Keputusan Implementasi

Stack dan arsitektur yang menjadi acuan:

- **Frontend:** React + TypeScript + Vite.
- **Routing:** React Router.
- **UI:** Tailwind CSS + shadcn/ui.
- **Server state:** TanStack Query.
- **Forms:** React Hook Form + Zod.
- **Backend:** NestJS REST API.
- **Database:** PostgreSQL.
- **ORM/migrations:** Prisma.
- **Background jobs:** Redis + BullMQ.
- **Authentication web:** session berbasis cookie `HttpOnly`, `Secure`, dan `SameSite` yang sesuai, plus perlindungan CSRF.
- **Reliable event processing:** transactional outbox, retry, dan idempotency.
- **Deployment:** Docker Compose + Nginx.
- **Architecture:** Modular Monolith dengan background worker terpisah.
- **API documentation:** OpenAPI/Swagger.
- **Testing:** Vitest, React Testing Library, Jest, Supertest, Playwright.

## Keputusan Final

Gunakan React + Vite untuk frontend SPA dan NestJS untuk backend REST API. Pertahankan Modular Monolith dengan worker terpisah, PostgreSQL sebagai sumber data utama, Redis/BullMQ untuk pekerjaan asynchronous, dan Docker Compose + Nginx untuk deployment. Prioritaskan batas modul, keamanan, konsistensi transaksi, audit trail, dan testability sebelum mempertimbangkan microservices.
"""

pypandoc.convert_text(
    markdown,
    to="md",
    format="md",
    outputfile=md_path,
    extra_args=["--standalone"]
)

print(f"Created: {md_path}")
print(f"Size: {os.path.getsize(md_path):,} bytes")
