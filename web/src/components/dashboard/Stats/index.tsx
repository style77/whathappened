type DashboardStatsCardProps = {
    title: string;
    formattedValue: string;
    icon: React.ReactNode;
    description: string;
}

export const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({ title, formattedValue, icon, description }: DashboardStatsCardProps) => {
    const getDescStyle = () => {
        if (description.includes("↗︎")) return "font-bold text-green-700"
        else if (description.includes("↙")) return "font-bold text-rose-500"
        else return ""
    }

    return (
        <div className="stats shadow">
            <div className="stat">
                <div className={`stat-figure text-primary`}>{icon}</div>
                <div className="stat-title">{title}</div>
                <div className={`stat-value text-primary`}>{formattedValue}</div>
                <div className={"stat-desc " + getDescStyle()}>{description}</div>
            </div>
        </div>
    )
}