import './SidebarFullscreen.scss';

const SidebarFullscreen = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sidebarOpen,
}: {
  children: React.ReactNode;
  sidebarOpen: boolean;
}) => {
  return <aside className={'fullscreen-sidebar'}>{children}</aside>;
};

export default SidebarFullscreen;
