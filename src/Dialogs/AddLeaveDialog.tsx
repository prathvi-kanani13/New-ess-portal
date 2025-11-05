"use client"

import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { format, differenceInDays } from "date-fns"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent, } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Yup validation schema
const leaveSchema = yup
    .object({
        employee: yup.string().required("Employee name is required"),
        leaveType: yup.string().required("Leave type is required"),
        fromDate: yup
            .date()
            .typeError("From date is required")
            .required("From date is required"),
        toDate: yup
            .date()
            .typeError("To date is required")
            .required("To date is required")
            .min(yup.ref("fromDate"), "To date must be after From date"),
        reason: yup.string().required("Reason is required"),
    })
    .required()

interface AddLeaveDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddLeaveDialog({ open, onOpenChange }: AddLeaveDialogProps) {
    const [numDays, setNumDays] = useState<number>(0)
    const [remainingDays, setRemainingDays] = useState<number>(12) // example remaining leave

    const form = useForm({
        resolver: yupResolver(leaveSchema),
        defaultValues: {
            employee: "",
            leaveType: "",
            fromDate: undefined,
            toDate: undefined,
            reason: "",
        },
    })

    // Auto calculate leave days when from/to change
    useEffect(() => {
        const from = form.getValues("fromDate")
        const to = form.getValues("toDate")

        if (from && to) {
            const days = differenceInDays(to, from) + 1 // Then uses differenceInDays (from date-fns) to calculate the number of days between those two dates
            setNumDays(days > 0 ? days : 0) // ex. 12 total - 4 taken = 8 remaining days
            setRemainingDays(12 - (days > 0 ? days : 0)) // demo logic / otherwise use in backend logic
        }
    }, [form.watch("fromDate"), form.watch("toDate")]) // every time the user picks or changes a date — this useEffect will run again

    const onSubmit = (data: any) => {
        console.log("Leave Form Submitted:", { ...data, numDays, remainingDays })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#202C4B] mb-2">
                        Apply New Leave
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Employee Name */}
                        <FormField
                            control={form.control}
                            name="employee"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Employee Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter employee name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Leave Type */}
                        <FormField
                            control={form.control}
                            name="leaveType"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Leave Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select leave type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="sick">Sick Leave</SelectItem>
                                            <SelectItem value="casual">Casual Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* From & To Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="fromDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "dd/MM/yyyy")
                                                        ) : (
                                                            <span>Select date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent align="start" className="p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="toDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>To</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "dd/MM/yyyy")
                                                        ) : (
                                                            <span>Select date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent align="start" className="p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* No of Days & Remaining Days */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormItem>
                                <FormLabel>No. of Days</FormLabel>
                                <FormControl>
                                    <Input value={numDays || ""} readOnly />
                                </FormControl>
                            </FormItem>

                            <FormItem>
                                <FormLabel>Remaining Days</FormLabel>
                                <FormControl>
                                    <Input value={remainingDays || ""} readOnly />
                                </FormControl>
                            </FormItem>
                        </div>

                        {/* Reason */}
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter reason"
                                            className="min-h-[100px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Footer Buttons */}
                        <DialogFooter className="pt-4 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#007AFF] text-white hover:bg-[#1E4FD8]"
                            >
                                Add Leave
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
