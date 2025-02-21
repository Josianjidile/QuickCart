import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer aria-label="Footer">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        {/* Logo and Description */}
        <div className="w-full md:w-4/5">
          <Image
            src={assets.logo}
            alt="Company Logo"
            width={128} // Adjust based on your logo's aspect ratio
            height={32} // Adjust based on your logo's aspect ratio
            className="w-28 md:w-32"
          />
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/2 flex items-start justify-start md:justify-center">
          <nav aria-label="Company Links">
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  className="hover:underline transition"
                  href="#"
                  aria-label="Go to Home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="hover:underline transition"
                  href="#"
                  aria-label="Learn more about us"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  className="hover:underline transition"
                  href="#"
                  aria-label="Contact us"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  className="hover:underline transition"
                  href="#"
                  aria-label="Read our privacy policy"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+255-710227324</p>
              <p>contact@josianjidile.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © josianjidile All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;