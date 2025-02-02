/**
 * Covid19Page.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { snakeCase, kebabCase } from 'lodash';
import { ShareIcon } from 'data-transparency-ui';
import { Helmet } from 'react-helmet';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import Covid19Section from 'components/covid19/Covid19Section';
import Heading from 'components/covid19/Heading';
import { LoadingWrapper } from 'components/sharedComponents/Loading';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import LinkToAdvancedSearchContainer from 'containers/covid19/LinkToAdvancedSearchContainer';
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import { jumpToSection } from 'helpers/covid19Helper';
import { slug, getEmailSocialShareData } from 'dataMapping/covid19/covid19';
import { useQueryParams } from 'helpers/queryParams';
import { showModal } from 'redux/actions/modal/modalActions';
import DataSourcesAndMethodology from 'components/covid19/DataSourcesAndMethodology';
import OtherResources from 'components/covid19/OtherResources';
import Analytics from 'helpers/analytics/Analytics';
import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import DownloadButtonContainer from 'containers/covid19/DownloadButtonContainer';

require('pages/covid19/index.scss');

const propTypes = {
    loading: PropTypes.bool
};

const Covid19Page = ({ loading }) => {
    const query = useQueryParams();
    const history = useHistory();
    const [activeSection, setActiveSection] = useState(query.section || 'overview');
    const dispatch = useDispatch();
    const { isRecipientMapLoaded } = useSelector((state) => state.covid19);

    const handleJumpToSection = (section) => {
        jumpToSection(section);

        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            history.replace(`${history.location.pathname}?section=${kebabCase(section)}`);
        }
        // update the state
        setActiveSection(section);
        Analytics.event({ category: 'COVID-19 - Profile', action: `${section} - click` });
    };

    useEffect(() => {
        if (isRecipientMapLoaded && query.section) {
            handleJumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecipientMapLoaded, query.section]);

    const handleExternalLinkClick = (url) => {
        dispatch(showModal(url));
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, getEmailSocialShareData);
    };

    return (
        <PageWrapper
            pageName="COVID-19 Spending"
            classNames="usa-da-covid19-page"
            metaTagProps={covidPageMetaTags}
            title="COVID-19 Spending"
            toolBarComponents={[
                <ShareIcon
                    url={getBaseUrl(slug)}
                    onShareOptionClick={handleShare} />,
                <DownloadButtonContainer />
            ]}>
            <LoadingWrapper isLoading={loading}>
                <Helmet>
                    <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css" rel="stylesheet" />
                </Helmet>
                <main id="main-content" className="main-content usda__flex-row">
                    <div className="sidebar">
                        <div className="sidebar__content">
                            <Sidebar
                                pageName="covid19"
                                isGoingToBeSticky
                                active={activeSection}
                                fixedStickyBreakpoint={getStickyBreakPointForSidebar()}
                                jumpToSection={handleJumpToSection}
                                detectActiveSection
                                verticalSectionOffset={stickyHeaderHeight}
                                sections={Object.keys(componentByCovid19Section())
                                    .filter((section) => componentByCovid19Section()[section].showInMenu)
                                    .map((section) => ({
                                        section: snakeCase(section),
                                        label: componentByCovid19Section()[section].title
                                    }))} />
                        </div>
                    </div>
                    <div className="body usda__flex-col">
                        <section className="body__section">
                            <Heading publicLaw={query.publicLaw} />
                        </section>
                        {Object.keys(componentByCovid19Section())
                            .filter((section) => componentByCovid19Section()[section].showInMainSection)
                            .map((section) => (
                                <Covid19Section
                                    key={section}
                                    section={section}
                                    publicLaw={query.publicLaw}
                                    icon={componentByCovid19Section()[section].icon}
                                    headerText={componentByCovid19Section()[section].headerText}
                                    title={componentByCovid19Section()[section].title}
                                    tooltipProps={componentByCovid19Section()[section].tooltipProps}
                                    tooltip={componentByCovid19Section()[section].tooltip}>
                                    {componentByCovid19Section(query.publicLaw, handleExternalLinkClick)[section].component}
                                </Covid19Section>
                            ))}
                        <section className="body__section" id="covid19-data_sources_and_methodology">
                            <DataSourcesAndMethodology
                                handleExternalLinkClick={handleExternalLinkClick}
                                publicLaw={query.publicLaw} />
                        </section>
                        <section className="body__section" id="covid19-other_resources">
                            <OtherResources
                                handleExternalLinkClick={handleExternalLinkClick}
                                publicLaw={query.publicLaw} />
                            <LinkToAdvancedSearchContainer />
                        </section>
                    </div>
                    <GlobalModalContainer />
                </main>
            </LoadingWrapper>
        </PageWrapper>
    );
};

Covid19Page.propTypes = propTypes;
export default Covid19Page;
