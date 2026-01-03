export type Project = {
  name: string;
  images: string[];
};

import lighting from "@/data/lighting.json"
import Link from "next/link";

export default async function ShowPage(){

  
  return (
    <div>
        {Object.entries(lighting as Record<string, Project>).map(
  ([showURL, project]: [string, Project]) => (
    <li key={showURL}>
        <Link href={`\lighting\\${showURL}`}>{project.name}</Link>
    </li>
  )
)}
    </div>
  )
}