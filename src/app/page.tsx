"use client"
import MainWrapper from "@/wrapper/main-wrapper";
import CanvasComponent from "@/components/canvas.component";
import {useRef, useState} from "react";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [titleExpanded, setTitleExpanded] = useState<string>('');

  return (
      <MainWrapper titleExpanded={titleExpanded} setTitleExpanded={setTitleExpanded}>
          <CanvasComponent titleExpanded={titleExpanded} setTitleExpanded={setTitleExpanded} canvasHeight={790} canvasWidth={900} canvasRef={canvasRef}/>
      </MainWrapper>
  )
}
