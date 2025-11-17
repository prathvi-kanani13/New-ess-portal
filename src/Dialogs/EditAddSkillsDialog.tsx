import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Field {
    name: string
    label: string
    value: string
}

interface EditAddSkillsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    fields: Field[]
}

export default function EditAddSkillsDialog({
    open,
    onOpenChange,
    fields,
}: EditAddSkillsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Skills</DialogTitle>
                </DialogHeader>

                <form className="space-y-4 mt-3">
                    {fields.map((field) => (
                        <div key={field.name} className="space-y-1">
                            <Label className="text-sm font-medium text-gray-700">
                                {field.label}
                            </Label>

                            <Input type="text" defaultValue={field.value} />
                        </div>
                    ))}

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
