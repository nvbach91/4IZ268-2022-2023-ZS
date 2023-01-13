import React from 'react';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { ImGithub } from 'react-icons/im';
import contactPhoto from '../../assets/images/contact-photo.png';

const ContactCard = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img src={contactPhoto} alt="contact-photo" width={150} height={150} />
            <h2 className="text-2xl font-bold mt-5">Dmitrii Nikolaev</h2>
            <h3 className="text-xl font-bold text-amber-200 mt-2">Front-End developer</h3>
            <p className="max-w-2xl my-6">
                I'm a frontend developer based in Prague, Czech Republic. I'm highly passionate about web development
                and learning new technologies. Extremely creative thinking, motivated, and very good at finding the best
                ways to solve any problem. Have experience working as a private English tutor. Love studying foreign
                languages as a hobby.
            </p>
            <div className="bg-zinc-700 px-12 py-8 flex flex-col gap-3 rounded mt-5">
                <div className="flex flex-row items-center justify-center gap-2">
                    <HiOutlineLocationMarker size={28} />
                    <div>
                        <span className="font-bold">Location:&nbsp;</span>
                        <span>Prague, Czech Republic</span>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <HiOutlineMail size={28} />
                    <div>
                        <span className="font-bold">Email:&nbsp;</span>
                        <a href="mailto:nikd01@vse.cz">nikd01@vse.cz</a>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <ImGithub size={28} />
                    <div>
                        <span className="font-bold">GitHub:&nbsp;</span>
                        <a href="https://github.com/dmitrynikolaev08" rel="noreferrer" target="_blank">
                            dmitrynikolaev08
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
