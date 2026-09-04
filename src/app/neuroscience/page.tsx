import type { Metadata } from "next";
import { BrainExplorer } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "Brain Explorer", description: "Explore major brain structures with careful functional context." };
export default function Page(){return <BrainExplorer/>}
