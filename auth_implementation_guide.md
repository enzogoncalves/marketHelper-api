# Fastify Authentication Guide: Using Decorators

Here’s a guide on how to properly implement authentication in Fastify by using **Decorators**. This approach makes your code cleaner, more reusable, and fully type-safe.

### Step 1: Create an Authentication Plugin

It's best practice to handle this in a plugin. Create a file at `src/plugins/auth.ts`. This plugin will contain your authentication logic and attach both the `user` property to requests and an `authenticate` handler to your Fastify instance.

```typescript
// src/plugins/auth.ts

import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { jwtVerify } from "jose";
import { prisma } from "../lib/prisma"; // Use your singleton Prisma instance
import { User } from "@prisma/client";

// Define the structure of your JWT payload
interface JwtPayload {
  sub: string; // 'sub' is standard for user ID
  // Add any other properties you have in your token payload
}

// Use module augmentation to add the 'user' property to the FastifyRequest interface
// and the 'authenticate' decorator to the FastifyInstance
declare module "fastify" {
  interface FastifyRequest {
    user: User | null;
  }
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

async function authPlugin(app: FastifyInstance) {
  // Decorate the request object with a 'user' property, initialized to null
  app.decorate("user", null);

  // Decorate the Fastify instance with an 'authenticate' function
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { authorization } = request.headers;
        if (!authorization || !authorization.startsWith("Bearer ")) {
          throw new Error("Missing or invalid authorization header");
        }

        const token = authorization.substring(7); // Remove 'Bearer ' prefix

        // You need to provide your secret key here. It's best to use an environment variable.
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        if (!secret) {
          throw new Error("JWT_SECRET is not configured on the server.");
        }

        // Verify the token using 'jose'
        const { payload } = await jwtVerify<JwtPayload>(token, secret);

        // Find the user in the database
        const user = await prisma.user.findUnique({
          where: { id: payload.sub },
        });

        if (!user) {
          throw new Error("User not found.");
        }

        // Attach the user object to the request
        request.user = user;
      } catch (error) {
        reply
          .code(401)
          .send({
            message: "Authentication failed.",
            error: (error as Error).message,
          });
      }
    }
  );
}

// Export the plugin using fastify-plugin to make decorators available globally
export default fp(authPlugin);
```

### Step 2: Register the Plugin in `server.ts`

Now, you need to register this plugin in your main server file so Fastify is aware of your new decorators.

```typescript
// src/server.ts (example structure)

import fastify from "fastify";
import authPlugin from "./plugins/auth"; // Import the plugin
import { authRouter } from "./routers/Auth/auth_router";
// ... other imports

const app = fastify({ logger: true });

// Register the auth plugin
app.register(authPlugin);

// Register your routes
app.register(authRouter);

// ... rest of your server setup
```

### Step 3: Use the Decorator in Your Router

Your `auth_router.ts` file remains almost the same, but now `app.authenticate` is a globally available decorator that you defined.

```typescript
// src/routers/Auth/auth_router.ts

// ... imports

export async function authRouter(app: FastifyTypedInstance) {
  // ... other routes

  app.post(
    "/signout",
    {
      // Use the decorator you created as a preHandler
      preHandler: [app.authenticate],
      schema: {
        // ... schema
      },
    },
    authController.signout
  );

  // ... other routes
}
```

### Step 4: Access `req.user` in Your Controller

Finally, in your `authController.signout` function, you can safely access `req.user`. It will be fully typed, and you can be certain that if the code execution reaches this point, the user is authenticated.

```typescript
// src/routers/Auth/auth_controller.ts

// ... imports

async function signout(req: FastifyRequest<...>, reply: FastifyReply) {
  // req.user is now available and typed as User | null
  const user = req.user;

  if (!user) {
    // This check is for type safety, but the preHandler should prevent this
    return reply.code(401).send({ message: 'Authentication failed.' });
  }

  console.log('Logout user:', user.id);

  // Now you can perform the signout logic using user.id
  // For example, find the token and delete it.
  // You no longer need to pass userId in the request body.

  // ... your signout logic
}

export const authController = {
  // ... other methods
  signout,
};
```
