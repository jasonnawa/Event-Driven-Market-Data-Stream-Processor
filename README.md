# 📈 Event-Driven Market Data Stream Processor

A real-time stock tick simulator built with **NestJS**, using simulated stock tick data, Redis for caching, MongoDB for subscriptions, and email notifications for alerts.

---

## 🚀 Features

- ⏱️ **Stock Tick Stream**: Emits random tick data every second
- 📉 **Change Detection**: Alerts on 10% price change within 10 minutes
- 📬 **Email Alerts**: Users get notified when subscribed stocks trigger alerts
- 👤 **User Subscriptions**: Subscribe/unsubscribe to specific stocks
- 📦 **MongoDB**: Stores user-subscription data
- ⚡ **Redis**: Caches tick history for fast access
- 🌐 **Web UI (Next.js)**: [URL](https://market-data-stream-client.vercel.app) Manage subscriptions visually
- ☁️ **Deployed on Render**

---

## 🛠 Tech Stack

| Layer              | Tech                          |
|--------------------|-------------------------------|
| Backend            | [NestJS](https://nestjs.com)  |
| Database           | MongoDB + Mongoose            |
| Cache              | Redis                         |
| Email Alerts       | Nodemailer / SMTP             |
| Deployment         | Render                        |

---

## 📁 Project Structure

