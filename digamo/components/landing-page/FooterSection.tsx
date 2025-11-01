import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";

function FooterSection() {
  return (
    <footer className="bg-white w-full overflow-x-hidden">
      <div className="mx-auto max-w-screen-xl px-6 py-10">
        <div className="md:flex md:justify-between md:items-start">
          <div className="mb-6 md:mb-0 flex items-center space-x-2">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              alt="FlowBite Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-2xl font-semibold whitespace-nowrap">
              Digamo
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                Contacts
              </h2>
              <ul className="text-gray-500 font-medium space-y-2">
                <li className="flex items-center space-x-2">
                  <CallIcon />
                  <p>09636390422</p>
                </li>
                <li className="flex items-center space-x-2">
                  <EmailIcon />
                  <p>digamo2025@gmail.com</p>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-500  font-medium space-y-2">
                <li>
                  <a
                    href="https://github.com/Kawrs/Digamo.git"
                    className="hover:underline"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 " />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <span className="text-sm text-gray-500 ">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Digamo
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex justify-center mt-4 sm:mt-0 space-x-5">
            {/* Social icons */}
            <a href="#" className="text-gray-500 hover:text-gray-900 ">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900  ">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
