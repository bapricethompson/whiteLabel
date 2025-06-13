"use client";

const Footer = () => {
  return (
    <footer className="bg-background bg-pink font-semibold text-black py-6 text-center text-sm">
      &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
    </footer>
  );
};

export default Footer;
