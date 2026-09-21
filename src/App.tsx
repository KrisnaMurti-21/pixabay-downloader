import { useClasses } from "./hooks/useClasses";
import { useDatasetDownload } from "./hooks/useDatasetDownload";
import { HeroSection } from "./components/HeroSection";
import { ClassList } from "./components/ClassList";
import { AddClassButton } from "./components/AddClassButton";
import { DownloadPanel } from "./components/DownloadPanel";

export default function App() {
  const { classes, addClass, ...rest } = useClasses();
  const { status, isBusy, start } = useDatasetDownload(classes);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 flex flex-col gap-6">
      <HeroSection />
      <ClassList classes={classes} actions={{ addClass, ...rest }} />
      <AddClassButton onClick={addClass} />
      <DownloadPanel status={status} isBusy={isBusy} onStart={start} />

      <p className="text-xs text-muted text-center">
        Gambar dari Pixabay berlisensi bebas royalti untuk keperluan pendidikan
        dan non-komersial. Untuk objek yang bisa dihadirkan langsung di kelas,
        mengambil foto lewat kamera/webcam tetap jadi cara paling akurat untuk
        melatih model.
      </p>
    </div>
  );
}
