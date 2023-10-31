import React from 'react'

export const points: {title: string, description?: () => React.ReactNode, top: number, left: number, flip: boolean}[] = [
    {
        title: 'Right atrium',
        description: () => <p className={'text-sm py-3'}>deoxygenated blood returns <span className={'font-bold italic'}>from the body</span></p>,
        top: 340 + 150,
        left: -60 + 100,
        flip: true
    },
    {
        title: 'Right ventricle',
        top: 710 + 150,
        left: 210 + 100,
        flip: true
    },
    {
        title: 'Pulmonary arteries',
        description: () => <p className={'text-sm py-3'}>deoxygenated blood goes <span className={'font-bold italic'}>to the lungs</span></p>,
        top: 310 + 150,
        left: 500 + 100,
        flip: false
    },
    {
        title: 'Left atrium',
        description: () => <p className={'text-sm py-3'}>oxygenated blood returns <span className={'font-bold italic'}>from the lungs</span></p>,
        top: 430 + 150,
        left: 510 + 100,
        flip: false
    },
    {
        title: 'Left ventricle',
        top: 700 + 150,
        left: 610 + 100,
        flip: false
    },
    {
        title: 'Aorta',
        description: () => <p className={'text-sm py-3'}>oxygenated blood is <span className={'font-bold italic'}>pumped to the body</span></p>,
        top: 210 + 150,
        left: 120 + 100,
        flip: true
    }
]
