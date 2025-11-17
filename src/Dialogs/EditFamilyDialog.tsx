import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface Field {
    label: string
    value: string
}

interface EditFamilyDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    fields: Field[]
    onSave: (updatedFields: Field[]) => void
}

export default function EditFamilyDialog({
    open,
    onOpenChange,
    fields,
    onSave,
}: EditFamilyDialogProps) {

    const [localFields, setLocalFields] = React.useState<Field[]>([])
    const [dob, setDob] = React.useState<Date | undefined>()
    const [calendarOpen, setCalendarOpen] = React.useState(false)

    // Load fields into local state when dialog opens
    React.useEffect(() => {
        setLocalFields(fields)

        const dobField = fields.find((f) => f.label === "Date of Birth")
        if (dobField?.value) {
            const parsedDate = new Date(dobField.value)
            if (!isNaN(parsedDate.getTime())) setDob(parsedDate)
        } else {
            setDob(undefined)
        }
    }, [fields])

    const updateField = (label: string, value: string) => {
        setLocalFields((prev) =>
            prev.map((f) =>
                f.label === label ? { ...f, value } : f
            )
        )
    }

    const handleSave = () => {
        const updatedFields = localFields.map((f) =>
            f.label === "Date of Birth"
                ? { ...f, value: dob ? dob.toLocaleDateString() : "" }
                : f
        )

        onSave(updatedFields)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Family Information</DialogTitle>
                </DialogHeader>

                <form className="grid grid-cols-2 gap-4 mt-3">
                    {localFields.map((field) => (
                        <div key={field.label} className="space-y-1">
                            <Label className="text-sm font-medium text-gray-700">
                                {field.label}
                            </Label>

                            {field.label === "Gender" ? (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) =>
                                        updateField(field.label, value)
                                    }
                                >
                                    <SelectTrigger className="w-full text-sm">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>

                            ) : field.label === "Relation" ? (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) =>
                                        updateField(field.label, value)
                                    }
                                >
                                    <SelectTrigger className="w-full text-sm">
                                        <SelectValue placeholder="Select Relation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Father">Father</SelectItem>
                                        <SelectItem value="Mother">Mother</SelectItem>
                                        <SelectItem value="Brother">Brother</SelectItem>
                                        <SelectItem value="Sister">Sister</SelectItem>
                                        <SelectItem value="Spouse">Spouse</SelectItem>
                                        <SelectItem value="Child">Child</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>

                            ) : field.label === "Date of Birth" ? (
                                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-between font-normal text-gray-500"
                                        >
                                            {dob ? format(dob, "dd/MM/yyyy") : (
                                                <span className="text-gray-400">Select date</span>
                                            )}

                                            <CalendarIcon className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={dob}
                                            onSelect={(date) => {
                                                setDob(date)
                                                setCalendarOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <Input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) =>
                                        updateField(field.label, e.target.value)
                                    }
                                    className="w-full"
                                />
                            )}
                        </div>
                    ))}

                    <div className="col-span-2 flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="button" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
