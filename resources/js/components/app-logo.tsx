import logo from '../../assets/images/A1.png';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-white/10 overflow-hidden">
                <img
                    src={logo}
                    alt="A1 Logo"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left ">
                <span className="mb-0.5 truncate leading-tight font-semibold text-xl text-primary">A1 atelier</span>
            </div>
        </>
    );
}
