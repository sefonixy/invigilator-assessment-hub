# 🎓 Invigilator Assessment Hub

A modern React-based dashboard for managing and monitoring assessment examinations. Built with TypeScript, Ant Design, and deployed on Vercel.

## 🌐 Live Demo

**🚀 [View Live Application](https://invigilator-assessment-q9rxg5ty7-yehualashets-projects.vercel.app)**

## ✨ Features

- **Assessment Management** - View and manage downloaded assessments
- **Real-time Monitoring** - Track student submissions and session status
- **Advanced Filtering** - Filter by area, program, course, and status
- **Student Details** - View detailed information about examinees
- **Action Controls** - Monitor examinees, sync submissions, and manage sessions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Accessibility** - Built with screen reader support and keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** - Modern UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Ant Design 5](https://ant.design/)** - Enterprise-class UI design language
- **[React Router 7](https://reactrouter.com/)** - Declarative routing
- **[Vite 7](https://vitejs.dev/)** - Fast build tool and dev server

### Development & Testing
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[React Testing Library](https://testing-library.com/react)** - Simple and complete testing utilities
- **[ESLint](https://eslint.org/)** - JavaScript linter
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

### Deployment & CI/CD
- **[Vercel](https://vercel.com/)** - Zero-config deployment platform
- **[GitHub Actions](https://github.com/features/actions)** - Automated CI/CD pipeline

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sefonixy/invigilator-assessment-hub.git
   cd invigilator-assessment-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run deploy` | Build and deploy to Vercel |

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Current test coverage:** 25 tests across 3 test suites covering:
- Component rendering and interaction
- Filter and search logic
- Error handling utilities

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── assessments/     # Assessment-related components
│   └── submissions/     # Submission-related components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── services/            # API services and mock data
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── constants/           # App constants and themes
```

## 📚 Documentation

- **[Data Layer Documentation](./docs/data-layer-readme.md)** - Detailed information about data structures, state management, and API integration
- **[Deployment Guide](./DEPLOYMENT.md)** - Step-by-step deployment instructions for Vercel and GitHub Actions

## 🔧 Development

### Code Style

This project follows strict TypeScript and React best practices:
- **Strict TypeScript** configuration with comprehensive type checking
- **ESLint** with React-specific rules
- **Functional components** with hooks
- **Accessibility-first** design principles

### Performance

- **Lazy loading** for optimal bundle splitting
- **Memoization** for expensive calculations
- **Efficient re-renders** with proper dependency arrays
- **Optimized builds** with Vite's fast bundling

## 🚀 Deployment

The application is automatically deployed to Vercel with:

- **Automatic deployments** on every push to `main` branch
- **Preview deployments** for pull requests
- **Custom domain** support
- **Environment variable** management

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

- **[Live Application](https://invigilator-assessment-q9rxg5ty7-yehualashets-projects.vercel.app)**
- **[GitHub Repository](https://github.com/sefonixy/invigilator-assessment-hub)**
- **[Vercel Dashboard](https://vercel.com/yehualashets-projects/invigilator-assessment-hub)**

---

**Built with ❤️ using React, TypeScript, and Ant Design**
