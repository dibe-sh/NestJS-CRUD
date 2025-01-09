# NestJS CRUD 💻

<p align="center" >
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) ![NodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![MarkDown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

This project provides a backend API for managing articles, complete with user authentication and file uploads. Built using NestJS, Prisma, PostgreSQL, and Swagger for API documentation.

## Table of contents ◾

- [NestJS CRUD 💻](#nestjs-crud-)
  - [Table of contents ◾](#table-of-contents-)
  - [Requirements ☑️](#requirements-️)
  - [Setup 🛠️](#setup-️)
  - [Notes 📔](#notes-)
  - [Further Improvements 🏳️](#further-improvements-️)
  - [License 🗒️](#license-️)

## Requirements ☑️

Some of the major requirements for this project are:

1. [Docker](https://www.docker.com/)
2. [NodeJs](https://nodejs.org/)

## Setup 🛠️

Copy the `.env.example` file and rename it to `.env` manually or run.

```bash
cp .env.example .env
```

Setting up project is simple, all you need to do is run following commands.

📔 **Make sure your docker is running.**

```bash
docker compose up
```

If you need to run code then make sure you have **yarn installed** or simply run `npm install --global yarn` and just run `yarn` on project directory.

## Notes 📔

💡 All the mentioned ports are configured via `.env` file

- App will be running on port `7002` at `http://localhost:7002`
- Swagger docs is available at `http://localhost:7002/api`
- Postgres database will be running on port `7001`
- PgAdmin will be running on port `7003`

❌ `Update` and `Create` articles won't work properly with swagger but works properly with postman and other services.

## Further Improvements 🏳️

Some of the future improvements required are:

1. Create and Update methods have [issue with swagger](https://stackoverflow.com/questions/66605192/file-uploading-along-with-other-data-in-swagger-nestjs) but works well with postman.
2. Add pagination to the article list.
3. Implement role-based access control.
4. Add more detailed error handling.
5. Implement Hot Module Reload(HMR) on package add or removal.
6. Authentication is required for all protected routes.
7. Admin users cannot be deleted by other users.
8. Ensure that the uploads directory exists and is writable by the server.

## License 🗒️

This project is licensed under the [MIT License](./LICENSE).
