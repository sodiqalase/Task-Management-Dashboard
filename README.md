# Task Management Dashboard


## Code Structure

- **router/**: Handles all routing for the application, for page components.
  
- **components/**: Contains reusable components used across the application. Any code that is used more than once should be placed here.
  
- **composables/**: Stores all composables hooks.
  
- **interfaces/**: All TypeScript types and interfaces are housed in this folder.
  
- **enums/**: Contains all enumerations used in the project.
  
- **layout/**: Holds layout-related components like `Navbar`, `Footer`, `Sidebar`, and `DashbaoardLayout`.
  
- **services/**: Contains all API service calls.
  
- **styles/**: Includes SCSS styles. You can add new styles to the global SCSS file or create dedicated partials as needed.
  
- **utils/**: Contains reusable utility functions and code logic.
  
- **pages/**: Holds page components, organized by functionality. For example, `Auth/LoginPage`, `Auth/SignupPage`, `Homepage/*`, `LandingPage/`.
  

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/sodiqalase/Task-Management-Dashboard.git
    ```

    > **Note**: Please use only **Yarn** as the package manager.

2. Install dependencies:

    ```bash
    yarn
    ```
 ```

3. Run the development server:

    ```bash
    yarn run dev
    ```

4. Run tests:

    ```bash
    npx vitest
    ```

5. For production build:

    ```bash
    yarn run build
    ```

Once the server is running, open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---