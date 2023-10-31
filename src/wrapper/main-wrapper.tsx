"use client"
import React, {useState} from 'react';
import { Separator } from "@/components/ui/separator"
import {points} from "@/data/heart-points.data";
import {HiOutlineChevronDown, HiOutlineChevronUp} from "react-icons/hi";
import {isUndefined} from "lodash"

const MainWrapper = ({children, setTitleExpanded, titleExpanded}: {children: React.ReactNode, setTitleExpanded: React.Dispatch<React.SetStateAction<string>>, titleExpanded: string}) => {
    return (
        <div className={'flex h-screen'}>
            <div className={'flex flex-col w-[21%] mx-3'}>
                <h1 className={'text-lg font-bold py-5'}>Blood Flow Through the Heart</h1>
                <Separator />
                <p className={'py-5 text-sm'}>
                    In a healthy heart, <span className={'font-bold'}>deoxygenated blood</span> (blue) flows from the body into the <span className={'font-bold'}>right atrium</span>, then into the <span className={'font-bold'}>right ventricle</span>. The blood is pumped through the <span className={'font-bold'}>pulmonary arteries</span> into the lungs, where it becomes oxygenated.
                    <br /><br />
                    The <span className={'font-bold'}>oxygenated blood</span> (red) returns to the heart via the <span className={'font-bold'}>pulmonary veins</span>, which empty into the <span className={'font-bold'}>left atrium</span>.
                    <br /><br />
                    Next, the <span className={'font-bold'}>left ventricle</span> pumps oxygenated blood out of the heart through the <span className={'font-bold'}>aorta</span>. The oxygenated blood supplies all the tissues and organs throughout the body.
                </p>
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
                {points.map((point, key) => (
                    <div key={key} className={'w-11/12'}>
                        <button disabled={isUndefined(point?.description)} onClick={() => setTitleExpanded(titleExpanded === point.title ? '' : point.title)} className={`flex justify-between w-full ${!isUndefined(point?.description) && 'hover:bg-[#eee]'} p-4 rounded-md ${titleExpanded === point.title && 'border-blue-600 border'}`}>
                            <div className={'flex gap-5'}>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs ${titleExpanded === point.title ? 'font-bold border-blue-600' : 'font-normal border-[#adadad]'}`}>{key + 1}</div>
                                <p className={`${titleExpanded === point.title ? 'font-bold' : 'font-normal'}`}>{point.title}</p>
                            </div>
                            {!isUndefined(point?.description) && (
                                <>
                                    {titleExpanded !== point.title ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />}
                                </>
                            )}
                        </button>
                        {titleExpanded === point.title && point?.description && (
                            <div className={'px-4'}>{point?.description()}</div>
                        )}
                    </div>
                ))}
            </div>
            <div className={'bg-[#eee] w-[77%] flex flex-col items-center justify-center'}>
                {children}
            </div>
        </div>
    );
};

export default MainWrapper;
