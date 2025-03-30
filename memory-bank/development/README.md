# Development Documentation

This directory contains documentation related to the development process for Different Not Less Apparel.

## Contents

- Development workflows and processes
- Coding standards and best practices
- Environment setup instructions
- Development tools and utilities
- Troubleshooting guides

## Development Guidelines

Based on our .clinerules file:

### Naming Conventions

- **Files:** Use kebab-case for all file names (e.g., `product-detail.js`)
- **Components:** Use PascalCase for React components (e.g., `ProductDetail.jsx`)
- **Functions:** Use camelCase for functions and methods (e.g., `getProductDetails()`)
- **CSS Classes:** Use BEM methodology (Block__Element--Modifier)
- **Database Fields:** Use camelCase for field names in all systems
- **API Endpoints:** Use kebab-case for URL paths (e.g., `/api/product-details`)

### Code Organization

- **Component Structure:** Follow atomic design principles (atoms → molecules → organisms → templates → pages)
- **File Organization:** Group files by feature rather than by type
- **State Management:** Use React Context API for global state
- **API Calls:** Centralize in service files within the `lib` directory
- **Utility Functions:** Place in `lib/utils` with descriptive file names

### Development Environment

- **Code Editor:** VS Code with ESLint and Prettier
- **Node Version:** v16+ (specified in .nvmrc)
- **Package Manager:** npm preferred over yarn
- **Local Development:** Use `npm run dev` for Next.js development server
- **Testing:** Jest for unit tests, Cypress for E2E tests

## Last Updated

March 30, 2025
