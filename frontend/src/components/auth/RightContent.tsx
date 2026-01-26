import type { ReactNode } from "react"

interface RightContentProps{
    children:ReactNode
}
const RightContent = ({children} : RightContentProps) => {
  return (
    <div className="h-full">
        {children}
    </div>
  )
}

export default RightContent