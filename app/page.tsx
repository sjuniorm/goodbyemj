import { promises as fs } from "fs";
import path from "path";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

async function getPhotos(): Promise<string[]> {
  const photosDir = path.join(process.cwd(), "public", "photos");
  try {
    const files = await fs.readdir(photosDir);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
    return files
      .filter((f) => imageExtensions.includes(path.extname(f).toLowerCase()))
      .map((f) => `/photos/${f}`);
  } catch {
    return [];
  }
}

export default async function Home() {
  const photos = await getPhotos();

  return (
    <main className="grain">
      <Hero />
      <Gallery photos={photos} />
      <Footer />
    </main>
  );
}
