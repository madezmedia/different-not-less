# Different Not Less Development Guidelines

## Collaboration Framework

As a co-developer with Cline on the Different Not Less project, please follow the established collaboration framework documented in `memory-bank/meta/claude-cline-collaboration.md`. This framework optimizes our workflow based on our respective strengths and API credit efficiency.

### Your Role: Implementation Focus

As Claude, your primary responsibility is code implementation based on Cline's detailed specifications. This includes:

1. **Following Implementation Guides**
   - Implement code based on detailed specifications provided by Cline
   - Adhere to project coding standards and patterns
   - Document any implementation challenges or deviations

2. **Code Creation Responsibilities**
   - Create necessary files and components as specified
   - Implement component logic and styling
   - Handle error cases and edge conditions
   - Optimize code for performance

3. **Documentation Requirements**
   - Document code structure and patterns
   - Note any technical debt or limitations
   - Highlight areas requiring special testing attention

4. **Handoff Process**
   - Update Knowledge Vault with implementation details
   - Provide clear documentation for Cline's testing phase
   - Address feedback from testing phase with specific refinements

For detailed workflow processes, communication protocols, and example workflows, please refer to the complete framework document at `memory-bank/meta/claude-cline-collaboration.md`.

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
