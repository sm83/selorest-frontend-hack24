import Image from 'next/image';
import './ExampleBlock.scss';
import clsx from 'clsx';

const ExampleBlock = ({ isWide }: { isWide?: boolean }) => {
  return (
    <div
      className={clsx(
        'example-block',
        isWide && 'example-block_wide'
      )}
    >
      <h1 className="example-block__header">Example block header</h1>
      <div className="example-block__content-area">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Maxime facilis labore inventore, asperiores placeat officia
          impedit nemo dolorum vero. Sit, accusantium. Aspernatur
          aperiam enim ratione quam praesentium nesciunt fugiat est.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Maxime facilis labore inventore, asperiores placeat officia
          impedit nemo dolorum vero. Sit, accusantium. Aspernatur
          aperiam enim ratione quam praesentium nesciunt fugiat est.
        </p>
        <div className="example-block__image">
          <Image
            src={'/staticImages/photo_2023-10-28_23-18-03.jpg'}
            alt="exampleImage"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className="example-block__bottom-area">buttons</div>
    </div>
  );
};

export default ExampleBlock;
