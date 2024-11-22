'use client';

// this is basic layout schema, using directly in this page.
// you can use '@/global-centered.module.scss' if you need,
// but it will require layout changes.
import layoutStyles from '@/global-fullscreen.module.scss';

//for only THIS page related styles use common scss down bellow (and make sure its not module, no need in it).
import './page.scss';

import ExampleBlock from '@/components/ExampleBlock/ExampleBlock';
import ExampleHeader from '@/components/ExampleHeader/ExampleHeader';
import SidebarFullscreen from '@/components/SidebarFullscreen/SidebarFullscreen';

import { useState } from 'react';
import SidebarNoteFullscreen from '@/components/SidebarFullscreen/SidebarNoteFullscreen/SidebarNoteFullscreen';
import clsx from 'clsx';

const FullscreenLayoutExamplePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className={layoutStyles['global-fullscreen-wrapper']}>
      <ExampleHeader />

      <div className={layoutStyles['content-area']}>
        <SidebarFullscreen sidebarOpen={sidebarOpen}>
          <SidebarNoteFullscreen />
        </SidebarFullscreen>
        <main
          className={clsx(
            layoutStyles['main-area'],
            'fullscreen-example'
          )}
        >
          <div className={layoutStyles['main-area__content-itself']}>
            <ExampleBlock />
            <ExampleBlock />
            <ExampleBlock />
            <ExampleBlock />
            <ExampleBlock />
            <ExampleBlock />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FullscreenLayoutExamplePage;
