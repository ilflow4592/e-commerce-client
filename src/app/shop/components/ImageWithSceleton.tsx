import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";

interface ImageWidthSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const imageLoader = ({ src }: { src: string }) => {
  return src; // Presigned URL 그대로 반환
};

const ImageWithSkeleton = ({
  src,
  alt,
  width = 100,
  height = 100,
}: ImageWidthSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setImageLoaded(true);
    };
    img.onerror = () => {
      setIsLoading(false);
    };
  }, [src]);

  return (
    <Box sx={{ width, height, position: "relative", overflow: "hidden" }}>
      {isLoading && <Skeleton variant="rounded" width="100%" height="100%" />}

      {imageLoaded && (
        <Image
          loader={imageLoader}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoading(false)}
          style={{
            display: isLoading ? "none" : "block",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      )}
    </Box>
  );
};

export default ImageWithSkeleton;
