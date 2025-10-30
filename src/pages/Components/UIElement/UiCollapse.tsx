import React from "react";
import BreadCrumb from "Common/BreadCrumb";
import Collapse from "Common/Components/Collapse/Collapse";
import { ChevronDown, ChevronUp } from "lucide-react";

const UiCollapse = () => {
    return (
        <React.Fragment>
            <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
                <BreadCrumb title='Collapse' pageTitle='UI Elements' />
                <div>
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Default</h6>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Collapse>
                                    <Collapse.Trigger className="flex text-white collapsible-header group/item btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">
                                        Collapsible Button
                                        <div className="ltr:ml-2 rtl:mr-2 shrink-0">
                                            <ChevronDown className="hidden size-4 group-[.show]/item:inline-block"></ChevronDown>
                                            <ChevronUp className="inline-block size-4 group-[.show]/item:hidden"></ChevronUp>
                                        </div>
                                    </Collapse.Trigger>
                                    <Collapse.Content className="mt-2 mb-0 collapsible-content card">
                                        <div className="card-body">
                                            <p>For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live. You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco.</p>
                                        </div>
                                    </Collapse.Content>
                                </Collapse>

                                <Collapse>
                                    <Collapse.Trigger className="flex text-white collapsible-header group/item btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">
                                        Collapsible Button
                                        <div className="ltr:ml-2 rtl:mr-2 shrink-0">
                                            <ChevronDown className="hidden size-4 group-[.show]/item:inline-block"></ChevronDown>
                                            <ChevronUp className="inline-block size-4 group-[.show]/item:hidden"></ChevronUp>
                                        </div>
                                    </Collapse.Trigger>
                                    <Collapse.Content className="mt-2 mb-0 collapsible-content card">
                                        <div className="card-body">
                                            <p>For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live. You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco.</p>
                                        </div>
                                    </Collapse.Content>
                                </Collapse>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Link Collapse</h6>
                            <Collapse>
                                <Collapse.Trigger as="a" href="#!" className="flex bg-white border-white collapsible-header group/item text-fecustom-500 btn hover:text-fecustom-700 focus:text-fecustom-700 active:text-fecustom-700 dark:bg-zinc-700 dark:border-zinc-700">
                                    Collapsible Link
                                </Collapse.Trigger>
                                <Collapse.Content className="mt-2 mb-0 collapsible-content card">
                                    <div className="card-body">
                                        <p>For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live. You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco.</p>
                                    </div>
                                </Collapse.Content>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UiCollapse;