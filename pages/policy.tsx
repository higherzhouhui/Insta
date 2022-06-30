import Image from 'next/image';

import type {NextPage} from 'next';

import {TermsContainer} from '@/styles/tos';

const Policy: NextPage = () => {
  return (
    <TermsContainer>
      <div className='slogan-box'>
        <div className='left'>
          <h1>Privacy Policy</h1>
          <p>
            Learn more about how PD-1 collects and uses data and your rights as
            a PD-1 user.
          </p>
        </div>
        <div className='right'>
          <Image
            alt='slogan'
            height={440}
            src='/static/image/policy-slogan.png'
            width={534}
          />
        </div>
      </div>
      <div className='content-box'>
        <div className='title-box'>Last Updated: April 5, 2022</div>
        <div className='main-box'>
          <p>
            PD-1 (“PD-1,” “we”, “us”, or “our”) is committed to protecting your
            privacy. We have prepared this Privacy Policy to describe to you our
            practices regarding the Personal Data (as defined below) we collect,
            use, and share in connection with the PD-1 website, mobile app, and
            other software provided on or in connection with our services, as
            described in our Terms of Service (collectively, the “Service”).
            “NFT” in this Privacy Policy means a non-fungible token or similar
            digital item implemented on a blockchain (such as the Ethereum
            blockchain), which uses smart contracts to link to or otherwise be
            associated with certain content or data.
          </p>
          <p className='step-1'>
            <strong>1.Types of Data We Collect. </strong>“Personal Data” means
            data that allows someone to identify you individually, including,
            for example, your name, email address, as well as any other
            non-public information about you that is associated with or linked
            to any of the foregoing. “Anonymous Data” means data, including
            aggregated and de-identified data, that is not associated with or
            linked to your Personal Data; Anonymous Data does not, by itself,
            permit the identification of individual persons. We collect Personal
            Data and Anonymous Data as described below.
          </p>
          <p className='step-2'>
            <strong>a.Information You Provide Us.</strong>
          </p>
          <p className='step-3'>
            I.When you use our Service, update your account profile, or contact
            us, we may collect Personal Data from you, such as email address,
            first and last name, user name, and other information you provide.
            We also collect your blockchain address, which may become associated
            with Personal Data when you use our Service.
          </p>
          <p className='step-3'>
            II.Our Service lets you store preferences like how your content is
            displayed, notification settings, and favorites. We may associate
            these choices with your ID, browser, or mobile device.
          </p>
          <p className='step-3'>
            III.If you provide us with feedback or contact us, we will collect
            your name and contact information, as well as any other content
            included in the message.
          </p>
          <p className='step-3'>
            IV.We may also collect Personal Data at other points in our Service
            where you voluntarily provide it or where we state that Personal
            Data is being collected.
          </p>
          <p className='step-2'>
            <strong>b.Information Collected via Technology.</strong> As you
            navigate through and interact with our Service, we may use automatic
            data collection technologies to collect certain information about
            your equipment, browsing actions, and patterns, including:
          </p>
          <p className='step-3'>
            I.Information Collected by Our Servers. To provide our Service and
            make it more useful to you, we (or a third party service provider)
            collect information from you, including, but not limited to, your
            browser type, operating system, Internet Protocol (“IP”) address,
            mobile device ID, blockchain address, wallet type, and date/time
            stamps.
          </p>
          <p className='step-3'>
            II.Log Files. As is true of most websites and applications, we
            gather certain information automatically and store it in log files.
            This information includes IP addresses, browser type, Internet
            service provider (“ISP”), referring/exit pages, operating system,
            date/time stamps, and clickstream data. We use this information to
            analyze trends, administer the Service, track users’ movements
            around the Service, and better tailor our Services to our users’
            needs. For example, some of the information may be collected so that
            when you visit the Service, it will recognize you and the
            information can be used to personalize your experience.
          </p>
          <p className='step-3'>
            III.Cookies. Like many online services, we use cookies to collect
            information. We may use both session Cookies (which expire once you
            close your web browser) and persistent Cookies (which stay on your
            computer until you delete them) to analyze how users interact with
            our Service, make improvements to our product quality, and provide
            users with a more personalized experience.
          </p>
          <p className='step-3'>
            IV.Pixel Tag. In addition, we use “Pixel Tags” (also referred to as
            clear Gifs, Web beacons, or Web bugs). Pixel Tags allow us to
            analyze how users find our Service, make the Service more useful to
            you, and tailor your experience with us to meet your particular
            interests and needs.
          </p>
          <p className='step-3'>
            V.How We Respond to Do Not Track Signals. Our systems do not
            currently recognize “do not track” signals or other mechanisms that
            might enable Users to opt out of tracking on our site.
          </p>
          <p className='step-3'>
            VI.Analytics Services. In addition to the tracking technologies we
            place like Cookies and Pixel Tags, other companies may set their own
            cookies or similar tools when you visit our Service. This includes
            third-party analytics services (“Analytics Services”) that we engage
            to help analyze how users use the Service. The information generated
            by the Cookies or other technologies about your use of our Service
            (the “Analytics Information”) is transmitted to the Analytics
            Services. The Analytics Services use Analytics Information to
            compile reports on user activity, which we may receive on an
            individual or aggregate basis. We use the information we get from
            Analytics Services to improve our Service. The Analytics Services
            may also transfer information to third parties where required to do
            so by law, or where such third parties process Analytics Information
            on their behalf. Each Analytics Services’ ability to use and share
            Analytics Information is restricted by such Analytics Services’
            terms of use and privacy policy. By using our Service, you consent
            to the processing of data about you by Analytics Services in the
            manner and for the purposes set out above.
          </p>
          <p className='step-2'>
            <strong>
              c.Information Collected from Third-Party Companies.{' '}
            </strong>
            We may receive Personal and/or Anonymous Data about you from
            companies that offer their products and/or services for use in
            conjunction with our Service or whose products and/or services may
            be linked from our Service. For example, third-party wallet
            providers provide us with your blockchain address and certain other
            information you choose to share with those wallets providers. We may
            add this to the data we have already collected from or about you
            through our Service.
          </p>
          <p className='step-2'>
            <strong>d.Public Information Observed from Blockchains.</strong> We
            collect data from activity that is publicly visible and/or
            accessible on blockchains. This may include blockchain addresses and
            information regarding purchases, sales, or transfers of NFTs, which
            may then be associated with other data you have provided to us.
          </p>

          <p className='step-1'>
            <strong>2.Use of Your Personal Data.</strong>
          </p>
          <p className='step-2'>
            a.We process your Personal Data to run our business, provide the
            Service, personalize your experience on the Service, and improve the
            Service. Specifically, we use your Personal Data to:
          </p>
          <p className='step-3'>
            I.facilitate the creation of and secure your account;
          </p>
          <p className='step-3'>II.identify you as a user in our system;</p>
          <p className='step-3'>
            III.provide you with our Service, including, but not limited to,
            helping you view, explore, and create NFTs using our tools and, at
            your own discretion, connect directly with others to purchase, sell,
            or transfer NFTs on public blockchains;
          </p>
          <p className='step-3'>
            IV.improve the administration of our Service and quality of
            experience when you interact with our Service, including, but not
            limited to, by analyzing how you and other users find and interact
            with the Service;
          </p>
          <p className='step-3'>
            V.provide customer support and respond to your requests and
            inquiries;
          </p>
          <p className='step-3'>
            VI.investigate and address conduct that may violate our Terms of
            Service;
          </p>
          <p className='step-3'>
            VII.detect, prevent, and address fraud, violations of our terms or
            policies, and/or other harmful or unlawful activity;
          </p>
          <p className='step-3'>
            VIII.display your username next to the NFTs currently or previously
            accessible in your third-party wallet, and next to NFTs on which you
            have interacted;
          </p>
          <p className='step-3'>
            IX.send you a welcome email to verify ownership of the email address
            provided when your account was created;
          </p>
          <p className='step-3'>
            X.send you administrative notifications, such as security, support,
            and maintenance advisories;
          </p>
          <p className='step-3'>
            XI.send you notifications related to actions on the Service,
            including notifications of offers on your NFTs;
          </p>
          <p className='step-3'>
            XII.send you newsletters, promotional materials, and other notices
            related to our Services or third parties&apos; goods and services;
          </p>
          <p className='step-3'>
            XIII.respond to your inquiries related to employment opportunities
            or other requests;
          </p>
          <p className='step-3'>
            XIV.comply with applicable laws, cooperate with investigations by
            law enforcement or other authorities of suspected violations of law,
            and/or to pursue or defend against legal threats and/or claims; and
          </p>
          <p className='step-3'>
            XV.act in any other way we may describe when you provide the
            Personal Data.
          </p>
          <p className='step-2'>
            b.We may create Anonymous Data records from Personal Data. We use
            this Anonymous Data to analyze request and usage patterns so that we
            may improve our Services and enhance Service navigation. We reserve
            the right to use Anonymous Data for any purpose and to disclose
            Anonymous Data to third parties without restriction.
          </p>

          <p className='step-1'>
            <strong>3.Disclosure of Your Personal Data. </strong>We disclose
            your Personal Data as described below and as described elsewhere in
            this Privacy Policy.
          </p>
          <p className='step-2'>
            <strong>a.Third Party Service Providers. </strong>We may share your
            Personal Data with third party service providers to: provide
            technical infrastructure services; conduct quality assurance
            testing; analyze how our Service is used; prevent, detect, and
            respond to unauthorized activities; provide technical and customer
            support; and/or to provide other support to us and to the Service.
          </p>
          <p className='step-2'>
            <strong>b.Affiliates. </strong>We may share some or all of your
            Personal Data with any subsidiaries, joint ventures, or other
            companies under our common control (“Affiliates”), in which case we
            will require our Affiliates to honor this Privacy Policy.
          </p>
          <p className='step-2'>
            <strong>c.Corporate Restructuring. </strong>We may share some or all
            of your Personal Data in connection with or during negotiation of
            any merger, financing, acquisition, or dissolution transaction or
            proceeding involving sale, transfer, divestiture, or disclosure of
            all or a portion of our business or assets. In the event of an
            insolvency, bankruptcy, or receivership, Personal Data may also be
            transferred as a business asset. If another company acquires our
            company, business, or assets, that company will possess the Personal
            Data collected by us and will assume the rights and obligations
            regarding your Personal Data as described in this Privacy Policy.
          </p>
          <p className='step-2'>
            <strong>d.Legal Rights. </strong>Regardless of any choices you make
            regarding your Personal Data (as described below), PD-1 may disclose
            Personal Data if it believes in good faith that such disclosure is
            necessary: (a) in connection with any legal investigation; (b) to
            comply with relevant laws or to respond to subpoenas, warrants, or
            other legal process served on PD-1; (c) to protect or defend the
            rights or property of PD-1 or users of the Service; and/or (d) to
            investigate or assist in preventing any violation or potential
            violation of the law, this Privacy Policy, or our Terms of Service.
          </p>
          <p className='step-2'>
            <strong>e.Other Disclosures. </strong>We may also disclose your
            Personal Data: to fulfill the purpose for which you provide it; for
            any other purpose disclosed by us when you provide it; or with your
            consent.
          </p>

          <p className='step-1'>
            <strong>4.Third-Party Websites. </strong>Our Service may contain
            links to third-party websites. When you click on a link to any other
            website or location, you will leave our Service and go to another
            site, and another entity may collect Personal Data from you. We have
            no control over, do not review, and cannot be responsible for these
            third-party websites or their content. Please be aware that the
            terms of this Privacy Policy do not apply to these third-party
            websites or their content, or to any collection of your Personal
            Data after you click on links to such third-party websites. We
            encourage you to read the privacy policies of every website you
            visit. Any links to third-party websites or locations are for your
            convenience and do not signify our endorsement of such third parties
            or their products, content, or websites.
          </p>
          <p className='step-1'>
            <strong>5.Third-Party Wallets. </strong>To use our Service, you must
            use a third-party wallet which allows you to engage in transactions
            on public blockchains. Your interactions with any third-party wallet
            provider are governed by the applicable terms of service and privacy
            policy of that third party.
          </p>

          <p className='step-1'>
            <strong>6.Your Choices Regarding Information. </strong>You have
            several choices regarding the use of information on our Services:
          </p>
          <p className='step-2'>
            <strong>a.Email Communications. </strong>We may periodically send
            you newsletters and/or emails that directly promote the use of our
            Service or third parties’ goods and services. When you receive
            newsletters or promotional communications from us, you may indicate
            a preference to stop receiving these communications from us by
            following the unsubscribe instructions provided in the email you
            receive or through the Notifications preferences in your Settings
            page. Despite these preferences, we may send you occasional
            transactional service-related informational communications.
          </p>
          <p className='step-2'>
            b.If you decide at any time that you no longer wish to accept
            Cookies from our Service for any of the purposes described above,
            then you can instruct your browser, by changing its settings, to
            stop accepting Cookies or to prompt you before accepting a Cookie
            from the websites you visit. Consult your browser’s technical
            information. If you do not accept Cookies, however, you may not be
            able to use all portions of the Service or all functionality of the
            Service.
          </p>

          <p className='step-1'>
            <strong>7.Data Access and Control. </strong>You can view, access,
            edit, or delete your Personal Data for certain aspects of the
            Service via your Settings page. You may also have certain additional
            rights:
          </p>
          <p className='step-2'>
            a.If you are a user in the European Economic Area or United Kingdom,
            you have certain rights under the respective European and UK General
            Data Protection Regulations (“GDPR”). These include the right to (i)
            request access and obtain a copy of your personal data; (ii) request
            rectification or erasure; (iii) object to or restrict the processing
            of your personal data; and (iv) request portability of your personal
            data. Additionally, if we have collected and processed your personal
            data with your consent, you have the right to withdraw your consent
            at any time.
          </p>
          <p className='step-2'>
            b.If you are a California resident, you have certain rights under
            the California Consumer Privacy Act (“CCPA”). These include the
            right to (i) request access to, details regarding, and a copy of the
            personal information we have collected about you and/or shared with
            third parties; (ii) request deletion of the personal information
            that we have collected about you; and (iii) the right to opt-out of
            sale of your personal information. As the terms are defined under
            the CCPA, we do not “sell” your “personal information.”
          </p>
          <p className='step-2'>
            c.If you wish to exercise your rights under the GDPR, CCPA, or other
            applicable data protection or privacy laws, please contact us by
            sending email or telegram message, specify your request, and
            reference the applicable law. We may ask you to verify your
            identity, or ask for more information about your request. We will
            consider and act upon any above request in accordance with
            applicable law. We will not discriminate against you for exercising
            any of these rights.
          </p>
          <p className='step-2'>
            d.Notwithstanding the above, we cannot edit or delete any
            information that is stored on a blockchain, for example the Ethereum
            blockchain, as we do not have custody or control over any
            blockchains. The information stored on the blockchain may include
            purchases, sales, and transfers related to your blockchain address
            and NFTs held at that address.
          </p>

          <p className='step-1'>
            <strong>8.Data Retention. </strong>We may retain your Personal Data
            as long as you continue to use the Service, have an account with us,
            or for as long as is necessary to fulfill the purposes outlined in
            this Privacy Policy. We may continue to retain your Personal Data
            even after you deactivate your account and/or cease to use the
            Service if such retention is reasonably necessary to comply with our
            legal obligations, to resolve disputes, prevent fraud and abuse,
            enforce our Terms or other agreements, and/or protect our legitimate
            interests. Where your Personal Data is no longer required for these
            purposes, we will delete it.
          </p>
          <p className='step-1'>
            <strong>9.Data Protection. </strong>We care about the security of
            your information and use physical, administrative, and technological
            safeguards to preserve the integrity and security of information
            collected through our Service. However, no security system is
            impenetrable and we cannot guarantee the security of our systems. In
            the event that any information under our custody and control is
            compromised as a result of a breach of security, we will take steps
            to investigate and remediate the situation and, in accordance with
            applicable laws and regulations, notify those individuals whose
            information may have been compromised.
          </p>
          <p className='step-2'>
            a.You are responsible for the security of your digital wallet, and
            we urge you to take steps to ensure it is and remains secure. If you
            discover an issue related to your wallet, please contact your wallet
            provider.
          </p>

          <p className='step-1'>
            <strong>10.Minors. </strong>We do not intentionally gather Personal
            Data from visitors who are under the age of 13. Our Terms of Service
            require all users to be at least 18 years old. Minors who are at
            least 13 years old but are under 18 years old may use a parent or
            guardian’s PD-1 account, but only with the involvement of the
            account holder. If a child under 13 submits Personal Data to PD-1
            and we learn that the Personal Data is the information of a child
            under 13, we will attempt to delete the information as soon as
            possible. If you believe that we might have any Personal Data from a
            child under 13, please contact us by sending email or telegram
            message.
          </p>
          <p className='step-1'>
            <strong>11.Users Outside of the United States. </strong>If you are a
            non-U.S. user of the Service, by visiting the Service and providing
            us with data, you acknowledge and agree that your Personal Data may
            be processed for the purposes identified in the Privacy Policy. In
            addition, your Personal Data may be processed in the country in
            which it was collected and in other countries, including the United
            States, where laws regarding processing of Personal Data may be less
            stringent than the laws in your country. By providing your Personal
            Data, you consent to such transfer.
          </p>
          <p className='step-1'>
            <strong>12.Changes to This Privacy Policy. </strong>This Privacy
            Policy may be updated from time to time for any reason. We will
            notify you of any changes to our Privacy Policy by posting the new
            Privacy Policy at https://www.pd-1st.com/privacy. The date the
            Privacy Policy was last revised is identified at the beginning of
            this Privacy Policy. You are responsible for periodically visiting
            our Service and this Privacy Policy to check for any changes.
          </p>
          <p className='step-1'>
            <strong>
              13.Questions; Contacting PD-1; Reporting Violations.{' '}
            </strong>
            If you have any questions or concerns or complaints about our
            Privacy Policy or our data collection or processing practices, or if
            you want to report any security violations to us, please contact us
            by sending email or telegram message.
          </p>
        </div>
      </div>
    </TermsContainer>
  );
};

export default Policy;
