import type { Metadata } from "next";
import { LocalDashboard } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "Learning Dashboard", description: "Private, local-first learning progress for BioVerse." };
export default function Page(){return <LocalDashboard/>}
