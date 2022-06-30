import Image from 'next/image';

import type {NextPage} from 'next';

import {TermsContainer} from '@/styles/tos';

const Tos: NextPage = () => {
  return (
    <TermsContainer>
      <div className='slogan-box'>
        <div className='left'>
          <h1>Terms Of Service</h1>
          <p>
            Read our terms below to learn more about your rights and
            responsibilities as a PD-1 user.
          </p>
        </div>
        <div className='right'>
          <Image
            alt='slogan'
            height={440}
            src='/static/image/service-slogan.png'
            width={534}
          />
        </div>
      </div>
      <div className='content-box'>
        <div className='title-box'>Last Updated: April 5, 2022</div>
        <div className='main-box'>
          <p className='title'>
            <strong>1.Introduction</strong>
          </p>
          <p>
            Welcome to PD-1s (“PD-1,” “we,” “us”, or “our”). These Terms of
            Service (“Terms”) govern your access to and use of the PD-1
            website(s), our APIs, mobile app (the “App”), and any other
            software, tools, features, or functionalities provided on or in
            connection with our services; including without limitation using our
            services to view, explore, and create NFTs and use our tools, at
            your own discretion, to connect directly with others to purchase,
            sell, or transfer NFTs on public blockchains (collectively, the
            “Service”). “NFT” in these Terms means a non-fungible token or
            similar digital item implemented on a blockchain (such as the
            Ethereum blockchain), which uses smart contracts to link to or
            otherwise be associated with certain content or data.
          </p>
          <p>
            For purposes of these Terms, “user”, “you”, and “your” means you as
            the user of the Service. If you use the Service on behalf of a
            company or other entity then “you” includes you and that entity, and
            you represent and warrant that (a) you are an authorized
            representative of the entity with the authority to bind the entity
            to these Terms, and (b) you agree to these Terms on the entity’s
            behalf.
          </p>
          <p>
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY AS THEY CONTAIN
            IMPORTANT INFORMATION AND AFFECT YOUR LEGAL RIGHTS. AS OUTLINED IN
            SECTION 16 BELOW, THEY INCLUDE A MANDATORY ARBITRATION AGREEMENT AND
            CLASS ACTION WAIVER WHICH (WITH LIMITED EXCEPTIONS) REQUIRE ANY
            DISPUTES BETWEEN US TO BE RESOLVED THROUGH INDIVIDUAL ARBITRATION
            RATHER THAN BY A JUDGE OR JURY IN COURT.
          </p>
          <p>
            BY CLICKING TO ACCEPT AND/OR USING OUR SERVICE, YOU AGREE TO BE
            BOUND BY THESE TERMS AND ALL OF THE TERMS INCORPORATED HEREIN BY
            REFERENCE. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR
            USE THE SERVICE.
          </p>
          <p>
            PD-1 is not a wallet provider, exchange, broker, financial
            institution, or creditor. PD-1 provides a peer-to-peer web3 service
            that helps users discover and directly interact with each other and
            NFTs available on public blockchains. We do not have custody or
            control over the NFTs or blockchains you are interacting with and we
            do not execute or effectuate purchases, transfers, or sales of NFTs.
            To use our Service, you must use a third-party wallet which allows
            you to engage in transactions on blockchains.
          </p>
          <p>
            PD-1 is not party to any agreement between any users. You bear full
            responsibility for verifying the identity, legitimacy, and
            authenticity of NFTs that you purchase from third-party sellers
            using the Service and we make no claims about the identity,
            legitimacy, functionality, or authenticity of users or NFTs (and any
            content associated with such NFTs) visible on the Service.
          </p>
          <p>
            Because we have a growing number of services, we sometimes need to
            provide additional terms for specific services (and such services
            are deemed part of the “Service” hereunder and shall also be subject
            to these Terms). Those additional terms and conditions, which are
            available with the relevant service, then become part of your
            agreement with us if you use those services. In the event of a
            conflict between these Terms and any additional applicable terms we
            may provide for a specific service, such additional terms shall
            control for that specific service.
          </p>
          <p>
            PD-1 reserves the right to change or modify these Terms at any time
            and in our sole discretion. If we make material changes to these
            Terms, we will use reasonable efforts to provide notice of such
            changes, such as by providing notice through the Service or updating
            the “Last Updated” date at the beginning of these Terms. By
            continuing to access or use the Service, you confirm your acceptance
            of the revised Terms and all of the terms incorporated therein by
            reference effective as of the date these Terms are updated. It is
            your sole responsibility to review the Terms from time to time to
            view such changes and to ensure that you understand the terms and
            conditions that apply when you access or use the Service.
          </p>
          <p className='title'>
            <strong>2.Accessing the Service</strong>
          </p>
          <p>
            Like much of web3, your blockchain address functions as your
            identity on PD-1. Accordingly, you will need a blockchain address
            and a third-party wallet to access the Service. Your account on the
            service (“Account”) will be associated with your blockchain address;
            however, if you want to add some flair to your PD-1 persona, you can
            add additional information, such as a profile picture, to your
            Account.
          </p>
          <p>
            Your Account on PD-1 will be associated with your linked blockchain
            address and display the NFTs for that blockchain address (and, if
            applicable, any content associated with such NFTs). By using your
            wallet in connection with the Service, you agree that you are using
            that wallet under the terms and conditions of the applicable
            provider of the wallet. Wallets are not operated by, maintained by,
            or affiliated with PD-1, and PD-1 does not have custody or control
            over the contents of your wallet and has no ability to retrieve or
            transfer its contents. PD-1 accepts no responsibility for, or
            liability to you, in connection with your use of a wallet and makes
            no representations or warranties regarding how the Service will
            operate with any specific wallet. You are solely responsible for
            keeping your wallet secure and you should never share your wallet
            credentials or seed phrase with anyone. If you discover an issue
            related to your wallet, please contact your wallet provider.
            Likewise, you are solely responsible for your Account and any
            associated wallet and we are not liable for any acts or omissions by
            you in connection with your Account or as a result of your Account
            or wallet being compromised. You agree to immediately notify us if
            you discover or otherwise suspect any security issues related to the
            Service or your Account (you can contact us by sending email or
            telegram message).
          </p>
          <p>
            You also represent and warrant that you will comply with all
            applicable laws (e.g., local, state, federal and other laws) when
            using the Service. Without limiting the foregoing, by using the
            Service, you represent and warrant that: (a) you are not located in
            a country that is subject to a U.S. Government embargo; and (b) you
            have not been identified as a Specially Designated National or
            placed on any U.S. Government list of prohibited, sanctioned, or
            restricted parties. If you access or use the Service outside the
            United States, you are solely responsible for ensuring that your
            access and use of the Service in such country, territory or
            jurisdiction does not violate any applicable laws.
          </p>
          <p>
            PD-1 may require you to provide additional information and documents
            in certain circumstances, such as at the request of any government
            authority, as any applicable law or regulation dictates, or to
            investigate a potential violation of these Terms. In such cases,
            PD-1, in its sole discretion, may disable your Account and block
            your ability to access the Service until such additional information
            and documents are processed by PD-1. If you do not provide complete
            and accurate information in response to such a request, PD-1 may
            refuse to restore your access to the Service.
          </p>
          <p>
            You also represent and warrant that you will comply with all
            applicable laws (e.g., local, state, federal and other laws) when
            using the Service. Without limiting the foregoing, by using the
            Service, you represent and warrant that: (a) you are not located in
            a country that is subject to a U.S. Government embargo; and (b) you
            have not been identified as a Specially Designated National or
            placed on any U.S. Government list of prohibited, sanctioned, or
            restricted parties. If you access or use the Service outside the
            United States, you are solely responsible for ensuring that your
            access and use of the Service in such country, territory or
            jurisdiction does not violate any applicable laws.
          </p>
          <p>
            We require all users to be at least 18 years old. If you are at
            least 13 years old but under 18 years old, you may only use PD-1
            through a parent or guardian’s Account and with their approval and
            oversight. That account holder is responsible for your actions using
            the Account. It is prohibited to use our Service if you are under 13
            years old.
          </p>
          <p className='title'>
            <strong>3.Ownership</strong>
          </p>
          <p>
            The Service, including its “look and feel” (e.g., text, graphics,
            images, logos, page headers, button icons, and scripts), proprietary
            content, information and other materials, and all content and other
            materials contained therein, including, without limitation, the PD-1
            logo and all designs, text, graphics, pictures, data, software,
            sound files, other files, and the selection and arrangement thereof
            are the proprietary property of PD-1 or our affiliates, licensors,
            or users, as applicable, and you agree not to take any action(s)
            inconsistent with such ownership interests. We and our affiliates,
            licensors, and users, as applicable, reserve all rights in
            connection with the Service and its content, including, without
            limitation, the exclusive right to create derivative works.
          </p>
          <p>
            PD-1&apos;s name, logo, trademarks, and any PD-1 product or service
            names, designs, logos, and slogans are the intellectual property of
            PD-1 or our affiliates or licensors and may not be copied, imitated
            or used, in whole or in part, without our prior written permission
            in each instance. You may not use any metatags or other “hidden
            text” utilizing “PD-1” or any other name, trademark or product or
            service name of PD-1 or our affiliates or licensors without our
            prior written permission. In addition, the “look and feel” of the
            Service constitutes the service mark, trademark or trade dress of
            PD-1 and may not be copied, imitated or used, in whole or in part,
            without our prior written permission.
          </p>
          <p>
            All other third-party trademarks, registered trademarks, and product
            names mentioned on the Service or contained in the content linked to
            or associated with any NFTs displayed on the Service are the
            property of their respective owners and may not be copied, imitated
            or used, in whole or in part, without the permission of the
            applicable intellectual property rights holder. Reference to any
            products, services, processes or other information by name,
            trademark, manufacturer, supplier or otherwise does not constitute
            or imply endorsement, sponsorship, or recommendation by PD-1.
          </p>
          <p>
            We welcome feedback, comments, and suggestions for improvements to
            the Service (“Feedback”). You acknowledge and expressly agree that
            any contribution of Feedback does not and will not give or grant you
            any right, title, or interest in the Service or in any such
            Feedback. You agree that PD-1 may use and disclose Feedback in any
            manner and for any purpose whatsoever without further notice or
            compensation to you and without retention by you of any proprietary
            or other right or claim. You hereby assign to PD-1 any and all
            right, title, and interest (including, but not limited to, any
            patent, copyright, trade secret, trademark, show-how, know-how,
            moral rights and any and all other intellectual property right) that
            you may have in and to any and all Feedback.
          </p>
          <p className='title'>
            <strong>4.License to Access and Use Our Service and Content</strong>
          </p>
          <p>
            You are hereby granted a limited, nonexclusive, nontransferable,
            nonsublicensable, and personal license to access and use the Service
            provided, however, that such license is subject to your compliance
            with these Terms. If any software, content, or other materials owned
            by, controlled by, or licensed to us are distributed or made
            available to you as part of your use of the Service, we hereby grant
            you a non-commercial, personal, non-assignable, non-sublicensable,
            non-transferrable, and non-exclusive right and license to access and
            display such software, content, and materials provided to you as
            part of the Service (and right to download a single copy of the App
            onto your applicable equipment or device), in each case for the sole
            purpose of enabling you to use the Service as permitted by these
            Terms, provided that your license in any content linked to or
            associated with any NFTs is solely as set forth by the applicable
            seller or creator of such NFT.
          </p>
          <p className='title'>
            <strong>5.Third-Party Content and Services</strong>
          </p>
          <p>
            As a peer-to-peer web3 service, PD-1 helps you explore NFTs created
            by third parties and interact with different blockchains. PD-1 does
            not make any representations or warranties about this third-party
            content visible through our Service, including any content
            associated with NFTs displayed on the Service, and you bear
            responsibility for verifying the legitimacy, authenticity, and
            legality of NFTs that you purchase from third-party sellers. We also
            cannot guarantee that any NFTs visible on PD-1 will always remain
            visible and/or available to be bought, sold, or transferred.
          </p>
          <p>
            NFTs may be subject to terms directly between buyers and sellers
            with respect to the use of the NFT content and benefits associated
            with a given NFT (“Purchase Terms”). For example, when you click to
            get more details about any of the NFTs visible on PD-1, you may
            notice a third party link to the creator’s website. Such website may
            include Purchase Terms governing the use of the NFT that you will be
            required to comply with. PD-1 is not a party to any such Purchase
            Terms, which are solely between the buyer and the seller. The buyer
            and seller are entirely responsible for communicating, promulgating,
            agreeing to, and enforcing Purchase Terms. You are solely
            responsible for reviewing such Purchase Terms.
          </p>
          <p>
            The Service may also contain links or functionality to access or use
            third-party websites (“Third-Party Websites”) and applications
            (“Third-Party Applications”), or otherwise display, include, or make
            available content, data, information, services, applications, or
            materials from third parties (“Third-Party Materials”). When you
            click on a link to, or access and use, a Third-Party Website or
            Third-Party Application, though we may not warn you that you have
            left our Service, you are subject to the terms and conditions
            (including privacy policies) of another website or destination. Such
            Third-Party Websites, Third-Party Applications, and Third-Party
            Materials are not under the control of PD-1, and may be “open”
            applications for which no recourse is possible. PD-1 is not
            responsible or liable for any Third-Party Websites, Third-Party
            Applications, and Third-Party Materials. PD-1 provides links to
            these Third-Party Websites and Third-Party Applications only as a
            convenience and does not review, approve, monitor, endorse, warrant,
            or make any representations with respect to Third-Party Websites or
            Third-Party Applications, or their products or services or
            associated Third-Party Materials. You use all links in Third-Party
            Websites, Third-Party Applications, and Third-Party Materials at
            your own risk.
          </p>
          <p className='title'>
            <strong>6.User Conduct</strong>
          </p>
          <p>
            Openness is one of our most prized values, and we&apos;re committed
            to providing people from all walks of life and varying experience
            levels with web3 with a colorful lens into different blockchains.
            However, to protect our community and comply with our legal
            obligations, we reserve the right to take action, with or without
            advance notice, if we believe you have violated these Terms. This
            may include: removing the ability to view certain NFTs on the
            Service or use our Service to interact with the NFTs; disabling the
            ability to use the Service in conjunction with
            buying/selling/transferring NFTs available on blockchains; disabling
            your ability to access our Service; and/or other actions.
          </p>
          <p>
            You agree that you will not violate any law, contract, intellectual
            property or other third-party right, and that you are solely
            responsible for your conduct and content, while accessing or using
            the Service. You also agree that you will not:
          </p>
          <ul>
            <li>
              Use or attempt to use another user&apos;s Account without
              authorization from such user;
            </li>
            <li>Pose as another person or entity</li>
            <li>
              Claim an PD-1 username for the purpose of reselling it or
              otherwise engage in name squatting;
            </li>
            <li>
              Access the Service from a different blockchain address if
              we&apos;ve blocked any of your other blockchain addresses from
              accessing the Service, unless you have our written permission
              first;
            </li>
            <li>
              Distribute spam, including through sending unwanted NFTs to other
              users;
            </li>
            <li>
              Use the Service - including through disseminating any software or
              interacting with any API - that could damage, disable, overburden,
              or impair the functioning of the Service in any manner;
            </li>
            <li>
              Bypass or ignore instructions that control access to the Service,
              including attempting to circumvent any rate limiting systems by
              using multiple API keys, directing traffic through multiple IP
              addresses, or otherwise obfuscating the source of traffic you send
              to PD-1;
            </li>
            <li>
              Use any data mining, robot, spider, crawler, scraper, script,
              browser extension, offline reader, or other automated means or
              interface not authorized by us to access the Service, extract
              data, or otherwise interfere with or modify the rendering of
              Service pages or functionality;
            </li>
            <li>
              Reverse engineer, duplicate, decompile, disassemble, or decode any
              aspect of the Service, or do anything that might discover source
              code or bypass or circumvent measures employed to prevent or limit
              access to any service, area, or code of the Service;
            </li>
            <li>
              Sell or resell the Service or attempt to circumvent any PD-1 fee
              systems;
            </li>
            <li>
              Engage in behaviors that have the intention or the effect of
              artificially causing an item or collection to appear at the top of
              search results, or artificially increasing view counts, favorites,
              or other metrics that PD-1 might use to sort search results;
            </li>
            <li>
              Use the Service or data collected from our Service for any
              advertising or direct marketing activity (including without
              limitation, email marketing, SMS marketing, and telemarketing);
            </li>
            <li>
              Use the Service for money laundering, terrorist financing, or
              other illicit finance;
            </li>
            <li>
              Use the Service from a country sanctioned by the government of the
              United States or to facilitate transactions involving individuals
              sanctioned by the government of the United States or located in
              sanctioned countries;
            </li>
            <li>
              Use the Service to carry out any financial activities subject to
              registration or licensing, including but not limited to creating,
              selling, or buying securities, commodities, options, or debt
              instruments;
            </li>
            <li>
              Use the Service to create, sell, or buy NFTs or other items that
              give owners rights to participate in an ICO or any securities
              offering, or that are redeemable for securities, commodities, or
              other financial instruments;
            </li>
            <li>
              Use the Service to engage in price manipulation, fraud, or other
              deceptive, misleading, or manipulative activity;
            </li>
            <li>
              Use the Service to buy, sell, or transfer stolen items,
              fraudulently obtained items, items taken without authorization,
              and/or any other illegally obtained items;
            </li>
            <li>
              Infringe or violate the intellectual property rights or any other
              rights of others;
            </li>
            <li>
              Create or display illegal content, such as content that may
              involve child sexual exploitation;
            </li>
            <li>
              Create or display NFTs or other items that promote suicide or
              self-harm, incites hate or violence against others, or doxes
              another individual;
            </li>
            <li>
              Use the Service for any illegal or unauthorized purpose, including
              creating or displaying illegal content, such as content that may
              involve child sexual exploitation, or encouraging or promoting any
              activity that violates the Terms of Service;
            </li>
            <li>
              Use the Service in any manner that could interfere with, disrupt,
              negatively affect or inhibit other users from fully enjoying the
              Service.
            </li>
          </ul>
          <p>
            We allow users to post NSFW content, but that content and other
            associated material is subject to being marked NSFW and may be
            handled differently than non-NSFW content in navigation menus and
            search results.
          </p>
          <p>
            Finally, by using the Service, you understand the importance of DYOR
            – doing your own research. You bear full responsibility for
            verifying the authenticity, legitimacy, identity, and other details
            about any NFT, collection, or account that you view or otherwise
            interact with in conjunction with our Service. We make no guarantees
            or promises about the identity, legitimacy, or authenticity of any
            NFT, collection, or account on the Service.
          </p>
          <p className='title'>
            <strong>7.Intellectual Property Rights</strong>
          </p>
          <p>
            You are solely responsible for your use of the Service and for any
            information you provide, including compliance with applicable laws,
            rules, and regulations, as well as these Terms, including the User
            Conduct requirements outlined above.
          </p>
          <p>
            By using the Service in conjunction with creating, submitting,
            posting, promoting, or displaying content, or by complying with
            PD-1&apos;s metadata standards in your metadata API responses, you
            grant us a worldwide, non-exclusive, sublicensable, royalty-free
            license to use, copy, modify, and display any content, including but
            not limited to text, materials, images, files, communications,
            comments, feedback, suggestions, ideas, concepts, questions, data,
            or otherwise, that you submit or post on or through the Service for
            our current and future business purposes, including to provide,
            promote, and improve the Service. This includes any digital file,
            art, or other material linked to or associated with any NFTs that
            are displayed on the Service.
          </p>
          <p>
            PD-1 does not claim that submitting, posting, or displaying this
            content on or through the Service gives PD-1 any ownership of the
            content. We&apos;re not saying we own it. We&apos;re just saying we
            might use it and show it off a bit.
          </p>
          <p>
            You represent and warrant that you have, or have obtained, all
            rights, licenses, consents, permissions, power and/or authority
            necessary to grant the rights granted herein for any content that
            you create, submit, post, promote, or display on or through the
            Service. You represent and warrant that such content does not
            contain material subject to copyright, trademark, publicity rights,
            or other intellectual property rights, unless you have necessary
            permission or are otherwise legally entitled to post the material
            and to grant PD-1 the license described above, and that the content
            does not violate any laws.
          </p>
          <p>
            PD-1 will take down works in response to Digital Millennium
            Copyright Act (“DMCA”) takedown notices and/or other intellectual
            property infringement claims and will terminate a user&apos;s access
            to the Service if the user is determined to be a repeat infringer.
            If you believe that your content has been copied in a way that
            constitutes copyright or trademark infringement, or violates your
            publicity or other intellectual property rights, please send email
            or telegram message to us.
          </p>
          <p>
            For us to process your infringement claim regarding content on the
            Service, you must be the rightsholder or someone authorized to act
            on behalf of the rightsholder. We encourage you to write to us by
            email or send telegram message, your notice must include:
          </p>
          <ul>
            <li>
              Identification of the copyrighted work(s), trademark, publicity
              rights, or other intellectual property rights that you claim is
              being infringed;
            </li>
            <li>
              Identification of the allegedly infringing material that is
              requested to be removed, including a description of the specific
              location (i.e., urls) on the Service of the material claimed to be
              infringing, so that we may locate the material;
            </li>
            <li>
              Your contact information – at a minimum, your full legal name (not
              pseudonym) and email address;
            </li>
            <li>A declaration that contains all of the following:</li>
            <ul>
              <li>
                A statement that you have a good faith belief that use of the
                material in the manner complained of is not authorized by the
                intellectual property rights owner, its agent, or the law;
              </li>
              <li>
                A statement that the information in the notice is accurate; and
              </li>
              <li>
                A statement under penalty of perjury that you are authorized to
                act on behalf of the intellectual property owner of the
                intellectual property that is allegedly being infringed.
              </li>
            </ul>
            <li>
              Your physical or electronic signature (of your full legal name).
            </li>
          </ul>
          <p>
            Please note that we will forward your notice of intellectual
            property infringement, including your contact information, to the
            party who will have their content removed so they understand why it
            is no longer available on PD-1 and can also contact you to resolve
            any dispute.
          </p>
          <p className='title'>
            <strong>8.Communication Preferences</strong>
          </p>
          <p>
            By creating an Account, you consent to receive electronic
            communications from PD-1 (e.g., via email, push notification, text
            messages, or other types of messages). These communications may
            include notices about your Account (e.g., transactional information)
            and are part of your relationship with us. We may also send you
            promotional communications via email we think will be of interest to
            you. You understand that you are not required to provide this
            consent as a condition of using the Service and you may opt out of
            these communications through the Service or through your mobile
            device’s operating system (with the possible exception of important
            service announcements and administrative messages) by following the
            unsubscribe instructions provided.
          </p>
          <p className='title'>
            <strong>9.App Terms</strong>
          </p>
          <p>
            You are responsible for providing the mobile device, wireless
            service plan, software, Internet connections, and/or other equipment
            or services that you need to download, install, and use the App. We
            do not guarantee that the App can be accessed and used on any
            particular device or with any particular service plan. We do not
            guarantee that the App or Service will be available in any
            particular geographic location.
          </p>
          <p>
            The following terms and conditions apply to you only if you are
            using the App from the Apple App Store: To the extent the other
            terms and conditions of these Terms are less restrictive than, or
            otherwise conflict with, the terms and conditions of this paragraph,
            the more restrictive or conflicting terms and conditions in this
            paragraph apply, but solely with respect to your use of the App from
            the Apple App Store. You acknowledge and agree that these Terms are
            solely between you and PD-1, not Apple, and that Apple has no
            responsibility for the App or content thereof. Your use of the App
            must comply with the App Store’s applicable terms of use. You
            acknowledge that Apple has no obligation whatsoever to furnish any
            maintenance and support services with respect to the App. In the
            event of any failure of the App to conform to any applicable{' '}
          </p>
          <p>
            warranty, you may notify Apple, and Apple will refund the purchase
            price, if any, for the App to you. To the maximum extent permitted
            by applicable law, Apple will have no other warranty obligation
            whatsoever with respect to the App, and any other claims, losses,
            liabilities, damages, costs or expenses attributable to any failure
            to conform to any warranty will be solely governed by these Terms.
            You acknowledge that Apple is not responsible for addressing any
            claims of yours or any third party relating to the App or your
            possession and/or use of the App, including, but not limited to: (a)
            product liability claims, (b) any claim that the App fails to
            conform to any applicable legal or regulatory requirement, and (c)
            claims arising under consumer protection or similar legislation. You
            acknowledge that, in the event of any third-party claim that the App
            or your possession and use of that App infringes that third party’s
            intellectual property rights, PD-1, not Apple, will be solely
            responsible for the investigation, defense, settlement and discharge
            of any such intellectual property infringement claim to the extent
            required by these Terms. You must comply with applicable third-party
            terms of agreement when using the App. You acknowledge and agree
            that Apple, and Apple’s subsidiaries, are third-party beneficiaries
            of these Terms as they relate to your use of the App, and that, upon
            your acceptance of these Terms, Apple will have the right (and will
            be deemed to have accepted the right) to enforce these Terms against
            you as a third-party beneficiary thereof.
          </p>
          <p className='title'>
            <strong>10.Indemnification</strong>
          </p>
          <p>
            By agreeing to these Terms and accessing the Service, you agree, to
            the fullest extent permitted by applicable law, to indemnify,
            defend, and hold harmless PD-1, and our respective past, present,
            and future employees, officers, directors, contractors, consultants,
            equity holders, suppliers, vendors, service providers, parent
            companies, subsidiaries, affiliates, agents, representatives,
            predecessors, successors, and assigns (individually and
            collectively, the “PD-1 Parties”), from and against all actual or
            alleged claims, damages, awards, judgments, losses, liabilities,
            obligations, penalties, interest, fees, expenses (including, without
            limitation, attorneys’ fees and expenses), and costs (including,
            without limitation, court costs, costs of settlement, and costs of
            pursuing indemnification and insurance), of every kind and nature
            whatsoever, whether known or unknown, foreseen or unforeseen,
            matured or unmatured, or suspected or unsuspected, in law or equity,
            whether in tort, contract, or otherwise (collectively, “Claims”),
            including, but not limited to, damages to property or personal
            injury, that are caused by, arise out of or are related to (a) your
            use or misuse of the Service, content, NFTs, or content linked to or
            associated with any NFTs (b) any Feedback you provide, (c) your
            violation or breach of any term of these Terms or applicable law,
            and (d) your violation of the rights of or obligations to a third
            party, including another user or third-party, and (e) your
            negligence or wilful misconduct. You agree to promptly notify PD-1
            of any Claims and cooperate with the PD-1 Parties in defending such
            Claims. You further agree that the PD-1 Parties shall have control
            of the defense or settlement of any Claims. THIS INDEMNITY IS IN
            ADDITION TO, AND NOT IN LIEU OF, ANY OTHER INDEMNITIES SET FORTH IN
            A WRITTEN AGREEMENT BETWEEN YOU AND PD-1.
          </p>
          <p className='title'>
            <strong>11.Disclaimers</strong>
          </p>
          <p>
            YOUR ACCESS TO AND USE OF THE SERVICE IS AT YOUR OWN RISK. YOU
            UNDERSTAND AND AGREE THAT THE SERVICE IS PROVIDED ON AN “AS IS” AND
            “AS AVAILABLE” BASIS AND PD-1 EXPRESSLY DISCLAIMS WARRANTIES OR
            CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. PD-1 (AND ITS
            SUPPLIERS) MAKE NO WARRANTY OR REPRESENTATION AND DISCLAIM ALL
            RESPONSIBILITY FOR WHETHER THE SERVICE: (A) WILL MEET YOUR
            REQUIREMENTS; (B) WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY,
            SECURE, OR ERROR-FREE BASIS; OR (C) WILL BE ACCURATE, RELIABLE,
            COMPLETE, LEGAL, OR SAFE. PD-1 DISCLAIMS ALL OTHER WARRANTIES OR
            CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION,
            IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. PD-1 WILL NOT BE
            LIABLE FOR ANY LOSS OF ANY KIND FROM ANY ACTION TAKEN OR TAKEN IN
            RELIANCE ON MATERIAL OR INFORMATION, CONTAINED ON THE SERVICE. WHILE
            PD-1 ATTEMPTS TO MAKE YOUR ACCESS TO AND USE OF THE SERVICE SAFE,
            PD-1 CANNOT AND DOES NOT REPRESENT OR WARRANT THAT THE SERVICE,
            CONTENT, CONTENT LINKED TO OR ASSOCIATED WITH ANY NFTS, OR ANY NFTS
            YOU INTERACT WITH USING OUR SERVICE OR OUR SERVICE PROVIDERS’
            SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE CANNOT
            GUARANTEE THE SECURITY OF ANY DATA THAT YOU DISCLOSE ONLINE. NO
            ADVICE OR INFORMATION, WHETHER ORAL OR OBTAINED FROM THE PD-1
            PARTIES OR THROUGH THE SERVICE, WILL CREATE ANY WARRANTY OR
            REPRESENTATION NOT EXPRESSLY MADE HEREIN. YOU ACCEPT THE INHERENT
            SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE
            INTERNET AND WILL NOT HOLD PD-1 RESPONSIBLE FOR ANY BREACH OF
            SECURITY.
          </p>
          <p>
            WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS AND TAKE NO
            RESPONSIBILITY FOR, AND WILL NOT BE LIABLE TO YOU FOR, ANY USE OF
            NFTS, CONTENT, AND/OR CONTENT LINKED TO OR ASSOCIATED WITH NFTS,
            INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES, OR CLAIMS ARISING
            FROM: (A) USER ERROR, INCORRECTLY CONSTRUCTED TRANSACTIONS, OR
            MISTYPED ADDRESSES; (B) SERVER FAILURE OR DATA LOSS; (C)
            UNAUTHORIZED ACCESS OR USE; (D) ANY UNAUTHORIZED THIRD-PARTY
            ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES,
            PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE SERVICE
            OR NFTS.
          </p>
          <p>
            NFTS EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD MAINTAINED IN THE
            ASSOCIATED BLOCKCHAIN (E.G., ETHEREUM NETWORK). ANY TRANSFERS OR
            SALES OCCUR ON THE ASSOCIATED BLOCKCHAIN (E.G., ETHEREUM). PD-1
            AND/OR ANY OTHER PD-1 PARTY CANNOT EFFECT OR OTHERWISE CONTROL THE
            TRANSFER OF TITLE OR RIGHT IN ANY NFTS OR UNDERLYING OR ASSOCIATED
            CONTENT OR ITEMS.
          </p>
          <p>
            NO PD-1 PARTY IS RESPONSIBLE OR LIABLE FOR ANY SUSTAINED LOSSES OR
            INJURY DUE TO VULNERABILITY OR ANY KIND OF FAILURE, ABNORMAL
            BEHAVIOR OF SOFTWARE (E.G., WALLET, SMART CONTRACT), BLOCKCHAINS OR
            ANY OTHER FEATURES OF THE NFTS. NO PD-1 PARTY IS RESPONSIBLE FOR
            LOSSES OR INJURY DUE TO LATE REPORTS BY DEVELOPERS OR
            REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE
            BLOCKCHAIN SUPPORTING THE NFTS, INCLUDING FORKS, TECHNICAL NODE
            ISSUES OR ANY OTHER ISSUES HAVING LOSSES OR INJURY AS A RESULT.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion of implied warranties
            in contracts with consumers, so the above exclusion may not apply to
            you.
          </p>
          <p className='title'>
            <strong>12.Assumption of Risk</strong>
          </p>
          <p>You accept and acknowledge:</p>
          <ul>
            <li>
              The value of an NFTs is subjective. Prices of NFTs are subject to
              volatility and fluctuations in the price of cryptocurrency can
              also materially and adversely affect NFT prices. You acknowledge
              that you fully understand this subjectivity and volatility and
              that you may lose money.
            </li>
            <li>
              A lack of use or public interest in the creation and development
              of distributed ecosystems could negatively impact the development
              of those ecosystems and related applications, and could therefore
              also negatively impact the potential utility of NFTs.
            </li>
            <li>
              The regulatory regime governing blockchain technologies,
              non-fungible tokens, cryptocurrency, and other crypto-based items
              is uncertain, and new regulations or policies may materially
              adversely affect the development of the Service and the utility of
              NFTs.
            </li>
            <li>
              You are solely responsible for determining what, if any, taxes
              apply to your transactions. PD-1 is not responsible for
              determining the taxes that apply to your NFTs.
            </li>
            <li>
              There are risks associated with purchasing items associated with
              content created by third parties through peer-to-peer
              transactions, including but not limited to, the risk of purchasing
              counterfeit items, mislabeled items, items that are vulnerable to
              metadata decay, items on smart contracts with bugs, and items that
              may become untransferable. You represent and warrant that you have
              done sufficient research before making any decisions to sell,
              obtain, transfer, or otherwise interact with any NFTs or
              accounts/collections.
            </li>
            <li>
              We do not control the public blockchains that you are interacting
              with and we do not control certain smart contracts and protocols
              that may be integral to your ability to complete transactions on
              these public blockchains. Additionally, blockchain transactions
              are irreversible and PD-1 has no ability to reverse any
              transactions on the blockchain.
            </li>
            <li>
              There are risks associated with using Internet and blockchain
              based products, including, but not limited to, the risk associated
              with hardware, software, and Internet connections, the risk of
              malicious software introduction, and the risk that third parties
              may obtain unauthorized access to your third-party wallet or
              Account. You accept and acknowledge that PD-1 will not be
              responsible for any communication failures, disruptions, errors,
              distortions or delays you may experience when using the Service or
              any Blockchain network, however caused.
            </li>
            <li>
              The Service relies on third-party platforms and/or vendors. If we
              are unable to maintain a good relationship with such platform
              providers and/or vendors; if the terms and conditions or pricing
              of such platform providers and/or vendors change; if we violate or
              cannot comply with the terms and conditions of such platforms
              and/or vendors; or if any of such platforms and/or vendors loses
              market share or falls out of favor or is unavailable for a
              prolonged period of time, access to and use of the Service will
              suffer.
            </li>
            <li>
              PD-1 reserves the right to hide collections, contracts, and items
              affected by any of these issues or by other issues. Items you
              purchase may become inaccessible on PD-1. Under no circumstances
              shall the inability to view items on PD-1 or an inability to use
              the Service in conjunction with the purchase, sale, or transfer of
              items available on any blockchains serve as grounds for a claim
              against PD-1.
            </li>
            <li>
              If you have a dispute with one or more users, YOU RELEASE US FROM
              CLAIMS, DEMANDS, AND DAMAGES OF EVERY KIND AND NATURE, KNOWN AND
              UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH SUCH
              DISPUTES. IN ENTERING INTO THIS RELEASE YOU EXPRESSLY WAIVE ANY
              PROTECTIONS (WHETHER STATUTORY OR OTHERWISE) THAT WOULD OTHERWISE
              LIMIT THE COVERAGE OF THIS RELEASE TO INCLUDE THOSE CLAIMS WHICH
              YOU MAY KNOW OR SUSPECT TO EXIST IN YOUR FAVOR AT THE TIME OF
              AGREEING TO THIS RELEASE.
            </li>
          </ul>
          <p className='title'>
            <strong>13.Limitation of Liability</strong>
          </p>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AGREE THAT IN NO EVENT
            WILL PD-1 OR ITS SERVICE PROVIDERS BE LIABLE TO YOU OR ANY THIRD
            PARTY FOR ANY LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY,
            INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM THESE TERMS OR
            THE SERVICE, PRODUCTS OR THIRD-PARTY SITES AND PRODUCTS, OR FOR ANY
            DAMAGES RELATED TO LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF
            BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, OR
            LOSS OF DATA, AND WHETHER CAUSED BY STRICT LIABILITY OR TORT
            (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF
            FORESEEABLE AND EVEN IF PD-1 OR ITS SERVICE PROVIDERS HAVE BEEN
            ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; OR (B) FOR ANY OTHER
            CLAIM, DEMAND, OR DAMAGES WHATSOEVER RESULTING FROM OR ARISING OUT
            OF OR IN CONNECTION WITH THESE TERMS OF THE DELIVERY, USE, OR
            PERFORMANCE OF THE SERVICE. ACCESS TO, AND USE OF, THE SERVICE,
            PRODUCTS OR THIRD-PARTY SITES, AND PRODUCTS ARE AT YOUR OWN
            DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY
            DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA
            RESULTING THEREFROM.
          </p>
          <p>
            NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO
            EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY OF PD-1 ARISING OUT OF
            OR IN ANY WAY RELATED TO THESE TERMS, THE ACCESS TO AND USE OF THE
            SERVICE, CONTENT, NFTS, OR ANY PD-1 PRODUCTS OR SERVICES EXCEED THE
            GREATER OF (A) $100 OR (B) THE AMOUNT RECEIVED BY PD-1 FOR ITS
            SERVICE DIRECTLY RELATING TO THE ITEMS THAT ARE THE SUBJECT OF THE
            CLAIM. THE FOREGOING LIMITATIONS WILL APPLY EVEN IF THE ABOVE STATED
            REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion or limitation of
            incidental or consequential damages, so the above limitation or
            exclusion may not apply to you. Some jurisdictions also limit
            disclaimers or limitations of liability for personal injury from
            consumer products, so this limitation may not apply to personal
            injury claims.
          </p>
          <p className='title'>
            <strong>14.Privacy Policy</strong>
          </p>
          <p>
            Please refer to our Privacy Policy for information about how we
            collect, use, and share personal data about you. By submitting
            personal data through our Service, you agree to the terms of our
            Privacy Policy and you expressly consent to the collection, use, and
            disclosure of your personal data in accordance with the Privacy
            Policy.
          </p>
          <p className='title'>
            <strong>15.Modifications to the Service</strong>
          </p>
          <p>
            We reserve the right in our sole discretion to modify, suspend, or
            discontinue, temporarily or permanently, the Service (or any
            features or parts thereof) at any time and without liability as a
            result.
          </p>
          <p className='title'>
            <strong>16.Dispute Resolution; Arbitration</strong>
          </p>
          <ul>
            <li>
              Dispute Resolution. Please read the following arbitration
              agreement in this Section (“Arbitration Agreement”) carefully. It
              requires you to arbitrate disputes with PD-1 and limits the manner
              in which you can seek relief from us. This section does not govern
              disputes between users or between users and third parties.. PD-1
              does not provide dispute resolution services for such
              disagreements and the parties must resolve those disputes
              directly.
            </li>
            <li>
              Applicability of Arbitration Agreement. You agree that any
              dispute, controversy, or claim relating in any way to your access
              or use of the Service, to any products sold or distributed through
              the Service, or to any aspect of your relationship with PD-1, will
              be resolved by binding arbitration, rather than in court,
              including threshold questions of the arbitrability of such
              dispute, controversy, or claim except that (1) you or PD-1 may
              assert claims in small claims court, but only if the claims
              qualify, the claims remain only in such court, and the claims
              remain on an individual, non-representative, and non-class basis;
              and (2) you or PD-1 may seek injunctive or equitable relief in a
              court of proper jurisdiction if the claim relates to intellectual
              property infringement or other misuse of intellectual property
              rights.
            </li>
            <li>
              Dispute resolution process. You and PD-1 both agree to engage in
              good-faith efforts to resolve disputes prior to either party
              initiating an arbitration, small claims court proceeding, or
              equitable relief for intellectual property infringement. You must
              initiate this dispute resolution process by sending a letter
              describing the nature of your claim and desired resolution to our
              contact email. Both parties agree to meet and confer personally,
              by telephone, or by videoconference (hereinafter “Conference”) to
              discuss the dispute and attempt in good faith to reach a mutually
              beneficial outcome that avoids the expenses of arbitration or,
              where applicable, litigation. If you are represented by counsel,
              your counsel may participate in the Conference as well, but you
              agree to fully participate in the Conference. Likewise, if PD-1 is
              represented by counsel, its counsel may participate in the
              Conference as well, but PD-1 agrees to have a company
              representative fully participate in the Conference. The statute of
              limitations and any filing fee deadlines shall be tolled while the
              parties engage in the informal dispute resolution process and
              Conference required by this paragraph. If the parties do not reach
              agreement to resolve the dispute within thirty (30) days after
              initiation of this dispute resolution process, either party may
              commence arbitration, file an action in small claims court, or
              file a claim for injunctive or equitable relief in a court of
              proper jurisdiction for matters relating to intellectual property
              infringement, if the claims qualify.
            </li>
            <li>
              Arbitration Rules and Forum. The Federal Arbitration Act governs
              the interpretation and enforcement of this Arbitration Agreement.
              To begin an arbitration proceeding after participating in the
              dispute resolution process, you must send a letter requesting
              arbitration and describing your claim to our registered agent at
              PD-1.{' '}
            </li>
            <li>
              Authority of Arbitrator. The arbitrator shall have exclusive
              authority to (a) determine the scope and enforceability of this
              Arbitration Agreement and (b) resolve any dispute related to the
              interpretation, applicability, enforceability, or formation of
              this Arbitration Agreement including, but not limited to, any
              claim that all or any part of this Arbitration Agreement is void
              or voidable. The arbitration will decide the rights and
              liabilities, if any, of you and PD-1. The arbitration proceeding
              will not be consolidated with any other matters or joined with any
              other cases or parties. The arbitrator shall have the authority to
              grant motions dispositive of all or part of any claim. The
              arbitrator shall have the authority to award monetary damages and
              to grant any non-monetary remedy or relief available to an
              individual under applicable law, the arbitral forum’s rules, and
              these Terms. The arbitrator shall issue a written award and
              statement of decision describing the essential findings and
              conclusions on which the award is based, including the calculation
              of any damages awarded. The arbitrator has the same authority to
              award relief on an individual basis that a judge in a court of law
              would have. The award of the arbitrator is final and binding upon
              you and us.
            </li>
            <li>
              Waiver of Jury Trial. YOU AND PD-1 HEREBY WAIVE ANY CONSTITUTIONAL
              AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A TRIAL IN FRONT OF
              A JUDGE OR A JURY. You and PD-1 are instead electing that all
              claims and disputes shall be resolved by arbitration under this
              Arbitration Agreement, except as specified in the second bullet of
              this Section 16, above (“Applicability of Arbitration Agreement”).
              An arbitrator can award on an individual basis the same damages
              and relief as a court and must follow these Terms as a court
              would. However, there is no judge or jury in arbitration, and
              court review of an arbitration award is subject to very limited
              review.
            </li>
            <li>
              Waiver of Class Actions and Class Arbitrations. ALL CLAIMS AND
              DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE
              ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A REPRESENTATIVE OR
              COLLECTIVE CLASS BASIS. ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND
              CLAIMS OF MORE THAN ONE USER, PERSON, OR ENTITY CANNOT BE
              ARBITRATED OR CONSOLIDATED WITH THOSE OF ANY OTHER USER, PERSON,
              OR ENTITY. Accordingly, under the arbitration procedures outlined
              in this section, an arbitrator shall not combine or consolidate
              more than one party’s claims without the written consent of all
              affected parties to an arbitration proceeding. Without limiting
              the generality of the foregoing, you and PD-1 agree that no
              dispute shall proceed by way of class arbitration without the
              written consent of all affected parties. If a decision is issued
              stating that applicable law precludes enforcement of any part of
              this subsection’s limitations as to a given claim for relief, then
              that claim must be severed from the arbitration and brought in the
              state or federal courts located in New York County in the State of
              New York. All other claims shall be arbitrated.
            </li>
            <li>
              Severability. Except as provided in this Section, if any part or
              parts of this Arbitration Agreement are found under the law to be
              invalid or unenforceable, then such specific part or parts shall
              be of no force and effect and shall be severed and the remainder
              of the Arbitration Agreement shall continue in full force and
              effect.
            </li>
            <li>
              Survival of Agreement. This Arbitration Agreement will survive the
              termination of your relationship with PD-1.
            </li>
            <li>
              Modification. Notwithstanding any provision in these Terms to the
              contrary, we agree that if PD-1 makes any future material change
              to this Arbitration Agreement, you may reject that change within
              thirty (30) days of such change becoming effective by writing to
              PD-1 official email.
            </li>
          </ul>
          <p className='title'>
            <strong>17.Governing Law and Venue</strong>
          </p>
          <p>
            These Terms and your access to and use of the Service shall be
            governed by and construed and enforced in accordance with the laws
            of the State of New York (without regard to conflict of law rules or
            principles of the State of New York, or any other jurisdiction that
            would cause the application of the laws of any other jurisdiction).
            Any dispute between the parties that is not subject to arbitration
            as set forth in Section 16 or cannot be heard in small claims court,
            shall be resolved in the state or federal courts of New York County
            in the State of New York, and the United States, respectively,
            sitting in the State of New York.
          </p>
          <p className='title'>
            <strong>18.Termination</strong>
          </p>
          <p>
            If you breach any of the provisions of these Terms, all licenses
            granted by PD-1 will terminate automatically. Additionally,
            notwithstanding anything contained in these Terms, we reserve the
            right, with or without notice and in our sole discretion, to
            suspend, disable, terminate, or delete your Account and/or your
            ability to access or use the Service (or any part of the foregoing)
            at any time and for any or no reason, and you acknowledge and agree
            that we shall have no liability or obligation to you in such event
            and that you will not be entitled to a refund of any amounts that
            you have already paid to us.
          </p>
          <p className='title'>
            <strong>19.Severability</strong>
          </p>
          <p>
            If any term, clause, or provision of these Terms is held invalid or
            unenforceable, then that term, clause, or provision will be
            severable from these Terms and will not affect the validity or
            enforceability of any remaining part of that term, clause, or
            provision, or any other term, clause, or provision of these Terms.
          </p>
          <p className='title'>
            <strong>20.Injunctive Relief</strong>
          </p>
          <p>
            You agree that a breach of these Terms will cause irreparable injury
            to PD-1 for which monetary damages would not be an adequate remedy
            and PD-1 shall be entitled to equitable relief in addition to any
            remedies it may have hereunder or at law without a bond, other
            security, or proof of damages.
          </p>
          <p className='title'>
            <strong>21.California Residents</strong>
          </p>
          <p>
            If you are a California resident, in accordance with Cal. Civ. Code
            § 1789.3, you may report complaints to the Complaint Assistance Unit
            of the Division of Consumer Services of the California Department of
            Consumer Affairs by contacting them in writing at 1625 North Market
            Blvd., Suite N 112 Sacramento, CA 95834, or by telephone at (800)
            952-5210.
          </p>
          <p className='title'>
            <strong>22.Export Laws</strong>
          </p>
          <p>
            You agree that you will not export or re-export, directly or
            indirectly, the Service, and/or other information or materials
            provided by PD-1 hereunder, to any country for which the United
            States or any other relevant jurisdiction requires any export
            license or other governmental approval at the time of export without
            first obtaining such license or approval. In particular, but without
            limitation, the Service may not be exported or re-exported (a) into
            any U.S. embargoed countries or any country that has been designated
            by the U.S. Government as a “terrorist supporting” country, or (b)
            to anyone listed on any U.S. Government list of prohibited or
            restricted parties, including the U.S. Treasury Department’s list of
            Specially Designated Nationals or the U.S. Department of Commerce
            Denied Person’s List or Entity List. By using the Service, you
            represent and warrant that you are not located in any such country
            or on any such list. You are responsible for and hereby agree to
            comply at your sole expense with all applicable United States export
            laws and regulations.
          </p>
          <p className='title'>
            <strong>23.Survival</strong>
          </p>
          <p>
            All sections which by their nature should survive the termination of
            these Terms shall continue in full force and effect subsequent to
            and notwithstanding any termination of these Terms by PD-1 or you.
            Termination will not limit any of PD-1’s other rights or remedies at
            law or in equity.
          </p>
          <p className='title'>
            <strong>24.Miscellaneous</strong>
          </p>
          <p>
            These Terms constitute the entire agreement between you and PD-1
            relating to your access to and use of the Service. These Terms, and
            any rights and licenses granted hereunder, may not be transferred or
            assigned by you without the prior written consent of PD-1, and
            PD-1’s failure to assert any right or provision under these Terms
            shall not constitute a waiver of such right or provision. No waiver
            by either party of any breach or default hereunder shall be deemed
            to be a waiver of any preceding or subsequent breach or default. The
            section headings used herein are for reference only and shall not be
            read to have any legal effect.
          </p>
          <p>
            The Service is operated by us in the United States. Those who choose
            to access the Service from locations outside the United States do so
            at their own initiative and are responsible for compliance with
            applicable local laws. You and PD-1 agree that the United Nations
            Convention on Contracts for the International Sale of Goods will not
            apply to the interpretation or construction of these Terms.
          </p>
          <p>
            Except as otherwise provided herein, these Terms are intended solely
            for the benefit of the parties and are not intended to confer
            third-party beneficiary rights upon any other person or entity.
          </p>
        </div>
      </div>
    </TermsContainer>
  );
};

export default Tos;
