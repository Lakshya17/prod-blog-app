import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
    return(
        <>
            <section className="relative overflow-hidden py-5 bg-[#eeeeee]">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 ">
                        <div className="flex h-full flex-col justify-center">
                            <div className="mb-4 inline-flex items-center justify-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 text-center">
                                    &copy; Copyright 2024. All Rights Reserved by Lakshya Incorporation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Footer;