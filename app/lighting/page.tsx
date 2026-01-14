export type Project = {
  name: string;
  details: string;
  description: string;
  photoCredits: string;
  showPhotos: {width: number, height: number, path: string}[];
  paperworkImages: {width: number, height: number, path: string}[];
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