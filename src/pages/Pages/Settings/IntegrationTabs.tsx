import React from "react";

// Image
import meta from "assets/images/brand/meta.png"
import figma from "assets/images/brand/figma.png"
import telegram from "assets/images/brand/telegram.png"
import { Cable } from "lucide-react";

interface CardData { id: number; logo: string; title: string; description: string }

const cardData: CardData[] = [
    {
        id: 1,
        logo: meta,
        title: 'Meta',
        description: 'Meta Platforms Inc, which used to be called Facebook Inc.',
    },
    {
        id: 2,
        logo: figma,
        title: 'Figma Tools',
        description: 'Figma is a cloud-based design tool that is similar to Sketch in functionality and features.',
    },
    {
        id: 3,
        logo: telegram,
        title: 'Telegram Channel',
        description: 'Telegram Tools offers multiple useful tools for Telegram users.',
    },
];

const IntegrationTabs = () => {
    return (
        <React.Fragment>
            <h6 className="mb-4 text-15">Connected Apps</h6>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 xl:grid-cols-4">
                {
                    (cardData || [])?.map((item: CardData, index: number) => (
                        <div className="card" key={index}>
                            <div className="card-body">
                                <div className="flex gap-3 mb-5">
                                    <div className="grow">
                                        <img src={item.logo} alt="" className="h-8" />
                                    </div>
                                    <div className="shrink-0">
                                        <button type="button" className="px-2 py-1.5 text-xs bg-white border-dashed text-fecustom-500 btn border-fecustom-500 hover:text-fecustom-500 hover:bg-fecustom-50 hover:border-fecustom-600 focus:text-fecustom-600 focus:bg-fecustom-50 focus:border-fecustom-600 active:text-fecustom-600 active:bg-fecustom-50 active:border-fecustom-600 dark:bg-zinc-700 dark:ring-fecustom-400/20 dark:hover:bg-fecustom-800/20 dark:focus:bg-fecustom-800/20 dark:active:bg-fecustom-800/20">
                                            <Cable className="inline-block size-3 ltr:mr-1 rtl:ml-1"></Cable>
                                            Connect</button>
                                    </div>
                                </div>

                                <h6 className="mb-2 text-16">{item.title}</h6>
                                <p className="text-slate-500 dark:text-zinc-200">{item.description}</p>
                            </div>
                        </div>

                    ))
                }
            </div>
        </React.Fragment>
    );
}

export default IntegrationTabs;