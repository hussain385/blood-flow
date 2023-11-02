import React from 'react'
import {Button} from "@/components/ui/button";

export const points: {title: string, description?: () => React.ReactNode, top: number, left: number, flip: boolean}[] = [
    {
        title: 'Right atrium',
        description: () => <p className={'text-sm py-3'}>deoxygenated blood returns <span className={'font-bold italic'}>from the body</span></p>,
        top: 280 - 10,
        left: -50 + 50,
        flip: true
    },
    {
        title: 'Right ventricle',
        top: 560 - 10,
        left: 200 + 50,
        flip: true
    },
    {
        title: 'Pulmonary arteries',
        description: () => <p className={'text-sm py-3'}>deoxygenated blood goes <span className={'font-bold italic'}>to the lungs</span></p>,
        top: 255 - 10,
        left: 470 + 50,
        flip: false
    },
    {
        title: 'Left atrium',
        description: () => <p className={'text-sm py-3'}>oxygenated blood returns <span className={'font-bold italic'}>from the lungs</span></p>,
        top: 370 - 10,
        left: 430 + 50,
        flip: false
    },
    {
        title: 'Left ventricle',
        top: 560 - 10,
        left: 500 + 50,
        flip: false
    },
    {
        title: 'Aorta',
        description: () => <p className={'text-sm py-3'}>oxygenated blood is <span className={'font-bold italic'}>pumped to the body</span></p>,
        top: 170 - 10,
        left: 65 + 50,
        flip: true
    }
]

export const bodyPoints: {title: string, description?: () => React.ReactNode, top: number, left: number, flip: boolean, organSwitch?: (onClick: () => void) => React.ReactNode}[] = [
    {
        title: 'Shoulders',
        description: () => <p className={'text-sm py-3'}>deoxygenated blood returns <span className={'font-bold italic'}>from the body</span></p>,
        top: 280 - 10,
        left: -50 + 50,
        flip: true
    },
    {
        title: 'Small intestine',
        top: 560 - 10,
        left: 200 + 50,
        flip: true
    },
    {
        title: 'Heart',
        description: () => <p className={'text-sm py-3'}>oxygenated blood returns <span className={'font-bold italic'}>from the lungs</span></p>,
        top: 370 - 10,
        left: 400 + 50,
        flip: false,
        organSwitch: (onClick: () => void) => (
            <Button onClick={onClick} variant={'ghost'} className={'text-blue-600 px-0'}>
                More details ->
            </Button>
        )
    },
    {
        title: 'Mouth',
        description: () => <p className={'text-sm py-3'}>oxygenated blood is <span className={'font-bold italic'}>pumped to the body</span></p>,
        top: 170 - 10,
        left: 65 + 50,
        flip: true
    }
]

export const heartDescription = () => (
    <p className={'py-5 text-sm'}>
        In a healthy heart, <span className={'font-bold'}>deoxygenated blood</span> (blue) flows from the body into the <span className={'font-bold'}>right atrium</span>, then into the <span className={'font-bold'}>right ventricle</span>. The blood is pumped through the <span className={'font-bold'}>pulmonary arteries</span> into the lungs, where it becomes oxygenated.
        <br /><br />
        The <span className={'font-bold'}>oxygenated blood</span> (red) returns to the heart via the <span className={'font-bold'}>pulmonary veins</span>, which empty into the <span className={'font-bold'}>left atrium</span>.
        <br /><br />
        Next, the <span className={'font-bold'}>left ventricle</span> pumps oxygenated blood out of the heart through the <span className={'font-bold'}>aorta</span>. The oxygenated blood supplies all the tissues and organs throughout the body.
    </p>
)

export const bodyDescription = () => (
    <p className={'py-5 text-sm'}>
        Lorem ipsum dolor sit amet, <span className={'font-bold'}>consectetur adipiscing elit.</span> Vivamus interdum orci libero, vitae vehicula nisi condimentum sed <span className={'font-bold'}>Maecenas at</span>, sem eget urna scelerisque interdum. <span className={'font-bold'}>Pellentesque ut</span>. endum nunc, eget orn <span className={'font-bold'}>ue sed ipsum. Nunc in </span> Donec vestibulum ac lectus non tempor. Maecenas fermentum libero vel dolor imperdiet fringilla.
        <br /><br />
        Uada fames ac ante ipsum primis in faucibus. Sed ac velit sapie <span className={'font-bold'}>aliquam lectus id</span> por enim et ante accumsan semper id et augue. Aenean at auctor diam. <span className={'font-bold'}>eu sapien non, mollis dignissim met</span>.
        <br /><br />
        interdum arcu dolor, vitae aliquet leo semper <span className={'font-bold'}>a condimentum, sed accum</span> Sed euismod blandit est eget accumsan. Pellentesque arcu mauris, <span className={'font-bold'}>efficitur</span>. Aenean facilisis et velit at laoreet. Vivamus lobortis vitae leo ac eleifend.
    </p>
)
