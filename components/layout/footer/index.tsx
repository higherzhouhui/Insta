import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {FooterContainer, FooterTop, FooterBot} from './styles';

import {SvgIcon} from '@/uikit';

export const Footer: FC = memo(() => {
  const router = useRouter();
  const {t, i18n} = useTranslation();
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
  const staticNavList = [
    {title: t('Home'), link: '/', active: true, icon: 'home'},
    {title: t('Deposits'), link: '/deposits', active: false, icon: 'deposits'},
    {title: t('Swap'), link: '/swap', active: false, icon: 'swap'},
    {title: t('Info'), link: '/info', active: false, icon: 'info'},
  ];
  const [navList, setNavList] = useState(staticNavList);

  const handleRoute = (item: any) => {
    router.push(item.link);
  };

  useEffect(() => {
    setNavList(staticNavList);
  }, [i18n.language]);

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
        <h1>{t('contactus')}</h1>
        <h3>{t('business')}</h3>
        <p>hello@insta.network</p>
        <h3>Customer Support</h3>
        <p>support@insta.network</p>
        <h1>{t('learnMore')}</h1>
        <div className='learnList'>
          {learnList.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                {item.title}
              </Link>
            );
          })}
        </div>
        <h1>{t('Join')}</h1>
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
