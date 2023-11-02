"use client"
import React, {useState} from 'react';
import { Separator } from "@/components/ui/separator"
import {bodyDescription, bodyPoints, heartDescription, points} from "@/data/heart-points.data";
import {HiOutlineChevronDown, HiOutlineChevronUp} from "react-icons/hi";
import {isUndefined} from "lodash"
import {AiOutlineLeft} from "react-icons/ai";

type componentPropType = {
    children: React.ReactNode,
    setBodyTitleExpanded: React.Dispatch<React.SetStateAction<string>>,
    bodyTitleExpanded: string,
    setHeartTitleExpanded: React.Dispatch<React.SetStateAction<string>>,
    heartTitleExpanded: string,
    switchOrgans: boolean,
    setSwitchOrgans: React.Dispatch<React.SetStateAction<boolean>>,
}

const MainWrapper = ({children, switchOrgans, setSwitchOrgans, bodyTitleExpanded, setHeartTitleExpanded, heartTitleExpanded, setBodyTitleExpanded}: componentPropType) => {
    return (
        <div className={'flex h-screen'}>
            <div className={'flex flex-col w-[24%] px-3 overflow-auto pb-8'}>
                {switchOrgans ? (
                    <h1 className={'text-lg font-bold py-5'}>Blood Flow Through the Heart</h1>
                ) : (
                    <button className={'flex gap-3 my-5 items-center'} onClick={() => setSwitchOrgans(!switchOrgans)}>
                        <AiOutlineLeft />
                        <h1 className={'text-lg font-bold'}>Blood Flow Through the Body</h1>
                    </button>
                )}
                <Separator />
                {switchOrgans ? bodyDescription() : heartDescription()}
                <h1 className={'text-lg font-bold mt-5'}>LEGEND</h1>
                <div className={'px-5 pt-5 flex gap-5'}>
                    <div className={'w-5 h-5 bg-red-600 rounded-full'}/>
                    <p className={'text-sm'}>Oxygenated blood</p>
                </div>
                <div className={'p-5 flex gap-5'}>
                    <div className={'w-5 h-5 bg-blue-600 rounded-full'}/>
                    <p className={'text-sm'}>Deoxygenated blood</p>
                </div>
                <h1 className={'text-lg font-bold mt-5'}>LABELS</h1>
                {(switchOrgans ? bodyPoints : points).map((point, key) => (
                    <div key={key} className={'w-11/12'}>
                        <button disabled={isUndefined(point?.description)} onClick={() => {
                            if(switchOrgans) {
                                setBodyTitleExpanded(bodyTitleExpanded === point.title ? '' : point.title)
                            } else {
                                setHeartTitleExpanded(heartTitleExpanded === point.title ? '' : point.title)
                            }
                        }} className={`flex justify-between w-full ${!isUndefined(point?.description) && 'hover:bg-[#eee]'} p-4 rounded-md ${(switchOrgans ? bodyTitleExpanded : heartTitleExpanded) === point.title && 'border-blue-600 border'}`}>
                            <div className={'flex gap-5'}>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs ${(switchOrgans ? bodyTitleExpanded : heartTitleExpanded) === point.title ? 'font-bold border-blue-600' : 'font-normal border-[#adadad]'}`}>{key + 1}</div>
                                <p className={`${(switchOrgans ? bodyTitleExpanded : heartTitleExpanded) === point.title ? 'font-bold' : 'font-normal'}`}>{point.title}</p>
                            </div>
                            {!isUndefined(point?.description) && (
                                <>
                                    {(switchOrgans ? bodyTitleExpanded : heartTitleExpanded) !== point.title ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />}
                                </>
                            )}
                        </button>
                        {(switchOrgans ? bodyTitleExpanded : heartTitleExpanded) === point.title && point?.description && (
                            <div className={'px-4'}>{point?.description()}</div>
                        )}
                    </div>
                ))}
            </div>
            <div className={'bg-[#eee] w-[76%] flex flex-col items-center justify-center'}>
                {children}
            </div>
        </div>
    );
};

export default MainWrapper;
