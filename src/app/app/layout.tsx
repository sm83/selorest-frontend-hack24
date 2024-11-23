import MainHeader from '@/components/MainHeader/MainHeader';
import './layout.scss';
import Footer from '@/components/Footer/Footer';

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-wrapper">
      <MainHeader />
      {children}
      <Footer />
    </div>
  );
}
