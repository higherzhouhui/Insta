import {Table, Carousel} from 'antd';
import {useRouter} from 'next/router';
import {useState, useEffect, SetStateAction} from 'react';

import type {NextPage} from 'next';

import {
  DepositsContainer,
  TotalAddress,
  WithDrawContainer,
} from '@/styles/deposits';
import {Modal, SvgIcon} from '@/uikit';
import {copyUrlToClip, IMessageType, showTip} from '@/utils';

const Deposits: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [withDrawvisable, setWithDrawVisable] = useState(false);
  const [exchangeisable, setExchangeisable] = useState(false);
  const [withDrawNumber, setWithDrawNumber] = useState();
  const router = useRouter();
  const [deposits, setDeposits] = useState('');
  const [chain, setChain] = useState('ERC721');
  const zm = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'G'];
  const getName = (length: number) => {
    let str = '';
    Array(length)
      .fill('')
      .forEach((_item) => {
        str += zm[Math.round(Math.random() * 10)];
      });
    return str;
  };
  const [dataSource, setDataSource] = useState<any>([]);
  const initRequest = () => {
    const arr: any[] = [];
    Array(11)
      .fill('')
      .forEach((_item, index) => {
        arr.push({
          key: index,
          pool: getName(6),
          project: getName(10),
          tvl: `$${Math.round(Math.random() * 10) / 10}b`,
          apy: `${Math.round(Math.random() * 100) / 100}%`,
        });
      });
    setDataSource(arr);
  };
  const columns: any[] = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: 'pool',
      align: 'center',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Project',
      dataIndex: 'project',
      align: 'center',
      key: 'project',
      render: (text: any) => (
        <a>
          <SvgIcon height={12} name='nft-coin' width={12} />
          {text}
        </a>
      ),
    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      align: 'center',
      key: 'tvl',
      sorter: true,
    },
    {
      title: 'APY',
      dataIndex: 'apy',
      align: 'center',
      key: 'apy',
      sorter: true,
    },
  ];
  const onChangeChain = (e: {target: {value: SetStateAction<string>}}) => {
    setChain(e.target.value);
  };
  const onChangeDeposits = (e: {target: {value: SetStateAction<string>}}) => {
    setDeposits(e.target.value);
  };
  const copyToClip = (url: string) => {
    copyUrlToClip(url);
    showTip({type: IMessageType.SUCCESS, content: 'copied'});
  };
  const handleWithdraw = () => {
    setWithDrawVisable(false);
  };
  useEffect(() => {
    initRequest();
  }, []);
  return (
    <DepositsContainer>
      <h2>Scanning</h2>
      <Carousel autoplay dotPosition='right' style={{overflow: 'hidden'}}>
        {[...Array(3)].map((_, index) => {
          return (
            <div key={index}>
              <Table
                bordered={false}
                columns={columns}
                dataSource={dataSource.slice(0, 4)}
                pagination={false}
                size='small'
              />
            </div>
          );
        })}
      </Carousel>
      <h2>Deposits</h2>
      <div className='approveContainer'>
        <div className='content'>
          <p>Multiple of 10</p>
          <div className='inputWrapper'>
            <input
              className='inputDeposit'
              placeholder='Please Enter'
              type='text'
              value={deposits}
              onChange={onChangeDeposits}
            />
            <div className='usdtWrapper'>
              <SvgIcon name='usdt' />
              <span>USDT</span>
            </div>
            <select value={chain} onChange={onChangeChain}>
              <option value='ERC20'>ERC20</option>
              <option value='ERC720'>ERC720</option>
              <option value='ERC721'>ERC721</option>
              <option value='ERC1155'>ERC1155</option>
              <option value='ERC777'>ERC777</option>
            </select>
          </div>
        </div>
        <div className='desc'>
          <div className='left'>Invest Days:120D</div>
          <div className='left'>Daily Yield:0.5%-2%</div>
        </div>
        <div className='approveBtn'>Approve</div>
      </div>
      <div className='title'>
        <div className='left'>Summary</div>
        <div className='right' onClick={() => router.push('/profit')}>
          Details <SvgIcon color='#999' name='right-icon' />
        </div>
      </div>
      <div className='gridTwoContent'>
        <div className='left'>
          <div className='top'>Cumulative deposits</div>
          <div className='bot'>
            251354.626<span>USDT</span>
          </div>
        </div>
        <div className='left'>
          <div className='top'>Cumulative income</div>
          <div className='bot'>
            251354.875<span>USDT</span>
          </div>
        </div>
      </div>
      <div className='normalContent'>
        <div className='left'>
          <div className='top'>Balance</div>
          <div className='bot'>
            251354.626<span>USDT</span>
          </div>
        </div>
        <div className='right'>
          <div
            className='top'
            onClick={() => {
              setExchangeisable(true);
            }}
          >
            Exchange
          </div>
          <div
            className='bot'
            onClick={() => {
              setWithDrawVisable(true);
            }}
          >
            Withdraw
          </div>
        </div>
      </div>
      <div className='title'>
        <div className='left'>My Team</div>
        <div className='right' onClick={() => router.push('/myTeam')}>
          Details <SvgIcon color='#999' name='right-icon' />
        </div>
      </div>
      <TotalAddress>
        <div className='left'>
          <div className='top'>Total address</div>
          <div className='bot'>845</div>
        </div>
        <div className='left'>
          <div className='top'>Total deposit</div>
          <div className='bot'>
            166548.875<span>USDT</span>
          </div>
        </div>
      </TotalAddress>
      <div className='title'>
        <div className='left'>Share Link</div>
      </div>
      <div className='normalContent'>
        <div className='network'>www.baidu.com.zky.111.iiioo</div>
        <div className='right'>
          <div
            className='top'
            onClick={() => {
              copyToClip('www.baidu.com.zky.111.iiioo');
            }}
          >
            Copy
          </div>
        </div>
      </div>
      <Modal
        height='auto'
        visible={withDrawvisable}
        width='80%'
        onClose={() => {
          setWithDrawVisable(false);
        }}
      >
        <WithDrawContainer>
          <h2>Withdraw</h2>
          <input
            placeholder='Please Enter'
            type='text'
            value={withDrawNumber}
            onChange={(e: any) => {
              setWithDrawNumber(e.target.value);
            }}
          />
          <div
            className='submit'
            onClick={() => {
              handleWithdraw();
            }}
          >
            OK
          </div>
          <img
            src='/static/image/close.png'
            onClick={() => {
              setWithDrawVisable(false);
            }}
          />
        </WithDrawContainer>
      </Modal>
      <Modal
        height='auto'
        visible={exchangeisable}
        width='80%'
        onClose={() => {
          setExchangeisable(false);
        }}
      >
        <WithDrawContainer>
          <h2>Exchange</h2>
          <input
            placeholder='Please Enter'
            type='text'
            value={withDrawNumber}
            onChange={(e: any) => {
              setWithDrawNumber(e.target.value);
            }}
          />
          <div
            className='submit'
            onClick={() => {
              handleWithdraw();
            }}
          >
            OK
          </div>
          <img
            src='/static/image/close.png'
            onClick={() => {
              setExchangeisable(false);
            }}
          />
        </WithDrawContainer>
      </Modal>
    </DepositsContainer>
  );
};

Deposits.displayName = 'Deposits';

export default Deposits;
