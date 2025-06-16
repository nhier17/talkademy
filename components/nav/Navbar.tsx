import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";


export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
                <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={50} 
                height={50} 
                className="bg-transparent object-cover"
                />
            </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />        
                <SignedOut>
                    <div className="flex items-center gap-2">
                        <SignInButton>
                            <button className="btn-sign-in">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
