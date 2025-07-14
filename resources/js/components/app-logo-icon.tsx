import { HTMLAttributes } from "react";
import logo from '../../assets/images/A1.png';

export default function AppLogoIcon(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src={logo}
            alt="A1 Logo"
            className={`w-full h-full object-contain ${props.className || ''}`}
        />
    );
}
