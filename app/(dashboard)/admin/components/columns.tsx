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
import { Profile, Story, StoryReport, Contact, Comment } from "@/types"
import ActiveStoryModal from '@/components/ActiveStoryModal'
import { useAlertModal } from "@/hooks/use-alert-modal"
import { useSelectedComment } from "@/hooks/use-selected-comment"
import { useSelectedProfile } from "@/hooks/use-selected-profile"
import { useSelectedReport } from "@/hooks/use-selected-report"
import { useSnackbar } from "@/hooks/use-snackbar"


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
            const [_selected, setSelectedProfile] = useSelectedProfile()
            const [_openAlertModal, setOpenAlertModal] = useAlertModal()

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
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigator.clipboard.writeText(profile._id)} >
                            Copy Profile ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer'>View profile</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => { setSelectedProfile(profile); setOpenAlertModal('delete-account') }} >
                            Delete Profile
                        </DropdownMenuItem>
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
                <span className="hover:underline cursor-pointer text-start max-w-[20rem] truncate block text-surface-foreground ">
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
        id: 'likes',
        accessorKey: "likes",
        header: "Likes",
        cell: ({ row }) => (
            // @ts-ignore
            <div>{row.getValue("likes")?.length || "N/A"}</div>
        ),
    },
    {
        id: 'shares',
        accessorKey: "shares",
        header: "Shares",
        cell: ({ row }) => (
            // @ts-ignore
            <div>{row.getValue("shares")?.length || "N/A"}</div>
        ),
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
            const [_selected, setSelectedStory] = useSelectedStory()
            const [_openUpdateModal, setOpenUpdateModal] = useUpdateStoryModal()
            const [_openAlertModal, setOpenAlertModal] = useAlertModal()
            const [snackbarText, setSnackbarText] = useSnackbar()

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
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigator.clipboard.writeText(story._id)}>
                            Copy Story ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer'>
                            <ActiveStoryModal story={story}>
                                <span className='text-popover-foreground' >View Story</span>
                            </ActiveStoryModal>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={Boolean(snackbarText)} className='cursor-pointer' onClick={() => { setSelectedStory(story); setOpenUpdateModal(true) }} >
                            Update Story Images
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => { setSelectedStory(story); setOpenAlertModal('delete-story') }} >
                            {story?.status == 'hidden' ? 'Delete' : 'Hide'} Story
                        </DropdownMenuItem>
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
            const [_selected, setSelectedReport] = useSelectedReport()
            const [_openAlertModal, setOpenAlertModal] = useAlertModal()

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
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigator.clipboard.writeText(report._id)}>
                            Copy Report ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer' onClick={() => { setSelectedReport(report); setOpenAlertModal('delete-report') }} >
                            Delete Report
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const contactColumns: ColumnDef<Contact>[] = [
    {
        id: "sr_number",
        header: "#",
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        size: 50, // Set a fixed width for the serial number column
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <span className="text-sm font-medium">{row.getValue("name") || "N/A"}</span>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <a
                href={`mailto:${row.getValue("email")}`}
                className="text-blue-500 underline"
            >
                {row.getValue("email") || "N/A"}
            </a>
        ),
    },
    {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("message") || "N/A"}</span>
        ),
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => (
            <span className="text-sm">{new Date(row.getValue("created_at")).toLocaleString()}</span>
        ),
    },
];

export const commentColumns: ColumnDef<Comment>[] = [
    {
        id: "sr_number",
        header: "#",
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        size: 50, // Set a fixed width for the serial number column
    },
    {
        id: 'profile.username',
        accessorKey: "profile.username",
        header: "Username",
        cell: ({ row }) => (
            <span className="text-sm font-medium">{row.getValue("profile.username") || "N/A"}</span>
        ),
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
        accessorKey: "content",
        header: "Comment",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("content") || "N/A"}</span>
        ),
    },
    {
        accessorKey: "likes_count",
        header: "Likes",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("likes_count") || 0}</span>
        ),
    },
    {
        accessorKey: "reports_count",
        header: "Reports",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("reports_count") || 0}</span>
        ),
    },
    {
        accessorKey: "is_deleted",
        header: "Deleted",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("is_deleted") ? "Yes" : "No"}</span>
        ),
    },
    {
        accessorKey: "parent_id",
        header: "Parent Comment",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("parent_id") ? "Yes" : "No"}</span>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {

            const comment = row.original;
            const [_selected, setSelectedComment] = useSelectedComment()
            const [_openAlertModal, setOpenAlertModal] = useAlertModal()

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
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigator.clipboard.writeText(comment._id)}>
                            Copy Comment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer' onClick={() => { setSelectedComment(comment); setOpenAlertModal('delete-comment') }} >
                            Delete Comment
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
