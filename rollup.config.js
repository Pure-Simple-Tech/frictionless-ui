import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import dts from "rollup-plugin-dts";
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Function to strip SCSS imports from TypeScript files
function stripScssImports(content) {
  return content.replace(/import\s+['"].*\.scss['"];?\n?/g, "");
}

// Function to recursively copy directory
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      // For TypeScript files, strip SCSS imports before copying
      const content = readFileSync(srcPath, "utf-8");
      const strippedContent = stripScssImports(content);
      writeFileSync(destPath, strippedContent);
    } else if (!entry.name.endsWith(".scss")) {
      // Copy all other files except SCSS
      copyFileSync(srcPath, destPath);
    }
  }
}

// Plugin to copy TypeScript files
const copyTsFiles = () => ({
  name: "copy-ts-files",
  buildEnd() {
    copyDir("src", "dist/src");
  },
});

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.umd.js",
        format: "umd",
        name: "FrictionlessUI",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      scss({
        fileName: "styles.css",
        outputStyle: "compressed",
        watch: "src/**/*.scss",
        include: ["src/**/*.scss"],
        exclude: ["node_modules/**/*.scss"],
      }),
      copyTsFiles(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.scss$/],
    plugins: [dts()],
  },
];

export default config;
