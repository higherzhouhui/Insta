import {useRouter} from 'next/router';

import type {NextPage} from 'next';

import {LearnMoreContainer} from '@/styles/learnMore';
import {SvgIcon} from '@/uikit';

const LearnMore: NextPage = () => {
  const router = useRouter();

  return (
    <LearnMoreContainer>
      <div className='nav'>
        <SvgIcon
          name='back'
          onClick={() => {
            router.back();
          }}
        />
        <span>Learn More</span>
      </div>
      <main>
        <h2>Hyper-optimised cross-chain yield aggregator</h2>
        <strong
          className='r-crgep1 r-b88u0q'
          data-offset-key='6d0f9c0483aa4228b56b7f9222457562:0'
          data-slate-leaf='true'
        >
          Insta is a yield farming aggregator running on 19 different
          EVM-compatible networks
        </strong>
        <span data-offset-key='62da19b570e641d3928cf21fb78915a5:0'>
          The DApp (Decentralised Application) was designed with the purpose of
          optimising DeFi (Decentralised Finance) users yields as they interact
          with the other DApps in the DeFi space.
        </span>
        <span data-offset-key='682cad45bf544fc7b3bfb0d9e811d4a3:0'>
          Insta was initiated on BNB Chain (formerly Binance Smart Chain) with
          no pre-farm, no pre-sales and with the goal of optimising DeFi users'
          yield farming at the
        </span>
        <span data-offset-key='682cad45bf544fc7b3bfb0d9e811d4a3:2'>
          (All APY &amp; APRs shown have already included fees).
        </span>
        <span data-key='76b0491010f7407db86f0da5200b689d'>
          <span data-offset-key='76b0491010f7407db86f0da5200b689d:0'>
            AutoSwap is a DEX aggregator that gets you the best prices from your
            DEX trades. AutoSwap splits your trade across multiple DEXes to
            ensure the
          </span>
          <strong
            className='r-crgep1 r-b88u0q'
            data-offset-key='76b0491010f7407db86f0da5200b689d:1'
            data-slate-leaf='true'
          >
            best prices and lowest slippage possible.
          </strong>
          <span data-offset-key='8f1d8cf4a3e746f5805682d0ceed07a3:0'>Swap</span>
          <span data-offset-key='76b0491010f7407db86f0da5200b689d:2'>
            Your trades with Insta Swap also become non-front-runnable and
            non-arbitrageable.
          </span>
        </span>
      </main>
    </LearnMoreContainer>
  );
};

LearnMore.displayName = 'LearnMore';

export default LearnMore;
