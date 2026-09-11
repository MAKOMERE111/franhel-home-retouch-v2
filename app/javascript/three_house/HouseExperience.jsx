import { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CameraRig from "./CameraRig";
import Lighting from "./scene/Lighting";
import PlaceholderHouse from "./scene/PlaceholderHouse";
import AmbientDrift from "./scene/AmbientDrift";
import LoadingScreen from "./LoadingScreen";
import LoginOverlay from "./overlays/LoginOverlay";
import PaintOverlay from "./overlays/PaintOverlay";
import TilingOverlay from "./overlays/TilingOverlay";
import ElectricalOverlay from "./overlays/ElectricalOverlay";
import { frameFor } from "./cameraFrames";

const OPENING_DURATION_MS = 1400;

export default function HouseExperience({ initialClient }) {
  const [client, setClient] = useState(initialClient);
  const [stage, setStage] = useState(initialClient ? "interior" : "exterior");

  const [paintColor, setPaintColor] = useState("#ede6da");
  const [tileColor, setTileColor] = useState("#c9c7c1");
  const [fixtureVariant, setFixtureVariant] = useState("classic");
  const [fixtureOn, setFixtureOn] = useState(true);

  const handleLoggedIn = useCallback((data) => {
    setClient(data);
    setStage("opening");
    window.setTimeout(() => setStage("interior"), OPENING_DURATION_MS);
  }, []);

  const backToHub = useCallback(() => setStage("interior"), []);

  const requestService = useCallback((service, description) => {
    const params = new URLSearchParams({ service, description });
    window.location.href = `/services/new?${params.toString()}`;
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas shadows camera={{ fov: 45 }}>
        <color attach="background" args={["#dfe7ea"]} />
        <fog attach="fog" args={["#dfe7ea", 12, 30]} />

        <CameraRig frame={frameFor(stage)} />
        <Lighting fixtureOn={fixtureOn} fixtureIntensity={1} />
        <AmbientDrift active={stage === "exterior"} />

        <Suspense fallback={<LoadingScreen />}>
          <PlaceholderHouse
            stage={stage}
            paintColor={paintColor}
            tileColor={tileColor}
            fixtureVariant={fixtureVariant}
            onSelectZone={(zone) => setStage(`zone:${zone}`)}
          />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0">
        {stage === "exterior" && <LoginOverlay onLoggedIn={handleLoggedIn} />}

        {stage === "zone:paint" && (
          <PaintOverlay
            color={paintColor}
            onPick={setPaintColor}
            onBack={backToHub}
            onRequest={(swatch) => requestService("Interior Painting", `Selected color: ${swatch.name}`)}
          />
        )}

        {stage === "zone:tiling" && (
          <TilingOverlay
            color={tileColor}
            onPick={setTileColor}
            onBack={backToHub}
            onRequest={(tile) => requestService("Floor Tiling", `Selected tile: ${tile.name}`)}
          />
        )}

        {stage === "zone:electrical" && (
          <ElectricalOverlay
            variant={fixtureVariant}
            on={fixtureOn}
            onPickVariant={setFixtureVariant}
            onToggle={() => setFixtureOn((v) => !v)}
            onBack={backToHub}
            onRequest={() => requestService("Electrical Installation", `Fixture style: ${fixtureVariant}`)}
          />
        )}

        {stage === "interior" && client && (
          <p className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-sm text-ink-muted">
            Click a wall, floor, or fixture to get started.
          </p>
        )}
      </div>
    </div>
  );
}
