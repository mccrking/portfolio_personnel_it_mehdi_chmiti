import sharp from "sharp";
for (const name of ["desktop-dark", "desktop-light", "mobile-dark"]) {
  await sharp(`artifacts/${name}.png`)
    .extract({
      left: 0,
      top: 0,
      width: name.startsWith("mobile") ? 390 : 1440,
      height: name.startsWith("mobile") ? 1600 : 1000,
    })
    .toFile(`artifacts/${name}-top.png`);
}
await sharp("artifacts/desktop-dark.png")
  .resize({ width: 600 })
  .toFile("artifacts/desktop-overview.png");
