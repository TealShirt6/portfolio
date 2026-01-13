"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "react-photo-album"
import Lightbox from "./Lightbox";


import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";


function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes="200vw"
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}

export default function PhotoGallery({photos, targetHeight=300}: {photos: Photo[], targetHeight?: number}) {
  const [index, setIndex] = useState(-1);

  return (
    <>
    <RowsPhotoAlbum
      photos={photos}
      render={{ image: renderNextImage }}
      targetRowHeight={targetHeight}
        sizes={{
        size: "1168px",
        sizes: [
          { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
        ],
      }}
      // onClick={(photo) => setIndex(photo.index)}
      onClick={({index}) => {
          setIndex(index)
      }}
      />

      {
        (index > -1) && createPortal(<Lightbox photos={photos} startIndex={index} onClick={()=>setIndex(-1)}></Lightbox>, document.body)

      }
    </>
  );
}