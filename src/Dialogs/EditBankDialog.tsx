import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface Field {
    label: string
    value: string
}

interface EditBankDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    fields: Field[]
    onSave: (updatedFields: Field[]) => void
}

export default function EditBankDialog({ open, onOpenChange, fields, onSave }: EditBankDialogProps) {
    // Local state to store form values
    const [values, setValues] = useState<{ [key: string]: string }>({})

    // Initialize local state whenever dialog opens
    useEffect(() => {
        const initial: { [key: string]: string } = {}
        fields.forEach(f => {
            initial[f.label] = f.value
        })
        setValues(initial)
    }, [fields, open])

    const handleChange = (label: string, value: string) => {
        setValues(prev => ({ ...prev, [label]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Convert local state back to Field[]
        const updatedFields: Field[] = fields.map(f => ({
            label: f.label,
            value: values[f.label] || ""
        }))
        onSave(updatedFields)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Bank Information</DialogTitle>
                </DialogHeader>

                <form className="grid grid-cols-2 gap-4 mt-3" onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.label} className="space-y-1">
                            <Label className="text-sm font-medium text-gray-700">
                                {field.label}
                            </Label>

                            {(field.label === "Bank Name" || field.label === "Branch") ? (
                                <Select
                                    value={values[field.label] || ""}
                                    onValueChange={(val) => handleChange(field.label, val)}
                                >
                                    <SelectTrigger className="w-full text-sm">
                                        <SelectValue placeholder={`Select ${field.label}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.label === "Bank Name" && (
                                            <>
                                                <SelectItem value="HDFC">HDFC</SelectItem>
                                                <SelectItem value="ICICI">ICICI</SelectItem>
                                                <SelectItem value="SBI">SBI</SelectItem>
                                                <SelectItem value="Axis">Axis</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </>
                                        )}
                                        {field.label === "Branch" && (
                                            <>
                                                <SelectItem value="Andheri West">Andheri West</SelectItem>
                                                <SelectItem value="Andheri East">Andheri East</SelectItem>
                                                <SelectItem value="Bandra">Bandra</SelectItem>
                                                <SelectItem value="Kurla">Kurla</SelectItem>
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    type="text"
                                    value={values[field.label] || ""}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                    className="w-full"
                                />
                            )}
                        </div>
                    ))}

                    {/* Full width button row */}
                    <div className="col-span-2 flex justify-end gap-2 mt-4">
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
