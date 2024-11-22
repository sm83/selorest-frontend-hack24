import './SidebarNoteFullscreen.scss';

const SidebarNoteFullscreen = () => {
  // i'm using only for example! delete me later

  return (
    <div className="note-area">
      <p style={{ width: '90%', textAlign: 'center' }}>
        This sidebar is using in fullscreen layout, where all content,
        including this sidebar, are concentrated from left to right
        borders of screen.
      </p>
      <span style={{ width: '90%', textAlign: 'center' }}>
        Example:{' '}
        <a href={'https://github.com/'}>https://github.com/</a>
      </span>
      <span style={{ width: '90%', textAlign: 'center' }}>
        Inspect following files:
      </span>
      <ul style={{ listStyle: 'inside' }}>
        <li>global-fullscreen.module.scss</li>
        <li>app/fullscreenLayoutExample/page.tsx</li>
      </ul>
    </div>
  );
};

export default SidebarNoteFullscreen;
