"use client"
import React, {MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {bodyPoints, points} from "@/data/heart-points.data";
import {isEmpty} from "lodash";

type CanvasProps = {
    canvasWidth: number;
    canvasHeight: number;
    canvasRef: MutableRefObject<HTMLCanvasElement | null>
    setTitleExpanded: React.Dispatch<React.SetStateAction<string>>,
    titleExpanded: string,
    setSwitchOrgans: React.Dispatch<React.SetStateAction<boolean>>,
};

type Point = {
    x: number;
    y: number;
};

const ORIGIN = Object.freeze({x: 0, y: 0});

interface Window {
    Image: {
        prototype: HTMLImageElement;
        new (): HTMLImageElement;
    };
}
// adjust to device to avoid blur
let ratio: number = 1
if (typeof window !== "undefined") {
    const {devicePixelRatio: ratioWindow = 1} = window;
    ratio = ratioWindow
}

function diffPoints(p1: Point, p2: Point) {
    return {x: p1.x - p2.x, y: p1.y - p2.y};
}

function addPoints(p1: Point, p2: Point) {
    return {x: p1.x + p2.x, y: p1.y + p2.y};
}

function scalePoint(p1: Point, scale: number) {
    return {x: p1.x / scale, y: p1.y / scale};
}

const ZOOM_SENSITIVITY = 500; // bigger for lower zoom per scroll

const BodyCanvasComponent = ({canvasWidth, canvasHeight, canvasRef, titleExpanded, setTitleExpanded, setSwitchOrgans}: CanvasProps) => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [scale, setScale] = useState<number>(1);
    const [zoomIn, setZoomIn] = useState<number>(1);
    const [top1, setTop1] = useState<number>(1);
    const [left1, setLeft1] = useState<number>(1);
    const [selectedLabel1, setSelectedLabel1] = useState<string>('');
    const [flip1, setFlip1] = useState<boolean>(true);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    const [viewportTopLeft, setViewportTopLeft] = useState<Point>(ORIGIN);
    const isResetRef = useRef<boolean>(false);
    const lastMousePosRef = useRef<Point>(ORIGIN);
    const lastOffsetRef = useRef<Point>(ORIGIN);
    const zooming = useRef(false)

    // update last offset
    useEffect(() => {
        lastOffsetRef.current = offset;
    }, [offset]);

    // reset
    const reset = useCallback(
        (context: CanvasRenderingContext2D) => {
            if (context && !isResetRef.current) {
                // adjust for device pixel density
                context.canvas.width = canvasWidth;
                context.canvas.height = canvasHeight;
                setScale(1);

                // reset state and refs
                setContext(context);
                setOffset(ORIGIN);
                setViewportTopLeft(ORIGIN);
                lastOffsetRef.current = ORIGIN;
                lastMousePosRef.current = ORIGIN;

                // this thing is so multiple resets in a row don't clear canvas
                isResetRef.current = true;
            }
        },
        [canvasWidth, canvasHeight]
    );

    // functions for panning
    const mouseMove = useCallback(
        (event: MouseEvent) => {
            if (context) {
                const lastMousePos = lastMousePosRef.current;
                const currentMousePos = {x: event.pageX, y: event.pageY}; // use document so can pan off element
                lastMousePosRef.current = currentMousePos;
                zooming.current = false
                const mouseDiff = diffPoints(currentMousePos, lastMousePos);
                setOffset((prevOffset) => addPoints(prevOffset, mouseDiff));
            }
        },
        [context]
    );

    const mouseUp = useCallback(() => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }, [mouseMove]);

    const startPan = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
            lastMousePosRef.current = {x: event.pageX, y: event.pageY};
        },
        [mouseMove, mouseUp]
    );

    // setup canvas and set context
    useLayoutEffect(() => {
        if (canvasRef.current) {
            // get new drawing context
            const renderCtx = canvasRef.current.getContext("2d");

            if (renderCtx) {
                reset(renderCtx);
            }
        }
    }, [reset, canvasHeight, canvasWidth]);

    // pan when offset or scale changes
    useLayoutEffect(() => {
        if (context && lastOffsetRef.current) {
            const offsetDiff = scalePoint(
                diffPoints(offset, lastOffsetRef.current),
                scale
            );
            if (!zooming.current) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
            }
            context.translate(offsetDiff.x, offsetDiff.y);
            setViewportTopLeft((prevVal) => diffPoints(prevVal, offsetDiff));
            isResetRef.current = false;
        }
    }, [context, offset, scale]);

    useLayoutEffect(() => {
        if (context) {
            const image = new window.Image();
            const squareWidth = 370;
            const squareHeight = 550
            image.src = "https://medlineplus.gov/images/Anatomy_share.jpg"
            image.onload = () => {
                context.drawImage(image, canvasWidth / 2 - squareWidth / 2, canvasHeight / 2 - squareHeight / 2, squareWidth, squareHeight);
            };
        }
    }, [
        canvasWidth,
        canvasHeight,
        context,
        scale,
        offset,
        viewportTopLeft
    ]);

    useLayoutEffect(() => {
        if (context) {
            // Set the transformation matrix for scaling
            const zoom = 1 + zoomIn / ZOOM_SENSITIVITY;
            const viewportTopLeftDelta = {
                x: ((flip1 ? left1 + (selectedLabel1 === 'Small intestine' ? 200 : 380) : left1) / scale) * (1 - 1 / zoom),
                y: (top1 / scale) * (1 - 1 / zoom)
            };
            const newViewportTopLeft = addPoints(
                viewportTopLeft,
                viewportTopLeftDelta
            );

            context.translate(viewportTopLeft.x, viewportTopLeft.y);
            context.scale(zoom, zoom);
            context.translate(-newViewportTopLeft.x, -newViewportTopLeft.y);

            setViewportTopLeft(newViewportTopLeft);
            setScale(scale * zoom);
        }
    }, [
        zoomIn,
        top1,
        left1,
    ]);


    const handleSelectLabel = (selectedLabel: string, top: number, left: number, flip: boolean) => {
        if(selectedLabel === titleExpanded) {
            setTitleExpanded('')
            setFlip1(true)
            setTop1(1)
            setLeft1(1)
            setZoomIn(1)
            setSelectedLabel1('')
            zooming.current = false
            if (context) {
                reset(context)
            }
        } else {
            zooming.current = true
            setTitleExpanded(selectedLabel)
            setTop1(top)
            setLeft1(left)
            setFlip1(flip)
            setSelectedLabel1(selectedLabel)
            for (let x = 1; x <= 60; x=x+0.3){
                setTimeout(() => {
                    setZoomIn(x)
                }, 10)
            }
        }
    }

    return (
        <div className={'relative'}>
            {bodyPoints.map((point, key) => {
                if(isEmpty(titleExpanded)){
                    return (
                        <div key={key} className={'absolute flex gap-10'} style={{
                            top: `${point.top + offset.y}px`,
                            left: `${point.left + offset.x}px`
                        }}>
                            {!point.flip && <div
                                className={`w-5 h-5 rounded-full text-white flex items-center justify-center border text-xs border-[#fff]`}>{key + 1}</div>}
                            <button onClick={() => handleSelectLabel(point.title, point.top + offset.y, point.left + offset.x, point.flip)} className={'bg-[#fffffff2] border border-[#adadad] p-4 rounded-md hover:border-blue-600 text-start'}>
                                <p className={'text-sm'}>{point.title}</p>
                                {point?.description && point?.description()}
                            </button>
                            {point.flip && <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center border text-xs border-[#fff]`}>{key + 1}</div>}
                        </div>
                    )
                } else if (titleExpanded === point.title) {
                    return (
                        <div key={key} className={'absolute flex gap-10'} style={{
                            top: `${point.top + offset.y}px`,
                            left: `${point.left + offset.x}px`
                        }}>
                            {!point.flip && <div
                                className={`w-5 h-5 rounded-full text-white flex items-center justify-center border text-xs ${titleExpanded === point.title ? 'border-blue-600' : 'border-[#fff]'}`}>{key + 1}</div>}
                            <button onClick={() => handleSelectLabel(point.title, point.top + offset.y, point.left + offset.x, point.flip)} className={`bg-[#fffffff2] border ${titleExpanded === point.title ? 'border-blue-600' : 'border-[#adadad]'} p-4 rounded-md hover:border-blue-600 text-start`}>
                                <p className={'text-sm'}>{point.title}</p>
                                {point?.description && point?.description()}
                                {titleExpanded === point.title && point.organSwitch && point.organSwitch(() => setSwitchOrgans(false))}
                            </button>
                            {point.flip && <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center border text-xs ${titleExpanded === point.title ? 'border-blue-600' : 'border-[#fff]'}`}>{key + 1}</div>}
                        </div>
                    )
                }
            })}
            <canvas
                onMouseDown={startPan}
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
            >
            </canvas>
            <button>

            </button>
        </div>
    );
};

export default BodyCanvasComponent;
