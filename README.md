# World Clocks Dashboard

A modern, interactive dashboard displaying world clocks built with React.js and Tailwind CSS.

## Overview

This project is a web application that provides a real-time view of current times across different time zones around the world. The dashboard offers an intuitive interface for monitoring multiple time zones simultaneously, making it perfect for global teams, travelers, or anyone working across different time zones.

## Technologies

- **React.js** - A JavaScript library for building user interfaces
- **Tailwind CSS** - A utility-first CSS framework for rapid UI development

## Features

- Display multiple world clocks simultaneously
- Real-time time updates
- Clean and responsive design
- Easy-to-read interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/seonglinchua/world-clocks-dashboard.git

# Navigate to the project directory
cd world-clocks-dashboard

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage

Once the development server is running, open your browser and navigate to `http://localhost:3000` to view the world clocks dashboard.

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

1. **CI Workflow** - Runs on every push and pull request to `main`
   - Tests the application on Node.js 18.x and 20.x
   - Runs test suite with coverage reporting
   - Builds the production bundle
   - Uploads test coverage and build artifacts

2. **Deploy Workflow** - Automatically deploys to GitHub Pages
   - Triggers on push to `main` branch
   - Can be manually triggered via workflow dispatch
   - Builds and deploys the React app to GitHub Pages

3. **Code Quality Workflow** - Ensures code quality standards
   - Runs ESLint for code linting
   - Performs security vulnerability checks with npm audit
   - Non-blocking checks to maintain development velocity

All workflows follow security best practices with explicit permissions and use the latest GitHub Actions versions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.