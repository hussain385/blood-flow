"use client"
import MainWrapper from "@/wrapper/main-wrapper";
import HeartCanvasComponent from "@/components/heart-canvas.component";
import {useRef, useState} from "react";
import BodyCanvasComponent from "@/components/body-canvas.component";

export default function Home() {
    const [switchOrgans, setSwitchOrgans] = useState<boolean>(true);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [bodyTitleExpanded, setBodyTitleExpanded] = useState<string>('');
    const [heartTitleExpanded, setHeartTitleExpanded] = useState<string>('');;

    return (
        <MainWrapper switchOrgans={switchOrgans} setSwitchOrgans={setSwitchOrgans} bodyTitleExpanded={bodyTitleExpanded} setBodyTitleExpanded={setBodyTitleExpanded} heartTitleExpanded={heartTitleExpanded} setHeartTitleExpanded={setHeartTitleExpanded}>
            {switchOrgans ? (
                <BodyCanvasComponent setSwitchOrgans={setSwitchOrgans} titleExpanded={bodyTitleExpanded} setTitleExpanded={setBodyTitleExpanded}
                                     canvasHeight={790} canvasWidth={900} canvasRef={canvasRef}/>

            ) : (
                <HeartCanvasComponent titleExpanded={heartTitleExpanded} setTitleExpanded={setHeartTitleExpanded}
                                      canvasHeight={790} canvasWidth={900} canvasRef={canvasRef}/>
            )}
        </MainWrapper>
    )
}
