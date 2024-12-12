import { ReactNode } from "react";

export const Page = ({ children, pageNumber, isThumbnail = false }: { children: ReactNode; pageNumber?: number, isThumbnail?: boolean }) => {
    return (
        <div className={`${isThumbnail ? "p-1" : "p-4"} flex flex-col items-center justify-between h-full w-full bg-gray-100 border`}>
            <div className="flex-1 flex items-center justify-center text-center">
                {children}
            </div>
            {
                pageNumber &&
                <div className={`${isThumbnail ? "text-[4px]" : 'text-sm'} text-gray-500 mt-2`}>{pageNumber}</div>
            }
        </div>
    );
};

export const ContentPage = ({ title, content, pageNumber }: { title?: string, content: string, pageNumber: number }) => {
    return (
        <Page pageNumber={pageNumber}>
            <div className="text-center">
                {title && <h2 className="text-xl font-bold">{title}</h2>}
                <p className="mt-2 text-sm text-gray-700">{content}</p>
            </div>
        </Page>
    );
}

ContentPage.Mini = ({ title, content, pageNumber }: { title?: string, content: string, pageNumber: number }) => {
    return (
        <Page pageNumber={pageNumber} isThumbnail={true}>
            <div className="text-center">
                {title && <h3 className="text-[4px] font-semibold">{title}</h3>}
                <p className="mt-1 text-[2px] text-gray-600">{content}</p>
            </div>
        </Page>
    );
}

export const CoverPage = ({ title, coverImage }: { title: string, coverImage: string }) => {
    return (
        <Page>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <img src={coverImage} alt={title} className="w-full h-64 object-cover rounded-md" />
                <h2 className="text-xl font-bold mt-4">{title}</h2>
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
