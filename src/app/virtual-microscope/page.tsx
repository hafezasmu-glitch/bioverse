import type { Metadata } from "next";
import { Microscope } from "@/components/worlds/InteractiveWorlds";
export const metadata: Metadata = { title: "Virtual Microscope", description: "Practice slide selection, magnification, focus and structure identification." };
export default function Page(){return <Microscope/>}
