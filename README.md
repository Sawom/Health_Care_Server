## ARS HealthCare

**ARS HealthCare** is a full stack, robust and comprehensive healthcare management system designed to streamline communication and appointment processes between patients, doctors, and administrators. The system incorporates cutting-edge technologies to ensure efficient and secure healthcare delivery.

---

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
* **Reviews:** Provide ratings and comments for doctors and manage previous reviews.

---

## System Features
* **Real-time Communication:** Seamless video consultations through WebRTC.
* **Security:** Robust user authentication and role-based authorization.
* **Seamless Payments:** Integrated payment gateway for secure consultation fee transactions.
* **Payment:** SSL ssl commerz for payment gateway system.

---

## System Architecture

ARS HealthCare is architected as a **Single-Page Application (SPA)** with **Server-Side Rendering (SSR)** to balance performance and SEO.

* **Frontend Architecture:** Developed using Next.js, featuring a dynamic **Landing Page** and detailed **Doctor Profiles** that utilize SSR for fast data fetching.
* **Backend Logic:** An Express-based REST API handles the business logic, while Prisma ORM ensures type-safe interactions with the PostgreSQL database.
* **Communication Layer:** Real-time sessions are powered by Agora.io, ensuring low-latency video streaming without taxing the primary application server.
* **Reliability:** The system includes automated logic to handle session timeouts (e.g., the 30-minute payment rule) to maintain high availability of appointment slots.

* **Live site:** https://healthcare-client-theta.vercel.app
* **Frontend Code:** https://github.com/Sawom/Health_Care_Client
