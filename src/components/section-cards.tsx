import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SectionCardProps {
  title: string
  value: string | number
  trend?: string
  subtitle: string
  description: string
  currency?: string
}

export function SectionCard({ title, value, trend, subtitle, description, currency }: SectionCardProps) {
  const isPositive = trend?.startsWith("+")
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {trend && (
          <Badge variant={isPositive ? "default" : "destructive"} className="gap-1">
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currency && <span className="mr-1">{currency}</span>}
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        {isPositive !== undefined && (
          <div className="mt-2 flex items-center gap-1">
            {isPositive ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
