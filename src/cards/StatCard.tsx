import { Card } from "@/components/ui/card"

interface StatCard {
    color: string
    value: string
    label: string
    change: string
    changeColor: string
}

const statCards: StatCard[] = [
    {
        color: "#126195",
        value: "8.36 / 9",
        label: "Total Hours Today",
        change: "5% This Week",
        changeColor: "#03C95A",
    },
    {
        color: "#212529",
        value: "10 / 40",
        label: "Total Hours Week",
        change: "7% Last Week",
        changeColor: "#03C95A",
    },
    {
        color: "#1B84FF",
        value: "75 / 98",
        label: "Total Hours Month",
        change: "8% Last Month",
        changeColor: "#E70D0D",
    },
    {
        color: "#FD3995",
        value: "16 / 28",
        label: "Overtime this Month",
        change: "6% Last Month",
        changeColor: "#E70D0D",
    },
]

export default function StatCard() {
    return (
        <div className="grid grid-cols-4 gap-6">
            {statCards.map((item, index) => (
                <Card
                    key={index}
                    className="shadow-sm border border-[#E5E7EB] p-4 w-[252px] h-[190px]"
                >
                    <div className="items-center space-y-2 border-b border-[#E5E7EB] pb-3">
                        <div
                            className="w-6 h-6 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        <h2 className="text-xl font-semibold text-[#202C4B]">
                            {item.value}
                        </h2>
                        <p className="text-md text-[#6B7280] font-semibold">{item.label}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: item.changeColor }}
                        />
                        <p className="text-sm text-[#6B7280]">{item.change}</p>
                    </div>
                </Card>
            ))}
        </div>
    )
}
