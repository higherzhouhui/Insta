import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  padding-bottom: 120px;
  background: #f5f8fb;
`;

export const HomeBoutiquePanelContainer = styled.div`
  width: 100%;
  height: 820px;
  position: relative;
  .content-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .boutique-box {
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 120px 0 80px;
  }
  .title-box {
    h1 {
      font-size: 56px;
      font-family: HarmonyOs-Bold;
      color: #000000;
      line-height: 67px;
      strong {
        color: #53a9ff;
      }
    }
    p {
      font-size: 24px;
      font-family: HarmonyOs-Medium;
      color: #989898;
      line-height: 36px;
      margin-top: 32px;
      margin-bottom: 40px;
    }
  }
  .nft-box {
    .nft-content-box {
      width: 452px;
      height: 578px;
      position: relative;
      .nft-img-box {
        width: 100%;
        height: 100%;
        border-radius: 24px 24px 0px 0px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
      }
      .circle-box {
        width: 100px;
        height: 100px;
        position: absolute;
        left: -50px;
        top: 50%;
        margin-top: -50px;
        z-index: 2;
      }
      .bottom-left-box {
        width: 80px;
        height: 80px;
        position: absolute;
        left: -40px;
        bottom: -40px;
        z-index: 2;
      }
      .bottom-right-box {
        width: 80px;
        height: 80px;
        position: absolute;
        right: -40px;
        bottom: -40px;
        z-index: 2;
      }
      .user-box {
        position: absolute;
        bottom: 48px;
        left: 40px;
        width: 372px;
        height: 108px;
        background: rgba(251, 251, 251, 0.1);
        box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 2;
        backdrop-filter: blur(45px);
        h3 {
          font-size: 24px;
          font-family: HarmonyOs-Bold;
          color: #ffffff;
          line-height: 36px;
          letter-spacing: 2px;
        }
        .des-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .head-box {
            display: flex;
            align-items: center;
            .img-box {
              width: 40px;
              height: 40px;
              min-width: 40px;
              position: relative;
              margin-right: 8px;
              border-radius: 50%;
              overflow: hidden;
              cursor: pointer;
            }
            h4 {
              font-size: 18px;
              font-family: HarmonyOs-Medium;
              color: #ffffff;
            }
          }
          .love-box {
            display: flex;
            align-items: center;
            .img-box {
              width: 24px;
              height: 24px;
              position: relative;
              margin-right: 4px;
              cursor: pointer;
            }
            span {
              font-size: 16px;
              font-family: HarmonyOs-Medium;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
`;

export const HomeBoutiqueBgContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
  filter: blur(40px);
  z-index: 0;
  background-size: contain;
`;

export const HomePublishContainer = styled.div`
  max-width: 1440px;
  height: 459px;
  margin: 0 auto;
  position: relative;
  padding: 0 80px;
  .prev-box {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    position: absolute;
    left: 24px;
    top: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    &:hover {
      border: 2px solid #dfe4ea;
    }
  }
  .next-box {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    position: absolute;
    right: 24px;
    top: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    &:hover {
      border: 2px solid #dfe4ea;
    }
  }
  .swiper {
    width: calc(100% + 48px);
    margin-left: -24px;
    height: 330px;
    padding-top: 20px;
    margin-top: -16px;
    padding-left: 24px;
    padding-right: 24px;
    .swiper-slide {
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const HomeRecommendContainer = styled.div`
  width: 100%;
  height: 784px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  padding: 0 80px;

  .card-content-box {
    width: 100%;
    height: 630px;
    display: flex;
    padding-top: 12px;
  }
  .recommend-nft-box {
    width: 737px;
    height: 100%;
    position: relative;
    .nft-box {
      width: 300px;
      height: 300px;
      position: absolute;
      .img-box {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .name {
          opacity: 0;
          position: absolute;
          width: 100%;
          bottom: 0;
          font-size: 18px;
          font-family: 'HarmonyOs-Bold';
          color: #ffffff;
          padding: 16px;
          transition: all 0.2s;
        }
        &:hover {
          .name {
            opacity: 1;
          }
        }
      }
      .user-box {
        width: 72px;
        height: 72px;
        border-radius: 72px;
        border: 2px solid #ffffff;
        position: absolute;
        z-index: 2;
        bottom: -24px;
        right: -24px;
        overflow: hidden;
      }
    }
    .nft-box-2 {
      width: 260px;
      height: 260px;
      position: absolute;
      left: 364px;
      top: 116px;
      .user-box {
        width: 64px;
        height: 64px;
        bottom: -24px;
        right: -24px;
      }
    }
    .nft-box-3 {
      width: 200px;
      height: 200px;
      position: absolute;
      left: 85px;
      top: 364px;
      .user-box {
        width: 56px;
        height: 56px;
        bottom: -24px;
        right: -24px;
      }
    }
  }
  .recommend-tip-box {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 24px;
    h2 {
      font-size: 36px;
      font-family: HarmonyOs-Bold;
      color: #333333;
      line-height: 54px;
    }
    p {
      font-size: 16px;
      font-family: HarmonyOs-Bold;
      color: #333333;
      line-height: 24px;
      margin-top: 32px;
      margin-bottom: 56px;
    }
  }
`;

export const HomeCollectionContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  .collection-content {
    margin-top: -4px;
  }
  .more-box {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
`;
