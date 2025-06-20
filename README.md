# Recipe Finder

https://recipes-eosin-sigma.vercel.app/

A modern, responsive web application for discovering and exploring recipes from around the world. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🍳 Features

### Core Functionality

- **Recipe Search**: Search for recipes by ingredients, cuisine type, diet preferences, and meal type
- **Recipe Details**: View comprehensive recipe information including ingredients, instructions, and nutritional data
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Search**: Instant search results with loading states and error handling

### User Experience

- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Graceful error handling with user-friendly messages
- **Caching**: Intelligent caching to improve performance and reduce API calls

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **ESLint & Prettier**: Code quality and formatting standards
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Next.js App Router**: Modern routing with server and client components

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd test-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Edit `.env.local` and add your Spoonacular API key:

   ```
   NEXT_PUBLIC_SPOONACULAR_API_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

### Code Quality

This project uses ESLint and Prettier to maintain code quality and consistency:

- **ESLint**: Enforces coding standards and catches potential errors
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Provides type safety and better developer experience

### Project Structure

```
test-task/
├── app/                    # Next.js App Router
│   ├── components/         # Reusable React components
│   │   ├── ui/            # Base UI components
│   │   ├── BackButton.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeContent.tsx
│   │   ├── RecipeImage.tsx
│   │   └── SearchForm.tsx
│   ├── recipes/           # Recipe-related pages
│   │   ├── [id]/          # Dynamic recipe detail pages
│   │   └── page.tsx       # Recipe search results
│   ├── types/             # TypeScript type definitions
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility functions
├── public/                # Static assets
├── .eslintrc.mjs         # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .prettierignore       # Prettier ignore rules
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🍽️ API Integration

This application integrates with the [Spoonacular API](https://spoonacular.com/food-api) to provide recipe data.

### API Setup

1. **Get an API Key**:

   - Visit [Spoonacular API](https://spoonacular.com/food-api)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_SPOONACULAR_API_KEY=your_actual_api_key_here
   ```

3. **Restart the Development Server**:
   ```bash
   npm run dev
   ```

### API Features

- **Recipe Search**: Search by ingredients, cuisine, diet, and meal type
- **Recipe Details**: Comprehensive recipe information
- **Caching**: 1-hour cache to improve performance
- **Error Handling**: Graceful handling of API errors

## 🎨 Styling

This project uses **Tailwind CSS** for styling:

- **Utility-first approach**: Rapid UI development
- **Responsive design**: Mobile-first responsive layouts
- **Custom components**: Reusable UI components in `app/components/ui/`
- **Consistent theming**: Unified color palette and spacing

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-friendly interface with appropriate spacing
- **Mobile**: Optimized layouts and touch interactions

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Vercel**: Import your repository in Vercel
3. **Configure Environment Variables**: Add your API key in Vercel dashboard
4. **Deploy**: Vercel will automatically deploy your application

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Run tests**: Ensure all linting and formatting checks pass
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Ensure code passes ESLint and Prettier checks
- Test on multiple devices and screen sizes
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for providing recipe data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting and deployment

## 📞 Support

If you encounter any issues or have questions:

1. Check the [API Setup Guide](API_SETUP.md) for configuration help
2. Review the [Next.js Documentation](https://nextjs.org/docs)
3. Open an issue in the repository

---

**Happy Cooking! 🍳**
