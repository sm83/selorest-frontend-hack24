'use client';

// this is basic layout schema, using directly in this page.
// you can use '@/global-fullscreen.module.scss' if you need,
// but it will require layout changes.
import layoutStyles from '@/global-centered.module.scss';

//for only THIS page related styles use common scss down bellow (and make sure its not module, no need in it).
import './page.scss';

import ExampleHeader from '@/components/ExampleHeader/ExampleHeader';
import SidebarCentered from '@/components/SidebarCentered/SidebarCentered';
import SidebarDivider from '@/components/SidebarCentered/SidebarDivider/SidebarDivider';
import SidebarNoteCentered from '@/components/SidebarCentered/SidebarNoteCentered/SidebarNoteCentered';
import ExampleBlock from '@/components/ExampleBlock/ExampleBlock';
import clsx from 'clsx';
import Image from 'next/image';
// import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
// import { useEffect } from 'react';
// import { fetchExamplePosts } from '@/store/slices/examplePostsSlice';
// import { RootState } from '@/store/store';

const CenteredLayoutExamplePage = () => {
  // const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const examplePosts = useAppSelector(
  //   (state: RootState) => state.examplePosts.postsData
  // );

  // useEffect(() => {
  //   dispatch(fetchExamplePosts({}));
  // }, [dispatch]);

  return (
    <div className={layoutStyles['global-centered-wrapper']}>
      <ExampleHeader />

      <div
        className={clsx(
          layoutStyles['inner-wrapper'],
          'centered-example'
        )}
      >
        <div
          className={clsx(
            layoutStyles['center-wrapper'],
            layoutStyles['center-wrapper_widthmax-1250'],
            layoutStyles['center-wrapper_layout-right-sidebar-30']
          )}
        >
          <main className={layoutStyles['main-area']}>
            <div
              className={layoutStyles['main-area__content-itself']}
            >
              <ExampleBlock isWide />
              <ExampleBlock isWide />
              <ExampleBlock isWide />
            </div>
          </main>
          <SidebarCentered>
            <SidebarNoteCentered />
            <SidebarDivider />
            <div className="sidebar-image-container">
              <div className="sidebar-image-wrapper">
                <Image
                  src={'/staticImages/floppa.jpg'}
                  alt="floppaImage"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <SidebarDivider />
            <span>Some other floppa section.</span>
            <SidebarDivider />
            <span>Example example.</span>
          </SidebarCentered>
        </div>
      </div>
    </div>
  );
};

export default CenteredLayoutExamplePage;
