import './SidebarCentered.scss';

const SidebarCentered = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <aside className={'centered-sidebar'}>
      <div className={'sidebar-content'}>{children}</div>
    </aside>
  );
};

export default SidebarCentered;
