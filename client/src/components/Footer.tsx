export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 dark:bg-gray-800 text-center p-4 mt-auto">
      <div>
        <p className="text-base text-gray-800 dark:text-amber-50 font-bold">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
