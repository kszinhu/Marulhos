# API Airport

This is the API for the Airport project.

## Overview

The API is built using [Modscleo4 API framework](https://github.com/modscleo4/apiframework) and Prisma for database access and migrations using PostgreSQL.

### Getting Started

#### Requirements

- Node.js 16.13

#### Installation

1. Clone the repository
2. Install dependencies with `npm ci`
3. Copy `.env.example` to `.env` and fill in the values
4. Create a keys for JWT signing and encryption using `npm run generateKeys`
5. Run the API with `npm run dev`