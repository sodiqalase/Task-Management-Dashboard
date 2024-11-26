# Task Management Dashboard

A simple task management dashboard built with Vue 3, TypeScript, and SCSS.

---

## Code Structure

- **router/**: Handles all routing for the application, including page-level components.
- **components/**: Contains reusable components shared across the application.
- **composables/**: Houses reusable Vue composition functions.
- **interfaces/**: Stores all TypeScript types and interfaces for the application.
- **enums/**: Contains enumerations used throughout the project.
- **layout/**: Holds layout-related components like `Navbar`, `Sidebar`, and `DashboardLayout`.
- **services/**: Includes all API service call logic.
- **styles/**: Contains global SCSS files and partials for application styling.
- **utils/**: Holds reusable utility functions and shared logic.
- **pages/**: Contains page components organized by functionality, such as:
  - `Overview`
  - `Task Management`
 

---

## Setup Instructions

### Prerequisites
- Node.js `^16.0.0`
- Yarn `^1.22.0`

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sodiqalase/Task-Management-Dashboard.git
    ```

2. Navigate to the project directory:

    ```bash
    cd [project-directory]
    ```

3. Install dependencies:

    ```bash
    yarn
    ```

4. Run the development server:

    ```bash
    yarn dev
    ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Testing

Run tests using Vitest:

```bash
npx vitest
