module.exports = {
    roots: [
      "<rootDir>/src",
      "<rootDir>/__tests__"
    ],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": ["ts-jest",
        {
        tsconfig: 'tsconfig.json',
        compiler: 'typescript',
      }]
    },
    collectCoverageFrom: [
      "**/*.{js,jsx,ts,tsx}",
      "!**/*.d.ts",
      "!**/node_modules/**",
      "src/**/*.ts"
    ]
    // ],
    // globals: {
    //   "ts-jest": {
    //     tsconfig: "tsconfig.json",
    //   },
    // },
}
   