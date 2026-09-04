import type { Metadata } from "next";
import { StudyTutor } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "BioVerse Study Guide", description: "A bounded, referenced biology topic guide with medical-safety limits." };
export default function Page(){return <StudyTutor/>}
