//@ts-ignore
await Bun.build({
  entrypoints: ['./src/Admin/AdminApp/AdminApp.tsx'],
  outdir: './static',
  target: 'browser',
  minify: true,
  env: "inline"
});