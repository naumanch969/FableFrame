"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSelectedStory } from '@/hooks/use-selected-story'
import { useUpdateStoryModal } from '@/hooks/use-update-story-modal'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Profile, Story, StoryReport } from "@/types"
import ActiveStoryModal from '@/components/ActiveStoryModal'


export const userColumns: ColumnDef<Profile>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "credit",
        header: "Credit",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "is_verified",
        header: "Verified",
        cell: ({ row }) => (
            <div>{row.getValue("is_verified") ? "Yes" : "No"}</div>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const profile = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(profile.user_id)}
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit profile</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
export const storyColumns: ColumnDef<Story>[] = [
    {
        id: "sr_number",
        header: () => <span className="w-[10rem]">Sr.</span>,
        cell: ({ row, table }) => (
            <span className="text-start max-w-[10rem] truncate block">
                {table.getRowModel().rows.findIndex((r) => r.id === row.id) + 1}
            </span>
        ),
    },
    {
        accessorKey: "title",
        header: () => <span className="w-[20rem]">Title</span>,
        cell: ({ row }) => (
            <ActiveStoryModal story={row.original}>
                <span className="hover:underline cursor-pointer text-start max-w-[20rem] truncate block">
                    {row.getValue("title") || "N/A"}
                </span>
            </ActiveStoryModal>
        ),
    },
    {
        id: "author.username",
        accessorKey: "author.username",
        header: () => <span className="w-[20rem]">Author</span>,
        cell: ({ row }) => (
            <span className="hover:underline cursor-pointer text-start max-w-[10rem] truncate block">
                {row.getValue("author.username") || "N/A"}
            </span>
        ),
    },
    {
        accessorKey: "genre",
        header: "Genre",
    },
    {
        accessorKey: "age_category",
        header: "Category",
    },
    {
        accessorKey: "chapters",
        header: "Chapters",
        cell: ({ row }) => (
            // @ts-ignore
            <div>{row.getValue("chapters")?.length || "N/A"}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "views_count",
        header: "Views",
    },
    {
        accessorKey: "reports_count",
        header: "Reports",
    },
    {
        accessorKey: "reading_time",
        header: "Reading Time (min)",
        cell: ({ row }) => (
            <div>{row.getValue("reading_time") || "N/A"}</div>
        ),
    },
    {
        accessorKey: "is_public",
        header: "Public",
        cell: ({ row }) => (
            <div>{row.getValue("is_public") ? "Yes" : "No"}</div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {

            const story = row.original;
            const [_selected, setSelected] = useSelectedStory()
            const [_open, setOpen] = useUpdateStoryModal()

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(story.title)}
                        >
                            Copy Title
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <ActiveStoryModal story={story}>
                                View Story
                            </ActiveStoryModal>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelected(story); setOpen(true) }} >Edit Story</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];



export const reportsColumns: ColumnDef<StoryReport>[] = [
    {
        id: "sr_number",
        header: "#",
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        size: 50, // Set a fixed width for the serial number column
    },
    {
        id: "story.title",
        accessorKey: "story.title",
        header: "Story Title",
        cell: ({ row }) => (
            <ActiveStoryModal story={row.original.story}>
                <span className="hover:underline cursor-pointer text-start ">{row.getValue("story.title") || "N/A"}</span>
            </ActiveStoryModal>
        ),
        size: 300, // Make the column slightly larger
    },
    {
        accessorKey: "profile.username",
        header: "Reported By",
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => <div>{row.getValue("reason") || "N/A"}</div>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <div>{row.getValue("type") || "N/A"}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const report = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(report.story_id)}
                        >
                            Copy Story ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Story</DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

