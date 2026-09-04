import type { Metadata } from "next";
import { PlantSimulator } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "Plant Biology", description: "Explore limiting factors in a simplified photosynthesis simulation." };
export default function Page(){return <PlantSimulator/>}
