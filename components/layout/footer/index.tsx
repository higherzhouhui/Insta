import Image from 'next/image';
import {useRouter} from 'next/router';
import {FC, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';

import {FooterContainer, FooterBot} from './styles';

import {userState} from '@/store/user';
import {showTip} from '@/utils';

export const Footer: FC = memo(() => {
  const [user, setUser] = useRecoilState(userState);
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
    {title: t('IDO'), link: '/', active: true, icon: 'ido'},
    {title: t('首頁'), link: '/shouye', active: false, icon: 'shouye'},
    {title: t('生態圈'), link: '/stq', active: false, icon: 'stq'},
    {title: t('我的'), link: '/info', active: false, icon: 'info'},
  ];
  const [navList, setNavList] = useState(staticNavList);
  const handleRoute = (item: any) => {
    if (item.link === '/shouye' || item.link === '/stq') {
      showTip({content: '暫未開放'});
      return;
    }
    if (item.link === '/info') {
      if (!user?.invite_code) {
        showTip({content: '請登錄後查看'});
        return;
      }
    }
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
      {/* <FooterTop>
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
      </FooterTop> */}
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
              <div className='menuTab'>
                <Image
                  alt='menu'
                  layout='fill'
                  src={`/static/image/${item.icon}${
                    item.active ? '-active' : ''
                  }.png`}
                />
              </div>

              <p>{item.title}</p>
            </div>
          );
        })}
      </FooterBot>
    </FooterContainer>
  );
});

Footer.displayName = 'Footer';
