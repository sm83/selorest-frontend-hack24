import MainHeader from '@/components/MainHeader/MainHeader';
import './layout.scss';
import MainFooter from '@/components/MainFooter/MainFooter';

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-wrapper">
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}
