import type { Metadata } from "next";
import { MicroScaleExplorer } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "Micro World", description: "Compare representative microscopic objects on a meaningful size scale." };
export default function Page(){return <MicroScaleExplorer/>}
