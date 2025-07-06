# Invigilator Assessment Hub

A React dashboard for managing assessment examinations and monitoring student submissions. This was built as part of a React.js assessment project.

## Live Demo

Check out the deployed app: https://invigilator-assessment-q9rxg5ty7-yehualashets-projects.vercel.app

## What it does

This app helps invigilators (exam supervisors) manage their assessments and monitor students during exams. You can:

- View downloaded assessments in a filterable table
- Monitor student exam sessions in real-time  
- Track submission status and session health
- View detailed student information
- Perform actions like syncing submissions or unlocking sessions
- Filter and search through large datasets

The UI is responsive so it works on both desktop and mobile.

## Built with

**Frontend:**
- React 19 with TypeScript
- Ant Design for UI components
- React Router for navigation
- Vite for fast development and building

**Testing & Tools:**
- Jest and React Testing Library for tests
- ESLint for code quality
- GitHub Actions for CI/CD
- Vercel for hosting

## Getting started

You'll need Node.js 18+ installed on your machine.

```bash
# Clone the repo
git clone https://github.com/sefonixy/invigilator-assessment-hub.git
cd invigilator-assessment-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app should open at `http://localhost:5173`

## Available commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Check code with ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run deploy       # Deploy to Vercel
```

## Project structure

```
src/
├── components/
│   ├── assessments/     # Assessment table and filters
│   └── submissions/     # Student submission tracking
├── contexts/            # React context for state
├── services/            # Mock data (would be API calls in real app)
├── types/               # TypeScript definitions
├── utils/               # Helper functions and logic
└── constants/           # Theme and constants
```

## Testing

The project has tests covering the main functionality:

```bash
npm test  # Run all tests (currently 25 tests)
```

Tests cover:
- Component rendering
- Filter logic
- Error handling
- User interactions

## Documentation

- [Data Layer Details](./docs/data-layer-readme.md) - More details about the data structure and state management
- [Deployment Guide](./DEPLOYMENT.md) - How to deploy this yourself

## Development notes

**Code quality:**
- Using strict TypeScript configuration
- ESLint with React rules
- Functional components with hooks
- Proper error handling and loading states

**Performance considerations:**
- Using React.memo and useMemo for optimizations
- Efficient filtering and sorting logic
- Lazy loading could be added for larger datasets

## Deployment

The app auto-deploys to Vercel when you push to the main branch. I set up GitHub Actions to run tests before deployment.

If you want to deploy your own version:
1. Fork this repo
2. Connect it to Vercel
3. Push changes to trigger deployments

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Architecture decisions

I chose this tech stack because:
- **React 19** - Latest features and better performance
- **TypeScript** - Helps catch errors and improves developer experience  
- **Ant Design** - Provides professional-looking components out of the box
- **Vite** - Much faster than Create React App for development

The app uses mock data currently, but it's structured so you could easily replace the mock service with real API calls.

## Areas for improvement

If I had more time, I would add:
- More comprehensive error handling
- Additional test coverage
- Performance monitoring
- Better loading states

## Links

- [Live app](https://invigilator-assessment-q9rxg5ty7-yehualashets-projects.vercel.app)
- [GitHub repo](https://github.com/sefonixy/invigilator-assessment-hub)

Built with React, TypeScript, and Ant Design.
