"use client"

import { ChatList } from './components/ChatList';
import { ChatBox } from './components/ChatBox';

const Chat = () => {

    /////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////

    /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////

    /////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////


    return (
        <div className="flex flex-col">
            <div className="h-[calc(110vh-186px)] space-y-4 overflow-hidden sm:h-[calc(110vh-174px)]">

                <div className="flex justify-between items-center w-full">
                    <h1 className="text-3xl font-bold text-dark-slate-blue " >
                        Chats
                    </h1>
                </div>

                <div className="grid grid-cols-4 gap-4 w-full h-[820px]">
                    <ChatList />
                    <ChatBox />
                </div>
            </div>
        </div>
    );
};

export default Chat;
