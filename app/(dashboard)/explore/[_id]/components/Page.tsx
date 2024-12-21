import { ReactNode } from "react";

export const Page = ({ children, pageNumber, isThumbnail = false }: { children: ReactNode; pageNumber?: number, isThumbnail?: boolean }) => {
    return (
        <div className={`${isThumbnail ? "p-1" : "p-4"} bg-background overflow-y-auto relative flex flex-col items-center justify-between gap-2 h-full w-full border`}>
            {
                pageNumber &&
                <div className="flex justify-start w-full ">
                    <div className={`${isThumbnail ? "text-[5px] w-3 h-3 " : 'text-md w-8 h-8 font-bold '} bg-primary text-primary-foreground rounded-full flex justify-center items-center`}>
                        {pageNumber}
                    </div>
                </div>
            }
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                {children}
            </div>
        </div>
    );
};

export const ContentPage = ({ title, content, pageNumber, image }: { title?: string, content: string, pageNumber: number, image?: string }) => {
    return (
        <Page pageNumber={pageNumber}>
            <div className="flex flex-col justify-start items-center gap-2 w-full h-full">
                <img src={image || '/sample_cover_image.jpeg'} alt={title} className="w-full h-[250px] object-cover rounded-md" />
                {title && <h2 className="text-xl font-bold mt-1">{title}</h2>}
                <p className="text-sm text-gray-700">{content}</p>
            </div>
        </Page>
    );
}

ContentPage.Mini = ({ title, content, pageNumber, image }: { title?: string, content: string, pageNumber: number, image?: string }) => {
    return (
        <Page pageNumber={pageNumber} isThumbnail={true}>
            <div className="flex flex-col justify-start items-center gap-[2px] w-full h-full">
                <img
                    src={image || '/sample_cover_image.jpeg'}
                    alt={title}
                    className="w-full h-[50px] object-cover rounded-md"
                />
                {title && <h3 className="text-[6px] font-semibold mt-[1px] text-center">{title}</h3>}
                <p className="text-[4px] text-gray-600 text-center mt-[1px] overflow-hidden text-ellipsis">
                    {content.slice(0, 40)}...
                </p>
            </div>
        </Page>
    );
};

export const CoverPage = ({ title, coverImage }: { title: string, coverImage: string }) => {
    return (
        <Page>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <img src={coverImage} alt={title} className="w-full h-full object-cover rounded-md" />
            </div>
        </Page>
    );
}

CoverPage.Mini = ({ title, coverImage }: { title: string, coverImage: string }) => {
    return (
        <Page isThumbnail={true}>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <img src={coverImage} alt={title} className="w-24 h-24 object-cover rounded-md" />
                <h3 className="text-xs font-semibold">{title}</h3>
            </div>
        </Page>
    );
}

export const EndPage = ({ title }: { title?: string }) => {
    return (
        <Page>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <h2 className="text-xl font-bold">The End</h2>
                {title && <h3 className="text-lg text-gray-600">{title}</h3>}
            </div>
        </Page>
    );
}

EndPage.Mini = ({ title }: { title?: string }) => {
    return (
        <Page isThumbnail={true}>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <h3 className="text-xs font-semibold text-gray-600">The End</h3>
                {title && <p className="text-xs text-gray-500">{title}</p>}
            </div>
        </Page>
    );
}
