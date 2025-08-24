# My Health Vault - Web Application

This is a Next.js web application for managing health information securely.

## Features

- **Authentication**: NextAuth.js with credentials provider
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui components with Tailwind CSS
- **TypeScript**: Full TypeScript support
- **Responsive Design**: Mobile-first responsive design

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root of the web app with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Database (for future use)
# DATABASE_URL="postgresql://username:password@localhost:5432/healthvault"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/              # API routes
│   │   └── auth/         # NextAuth API routes
│   ├── auth/             # Authentication pages
│   │   └── signin/       # Sign in page
│   ├── dashboard/        # Protected dashboard page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── providers/        # Context providers
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── utils.ts          # Utility functions
└── types/                 # TypeScript type definitions
    └── next-auth.d.ts    # NextAuth type extensions
```

## Authentication

The application uses NextAuth.js with a credentials provider. For development purposes, you can use these demo credentials:

- **Email**: admin@example.com
- **Password**: password123

## Available Routes

- `/` - Home page with landing content
- `/auth/signin` - Sign in page
- `/dashboard` - Protected dashboard (requires authentication)

## Development

### Adding New shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

### Form Validation

Forms use Zod schemas for validation. Example:

```typescript
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof formSchema>
```

### Styling

The application uses Tailwind CSS with shadcn/ui design tokens. CSS variables are defined in `globals.css` for consistent theming.

## Next Steps

1. **Backend Integration**: Connect to your NestJS API
2. **Database**: Implement proper user authentication and data storage
3. **Additional Features**: Add health record management, file uploads, etc.
4. **Production**: Update environment variables and security settings

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **NextAuth.js** - Authentication
- **React Hook Form** - Form handling
- **Zod** - Schema validation
