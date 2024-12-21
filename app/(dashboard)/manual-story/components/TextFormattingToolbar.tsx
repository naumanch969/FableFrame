"use client";

import { useState } from 'react';

interface TextFormattingToolbarProps {
    setContent: React.Dispatch<React.SetStateAction<string>>;
    content: string;
}

export const TextFormattingToolbar = ({ setContent, content }: TextFormattingToolbarProps) => {
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const applyFormatting = (command: string) => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return; // No selection to format

        document.execCommand(command); // Executes the command directly on the contentEditable element
    };

    const insertLink = () => {
        if (linkUrl) {
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            const linkNode = document.createElement('a');
            linkNode.setAttribute('href', linkUrl);
            linkNode.setAttribute('target', '_blank');
            linkNode.classList.add('text-blue-600');
            linkNode.innerText = linkUrl;

            range?.deleteContents();
            range?.insertNode(linkNode);

            setIsLinkDialogOpen(false);
            setLinkUrl('');
        }
    };

    const insertImage = () => {
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                const selection = window.getSelection();
                const range = selection?.getRangeAt(0);
                const imgNode = document.createElement('img');
                imgNode.setAttribute('src', imageUrl);
                imgNode.setAttribute('class', 'max-w-full h-auto my-2 rounded-lg');

                range?.deleteContents();
                range?.insertNode(imgNode);
            };
            reader.readAsDataURL(imageFile);
            setIsImageDialogOpen(false);
            setImageFile(null);
        }
    };

    {/*
    const insertBullet = () => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return; // No selection to format

        const range = selection.getRangeAt(0);
        const list = document.createElement('ul');  // Create an unordered list
        const listItem = document.createElement('li');  // Create a list item
        listItem.textContent = 'Bullet Point';  // Default content for bullet point
        list.appendChild(listItem);

        range.deleteContents();  // Clear any existing selection
        range.insertNode(list);  // Insert the unordered list with the list item at the cursor position

        // Re-enable editing of the content after inserting the list
        setContent((prevContent) => prevContent + '<ul><li>Bullet Point</li></ul>');
    };
    */}

    const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    return (
        <div className="flex gap-4 mb-4">
            <button
                onClick={() => applyFormatting('bold')}
                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => applyFormatting('italic')}
                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                <em>I</em>
            </button>
            <button
                onClick={() => applyFormatting('underline')}
                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                <u>U</u>
            </button>
            {/*}
            <button
                onClick={insertBullet}  // Trigger the bullet insertion
                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                •
            </button>
            */}
            <button
                onClick={() => setIsLinkDialogOpen(true)}
                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                🔗
            </button>
            <button
                onClick={() => setIsImageDialogOpen(true)}
                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                🖼️
            </button>

            {isLinkDialogOpen && (
                <div className="absolute top-0 left-0 bg-white p-4 shadow-md rounded-lg z-10">
                    <label htmlFor="link-url" className="block mb-2">Link URL:</label>
                    <input
                        type="url"
                        id="link-url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                    <button
                        onClick={insertLink}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Insert Link
                    </button>
                    <button
                        onClick={() => setIsLinkDialogOpen(false)}
                        className="mt-2 ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {isImageDialogOpen && (
                <div className="absolute top-0 left-0 bg-white p-4 shadow-md rounded-lg z-10">
                    <label htmlFor="image-file" className="block mb-2">Select Image:</label>
                    <input
                        type="file"
                        id="image-file"
                        accept="image/*"
                        onChange={handleImageSelection}
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                    <button
                        onClick={insertImage}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        disabled={!imageFile}
                    >
                        Insert Image
                    </button>
                    <button
                        onClick={() => setIsImageDialogOpen(false)}
                        className="mt-2 ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};
