import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

function Frequency() {
    const ref1 = useRef();
    const ref2 = useRef();
    return (
        <Scroller>

            {/* SCROLLER BACKDROPS */}
            <div name="animation" className="position position--center">
                <div className="top-animation">
                    <LottieAnimation
                        isScrollerBackdrop
                        ref={ref1}
                        src="/img/interactive-data-sources/7_FDU_UPDATES.json" />
                </div>
                <div className="bottom-animation">
                    <LottieAnimation
                        loop
                        ref={ref2}
                        src="/img/interactive-data-sources/7_FDU.json" />
                </div>
            </div>


            {/* SCROLLER OVERLAYS */}

            {/* INTRO CARD ON FREQUENCY */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() => {
                    ref1.current?.playAnimation(0, 120, 1);
                    ref2.current?.playAnimation(120, 300, 1, false);
                }
                }>
                {/* transition no card. */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(120, 300, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        content={
                            <p>
                                The data on USAspending are updated every day after the nightly
                                data pipeline runs. However, USAspending source systems have
                                different requirements for the frequency of their data updates.
                            </p>
                        } />
                </div>
            </ScrollerOverlay>

            {/* FILES A, B, and C */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(300, 360, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(360, 420, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>Files A, B, and C</p>}
                        content={
                            <>
                                <p>
                                    Files A, B, and C are submitted by federal agencies to
                                    USAspending on a monthly basis, as required by the DATA Act. You
                                    can see specific DATA Act reporting submission dates in the
                                    spreadsheets available in this this{" "}
                                    <a
                                        className="scroller-overlay-card__link"
                                        href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        resources page from the Bureau of the Fiscal Service
                                    </a>
                                    .
                                </p>
                                <p>
                                    You can see publication and certification dates for agency
                                    submissions in the “Most Recent Update” column of the{" "}
                                    <Link
                                        className="scroller-overlay-card__link"
                                        to="/submission-statistics">
                                        Agency Submission Statistics page
                                    </Link>
                                    .
                                </p>
                            </>
                        } />
                </div>
            </ScrollerOverlay>

            {/* FPDS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(420, 480, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(480, 540, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>FPDS (File D1)</p>}
                        content={
                            <>
                                <p>
                                    Federal agencies must submit{" "}
                                    <span className="glossary-term">contract</span>{" "}
                                    <GlossaryLink term="contract" /> data to FPDS within three
                                    days of the award{" "}
                                    <span className="glossary-term">transaction</span>{" "}
                                    <GlossaryLink term="transaction" />. The day after submission,
                                    these data are made available to USAspending. On the following
                                    day, these data are automatically published on USAspending.
                                </p>
                                <ul className="interactives-guide_bullet-points">
                                    <li>
                                        Example 1: A contract transaction is made on a given
                                        Thursday. The award is reported to FPDS three business
                                        days later, on the following Tuesday. It is then made
                                        available to USAspending on Wednesday morning and published
                                        to the site on Thursday.
                                    </li>
                                    <li>
                                        Example 2: A contract transaction is made on a given
                                        Tuesday. The award is reported to FPDS three business
                                        days later, on Friday. It is then made available to
                                        USAspending on Saturday morning and published to the
                                        site on Sunday.
                                    </li>
                                </ul>
                                <p>
                                    Note that the submission of data to FPDS is delayed by
                                    90 days for the Department of Defense (DOD) and the U.S.
                                    Army Corps of Engineers (USACE).
                                </p>
                            </>
                        } />
                </div>
            </ScrollerOverlay>

            {/* FABS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(540, 600, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(600, 660, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>FABS (File D2)</p>}
                        content={
                            <>
                                <p>
                                    Federal agencies must submit{" "}
                                    <span className="glossary-term">financial assistance</span>{" "}
                                    <GlossaryLink term="financial-assistance" /> data to FABS
                                    within two weeks of the award{" "}
                                    <span className="glossary-term">transaction</span>{" "}
                                    <GlossaryLink term="transaction" />. This requirement applies
                                    to all financial assistance awards except loans, which are
                                    required to be reported within 30 days of the award
                                    transaction.
                                </p>
                                <ul className="interactives-guide_bullet-points">
                                    <li>
                                        Grant Example: A grant transaction is issued on September 8.
                                        It must be reported to FABS within 14 days, by September 22.
                                        If submitted on September 22, the new data are published on
                                        USAspending on September 23.
                                    </li>
                                    <li>
                                        Loan Example: A loan transaction is issued on September 8.
                                        It must be reported to FABS by October 8. If submitted on
                                        October 8, the new data are published on USAspending on
                                        October 9.{" "}
                                    </li>
                                </ul>
                            </>
                        } />
                </div>
            </ScrollerOverlay>

            {/* FSRS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(660, 720, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(720, 780, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>FSRS (File F)</p>}
                        content={
                            <>
                                <p>
                                    <span className="glossary-term">Prime Recipients</span>{" "}
                                    <GlossaryLink term="prime-recipient" />{" "}
                                    must report any{" "}
                                    <span className="glossary-term">subaward</span>{" "}
                                    <GlossaryLink term="sub-award" />{" "}
                                    greater or equal to $30,000
                                    to FSRS by the end of the month following the month the
                                    subaward was made.
                                </p>
                                <ul className="interactives-guide_bullet-points">
                                    <li>
                                        Example 1: A subaward is issued on September 1. It must be
                                        reported to FSRS by October 31. If submitted on October 31,
                                        the new data are available to USAspending on November 1 and
                                        published to the site on November 2.
                                    </li>
                                    <li>
                                        Example 2: A subaward is issued on September 30. It must be
                                        reported to FSRS by October 31. If submitted on October 31,
                                        the new data are available to USAspending on November 1 and
                                        published to the site on November 2.
                                    </li>
                                </ul>
                                <p>
                                You can read more about subaward reporting requirements on
                                this{" "}
                                    <a
                                        className="scroller-overlay-card__link"
                                        href="https://www.fsrs.gov/#a-faqs"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                    FSRS informational page
                                    </a>
                                .
                                </p>
                            </>
                        } />
                </div>
            </ScrollerOverlay>

            {/* REFRENCE DATA AND EXISTING RECORDS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(780, 840, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(840, 900, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>Reference Data</p>}
                        content={
                            <p>
                                All reference data (such as location data) are extracted by
                                USAspending.gov on a daily basis. In addition, data from SAM.gov
                                (such as executive compensation data, also known as File E) and
                                GTAS are also extracted daily.
                            </p>
                        } />
                </div>
            </ScrollerOverlay>

            {/* TBD CARD SECTION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() => {
                    ref1.current?.playAnimation(900, 960, 1);
                    ref2.current?.playAnimation(120, 300, 1, false);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>

        </Scroller>
    );
}

export default Frequency;
