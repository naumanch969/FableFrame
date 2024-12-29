"use client"
import { ReactNode, useState, useEffect } from "react";

export const Page = ({ children, pageNumber, isThumbnail = false }: { children: ReactNode; pageNumber?: number, isThumbnail?: boolean }) => {
    return (
        <div className={`${isThumbnail ? "p-1" : "p-4"} bg-background overflow-y-auto relative flex flex-col items-center justify-between gap-2 h-full w-full border`}>
            {
                pageNumber &&
                <div className="flex justify-start w-full">
                    <div className={`${isThumbnail ? "text-[5px] w-3 h-3" : 'text-md w-8 h-8 font-bold'} bg-theme-gradient text-primary-foreground rounded-full flex justify-center items-center`}>
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
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [speed, setSpeed] = useState(1);
    const [speaking, setSpeaking] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const fetchVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0]);
            }
        };

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = fetchVoices;
        }
        fetchVoices();
    }, []);

    const handleSpeak = () => {
        if (!content.trim()) {
            alert("Please enter some text.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(content);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.rate = speed; // Set the speech rate correctly

        setSpeaking(true);
        window.speechSynthesis.speak(utterance);

        utterance.onend = () => {
            setSpeaking(false);
        };
    };

    return (
        <Page pageNumber={pageNumber}>
            <div className="relative flex flex-col justify-start items-center gap-2 w-full h-full">
                {/* Image Above the Title */}
                <img
                    src={image || '/sample_cover_image.jpeg'}
                    alt={title}
                    className="w-full h-[250px] object-cover rounded-md"
                />

                {/* Title and Mic Icon Inline */}
                <div className="flex items-center gap-2 relative">
                    {title && <h2 className="text-xl font-bold mt-1">{title}</h2>}
                    {content && title && (
                        <div
                            className="relative flex items-center cursor-pointer"
                            onClick={handleSpeak}
                            onMouseEnter={() => setShowOptions(true)}
                            onMouseLeave={() => setShowOptions(false)}
                            title="Click to listen"
                        >
                            <img
                                src="/mic.svg"
                                alt="Mic Icon"
                                className={`w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80 ${speaking ? 'animate-pulse' : ''}`}
                            />
                            {showOptions && (
                                <div
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 bg-surface p-4 rounded-lg shadow-lg flex flex-col gap-4 z-10 w-64"
                                    onMouseEnter={() => setShowOptions(true)} // Keep dropdown visible when hovering over it
                                    onMouseLeave={() => setShowOptions(false)} // Hide dropdown when mouse leaves
                                >
                                    {/* Voice Selection */}
                                    <div>
                                        <label htmlFor="voice-select" className="text-sm font-semibold text-gray-700">Voice</label>
                                        <select
                                            id="voice-select"
                                            value={selectedVoice ? selectedVoice.name : ""}
                                            onChange={(e) => {
                                                const selected = voices.find(voice => voice.name === e.target.value);
                                                if (selected) setSelectedVoice(selected);
                                            }}
                                            className="border rounded-md p-2 mt-1 w-full text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                        >
                                            {voices.map((voice) => (
                                                <option key={voice.name} value={voice.name}>
                                                    {voice.name} ({voice.lang})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Speed Slider */}
                                    <div>
                                        <label htmlFor="speed-slider" className="text-sm font-semibold text-gray-700">Speed</label>
                                        <input
                                            id="speed-slider"
                                            type="range"
                                            min={0.1}
                                            max={2}
                                            step={0.1}
                                            value={speed}
                                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                            className="w-full mt-2 bg-gray-200 rounded-md"
                                        />
                                        <div className="text-sm text-center mt-1">{speed.toFixed(1)}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <p className="text-sm text-surface-foreground mt-2">{content}</p>
            </div>
        </Page>
    );
};

ContentPage.Mini = ({ title, content, pageNumber, image }: { title?: string, content: string, pageNumber: number, image?: string }) => {
    return (
        <Page pageNumber={pageNumber} isThumbnail={true}>
            <div className="flex flex-col justify-start items-center gap-[2px] w-full h-full">
                <img
                    src={image || '/sample_cover_image.jpeg'}
                    alt={title}
                    className="w-full object-cover rounded-md"
                />
                {/* {title && <h6 className="text-[6px] font-semibold mt-[1px] text-center">{title}</h6>} */}
                {/* <p className="text-[4px] text-gray-600 text-center mt-[1px] overflow-hidden text-ellipsis">
                    {content.slice(0, 40)}...
                </p> */}
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
};

CoverPage.Mini = ({ title, coverImage }: { title: string, coverImage: string }) => {
    return (
        <Page isThumbnail={true}>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <img src={coverImage} alt={title} className="w-full object-cover rounded-md" />
                {/* <h3 className="text-xs font-semibold">{title}</h3> */}
            </div>
        </Page>
    );
};

export const EndPage = ({ title }: { title?: string }) => {
    return (
        <Page>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <h2 className="text-xl font-bold">The End</h2>
                {title && <h3 className="text-lg text-gray-600">{title}</h3>}
            </div>
        </Page>
    );
};

EndPage.Mini = ({ title }: { title?: string }) => {
    return (
        <Page isThumbnail={true}>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <h3 className="text-xs font-semibold text-gray-600">The End</h3>
                {title && <p className="text-xs text-gray-500">{title}</p>}
            </div>
        </Page>
    );
};
