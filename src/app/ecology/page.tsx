import type { Metadata } from "next";
import { EcologyExplorer } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "Ecology World", description: "Explore trophic levels and energy transfer in a food chain." };
export default function Page(){return <EcologyExplorer/>}
