import React from 'react'

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
