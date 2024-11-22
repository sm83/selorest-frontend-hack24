import './SidebarNoteCentered.scss';

const SidebarNoteCentered = () => {
  return (
    <div className="note-area">
      <p style={{ width: '90%', textAlign: 'center' }}>
        This sidebar is using in centered layout.
      </p>
      <span style={{ width: '90%', textAlign: 'center' }}>
        Example:{' '}
        <a href={'https://github.com/sm83/private-frontend'}>
          https://github.com/sm83/private-frontend
        </a>
      </span>
      <span style={{ width: '90%', textAlign: 'center' }}>
        Inspect following files:
      </span>
      <ul style={{ listStyle: 'inside' }}>
        <li>global-centered.module.scss</li>
        <li>app/centeredLayoutExample/page.tsx</li>
      </ul>
    </div>
  );
};

export default SidebarNoteCentered;
