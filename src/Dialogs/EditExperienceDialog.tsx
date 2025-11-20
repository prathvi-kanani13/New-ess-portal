import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"

interface Field {
    name: string
    label: string
    value: string
}

interface EditExperienceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    fields: Field[]
    onSave: (updatedFields: Field[], file?: File) => void
}

export default function EditExperienceDialog({
    open,
    onOpenChange,
    fields,
    onSave
}: EditExperienceDialogProps) {

    const filteredFields = fields.filter(field => field.name !== "years")

    const [startYear, setStartYear] = useState<number>()
    const [endYear, setEndYear] = useState<number>()
    const [calendarOpenStart, setCalendarOpenStart] = useState(false)
    const [calendarOpenEnd, setCalendarOpenEnd] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const years = Array.from({ length: 50 }, (_, i) => 1980 + i) // 1980–2029

    useEffect(() => {
        const yearsField = fields.find(f => f.name === "years")?.value.split(" - ")
        if (yearsField) {
            setStartYear(Number(yearsField[0]) || undefined)
            setEndYear(Number(yearsField[1]) || undefined)
        }
    }, [fields, open])

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()

        const updatedFields = filteredFields.map(f => ({
            name: f.name,
            label: f.label,
            value: (document.getElementById(f.name) as HTMLInputElement)?.value || f.value
        }))

        updatedFields.push({
            name: "years",
            label: "Years",
            value: `${startYear ?? ""} - ${endYear ?? ""}`
        })

        onSave(updatedFields, uploadedFile || undefined)
        onOpenChange(false)
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedFile(e.target.files[0])
        }
    }

    const renderYearPicker = (
        selectedYear: number | undefined,
        setYear: (y: number) => void,
        open: boolean,
        setOpen: (b: boolean) => void
    ) => (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-gray-500"
                >
                    {selectedYear ?? <span className="text-gray-400">Select Year</span>}
                    <CalendarIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 p-0">
                <ScrollArea className="h-48">
                    <div className="flex flex-col">
                        {years.map((year) => (
                            <div key={year}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start rounded-none"
                                    onClick={() => {
                                        setYear(year)
                                        setOpen(false)
                                    }}
                                >
                                    {year}
                                </Button>
                                <Separator />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Company Details</DialogTitle>
                </DialogHeader>

                <form className="grid grid-cols-2 gap-4 mt-3" onSubmit={handleSave}>
                    {filteredFields.map((field) => (
                        <div key={field.name} className="space-y-1">
                            <Label className="text-sm font-medium text-gray-700">
                                {field.label}
                            </Label>
                            <Input id={field.name} defaultValue={field.value} />
                        </div>
                    ))}

                    {/* Start Year Pickers */}
                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-gray-700">Start Year</Label>
                        {renderYearPicker(startYear, setStartYear, calendarOpenStart, setCalendarOpenStart)}
                    </div>

                    {/* End Year Picker */}
                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-gray-700">End Year</Label>
                        {renderYearPicker(endYear, setEndYear, calendarOpenEnd, setCalendarOpenEnd)}
                    </div>

                    <div className="col-span-2 flex justify-between items-center mt-4">
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

                        <Button
                            type="button"
                            variant="outline"
                            className="border-[#126195] text-[#126195] hover:bg-[#126195] hover:text-white"
                            onClick={handleUploadClick}
                        >
                            {uploadedFile ? uploadedFile.name : "Upload Document"}
                        </Button>

                        <div className="flex gap-2">
                            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
