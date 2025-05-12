Movie Application Backend Project Structure
movie-backend/
│
├── prisma/
│ ├── schema.prisma
│ └── migrations/
│
├── src/
│ ├── config/
│ │ ├── env.ts
│ │ └── database.ts
│ │
│ ├── controllers/
│ │ ├── authController.ts
│ │ ├── movieController.ts
│ │ └── userController.ts
│ │
│ ├── services/
│ │ ├── authService.ts
│ │ ├── movieService.ts
│ │ ├── emailService.ts
│ │ └── uploadService.ts
│ │
│ ├── middleware/
│ │ ├── authMiddleware.ts
│ │ └── errorHandler.ts
│ │
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ ├── movieRoutes.ts
│ │ └── userRoutes.ts
│ │
│ ├── utils/
│ │ ├── validation.ts
│ │ └── passwordUtils.ts
│ │
│ ├── types/
│ │ └── index.ts
│ │
│ └── app.ts
│
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md
