# FlockCounter Frontend

This repository contains the frontend for FlockCounter, a privacy-focused, cookie-free, and open-source web analytics platform. It's built with Next.js and is designed to work seamlessly with the FlockCounter backend.

## Getting Started

These instructions will get you a copy of the frontend up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version recommended)
- npm, yarn, pnpm, or bun (package manager)

### Installation & Development

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>  # Replace <repository_url>
    cd flockcounter-frontend
    ```

2.  **Install dependencies:**

    Choose one of the following commands based on your preferred package manager:

    ```bash
    npm install
    # or
    yarn
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**

    Again, choose the command that matches your package manager:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    This will start the Next.js development server, typically on [http://localhost:3000](http://localhost:3000). Open this URL in your browser to view the application.

### Building for Production

To create a production build of the frontend:

1.  **Run the build command:**

    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    # or
    bun build
    ```

    This creates an optimized build in the `.next` directory.

2.  **Start the production server:**

    ```bash
    npm run start
    # or
    yarn start
    # or
    pnpm start
    # or
    bun start
    ```

    This starts the Next.js server using the production build.

### Docker Deployment (with Backend)

For a complete deployment, including the backend, it's recommended to use the Docker Compose setup provided in the main FlockCounter repository (https://github.com/mvavassori/flockcounter). This frontend repository is designed to work with that Docker Compose configuration.

1.  **Clone the main FlockCounter repository:**

    ```bash
    git clone https://github.com/mvavassori/flockcounter.git
    ```

2.  **Place the frontend repository:**

    Make sure this `flockcounter-frontend` repository is at the _same directory level_ as the `flockcounter` repository you just cloned, _not inside_ it. Your directory structure should look like this:

    ```
    your_projects/
    ├── flockcounter/         (Main backend repository)
    └── flockcounter-frontend/  (This frontend repository)
    ```

3.  **Build and run with Docker Compose:**

    Navigate into the `flockcounter` directory:

    ```bash
    cd flockcounter
    ```

    Then, use Docker Compose to build and run both the frontend and backend:

    ```bash
    docker compose up --build
    ```

    This command will build both the frontend and backend Docker images and start the containers. The frontend will be accessible (by default) on [http://localhost:3000](http://localhost:3000), and the backend API will be running on its configured port (usually 8080). The `--build` flag ensures that Docker rebuilds the images, incorporating any changes you've made.

### Environment Variables

The frontend uses several environment variables, primarily for configuring the connection to the backend. These are typically set during the build process (especially important for Docker builds).

- `NEXT_PUBLIC_BACKEND_URL`: The URL of the FlockCounter backend API (e.g., `http://localhost:8080/api`). This is crucial for the frontend to communicate with the backend.
- `NEXT_PUBLIC_DEMO_DOMAIN`: The domain used for the demo website (e.g., `flockcounter.com`).
- `NEXT_PUBLIC_ENV`: The environment (e.g., `development`, `production`). This can affect various aspects of the application's behavior.
- `NEXT_TELEMETRY_DISABLED`: Set to 1 to disable Next.js telemetry.

These variables are used in the `Dockerfile` and are passed as build arguments. When using Docker Compose, you'll typically set these in the `docker-compose.yml` file or in a `.env` file in the `flockcounter` directory. When running locally (without Docker), you can set them in a `.env.local` file in the `flockcounter-frontend` directory.

## Key Technologies

- **Next.js:** React framework for building server-rendered and statically generated web applications.
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static typing.
- **Tailwind CSS:** Utility-first CSS framework.
- **Recharts:** Composable charting library built with React and D3.js.
- **NextAuth.js:** Authentication library for Next.js.
- **Docker:** Platform for containerizing applications.
