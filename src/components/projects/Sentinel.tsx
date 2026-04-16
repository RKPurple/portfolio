'use client'

import { TECH_STACK } from '@/lib/data'

const STACK = [
    'solidity',
    'python',
    'django',
    'web3',
    'remixide',
    'truffle',
    'ganache',
]

export default function Sentinel() {
    return (
        <>
            <div className='flex flex-row gap-2'>
                <button onClick={() => window.open('https://www.netki.com/', '_blank')} className="text-lg md:text-2xl font-nav text-link-color border-3 border-cs-purple px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-cs-purple hover:text-white hover:cursor-pointer">
                    Company Website
                </button>
                <button onClick={() => window.open('https://github.com/netkicorp/defi-sentinel-token-validators/tree/main/Ethereum', '_blank')} className="text-lg md:text-2xl font-nav text-link-color border-3 border-cs-purple px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-cs-purple hover:text-white hover:cursor-pointer">
                    Github Repo
                </button>
            </div>
            <div className="w-full self-start text-left">
                <p className="text-lg md:text-2xl font-nav text-link-color underline">Project Overview</p>
                <p className="text-sm md:text-md font-accent text-link-color">
                    My summer 2024 internship project. An open source smart contract that consumes and validates hashed tokens embedded during main Sentinel workflow on Ethereum blockchain transactions to check for KYC compliance.
                </p>
            </div>
            <div className="w-full self-start text-left">
                <p className="text-lg md:text-2xl font-nav text-link-color underline">Tech Used</p>
                <div className="mt-2 flex flex-row flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 md:gap-y-2">
                    {STACK.map((tech: string) => (
                        <div key={tech} className="flex flex-row items-center gap-2 font-accent text-lg">
                            {TECH_STACK.find((t) => t.id === tech)?.icon}
                            <p>{TECH_STACK.find((t) => t.id === tech)?.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-auto">
                <img src="/assets/sentinel.png" alt="Sentinel" className="w-auto object-contain bg-transparent" />
            </div>
        </>
    )
}