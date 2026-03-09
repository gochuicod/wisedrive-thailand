import { SquareCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps {
    text: string
}

export default function Checkbox ({ text } : CheckboxProps) {
    return (
        <div className={cn(
            "flex flex-row",
            "gap-4",
            "items-center"
        )}>
            <SquareCheck className={cn("fill-cmGreen", "stroke-cbGreen", "min-w-[30px] min-h-[30px]")}/>
            <span className={cn("text-body", "text-body-md")}>
                {text}
            </span>
        </div>
    )
}