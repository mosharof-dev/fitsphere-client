# 🏋️‍♂️ FitSphere - Fitness & Gym Management Platform (Client)


## 📌 Project Overview

**FitSphere** is a comprehensive system designed for fitness enthusiasts, gym trainers, and administrators. Users can discover fitness classes, book sessions, participate in community discussions, and track their fitness journey. Trainers can list their classes, manage attendees, and share knowledge in the forum. Administrators oversee the entire platform's operations, user roles, and community guidelines, ensuring quality and safety.

## 🔗 Live Links

- **Live Website:** [https://fitsphere-client.vercel.app](https://fitsphere-client.vercel.app)
- **Server URL:** [https://fitsphere-server.vercel.app](https://fitsphere-server.vercel.app)
- **Client Repository:** [https://github.com/mosharof-dev/fitsphere-client](https://github.com/mosharof-dev/fitsphere-client)
- **Server Repository:** [https://github.com/mosharof-dev/fitsphere-server](https://github.com/mosharof-dev/fitsphere-server)

## ✨ Key Features

- **Role-Based Access Control (RBAC):** Distinct dashboards and functionalities for Users, Trainers, and Admins.
- **Authentication:** Secure Credential & Google Login integrated using Better Auth.
- **Dynamic Homepage:** Features top classes based on bookings, latest forum posts, and interactive sections utilizing `framer-motion`.
- **Class Discovery & Booking:** Users can browse, search by name, filter by category, add to favorites, and securely book classes via **Stripe**.
- **Trainer Applications & Management:** Users can apply to become trainers. Admins can approve/reject applications and demote existing trainers.
- **Community Forum:** A space for trainers and admins to post. Authenticated users can read, comment, and vote (like/dislike) on posts.
- **Advanced Admin Dashboard:** Comprehensive management of users (Block/Unblock/Promote), classes (Approve/Reject/Delete), and forum posts, along with insightful statistics using `recharts`.
- **Responsive & Modern UI:** Fully responsive design catering to Mobile, Tablet, and Desktop, ensuring a professional and engaging user experience.

## 🛠️ Built With (Dependencies)

- **Framework:** [Next.js](https://nextjs.org/) (React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [HeroUI](https://heroui.com/), [DaisyUI](https://daisyui.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Payments:** [Stripe](https://stripe.com/) (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Charts:** [Recharts](https://recharts.org/)
- **Forms & Validation:** `react-hook-form`
- **Icons:** `lucide-react`, `react-icons`, `@gravity-ui/icons`
- **Notifications:** `sonner`

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mosharof-dev/fitsphere-client.git
   ```
2. Navigate into the directory:
   ```bash
   cd fitsphere-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add the necessary configuration keys:

```env
NEXT_PUBLIC_API_URL=your_server_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
# Add other better-auth and necessary env variables
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🔑 Admin Credentials for Evaluation

- **Admin Email:** admin@gmail.com
- **Admin Password:** Mosharof1
