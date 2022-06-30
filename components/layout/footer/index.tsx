import Image from 'next/image';
import Link from 'next/link';
import {FC, memo, useEffect, useState} from 'react';

import {FooterBot, FooterContainer, FooterHref, FooterTop} from './styles';

import {getFooterLinks} from '@/services/common';
import {FootLinkBase} from '@/services/common.d';
import {SvgIcon} from '@/uikit';

export const Footer: FC = memo(() => {
  const [links, setLinks] = useState<FootLinkBase[]>([]);
  useEffect(() => {
    getFooterLinksRequest();
  }, []);

  const getFooterLinksRequest = async () => {
    const res = await getFooterLinks({page: 1, pageSize: 10});
    if (res.code === 0) {
      setLinks(res.data?.infoList || []);
    }
  };
  return (
    <FooterContainer>
      <FooterTop>
        <Link passHref href='/'>
          <a>
            <SvgIcon height={60} name='footer-logo' width={189} />
          </a>
        </Link>
        <FooterHref>
          {links.map((link, index) => (
            <span className='link-item-box' key={`${index}_div`}>
              <Link passHref href={link.uri}>
                <a target='_blank'>
                  <Image alt='icon' height={40} src={link.icon} width={40} />
                </a>
              </Link>
            </span>
          ))}
        </FooterHref>
      </FooterTop>
      <div className='footMiddle' />
      <FooterBot>
        <span className='copyRight'>Copyright © 2022 PD-1</span>
        <span className='termsPollcy'>
          <Link passHref href='/tos'>
            <a>Terms & Conditions</a>
          </Link>
          <span className='fenge' />
          <Link passHref href='/policy'>
            <a>Privacy Policy</a>
          </Link>
        </span>
      </FooterBot>
    </FooterContainer>
  );
});

Footer.displayName = 'Footer';
