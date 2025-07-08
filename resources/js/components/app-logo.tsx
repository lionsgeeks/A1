import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-[#dadada] text-sidebar-primary-foreground">
                <AppLogoIcon className=" fill-current " />
            </div>
            <div className="ml-1 grid flex-1 text-left ">
                <span className="mb-0.5 truncate leading-tight font-semibold text-xl">Atelier 1</span>
            </div>
        </>
    );
}
