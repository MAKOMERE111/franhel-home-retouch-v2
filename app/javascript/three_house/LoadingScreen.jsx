import { Html, useProgress } from "@react-three/drei";

// Wraps the scene in <Suspense> even though the placeholder geometry has
// nothing to suspend on — this is the exact spot a real useGLTF("/models/
// house.glb") load will suspend, and useProgress will already report real
// download progress once that's in place.
export default function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="w-56 rounded-xl border border-line bg-surface/95 p-4 text-center shadow-lg backdrop-blur">
        <p className="font-display text-sm font-semibold text-ink">Loading the house…</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink-muted">{Math.round(progress)}%</p>
      </div>
    </Html>
  );
}
