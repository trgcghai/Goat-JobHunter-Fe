import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

const popularTags = [
  { name: "Deep Talk", count: 234, color: "blue" },
  { name: "Trend Check", count: 189, color: "purple" },
  { name: "AI For Good", count: 156, color: "pink" },
  { name: "Tech Tips", count: 142, color: "green" },
  { name: "Career", count: 128, color: "orange" },
  { name: "Python", count: 98, color: "gray" },
  { name: "JavaScript", count: 87, color: "yellow" },
  { name: "Design", count: 76, color: "red" },
]

export function PopularTags() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          <Link href="/hub/tags">
            Các tags phổ biến
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag.name}
              variant="secondary"
              className="cursor-pointer hover:bg-pink-100 hover:text-pink-700 transition-colors px-3 py-1.5"
            >
              #{tag.name}
              <span className="ml-1.5 text-xs text-muted-foreground">{tag.count}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
