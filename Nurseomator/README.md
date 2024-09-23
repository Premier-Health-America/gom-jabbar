# Nurseomator

This project is a monorepo that contains the mobile app and the server under `apps` directory. It uses Bun as the JavaScript runtime and package manager.

## Mobile App

A React Native app built with Expo.

### Getting Started

To run the app, first install the dependencies in the `apps/mobile` directory:

```bash
bun install
```

Then create a .env file with the following command:

```bash
cp .env.example .env
```

Replace `[your_local_ip]` with the IP address of your local machine. You can get your local IP address by running `ifconfig` in the terminal and looking for the `en0` field.

### Development

To start the development server run:

```bash
bun run ios
```

Wait for the app to open in the Simulator.

## Elysia Server

A server built with Elysia and Bun runtime.

### Getting Started

To run the server, first install the dependencies in the `apps/server` directory:

```bash
bun install
```

Then create a .env file with the following command:

```bash
cp .env.example .env
```

Then you need to create the PostgreSQL database, run the migrations and seed the database. Run the following commands in the terminal:

```bash
docker compose up -d
bun run db:push
bun run db:seed
```

### Development

To start the development server run:

```bash
bun run dev
```

### API Documentation

API documentation is available at http://localhost:3000/ and is generated using Swagger.

### Database

The server uses a PostgreSQL database. The database connection is configured in drizzle.config.ts.

### Authentication

Authentication is handled using Lucia. The authentication configuration is in src/lib/auth.ts. It uses email and password authentication, as well as 2FA with biometrics on the user's device.

## Future Work / Considerations

- Refactor real-time websockets to be more performant. This means open a single WebSocket connection for each user and only send nurse locations when an update occurs, not every second.
- Polish the UI and the API documentation.
- Use a local first approach for when a nurse loses their network connection. (Triplit, Replicache, ElectricSQL)
