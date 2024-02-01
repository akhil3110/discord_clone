# Discord_Clone
## About the Project:
This is a Discord_Clone.<br />

Where user can create Server and invite other users to join.<br />
A server can have multiple channel which can be:
* Text where only message allowed message can also have attachment  like pdf or image
* Audio where we can have audio call
* Video where User can have video call

A user in a server can also have role like moderator admin and guest.
User who created server is Admin and can assign role to other users.
Admin can Moderator can do some special funtionality like deleting message, removing user from server etc.

***
## Getting Started

Install all dependencies required for the project:
```bash
npm i
```

Now set up .env file 
```bash
cp .env.sample .env
```

Add all you the requires keys in .env file 


Now project set up is completed now you can run the project
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Technologies Used
A list of technologies used within the project:
* Next.js
* React.js
* Zod
* Socket.io
* react-query
* Shacdcn (Frontend Component Library)
* Tailwind CSS
* Zustand (State Managment)
* Clerk (for Authentication)
* Prisma ORM
* Postgress SQL
* axios

