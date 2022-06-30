declare namespace GlobalClaim {
  interface Claim extends Twitter {
    worksID: string;
    discordUsername?: string;
    explain?: string;
    proof?: string; // 如果是多张图的话,格式则为: 1,2,3,4
  }

  interface Twitter {
    link?: string;
    nickname?: string;
    email?: string;
    image?: string;
  }

  interface UpdateEmail {
    applyId: string;
    email: string;
  }
}
