"use client";
import { useState } from "react";
import Image from "next/image";
import { ProjectVisual } from "../effects/system-visual";
export default function ProjectThumbnail({
  src,
  name,
  variant,
}: {
  src: string;
  name: string;
  variant: string;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <ProjectVisual variant={variant} compact />
  ) : (
    <Image
      src={src}
      alt={name}
      width={800}
      height={400}
      sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 45vw, 40vw"
      onError={() => setFailed(true)}
    />
  );
}
