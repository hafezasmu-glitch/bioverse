import type { Metadata } from "next";
import { OsmosisLab } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "Virtual Lab", description: "A guided, interactive osmosis experiment with observations and safety context." };
export default function Page(){return <OsmosisLab/>}
