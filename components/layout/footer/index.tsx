import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, memo, useEffect, useState} from 'react';

import {FooterContainer, FooterTop, FooterBot} from './styles';

import {SvgIcon} from '@/uikit';

export const Footer: FC = memo(() => {
  const router = useRouter();

  const learnList = [
    {title: 'Audit', link: '/'},
    {title: 'Github', link: '/'},
    {title: 'Contact', link: '/'},
    {title: 'Docs', link: '/'},
  ];
  const joinList = [
    {title: 'opensea', link: '/'},
    {title: 'share-facebook', link: '/'},
    {title: 'icon-Facebook', link: '/'},
    {title: 'icon-Twiter', link: '/'},
    {title: 'icon-INS', link: '/'},
  ];

  const [navList, setNavList] = useState([
    {title: 'Home', link: '/', active: true, icon: 'home'},
    {title: 'Deposits', link: '/deposits', active: false, icon: 'deposits'},
    {title: 'Swap', link: '/swap', active: false, icon: 'swap'},
    {title: 'Info', link: '/info', active: false, icon: 'info'},
  ]);
  const handleRoute = (item: any) => {
    router.push(item.link);
  };
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    navList.map((item: any) => {
      if (router.pathname === item.link) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    setNavList([...navList]);
  }, [router.pathname]);
  return (
    <FooterContainer
      style={{
        display: navList.every((item) => {
          return !item.active;
        })
          ? 'none'
          : 'block',
      }}
    >
      <FooterTop>
        <h1>Contact Us</h1>
        <h3>Business Enquiries</h3>
        <p>hell@insta.network</p>
        <h3>Customer Support</h3>
        <p>support@insta.network</p>
        <h1>Learn More</h1>
        <div className='learnList'>
          {learnList.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                {item.title}
              </Link>
            );
          })}
        </div>
        <h1>Join Community</h1>
        <div className='learnList'>
          {joinList.map((item, index) => {
            return <SvgIcon key={index} name={item.title} />;
          })}
        </div>
      </FooterTop>
      <FooterBot>
        {navList.map((item, index) => {
          return (
            <div
              className={`item ${item.active ? 'active' : ''}`}
              key={index}
              onClick={() => {
                handleRoute(item);
              }}
            >
              <SvgIcon name={item.icon} />
              <p>{item.title}</p>
            </div>
          );
        })}
      </FooterBot>
    </FooterContainer>
  );
});

Footer.displayName = 'Footer';
