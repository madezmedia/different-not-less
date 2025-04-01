# Different Not Less Development Guidelines

## Build/Lint/Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines

### Imports
- Use absolute imports with aliases: `@/components/`, `@/lib/`, `@/styles/`, etc.
- Group imports: 1) External libraries 2) Internal modules 3) Styles

### Component Structure
- Use functional components with arrow functions
- Export components as default at the end of the file
- Place CSS modules in the same directory with `.module.css` extension

### Error Handling
- Wrap API calls in try/catch blocks
- Return meaningful fallbacks (`[]`, `null`, etc.)
- Include descriptive error messages with context
- Use standardized API error responses

### Types & Documentation
- Use JSDoc comments for functions with param and return types
- Even though using JS, follow TypeScript conventions where possible
- Maintain strict typing practices as defined in jsconfig.json

### Naming Conventions
- **Files:** Use kebab-case for all file names (e.g., `product-detail.js`)
- **Components:** Use PascalCase for React components
- **Functions:** Use camelCase for functions and variables
- **CSS Classes:** Use BEM methodology (Block__Element--Modifier) 

### Code Organization
- Follow atomic design principles for components
- Group files by feature rather than by type
- Use React Context API for global state management
- Centralize API calls in service files within the `lib` directory

### CI/CD & Git Workflow
- Group related changes into focused commits
- Write descriptive commit messages with ticket numbers: `[DNL-123] Add feature X`
- Feature branches: `feature/DNL-[number]-[description]`
- Bug fix branches: `fix/DNL-[number]-[description]`

### Session Conclusion Process
- Update activeContext.md with completed tasks ([x]) and current status
- Update progress.md with latest achievements and metrics 
- Create session summary following the template in memory-bank/sessions/