const config = {
  // tailwindcss ver4
  // 해당 4버전 + shadcn/ui 와 충돌
  // plugins: {
  //   "@tailwindcss/postcss": {},
  // },
  // tailwindcss ver3
  plugins: {
    tailwindcss: { config: "./tailwind.config.js" },
    autoprefixer: {},
  },
};

export default config;
