/**
 * Pulls the Gumisofts case studies and mirrors their images locally so the
 * portfolio has no runtime dependency on gumisofts.com or its object storage.
 *
 * Usage: node scripts/fetch-gumisofts.mjs
 */
import { mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const API_URL = "https://gumisofts.com/api/projects/projects";
const MAX_WIDTH = 1600;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = join(root, "public", "projects", "gumisofts");
const dataFile = join(root, "src", "data", "gumisofts.json");

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Some entries point at placeholder logos hosted on gumisofts.com itself
// (e.g. "/assets/work/adero.svg") rather than real case-study media.
const isMediaUrl = (url) => typeof url === "string" && url.startsWith("http");

// The upstream object storage drops connections fairly often on large files.
async function fetchWithRetry(url, attempts = 4) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await fetch(url, { signal: AbortSignal.timeout(60_000) });
    } catch (error) {
      if (attempt >= attempts) throw error;
      await sleep(attempt * 1500);
    }
  }
}

async function downloadImage(url, name) {
  const response = await fetchWithRetry(url);
  if (!response.ok) {
    // A few source images have been removed upstream; skip rather than abort.
    console.warn(`  skipped ${url} (${response.status})`);
    return null;
  }

  const source = Buffer.from(await response.arrayBuffer());
  const optimized = await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const fileName = `${name}.webp`;
  await writeFile(join(imageDir, fileName), optimized);

  const saved = Math.round((1 - optimized.length / source.length) * 100);
  console.log(
    `  ${fileName}  ${(source.length / 1024).toFixed(0)}kB -> ${(
      optimized.length / 1024
    ).toFixed(0)}kB (-${saved}%)`
  );

  return `projects/gumisofts/${fileName}`;
}

async function main() {
  console.log(`Fetching ${API_URL}`);
  const response = await fetchWithRetry(API_URL);
  if (!response.ok) {
    throw new Error(`API returned ${response.status} ${response.statusText}`);
  }
  const caseStudies = await response.json();
  console.log(`Received ${caseStudies.length} case studies\n`);

  await mkdir(imageDir, { recursive: true });
  await mkdir(dirname(dataFile), { recursive: true });

  // Rebuild the mirror from scratch so removed case studies don't leave orphans.
  for (const file of await readdir(imageDir).catch(() => [])) {
    await unlink(join(imageDir, file));
  }

  const projects = [];

  for (const study of caseStudies) {
    const slug = slugify(study.title);
    console.log(study.title);

    let cover = null;
    if (isMediaUrl(study.image)) {
      cover = await downloadImage(study.image, `${slug}-cover`);
    }

    const screenshots = [];
    const uniqueShots = [...new Set((study.screenshots ?? []).filter(isMediaUrl))];
    for (const [index, url] of uniqueShots.entries()) {
      const saved = await downloadImage(url, `${slug}-${index + 1}`);
      if (saved) screenshots.push(saved);
    }

    projects.push({
      slug,
      title: study.title.trim(),
      tagline: (study.tagline ?? "").trim(),
      description: (study.description ?? "").trim(),
      category: (study.category ?? "").trim(),
      technologies: study.technologies ?? [],
      features: study.features ?? [],
      problem: (study.problem ?? "").trim(),
      problemPoints: study.problemPoints ?? [],
      solution: (study.solution ?? "").trim(),
      solutionPoints: study.solutionPoints ?? [],
      image: cover,
      screenshots,
      demoUrl: study.demoUrl || null,
      githubUrl: study.githubUrl || null,
      isFeatured: Boolean(study.isFeatured),
      order: study.order ?? 0,
    });
  }

  await writeFile(dataFile, `${JSON.stringify(projects, null, 2)}\n`);
  console.log(`\nWrote ${projects.length} case studies to ${dataFile}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
