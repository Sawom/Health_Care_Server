## ARS HealthCare

**ARS HealthCare** is a full stack, robust and comprehensive healthcare management system designed to streamline communication and appointment processes between patients, doctors, and administrators. The system incorporates cutting-edge technologies to ensure efficient and secure healthcare delivery.

---

<<<<<<< HEAD
#### Postman API Documentation: https://documenter.getpostman.com/view/26694209/2s9YynmjXH

```
Health_Care_Server
├─ .env
├─ .npmrc
├─ .vercelignore
├─ healthcareNote.txt
├─ health_care_inserts.sql
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ schema.prisma
│  └─ seed.ts
├─ README.md
├─ resources
│  ├─ HealthCare.postman_collection.json
│  ├─ PH HealthCare - Web Application Requirements.pdf
│  └─ PH HealthCare ERD.pdf
├─ src
│  ├─ app
│  │  ├─ errors
│  │  │  └─ ApiError.ts
│  │  ├─ interfaces
│  │  │  ├─ common.ts
│  │  │  ├─ file.ts
│  │  │  └─ pagination.ts
│  │  ├─ middlewares
│  │  │  ├─ auth.ts
│  │  │  ├─ globalErrorHandler.ts
│  │  │  └─ validateRequest.ts
│  │  ├─ modules
│  │  │  ├─ Admin
│  │  │  │  ├─ admin.constant.ts
│  │  │  │  ├─ admin.controller.ts
│  │  │  │  ├─ admin.interface.ts
│  │  │  │  ├─ admin.routes.ts
│  │  │  │  ├─ admin.service.ts
│  │  │  │  └─ admin.validations.ts
│  │  │  ├─ Appointment
│  │  │  │  ├─ appointment.constant.ts
│  │  │  │  ├─ appointment.controller.ts
│  │  │  │  ├─ appointment.routes.ts
│  │  │  │  ├─ appointment.service.ts
│  │  │  │  └─ appointment.validation.ts
│  │  │  ├─ Auth
│  │  │  │  ├─ auth.controller.ts
│  │  │  │  ├─ auth.routes.ts
│  │  │  │  ├─ auth.service.ts
│  │  │  │  └─ emailSender.ts
│  │  │  ├─ Doctor
│  │  │  │  ├─ doctor.constants.ts
│  │  │  │  ├─ doctor.controller.ts
│  │  │  │  ├─ doctor.interface.ts
│  │  │  │  ├─ doctor.routes.ts
│  │  │  │  ├─ doctor.service.ts
│  │  │  │  └─ doctor.validation.ts
│  │  │  ├─ DoctorSchedule
│  │  │  │  ├─ doctorSchedule.constants.ts
│  │  │  │  ├─ doctorSchedule.controller.ts
│  │  │  │  ├─ doctorSchedule.interface.ts
│  │  │  │  ├─ doctorSchedule.routes.ts
│  │  │  │  ├─ doctorSchedule.service.ts
│  │  │  │  └─ doctorSchedule.validation.ts
│  │  │  ├─ Meta
│  │  │  │  ├─ meta.controller.ts
│  │  │  │  ├─ meta.routes.ts
│  │  │  │  └─ meta.service.ts
│  │  │  ├─ Patient
│  │  │  │  ├─ patient.constants.ts
│  │  │  │  ├─ patient.controller.ts
│  │  │  │  ├─ patient.interface.ts
│  │  │  │  ├─ patient.route.ts
│  │  │  │  ├─ patient.services.ts
│  │  │  │  └─ patient.validation.ts
│  │  │  ├─ Payment
│  │  │  │  ├─ payment.controller.ts
│  │  │  │  ├─ payment.routes.ts
│  │  │  │  └─ payment.service.ts
│  │  │  ├─ Prescription
│  │  │  │  ├─ prescription.constants.ts
│  │  │  │  ├─ prescription.controller.ts
│  │  │  │  ├─ prescription.routes.ts
│  │  │  │  ├─ prescription.service.ts
│  │  │  │  └─ prescription.validation.ts
│  │  │  ├─ Review
│  │  │  │  ├─ review.contant.ts
│  │  │  │  ├─ review.controller.ts
│  │  │  │  ├─ review.routes.ts
│  │  │  │  ├─ review.service.ts
│  │  │  │  └─ review.validation.ts
│  │  │  ├─ Schedule
│  │  │  │  ├─ schedule.controller.ts
│  │  │  │  ├─ schedule.interface.ts
│  │  │  │  ├─ schedule.routes.ts
│  │  │  │  └─ schedule.sevice.ts
│  │  │  ├─ Specialties
│  │  │  │  ├─ specialties.controller.ts
│  │  │  │  ├─ specialties.routes.ts
│  │  │  │  ├─ specialties.service.ts
│  │  │  │  └─ specialties.validation.ts
│  │  │  ├─ SSL
│  │  │  │  ├─ ssl.interface.ts
│  │  │  │  └─ ssl.service.ts
│  │  │  └─ User
│  │  │     ├─ user.constant.ts
│  │  │     ├─ user.controller.ts
│  │  │     ├─ user.routes.ts
│  │  │     ├─ user.service.ts
│  │  │     └─ user.validation.ts
│  │  └─ routes
│  │     └─ index.ts
│  ├─ app.ts
│  ├─ config
│  │  └─ index.ts
│  ├─ helpars
│  │  ├─ fileUploader.ts
│  │  ├─ jwtHelpers.ts
│  │  └─ paginationHelper.ts
│  ├─ server.ts
│  └─ shared
│     ├─ catchAsync.ts
│     ├─ pick.ts
│     ├─ prisma.ts
│     └─ sendResponse.ts
├─ tsconfig.json
├─ uploads
└─ vercel.json

```
=======
## Technologies
The platform is built with a modern tech stack for high performance and scalability:

* **Frontend:** Next.js, Redux.
* **Backend:** Node.js & Express.
* **Video/audio communication:**  WebRTC (via Agora.io).
* **ORM:** Prisma.
* **Database:** PostgreSQL.

---

## User Roles & Functionalities

### 1. Admin
* **Account Management:** Create and manage doctor accounts.
* **Appointment Management:** Define schedule slots and manage the status of appointments.
* **Information Access:** View full appointment histories, manage doctor profiles.

### 2. Doctor
* **Appointment Management:** View upcoming schedules, set availability slots, and take appointments.
* **Patient Profiles:** Access medical history, view uploaded diagnostic reports.

### 3. Patient
* **Account Management:** Easy registration, password recovery, and secure account settings.
* **Appointment Booking:** Schedule appointments with specific doctors based on available time slots.
* **Medical Record Management:** Maintain a personal medical history and upload diagnostic test reports.
* **Payment & Confirmation:** Secure fee payment during booking. This features is impliment fr 
    > **Note:** Appointments are confirmed only after payment. If payment is not made within 30 minutes, the booking is automatically canceled.

---

## System Features
* **Real-time Communication:** Seamless video consultations through WebRTC.
* **Security:** Robust user authentication and role-based authorization.
* **Seamless Payments:** Integrated payment gateway for secure consultation fee transactions.
* **Payment:** SSL commerz for payment gateway system.

---

## System Architecture

ARS HealthCare is architected as a **Single-Page Application (SPA)** with **Server-Side Rendering (SSR)** to balance performance and SEO.

* **Frontend Architecture:** Developed using Next.js, featuring a dynamic **Landing Page** and detailed **Doctor Profiles** that utilize SSR for fast data fetching.
* **Backend Logic:** An Express-based REST API handles the business logic, while Prisma ORM ensures type-safe interactions with the PostgreSQL database.
* **Communication Layer:** Real-time sessions are powered by Agora.io, ensuring low-latency video streaming without taxing the primary application server.
* **Reliability:** The system includes automated logic to handle session timeouts (e.g., the 30-minute payment rule) to maintain high availability of appointment slots.

* **Live site:** https://healthcare-client-theta.vercel.app
* **Frontend Code:** https://github.com/Sawom/Health_Care_Client
>>>>>>> bae21d0f637af9cea4aacfc48421513dc9d07078
