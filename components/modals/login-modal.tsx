"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export const LoginModal = () => {
    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-md [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">
                        Sign in to continue
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You need to be signed in to view this page. Join our community to access
                        problems, track your progress, and more.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <SignInButton mode="redirect">
                        <Button className="w-full" size="lg">
                            Sign In
                        </Button>
                    </SignInButton>
                    <div className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <SignInButton mode="redirect">
                            <span className="text-primary hover:underline cursor-pointer">
                                Sign up
                            </span>
                        </SignInButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
