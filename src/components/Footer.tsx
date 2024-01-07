import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-3 border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Portilio</h3>
            <p className="text-muted-foreground text-sm">
              Sail across the canvas of creativity with Portilio, where each
              portfolio is a vessel navigating the boundless waters of
              expression
            </p>
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-5 text-sm">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} Portilio, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
