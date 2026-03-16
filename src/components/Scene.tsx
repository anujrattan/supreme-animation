"use client";

import { useRef, useEffect, useState } from "react";

const mediaItems = [
  {
    type: "video",
    src: "/banner/banner-vid.mp4",
    alt: "Supreme Animation Studio Showreel - Professional Animation Services Demo",
  },
  {
    type: "image",
    src: "/banner/Banner_image_7.jpeg",
    alt: "Supreme Animation Studio - 3D Character Animation Showcase",
  },
  {
    type: "image",
    src: "/banner/Banner_image_4.jpeg",
    alt: "Supreme Animation Studio - Motion Graphics and Visual Effects Work",
  },
  {
    type: "image",
    src: "/banner/Banner_image_5.jpeg",
    alt: "Supreme Animation Studio - 2D Animation and Explainer Video Production",
  },
  {
    type: "image",
    src: "/banner/Banner_image_6.jpeg",
    alt: "Supreme Animation Studio - Architectural Visualization and 3D Rendering",
  },
];

export default function Scene() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentItem = mediaItems[currentIndex];

  useEffect(() => {
    // Clear any existing timeout
    if (imageTimeoutRef.current) {
      clearTimeout(imageTimeoutRef.current);
    }

    if (currentItem.type === "video") {
      // For video, play it and move to next when it ends
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay was prevented, but video will play on user interaction
        });

        const handleVideoEnd = () => {
          setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
        };

        videoRef.current.addEventListener("ended", handleVideoEnd);

        return () => {
          if (videoRef.current) {
            videoRef.current.removeEventListener("ended", handleVideoEnd);
          }
        };
      }
    } else {
      // For images, show for 3 seconds then move to next
      imageTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
      }, 3000);
    }

    return () => {
      if (imageTimeoutRef.current) {
        clearTimeout(imageTimeoutRef.current);
      }
    };
  }, [currentIndex, currentItem.type]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {currentItem.type === "video" ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-label={currentItem.alt || "Supreme Animation Studio Showreel"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src={currentItem.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={currentItem.src}
          alt={currentItem.alt || "Supreme Animation Studio Portfolio Showcase"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
    </div>
  );
}
