import { useCallback, useState } from "react";
import HouseStage from "./stage/HouseStage";
import LoginOverlay from "./overlays/LoginOverlay";
import PaintOverlay from "./overlays/PaintOverlay";
import TilingOverlay from "./overlays/TilingOverlay";
import ElectricalOverlay from "./overlays/ElectricalOverlay";
import { PAINT_SWATCHES, TILE_VARIANTS, FIXTURE_VARIANTS } from "./imageManifest";

const OPENING_DURATION_MS = 1000;

export default function HouseExperience({ initialClient }) {
  const [client, setClient] = useState(initialClient);
  const [stage, setStage] = useState(initialClient ? "interior" : "exterior");

  const [paintColor, setPaintColor] = useState(PAINT_SWATCHES[1].value); // Warm Plaster
  const [tileImage, setTileImage] = useState(TILE_VARIANTS[0].image);
  const [fixtureVariant, setFixtureVariant] = useState(FIXTURE_VARIANTS[0].key);
  const [fixtureOn, setFixtureOn] = useState(true);

  const fixtureImage = FIXTURE_VARIANTS.find((f) => f.key === fixtureVariant).image;

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
      <HouseStage
        stage={stage}
        tileImage={tileImage}
        fixtureImage={fixtureImage}
        fixtureOn={fixtureOn}
        paintColor={paintColor}
        onSelectZone={(zone) => setStage(`zone:${zone}`)}
      />

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
            image={tileImage}
            onPick={setTileImage}
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
