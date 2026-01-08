import { cn } from "@/lib/utils";
import { currentUserRole } from "@/modules/auth/actions";
import { NavbarHome } from "@/modules/home/components/Navbar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => { 

  const userRole = await currentUserRole()

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black">
      {/* Background grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Radial fade */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Page layout */}
      <div className="relative z-20 flex min-h-screen flex-col">
        {/* Navbar */}
        <NavbarHome userRole={userRole} />

        {/* Page content */}
        <main className="absolute inset-0 flex items-center justify-center z-20">
  <div className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-7xl font-bold text-transparent">
    {children}
  </div>
</main>


      </div>
    </div>
  );
};

export default MainLayout;
