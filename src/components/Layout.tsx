import { FC } from 'react'
import { Toaster } from "@/components/ui/toaster"

interface Props {
    children: any
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <h1 className="text-4xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900 bg-opacity-50">
                User Management
            </h1>
            <Toaster />
            {children}
        </>
    )
}

export default Layout